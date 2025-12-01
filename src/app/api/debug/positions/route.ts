import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Debug endpoint to check position sync status
 * GET /api/debug/positions
 */
export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snaptradeUser = await prisma.snaptradeUser.findUnique({
    where: { userId: session.user.id },
  });

  if (!snaptradeUser) {
    return NextResponse.json({ error: "No SnapTrade user found" }, { status: 404 });
  }

  const accounts = await prisma.brokerageAccount.findMany({
    where: {
      connection: {
        snaptradeUserId: snaptradeUser.id,
      },
    },
    include: {
      connection: true,
      positions: {
        orderBy: { marketValue: "desc" },
      },
      _count: {
        select: { positions: true },
      },
    },
  });

  const debugInfo = accounts.map((acc) => ({
    accountId: acc.id,
    snaptradeAccountId: acc.snaptradeAccountId,
    accountName: acc.accountName,
    accountNumber: acc.accountNumber,
    broker: acc.connection.broker,
    totalValue: acc.totalValue,
    lastSyncedAt: acc.lastSyncedAt,
    syncError: acc.syncError,
    positionCount: acc._count.positions,
    positions: acc.positions.map((pos) => ({
      symbol: pos.symbol,
      quantity: pos.quantity,
      marketValue: pos.marketValue,
      lastSyncedAt: pos.lastSyncedAt,
    })),
  }));

  return NextResponse.json({
    userId: session.user.id,
    snaptradeUserId: snaptradeUser.id,
    accounts: debugInfo,
    summary: {
      totalAccounts: accounts.length,
      totalPositions: accounts.reduce((sum, acc) => sum + acc._count.positions, 0),
      accountsWithPositions: accounts.filter(acc => acc._count.positions > 0).length,
      accountsWithErrors: accounts.filter(acc => acc.syncError).length,
    },
  });
}

