import { prisma } from "./prisma";
import { snaptrade } from "./snaptrade";

export class SnapTradeSyncService {
  constructor(
    private userId: string,
    private snaptradeUserId: string,
    private userSecret: string,
    private snaptradeUserDbId: string // Database ID for foreign key
  ) {}

  /**
   * Full sync: connections -> accounts -> positions -> snapshots
   */
  async fullSync() {
    const job = await prisma.syncJob.create({
      data: {
        userId: this.userId,
        type: "full",
        status: "running",
      },
    });

    try {
      await this.syncConnections();
      await this.syncAccounts();
      await this.syncPositions();
      await this.createSnapshots();

      await prisma.syncJob.update({
        where: { id: job.id },
        data: {
          status: "completed",
          completedAt: new Date(),
        },
      });
    } catch (error: any) {
      await prisma.syncJob.update({
        where: { id: job.id },
        data: {
          status: "failed",
          error: error.message,
          completedAt: new Date(),
        },
      });
      throw error;
    }
  }

  /**
   * Sync brokerage connections
   */
  async syncConnections() {
    const res = await snaptrade.connections.listBrokerageAuthorizations({
      userId: this.snaptradeUserId,
      userSecret: this.userSecret,
    });

    const connections = res.data || [];

    for (const conn of connections) {
      const connId = conn.id as string;
      if (!connId) continue;
      
      await prisma.brokerageConnection.upsert({
        where: { authorizationId: connId },
        create: {
          authorizationId: connId,
          snaptradeUserId: this.snaptradeUserDbId, // Use database ID, not API ID
          broker: (conn.brokerage?.slug as string)?.toUpperCase() || "UNKNOWN",
          brokerName: (conn.brokerage?.name || conn.brokerage?.slug) as string,
          status: conn.disabled ? "disconnected" : "active",
          lastSyncedAt: new Date(),
          metadata: conn as any,
        },
        update: {
          brokerName: (conn.brokerage?.name || conn.brokerage?.slug) as string,
          status: conn.disabled ? "disconnected" : "active",
          lastSyncedAt: new Date(),
          metadata: conn as any,
        },
      });
    }
  }

  /**
   * Sync brokerage accounts
   */
  async syncAccounts() {
    const accountsRes = await snaptrade.accountInformation.listUserAccounts({
      userId: this.snaptradeUserId,
      userSecret: this.userSecret,
    });

    const accounts = accountsRes.data || [];

    for (const acc of accounts) {
      // Find the corresponding connection
      const connection = await prisma.brokerageConnection.findUnique({
        where: { authorizationId: acc.brokerage_authorization },
      });

      if (!connection) {
        console.warn(`No connection found for account ${acc.id}`);
        continue;
      }

      const balance = acc.balance?.total;
      const cash = (acc.balance as any)?.cash || acc.balance?.total;

      await prisma.brokerageAccount.upsert({
        where: { snaptradeAccountId: acc.id },
        create: {
          snaptradeAccountId: acc.id,
          connectionId: connection.id,
          accountName: acc.name || acc.number,
          accountNumber: acc.number,
          accountType: acc.meta?.type || "Unknown",
          totalValue: balance?.amount || 0,
          totalCash: cash?.amount || 0,
          currency: balance?.currency || "USD",
          status: "active",
          lastSyncedAt: new Date(),
          metadata: acc as any,
        },
        update: {
          accountName: acc.name || acc.number,
          accountNumber: acc.number,
          accountType: acc.meta?.type || "Unknown",
          totalValue: balance?.amount || 0,
          totalCash: cash?.amount || 0,
          currency: balance?.currency || "USD",
          lastSyncedAt: new Date(),
          metadata: acc as any,
        },
      });
    }
  }

