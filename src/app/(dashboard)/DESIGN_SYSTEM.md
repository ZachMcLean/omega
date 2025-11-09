# Fintech Gaming Dashboard Design System

## Style Description
**"Neon Fintech" or "Cyberpunk Trading Dashboard"**

A vibrant, high-energy design system combining the sleekness of modern fintech apps (like Robinhood) with the excitement of gaming dashboards. Features neon-like accent colors on deep dark backgrounds, extensive use of gradients, glows, and color-coded data visualization for instant information scanning.

---

## Core Color Palette

### Primary Functional Colors

#### 🟢 Success/Growth (Green)
- **Primary**: `#10b981` (emerald-500)
- **Light**: `#34d399` (emerald-400)
- **Usage**: Positive changes, wins, profits, cash values, win rates
- **Opacity Variants**: 
  - Background: `bg-emerald-500/10`, `bg-emerald-500/20`
  - Border: `border-emerald-500/20`, `border-emerald-500/30`
  - Text: `text-emerald-400`

#### 🔴 Loss/Danger (Red)
- **Primary**: `#ef4444` (red-500)
- **Light**: `#f87171` (red-400)
- **Usage**: Negative changes, losses, drawdowns, warnings
- **Opacity Variants**:
  - Background: `bg-red-500/10`, `bg-red-500/20`
  - Border: `border-red-500/20`, `border-red-500/30`
  - Text: `text-red-400`

#### 🟡 Achievement/Warning (Yellow)
- **Primary**: `#eab308` (yellow-500)
- **Light**: `#facc15` (yellow-400)
- **Dark**: `#ca8a04` (yellow-600)
- **Usage**: Achievements, streaks, MVP badges, Sharpe ratios, milestones
- **Opacity Variants**:
  - Background: `bg-yellow-500/10`, `bg-yellow-500/20`
  - Border: `border-yellow-500/20`, `border-yellow-500/30`
  - Text: `text-yellow-400`
- **Special**: Gold medal/crown styling

#### 🔵 Activity/Information (Cyan)
- **Primary**: `#06b6d4` (cyan-500)
- **Light**: `#22d3ee` (cyan-400)
- **Usage**: Primary charts, activity indicators, team shares, information badges
- **Opacity Variants**:
  - Background: `bg-cyan-500/10`, `bg-cyan-500/20`
  - Border: `border-cyan-500/20`, `border-cyan-500/30`
  - Text: `text-cyan-400`

#### 🟣 Special Features (Purple)
- **Primary**: `#a855f7` (purple-500)
- **Light**: `#c084fc` (purple-400)
- **Usage**: Challenges, milestones, special features, strength areas
- **Opacity Variants**:
  - Background: `bg-purple-500/10`, `bg-purple-500/20`
  - Border: `border-purple-500/20`, `border-purple-500/30`
  - Text: `text-purple-400`

#### 🔵 Secondary Info (Blue)
- **Primary**: `#3b82f6` (blue-500)
- **Light**: `#60a5fa` (blue-400)
- **Usage**: Trading style tags, secondary information
- **Opacity Variants**:
  - Background: `bg-blue-500/10`, `bg-blue-500/20`
  - Border: `border-blue-500/20`, `border-blue-500/30`
  - Text: `text-blue-400`

#### 🟠 Energy/Highlights (Orange)
- **Primary**: `#f97316` (orange-500)
- **Light**: `#fb923c` (orange-400)
- **Dark**: `#ea580c` (orange-600)
- **Usage**: Hot items, energy indicators, risk warnings
- **Opacity Variants**:
  - Background: `bg-orange-500/10`, `bg-orange-500/20`
  - Border: `border-orange-500/20`, `border-orange-500/30`
  - Text: `text-orange-400`

### Medal/Rank Colors

#### 🥇 Gold (1st Place)
- **Background**: `bg-gradient-to-br from-yellow-400 to-yellow-500`
- **Border**: `border-yellow-400/50`
- **Shadow**: `shadow-yellow-500/30`

#### 🥈 Silver (2nd Place)
- **Background**: `bg-gradient-to-br from-slate-300 to-slate-400`
- **Border**: `border-slate-300/50`
- **Shadow**: `shadow-slate-400/20`

#### 🥉 Bronze (3rd Place)
- **Background**: `bg-gradient-to-br from-amber-600 to-amber-700`
- **Border**: `border-amber-500/50`
- **Shadow**: `shadow-amber-600/20`

### Base/Background Colors

#### Dark Foundations
- **Darkest**: `#0f172a` (slate-950) - Main background gradients
- **Dark**: `#1e293b` (slate-800) - Cards, secondary backgrounds
- **Medium**: `#334155` (slate-700) - Borders, dividers
- **Light**: `#475569` (slate-600) - Inactive states
- **Lighter**: `#64748b` (slate-500) - Secondary text

