"use client";

import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Users,
  Target,
  Crown,
  ChevronDown,
  ChevronUp,
  Flame,
  MessageSquare,
  Award,
  BarChart3,
  Send,
  Plus,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn helper
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// ---------------- Types ----------------
export type Position = {
  symbol: string;
  qty: number;
  value: number;
  pnl: number;
  pnlPercent: number;
  type: "equity" | "crypto";
};

export type Margin = {
  available: number;
  maintenance: number;
  used: number;
};

export type UserRow = {
  id: number;
  name: string;
  brokerage: string;
  balance: number;
  todayChange: number;
  todayChangePercent: number;
  weekChange: number;
  weekChangePercent: number;
  monthChange: number;
  monthChangePercent: number;
  buyingPower: number;
  cash: number;
  ytdPnL: number;
  todayPnL: number;
  dayTrades: number;
  greenStreak: number;
  longestStreak: number;
  totalTrades: number;
  winRate: number;
  badges: string[];
  margin: Margin;
  rank: number;
  positions: Position[];
};

// --------------- Mock Data (replace with server data) ---------------
const USERS: UserRow[] = [
  {
    id: 1,
    name: "You",
    brokerage: "Robinhood",
    balance: 75269.87,
    todayChange: -2791.24,
    todayChangePercent: -3.58,
    weekChange: 1250.5,
    weekChangePercent: 1.69,
    monthChange: 8450.3,
    monthChangePercent: 12.65,
    buyingPower: 15133.07,
    cash: -75064.47,
    ytdPnL: 58251.1,
    todayPnL: -2791.24,
    dayTrades: 0,
    greenStreak: 0,
    longestStreak: 7,
    totalTrades: 156,
    winRate: 64.5,
    badges: ["🔥 Hot Streak", "💎 Diamond Hands"],
    margin: {
      available: 90197.54,
      maintenance: 39193.15,
      used: 75064.47,
    },
    rank: 2,
    positions: [
      { symbol: "ADA", qty: 100.01, value: 69.97, pnl: 5.54, pnlPercent: 8.59, type: "crypto" },
      { symbol: "DNN", qty: 1000, value: 2900, pnl: 70, pnlPercent: 2.47, type: "equity" },
      { symbol: "FIG", qty: 1, value: 60, pnl: -7.94, pnlPercent: -11.69, type: "equity" },
      { symbol: "NNE", qty: 1007, value: 44811.5, pnl: -2439.37, pnlPercent: -5.16, type: "equity" },
    ],
  },
  {
    id: 2,
    name: "Mike",
    brokerage: "Robinhood",
    balance: 92450.33,
    todayChange: 3240.12,
    todayChangePercent: 3.63,
    weekChange: 8240.5,
    weekChangePercent: 9.8,
    monthChange: 15230.4,
    monthChangePercent: 19.74,
    buyingPower: 22450,
    cash: 5200,
    ytdPnL: 72340.5,
    todayPnL: 3240.12,
    dayTrades: 1,
    greenStreak: 4,
    longestStreak: 9,
    totalTrades: 203,
    winRate: 71.2,
    badges: ["👑 King", "🚀 Moonshot", "🎯 Sniper"],
    margin: {
      available: 105000,
      maintenance: 42000,
      used: 63000,
    },
    rank: 1,
    positions: [
      { symbol: "TSLA", qty: 50, value: 45000, pnl: 2400, pnlPercent: 5.64, type: "equity" },
      { symbol: "NVDA", qty: 30, value: 25000, pnl: 840.12, pnlPercent: 3.48, type: "equity" },
    ],
  },
  {
    id: 3,
    name: "Jake",
    brokerage: "E*TRADE",
    balance: 43200.5,
    todayChange: -890.25,
    todayChangePercent: -2.02,
    weekChange: -1250.75,
    weekChangePercent: -2.81,
    monthChange: 3420.8,
    monthChangePercent: 8.6,
    buyingPower: 8500,
    cash: 2100,
    ytdPnL: 28400.3,
    todayPnL: -890.25,
    dayTrades: 2,
    greenStreak: 0,
    longestStreak: 5,
    totalTrades: 89,
    winRate: 58.4,
    badges: ["📊 Analyst"],
    margin: {
      available: 50000,
      maintenance: 20000,
      used: 30000,
    },
    rank: 3,
    positions: [
      { symbol: "AAPL", qty: 100, value: 18000, pnl: -450, pnlPercent: -2.44, type: "equity" },
      { symbol: "BTC", qty: 0.5, value: 22000, pnl: -440.25, pnlPercent: -1.96, type: "crypto" },
    ],
  },
];

