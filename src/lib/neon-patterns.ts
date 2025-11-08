/**
 * NEON FINTECH DESIGN PATTERNS
 * Reference file for common component styling patterns
 * Based on design-tokens.json and squad-dashboard
 * 
 * @module neon-patterns
 * @description Provides consistent styling patterns, utility functions, and
 * type-safe color helpers for the Omega Neon Fintech design system.
 */

/* =========================
   COMPONENT PATTERNS
   Pre-composed class strings for common UI patterns
   ========================= */

export const NeonPatterns = {
  /**
   * Container patterns for layouts
   */
  containers: {
    /** Main app container with neon gradient background */
    main: 'min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
    /** Glass-morphic card with backdrop blur */
    card: 'border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm rounded-lg shadow-xl',
    /** Card with hover effect */
    cardHover: 'transition-colors hover:border-cyan-500/30',
    /** Section wrapper with padding */
    section: 'p-4 md:p-6',
  },

  /**
   * Stat pills - small inline badges for performance indicators
   */
  statPills: {
    success: 'flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-400',
    danger: 'flex items-center gap-1 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400',
    info: 'flex items-center gap-1 px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded text-xs text-cyan-400',
    achievement: 'flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400',
    special: 'flex items-center gap-1 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-xs text-purple-400',
    energy: 'flex items-center gap-1 px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded text-xs text-orange-400',
  },

  /**
   * Performance badges - larger display badges
   */
  badges: {
    positive: 'flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/15 text-emerald-400 text-sm',
    negative: 'flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/15 text-red-400 text-sm',
    neutral: 'flex items-center gap-1.5 px-2 py-1 rounded bg-slate-500/15 text-slate-400 text-sm',
  },

  /**
   * Typography patterns
   */
  text: {
    /** Main heading text */
    heading: 'text-slate-50 font-medium',
    /** Large display value (e.g., portfolio balance) */
    value: 'text-slate-50 tabular-nums tracking-tight',
    /** Small label text */
    label: 'text-slate-400 text-sm',
    /** Muted/secondary text */
    muted: 'text-slate-500',
    /** Emphasized text */
    emphasis: 'text-slate-50 font-semibold',
  },

  /**
   * Medal system for rankings (1st, 2nd, 3rd place)
   */
  medals: {
    gold: 'w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/50',
    silver: 'w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-400/50',
    bronze: 'w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/50',
    /** Text color for medal number */
    goldText: 'text-yellow-950 font-bold text-sm',
    silverText: 'text-slate-950 font-bold text-sm',
    bronzeText: 'text-orange-950 font-bold text-sm',
  },

  /**
   * Button patterns matching neon aesthetic
   */
  buttons: {
    primary: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium px-4 py-2 rounded transition-colors',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-50 font-medium px-4 py-2 rounded transition-colors',
    ghost: 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-50 font-medium px-4 py-2 rounded transition-colors',
    danger: 'bg-red-500 hover:bg-red-400 text-white font-medium px-4 py-2 rounded transition-colors',
  },

  /**
   * Avatar gradient patterns
   */
  avatars: {
    orange: 'bg-gradient-to-br from-orange-500 to-red-500',
    blue: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    green: 'bg-gradient-to-br from-emerald-500 to-green-500',
    purple: 'bg-gradient-to-br from-purple-500 to-pink-500',
    red: 'bg-gradient-to-br from-red-500 to-orange-500',
    indigo: 'bg-gradient-to-br from-indigo-500 to-blue-500',
    yellow: 'bg-gradient-to-br from-yellow-500 to-amber-500',
    teal: 'bg-gradient-to-br from-teal-500 to-cyan-500',
  },
} as const;

/* =========================
   COLOR UTILITIES
   Helper functions for dynamic color selection
   ========================= */

/**
 * Get performance-based color classes
 * @param value - The numeric value (positive = gain, negative = loss)
 * @returns Object with text, background, and border color classes
 */
export function getPerformanceColor(value: number): {
  text: string;
  bg: string;
  border: string;
} {
  if (value > 0) {
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    };
  } else if (value < 0) {
    return {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    };
  }
  return {
    text: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
  };
}

/**
 * Get stat pill class based on performance
 * @param value - The numeric value
 * @returns Complete className string for the stat pill
 */
export function getStatPill(value: number): string {
  if (value > 0) return NeonPatterns.statPills.success;
  if (value < 0) return NeonPatterns.statPills.danger;
  return NeonPatterns.statPills.info;
}

/**
 * Get badge class based on performance
 * @param value - The numeric value
 * @returns Complete className string for the badge
 */
export function getPerformanceBadge(value: number): string {
  if (value > 0) return NeonPatterns.badges.positive;
  if (value < 0) return NeonPatterns.badges.negative;
  return NeonPatterns.badges.neutral;
}

/**
 * Get medal class based on rank
 * @param rank - The ranking position (1, 2, 3, etc.)
 * @returns Object with container and text classes
 */
export function getMedalClasses(rank: number): {
  container: string;
  text: string;
} | null {
  switch (rank) {
    case 1:
      return {
        container: NeonPatterns.medals.gold,
        text: NeonPatterns.medals.goldText,
      };
    case 2:
      return {
        container: NeonPatterns.medals.silver,
        text: NeonPatterns.medals.silverText,
      };
    case 3:
      return {
        container: NeonPatterns.medals.bronze,
        text: NeonPatterns.medals.bronzeText,
      };
    default:
      return null;
  }
}

/* =========================
   FORMATTING UTILITIES
   Helper functions for consistent data display
   ========================= */

/**
 * Format a number as USD currency
 * @param value - The numeric value
 * @param showCents - Whether to show decimal places (default: true)
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(value: number, showCents: boolean = true): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(value);
}

/**
 * Format a number as a percentage
 * @param value - The numeric value (e.g., 12.5 for 12.5%)
 * @param includePlus - Whether to include + for positive values (default: true)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string (e.g., "+12.50%")
 */
export function formatPercentage(
  value: number,
  includePlus: boolean = true,
  decimals: number = 2
): string {
  const formatted = Math.abs(value).toFixed(decimals);
  if (value > 0 && includePlus) {
    return `+${formatted}%`;
  } else if (value < 0) {
    return `-${formatted}%`;
  }
  return `${formatted}%`;
}

/**
 * Format large numbers with K/M/B suffixes
 * @param value - The numeric value
 * @returns Formatted string (e.g., "1.2M", "3.4K")
 */
export function formatLargeNumber(value: number): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (absValue >= 1_000_000_000) {
    return `${sign}${(absValue / 1_000_000_000).toFixed(1)}B`;
  } else if (absValue >= 1_000_000) {
    return `${sign}${(absValue / 1_000_000).toFixed(1)}M`;
  } else if (absValue >= 1_000) {
    return `${sign}${(absValue / 1_000).toFixed(1)}K`;
  }
  return `${sign}${absValue.toFixed(0)}`;
}

/**
 * Format a timestamp as relative time
 * @param timestamp - Date object or timestamp
 * @returns Relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: Date | number): string {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* =========================
   TYPE DEFINITIONS
   ========================= */

export type SemanticColor = 'gain' | 'loss' | 'achievement' | 'info' | 'special' | 'energy';
export type MedalRank = 1 | 2 | 3;
export type AvatarGradient = keyof typeof NeonPatterns.avatars;

/**
 * Design system color mappings from design-tokens.json
 */
export const SemanticColors = {
  gain: '#10b981',
  loss: '#ef4444',
  achievement: '#eab308',
  info: '#06b6d4',
  special: '#a855f7',
  energy: '#f97316',
} as const;

