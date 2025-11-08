"use client";

import React, { useMemo, useState } from "react";
import { Kpi } from "@/app/v1-dashboard/components/kpi";
import { Toolbar } from "@/app/v1-dashboard/components/toolbar";
import { LeaderboardRow } from "@/app/v1-dashboard/components/leaderboard-row";
import { ComparisonDialog } from "@/app/v1-dashboard/components/dialogs/comparison-dialog";
import { ChallengesDialog } from "@/app/v1-dashboard/components/dialogs/challenges-dialog";
import { TrashTalkDialog } from "@/app/v1-dashboard/components/dialogs/trash-talk-dialog";
import { USERS, CHALLENGES, TRASH } from "@/app/v1-dashboard/mock";
import { changeFor, currency, signedPct } from "@/app/v1-dashboard/utils";
// import { Navigation } from "@/components/navigation";

export default function TradingSquadPage() {
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("daily");
  const [selectedPeriod, setSelectedPeriod] = useState<"1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD">("1D");
  const [showTrashTalk, setShowTrashTalk] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [newComment, setNewComment] = useState("");

  const sortedUsers = useMemo(() => {
    return [...USERS].sort((a, b) => changeFor(b, timeframe).percent - changeFor(a, timeframe).percent);
  }, [timeframe]);

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
        <Toolbar
          usersCount={USERS.length}
          team={team}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          onOpenComparison={() => setShowComparison(true)}
          onOpenChallenges={() => setShowChallenges(true)}
          onOpenTrash={() => setShowTrashTalk(true)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi title="Team Equity" value={currency(team.total)} />
          <Kpi title="Today" value={signedPct(team.todayPct)} positive={team.todayPct >= 0} />
          <Kpi title="Green Traders" value={`${team.greens}`} positive />
          <Kpi title="MVP" value={`${team.mvp.name} (${changeFor(team.mvp, timeframe).percent.toFixed(2)}%)`} />
        </div>

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

      <TrashTalkDialog
        open={showTrashTalk}
        onOpenChange={setShowTrashTalk}
        comments={TRASH}
        newComment={newComment}
        setNewComment={setNewComment}
      />

      <ChallengesDialog
        open={showChallenges}
        onOpenChange={setShowChallenges}
        challenges={CHALLENGES}
      />

      <ComparisonDialog
        open={showComparison}
        onOpenChange={setShowComparison}
        users={USERS}
        selectedUsers={selectedUsers}
        toggleUserSelection={toggleUserSelection}
      />
    </div>
  );
}