const CHALLENGES = [
  { id: 1, title: "First to 10% Gain", target: 10, creator: "Mike", participants: ["Mike", "You", "Jake"], winner: null as string | null, prize: "🏆 Bragging Rights" },
  { id: 2, title: "Most Trades This Week", target: 50, creator: "You", participants: ["You", "Jake"], winner: null as string | null, prize: "🎯 Trade Master Badge" },
  { id: 3, title: "5 Day Green Streak", target: 5, creator: "Jake", participants: ["Mike", "Jake"], winner: "Mike", prize: "🔥 Fire Streak NFT" },
];

const TRASH = [
  { id: 1, user: "Mike", message: "Y'all really thought you could beat me? 👑", timestamp: "2 hours ago", likes: 3 },
  { id: 2, user: "You", message: "Just wait till tomorrow Mike 😤", timestamp: "1 hour ago", likes: 2 },
  { id: 3, user: "Jake", message: "At least I'm not margin called 💀", timestamp: "30 min ago", likes: 4 },
];

// --------------- Utils ---------------
const currency = (n: number) => n.toLocaleString(undefined, { style: "currency", currency: "USD" });
const signedPct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

// --------------- Page ---------------
export default function TradingSquadPage() {
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("daily");
  const [showTrashTalk, setShowTrashTalk] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [newComment, setNewComment] = useState("");

  const getChangeByTimeframe = (u: UserRow) => {
    if (timeframe === "weekly") return { change: u.weekChange, percent: u.weekChangePercent };
    if (timeframe === "monthly") return { change: u.monthChange, percent: u.monthChangePercent };
    return { change: u.todayChange, percent: u.todayChangePercent };
  };

  const sortedUsers = useMemo(() => {
    return [...USERS].sort((a, b) => getChangeByTimeframe(b).percent - getChangeByTimeframe(a).percent);
  }, [timeframe]);

  // Team stats for compact header
  const team = useMemo(() => {
    const total = USERS.reduce((s, u) => s + u.balance, 0);
    const prev = USERS.reduce((s, u) => s + (u.balance - u.todayChange), 0);
    const todayPct = prev > 0 ? ((total - prev) / prev) * 100 : 0;
    const greens = USERS.filter((u) => u.todayChange > 0).length;
    const mvp = sortedUsers[0];
    return { total, todayPct, greens, mvp };
  }, [sortedUsers]);

  const toggleUserSelection = (id: number) => {
    setSelectedUsers((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Compact header toolbar (replaces giant hero) */}
        <Card className="bg-slate-900/70 border border-slate-600">
          <CardContent className="py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-2">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold">Trading Squad</div>
                <div className="text-slate-300 text-sm">{USERS.length} traders • Team equity {currency(team.total)} • Today {signedPct(team.todayPct)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(["daily", "weekly", "monthly"] as const).map((r) => (
                <Button
                  key={r}
                  size="sm"
                  variant={timeframe === r ? "default" : "ghost"}
                  className={cn(timeframe === r ? "bg-emerald-600 hover:bg-emerald-600" : "text-slate-200 hover:bg-slate-800")}
                  onClick={() => setTimeframe(r)}
                >
                  {r === "daily" ? "1D" : r === "weekly" ? "1W" : "1M"}
                </Button>
              ))}
              <Separator orientation="vertical" className="h-6" />
              <Button variant="secondary" onClick={() => setShowComparison(true)} aria-label="Open comparison">
                <BarChart3 className="h-4 w-4 mr-1" /> Compare
              </Button>
              <Button variant="secondary" onClick={() => setShowChallenges(true)} aria-label="Open challenges">
                <Target className="h-4 w-4 mr-1" /> Challenges
              </Button>
              <Button variant="secondary" onClick={() => setShowTrashTalk(true)} aria-label="Open chat">
                <MessageSquare className="h-4 w-4 mr-1" /> Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Team KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi title="Team Equity" value={currency(team.total)} />
          <Kpi title="Today" value={signedPct(team.todayPct)} positive={team.todayPct >= 0} />
          <Kpi title="Green Traders" value={`${team.greens}`} positive />
          <Kpi title="MVP" value={`${team.mvp.name} (${signedPct(getChangeByTimeframe(team.mvp).percent)})`} />
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          {sortedUsers.map((u, i) => (
            <LeaderboardRow
              key={u.id}
              u={u}
              index={i}
              expandedUser={expandedUser}
              setExpandedUser={setExpandedUser}
              timeframe={timeframe}
            />
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={showTrashTalk} onOpenChange={setShowTrashTalk}>
        <DialogContent className="bg-slate-900 border border-slate-700 text-slate-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-rose-400" /> Trash Talk</DialogTitle>
            <DialogDescription className="text-slate-300">Keep it spicy. Don’t get banned by your own squad.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {TRASH.map((c) => (
              <div key={c.id} className="rounded-xl bg-slate-800/70 p-4 border border-slate-700">
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-emerald-400">{c.user}</span>
                  <span className="text-xs text-slate-300">{c.timestamp}</span>
                </div>
                <p className="mt-2 text-slate-200">{c.message}</p>
                <button className="mt-2 text-sm text-slate-300 hover:text-rose-400">❤️ {c.likes}</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Talk your trash…" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <Button>
              <Send className="h-4 w-4 mr-1" /> Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showChallenges} onOpenChange={setShowChallenges}>
        <DialogContent className="bg-slate-900 border border-slate-700 text-slate-100 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-amber-400" /> Active Challenges</DialogTitle>
            <DialogDescription className="text-slate-300">Create or join friendly competitions.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
            {CHALLENGES.map((ch) => (
              <Card key={ch.id} className={cn("border", ch.winner ? "bg-emerald-900/20 border-emerald-500/30" : "bg-slate-800/70 border-slate-700") }>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{ch.title}</CardTitle>
                  <CardDescription>Created by {ch.creator}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ch.winner && (
                    <div className="flex items-center gap-2 text-emerald-400"><CheckCircle className="h-4 w-4" /> {ch.winner} Won!</div>
                  )}
                  <div className="text-sm text-slate-300">Target: {ch.target}% • Prize: {ch.prize}</div>
                  <div className="flex flex-wrap gap-2">
                    {ch.participants.map((p, idx) => (
                      <Badge key={idx} variant="secondary">{p}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-500">
            <Plus className="h-4 w-4 mr-1" /> Create New Challenge
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="bg-slate-900 border border-slate-700 text-slate-100 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-purple-400" /> Portfolio Comparison</DialogTitle>
            <DialogDescription className="text-slate-300">Pick 2 or more traders to compare.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mb-4">
            {USERS.map((u) => (
              <Button
                key={u.id}
                variant={selectedUsers.includes(u.id) ? "default" : "secondary"}
                className={selectedUsers.includes(u.id) ? "bg-purple-600 hover:bg-purple-600" : ""}
                size="sm"
                onClick={() => toggleUserSelection(u.id)}
              >
                {u.name}
              </Button>
            ))}
          </div>
          {selectedUsers.length >= 2 ? (
            <div className="space-y-6">
              {/* Portfolio Value bars */}
              <Card className="bg-slate-800/70 border border-slate-700">
                <CardHeader className="pb-2"><CardTitle className="text-base">Portfolio Value</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {USERS.filter((u) => selectedUsers.includes(u.id)).map((u) => {
                    const maxBal = Math.max(...USERS.filter((uu) => selectedUsers.includes(uu.id)).map((uu) => uu.balance));
                    const width = (u.balance / maxBal) * 100;
                    return (
                      <div key={u.id}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{u.name}</span>
                          <span className="font-bold">{currency(u.balance)}</span>
                        </div>
                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${width}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Per-user quick stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {USERS.filter((u) => selectedUsers.includes(u.id)).map((u) => (
                  <Card key={u.id} className="bg-slate-800/70 border border-slate-700">
                    <CardHeader className="pb-2"><CardTitle className="text-base text-purple-300">{u.name}</CardTitle></CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <Row label="Win Rate" value={`${u.winRate}%`} />
                      <Row label="Total Trades" value={`${u.totalTrades}`} />
                      <Row label="Streak" value={<span className="flex items-center gap-1"><Flame className="h-4 w-4 text-orange-500" /> {u.greenStreak}</span>} />
                      <Row label="YTD P&L" value={<span className={u.ytdPnL >= 0 ? "text-emerald-400" : "text-rose-400"}>{currency(u.ytdPnL)}</span>} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-300 py-10">Select at least 2 traders to compare their portfolios</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------------- Components ----------------
function LeaderboardRow({
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
                {getRankIcon(index + 1)}
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

          {/* Badges */}
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
        <div className="px-6 pb-6 border-t border-slate-700/50">
          <AccountOverview u={u} />
          <StatsRow u={u} />
          <MarginDetails m={u.margin} />
          <Positions positions={u.positions} />
        </div>
      )}
    </Card>
  );
}

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" aria-label="rank 1" />;
  if (rank === 2) return <Trophy className="w-5 h-5 text-slate-200" aria-label="rank 2" />;
  if (rank === 3) return <Trophy className="w-5 h-5 text-amber-600" aria-label="rank 3" />;
  return <span className="text-slate-300 font-semibold">#{rank}</span>;
}

function Kpi({ title, value, positive }: { title: string; value: string; positive?: boolean }) {
  return (
    <Card className="bg-slate-800/70 border border-slate-600">
      <CardHeader className="pb-1">
        <CardDescription className="text-slate-300">{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", positive === undefined ? "text-slate-50" : positive ? "text-emerald-400" : "text-rose-400")}>{value}</div>
      </CardContent>
    </Card>
  );
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
              <div className={cn("text-sm", p.pnl >= 0 ? "text-emerald-400" : "text-rose-400")}>{currency(p.pnl)} ({p.pnlPercent.toFixed(2)}%)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-300">{label}</span>
      <span className="font-semibold text-slate-50">{value}</span>
    </div>
  );
}
