"use client";

import { useState } from "react";
import { WorkspaceHeader } from "./components/workspace-header";
import { InfoPills } from "./components/info-pills";
import { PortfolioChart } from "./components/portfolio-chart";
import { TeamPortfolios } from "./components/team-portfolios";
import { ActivityFeed } from "./components/activity-feed";
import { BottomNavigation } from "./components/bottom-navigation";

type TimePeriod = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD";

export default function SquadDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("6M");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <WorkspaceHeader
        workspaceName="Team Omega"
        tagline="Collaborate, compete, and win together."
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />
      
      <InfoPills />
      
      {/* Main Chart Section - More compact */}
      <div className="px-4 sm:px-6 py-4">
        <PortfolioChart selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      </div>
      
      {/* Two Column Layout: Team Portfolios (2/3) + Activity Feed (1/3) */}
      <div className="px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Portfolios - 2/3 width */}
          <div className="lg:col-span-2">
            <TeamPortfolios selectedPeriod={selectedPeriod} />
          </div>
          
          {/* Activity Feed - 1/3 width */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}

