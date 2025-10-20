"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";

export function TrashTalkDialog({
  open,
  onOpenChange,
  comments,
  newComment,
  setNewComment,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  comments: { id: number; user: string; message: string; timestamp: string; likes: number }[];
  newComment: string;
  setNewComment: (v: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border border-slate-700 text-slate-100 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-rose-400" /> Trash Talk</DialogTitle>
          <DialogDescription className="text-slate-300">Keep it spicy. Don’t get banned by your own squad.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
          {comments.map((c) => (
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
  );
}