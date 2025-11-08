"use client";

import React, { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Crown,
  ChevronDown,
  ChevronUp,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { UserRow, Position, Margin } from "@/app/v1-dashboard/types";
import { currency } from "@/app/v1-dashboard/utils";

export function LeaderboardRow({
  u,
  index,
  expandedUser,
  setExpandedUser,
  timeframe,
}: {
  u: UserRow;
  index: number;
  expandedUser: number | null;
  setExpandedUser: (id: number | null) => void;
  timeframe: "daily" | "weekly" | "monthly";
}) {
  const change = useMemo(() => {
    if (timeframe === "weekly") return { change: u.weekChange, percent: u.weekChangePercent };
    if (timeframe === "monthly") return { change: u.monthChange, percent: u.monthChangePercent };
    return { change: u.todayChange, percent: u.todayChangePercent };
  }, [timeframe, u]);

  return (
    <Card
      className={cn(
        "relative overflow-hidden backdrop-blur border rounded-2xl transition-all duration-300 hover:scale-[1.01]",
        u.name === "You"
          ? "bg-gradient-to-r from-emerald-900/30 to-slate-900/30 border-emerald-500/50"
          : "bg-gradient-to-r from-slate-800/70 to-slate-900/40 border-slate-600"
      )}
    >
      <button
        onClick={() => setExpandedUser(expandedUser === u.id ? null : u.id)}
        className="w-full text-left"
        aria-expanded={expandedUser === u.id}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900/60 rounded-xl flex items-center justify-center">
                <RankIcon rank={index + 1} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{u.name}</h3>
                  {u.name === "You" && <Badge> You </Badge>}
                  {u.greenStreak > 0 && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                      <Flame className="h-3 w-3" />
                      {u.greenStreak}
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-300">{u.brokerage}</div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{currency(u.balance)}</div>
                <div className={cn("flex items-center gap-1 justify-end", change.change >= 0 ? "text-emerald-400" : "text-rose-400")}>
                  {change.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="font-semibold">
                    {currency(Math.abs(change.change))} ({change.percent.toFixed(2)}%)
                  </span>
                </div>
              </div>
              {expandedUser === u.id ? <ChevronUp className="h-6 w-6 text-slate-300" /> : <ChevronDown className="h-6 w-6 text-slate-300" />}
            </div>
          </div>

          {u.badges.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {u.badges.map((b, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-800/70 rounded-full text-sm text-slate-200">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>

      {expandedUser === u.id && (
        <div className="px-6 pb-6 border-top border-slate-700/50">
          <AccountOverview u={u} />
          <StatsRow u={u} />
          <MarginDetails m={u.margin} />
          <Positions positions={u.positions} />
        </div>
      )}
    </Card>
  );
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" aria-label="rank 1" />;
  if (rank === 2) return <Trophy className="w-5 h-5 text-slate-200" aria-label="rank 2" />;
  if (rank === 3) return <Trophy className="w-5 h-5 text-amber-600" aria-label="rank 3" />;
  return <span className="text-slate-300 font-semibold">#{rank}</span>;
}

function AccountOverview({ u }: { u: UserRow }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-6">
      <StatBox label="Buying Power" value={currency(u.buyingPower)} className="text-cyan-300" />
      <StatBox label="Cash" value={currency(u.cash)} className={u.cash >= 0 ? "text-emerald-400" : "text-rose-400"} />
      <StatBox label="YTD P&L" value={currency(u.ytdPnL)} className={u.ytdPnL >= 0 ? "text-emerald-400" : "text-rose-400"} />
      <StatBox label="Day Trades" value={`${u.dayTrades} / 3`} />
    </div>
  );
}

function StatBox({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/60">
      <div className="text-slate-300 text-sm mb-1">{label}</div>
      <div className={cn("text-xl font-semibold text-slate-50", className)}>{value}</div>
    </div>
  );
}

function StatsRow({ u }: { u: UserRow }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Info label="Win Rate" value={`${u.winRate}%`} valueClass="text-emerald-400" />
      <Info label="Total Trades" value={`${u.totalTrades}`} />
      <Info label={<span className="flex items-center gap-1"><Flame className="h-4 w-4 text-orange-500" /> Current Streak</span>} value={`${u.greenStreak} days`} />
      <Info label="Best Streak" value={`${u.longestStreak} days`} />
    </div>
  );
}

function Info({ label, value, valueClass }: { label: React.ReactNode; value: React.ReactNode; valueClass?: string }) {
  return (
    <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/60">
      <div className="text-slate-300 text-sm mb-1">{label}</div>
      <div className={cn("text-xl font-semibold text-slate-50", valueClass)}>{value}</div>
    </div>
  );
}

function MarginDetails({ m }: { m: Margin }) {
  return (
    <Card className="bg-slate-900/70 mb-6 border border-slate-700/60">
      <CardHeader className="pb-2">
        <CardDescription className="text-slate-200">Margin Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MiniStat label="Available" value={currency(m.available)} />
          <MiniStat label="Maintenance" value={currency(m.maintenance)} />
          <MiniStat label="Used" value={currency(m.used)} />
        </div>
      </CardContent>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-slate-300 mb-1">{label}</div>
      <div className="text-lg font-semibold text-slate-50">{value}</div>
    </div>
  );
}

function Positions({ positions }: { positions: Position[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-200">Positions ({positions.length})</h4>
        <Input placeholder="Filter symbol…" className="h-8 w-40" />
      </div>
      <div className="space-y-2">
        {positions.map((p, idx) => (
          <div key={idx} className="bg-slate-900/70 rounded-lg p-4 flex items-center justify-between border border-slate-700/60">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-slate-200">{p.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <div className="font-semibold text-slate-50">{p.symbol}</div>
                <div className="text-sm text-slate-300">{p.qty} {p.type === "crypto" ? "coins" : "shares"}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-slate-50">{currency(p.value)}</div>
              <div className={cn("text-sm", p.pnl >= 0 ? "text-emerald-400" : "text-rose-400")}>
                {currency(p.pnl)} ({p.pnlPercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}