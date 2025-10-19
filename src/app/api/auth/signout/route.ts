import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL("/api/auth/sign-out", request.url);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  const text = await res.text();
  const headers = new Headers(res.headers); // forward Set-Cookie
  return new NextResponse(text, { status: res.status, headers });
}

export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}