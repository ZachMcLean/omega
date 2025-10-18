import { Snaptrade } from "snaptrade-typescript-sdk";
import { prisma } from "./prisma";

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

export type SnaptradeUserAuth = { snaptradeUserId: string; userSecret: string };

export async function ensureSnaptradeUser(userId: string): Promise<SnaptradeUserAuth> {
  const existing = await prisma.snaptradeUser.findUnique({ where: { userId } });
  if (existing) {
    return { snaptradeUserId: existing.snaptradeUserId, userSecret: existing.userSecret };
  }

  const data = await registerSnapTradeUser(userId);
  const userSecret =
    (data as any).userSecret ?? (data as any).user_secret ?? (data as any).secret;

  if (!userSecret) {
    throw new Error("SnapTrade did not return userSecret");
  }

  try {
    const created = await prisma.snaptradeUser.create({
      data: { userId, snaptradeUserId: userId, userSecret },
    });
    return { snaptradeUserId: created.snaptradeUserId, userSecret: created.userSecret };
  } catch (e) {
    // Handle rare create-vs-create races in concurrent requests
    const again = await prisma.snaptradeUser.findUnique({ where: { userId } });
    if (again) {
      return { snaptradeUserId: again.snaptradeUserId, userSecret: again.userSecret };
    }
    throw e;
  }
}