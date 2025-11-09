"use client";

import { Newspaper, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      title: "Fed Signals Rate Cuts Coming in Q2 2025",
      source: "Bloomberg",
      time: "15m ago",
      sentiment: "positive",
      impact: "High"
    },
    {
      id: 2,
      title: "Tech Earnings Beat Expectations - NASDAQ Rallies 2.3%",
      source: "Reuters",
      time: "1h ago",
      sentiment: "positive",
      impact: "High"
    },
    {
      id: 3,
      title: "Oil Prices Surge on Middle East Tensions",
      source: "CNBC",
      time: "2h ago",
      sentiment: "neutral",
      impact: "Medium"
    },
    {
      id: 4,
      title: "Tesla Announces New Factory in Southeast Asia",
      source: "WSJ",
      time: "3h ago",
      sentiment: "positive",
      impact: "Medium"
    },
    {
      id: 5,
      title: "Bitcoin ETF Inflows Hit Record $1.2B This Week",
      source: "CoinDesk",
      time: "4h ago",
      sentiment: "positive",
      impact: "High"
    }
  ];

  return (
    <div className="px-4 sm:px-6 py-4 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
          <Newspaper className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-slate-100">News & Market Intel</h1>
          <p className="text-slate-400">Real-time market news and analysis</p>
        </div>
      </div>

      {/* News Feed */}
      <div className="space-y-4">
        {newsItems.map((item) => (
          <Card 
            key={item.id}
            className="border-slate-700 bg-slate-900/50 p-5 hover:border-cyan-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    item.sentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-400' :
                    item.sentiment === 'neutral' ? 'bg-slate-500/20 text-slate-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {item.impact} Impact
                  </span>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <h3 className="text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400">{item.source}</p>
              </div>
              <TrendingUp className={`w-5 h-5 flex-shrink-0 ${
                item.sentiment === 'positive' ? 'text-emerald-400' : 'text-slate-500'
              }`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Coming Soon Banner */}
      <Card className="border-amber-500/30 bg-amber-500/5 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div>
            <h3 className="text-amber-400 mb-2">Enhanced News Feed Coming Soon</h3>
            <p className="text-slate-400 text-sm">
              AI-powered sentiment analysis, personalized news recommendations based on your portfolio,
              and real-time alerts for market-moving events.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
