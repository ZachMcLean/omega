"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function TopHoldings() {
  const [showAll, setShowAll] = useState(false);
  
  const holdings = [
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      shares: 45,
      value: 12650.25,
      change: 3.24,
      changePercent: 2.63,
    },
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 120,
      value: 21840.00,
      change: -156.80,
      changePercent: -0.71,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      shares: 35,
      value: 18725.50,
      change: 892.15,
      changePercent: 5.01,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      shares: 65,
      value: 24375.75,
      change: 438.90,
      changePercent: 1.83,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      shares: 80,
      value: 14560.00,
      change: -213.45,
      changePercent: -1.44,
    },
  ];

  return (
    <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-hidden h-full">
      <div className="p-4 border-b border-slate-700/50 sticky top-0 bg-slate-800/50 backdrop-blur-sm z-10">
        <div>
          <h3 className="text-white">Top Holdings</h3>
          <p className="text-slate-400 text-sm">Team's largest positions</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-500">Total: ${holdings.reduce((sum, h) => sum + h.value, 0).toLocaleString()}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-slate-400 hover:text-white hover:bg-slate-700/50 text-xs"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-3.5 h-3.5 ml-1" />
              </>
            ) : (
              <>
                View All ({holdings.length}) <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        {(showAll ? holdings : holdings.slice(0, 3)).map((holding, index) => {
          const isPositive = holding.change >= 0;
          return (
            <div
              key={index}
              className="p-4 rounded-lg border border-slate-700/50 bg-slate-700/20 hover:bg-slate-700/30 transition-all hover:border-cyan-500/30 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white group-hover:text-cyan-400 transition-colors mb-1">{holding.symbol}</div>
                  <div className="text-xs text-slate-400 truncate">{holding.name}</div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="text-xs">{isPositive ? '+' : ''}{holding.changePercent.toFixed(2)}%</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-3 border-t border-slate-700/30">
                <div className="text-xs text-slate-500">{holding.shares} shares</div>
                <div className="text-white">${holding.value.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

