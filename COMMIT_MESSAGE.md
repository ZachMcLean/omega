# Commit Message

```
feat: unify design system with Neon Fintech theme from squad-dashboard

Promotes squad-dashboard's Figma-generated styles to app-wide default,
enhanced with semantic color tokens from design-tokens.json. Establishes
single source of truth for "Neon Fintech" cyberpunk aesthetic across the
entire application.

BREAKING: None - squad-dashboard maintains 100% visual compatibility
```

---

# Pull Request Summary

## 🎨 Unify Design System: Neon Fintech Theme

### Overview
Consolidates design system by promoting squad-dashboard styling to become the app-wide default, enhanced with semantic color tokens and reusable utility patterns. This establishes a single source of truth for the "Neon Fintech" aesthetic while maintaining complete backward compatibility.

### Changes Made

#### 1. Enhanced Global Stylesheet (`src/app/globals.css`)
- ✅ Integrated squad-dashboard Figma styles as foundation
- ✅ Added semantic color system (gain, loss, achievement, info, special, energy)
- ✅ Created utility classes (.card-neon, .stat-pill-*, .performance-badge-*)
- ✅ Comprehensive typography system with font-size/weight variables
- ✅ Chart and sidebar tokens for data visualization
- ✅ Preserved V1 legacy in comments for reference

#### 2. Design Pattern Utilities (`src/lib/neon-patterns.ts`) [NEW]
- ✅ Type-safe pattern classes for common UI components
- ✅ Helper functions for dynamic styling (getPerformanceColor, getStatPill, etc.)
- ✅ Formatting utilities (formatCurrency, formatPercentage, formatLargeNumber)
- ✅ TypeScript types for semantic colors and patterns
- ✅ Complete JSDoc documentation

#### 3. File Cleanup
- ❌ Deleted `src/app/squad-dashboard/globals.css` (now using root stylesheet)
- ✨ Created `DESIGN_SYSTEM_MIGRATION.md` (comprehensive documentation)

### Key Features

**Semantic Color System:**
```tsx
// Before: Raw colors
<span className="text-emerald-400">+12.5%</span>

// After: Semantic meaning
<span className="text-gain">+12.5%</span>
```

**Utility Classes:**
```tsx
// Before: Verbose Tailwind
<div className="border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">

// After: Pre-composed pattern
<div className="card-neon">
```

**Type-Safe Helpers:**
```tsx
import { getPerformanceColor, formatPercentage } from '@/lib/neon-patterns';

<span className={getPerformanceColor(value).text}>
  {formatPercentage(value)}
</span>
```

### Benefits

**For Developers:**
- 🎯 Semantic color names with clear meaning
- ♻️ Reusable utilities reduce code duplication
- 🔍 Type-safe helpers with IDE autocomplete
- 📖 Comprehensive documentation
- ⚡ Faster development with pre-built patterns

**For Design:**
- 🎨 Single source of truth
- 📏 Consistent spacing and typography
- 🌓 Proper dark/light mode support
- 🎭 Unified "Neon Fintech" aesthetic

**For Users:**
- ✨ Consistent visual experience
- 🎮 Gaming-level polish with fintech professionalism
- 🌈 Clear color semantics (green=gains, red=losses)

### Testing
- ✅ Squad-dashboard renders identically (zero visual changes)
- ✅ Dark mode working correctly
- ✅ All components rendering without errors
- ✅ V1 dashboard still functional (marked for deprecation)

### Migration Path
- **Immediate:** All existing components work unchanged
- **Short-term:** Refactor to use semantic tokens and utility classes
- **Long-term:** Deprecate V1 dashboard after feature parity

### Documentation
- `DESIGN_SYSTEM_MIGRATION.md` - Comprehensive migration guide
- `src/lib/neon-patterns.ts` - Full JSDoc documentation
- Semantic color reference table included

### Color System Reference

| Purpose | Variable | Usage |
|---------|----------|-------|
| Gains/Growth | `--gain` / `text-gain` | Portfolio increases, wins |
| Losses/Risk | `--loss` / `text-loss` | Portfolio decreases, warnings |
| Achievements | `--achievement` / `text-achievement` | Milestones, medals, MVP |
| Information | `--info` / `text-info` | Charts, activity, data viz |
| Special | `--special` / `text-special` | Challenges, premium features |
| Energy | `--energy` / `text-energy` | Hot items, highlights |

### Files Changed
- Modified: `src/app/globals.css` (complete rewrite)
- Deleted: `src/app/squad-dashboard/globals.css`
- Created: `src/lib/neon-patterns.ts`
- Created: `DESIGN_SYSTEM_MIGRATION.md`

### Backward Compatibility
✅ **100% Backward Compatible**
- Squad-dashboard: Zero changes required
- V1 dashboard: Still functional
- All existing Tailwind classes work
- New features are purely additive

---

## Reviewer Notes

### What to Check
1. **Visual Regression:** Squad-dashboard should look identical to before
2. **Dark Mode:** Toggle dark mode and verify colors match design
3. **TypeScript:** Verify neon-patterns.ts types work correctly
4. **Documentation:** Review DESIGN_SYSTEM_MIGRATION.md for clarity

### What NOT to Worry About
- CSS linter warnings for `@custom-variant`, `@theme`, `@apply` (Tailwind v4 syntax)
- V1 dashboard using legacy styles (intentional, marked for deprecation)
- Squad-dashboard component updates (none needed - fully compatible)

---

## Related Issues
- Resolves design system fragmentation
- Establishes foundation for component library
- Enables consistent "Neon Fintech" branding

---

**Zero Breaking Changes | Enhanced Maintainability | Better DX**

