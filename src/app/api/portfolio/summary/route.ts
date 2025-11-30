import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PortfolioSummarySchema, type PortfolioSummary } from "@/lib/validations/portfolio";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snaptradeUser = await prisma.snaptradeUser.findUnique({
    where: { userId: session.user.id },
  });

  if (!snaptradeUser) {
    return NextResponse.json({ error: "No brokerage data found" }, { status: 404 });
  }

  // Fetch accounts with positions
  const accounts = await prisma.brokerageAccount.findMany({
    where: {
      connection: {
        snaptradeUserId: snaptradeUser.id,
      },
    },
    include: {
      positions: true,
    },
  });
  
  const totalValue = accounts.reduce((sum: number, acc: typeof accounts[0]) => sum + acc.totalValue, 0);
  const totalCash = accounts.reduce((sum: number, acc: typeof accounts[0]) => sum + acc.totalCash, 0);
  
  const totalInvested = accounts.reduce((sum: number, acc: typeof accounts[0]) => {
    return sum + acc.positions.reduce((posSum: number, pos: typeof acc.positions[0]) => {
      return posSum + (pos.averageCost || 0) * pos.quantity;
    }, 0);
  }, 0);

  const connectionCount = await prisma.brokerageConnection.count({
    where: { snaptradeUserId: snaptradeUser.id },
  });

  const totalPL = totalValue - totalInvested;
  const totalPLPercent = totalInvested > 0 ? (totalPL / totalInvested) * 100 : 0;

  const response: PortfolioSummary = {
    totalValue,
    totalCash,
    totalInvested,
    totalPL,
    totalPLPercent,
    accountCount: accounts.length,
    connectionCount,
    lastSyncedAt: accounts[0]?.lastSyncedAt?.toISOString() || null,
  };

  // Optional: Validate response with Zod
  const validated = PortfolioSummarySchema.safeParse(response);
  if (!validated.success) {
    console.error("Response validation failed:", validated.error);
    // Still return response, but log error for debugging
  }

  return NextResponse.json(response);
}