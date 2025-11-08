import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AgCharts } from "ag-charts-community";
import { AgChartOptions } from "ag-charts-community";
import { TrendingDown, Target, TrendingUp, Activity, Shield, Percent } from "lucide-react";

type TimePeriod = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD";

interface PortfolioChartProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export default function PortfolioChart({ selectedPeriod, onPeriodChange }: PortfolioChartProps) {
  const periods: TimePeriod[] = ["1D", "1W", "1M", "3M", "6M", "1Y", "YTD"];
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Generate mock data based on selected period
  const generateData = (period: TimePeriod) => {
    const dataPoints: { [key in TimePeriod]: number } = {
      "1D": 24,
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
      "YTD": 290,
    };

    const points = dataPoints[period];
    const data = [];
    const baseValue = 150000;
    const currentValue = 210920;
    const growth = currentValue - baseValue;

    for (let i = 0; i < points; i++) {
      const progress = i / (points - 1);
      const randomVariation = Math.sin(i * 0.3) * 8000 + Math.random() * 5000;
      const value = baseValue + growth * progress + randomVariation;

      let label = "";
      if (period === "1D") {
        label = i % 4 === 0 || i === points - 1 ? `${i}:00` : "";
      } else if (period === "1W") {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        label = days[i];
      } else if (period === "1M" || period === "3M" || period === "6M" || period === "YTD") {
        if (i % Math.floor(points / 6) === 0 || i === points - 1) {
          const date = new Date();
          date.setDate(date.getDate() - (points - i));
          label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        }
      } else {
        if (i % Math.floor(points / 12) === 0 || i === points - 1) {
          const date = new Date();
          date.setMonth(date.getMonth() - Math.floor((points - i) / 30));
          label = date.toLocaleDateString("en-US", { month: "short" });
        }
      }

      data.push({
        date: label,
        value: Math.round(value),
      });
    }

    return data;
  };

  const data = generateData(selectedPeriod);
  const currentValue = 210920;
  const goal = 500000;
  const goalProgress = (currentValue / goal) * 100;
  const todayChangePercent = -0.21;
  const membersGreen = 3;
  const nextMilestone = 250000;
  const toMilestone = nextMilestone - currentValue;

  // Create chart when component mounts or data changes
  useEffect(() => {
    if (chartRef.current) {
      const chart = AgCharts.create({
        container: chartRef.current,
        ...chartOptions,
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data, selectedPeriod]);

  // AG Charts configuration
  const chartOptions: AgChartOptions = {
    data: data,
    series: [
      {
        type: 'area',
        xKey: 'date',
        yKey: 'value',
        fill: '#06b6d4',
        fillOpacity: 0.4,
        stroke: '#06b6d4',
        strokeWidth: 2.5,
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: 'Time Period',
        },
        label: {
          color: '#94a3b8',
          fontSize: 12,
        },
        line: {
          stroke: '#64748b',
        },
        tick: {
          stroke: '#64748b',
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Portfolio Value ($)',
        },
        label: {
          color: '#94a3b8',
          fontSize: 12,
          formatter: (params: any) => `$${(params.value / 1000).toFixed(0)}k`,
        },
        line: {
          stroke: '#64748b',
        },
        tick: {
          stroke: '#64748b',
        },
      },
    ],
    background: {
      fill: 'transparent',
    },
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    tooltip: {
      renderer: (params: any) => {
        return `<div style="padding: 8px; background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; color: #fff;">
          <div style="color: #06b6d4; font-weight: bold;">Portfolio Value</div>
          <div>$${params.datum.value.toLocaleString('en-US')}</div>
        </div>`;
      },
    },
  } as any;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Main Portfolio Value Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-white text-4xl sm:text-5xl">
                ${currentValue.toLocaleString("en-US")}
              </span>
              <span className="text-slate-400 text-lg">/ ${(goal / 1000).toFixed(0)}K Goal</span>
              <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30">
                {goalProgress.toFixed(0)}% Complete
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-red-400">
                <TrendingDown className="w-4 h-4" />
                <span>{todayChangePercent}% today</span>
              </div>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">{membersGreen} members green</span>
            </div>
          </div>
          <div className="flex gap-1">
            {periods.map((period) => (
              <Button
                key={period}
                variant="ghost"
                size="sm"
                onClick={() => onPeriodChange(period)}
                className={`px-2 sm:px-3 text-xs sm:text-sm ${
                  selectedPeriod === period
                    ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/50"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        <Progress value={goalProgress} className="h-1.5 bg-slate-700/50" />
      </div>

      {/* Chart Section */}
      <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-hidden shadow-xl shadow-cyan-500/10">
        <div className="relative">
          {/* Period indicator overlay */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 text-sm">
            {selectedPeriod}
          </div>

          {/* Chart */}
          <div className="p-4 pt-16">
            <div style={{ height: '300px', width: '100%' }}>
              <div ref={chartRef} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>

          {/* Chart footer note */}
          <div className="absolute bottom-4 right-4 text-xs text-slate-500">
            Powered by AG Charts
          </div>
        </div>
      </Card>

      {/* Milestone + Performance & Risk Metrics */}
      <div className="w-full flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Milestone Card */}
        <div className="flex-1 flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Next Milestone: ${(nextMilestone / 1000).toFixed(0)}K</div>
              <div className="text-xs text-purple-400">Unlock "Quarter Mil Club"</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <div>
              <div className="text-sm text-slate-400">${(toMilestone / 1000).toFixed(1)}K to go</div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500/20">
              <span className="text-purple-400">💎</span>
            </div>
          </div>
        </div>

        {/* Today's Performance */}
        <div className="flex-1 grid grid-cols-3 gap-3 p-4 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-slate-600/50">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-slate-400">Today's P&L</span>
            </div>
            <div className="text-emerald-400">+$2,847</div>
            <div className="text-xs text-emerald-400/70">+1.35%</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-x border-slate-600/50">
            <div className="flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs text-slate-400">Win Rate</span>
            </div>
            <div className="text-cyan-400">68%</div>
            <div className="text-xs text-cyan-400/70">42/62 trades</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs text-slate-400">Volume</span>
            </div>
            <div className="text-cyan-400">$847K</div>
            <div className="text-xs text-cyan-400/70">Today</div>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="flex-1 grid grid-cols-3 gap-3 p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs text-slate-400">Sharpe</span>
            </div>
            <div className="text-yellow-400">2.4</div>
            <div className="text-xs text-yellow-400/70">Excellent</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-x border-amber-500/20">
            <div className="flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs text-slate-400">Max DD</span>
            </div>
            <div className="text-red-400">-8.2%</div>
            <div className="text-xs text-red-400/70">$17.3K</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs text-slate-400">Risk</span>
            </div>
            <div className="text-yellow-400">Medium</div>
            <div className="text-xs text-yellow-400/70">Balanced</div>
          </div>
        </div>
      </div>
    </div>
  );
}