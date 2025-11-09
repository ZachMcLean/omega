"use client";

import { Bot, Code, Zap, AlertCircle, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AlgorithmLabPage() {
  return (
    <div className="px-4 sm:px-6 py-4 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
          <Bot className="w-6 h-6 text-violet-400" />
        </div>
        <div>
          <h1 className="text-slate-100">Algorithm Lab</h1>
          <p className="text-slate-400">Build, backtest, and deploy trading algorithms</p>
        </div>
      </div>

      {/* Coming Soon - Main Feature */}
      <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 rounded-full bg-violet-500/20 border border-violet-500/30">
            <Code className="w-8 h-8 text-violet-400" />
          </div>
          <h2 className="text-slate-100">Algorithm Lab Coming Soon</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Create custom trading strategies with our visual algorithm builder. 
            Backtest against historical data, optimize parameters, and deploy automated trades.
          </p>
        </div>
      </Card>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-slate-700 bg-slate-900/50 p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-slate-100 mb-2">Visual Strategy Builder</h3>
              <p className="text-sm text-slate-400">
                Drag-and-drop interface to build complex trading algorithms without code
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-900/50 p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Code className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-slate-100 mb-2">Python Integration</h3>
              <p className="text-sm text-slate-400">
                Write custom indicators and strategies in Python for advanced users
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-900/50 p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-slate-100 mb-2">Backtesting Engine</h3>
              <p className="text-sm text-slate-400">
                Test strategies against years of historical data with realistic market conditions
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-900/50 p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-slate-100 mb-2">Live Deployment</h3>
              <p className="text-sm text-slate-400">
                Deploy proven strategies to trade automatically with your broker
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Beta Signup */}
      <Card className="border-amber-500/30 bg-amber-500/5 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-amber-400 mb-2">Join the Beta Waitlist</h3>
            <p className="text-slate-400 text-sm mb-4">
              Algorithm Lab is currently in development. Sign up to be notified when early access becomes available.
            </p>
            <button className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30 transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
