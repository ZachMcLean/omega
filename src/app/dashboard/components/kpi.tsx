"use client";

import React from "react";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Kpi({ title, value, positive }: { title: string; value: string; positive?: boolean }) {
  return (
    <Card className="bg-slate-800/70 border border-slate-600">
      <CardHeader className="pb-1">
        <CardDescription className="text-slate-300">{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", positive === undefined ? "text-slate-50" : positive ? "text-emerald-400" : "text-rose-400")}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}