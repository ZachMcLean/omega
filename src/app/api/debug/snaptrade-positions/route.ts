import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { snaptrade } from "@/lib/snaptrade";

/**
 * Debug endpoint to directly query SnapTrade API for positions
 * GET /api/debug/snaptrade-positions?accountId=<snaptrade-account-id>
 * 
 * This shows the RAW response from SnapTrade so we can see what's actually being returned
 */
export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snaptradeUser = await prisma.snaptradeUser.findUnique({
    where: { userId: session.user.id },
  });

  if (!snaptradeUser) {
    return NextResponse.json({ error: "No SnapTrade user found" }, { status: 404 });
  }

  // Get account ID from query params or use first account
  const url = new URL(req.url);
  const accountIdParam = url.searchParams.get("accountId");

  // Get all accounts
  const accounts = await prisma.brokerageAccount.findMany({
    where: {
      connection: {
        snaptradeUserId: snaptradeUser.id,
      },
    },
    include: {
      connection: true,
    },
  });

  if (accounts.length === 0) {
    return NextResponse.json({ 
      error: "No accounts found",
      message: "You need to connect a brokerage account first"
    }, { status: 404 });
  }

  // Use specified account or first account
  const account = accountIdParam 
    ? accounts.find(acc => acc.snaptradeAccountId === accountIdParam)
    : accounts[0];

  if (!account) {
    return NextResponse.json({ 
      error: "Account not found",
      availableAccounts: accounts.map(acc => ({
        snaptradeAccountId: acc.snaptradeAccountId,
        accountName: acc.accountName,
        broker: acc.connection.broker,
      }))
    }, { status: 404 });
  }

  try {
    console.log(`[Debug] Querying SnapTrade for positions on account ${account.snaptradeAccountId}`);
    console.log(`[Debug] Using userId: ${snaptradeUser.snaptradeUserId}, accountId: ${account.snaptradeAccountId}`);
    
    // Direct SnapTrade API call
    let positionsRes;
    try {
      positionsRes = await snaptrade.accountInformation.getUserAccountPositions({
        userId: snaptradeUser.snaptradeUserId,
        userSecret: snaptradeUser.userSecret,
        accountId: account.snaptradeAccountId,
      });
    } catch (apiError: any) {
      // If the API call itself throws, extract useful info before rethrowing
      console.error(`[Debug] SnapTrade API call failed:`, {
        message: apiError?.message,
        status: apiError?.response?.status,
        statusText: apiError?.response?.statusText,
        data: apiError?.response?.data,
      });
      throw apiError;
    }

      // Get full response details (avoid circular references)
      const response = {
        account: {
          id: account.id,
          snaptradeAccountId: account.snaptradeAccountId,
          accountName: account.accountName,
          accountNumber: account.accountNumber,
          broker: account.connection.broker,
          totalValue: account.totalValue,
          totalCash: account.totalCash,
        },
        snapTradeResponse: {
          statusCode: positionsRes.response?.status || "unknown",
          statusText: positionsRes.response?.statusText || "unknown",
          data: positionsRes.data || null,
          dataType: Array.isArray(positionsRes.data) ? "array" : typeof positionsRes.data,
          dataLength: Array.isArray(positionsRes.data) ? positionsRes.data.length : "N/A",
        },
        analysis: {
          hasData: !!positionsRes.data,
          isArray: Array.isArray(positionsRes.data),
          positionCount: Array.isArray(positionsRes.data) ? positionsRes.data.length : 0,
          firstPosition: Array.isArray(positionsRes.data) && positionsRes.data.length > 0 
            ? positionsRes.data[0] 
            : null,
          allPositions: positionsRes.data || [],
        },
        // Try to extract symbols from positions
        extractedSymbols: Array.isArray(positionsRes.data) 
          ? positionsRes.data.map((pos: any, idx: number) => {
              const symbol = 
                pos.symbol?.symbol || 
                pos.symbol || 
                pos.ticker || 
                pos.security?.symbol ||
                "UNKNOWN";
              const quantity = pos.units || pos.quantity || 0;
              return {
                index: idx,
                symbol,
                quantity,
                rawSymbol: pos.symbol,
                rawPosition: pos,
              };
            })
        : [],
      };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error(`[Debug] Error querying SnapTrade positions:`, error);
    
    // Extract error details safely (avoid circular references)
    const errorDetails = {
      message: error?.message || String(error),
      name: error?.name || "UnknownError",
      code: error?.code || error?.statusCode || null,
      status: error?.response?.status || error?.status || null,
      statusText: error?.response?.statusText || error?.statusText || null,
    };

    // Try to get response data if available
    let responseData = null;
    try {
      if (error?.response?.data) {
        responseData = error.response.data;
      } else if (error?.data) {
        responseData = error.data;
      }
    } catch (e) {
      // Ignore errors extracting response data
    }
    
    return NextResponse.json({
      error: "Failed to query SnapTrade API",
      errorDetails,
      responseData,
      account: {
        id: account.id,
        snaptradeAccountId: account.snaptradeAccountId,
        accountName: account.accountName,
        broker: account.connection.broker,
      },
      troubleshooting: {
        possibleCauses: [
          "SnapTrade API authentication failed",
          "Account ID is incorrect",
          "SnapTrade API is down or rate-limited",
          "Connection to brokerage is disconnected",
        ],
        suggestions: [
          "Check if the SnapTrade connection is still active",
          "Verify the account ID matches what's in SnapTrade",
          "Try reconnecting the brokerage account",
          "Check SnapTrade API status",
        ],
      },
    }, { status: 500 });
  }
}

