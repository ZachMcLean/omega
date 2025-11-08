# AI Agents Guide for Omega Platform

  

**Version 1.0** | Last Updated: October 21, 2025

  

---

  

## 🎯 Project Overview

  

**TradingSquad** is a cooperative fintech SaaS platform where traders and investors join workspaces to share portfolios, track collective performance, and compete while making money together.

  

### Tech Stack

- **Framework:** Next.js 15+ with App Router

- **Styling:** Tailwind CSS with custom design system

- **Database:** Prisma ORM with PostgreSQL

- **Authentication:** Better Auth

- **Trading API:** SnapTrade integration

- **UI Components:** Custom components with shadcn/ui base

  

### Key Directories

```

src/

├── app/ # Next.js app router pages

│ ├── v1-dashboard/ # Main dashboard (current version)

│ ├── api/ # API routes

│ └── start/ # Onboarding flow

├── components/ # Reusable UI components

│ └── ui/ # Base UI components (shadcn/ui)

├── lib/ # Utilities and configurations

└── prisma/ # Database schema and migrations

```

  

---

  

## 🎨 Design System & Brand Guidelines

  

### Visual Identity: "Neon Fintech"

- **Aesthetic:** Cyberpunk Terminal × Modern Finance × Gaming HUD

- **Background:** Dark, deep backgrounds (midnight/space vibes)

- **Accents:** Neon colors that glow and pulse

- **Layout:** Geometric, precise layouts with glass-morphic cards

  

### Color System (Semantic & Emotional)

  

#### Primary Colors

```css

/* Success Green - Gains, growth, positive performance */

text-emerald-500, bg-emerald-500/20, border-emerald-500/30

  

/* Danger Red - Losses, risk, negative performance */

text-red-500, bg-red-500/20, border-red-500/30

  

/* Achievement Gold - Achievements, milestones, excellence */

text-yellow-500, bg-yellow-500/20, border-yellow-500/30

  

/* Activity Cyan - Primary actions, data, information */

text-cyan-500, bg-cyan-500/20, border-cyan-500/30

  

/* Special Purple - Premium features, special events */

text-purple-500, bg-purple-500/20, border-purple-500/30

```

  

#### Background Hierarchy

```css

Deepest: #0F172A (slate-950) - Page background

Deep: #1E293B (slate-900) - Card backgrounds

Medium: #334155 (slate-700) - Borders, dividers

Light: #64748B (slate-500) - Muted text, icons

Lighter: #94A3B8 (slate-400) - Secondary text

Lightest: #E2E8F0 (slate-200) - Primary text

White: #F8FAFC (slate-50) - Headings, emphasis

```

  

### Typography

- **Primary:** System UI fonts for performance

- **Monospace:** For financial data (portfolio values, percentages)

- **Scale:** Defined in `styles/globals.css` - DO NOT override with Tailwind classes

- **Numbers:** Always use `tabular-nums` for financial data

  

### Component Patterns

  

#### Primary Card (Glass-morphic)

```tsx

<div className="border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm

rounded-lg p-5 hover:border-cyan-500/30 transition-colors">

{/* Content */}

</div>

```

  

#### Performance Display

```tsx

<div className="text-slate-50">

<div className="text-4xl tabular-nums tracking-tight">

$847,392.18

</div>

<div className="text-sm text-slate-400">Portfolio Value</div>

</div>

```

  

#### Medal System (Rankings)

```tsx

// Gold Medal (1st Place)

<div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600

flex items-center justify-center shadow-lg shadow-yellow-500/50">

<span className="text-yellow-950 font-bold text-sm">1</span>

</div>

```

  

---

  

## 🚀 Development Guidelines

  

### Code Style & Patterns

  

#### File Naming

- **Components:** `kebab-case.tsx` (e.g., `portfolio-chart.tsx`)

- **Pages:** `page.tsx` (Next.js App Router convention)

- **API Routes:** `route.ts`

- **Utilities:** `camelCase.ts`

  

#### Component Structure

```tsx

// 1. Imports (external libs first, then internal)

import { TrendingUp, Award } from 'lucide-react'

import { Card } from '@/components/ui/card'

  

// 2. Types/Interfaces

interface PortfolioData {

value: number

change: number

period: string

}

  

// 3. Component

export function PortfolioCard({ data }: { data: PortfolioData }) {

return (

<div className="border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm rounded-lg p-5">

{/* Component content */}

</div>

)

}

```

  

#### State Management

- **Local State:** React useState/useReducer

- **Server State:** React Query/TanStack Query for API data

- **Global State:** Context API for user/workspace data

- **Forms:** React Hook Form with Zod validation

  

### API Integration

  

#### SnapTrade Integration

```typescript

// lib/snaptrade.ts - Centralized API client

export const snaptrade = {

accounts: () => fetch('/api/snaptrade/accounts'),

balance: (accountId: string) => fetch(`/api/snaptrade/balance?accountId=${accountId}`),

// ... other endpoints

}

```

  

#### Error Handling

```tsx

// Always provide user-friendly error messages

if (error) {

return (

<div className="border border-red-500/30 bg-red-500/10 rounded-lg p-4">

<p className="text-red-400">Failed to load portfolio data. Please try again.</p>

</div>

)

}

```

  

### Database Patterns

  

#### Prisma Schema Conventions

```prisma

model User {

id String @id @default(cuid())

email String @unique

name String?

createdAt DateTime @default(now())

updatedAt DateTime @updatedAt

// Relations

workspaces WorkspaceMember[]

portfolios Portfolio[]

}

```

  

#### Query Patterns

