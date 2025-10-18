import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { snaptrade, ensureSnaptradeUser } from "@/lib/snaptrade";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const broker = (url.searchParams.get("broker") || "ROBINHOOD").toUpperCase();

  const userId = session.user.id;
  const { userSecret } = await ensureSnaptradeUser(userId);

  const [connectionsRes, accountsRes] = await Promise.all([
    snaptrade.connections.listBrokerageAuthorizations({ userId, userSecret }),
    snaptrade.accountInformation.listUserAccounts({ userId, userSecret }),
  ]);

  const authIds = (connectionsRes.data || [])
    .filter((c: any) => c?.brokerage?.slug?.toUpperCase() === broker)
    .map((c: any) => c.id);

  const accounts = (accountsRes.data || []).filter((a: any) => authIds.includes(a.brokerage_authorization));

  const total = accounts.reduce((sum: number, a: any) => {
    const amt = a?.balance?.total?.amount ?? 0;
    return sum + (typeof amt === "number" ? amt : 0);
  }, 0);

  const currency = accounts[0]?.balance?.total?.currency ?? "USD";

  return NextResponse.json({ broker, total, currency, accounts });
}