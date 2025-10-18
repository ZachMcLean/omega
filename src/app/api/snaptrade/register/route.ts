import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ensureSnaptradeUser } from "@/lib/snaptrade";


export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id; // your app's user id
  await ensureSnaptradeUser(userId);

  return NextResponse.json({ ok: true });
}