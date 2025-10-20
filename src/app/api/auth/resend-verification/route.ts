import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, callbackURL } = await req.json().catch(() => ({}));
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await auth.api.sendVerificationEmail({
      body: { 
        email ,
        callbackURL: callbackURL ?? `${process.env.APP_URL}/verify`,
    },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 });
  }
}