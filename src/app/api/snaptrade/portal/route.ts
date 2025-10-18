import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSnapTradeUser, registerSnapTradeUser } from "@/lib/snaptrade";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { broker = "ROBINHOOD" } = await req.json().catch(() => ({}));
  const origin = req.nextUrl.origin;

  const omegaUserId = session.user.id;
  const snaptradeUserId = omegaUserId;

  let st = await prisma.snaptradeUser.findUnique({ where: { userId: omegaUserId } });
  if (!st) {
    const data = await registerSnapTradeUser(snaptradeUserId);
    const userSecret =
      (data as any).userSecret ?? (data as any).user_secret ?? (data as any).secret;
    if (!userSecret) {
      return NextResponse.json({ error: "SnapTrade did not return userSecret" }, { status: 502 });
    }
    st = await prisma.snaptradeUser.create({
      data: { userId: omegaUserId, snaptradeUserId, userSecret },
    });
  }

  const portalData = await loginSnapTradeUser({
    userId: st.snaptradeUserId,
    userSecret: st.userSecret,
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