```typescript

// Always include necessary relations

const user = await prisma.user.findUnique({

where: { id: userId },

include: {

workspaces: {

include: { workspace: true }

},

portfolios: true

}

})

```

  

---

  

## 🎭 Voice & Tone Guidelines

  

### Brand Voice Attributes

- **Confident (80%)** - We know what we're doing

- **Supportive (70%)** - We've got your back

- **Data-driven (100%)** - Numbers never lie

- **Celebratory (60%)** - Wins deserve recognition

- **Professional (80%)** - This is serious money

- **Casual (40%)** - But not stuffy

  

### Content Patterns

  

#### Performance Display

```

✅ Good: "Portfolio up 24.6% this month. You're crushing it."

❌ Avoid: "OMG! Your portfolio is doing AMAZING!!!"

```

  

#### Warnings

```

✅ Good: "Portfolio volatility increased 15%. Review risk allocation."

❌ Avoid: "Danger! Your portfolio is at risk!"

```

  

#### Achievements

```

✅ Good: "$250K milestone reached. Quarter Mil Club unlocked."

❌ Avoid: "Yay! You did it! So proud of you!"

```

  

### Vocabulary Guide

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

  

---

  

## 🔧 Technical Implementation

  

### Authentication Flow

1. **Sign Up:** Email verification required

2. **Sign In:** Better Auth with session management

3. **Workspace:** Users can join/create workspaces

4. **SnapTrade:** Connect trading accounts via OAuth

  

### Data Flow

```

User → Workspace → Portfolio → SnapTrade API → Real-time Updates

```

  

### Performance Considerations

- **Images:** Use Next.js Image component with optimization

- **Charts:** Implement virtualization for large datasets

- **API:** Implement proper caching with React Query

- **Bundle:** Use dynamic imports for heavy components

  

### Security

- **Authentication:** Better Auth with secure sessions

- **API Routes:** Validate all inputs with Zod

- **Database:** Use Prisma for type-safe queries

- **Environment:** Never expose API keys in client code

  

---

  

## 🎨 UI Component Guidelines

  

### Animation Standards

```css

/* Timing */

Instant: 0ms - State toggles

Fast: 150ms - Micro-interactions

Base: 200ms - Button presses

Medium: 300ms - Panel opens

Slow: 500ms - Page transitions

```

  

### Prohibited Animations

- ❌ Infinite rotations (unless loading spinner)

- ❌ Bounce effects (too playful for finance)

- ❌ Shake animations (feels like errors)

- ❌ Zoom-in/out on hover (disorienting)

  

### Accessibility

- **Color Contrast:** Minimum 4.5:1 for body text

- **Touch Targets:** Minimum 44x44px on mobile

- **Focus States:** Visible on all interactive elements

- **Motion:** Respect `prefers-reduced-motion`

- **Semantic HTML:** Proper heading hierarchy

  

---

  

## 🚨 Common Patterns & Anti-Patterns

  

### ✅ DO

- Use semantic colors consistently (green = up, red = down)

- Add opacity to colors on dark backgrounds

- Include glow effects on neon colors

- Show precision (2 decimal places for money)

- Use tabular numerals for financial data

- Provide context for all metrics

- Celebrate wins authentically

- Use specific numbers: "$847,392" not "around 850K"

  

### ❌ DON'T

- Use pure bright colors without opacity

- Mix color meanings (red for "hot" stocks)

- Rely only on color to convey information

- Round inappropriately

- Show data without context

- Over-hype or exaggerate

- Use vague language like "doing well"

- Hide or downplay losses

  

---

  

## 🔍 Debugging & Troubleshooting

  

### Common Issues

1. **SnapTrade API Errors:** Check API keys and rate limits

2. **Authentication Issues:** Verify Better Auth configuration

3. **Database Errors:** Check Prisma schema and migrations

4. **Styling Issues:** Ensure Tailwind classes match design system

  

### Development Tools

- **Database:** Prisma Studio for data inspection

- **API Testing:** Use browser dev tools or Postman

- **Styling:** Tailwind CSS IntelliSense extension

- **Type Safety:** TypeScript strict mode enabled

  

---

  

## 📚 Resources & References

  

### Key Files

- **Brand Guide:** `/Users/zach/Downloads/BRAND_STYLE_GUIDE.md`

- **Database Schema:** `prisma/schema.prisma`

- **API Routes:** `src/app/api/`

- **Components:** `src/components/`

- **Styling:** `src/app/globals.css`

  

### External APIs

- **SnapTrade:** Trading account integration

- **Better Auth:** Authentication system

- **Resend:** Email verification

  

### Design Assets

- **Icons:** Lucide React (consistent 2px stroke)

- **Colors:** Tailwind CSS with custom opacity levels

- **Typography:** System fonts with monospace for data

- **Animations:** Tailwind CSS transitions

  

---

  

## 🎯 Agent Instructions

  

When working on this project:

  

1. **Always follow the brand style guide** - colors, typography, spacing

2. **Use semantic colors** - green for gains, red for losses, gold for achievements

3. **Implement proper error handling** with user-friendly messages

4. **Follow the established patterns** for components and API calls

5. **Maintain the professional yet celebratory tone** in all content

6. **Ensure accessibility** with proper contrast and focus states

7. **Use the medal system** for rankings and achievements

8. **Implement glass-morphic cards** with proper backdrop blur

9. **Add glow effects** to neon colors for the cyberpunk aesthetic

10. **Keep animations purposeful** - under 300ms for micro-interactions

  

Remember: This is a **serious financial platform** with **gaming-level engagement**. Balance professionalism with celebration, data accuracy with visual appeal, and individual achievement with team success.

  

---

  

*"Data never lies, but presentation makes it sing."*

— Brand Philosophy