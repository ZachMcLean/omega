import { Snaptrade } from "snaptrade-typescript-sdk";

export const snaptrade = new Snaptrade({
  clientId: process.env.SNAPTRADE_CLIENT_ID!,
  consumerKey: process.env.SNAPTRADE_CONSUMER_KEY!,
});

export async function registerSnapTradeUser(snaptradeUserId: string) {
  const res = await snaptrade.authentication.registerSnapTradeUser({ userId: snaptradeUserId });
  return res.data;
}

export async function loginSnapTradeUser(params: {
  userId: string;
  userSecret: string;
  broker?: string;
  connectionType?: "read" | "trade";
  customRedirect?: string;
  reconnect?: string;
  immediateRedirect?: boolean;
}) {
  const res = await snaptrade.authentication.loginSnapTradeUser({
    userId: params.userId,
    userSecret: params.userSecret,
    broker: params.broker ?? "ROBINHOOD",
    connectionType: params.connectionType ?? "read",
    connectionPortalVersion: "v4",
    customRedirect: params.customRedirect,
    reconnect: params.reconnect,
    immediateRedirect: params.immediateRedirect,
  });
  return res.data;
}