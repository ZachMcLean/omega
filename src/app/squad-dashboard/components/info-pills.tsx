import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StockTicker {
  symbol: string;
  price: number;
  changePercent: number;
  isPositive: boolean;
}

export function InfoPills() {
  // Group's current holdings - sorted by highest movers (most volatile first)
  // Max 14 stocks displayed
  const stocks: StockTicker[] = [
    { symbol: "LTBR", price: 124.87, changePercent: 8.45, isPositive: true },
    { symbol: "NNE", price: 89.32, changePercent: 6.92, isPositive: true },
    { symbol: "OKLO", price: 31.54, changePercent: 5.21, isPositive: true },
    { symbol: "SMR", price: 45.18, changePercent: 4.67, isPositive: true },
    { symbol: "BTC", price: 44250.00, changePercent: 3.84, isPositive: true },
    { symbol: "TSLA", price: 462.50, changePercent: 3.21, isPositive: true },
    { symbol: "NVDA", price: 440.25, changePercent: 2.09, isPositive: true },
    { symbol: "UEC", price: 8.42, changePercent: 1.89, isPositive: true },
    { symbol: "UUUU", price: 6.73, changePercent: 1.52, isPositive: true },
    { symbol: "META", price: 488.00, changePercent: 1.24, isPositive: true },
    { symbol: "ETH", price: 2600.00, changePercent: 0.95, isPositive: true },
    { symbol: "AAPL", price: 180.00, changePercent: -0.84, isPositive: false },
    { symbol: "GOOGL", price: 150.00, changePercent: -1.15, isPositive: false },
    { symbol: "SPY", price: 565.80, changePercent: -1.39, isPositive: false },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-800/20 via-slate-700/20 to-slate-800/20 border-y border-slate-700/30 overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-3 sm:px-4 py-2.5 sm:py-3 min-w-max">
          {/* News Preview Cards */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/15 transition-all cursor-pointer group w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-1 h-12 bg-cyan-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/40 text-[10px] px-1.5 py-0">
                    MARKET
                  </Badge>
                  <span className="text-[10px] text-slate-500">2m ago</span>
                </div>
                <div className="text-white text-xs sm:text-sm line-clamp-2 group-hover:text-cyan-300 transition-colors">
                  Nuclear energy stocks surge on new government clean energy initiative
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/15 transition-all cursor-pointer group w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-1 h-12 bg-emerald-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-[10px] px-1.5 py-0">
                    TSLA
                  </Badge>
                  <Badge variant="outline" className="bg-slate-700/50 text-slate-400 border-slate-600/50 text-[10px] px-1.5 py-0">
                    EARNINGS
                  </Badge>
                  <span className="text-[10px] text-slate-500">15m ago</span>
                </div>
                <div className="text-white text-xs sm:text-sm line-clamp-2 group-hover:text-emerald-300 transition-colors">
                  Tesla beats Q4 earnings expectations, reports record deliveries
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/15 transition-all cursor-pointer group w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-1 h-12 bg-purple-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/40 text-[10px] px-1.5 py-0">
                    NVDA
                  </Badge>
                  <Badge variant="outline" className="bg-slate-700/50 text-slate-400 border-slate-600/50 text-[10px] px-1.5 py-0">
                    SEC FILING
                  </Badge>
                  <span className="text-[10px] text-slate-500">1h ago</span>
                </div>
                <div className="text-white text-xs sm:text-sm line-clamp-2 group-hover:text-purple-300 transition-colors">
                  NVIDIA files Form 8-K: Major AI chip partnership announcement
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/15 transition-all cursor-pointer group w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-1 h-12 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/40 text-[10px] px-1.5 py-0">
                    SMR
                  </Badge>
                  <Badge variant="outline" className="bg-slate-700/50 text-slate-400 border-slate-600/50 text-[10px] px-1.5 py-0">
                    NEWS
                  </Badge>
                  <span className="text-[10px] text-slate-500">2h ago</span>
                </div>
                <div className="text-white text-xs sm:text-sm line-clamp-2 group-hover:text-blue-300 transition-colors">
                  Small Modular Reactor technology gains regulatory approval in 3 states
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/15 transition-all cursor-pointer group w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-1 h-12 bg-yellow-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40 text-[10px] px-1.5 py-0">
                    BTC
                  </Badge>
                  <Badge variant="outline" className="bg-slate-700/50 text-slate-400 border-slate-600/50 text-[10px] px-1.5 py-0">
                    CRYPTO
                  </Badge>
                  <span className="text-[10px] text-slate-500">3h ago</span>
                </div>
                <div className="text-white text-xs sm:text-sm line-clamp-2 group-hover:text-yellow-300 transition-colors">
                  Bitcoin ETF inflows hit record high as institutional adoption accelerates
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 transition-all cursor-pointer group w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-1 h-12 bg-red-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-slate-700/50 text-slate-400 border-slate-600/50 text-[10px] px-1.5 py-0">
                    ALERT
                  </Badge>
                  <span className="text-[10px] text-slate-500">4h ago</span>
                </div>
                <div className="text-white text-xs sm:text-sm line-clamp-2 group-hover:text-red-300 transition-colors">
                  Fed signals potential rate cuts in Q2, market volatility expected
                </div>
              </div>
            </div>
          </div>

          {/* View All News CTA */}
          <div className="flex items-center justify-center px-6 py-2 rounded-lg border border-slate-600/50 bg-slate-800/50 hover:bg-slate-700/50 transition-all cursor-pointer group w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[200px]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-slate-400 text-sm group-hover:text-cyan-400 transition-colors">View All News →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

