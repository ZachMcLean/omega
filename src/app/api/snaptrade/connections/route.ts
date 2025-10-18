import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { snaptrade, registerSnapTradeUser } from "@/lib/snaptrade";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  let st = await prisma.snaptradeUser.findUnique({ where: { userId } });
  if (!st) {
    const data = await registerSnapTradeUser(userId);
    const userSecret =
      (data as any).userSecret ?? (data as any).user_secret ?? (data as any).secret;
    st = await prisma.snaptradeUser.create({ data: { userId, snaptradeUserId: userId, userSecret } });
  }

  const res = await snaptrade.connections.listBrokerageAuthorizations({
    userId: st.snaptradeUserId,
    userSecret: st.userSecret,
  });
  return NextResponse.json({ connections: res.data });
}