import { Button } from "@/components/ui/button";
import { BarChart3, Target, Users, MessageSquare } from "lucide-react";

export function BottomNavigation() {
  const navItems = [
    { icon: BarChart3, label: "Compare", color: "text-blue-400" },
    { icon: Target, label: "Challenges", color: "text-yellow-400" },
    { icon: Users, label: "Team Draft", color: "text-purple-400" },
    { icon: MessageSquare, label: "Chat", color: "text-emerald-400" },
  ];

  return (
    <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm py-8">
      <div className="px-4 sm:px-6 text-center">
        <p className="text-slate-500 text-sm">Omega Trading Platform © 2025</p>
      </div>
    </div>
  );
}

