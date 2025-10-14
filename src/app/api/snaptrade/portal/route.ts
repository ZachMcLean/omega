// app/api/snaptrade/portal/route.ts
import { NextRequest } from "next/server";
import { Snaptrade } from "snaptrade-typescript-sdk";

const client = new Snaptrade({
  clientId: process.env.SNAPTRADE_CLIENT_ID!,
  consumerKey: process.env.SNAPTRADE_CONSUMER_KEY!,
});

export async function POST(req: NextRequest) {
    const { snapUserId, userSecret, reconnectAuthorizationId, connectionType } = await req.json();
  
    const { data } = await client.authentication.loginSnapTradeUser({
      userId: snapUserId,
      userSecret,
      connectionType: connectionType ?? "read",
      reconnect: reconnectAuthorizationId,
      customRedirect: `${process.env.APP_URL}/connected`, // <-- not 'redirectURI'
      // immediateRedirect: true, // optional: see SDK docs
    });
  
    // data is EncryptedResponse | LoginRedirectURI → narrow before using
    if ("redirectURI" in data && data.redirectURI) {
      return Response.json({ redirectURI: data.redirectURI });
    }
    return Response.json({ error: "Unexpected encrypted response from SnapTrade; handle decryption or disable encryption." }, { status: 500 });
  }
