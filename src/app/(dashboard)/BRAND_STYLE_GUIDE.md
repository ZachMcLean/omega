# Brand Style Guide

**Version 1.0** | Last Updated: October 21, 2025

---

## 📘 Table of Contents

1. [Brand Overview](#brand-overview)
2. [Brand Identity](#brand-identity)
3. [Visual Language](#visual-language)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Iconography & Illustrations](#iconography--illustrations)
7. [UI Components](#ui-components)
8. [Motion & Animation](#motion--animation)
9. [Voice & Tone](#voice--tone)
10. [Content Patterns](#content-patterns)
11. [Examples & Applications](#examples--applications)
12. [Do's and Don'ts](#dos-and-donts)

---

## Brand Overview

### What We Are

A **competitive fintech SaaS platform** where traders and investors join workspaces to share portfolios, track collective performance, and compete while making money together.

### Positioning Statement

> "Where Robinhood's legendary simplicity meets gaming dashboard energy - a place for traders who take their gains seriously but celebrate their wins louder."

### Brand Pillars

1. **Competitive Excellence** - We gamify success without trivializing finance
2. **Transparent Performance** - Every metric matters, nothing is hidden
3. **Team Power** - Individual strength, collective glory
4. **Elevated Simplicity** - Sophisticated data, accessible interface

### Target Audience

**Primary:** 25-40 year old active traders who:
- Trade daily or weekly
- Value community and competition
- Appreciate clean, modern interfaces
- Want serious analytics with gaming-level engagement
- Celebrate wins and learn from losses

**Secondary:** 
- Investment clubs and trading groups
- Finance enthusiasts building wealth together
- Competitive investors tracking leaderboards

---

## Brand Identity

### Brand Personality

**If our brand were a person:**

```
Archetype: The Champion + The Sage

Personality Traits:
├─ Competitive (but supportive)
├─ Data-driven (but intuitive)
├─ Celebratory (but measured)
├─ Professional (but accessible)
└─ Future-focused (but grounded)

Mood Board Keywords:
→ Neon-lit trading floors
→ Gaming tournament energy
→ Cyberpunk aesthetics
→ Trophy rooms with LED displays
→ Mission control dashboards
```

### Core Values

1. **Merit-Based Recognition**
   - Top performers get gold medals, not just numbers
   - Every trader's strength is highlighted
   - Even down periods show positive contributions

2. **Radical Transparency**
   - All metrics visible
   - Real-time updates
   - No hiding losses or risks

3. **Collective Growth**
   - Individual portfolios feed team success
   - Shared milestones celebrated together
   - Rising tide lifts all boats

4. **Data Respect**
   - Numbers never lie
   - Beautiful presentation, accurate data
   - Context always provided

---

## Visual Language

### Design System Name

**"Neon Fintech"** - Where terminal aesthetics meet nightclub energy

### Visual Style Description

```
Core Aesthetic: Cyberpunk Terminal × Modern Finance × Gaming HUD

Characteristics:
├─ Dark, deep backgrounds (midnight/space vibes)
├─ Neon accent colors that glow and pulse
├─ Geometric, precise layouts
├─ Glass-morphic cards with subtle blur
├─ Data visualization as art
├─ Celebratory but professional
└─ High contrast for clarity

Inspiration Sources:
→ Robinhood's clean minimalism
→ Gaming dashboard overlays (Valorant, Apex)
→ Cyberpunk 2077 UI elements
→ Trading terminal sophistication
→ Sci-fi movie interfaces (Tron, Blade Runner)
```

### Visual Hierarchy Principles

1. **Performance First** - Gains/losses dominate the view
2. **Context Second** - Time periods, comparisons, benchmarks
3. **Celebration Third** - Achievements, milestones, medals
4. **Details On Demand** - Expand for deeper analysis

### Spatial System

```
Padding Scale:
├─ Micro:  4px  - Icon spacing, badge padding
├─ Small:  8px  - Tight card padding
├─ Base:   16px - Standard card padding
├─ Medium: 20px - Section padding
├─ Large:  24px - Container padding
└─ XLarge: 32px - Page margins

Border Radius:
├─ Sharp:  0px   - Data tables, precise elements
├─ Soft:   6px   - Cards, buttons
├─ Round:  8px   - Primary cards
├─ Pill:   12px  - Pills, tags
└─ Circle: 50%   - Avatars, badges
```

---

## Color System

### Primary Palette

Our colors are **semantic and emotional** - each tells a story:

#### Success Green
```
Name: Victory Green
Hex: #10B981 (emerald-500)
RGB: 16, 185, 129
HSL: 160, 84%, 39%

Meaning: Gains, growth, positive performance
Usage: Portfolio increases, winning trades, success states
Emotion: Achievement, prosperity, forward momentum

Code:
text-emerald-500
bg-emerald-500/20
border-emerald-500/30
```

#### Danger Red
```
Name: Warning Red
Hex: #EF4444 (red-500)
RGB: 239, 68, 68
HSL: 0, 84%, 60%

Meaning: Losses, risk, negative performance
Usage: Portfolio decreases, losing trades, warnings
Emotion: Alert, caution, honest transparency

Code:
text-red-500
bg-red-500/20
border-red-500/30
```

#### Achievement Gold
```
Name: Trophy Gold
Hex: #EAB308 (yellow-500)
RGB: 234, 179, 8
HSL: 45, 93%, 47%

Meaning: Achievements, milestones, excellence
Usage: Medals, badges, milestone celebrations
Emotion: Victory, prestige, recognition

Code:
text-yellow-500
bg-yellow-500/20
border-yellow-500/30
```

#### Activity Cyan
```
Name: Neon Cyan
Hex: #06B6D4 (cyan-500)
RGB: 6, 182, 212
HSL: 188, 94%, 43%

Meaning: Activity, data, information, primary actions
Usage: Charts, buttons, links, data highlights
Emotion: Energy, tech-forward, clarity

Code:
text-cyan-500
bg-cyan-500/20
border-cyan-500/30
```

#### Special Purple
```
Name: Elite Purple
Hex: #A855F7 (purple-500)
RGB: 168, 85, 247
HSL: 271, 91%, 65%

Meaning: Premium features, special events, highlights
Usage: Premium badges, special milestones, accents
Emotion: Exclusive, elevated, mysterious

Code:
text-purple-500
bg-purple-500/20
border-purple-500/30
```

### Secondary Palette

#### Supporting Blue
```
Name: Data Blue
Hex: #3B82F6 (blue-500)
Usage: Secondary actions, information, alternative data
Code: text-blue-500
```

#### Warning Orange
```
Name: Caution Orange
Hex: #F97316 (orange-500)
Usage: Moderate warnings, attention needed
Code: text-orange-500
```

### Neutral Palette

#### Background Hierarchy
```
Deepest:  #0F172A (slate-950) - Page background
Deep:     #1E293B (slate-900) - Card backgrounds
Medium:   #334155 (slate-700) - Borders, dividers
Light:    #64748B (slate-500) - Muted text, icons
Lighter:  #94A3B8 (slate-400) - Secondary text
Lightest: #E2E8F0 (slate-200) - Primary text
White:    #F8FAFC (slate-50)  - Headings, emphasis
```

### Gradient Patterns

#### Primary Gradient (Brand)
```css
background: linear-gradient(135deg, #A855F7 0%, #06B6D4 100%);
/* Purple to Cyan - Our signature gradient */
```

#### Success Gradient
```css
background: linear-gradient(135deg, #10B981 0%, #22C55E 100%);
/* Emerald to Green - Celebration gradient */
```

#### Performance Gradient
```css
background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%);
/* Cyan to Blue - Chart gradient */
```

#### Achievement Gradient
```css
background: linear-gradient(135deg, #FACC15 0%, #EAB308 100%);
/* Gold gradient - Trophy/medal shine */
```

### Color Usage Rules

**✅ DO:**
- Use green ONLY for positive performance
- Use red ONLY for negative performance
- Use yellow/gold ONLY for achievements
- Use cyan for primary interactive elements
- Use purple sparingly for premium/special features
- Maintain opacity levels: 5%, 10%, 20%, 30% for backgrounds

**❌ DON'T:**
- Mix green/red meanings (never use red for "hot" stocks)
- Use color alone to convey information (add icons/text)
- Override semantic meanings for aesthetics
- Use pure colors on dark backgrounds (use opacity)
- Forget glow effects on neon colors

---

## Typography

### Font Philosophy

**Readability meets Modernity** - Clear data display with contemporary edge

### Font Stack

#### Primary Font: System UI
```css
font-family: system-ui, -apple-system, 'Segoe UI', 'Roboto', 
             'Helvetica Neue', sans-serif;
```

**Why:** 
- Maximum performance (no loading)
- Native feel on every platform
- Excellent readability at all sizes
- Professional appearance

#### Monospace (Numbers/Data)
```css
font-family: 'SF Mono', 'Monaco', 'Consolas', 
             'Liberation Mono', monospace;
```

**Usage:** 
- Portfolio values
- Percentages
- Timestamps
- Code snippets

### Type Scale

Defined in `styles/globals.css` - **DO NOT override with Tailwind font-size classes** unless specifically needed:

```css
h1: 2.5rem (40px)    - Page titles
h2: 2rem (32px)      - Section headers
h3: 1.5rem (24px)    - Card titles
h4: 1.25rem (20px)   - Subsections
h5: 1.125rem (18px)  - Small headers
h6: 1rem (16px)      - Overlines

p:  1rem (16px)      - Body text
small: 0.875rem (14px) - Meta information
```

### Font Weight System

```
Light:      300 - Rarely used, large decorative text only
Regular:    400 - Body text, descriptions
Medium:     500 - Emphasized text, labels
Semibold:   600 - Buttons, important labels
Bold:       700 - Headers, call-to-action
Extrabold:  800 - Numbers, performance metrics (when needed)
```

### Typography Patterns

#### Portfolio Value Display
```tsx
<div className="text-slate-50">
  <div className="text-4xl tabular-nums tracking-tight">
    $847,392.18
  </div>
  <div className="text-sm text-slate-400">Portfolio Value</div>
</div>
```

#### Percentage Change
```tsx
<span className="text-emerald-500 tabular-nums">
  +24.6%
</span>
```

#### Metric Label
```tsx
<div className="text-xs text-slate-500 uppercase tracking-wider">
  Win Rate
</div>
<div className="text-2xl text-slate-100">
  73.2%
</div>
```

#### Card Header
```tsx
<h3 className="text-slate-200 mb-2">
  Team Performance
</h3>
<p className="text-sm text-slate-400">
  Last 30 days across all portfolios
</p>
```

### Text Color Hierarchy

```
Primary:    text-slate-50     - Headings, important data
Secondary:  text-slate-200    - Subheadings, labels
Tertiary:   text-slate-400    - Supporting text, descriptions
Muted:      text-slate-500    - Timestamps, meta information
Accent:     text-cyan-400     - Links, interactive text
```

---

## Iconography & Illustrations

### Icon System: Lucide Icons

**Why Lucide:**
- Consistent stroke width (2px)
- Open source and customizable
- Matches our geometric aesthetic
- Excellent React integration

### Icon Usage Guidelines

#### Size Scale
```tsx
xs:  w-3 h-3  (12px) - Inline with text
sm:  w-4 h-4  (16px) - Pills, small buttons
md:  w-5 h-5  (20px) - Standard buttons, labels
lg:  w-6 h-6  (24px) - Card headers, large buttons
xl:  w-8 h-8  (32px) - Feature icons
2xl: w-12 h-12 (48px) - Empty states
```

#### Icon Colors
```tsx
// Semantic
<TrendingUp className="w-5 h-5 text-emerald-500" />  // Success
<TrendingDown className="w-5 h-5 text-red-500" />    // Decline
<Award className="w-5 h-5 text-yellow-500" />         // Achievement

// Neutral
<Icon className="w-5 h-5 text-slate-400" />  // Default
<Icon className="w-5 h-5 text-cyan-400" />   // Active/Primary
```

### Medal System

Our unique recognition system uses **color-coded medals**:

#### Gold Medal (1st Place)
```tsx
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 
                flex items-center justify-center shadow-lg shadow-yellow-500/50">
  <span className="text-yellow-950 font-bold text-sm">1</span>
</div>
```

#### Silver Medal (2nd Place)
```tsx
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 
                flex items-center justify-center shadow-lg shadow-slate-500/30">
  <span className="text-slate-900 font-bold text-sm">2</span>
</div>
```

#### Bronze Medal (3rd Place)
```tsx
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 
                flex items-center justify-center shadow-lg shadow-orange-500/30">
  <span className="text-orange-950 font-bold text-sm">3</span>
</div>
```

#### Numbered Badge (4+)
```tsx
<div className="w-8 h-8 rounded-full bg-slate-700/50 border border-slate-600 
                flex items-center justify-center">
  <span className="text-slate-300 font-medium text-sm">4</span>
</div>
```

### Illustration Style

See `ILLUSTRATION_SYSTEM.md` for complete guidelines.

**Key Characteristics:**
- Geometric line art
- 2-3px stroke width
- Neon glow effects
- Dark backgrounds
- Semantic color coding
- Minimalist composition

**Available Illustrations:**
1. EmptyPortfolio - Empty states
2. MilestoneReached - Achievement celebrations
3. DataSyncing - Loading/processing
4. RiskWarning - Alerts and warnings
5. ChartAnalysis - Feature introductions
6. RocketLaunch - Growth and success

---

## UI Components

### Card System

#### Primary Card (Glass-morphic)
```tsx
<div className="border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm 
                rounded-lg p-5 hover:border-cyan-500/30 transition-colors">
  {/* Content */}
</div>
```

**Usage:** Main content containers, feature cards, portfolio summaries

#### Data Card (Clean, focused)
```tsx
<div className="border border-slate-700/50 bg-slate-800/50 rounded-lg p-4">
  {/* Data content */}
</div>
```

**Usage:** Metrics, statistics, data displays

#### Interactive Card (Expandable)
```tsx
<div className="border border-slate-700/50 bg-slate-800/30 rounded-lg p-5 
                hover:bg-slate-800/50 cursor-pointer transition-all">
  {/* Interactive content */}
</div>
```

**Usage:** Team member cards, expandable sections

### Button Hierarchy

#### Primary Action
```tsx
<button className="px-4 py-2 bg-cyan-500 text-white rounded-lg 
                   hover:bg-cyan-600 transition-colors 
                   shadow-lg shadow-cyan-500/30">
  Primary Action
</button>
```

#### Secondary Action
```tsx
<button className="px-4 py-2 bg-slate-700/50 text-slate-200 rounded-lg 
                   border border-slate-600 hover:bg-slate-700 transition-colors">
  Secondary Action
</button>
```

#### Ghost Action
```tsx
<button className="px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 
                   rounded-lg transition-colors">
  Ghost Action
</button>
```

#### Destructive Action
```tsx
<button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg 
                   border border-red-500/30 hover:bg-red-500/30 transition-colors">
  Delete / Remove
</button>
```

### Info Pills (Metrics Display)

Our signature metric display component:

```tsx
<div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 
                border border-slate-700/50 rounded-full backdrop-blur-sm">
  <Icon className="w-4 h-4 text-cyan-400" />
  <span className="text-sm text-slate-300">Label</span>
  <span className="text-sm text-slate-50 font-medium">Value</span>
</div>
```

**Usage:** Quick metrics, KPIs, status indicators

### Badge System

#### Status Badges
```tsx
// Active
<span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 
               rounded text-xs text-emerald-400">Active</span>

// Pending
<span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 
               rounded text-xs text-yellow-400">Pending</span>

// Inactive
<span className="px-2 py-1 bg-slate-700/50 border border-slate-600 
               rounded text-xs text-slate-400">Inactive</span>
```

#### Performance Badges
```tsx
// Positive
<span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
  +24.6%
</span>

// Negative
<span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
  -8.2%
</span>
```

### Chart Components

#### Performance Line Chart
- **Stroke:** 2-3px
- **Green area fill:** Emerald gradient with 60% → 20% opacity
- **Red area fill:** Red gradient with 60% → 20% opacity
- **Background:** Subtle grid with slate-700/20
- **Hover:** Cyan glow on data points

#### Progress Bars
```tsx
<div className="h-2 bg-slate-700/30 rounded-full overflow-hidden">
  <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500" 
       style={{ width: '68%' }} />
</div>
```

**Usage:** Milestone progress, completion tracking

---

## Motion & Animation

### Animation Philosophy

**Purposeful, not decorative** - Every animation should:
1. Provide feedback
2. Guide attention
3. Indicate state change
4. Delight without distracting

### Timing Standards

```
Instant:  0ms      - State toggles, instant feedback
Fast:     150ms    - Micro-interactions, hover states
Base:     200ms    - Button presses, simple transitions
Medium:   300ms    - Panel opens, content reveals
Slow:     500ms    - Page transitions, major state changes
Delayed:  800ms+   - Loading states, data fetching
```

### Easing Functions

```css
/* Tailwind Classes */
ease-linear    - Constant speed (progress bars, loaders)
ease-in        - Slow start (elements leaving screen)
ease-out       - Slow end (elements entering screen) ← DEFAULT
ease-in-out    - Slow start and end (toggles, swaps)
```

### Common Animation Patterns

#### Hover Lift
```tsx
<div className="transition-transform hover:-translate-y-1 duration-200">
  {/* Card content */}
</div>
```

#### Fade In
```tsx
<div className="animate-in fade-in duration-300">
  {/* Content */}
</div>
```

#### Slide In From Bottom
```tsx
<div className="animate-in slide-in-from-bottom duration-500">
  {/* Content */}
</div>
```

#### Pulse (Attention)
```tsx
<div className="animate-pulse">
  {/* Loading or attention-needed content */}
</div>
```

#### Glow Pulse
```tsx
<div className="animate-pulse shadow-lg shadow-cyan-500/50">
  {/* Highlighted element */}
</div>
```

### Prohibited Animations

**❌ Never use:**
- Infinite rotations (unless loading spinner)
- Bounce effects (too playful for finance)
- Shake animations (feels like errors)
- Zoom-in/out on hover (disorienting)
- Flip transitions (gimmicky)

---

## Voice & Tone

### Brand Voice Attributes

```
Confident    ████████░░  80%  - We know what we're doing
Supportive   ███████░░░  70%  - We've got your back
Data-driven  ██████████  100% - Numbers never lie
Celebratory  ██████░░░░  60%  - Wins deserve recognition
Professional ████████░░  80%  - This is serious money
Casual       ████░░░░░░  40%  - But not stuffy
```

### Tone Variations by Context

#### Dashboard / Performance Display
**Tone:** Direct, factual, celebratory when warranted

```
✅ Good:
"Portfolio up 24.6% this month. You're crushing it."
"3 milestones reached this quarter. Team effort pays off."

❌ Avoid:
"OMG! Your portfolio is doing AMAZING!!!"
"Wow, such gains, very profit."
```

#### Warnings / Risk Alerts
**Tone:** Clear, urgent but calm, actionable

```
✅ Good:
"Portfolio volatility increased 15%. Review risk allocation."
"Margin call approaching. Add $2,500 or reduce positions."

❌ Avoid:
"Danger! Your portfolio is at risk!"
"Uh oh... this doesn't look good."
```

#### Achievements / Milestones
**Tone:** Celebratory but measured, specific recognition

```
✅ Good:
"$250K milestone reached. Quarter Mil Club unlocked."
"50% win rate achieved. Consistency pays off."

❌ Avoid:
"Yay! You did it! So proud of you!"
"Achievement unlocked! (Generic celebration)"
```

#### Empty States
**Tone:** Encouraging, clear next steps, optimistic

```
✅ Good:
"No portfolio yet. Start building to track performance."
"No team members. Invite traders to compete together."

❌ Avoid:
"Nothing here yet..."
"It's lonely in here. Add some friends!"
```

### Writing Guidelines

#### Numbers & Data
```
✅ DO:
- Use specific numbers: "$847,392" not "around 850K"
- Include context: "+24.6% (last 30 days)"
- Show precision: "$12,483.72" not "$12,483"
- Use tabular numerals: <span className="tabular-nums">

❌ DON'T:
- Round unnecessarily
- Hide negative numbers
- Use vague terms: "doing well", "not great"
```

#### Labels & Headers
```
✅ DO:
- Be specific: "Monthly ROI" not "Performance"
- Use sentence case: "Top holdings" not "TOP HOLDINGS"
- Keep it concise: 2-4 words max

❌ DON'T:
- Use jargon without context: "Sharpe Ratio" → "Sharpe Ratio (risk-adjusted return)"
- Write paragraphs in headers
- Use ALL CAPS (except abbreviations)
```

#### Calls to Action
```
✅ DO:
- Action-oriented: "View breakdown" not "Click here"
- Clear outcome: "Add team member" not "Invite"
- Specific: "Export CSV" not "Download"

❌ DON'T:
- Generic: "Submit", "OK", "Go"
- Vague: "Continue", "Next"
- Passive: "Data can be exported"
```

### Vocabulary Guide

**Preferred Terms:**

| Use This | Not That |
|----------|----------|
| Portfolio | Account, Wallet |
| Performance | How you're doing |
| Milestone | Goal, Target |
| Team member | User, Person, Friend |
| Workspace | Group, Team, Organization |
| Win rate | Success rate |
| Position | Stock, Holding |
| Allocation | Distribution, Split |
| Volatility | Riskiness, Ups and downs |
| Drawdown | Loss, Negative |

**Finance Terms (OK to use):**
- ROI, P&L, YTD, Sharpe Ratio
- Long, Short, Call, Put
- Bull, Bear (market context)
- Volume, Liquidity, Spread

**Gaming Terms (Use sparingly):**
- XP, Level, Badge (for gamification only)
- Leaderboard (for rankings)
- Unlock, Achievement (for milestones)
- Streak (for consistency tracking)

---

## Content Patterns

### Metric Display Pattern

```
[LARGE NUMBER]
[Small context label]
[Change indicator with time period]

Example:
$847,392.18
Portfolio Value
↑ +$42,193 (24h)
```

### Team Member Display Pattern

```
[Rank badge/medal]
[Name + Trading style]
[Primary strength metric]
[Performance indicator]
[Sparkline chart]

Example:
🥇 Alex Chen • Momentum Trader
Best: High Sharpe Ratio (2.84)
+31.2% (6M)
[Chart showing trend]
```

### Empty State Pattern

```
[Illustration]
[Clear headline]
[Brief explanation]
[Primary action button]

Example:
[EmptyPortfolio illustration]
"No Portfolio Yet"
"Start building your portfolio to track performance and compete with your team."
[Create Portfolio] button
```

### Error/Warning Pattern

```
[Warning icon/illustration]
[Clear problem statement]
[Impact or consequence]
[Actionable solution]

Example:
⚠️ High Portfolio Risk
Your portfolio volatility increased 18% this week.
This may lead to larger swings in value.
→ Review asset allocation
```

---

## Examples & Applications

### Dashboard Header

```tsx
<div className="border-b border-slate-800 bg-gradient-to-br 
                from-slate-950 via-slate-900 to-slate-950 p-6">
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-slate-50 mb-1">Team Omega</h1>
      <p className="text-sm text-slate-400">
        The programs portfolio tracker for you and the boys.
      </p>
    </div>
    <div className="flex gap-2">
      {/* Time period buttons */}
    </div>
  </div>
</div>
```

### Performance Card

```tsx
<div className="border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm 
                rounded-lg p-5">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-slate-200">Portfolio Performance</h3>
    <span className="text-xs text-slate-500">Last 30 days</span>
  </div>
  
  <div className="space-y-4">
    <div>
      <div className="text-3xl text-slate-50 tabular-nums mb-1">
        $847,392.18
      </div>
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-emerald-500" />
        <span className="text-emerald-500 tabular-nums">+24.6%</span>
        <span className="text-xs text-slate-400">+$164,892</span>
      </div>
    </div>
    
    {/* Chart */}
  </div>
</div>
```

### Achievement Notification

```tsx
<div className="border border-yellow-500/30 bg-gradient-to-br 
                from-yellow-500/10 to-purple-500/10 rounded-lg p-4 
                backdrop-blur-sm">
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br 
                    from-yellow-400 to-yellow-600 flex items-center 
                    justify-center shadow-lg shadow-yellow-500/50">
      <Award className="w-5 h-5 text-yellow-950" />
    </div>
    <div className="flex-1">
      <h4 className="text-slate-200 mb-1">Milestone Reached!</h4>
      <p className="text-sm text-slate-400 mb-2">
        Your portfolio hit $250,000. Quarter Mil Club unlocked.
      </p>
      <div className="inline-flex items-center gap-2 px-2 py-1 
                      bg-yellow-500/20 border border-yellow-500/30 
                      rounded text-xs text-yellow-400">
        <span>+500 XP</span>
        <span>•</span>
        <span>Badge Earned</span>
      </div>
    </div>
  </div>
</div>
```

### Team Member Card

```tsx
<div className="border border-slate-700/50 bg-slate-800/30 rounded-lg p-4 
                hover:border-cyan-500/30 transition-colors">
  <div className="flex items-start gap-3">
    {/* Medal */}
    <div className="w-8 h-8 rounded-full bg-gradient-to-br 
                    from-yellow-400 to-yellow-600 flex items-center 
                    justify-center shadow-lg shadow-yellow-500/50 
                    flex-shrink-0">
      <span className="text-yellow-950 font-bold text-sm">1</span>
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-2 mb-1">
        <h4 className="text-slate-200 truncate">Alex Chen</h4>
        <span className="text-xs text-purple-400">Momentum Trader</span>
      </div>
      
      <div className="text-sm text-slate-400 mb-2">
        Best: High Sharpe Ratio (2.84)
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-emerald-500 tabular-nums">+31.2%</span>
        <span className="text-xs text-slate-500">6M</span>
      </div>
    </div>
  </div>
</div>
```

---

## Do's and Don'ts

### Visual Design

#### Colors
```
✅ DO:
- Use semantic colors consistently (green = up, red = down)
- Add opacity to colors on dark backgrounds
- Include glow effects on neon colors
- Provide color AND text/icon for accessibility

❌ DON'T:
- Use pure bright colors (#00FF00) without opacity
- Mix color meanings (red for "hot" stocks)
- Rely only on color to convey information
- Use gradients everywhere (selective use)
```

#### Layout
```
✅ DO:
- Maintain consistent spacing (multiples of 4px)
- Use cards to group related information
- Keep visual hierarchy clear (size, color, weight)
- Align elements to grid

❌ DON'T:
- Cram too much in one card
- Use arbitrary spacing (13px, 17px, etc.)
- Mix alignment (centered and left-aligned in same section)
- Let content touch the edges (always pad)
```

#### Typography
```
✅ DO:
- Use tabular numerals for financial data
- Respect the type scale (don't use Tailwind text-* classes)
- Provide clear hierarchy with size and weight
- Keep line length readable (60-80 characters)

❌ DON'T:
- Use all caps for long text
- Override font sizes without reason
- Use italic for emphasis (use bold or color)
- Set body text smaller than 14px
```

### Content

#### Writing
```
✅ DO:
- Be specific and factual
- Celebrate wins authentically
- Provide context for data
- Use consistent terminology

❌ DON'T:
- Over-hype or exaggerate
- Use vague language
- Hide or downplay losses
- Mix casual and formal tone
```

#### Data Display
```
✅ DO:
- Show precision (2 decimal places for money)
- Include time context ("Last 30 days")
- Provide comparison ("vs. S&P 500")
- Use proper formatting ($1,234.56 not $1234.5)

❌ DON'T:
- Round inappropriately
- Show data without context
- Use inconsistent formats
- Display too many decimal places (4+)
```

### Interaction

#### Animations
```
✅ DO:
- Use transitions for state changes
- Keep animations under 300ms for UI feedback
- Animate on hover for interactive elements
- Respect user's reduced motion preferences

❌ DON'T:
- Auto-play animations on page load (except loaders)
- Use animations longer than 500ms for micro-interactions
- Animate constantly (pulse, bounce) without purpose
- Make animations distracting or dizzying
```

#### Feedback
```
✅ DO:
- Show loading states immediately
- Provide success confirmation
- Explain errors clearly
- Disable buttons during processing

❌ DON'T:
- Leave users wondering if action worked
- Show generic errors ("Something went wrong")
- Let users click multiple times
- Hide loading states
```

---

## Brand Applications

### Email Signatures
```
Alex Chen
Team Omega | Portfolio: $847K (+24.6%)
[Logo] Your Platform Name
```

### Social Share Cards
```
[Card with dark background]
Team Omega reached $2.5M milestone
↑ +31.2% this quarter
[Small chart visualization]
[Logo]
```

### Loading States
```
[DataSyncing illustration with animated pulse]
"Syncing portfolio data..."
"This usually takes a few seconds"
```

### Success States
```
[MilestoneReached illustration]
"Portfolio Synced Successfully"
"Last updated: just now"
[View Portfolio] button
```

---

## Accessibility Standards

### Color Contrast
- **Minimum ratio:** 4.5:1 for body text
- **Large text:** 3:1 for 18px+ or 14px+ bold
- **All text on dark backgrounds** uses slate-200 or lighter

### Interactive Elements
- **Minimum touch target:** 44x44px (mobile)
- **Minimum click target:** 32x32px (desktop)
- **Visible focus states** on all interactive elements

### Content
- **Alt text** for all images and illustrations
- **Labels** for all form inputs
- **ARIA labels** for icon-only buttons
- **Semantic HTML** (proper heading hierarchy)

### Motion
- **Respect** `prefers-reduced-motion` media query
- **Provide** static alternatives to animations
- **Avoid** flashing content (epilepsy risk)

---

## File References

For more detailed information, refer to:

- **Color System**: `DESIGN_SYSTEM.md`, `figma-color-palette.txt`, `design-tokens.json`
- **Illustrations**: `ILLUSTRATION_SYSTEM.md`, `ILLUSTRATION_QUICK_START.md`
- **Figma Workflow**: `FIGMA_WORKFLOW.md`
- **Component Code**: `/components/` directory
- **Styles**: `styles/globals.css`

---

## Version History

**v1.0** - October 21, 2025
- Initial brand style guide
- Visual language defined
- Component patterns established
- Voice and tone guidelines
- Content patterns documented

---

## Maintenance

This is a **living document**. Update when:
- New colors are added to the palette
- New component patterns emerge
- Voice/tone needs refinement
- New illustration types are created
- User feedback suggests changes

**Document Owner:** Design Team  
**Last Review:** October 21, 2025  
**Next Review:** January 2026

---

*"Data never lies, but presentation makes it sing."*  
— Brand Philosophy