  /**
   * Sync positions for all accounts
   */
  async syncPositions() {
    const accounts = await prisma.brokerageAccount.findMany({
      where: {
        connection: {
          snaptradeUserId: this.snaptradeUserDbId,
        },
      },
    });

    for (const account of accounts) {
      try {
        const positionsRes = await snaptrade.accountInformation.getUserAccountPositions({
          userId: this.snaptradeUserId,
          userSecret: this.userSecret,
          accountId: account.snaptradeAccountId,
        });

        const positions = positionsRes.data || [];

        // Delete old positions not in the new list
        const currentSymbols = positions.map((p: any) => p.symbol?.symbol);
        await prisma.position.deleteMany({
          where: {
            accountId: account.id,
            symbol: { notIn: currentSymbols },
          },
        });

        // Upsert current positions
        for (const pos of positions) {
          const symbolObj = pos.symbol?.symbol;
          const symbol = typeof symbolObj === 'string' ? symbolObj : (symbolObj as any)?.symbol || String(symbolObj);
          if (!symbol) continue;

          const quantity = pos.units || 0;
          const currentPrice = pos.price || 0;
          const marketValue = currentPrice * quantity;
          const avgCost = pos.average_purchase_price || currentPrice;
          const unrealizedPL = (currentPrice - avgCost) * quantity;
          const unrealizedPLPercent = avgCost > 0 ? (unrealizedPL / (avgCost * quantity)) * 100 : 0;
          
          const securityName = typeof pos.symbol?.description === 'string' ? pos.symbol.description : symbol;
          const securityType = typeof pos.symbol?.type?.description === 'string' ? pos.symbol.type.description : "stock";
          const currency = typeof pos.symbol?.currency?.code === 'string' ? pos.symbol.currency.code : "USD";

          await prisma.position.upsert({
            where: {
              accountId_symbol: {
                accountId: account.id,
                symbol: symbol,
              },
            },
            create: {
              accountId: account.id,
              symbol: symbol,
              securityName,
              securityType,
              quantity,
              averageCost: avgCost,
              currentPrice,
              marketValue,
              unrealizedPL,
              unrealizedPLPercent,
              currency,
              lastSyncedAt: new Date(),
              metadata: pos as any,
            },
            update: {
              securityName,
              quantity,
              averageCost: avgCost,
              currentPrice,
              marketValue,
              unrealizedPL,
              unrealizedPLPercent,
              lastSyncedAt: new Date(),
              metadata: pos as any,
            },
          });
        }
      } catch (error) {
        console.error(`Error syncing positions for account ${account.id}:`, error);
      }
    }
  }

  /**
   * Create portfolio snapshots for historical tracking
   * Only creates one snapshot per account per day to avoid duplicates
   */
  async createSnapshots() {
    const accounts = await prisma.brokerageAccount.findMany({
      where: {
        connection: {
          snaptradeUserId: this.snaptradeUserDbId,
        },
      },
      include: {
        positions: true,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    for (const account of accounts) {
      // Check if snapshot already exists for today
      const existingSnapshot = await prisma.portfolioSnapshot.findFirst({
        where: {
          accountId: account.id,
          snapshotDate: {
            gte: today,
            lt: tomorrow,
          },
        },
      });

      // Skip if snapshot already exists for today
      if (existingSnapshot) {
        console.log(`Snapshot already exists for account ${account.id} today, skipping...`);
        continue;
      }

      const totalInvestments = account.positions.reduce(
        (sum, pos) => sum + (pos.averageCost || 0) * pos.quantity,
        0
      );
      const totalValue = account.totalValue;
      const totalCash = account.totalCash;
      const totalPL = totalValue - totalInvestments;
      const totalPLPercent = totalInvestments > 0 ? (totalPL / totalInvestments) * 100 : 0;

      await prisma.portfolioSnapshot.create({
        data: {
          accountId: account.id,
          totalValue,
          totalCash,
          totalInvestments,
          totalPL,
          totalPLPercent,
          snapshotDate: new Date(),
        },
      });
    }
  }

  /**
   * Quick sync - update positions, balances, and create snapshots
   */
  async quickSync() {
    await this.syncAccounts();
    await this.syncPositions();
    await this.createSnapshots();
  }
}

/**
 * Helper to get or create sync service for a user
 */
export async function createSyncService(userId: string) {
  const snaptradeUser = await prisma.snaptradeUser.findUnique({
    where: { userId },
  });

  if (!snaptradeUser) {
    throw new Error("User not registered with SnapTrade");
  }

  return new SnapTradeSyncService(
    userId,
    snaptradeUser.snaptradeUserId,
    snaptradeUser.userSecret,
    snaptradeUser.id // Pass the database ID for foreign key
  );
}