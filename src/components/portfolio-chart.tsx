"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Legend
} from "recharts";
import { 
  TrendingDown, 
  Target, 
  TrendingUp, 
  RefreshCw, 
  MoreVertical, 
  Download, 
  Link2, 
  Flag, 
  BarChart3, 
  Activity,
  Users,
  User,
  Eye,
  EyeOff,
  Percent,
  DollarSign,
  Maximize2,
  Briefcase
} from "lucide-react";
import { useWorkspaceContext } from "@/lib/use-workspace-context";

type TimePeriod = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD";
type ViewMode = "combined" | "individual";
type ChartMode = "absolute" | "percentage";

interface PortfolioChartProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  mode?: "solo" | "squad"; // Optional prop to override context detection
}

interface MemberData {
  id: string;
  name: string;
  username: string;
  color: string;
  initial: string;
  visible: boolean;
  isYou?: boolean;
  isPrimary?: boolean; // For accounts
  accountType?: "brokerage" | "retirement"; // For accounts
}

export function PortfolioChart({ selectedPeriod, onPeriodChange, mode }: PortfolioChartProps) {
  const { currentContext } = useWorkspaceContext();
  const isSoloMode = mode === "solo" || (mode === undefined && currentContext.type === "solo");
  
  const periods: TimePeriod[] = ["1D", "1W", "1M", "3M", "6M", "1Y", "YTD"];
  const [lastSyncTime, setLastSyncTime] = useState<number>(2);
  const [isSyncing, setIsSyncing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("combined");
  const [chartMode, setChartMode] = useState<ChartMode>("absolute");
  
  // Squad mode: Member data with visibility toggle - All 8 members from Team Omega
  // Solo mode: Account data with visibility toggle - Individual brokerage/retirement accounts
  const [members, setMembers] = useState<MemberData[]>(() => {
    if (isSoloMode) {
      // Solo mode: Track individual brokerage/retirement accounts
      return [
        { id: "robinhood", name: "Robinhood", username: "Growth Portfolio", color: "#00c805", initial: "R", visible: true, isPrimary: true, accountType: "brokerage" },
        { id: "fidelity", name: "Fidelity", username: "Retirement Account", color: "#00754a", initial: "F", visible: true, accountType: "retirement" },
        { id: "tdameritrade", name: "TD Ameritrade", username: "Active Trading", color: "#00a651", initial: "T", visible: true, accountType: "brokerage" },
      ];
    } else {
      // Squad mode: Track team members
      return [
        { id: "mike", name: "Mike", username: "MoonShotKing", color: "#f97316", initial: "M", visible: true },
        { id: "you", name: "Zach", username: "FlippinPsycho98", color: "#10b981", initial: "Z", visible: true, isYou: true },
        { id: "jamb", name: "JAMB", username: "ChartMaster420", color: "#06b6d4", initial: "J", visible: true },
        { id: "sarah", name: "Sarah", username: "TechQueenGG", color: "#a855f7", initial: "S", visible: true },
        { id: "alex", name: "Alex", username: "DayTradeDemon", color: "#ef4444", initial: "A", visible: true },
        { id: "jordan", name: "Jordan", username: "DiviKingdom", color: "#6366f1", initial: "J", visible: true },
        { id: "chris", name: "Chris", username: "CryptoMoonBoi", color: "#eab308", initial: "C", visible: true },
        { id: "taylor", name: "Taylor", username: "ThetaGangPro", color: "#14b8a6", initial: "T", visible: true },
      ];
    }
  });
  
  // Simulate time passing
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSyncTime(prev => prev + 1);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(0);
    }, 1500);
  };
  
  const toggleMemberVisibility = (id: string) => {
    setMembers(prev => 
      prev.map(m => m.id === id ? { ...m, visible: !m.visible } : m)
    );
  };
  
  // Generate mock data based on selected period
  // Use seeded random to ensure consistent values between server and client
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

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
    
    // Base values - different for solo (accounts) vs squad (members)
    const baseValues: { [key: string]: number } = isSoloMode ? {
      robinhood: 45000,
      fidelity: 32000,
      tdameritrade: 22000,
    } : {
      mike: 70000,
      you: 52000,
      jamb: 40000,
      sarah: 35000,
      alex: 28000,
      jordan: 23000,
      chris: 17000,
      taylor: 14000,
    };
    
    // Current values - different for solo (accounts) vs squad (members)
    const currentValues: { [key: string]: number } = isSoloMode ? {
      robinhood: 56250,
      fidelity: 38450,
      tdameritrade: 25570,
    } : {
      mike: 92450,
      you: 75270,
      jamb: 43200,
      sarah: 38450,
      alex: 29800,
      jordan: 24680,
      chris: 18920,
      taylor: 15340,
    };
    
    const totalBase = Object.values(baseValues).reduce((a, b) => a + b, 0);
    const totalCurrent = Object.values(currentValues).reduce((a, b) => a + b, 0);

    for (let i = 0; i < points; i++) {
      const progress = i / (points - 1);
      
      // Generate individual values with unique patterns
      // Use seeded random based on period and index for consistency
      const seed = period.charCodeAt(0) + period.charCodeAt(1) + i;
      const memberValues: { [key: string]: number } = {};
      
      if (isSoloMode) {
        // Solo mode: Generate account values
        memberValues.robinhood = baseValues.robinhood + 
          (currentValues.robinhood - baseValues.robinhood) * progress + 
          Math.sin(i * 0.3) * 3000 + seededRandom(seed + 1) * 2000;
        
        memberValues.fidelity = baseValues.fidelity + 
          (currentValues.fidelity - baseValues.fidelity) * progress + 
          Math.sin(i * 0.25 + 1) * 2000 + seededRandom(seed + 2) * 1500;
        
        memberValues.tdameritrade = baseValues.tdameritrade + 
          (currentValues.tdameritrade - baseValues.tdameritrade) * progress + 
          Math.sin(i * 0.35 + 2) * 1500 + seededRandom(seed + 3) * 1000;
      } else {
        // Squad mode: Generate member values
        memberValues.mike = baseValues.mike + 
          (currentValues.mike - baseValues.mike) * progress + 
          Math.sin(i * 0.3) * 5000 + seededRandom(seed + 1) * 3000;
        
        memberValues.you = baseValues.you + 
          (currentValues.you - baseValues.you) * progress + 
          Math.sin(i * 0.35 + 2) * 3500 + seededRandom(seed + 2) * 2000;
        
        memberValues.jamb = baseValues.jamb + 
          (currentValues.jamb - baseValues.jamb) * progress + 
          Math.sin(i * 0.25 + 1) * 2000 + seededRandom(seed + 3) * 1500;
        
        memberValues.sarah = baseValues.sarah + 
          (currentValues.sarah - baseValues.sarah) * progress + 
          Math.sin(i * 0.4 + 3) * 2500 + seededRandom(seed + 4) * 1800;
        
        memberValues.alex = baseValues.alex + 
          (currentValues.alex - baseValues.alex) * progress + 
          Math.sin(i * 0.45 + 4) * 1800 + seededRandom(seed + 5) * 1200;
        
        memberValues.jordan = baseValues.jordan + 
          (currentValues.jordan - baseValues.jordan) * progress + 
          Math.sin(i * 0.28 + 5) * 1500 + seededRandom(seed + 6) * 1000;
        
        memberValues.chris = baseValues.chris + 
          (currentValues.chris - baseValues.chris) * progress + 
          Math.sin(i * 0.5 + 6) * 1200 + seededRandom(seed + 7) * 800;
        
        memberValues.taylor = baseValues.taylor + 
          (currentValues.taylor - baseValues.taylor) * progress + 
          Math.sin(i * 0.32 + 7) * 1000 + seededRandom(seed + 8) * 600;
      }
      
      const combinedValue = Object.values(memberValues).reduce((a, b) => a + b, 0);

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

      // Calculate percentage changes for each member
      const memberPercents: { [key: string]: number } = {};
      Object.keys(memberValues).forEach(key => {
        memberPercents[`${key}Percent`] = ((memberValues[key] - baseValues[key]) / baseValues[key]) * 100;
      });
      
      const combinedPercent = ((combinedValue - totalBase) / totalBase) * 100;

      // Build data object dynamically based on mode
      const dataPoint: any = {
        date: label,
        combined: Math.round(combinedValue),
        combinedPercent: parseFloat(combinedPercent.toFixed(2)),
      };
      
      // Add individual values based on mode
      Object.keys(memberValues).forEach(key => {
        dataPoint[key] = Math.round(memberValues[key]);
        if (memberPercents[`${key}Percent`]) {
          dataPoint[`${key}Percent`] = parseFloat(memberPercents[`${key}Percent`].toFixed(2));
        }
      });
      
      data.push(dataPoint);
    }

    return data;
  };

  const data = generateData(selectedPeriod);
  // Calculate current value from combined data or use default
  const currentValue = data.length > 0 ? data[data.length - 1].combined : (isSoloMode ? 120270 : 210920);
  const goal = isSoloMode ? 200000 : 500000;
  const goalProgress = (currentValue / goal) * 100;
  
  // Portfolio returns by period
  const portfolioReturns: { [key in TimePeriod]: number } = {
    "1D": -0.21,
    "1W": 2.4,
    "1M": 5.8,
    "3M": 18.2,
    "6M": 40.6,
    "1Y": 52.3,
    "YTD": 28.7,
  };
  
  // S&P500 returns by period
  const sp500Returns: { [key in TimePeriod]: number } = {
    "1D": 0.15,
    "1W": 1.2,
    "1M": 2.8,
    "3M": 6.4,
    "6M": 12.4,
    "1Y": 18.9,
    "YTD": 10.2,
  };
  
  const portfolioReturn = portfolioReturns[selectedPeriod];
  const sp500Return = sp500Returns[selectedPeriod];
  const vsSP500 = portfolioReturn - sp500Return;
  const healthScore = 92;
  const todayChangePercent = -0.21;
  const membersGreen = 2;
  const nextMilestone = 250000;
  const toMilestone = nextMilestone - currentValue;
  
  // Calculate health score color and label
  const getHealthInfo = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" };
    if (score >= 75) return { label: "Good", color: "text-cyan-400", bg: "bg-cyan-500/20", border: "border-cyan-500/30" };
    if (score >= 60) return { label: "Fair", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" };
    return { label: "Needs Attention", color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30" };
  };
  
  const healthInfo = getHealthInfo(healthScore);
  
  const formatSyncTime = (minutes: number) => {
    if (minutes === 0) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-slate-400 text-xs mb-2">{label}</p>
          {viewMode === "combined" ? (
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-300 text-sm">Combined Portfolio</span>
                <span className="text-white font-medium tabular-nums">
                  {chartMode === "absolute" 
                    ? `$${payload[0].value.toLocaleString("en-US")}`
                    : `${payload[0].value >= 0 ? '+' : ''}${payload[0].value.toFixed(2)}%`
                  }
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              {members.filter(m => m.visible).map((member, idx) => {
                const dataKey = chartMode === "absolute" ? member.id : `${member.id}Percent`;
                const value = payload.find((p: any) => p.dataKey === dataKey)?.value;
                return (
                  <div key={member.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: member.color }}
                      />
                      <span className="text-slate-300 text-sm">
                        {member.username}
                      </span>
                    </div>
                    <span className="text-white font-medium tabular-nums">
                      {chartMode === "absolute"
                        ? `$${value?.toLocaleString("en-US")}`
                        : `${value >= 0 ? '+' : ''}${value?.toFixed(2)}%`
                      }
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-slate-700/50 bg-gradient-to-b from-slate-800/40 via-slate-900/40 to-slate-800/40 backdrop-blur-sm">
      <div className="p-5 space-y-4">
        {/* Enhanced Header with Portfolio Value, Stats, and Actions */}
        <div className="flex flex-col gap-4">
          {/* Top Row: Portfolio Value + Actions */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-white text-2xl sm:text-3xl tabular-nums">
                  ${currentValue.toLocaleString("en-US")}
                </span>
                <span className="text-slate-400 text-xs sm:text-sm">/ ${(goal / 1000).toFixed(0)}K Goal</span>
              </div>
              
              {/* Stats Row 1: Performance Metrics */}
              <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
                {/* Today's Change */}
                <div className="flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span className="text-red-400 tabular-nums">{todayChangePercent}% today</span>
                </div>
                
                <span className="text-slate-600">•</span>
                
                {/* Portfolio Return - moved to same line as Today's Change */}
                <div className={`flex items-center gap-1.5 ${portfolioReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {portfolioReturn >= 0 ? (
                    <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 flex-shrink-0" />
                  )}
                  <span className="tabular-nums">
                    {portfolioReturn >= 0 ? '+' : ''}{portfolioReturn.toFixed(1)}% ({selectedPeriod})
                  </span>
                </div>
                
                <span className="text-slate-600 hidden md:inline">•</span>
                
                {/* S&P500 Return */}
                <div className={`hidden md:flex items-center gap-1.5 ${sp500Return >= 0 ? 'text-slate-400' : 'text-slate-500'}`}>
                  <BarChart3 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="tabular-nums">
                    S&P500: {sp500Return >= 0 ? '+' : ''}{sp500Return.toFixed(1)}%
                  </span>
                </div>
                
                <span className="text-slate-600 hidden md:inline">•</span>
                
                {/* Status - Different for solo vs squad */}
                {isSoloMode ? (
                  <span className="hidden md:inline text-slate-300">{members.filter(m => m.visible).length} accounts active</span>
                ) : (
                  <span className="hidden md:inline text-slate-300">{membersGreen} members green</span>
                )}
              </div>
              
              {/* Stats Row 2: Milestone Progress */}
              <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span className="text-slate-300">
                    <span className="text-purple-400 tabular-nums">${(toMilestone / 1000).toFixed(1)}K</span>
                    <span className="text-slate-400"> to </span>
                    <span className="text-white tabular-nums">${(nextMilestone / 1000).toFixed(0)}K</span>
                  </span>
                </div>
                
                <span className="text-slate-600 hidden sm:inline">•</span>
                
                <span className="text-xs text-purple-400 hidden sm:inline">Unlock "Quarter Mil Club" 💎</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {/* Health Score Badge */}
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border ${healthInfo.bg} ${healthInfo.border}`}>
                <Activity className={`w-3.5 h-3.5 ${healthInfo.color}`} />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400">Health:</span>
                  <span className={`text-xs font-medium ${healthInfo.color}`}>{healthScore}/100</span>
                  <span className={`text-xs ${healthInfo.color}`}>({healthInfo.label})</span>
                </div>
              </div>
              
              {/* Last Sync Indicator */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className={`w-1.5 h-1.5 rounded-full ${lastSyncTime < 5 ? 'bg-emerald-500' : lastSyncTime < 15 ? 'bg-yellow-500' : 'bg-slate-500'} ${lastSyncTime < 5 ? 'animate-pulse' : ''}`}></div>
                <span className="text-xs text-slate-400">Last updated:</span>
                <span className="text-xs text-slate-300">{formatSyncTime(lastSyncTime)}</span>
              </div>
              
              {/* Sync Button */}
              <Button
                size="sm"
                onClick={handleSync}
                disabled={isSyncing}
                className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 hover:from-cyan-500/30 hover:to-blue-500/30 shadow-lg shadow-cyan-500/20"
              >
                <RefreshCw className={`w-4 h-4 mr-1.5 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync'}
              </Button>
              
              {/* More Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white hover:bg-slate-700/50"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-700">
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                    <Link2 className="w-4 h-4 mr-2" />
                    Connect Broker
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                    <Flag className="w-4 h-4 mr-2" />
                    Set New Milestone
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Compare Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${goalProgress}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex gap-1 bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("combined")}
                className={`h-8 px-2.5 sm:px-3 text-xs transition-all ${
                  viewMode === "combined"
                    ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {isSoloMode ? (
                  <>
                    <Briefcase className="w-3.5 h-3.5 sm:mr-1.5" />
                    <span className="hidden sm:inline">Combined</span>
                  </>
                ) : (
                  <>
                    <Users className="w-3.5 h-3.5 sm:mr-1.5" />
                    <span className="hidden sm:inline">Combined</span>
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("individual")}
                className={`h-8 px-2.5 sm:px-3 text-xs transition-all ${
                  viewMode === "individual"
                    ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {isSoloMode ? (
                  <>
                    <Briefcase className="w-3.5 h-3.5 sm:mr-1.5" />
                    <span className="hidden sm:inline">By Account</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 sm:mr-1.5" />
                    <span className="hidden sm:inline">Individual</span>
                  </>
                )}
              </Button>
            </div>

            {/* Chart Mode Toggle */}
            <div className="inline-flex gap-1 bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChartMode("absolute")}
                className={`h-8 px-2.5 sm:px-3 text-xs transition-all ${
                  chartMode === "absolute"
                    ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 sm:mr-1" />
                <span className="hidden sm:inline">Value</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChartMode("percentage")}
                className={`h-8 px-2.5 sm:px-3 text-xs transition-all ${
                  chartMode === "percentage"
                    ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Percent className="w-3.5 h-3.5 sm:mr-1" />
                <span className="hidden sm:inline">Change</span>
              </Button>
            </div>
          </div>

          {/* Member/Account Legend (Individual View Only) */}
          {viewMode === "individual" && (
            <div className="flex items-center gap-2 flex-wrap">
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => toggleMemberVisibility(member.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    member.visible
                      ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'
                      : 'bg-slate-900/50 border-slate-800/50 opacity-50 hover:opacity-75'
                  }`}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: member.color }}
                  />
                  <span className="text-xs text-slate-300">
                    {isSoloMode ? member.name : member.username}
                  </span>
                  {isSoloMode && member.accountType && (
                    <Badge variant="outline" className="ml-1 text-[10px] px-1.5 py-0 border-slate-600 text-slate-400">
                      {member.accountType === "retirement" ? "401k" : "Brokerage"}
                    </Badge>
                  )}
                  {member.visible ? (
                    <Eye className="w-3 h-3 text-slate-400" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-slate-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chart with enhanced features */}
        <div className="relative rounded-xl overflow-hidden border border-slate-700/30 bg-slate-900/50">
          {/* Chart */}
          <div className="px-4 pt-4 pb-4">
            <ResponsiveContainer width="100%" height={360}>
              {viewMode === "combined" ? (
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCombined" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis
                    dataKey="date"
                    stroke="#64748b"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(value) => 
                      chartMode === "absolute" 
                        ? `${(value / 1000).toFixed(0)}k`
                        : `${value.toFixed(0)}%`
                    }
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {chartMode === "percentage" && (
                    <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" opacity={0.5} />
                  )}
                  <Area
                    type="monotone"
                    dataKey={chartMode === "absolute" ? "combined" : "combinedPercent"}
                    stroke="#06b6d4"
                    strokeWidth={2.5}
                    fill="url(#colorCombined)"
                    dot={false}
                    activeDot={{ r: 6, fill: "#06b6d4", stroke: "#0f172a", strokeWidth: 2 }}
                  />
                </AreaChart>
              ) : (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis
                    dataKey="date"
                    stroke="#64748b"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(value) => 
                      chartMode === "absolute" 
                        ? `${(value / 1000).toFixed(0)}k`
                        : `${value.toFixed(0)}%`
                    }
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {chartMode === "percentage" && (
                    <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" opacity={0.5} />
                  )}
                  {members.filter(m => m.visible).map((member) => (
                    <Line
                      key={member.id}
                      type="monotone"
                      dataKey={chartMode === "absolute" ? member.id : `${member.id}Percent`}
                      stroke={member.color}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6, fill: member.color, stroke: "#0f172a", strokeWidth: 2 }}
                    />
                  ))}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
          
          {/* Period Selector - Bottom Left */}
          <div className="px-4 pb-3">
            <div className="inline-flex gap-1 bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
              {periods.map((period) => (
                <Button
                  key={period}
                  variant="ghost"
                  size="sm"
                  onClick={() => onPeriodChange(period)}
                  className={`h-7 px-3 text-xs transition-all ${
                    selectedPeriod === period
                      ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}