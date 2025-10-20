"use client";

import React from "react";
import { Users, BarChart3, Target, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserRow } from "@/app/dashboard/types";
import { currency, signedPct } from "@/app/dashboard/utils";

export function Toolbar({
  usersCount,
  team,
  timeframe,
  setTimeframe,
  onOpenComparison,
  onOpenChallenges,
  onOpenTrash,
}: {
  usersCount: number;
  team: { total: number; todayPct: number; greens: number; mvp: UserRow };
  timeframe: "daily" | "weekly" | "monthly";
  setTimeframe: (t: "daily" | "weekly" | "monthly") => void;
  onOpenComparison: () => void;
  onOpenChallenges: () => void;
  onOpenTrash: () => void;
}) {
  return (
    <Card className="bg-slate-900/70 border border-slate-600">
      <CardContent className="py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-2">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold">Trading Squad</div>
            <div className="text-slate-300 text-sm">
              {usersCount} traders • Team equity {currency(team.total)} • Today {signedPct(team.todayPct)}
            </div>
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
          <Button variant="secondary" onClick={onOpenComparison} aria-label="Open comparison">
            <BarChart3 className="h-4 w-4 mr-1" /> Compare
          </Button>
          <Button variant="secondary" onClick={onOpenChallenges} aria-label="Open challenges">
            <Target className="h-4 w-4 mr-1" /> Challenges
          </Button>
          <Button variant="secondary" onClick={onOpenTrash} aria-label="Open chat">
            <MessageSquare className="h-4 w-4 mr-1" /> Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}