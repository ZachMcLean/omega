"use client";

import { MessageSquare, Send, Users, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const channels = [
    { id: "general", name: "general-chat", unread: 3 },
    { id: "trading", name: "trading-ideas", unread: 7 },
    { id: "earnings", name: "earnings-plays", unread: 0 },
    { id: "memes", name: "stonk-memes", unread: 12 },
  ];

  const messages = [
    {
      id: 1,
      username: "MoonShotKing",
      avatar: "AC",
      message: "Just bought the NVDA dip. Looking juicy at this level 🚀",
      time: "2m ago"
    },
    {
      id: 2,
      username: "TechQueenGG",
      avatar: "SK",
      message: "Nice entry! I'm waiting for confirmation above $495",
      time: "1m ago"
    },
    {
      id: 3,
      username: "ChartMaster420",
      avatar: "MJ",
      message: "RSI showing oversold on the 4H chart. Could bounce here",
      time: "30s ago"
    },
  ];

  const onlineMembers = [
    { username: "MoonShotKing", status: "trading" },
    { username: "TechQueenGG", status: "online" },
    { username: "ChartMaster420", status: "online" },
    { username: "DayTradeDemon", status: "away" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 h-[calc(100vh-200px)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
        {/* Channels Sidebar */}
        <Card className="border-slate-700 bg-slate-900/50 p-4 lg:col-span-1 h-fit lg:h-full overflow-auto">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-5 h-5 text-cyan-400" />
            <h2 className="text-slate-100">Channels</h2>
          </div>
          <div className="space-y-2">
            {channels.map((channel) => (
              <button
                key={channel.id}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  channel.id === "general"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    {channel.name}
                  </span>
                  {channel.unread > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-mono">
                      {channel.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-emerald-400" />
              <h2 className="text-slate-100">Online</h2>
            </div>
            <div className="space-y-2">
              {onlineMembers.map((member) => (
                <div key={member.username} className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === "online" || member.status === "trading" 
                      ? "bg-emerald-400" 
                      : "bg-amber-400"
                  }`} />
                  <span className="text-slate-300">{member.username}</span>
                  {member.status === "trading" && (
                    <span className="text-xs text-cyan-400">📊</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="border-slate-700 bg-slate-900/50 lg:col-span-3 flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-slate-700 p-4">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" />
              <h2 className="text-slate-100">general-chat</h2>
              <span className="text-xs text-slate-500 ml-auto">8 members</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-mono">{msg.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-slate-100">{msg.username}</span>
                    <span className="text-xs text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-slate-300">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-slate-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message #general-chat"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
