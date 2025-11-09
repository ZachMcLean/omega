/**
 * Workspace Context Types and Utilities
 */

export type WorkspaceContext = {
  id: string; // "solo" | workspace ID
  name: string; // Display name
  type: "solo" | "private" | "public";
  memberCount?: number; // For workspaces
  isActive?: boolean; // Has recent activity
};

export type PageId =
  | "portfolio"
  | "squad-dashboard"
  | "news"
  | "algorithm"
  | "challenges"
  | "terminal"
  | "chat"
  | "workspaces";

export type TimePeriod = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD";

/**
 * Get default solo context
 */
export function getDefaultSoloContext(): WorkspaceContext {
  return {
    id: "solo",
    name: "Solo Mode",
    type: "solo",
  };
}

/**
 * Check if context is solo mode
 */
export function isSoloMode(context: WorkspaceContext): boolean {
  return context.type === "solo";
}

