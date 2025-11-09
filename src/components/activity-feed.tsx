"use client";

import { 
  Trophy, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  Clock, 
  Settings,
  Activity,
  Award,
  Flame
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityItem {
  id: string;
  type: "achievement" | "trade" | "comment" | "challenge" | "milestone";
  username: string;
  action: string;
  details?: string;
  amount?: number;
  xp?: number;
  timestamp: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  emoji?: string;
}

export function ActivityFeed() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "achievement",
      username: "MoonShotKing",
      action: 'unlocked "10-Day Streak" badge',
      timestamp: "15 minutes ago",
      icon: <Trophy className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-yellow-500/15 to-amber-500/15 border-yellow-500/30",
      iconColor: "bg-gradient-to-br from-yellow-500 to-amber-500",
      emoji: "🔥",
    },
    {
      id: "2",
      type: "trade",
      username: "FlippinPsycho98",
      action: "sold 10 shares of TSLA",
      amount: -420,
      timestamp: "1 hour ago",
      icon: <TrendingDown className="w-4 h-4" />,
      bgColor: "bg-slate-800/40 border-slate-700/50",
      iconColor: "bg-emerald-500",
    },
    {
      id: "3",
      type: "comment",
      username: "ChartMaster420",
      action: "commented on TSLA news",
      details: "This is a great opportunity to average down",
      timestamp: "2 hours ago",
      icon: <MessageSquare className="w-4 h-4" />,
      bgColor: "bg-purple-500/10 border-purple-500/30",
      iconColor: "bg-purple-500",
    },
    {
      id: "4",
      type: "challenge",
      username: "MoonShotKing",
      action: 'completed "First to 10%" challenge',
      xp: 500,
      timestamp: "3 hours ago",
      icon: <Target className="w-4 h-4" />,
      bgColor: "bg-cyan-500/10 border-cyan-500/30",
      iconColor: "bg-cyan-500",
    },
    {
      id: "5",
      type: "trade",
      username: "TechQueenGG",
      action: "bought 25 shares of NVDA",
      amount: 11006,
      timestamp: "4 hours ago",
      icon: <TrendingUp className="w-4 h-4" />,
      bgColor: "bg-slate-800/40 border-slate-700/50",
      iconColor: "bg-emerald-500",
    },
    {
      id: "6",
      type: "achievement",
      username: "DiviKingdom",
      action: 'unlocked "Dividend Master" badge',
      timestamp: "5 hours ago",
      icon: <Award className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-yellow-500/15 to-amber-500/15 border-yellow-500/30",
      iconColor: "bg-gradient-to-br from-yellow-500 to-amber-500",
      emoji: "👑",
    },
    {
      id: "7",
      type: "trade",
      username: "CryptoMoonBoi",
      action: "bought 0.5 BTC",
      amount: 22125,
      timestamp: "6 hours ago",
      icon: <TrendingUp className="w-4 h-4" />,
      bgColor: "bg-slate-800/40 border-slate-700/50",
      iconColor: "bg-emerald-500",
    },
    {
      id: "8",
      type: "comment",
      username: "DayTradeDemon",
      action: "commented on SPY analysis",
      details: "I'm seeing a potential breakout pattern here",
      timestamp: "7 hours ago",
      icon: <MessageSquare className="w-4 h-4" />,
      bgColor: "bg-purple-500/10 border-purple-500/30",
      iconColor: "bg-purple-500",
    },
    {
      id: "9",
      type: "milestone",
      username: "FlippinPsycho98",
      action: "reached $75K portfolio milestone",
      xp: 1000,
      timestamp: "8 hours ago",
      icon: <Zap className="w-4 h-4" />,
      bgColor: "bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border-cyan-500/30",
      iconColor: "bg-gradient-to-br from-cyan-500 to-blue-500",
      emoji: "🎯",
    },
    {
      id: "10",
      type: "trade",
      username: "ThetaGangPro",
      action: "sold SPX call spreads",
      amount: -890,
      timestamp: "9 hours ago",
      icon: <TrendingDown className="w-4 h-4" />,
      bgColor: "bg-slate-800/40 border-slate-700/50",
      iconColor: "bg-emerald-500",
    },
  ];

  return (
    <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-white">Activity Feed</h3>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs px-2 py-0">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></div>
              Live
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-slate-300"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Activity List */}
      <ScrollArea className="flex-1">
        <div className="p-3 sm:p-4 space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-3 sm:p-4 rounded-lg border transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer ${activity.bgColor}`}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${activity.iconColor} shadow-lg`}>
                  {activity.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">{activity.username}</span>{" "}
                      <span className="text-slate-300">{activity.action}</span>
                      {activity.emoji && (
                        <span className="ml-2 text-base">{activity.emoji}</span>
                      )}
                    </p>
                    {/* Amount/XP Badge */}
                    {activity.amount !== undefined && (
                      <Badge
                        className={`flex-shrink-0 ${
                          activity.amount < 0
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        }`}
                      >
                        {activity.amount < 0 ? "" : "+"}${Math.abs(activity.amount).toLocaleString()}
                      </Badge>
                    )}
                    {activity.xp !== undefined && (
                      <Badge className="flex-shrink-0 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                        +{activity.xp} XP
                      </Badge>
                    )}
                  </div>

                  {/* Details/Quote */}
                  {activity.details && (
                    <p className="text-slate-400 text-xs sm:text-sm mb-2 italic">
                      "{activity.details}"
                    </p>
                  )}

                  {/* Timestamp */}
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}

