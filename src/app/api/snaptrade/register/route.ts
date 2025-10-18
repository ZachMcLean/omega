import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { registerSnapTradeUser } from "@/lib/snaptrade";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const omegaUserId = session.user.id; // your app's user id
  // SnapTrade's userId can be your own user id
  const snaptradeUserId = omegaUserId;

  const existing = await prisma.snaptradeUser.findUnique({ where: { userId: omegaUserId } });
  if (existing) {
    return NextResponse.json({ ok: true });
  }

  const data = await registerSnapTradeUser(snaptradeUserId);
  const userSecret =
    (data as any).userSecret ?? (data as any).user_secret ?? (data as any).secret;
  if (!userSecret) {
    return NextResponse.json({ error: "SnapTrade did not return userSecret" }, { status: 502 });
  }

  await prisma.snaptradeUser.create({
    data: {
      userId: omegaUserId,
      snaptradeUserId,
      userSecret,
    },
  });

  return NextResponse.json({ ok: true });
}