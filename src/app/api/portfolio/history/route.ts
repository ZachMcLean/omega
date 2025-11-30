import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  PortfolioHistoryQuerySchema,
  PortfolioHistoryResponseSchema,
  type PortfolioHistoryResponse,
} from "@/lib/validations/portfolio";
import { parseQueryParams, zodErrorResponse } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse and validate query params
  const queryResult = parseQueryParams(req, PortfolioHistoryQuerySchema);
  if (!queryResult.success) {
    return NextResponse.json(zodErrorResponse(queryResult.error), { status: 400 });
  }

  const { period, accountId } = queryResult.data as { period: string; accountId?: string };

  // Calculate date range
  const now = new Date();
  let startDate = new Date();
  
  switch (period) {
    case "1D": startDate.setDate(now.getDate() - 1); break;
    case "1W": startDate.setDate(now.getDate() - 7); break;
    case "1M": startDate.setMonth(now.getMonth() - 1); break;
    case "3M": startDate.setMonth(now.getMonth() - 3); break;
    case "6M": startDate.setMonth(now.getMonth() - 6); break;
    case "1Y": startDate.setFullYear(now.getFullYear() - 1); break;
    case "YTD": startDate = new Date(now.getFullYear(), 0, 1); break;
  }

  const snaptradeUser = await prisma.snaptradeUser.findUnique({
    where: { userId: session.user.id },
  });

  if (!snaptradeUser) {
    return NextResponse.json({ history: [], period });
  }

  // Fetch snapshots
  const snapshots = await prisma.portfolioSnapshot.findMany({
    where: {
      snapshotDate: { gte: startDate },
      account: {
        connection: {
          snaptradeUserId: snaptradeUser.id,
        },
        ...(accountId ? { id: accountId } : {}),
      },
    },
    orderBy: { snapshotDate: "asc" },
    include: { account: true },
  });

  // Group by date and aggregate if multiple accounts
  type GroupedData = Record<string, { date: string; totalValue: number; totalPL: number; count: number }>;
  
  const grouped = snapshots.reduce((acc: GroupedData, snap: typeof snapshots[0]) => {
    const dateKey = snap.snapshotDate.toISOString().split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        totalValue: 0,
        totalPL: 0,
        count: 0,
      };
    }
    acc[dateKey].totalValue += snap.totalValue;
    acc[dateKey].totalPL += snap.totalPL;
    acc[dateKey].count += 1;
    return acc;
  }, {} as GroupedData);

  const history = (Object.values(grouped) as Array<GroupedData[string]>).map((item) => ({
    date: item.date,
    value: item.totalValue,
    pl: item.totalPL,
    plPercent: item.totalValue > 0 ? (item.totalPL / (item.totalValue - item.totalPL)) * 100 : 0,
  }));

  // Validate response with Zod
  const response: PortfolioHistoryResponse = {
    history,
    period: period as "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD",
  };

  const validated = PortfolioHistoryResponseSchema.safeParse(response);
  if (!validated.success) {
    console.error("Response validation failed:", validated.error);
  }

  return NextResponse.json(response);
}