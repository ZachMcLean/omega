// app/api/snaptrade/accounts/route.ts
import { NextRequest } from "next/server";
import { Snaptrade } from "snaptrade-typescript-sdk";

const client = new Snaptrade({
  clientId: process.env.SNAPTRADE_CLIENT_ID!,
  consumerKey: process.env.SNAPTRADE_CONSUMER_KEY!,
});

export async function POST(req: NextRequest) {
  const { snapUserId, userSecret } = await req.json();

  const accounts = await client.accountInformation.listUserAccounts({
    userId: snapUserId,
    userSecret,
  });

  // Fetch balances + positions per account (limit concurrency)
  // Save to DB; return a composed payload for your card UI.
  return Response.json({ accounts: accounts.data });
}