#### Text Colors
- **Primary**: `#ffffff` (white) - Main text
- **Secondary**: `#cbd5e1` (slate-300) - Badge text
- **Tertiary**: `#94a3b8` (slate-400) - Labels
- **Quaternary**: `#64748b` (slate-500) - Muted text

---

## Gradients

### Background Gradients
```css
/* Main app background */
bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950

/* "You" user highlight */
bg-gradient-to-r from-emerald-500/5 to-transparent

/* Accent border gradients */
bg-gradient-to-br from-orange-500 to-red-500
bg-gradient-to-br from-blue-500 to-cyan-500
bg-gradient-to-br from-emerald-500 to-green-500
bg-gradient-to-br from-purple-500 to-pink-500
```

### Component Gradients
```css
/* Milestone/Special features */
bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10

/* Team strength banner */
bg-gradient-to-r from-cyan-500/10 to-blue-500/10

/* Risk metrics */
bg-gradient-to-r from-amber-500/10 to-orange-500/10
```

### Progress/Fill Gradients
```css
/* Team share bars */
bg-gradient-to-r from-cyan-500 to-blue-500

/* Milestone progress */
bg-gradient-to-b from-purple-500 to-cyan-500
```

---

## Shadows & Glows

### Card Shadows
```css
/* Primary cards */
shadow-xl shadow-cyan-500/10

/* MVP/Special badges */
shadow-lg shadow-yellow-500/20
shadow-lg shadow-yellow-500/25
shadow-lg shadow-yellow-500/30

/* Rank badges */
shadow-lg shadow-yellow-500/20  /* Gold */
shadow-lg shadow-slate-400/20   /* Silver */
shadow-lg shadow-amber-600/20   /* Bronze */
```

### Avatar Glows
```css
/* Avatar backdrop glow */
absolute inset-0 bg-gradient-to-br {color} blur-md opacity-30 rounded-full
group-hover:opacity-50 transition-opacity
```

---

## Typography

### Font Sizes (Default - from globals.css)
- **H1**: `text-2xl` (24px) - Medium weight
- **H2**: `text-xl` (20px) - Medium weight  
- **H3**: `text-lg` (18px) - Medium weight
- **H4**: `text-base` (16px) - Medium weight
- **Body**: `text-base` (16px) - Normal weight
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

### Common Overrides
```css
/* Large portfolio values */
text-4xl sm:text-5xl

/* Member names */
text-lg sm:text-xl

/* Stats/metrics */
text-2xl

/* Compact stats */
text-xs
```

---

## Spacing & Layout

### Padding
```css
/* Main sections */
p-4 sm:p-6

/* Cards */
p-4 sm:p-5

/* Compact pills/badges */
px-2 py-0.5
px-2 py-1
px-2.5 py-1

/* Standard buttons */
px-3 py-1.5
```

### Gaps
```css
/* Component spacing */
gap-3 sm:gap-4  /* Standard */
gap-2           /* Compact */
gap-1.5         /* Tight */
```

### Borders & Radii
```css
/* Border widths */
border    /* 1px */
border-2  /* 2px */
border-3  /* 3px */

/* Border radius */
rounded       /* 4px - small elements */
rounded-md    /* 6px - badges */
rounded-lg    /* 8px - cards, buttons */
rounded-xl    /* 12px - large cards */
rounded-full  /* Circles, pills */
```

---

## Component Patterns

### Stat Pills (Quick Stats)
```tsx
<div className="flex items-center gap-1 px-2 py-0.5 bg-{color}-500/10 border border-{color}-500/20 rounded">
  <Icon className="w-3 h-3 text-{color}-400" />
  <span className="text-xs text-{color}-400">{value}</span>
</div>
```

### Performance Badges
```tsx
<div className={`flex items-center gap-1.5 px-2 py-1 rounded ${
  isPositive 
    ? "bg-emerald-500/15 text-emerald-400" 
    : "bg-red-500/15 text-red-400"
}`}>
  <TrendingUp className={`w-3 h-3 ${!isPositive && "rotate-180"}`} />
  <span className="text-xs">{percentage}%</span>
</div>
```

### Cards with Blur
```tsx
<Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-hidden">
  {/* Content */}
</Card>
```

### Gradient Borders
```tsx
<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-br {avatar-gradient} opacity-50 group-hover:opacity-100 transition-opacity" />
```

### Progress Bars
```tsx
<div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
  <div 
    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
    style={{ width: `${percentage}%` }}
  />
</div>
```

---

## Opacity Scale

### Background Opacity
- `/5` - Very subtle tint
- `/10` - Subtle background
- `/15` - Visible background
- `/20` - Standard background
- `/30` - Medium background
- `/40` - Prominent background
- `/50` - Half opacity

### Border Opacity
- `/20` - Subtle border
- `/30` - Standard border
- `/50` - Prominent border

---

## Transition & Animation

