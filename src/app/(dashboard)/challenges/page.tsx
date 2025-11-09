"use client";

import { Trophy, Target, Award, Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ChallengesPage() {
  const activeChallenges = [
    {
      id: 1,
      title: "100-Day Streak",
      description: "Log in and check your portfolio for 100 consecutive days",
      progress: 73,
      total: 100,
      reward: "Golden Trader Badge",
      difficulty: "Hard"
    },
    {
      id: 2,
      title: "Green Week Warrior",
      description: "Achieve positive returns for 5 consecutive weeks",
      progress: 3,
      total: 5,
      reward: "+50 XP",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Portfolio Diversification",
      description: "Hold positions in at least 10 different sectors",
      progress: 7,
      total: 10,
      reward: "Diversification Master Badge",
      difficulty: "Medium"
    }
  ];

  const achievements = [
    { icon: "🚀", title: "First Trade", desc: "Made your first trade", date: "Oct 1, 2025" },
    { icon: "💰", title: "$100K Portfolio", desc: "Reached $100,000 portfolio value", date: "Oct 15, 2025" },
    { icon: "📈", title: "10% Gains", desc: "Achieved 10% total returns", date: "Oct 20, 2025" },
    { icon: "🎯", title: "Sniper Entry", desc: "Bought the dip perfectly (within 2% of bottom)", date: "Oct 22, 2025" }
  ];

  return (
    <div className="px-4 sm:px-6 py-4 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <Trophy className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h1 className="text-slate-100">Challenges & Achievements</h1>
          <p className="text-slate-400">Level up your trading game and earn rewards</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-700 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-slate-400 text-sm">Total XP</p>
              <p className="font-mono text-amber-400">2,450</p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-700 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-purple-400" />
            <div>
              <p className="text-slate-400 text-sm">Badges Earned</p>
              <p className="font-mono text-purple-400">12/48</p>
            </div>
          </div>
        </Card>
        <Card className="border-slate-700 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-cyan-400" />
            <div>
              <p className="text-slate-400 text-sm">Challenges Active</p>
              <p className="font-mono text-cyan-400">3/5</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Challenges */}
      <div>
        <h2 className="text-slate-200 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-400" />
          Active Challenges
        </h2>
        <div className="space-y-4">
          {activeChallenges.map((challenge) => (
            <Card key={challenge.id} className="border-slate-700 bg-slate-900/50 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-slate-100">{challenge.title}</h3>
                    <Badge variant={
                      challenge.difficulty === 'Hard' ? 'destructive' :
                      challenge.difficulty === 'Medium' ? 'default' :
                      'secondary'
                    }>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{challenge.description}</p>
                  <p className="text-xs text-amber-400">🏆 {challenge.reward}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-mono text-cyan-400">{challenge.progress}/{challenge.total}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h2 className="text-slate-200 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement, idx) => (
            <Card key={idx} className="border-amber-500/30 bg-slate-900/50 p-4 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h3 className="text-slate-100 mb-1">{achievement.title}</h3>
                  <p className="text-sm text-slate-400 mb-2">{achievement.desc}</p>
                  <p className="text-xs text-slate-500">{achievement.date}</p>
                </div>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
