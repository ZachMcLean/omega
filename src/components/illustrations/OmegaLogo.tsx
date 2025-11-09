/**
 * OmegaLogo - Digital Flower Symbol
 * 
 * A static, geometric digital flower representing squad growth.
 * 8 colorful petals radiating from a central origin.
 * Clean perpendicular axes frame the design.
 * Modern, sleek, neon fintech aesthetic.
 */

interface OmegaLogoProps {
  className?: string;
  size?: number;
}

export function OmegaLogo({ className = "", size = 200 }: OmegaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Neon Glow Filters */}
        <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="logo-strong-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Petal Gradients */}
        <linearGradient id="petal-1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="petal-2" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="petal-3" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="petal-4" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="petal-5" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="petal-6" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="petal-7" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="petal-8" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3" />
        </linearGradient>

        {/* Axis gradient */}
        <linearGradient id="axis-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0.7" />
        </linearGradient>

        <radialGradient id="center-glow">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background glow from center */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="url(#center-glow)"
      />

      {/* Perpendicular Axes - Clean reference frame */}
      <g opacity="0.4">
        {/* Horizontal Axis */}
        <line 
          x1="25" 
          y1="100" 
          x2="175" 
          y2="100" 
          stroke="url(#axis-grad)" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
        
        {/* Vertical Axis */}
        <line 
          x1="100" 
          y1="25" 
          x2="100" 
          y2="175" 
          stroke="url(#axis-grad)" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </g>

      {/* Digital Flower Petals - 8 colorful bidirectional growth trajectories */}
      <g filter="url(#logo-glow)">
        
        {/* Petal 1 - Purple (0°/180°) */}
        <g>
          <line
            x1="100"
            y1="100"
            x2="170"
            y2="100"
            stroke="url(#petal-1)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="30"
            y2="100"
            stroke="url(#petal-1)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Glow layer */}
          <line
            x1="30"
            y1="100"
            x2="170"
            y2="100"
            stroke="#8b5cf6"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.3"
          />
        </g>

        {/* Petal 2 - Cyan (45°/225°) */}
        <g>
          <line
            x1="100"
            y1="100"
            x2="150"
            y2="50"
            stroke="url(#petal-2)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="50"
            y2="150"
            stroke="url(#petal-2)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Glow layer */}
          <line
            x1="50"
            y1="150"
            x2="150"
            y2="50"
            stroke="#06b6d4"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.3"
          />
        </g>

        {/* Petal 3 - Green (90°/270°) */}
        <g>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="url(#petal-3)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="170"
            stroke="url(#petal-3)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Glow layer */}
          <line
            x1="100"
            y1="30"
            x2="100"
            y2="170"
            stroke="#10b981"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.3"
          />
        </g>

        {/* Petal 4 - Yellow (135°/315°) */}
        <g>
          <line
            x1="100"
            y1="100"
            x2="50"
            y2="50"
            stroke="url(#petal-4)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="150"
            y2="150"
            stroke="url(#petal-4)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Glow layer */}
          <line
            x1="50"
            y1="50"
            x2="150"
            y2="150"
            stroke="#f59e0b"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.3"
          />
        </g>

        {/* Petal 5 - Orange (22.5°/202.5°) */}
        <g>
          <line
            x1="100"
            y1="100"
            x2="165"
            y2="75"
            stroke="url(#petal-5)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="35"
            y2="125"
            stroke="url(#petal-5)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Glow layer */}
          <line
            x1="35"
            y1="125"
            x2="165"
            y2="75"
            stroke="#f97316"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.25"
          />
        </g>

        {/* Petal 6 - Pink (67.5°/247.5°) */}
        <g>
          <line
            x1="100"
            y1="100"
            x2="125"
            y2="35"
            stroke="url(#petal-6)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="75"
            y2="165"
            stroke="url(#petal-6)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Glow layer */}
          <line
            x1="75"
            y1="165"
            x2="125"
            y2="35"
            stroke="#ec4899"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.25"
          />
        </g>

        {/* Petal 7 - Blue (112.5°/292.5°) */}
        <g>
          <line
            x1="100"
            y1="100"
            x2="35"
            y2="75"
            stroke="url(#petal-7)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="165"
            y2="125"
            stroke="url(#petal-7)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Glow layer */}
          <line
            x1="35"
            y1="75"
            x2="165"
            y2="125"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.25"
          />
        </g>

        {/* Petal 8 - Teal (157.5°/337.5°) */}
        <g>
          <line
            x1="100"
            y1="100"
            x2="75"
            y2="35"
            stroke="url(#petal-8)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="125"
            y2="165"
            stroke="url(#petal-8)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Glow layer */}
          <line
            x1="75"
            y1="35"
            x2="125"
            y2="165"
            stroke="#14b8a6"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.25"
          />
        </g>
      </g>

      {/* Center Origin - The Squad's Heart */}
      <g filter="url(#logo-strong-glow)">
        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="10"
          fill="#0f172a"
          stroke="#06b6d4"
          strokeWidth="3"
        />
        {/* Middle ring */}
        <circle
          cx="100"
          cy="100"
          r="6"
          fill="#0f172a"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        {/* Inner core */}
        <circle
          cx="100"
          cy="100"
          r="3"
          fill="url(#petal-2)"
        />
      </g>

      {/* Corner Frame Elements */}
      <g opacity="0.25" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round">
        {/* Top-left */}
        <line x1="15" y1="20" x2="25" y2="20" />
        <line x1="15" y1="20" x2="15" y2="30" />
        
        {/* Top-right */}
        <line x1="175" y1="20" x2="185" y2="20" />
        <line x1="185" y1="20" x2="185" y2="30" />
        
        {/* Bottom-left */}
        <line x1="15" y1="170" x2="15" y2="180" />
        <line x1="15" y1="180" x2="25" y2="180" />
        
        {/* Bottom-right */}
        <line x1="185" y1="170" x2="185" y2="180" />
        <line x1="175" y1="180" x2="185" y2="180" />
      </g>

      {/* Subtle geometric accents */}
      <g opacity="0.15" stroke="#64748b" strokeWidth="1" fill="none">
        <circle cx="100" cy="100" r="85" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="65" strokeDasharray="2 2" />
      </g>
    </svg>
  );
}

