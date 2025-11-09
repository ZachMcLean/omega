"use client";

/**
 * Bottom Navigation - Mobile-only navigation bar
 * Replaces sidebar on mobile devices with thumb-friendly bottom navigation
 * Context-aware: Shows different items based on solo vs workspace mode
 */

import { Briefcase, Trophy, TrendingUp, Globe, MessageSquare, LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useWorkspaceContext } from "@/lib/use-workspace-context";
import type { PageId } from "@/components/app-sidebar";

interface NavItem {
  id: PageId;
  icon: React.ElementType;
  label: string;
  path: string;
}

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentContext } = useWorkspaceContext();
  const isSoloMode = currentContext.type === "solo";

  // Map pathname to PageId for active state
  const getCurrentPage = (): PageId => {
    if (pathname === "/portfolio" || pathname === "/") return "portfolio";
    if (pathname.startsWith("/squad-dashboard")) return "squad-dashboard";
    if (pathname.startsWith("/news")) return "news";
    if (pathname.startsWith("/algorithm")) return "algorithm";
    if (pathname.startsWith("/challenges")) return "challenges";
    if (pathname.startsWith("/terminal")) return "terminal";
    if (pathname.startsWith("/chat")) return "chat";
    if (pathname.startsWith("/workspaces")) return "workspaces";
    return "portfolio";
  };

  const currentPage = getCurrentPage();

  // Base navigation items - always shown
  const baseNavItems: NavItem[] = [
    { id: "portfolio", icon: Briefcase, label: "Portfolio", path: "/portfolio" },
    { id: "terminal", icon: TrendingUp, label: "Terminal", path: "/terminal" },
    { id: "challenges", icon: Trophy, label: "Challenges", path: "/challenges" },
  ];

  // Context-aware navigation items
  const getNavItems = (): NavItem[] => {
    if (isSoloMode) {
      // Solo mode: Portfolio, Terminal, Challenges, Workspaces
      return [
        ...baseNavItems,
        { id: "workspaces", icon: Globe, label: "Squads", path: "/workspaces" },
      ];
    } else {
      // Workspace mode: Squad Dashboard, Terminal, Challenges, Chat
      return [
        { id: "squad-dashboard", icon: LayoutDashboard, label: "Squad", path: "/squad-dashboard" },
        { id: "terminal", icon: TrendingUp, label: "Terminal", path: "/terminal" },
        { id: "challenges", icon: Trophy, label: "Challenges", path: "/challenges" },
        { id: "chat", icon: MessageSquare, label: "Chat", path: "/chat" },
      ];
    }
  };

  const navItems = getNavItems();

  const handleNavigation = (item: NavItem) => {
    router.push(item.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-slate-950/95 backdrop-blur-sm border-t border-slate-800/50 safe-area-inset-bottom">
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-0 flex-1 ${
                isActive 
                  ? 'text-cyan-400 bg-cyan-500/10' 
                  : 'text-slate-500 hover:text-slate-300 active:text-cyan-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
              <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
