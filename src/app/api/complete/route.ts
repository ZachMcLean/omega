import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { snaptrade, ensureSnaptradeUser } from "@/lib/snaptrade";
import { createSyncService } from "@/lib/sync-service";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { userSecret } = await ensureSnaptradeUser(userId);

  const [connectionsRes, accountsRes] = await Promise.all([
    snaptrade.connections.listBrokerageAuthorizations({ userId, userSecret }),
    snaptrade.accountInformation.listUserAccounts({ userId, userSecret }),
  ]);

  const hasConnection = Array.isArray(connectionsRes.data) && connectionsRes.data.some((c: any) => !c.disabled);
  const hasAccount = Array.isArray(accountsRes.data) && accountsRes.data.length > 0;

  if (hasConnection && hasAccount) {
    await prisma.user.update({ where: { id: userId }, data: { onboardingComplete: true } });
    
    // 🆕 Trigger initial sync to create first portfolio snapshot
    try {
      const syncService = await createSyncService(userId);
      await syncService.fullSync();
      console.log("✅ Initial sync completed for user:", userId);
    } catch (error) {
      console.error("❌ Initial sync failed:", error);
      // Don't fail the completion - user can manually sync later
    }
  }

  return NextResponse.json({ ok: true, onboardingComplete: hasConnection && hasAccount });
}