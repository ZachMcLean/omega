/*
  Warnings:

  - A unique constraint covering the columns `[authorizationId]` on the table `BrokerageConnection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorizationId` to the `BrokerageConnection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BrokerageConnection" ADD COLUMN     "authorizationId" TEXT NOT NULL,
ADD COLUMN     "brokerName" TEXT,
ADD COLUMN     "lastSyncedAt" TIMESTAMP(3),
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "syncError" TEXT;

-- CreateTable
CREATE TABLE "BrokerageAccount" (
    "id" TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,
    "snaptradeAccountId" TEXT NOT NULL,
    "accountName" TEXT,
    "accountNumber" TEXT,
    "accountType" TEXT,
    "totalValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCash" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "buyingPower" DOUBLE PRECISION,
    "currency" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "lastSyncedAt" TIMESTAMP(3),
    "syncError" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrokerageAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "securityName" TEXT,
    "securityType" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL,
    "averageCost" DOUBLE PRECISION NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "marketValue" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "unrealizedPL" DOUBLE PRECISION,
    "unrealizedPLPercent" DOUBLE PRECISION,
    "snaptradePositionId" TEXT,
    "metadata" JSONB,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioSnapshot" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "totalCash" DOUBLE PRECISION NOT NULL,
    "totalInvestments" DOUBLE PRECISION NOT NULL,
    "totalPL" DOUBLE PRECISION NOT NULL,
    "totalPLPercent" DOUBLE PRECISION NOT NULL,
    "snapshotDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PortfolioSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "symbol" TEXT,
    "quantity" DOUBLE PRECISION,
    "price" DOUBLE PRECISION,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "fee" DOUBLE PRECISION,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "snaptradeTransactionId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketDataCache" (
    "symbol" TEXT NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION,
    "changePercent" DOUBLE PRECISION,
    "dayHigh" DOUBLE PRECISION,
    "dayLow" DOUBLE PRECISION,
    "volume" BIGINT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketDataCache_pkey" PRIMARY KEY ("symbol")
);

-- CreateTable
CREATE TABLE "SyncJob" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "error" TEXT,
    "metadata" JSONB,

    CONSTRAINT "SyncJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrokerageAccount_snaptradeAccountId_key" ON "BrokerageAccount"("snaptradeAccountId");

-- CreateIndex
CREATE INDEX "BrokerageAccount_connectionId_idx" ON "BrokerageAccount"("connectionId");

-- CreateIndex
CREATE INDEX "BrokerageAccount_lastSyncedAt_idx" ON "BrokerageAccount"("lastSyncedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Position_snaptradePositionId_key" ON "Position"("snaptradePositionId");

-- CreateIndex
CREATE INDEX "Position_accountId_idx" ON "Position"("accountId");

-- CreateIndex
CREATE INDEX "Position_symbol_idx" ON "Position"("symbol");

-- CreateIndex
CREATE INDEX "Position_lastSyncedAt_idx" ON "Position"("lastSyncedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Position_accountId_symbol_key" ON "Position"("accountId", "symbol");

-- CreateIndex
CREATE INDEX "PortfolioSnapshot_accountId_snapshotDate_idx" ON "PortfolioSnapshot"("accountId", "snapshotDate");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_snaptradeTransactionId_key" ON "Transaction"("snaptradeTransactionId");

-- CreateIndex
CREATE INDEX "Transaction_accountId_transactionDate_idx" ON "Transaction"("accountId", "transactionDate");

-- CreateIndex
CREATE INDEX "Transaction_symbol_idx" ON "Transaction"("symbol");

-- CreateIndex
CREATE INDEX "MarketDataCache_lastUpdated_idx" ON "MarketDataCache"("lastUpdated");

-- CreateIndex
CREATE INDEX "SyncJob_userId_status_idx" ON "SyncJob"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "BrokerageConnection_authorizationId_key" ON "BrokerageConnection"("authorizationId");

-- AddForeignKey
ALTER TABLE "BrokerageConnection" ADD CONSTRAINT "BrokerageConnection_snaptradeUserId_fkey" FOREIGN KEY ("snaptradeUserId") REFERENCES "SnaptradeUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrokerageAccount" ADD CONSTRAINT "BrokerageAccount_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "BrokerageConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "BrokerageAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioSnapshot" ADD CONSTRAINT "PortfolioSnapshot_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "BrokerageAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "BrokerageAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
