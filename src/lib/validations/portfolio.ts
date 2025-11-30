import { z } from "zod";

// ===== COMMON SCHEMAS =====

export const TimePeriodSchema = z.enum(["1D", "1W", "1M", "3M", "6M", "1Y", "YTD"]);

// ===== REQUEST SCHEMAS =====

export const PortfolioHistoryQuerySchema = z.object({
  period: TimePeriodSchema.optional().default("1M"),
  accountId: z.string().cuid().optional(),
});

export const SyncRequestSchema = z.object({
  type: z.enum(["full", "quick", "incremental", "positions", "transactions"]).optional().default("quick"),
});

// ===== RESPONSE SCHEMAS =====

export const PositionSchema = z.object({
  symbol: z.string(),
  securityName: z.string().nullable(),
  quantity: z.number(),
  averageCost: z.number().nullable(),
  currentPrice: z.number(),
  marketValue: z.number(),
  unrealizedPL: z.number().nullable(),
  unrealizedPLPercent: z.number().nullable(),
});

export const BrokerageAccountSchema = z.object({
  id: z.string(),
  broker: z.string(),
  brokerName: z.string().nullable(),
  accountName: z.string().nullable(),
  accountNumber: z.string().nullable(),
  accountType: z.string().nullable(),
  totalValue: z.number(),
  totalCash: z.number(),
  buyingPower: z.number().nullable(),
  totalPL: z.number(),
  totalPLPercent: z.number(),
  dailyPL: z.number().optional().default(0), // Daily gain/loss in dollars
  dailyPLPercent: z.number().optional().default(0), // Daily gain/loss as percentage
  positionCount: z.number(),
  status: z.string(),
  lastSyncedAt: z.date().nullable(),
  positions: z.array(PositionSchema),
});

export const PortfolioSummarySchema = z.object({
  totalValue: z.number(),
  totalCash: z.number(),
  totalInvested: z.number(),
  totalPL: z.number(),
  totalPLPercent: z.number(),
  accountCount: z.number(),
  connectionCount: z.number(),
  lastSyncedAt: z.string().nullable(),
});

export const PortfolioHistoryPointSchema = z.object({
  date: z.string(),
  value: z.number(),
  pl: z.number(),
  plPercent: z.number(),
});

export const PortfolioHistoryResponseSchema = z.object({
  history: z.array(PortfolioHistoryPointSchema),
  period: TimePeriodSchema,
});

export const AccountsResponseSchema = z.object({
  accounts: z.array(BrokerageAccountSchema),
});

export const SyncResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  jobId: z.string().optional(),
});

// ===== TYPE INFERENCE =====

export type TimePeriod = z.infer<typeof TimePeriodSchema>;
export type PortfolioHistoryQuery = z.infer<typeof PortfolioHistoryQuerySchema>;
export type SyncRequest = z.infer<typeof SyncRequestSchema>;
export type Position = z.infer<typeof PositionSchema>;
export type BrokerageAccount = z.infer<typeof BrokerageAccountSchema>;
export type PortfolioSummary = z.infer<typeof PortfolioSummarySchema>;
export type PortfolioHistoryPoint = z.infer<typeof PortfolioHistoryPointSchema>;
export type PortfolioHistoryResponse = z.infer<typeof PortfolioHistoryResponseSchema>;
export type AccountsResponse = z.infer<typeof AccountsResponseSchema>;
export type SyncResponse = z.infer<typeof SyncResponseSchema>;

