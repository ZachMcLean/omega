"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription as ShadCardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChallengesDialog({
  open,
  onOpenChange,
  challenges,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  challenges: { id: number; title: string; target: number; creator: string; participants: string[]; winner: string | null; prize: string }[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border border-slate-700 text-slate-100 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-amber-400" /> Active Challenges</DialogTitle>
          <DialogDescription className="text-slate-300">Create or join friendly competitions.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
          {challenges.map((ch) => (
            <Card key={ch.id} className={cn("border", ch.winner ? "bg-emerald-900/20 border-emerald-500/30" : "bg-slate-800/70 border-slate-700")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{ch.title}</CardTitle>
                <ShadCardDescription>Created by {ch.creator}</ShadCardDescription>
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
  );
}