### Standard Transitions
```css
transition-all duration-300
transition-opacity
transition-colors
transition-transform
```

### Hover Effects
```css
group-hover:scale-105
group-hover:opacity-50
group-hover:text-cyan-400
hover:bg-slate-700/50
hover:border-slate-500
```

### Animations
```css
animate-pulse  /* For live indicators */
```

---

## Figma Export Guide

### Color Styles to Create

1. **Create Color Variables** in Figma:
   - Go to Design Panel → Color Styles → Create new style
   - Name them using the pattern: `semantic/usage`
   
   Example naming:
   ```
   Success/Primary (10, 185, 129)
   Success/Light (52, 211, 153)
   Success/BG-10 (10, 185, 129 @ 10%)
   Danger/Primary (239, 68, 68)
   Info/Primary (6, 182, 212)
   Achievement/Primary (234, 179, 8)
   Special/Primary (168, 85, 247)
   
   Base/Darkest (15, 23, 42)
   Base/Dark (30, 41, 59)
   Base/Medium (51, 65, 85)
   
   Text/Primary (255, 255, 255)
   Text/Secondary (203, 213, 225)
   Text/Tertiary (148, 163, 184)
   ```

2. **Create Gradient Styles**:
   ```
   Gradient/Avatar-Orange (Orange 500 → Red 500)
   Gradient/Avatar-Blue (Blue 500 → Cyan 500)
   Gradient/Avatar-Green (Emerald 500 → Green 500)
   Gradient/Milestone (Purple 500/10 → Blue 500/10 → Cyan 500/10)
   ```

3. **Create Effect Styles** (Shadows):
   ```
   Shadow/Card-Primary (0, 4, 24px, Cyan 500 @ 10%)
   Shadow/Gold-Glow (0, 4, 16px, Yellow 500 @ 30%)
   Shadow/Silver-Glow (0, 4, 16px, Slate 400 @ 20%)
   ```

4. **Export as JSON** (Figma Plugin):
   - Install "Design Tokens" plugin
   - Export all color variables to JSON
   - Save as `design-tokens.json`

---

## Next.js/Tailwind Setup

### 1. Add to `tailwind.config.js`
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'success': {
          DEFAULT: '#10b981',
          light: '#34d399',
        },
        'danger': {
          DEFAULT: '#ef4444',
          light: '#f87171',
        },
        'achievement': {
          DEFAULT: '#eab308',
          light: '#facc15',
          dark: '#ca8a04',
        },
        'info': {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
        },
        'special': {
          DEFAULT: '#a855f7',
          light: '#c084fc',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(6, 182, 212, 0.1)',
        'glow-yellow': '0 0 16px rgba(234, 179, 8, 0.3)',
      },
    },
  },
}
```

### 2. Copy `globals.css`
Just copy the entire `styles/globals.css` file to your new project.

### 3. Common Class Combos (Copy-Paste Ready)
```tsx
// Main app container
className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"

// Standard card
className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-hidden shadow-xl"

// Stat pill - success
className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-400"

// Performance badge - dynamic
className={`flex items-center gap-1.5 px-2 py-1 rounded ${
  isPositive 
    ? "bg-emerald-500/15 text-emerald-400" 
    : "bg-red-500/15 text-red-400"
}`}
```

---

## Quick Reference Card

```
🎨 COLOR CODING SYSTEM:
Green    → Wins, Growth, Positive
Red      → Losses, Negative, Danger  
Yellow   → Achievements, Streaks, MVP
Cyan     → Activity, Info, Primary
Purple   → Special Features, Challenges
Blue     → Secondary Info, Tags
Orange   → Energy, Highlights

📐 SPACING:
Padding:  p-4 sm:p-5 (cards)
Gaps:     gap-3 sm:gap-4 (standard)
Borders:  border-{color}-500/20
Radius:   rounded-lg (standard)

🌟 EFFECTS:
Shadow:   shadow-xl shadow-cyan-500/10
Blur:     backdrop-blur-sm
Glow:     {absolute inset-0 blur-md opacity-30}
Hover:    group-hover:scale-105

💡 OPACITY:
BG:       /10 (subtle), /20 (standard), /30 (medium)
Border:   /20 (subtle), /30 (standard), /50 (strong)
```

---

## Design Philosophy

1. **Color = Information**: Every color has semantic meaning
2. **Gradients Everywhere**: Creates depth and visual interest
3. **Opacity Layers**: Build depth without clutter
4. **Rounded & Soft**: Modern, friendly fintech aesthetic
5. **Glows & Shadows**: Gaming-inspired energy
6. **High Contrast**: Dark backgrounds, bright accents
7. **Responsive Sizing**: Mobile-first, scales up beautifully

---

This design system creates a unique "Neon Fintech Gaming Dashboard" aesthetic that's both professional and energetic, perfect for a social trading platform where performance tracking meets community competition.
