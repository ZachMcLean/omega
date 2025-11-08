export type Position = {
    symbol: string;
    qty: number;
    value: number;
    pnl: number;
    pnlPercent: number;
    type: "equity" | "crypto";
  };
  
  export type Margin = {
    available: number;
    maintenance: number;
    used: number;
  };
  
  export type UserRow = {
    id: number;
    name: string;
    brokerage: string;
    balance: number;
    todayChange: number;
    todayChangePercent: number;
    weekChange: number;
    weekChangePercent: number;
    monthChange: number;
    monthChangePercent: number;
    buyingPower: number;
    cash: number;
    ytdPnL: number;
    todayPnL: number;
    dayTrades: number;
    greenStreak: number;
    longestStreak: number;
    totalTrades: number;
    winRate: number;
    badges: string[];
    margin: Margin;
    rank: number;
    positions: Position[];
  };