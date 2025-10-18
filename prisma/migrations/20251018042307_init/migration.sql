-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SnaptradeUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "snaptradeUserId" TEXT NOT NULL,
    "userSecret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SnaptradeUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrokerageConnection" (
    "id" TEXT NOT NULL,
    "snaptradeUserId" TEXT NOT NULL,
    "broker" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrokerageConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SnaptradeUser_userId_key" ON "SnaptradeUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SnaptradeUser_snaptradeUserId_key" ON "SnaptradeUser"("snaptradeUserId");

-- AddForeignKey
ALTER TABLE "SnaptradeUser" ADD CONSTRAINT "SnaptradeUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
