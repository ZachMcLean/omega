"use client";

import { TrendingUp, MessageCircle, Lightbulb, AlertCircle, ThumbsUp, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TradingTerminalPage() {
  const tradeIdeas = [
    {
      id: 1,
      author: "MoonShotKing",
      symbol: "NVDA",
      title: "NVDA Bullish Breakout Setup - Target $550",
      thesis: "AI demand continues to surge. Earnings beat expectations by 15%. Breaking out of 3-month consolidation pattern with strong volume. RSI healthy at 62.",
      direction: "Long",
      entry: 495.30,
      target: 550.00,
      stopLoss: 475.00,
      timeframe: "2-4 weeks",
      likes: 24,
      comments: 8,
      views: 156,
      tags: ["AI", "Earnings Play", "Breakout"]
    },
    {
      id: 2,
      author: "ChartMaster420",
      symbol: "TSLA",
      title: "Tesla Short-Term Bounce Play",
      thesis: "Oversold on daily RSI (28). Bouncing off 200-day MA support. China sales numbers better than expected. Looking for dead cat bounce to $265.",
      direction: "Long",
      entry: 251.80,
      target: 265.00,
      stopLoss: 245.00,
      timeframe: "1-2 weeks",
      likes: 18,
      comments: 12,
      views: 203,
      tags: ["Technical", "Bounce Play", "Short-term"]
    },
    {
      id: 3,
      author: "TechQueenGG",
      symbol: "AAPL",
      title: "Apple Put Spreads - Expecting Pullback",
      thesis: "Overextended after iPhone launch hype. Forward P/E at 32 (historical avg 25). Rate cut expectations priced in. Bearish divergence on MACD.",
      direction: "Short",
      entry: 189.45,
      target: 175.00,
      stopLoss: 195.00,
      timeframe: "3-6 weeks",
      likes: 15,
      comments: 6,
      views: 142,
      tags: ["Options", "Mean Reversion", "Overvalued"]
    }
  ];

  return (
    <div className="px-4 sm:px-6 py-4 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h1 className="text-slate-100">Trading Terminal</h1>
          <p className="text-slate-400">Advanced charts and community trade ideas</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-colors">
          <Lightbulb className="w-5 h-5 inline mr-2" />
          Post Idea
        </button>
      </div>

      {/* TradingView Integration Placeholder */}
      <Card className="border-slate-700 bg-slate-900/50 overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="inline-flex p-4 rounded-full bg-cyan-500/20 border border-cyan-500/30">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-slate-100">TradingView Chart Integration</h3>
            <p className="text-slate-400 max-w-md">
              Advanced charting with TradingView widgets. Full technical analysis tools, 
              indicators, and drawing tools will be available here.
            </p>
          </div>
        </div>
      </Card>

      {/* Trade Ideas Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-200 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            Community Trade Ideas
          </h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:border-cyan-500/50 transition-colors text-sm">
              Trending
            </button>
            <button className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:border-cyan-500/50 transition-colors text-sm">
              Recent
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {tradeIdeas.map((idea) => (
            <Card key={idea.id} className="border-slate-700 bg-slate-900/50 p-6 hover:border-cyan-500/50 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-cyan-400">${idea.symbol}</span>
                    <Badge variant={idea.direction === "Long" ? "default" : "destructive"}>
                      {idea.direction}
                    </Badge>
                    <span className="text-xs text-slate-500">by {idea.author}</span>
                  </div>
                  <h3 className="text-slate-100 mb-2">{idea.title}</h3>
                </div>
              </div>

              {/* Thesis */}
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                {idea.thesis}
              </p>

              {/* Trade Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Entry</p>
                  <p className="font-mono text-slate-100 text-sm">${idea.entry}</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Target</p>
                  <p className="font-mono text-emerald-400 text-sm">${idea.target}</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Stop Loss</p>
                  <p className="font-mono text-red-400 text-sm">${idea.stopLoss}</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Timeframe</p>
                  <p className="text-slate-100 text-sm">{idea.timeframe}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {idea.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Engagement */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
                <button className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-mono">{idea.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-mono">{idea.comments}</span>
                </button>
                <div className="flex items-center gap-1 text-slate-500">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-mono">{idea.views}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-amber-500/30 bg-amber-500/5 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div>
            <h3 className="text-amber-400 mb-2">Disclaimer</h3>
            <p className="text-slate-400 text-sm">
              Trade ideas shared by community members are for educational purposes only and do not constitute 
              financial advice. Always do your own research and never risk more than you can afford to lose.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
