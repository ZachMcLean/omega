"use client";

import { Sparkles, Settings, UserPlus, BarChart, LogOut, Bell, Share2, TrendingUp, User, CreditCard, Shield, HelpCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type TimePeriod = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD";

interface WorkspaceHeaderProps {
  workspaceName: string;
  tagline: string;
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export function WorkspaceHeader({
  workspaceName,
  tagline,
  selectedPeriod,
  onPeriodChange,
}: WorkspaceHeaderProps) {
  const periods: TimePeriod[] = ["1D", "1W", "1M", "3M", "6M", "1Y", "YTD"];

  // Mock online members
  const onlineMembers = [
    { name: "Mike", color: "from-orange-500 to-red-500", initial: "M" },
    { name: "JAMB", color: "from-blue-500 to-cyan-500", initial: "J" },
    { name: "You", color: "from-emerald-500 to-green-500", initial: "Y" },
  ];

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700/50 bg-gradient-to-b from-slate-800/30 to-transparent">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {/* Omega Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 blur-lg opacity-30 rounded-xl"></div>
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl md:text-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Omega Trading Squad
              </h1>
              <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 uppercase tracking-wide flex-shrink-0">
                Beta
              </span>
            </div>
            <p className="text-slate-400 text-xs hidden sm:block truncate">The endgame portfolio tracker for collaboration and wealth creation</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-slate-900 border-slate-700">
            <div className="p-3 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-white">Notifications</h3>
                <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                  3 new
                </Badge>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer flex-col items-start p-3">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm">Mike added TSLA position</span>
                </div>
                <span className="text-xs text-slate-500 ml-4">2 minutes ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer flex-col items-start p-3">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm">Portfolio hit $210K milestone!</span>
                </div>
                <span className="text-xs text-slate-500 ml-4">1 hour ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer flex-col items-start p-3">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">New challenge: Beat the S&P500</span>
                </div>
                <span className="text-xs text-slate-500 ml-4">3 hours ago</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-700">
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              App Preferences
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
              <Bell className="w-4 h-4 mr-2" />
              Notification Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
              <Sparkles className="w-4 h-4 mr-2" />
              Display & Theme
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Widget */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-700/50 pl-2 pr-3"
            >
              <Avatar className="w-8 h-8 border-2 border-cyan-500/30">
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm text-white">John Doe</span>
                <span className="text-xs text-slate-400">Pro Trader</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-slate-900 border-slate-700">
            {/* Profile Header */}
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12 border-2 border-cyan-500/30">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-white">John Doe</div>
                  <div className="text-xs text-slate-400">john.doe@email.com</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div>
                  <div className="text-xs text-slate-400">Portfolio Value</div>
                  <div className="text-sm text-white">$247,582</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Today's P&L</div>
                  <div className="text-sm text-emerald-400">+$2,847</div>
                </div>
              </div>
            </div>

            {/* Profile & Account */}
            <div className="py-1">
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                <CreditCard className="w-4 h-4 mr-2" />
                Billing & Subscription
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator className="bg-slate-700" />

            {/* Security & Support */}
            <div className="py-1">
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                <Shield className="w-4 h-4 mr-2" />
                Security & Privacy
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help Center
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                <FileText className="w-4 h-4 mr-2" />
                Documentation
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator className="bg-slate-700" />

            {/* Logout */}
            <div className="py-1">
              <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-slate-800 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

