import { UserRow } from "./types";

export const currency = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

export const signedPct = (n: number) =>
  `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

export function changeFor(
  u: UserRow,
  timeframe: "daily" | "weekly" | "monthly"
) {
  if (timeframe === "weekly") return { change: u.weekChange, percent: u.weekChangePercent };
  if (timeframe === "monthly") return { change: u.monthChange, percent: u.monthChangePercent };
  return { change: u.todayChange, percent: u.todayChangePercent };
}