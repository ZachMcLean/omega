"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Flame } from "lucide-react";
import { UserRow } from "@/app/v1-dashboard/types";
import { currency } from "@/app/v1-dashboard/utils";

export function ComparisonDialog({
  open,
  onOpenChange,
  users,
  selectedUsers,
  toggleUserSelection,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  users: UserRow[];
  selectedUsers: number[];
  toggleUserSelection: (id: number) => void;
}) {
  const selected = users.filter((u) => selectedUsers.includes(u.id));
  const maxBal = selected.length ? Math.max(...selected.map((u) => u.balance)) : 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border border-slate-700 text-slate-100 max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-purple-400" /> Portfolio Comparison</DialogTitle>
          <DialogDescription className="text-slate-300">Pick 2 or more traders to compare.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 mb-4">
          {users.map((u) => (
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
            <Card className="bg-slate-800/70 border border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-base">Portfolio Value</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {selected.map((u) => {
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selected.map((u) => (
                <Card key={u.id} className="bg-slate-800/70 border border-slate-700">
                  <CardHeader className="pb-2"><CardTitle className="text-base text-purple-300">{u.name}</CardTitle></CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <Row label="Win Rate" value={`${u.winRate}%`} />
                    <Row label="Total Trades" value={`${u.totalTrades}`} />
                    <Row label={<span className="flex items-center gap-1"><Flame className="h-4 w-4 text-orange-500" /> Streak</span>} value={u.greenStreak} />
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
  );
}

// lightweight shared row
function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-300">{label}</span>
      <span className="font-semibold text-slate-50">{value}</span>
    </div>
  );
}