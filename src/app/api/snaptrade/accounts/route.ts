import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { snaptrade, ensureSnaptradeUser } from "@/lib/snaptrade";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { userSecret } = await ensureSnaptradeUser(userId);

  const res = await snaptrade.accountInformation.listUserAccounts({
    userId,
    userSecret,
  });
  return NextResponse.json({ accounts: res.data });
}