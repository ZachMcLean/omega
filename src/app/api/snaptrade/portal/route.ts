import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { loginSnapTradeUser, ensureSnaptradeUser } from "@/lib/snaptrade";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { broker = "ROBINHOOD" } = await req.json().catch(() => ({}));
  const origin = req.nextUrl.origin;

  const userId = session.user.id;
  const { snaptradeUserId, userSecret } = await ensureSnaptradeUser(userId);

  const portalData = await loginSnapTradeUser({
    userId,
    userSecret,
    broker,
    connectionType: "read",
    customRedirect: `${origin}/start?linked=1`,
  });

  const url =
    (portalData as any).redirectURI ??
    (portalData as any).redirectUri ??
    (portalData as any).url ??
    portalData;

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "SnapTrade login did not return a URL" }, { status: 502 });
  }

  return NextResponse.json({ url });
}