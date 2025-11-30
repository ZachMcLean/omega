import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSyncService } from "@/lib/sync-service";
import { SyncRequestSchema, SyncResponseSchema } from "@/lib/validations/portfolio";
import { parseRequestBody, zodErrorResponse } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse and validate request body
  const bodyResult = await parseRequestBody(req, SyncRequestSchema);
  if (!bodyResult.success) {
    return NextResponse.json(zodErrorResponse(bodyResult.error), { status: 400 });
  }

  const { type } = bodyResult.data as { type: "full" | "quick" | "incremental" | "positions" | "transactions" };

  try {
    const syncService = await createSyncService(session.user.id);

    if (type === "quick") {
      await syncService.quickSync();
    } else {
      await syncService.fullSync();
    }

    const response = SyncResponseSchema.parse({
      success: true,
      message: "Sync completed",
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Sync error:", error);
    const errorMessage = error instanceof Error ? error.message : "Sync failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}