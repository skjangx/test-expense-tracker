# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL: Required Reading Before Any Work

**⚠️ MANDATORY: Before starting any work, you MUST read the following files in their entirety:**

1. **📋 Read prd.md completely** - Contains 160 indexed user stories (US-001 to US-160), complete feature specifications, database schema, and implementation phases
2. **🛠️ Read implementation.md completely** - Contains detailed technical implementation guidance, testing strategies, development workflow, and architecture patterns

**These documents contain essential context that cannot be summarized in this file. Reading them fully is required to understand the project scope, business requirements, and technical approach.**

## Project Overview

This is a single-page expense tracking application built with Next.js 14+, TypeScript, Supabase, and ShadCN/UI. The project follows Test-Driven Development with 160 indexed user stories in PRD format and comprehensive implementation planning.

### Tech Stack
- **Frontend**: Next.js 14+ with App Router, TypeScript, Tailwind CSS, ShadCN components
- **Backend**: Supabase with Row Level Security (RLS)
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts (React 19 compatible charting library)
- **Testing**: Jest (unit/integration), Playwright (E2E/visual regression)
- **Deployment**: Vercel with GitHub Actions CI/CD

## Essential Commands

### Development
```bash
# Quality-First Development (REQUIRED)
npm run dev:safe           # Runs all quality checks BEFORE starting dev server
npm run quality            # Type-check + lint + test (run before any work)
npm run tdd               # TDD mode: tests + type-check + dev in parallel

# Start development (run these in separate terminals)
npm run dev                 # Next.js dev server (port 3001) - USE dev:safe INSTEAD
npm run test:watch         # Jest in watch mode for TDD
npx supabase start         # Local Supabase stack

# Testing
npm run test               # Unit tests (Jest)
npm run test:integration   # Integration tests
npm run test:e2e          # E2E tests (Playwright)
npm run test:visual       # Visual regression tests
npm run test:all          # All tests

# Code Quality (MANDATORY)
npm run lint              # ESLint
npm run type-check        # TypeScript compilation
npm run build             # Production build
./scripts/dev-check.sh    # Full development quality gate
```

### Database Management (MCP-Only Strategy)
```bash
# Local development only - NO Supabase dashboard usage
npx supabase start        # Start local Postgres + Auth
npx supabase db reset     # Reset local database
npx supabase stop         # Stop local stack

# Production database operations via MCP server only:
# - Use mcp.supabase.apply_migration() for schema changes
# - Use mcp.supabase.execute_sql() for data operations
# - All migrations version controlled in migrations/ folder
```

**See implementation.md for complete database strategy:**
- Database Strategy (lines 437-536) for MCP-only migration approach
- Database Schema (lines 477-536) for complete table definitions with RLS policies

## Architecture Overview

### Core Application Structure
- **Single-page application** with desktop-first responsive design
- **Authentication-first**: All routes protected except login/signup
- **Korean Won currency** with integer storage (no decimals)
- **Soft deletes** for transaction data integrity
- **Row Level Security** enforced at database level

**See prd.md sections:**
- Core Features (lines 43-71) for complete feature overview
- User Stories US-001 to US-160 for detailed acceptance criteria
- Technical Architecture (lines 957-1056) for complete database schema

### Key Business Logic
- **Transactions**: Amount stored as integers (Korean Won), supports income/expense types
- **Categories**: Predefined system categories + user custom categories
- **Goals**: Period-based spending goals (daily/weekly/monthly/yearly) with progress tracking
- **Analytics**: Real-time spending insights with Recharts

**See prd.md for complete business rules:**
- Transaction Management: US-011 to US-040 (lines 126-281)
- Category Management: US-041 to US-055 (lines 282-355)
- Goals System: US-056 to US-075 (lines 356-455)
- Analytics & Graphs: US-076 to US-100 (lines 457-590)

### State Management Pattern
- **Zustand stores**: Separate stores for auth, transactions, UI state
- **Optimistic updates**: Immediate UI feedback with background sync
- **Local caching**: Categories in localStorage, transactions in sessionStorage

### Testing Philosophy
**Diamond Testing Strategy** (Focus on Integration):
- 30% Unit Tests: Business logic, utilities, pure functions
- 50% Integration Tests: API + Database + Component interaction
- 20% E2E Tests: Critical user journeys only

**Visual Regression**: All components tested at 3 breakpoints (375px, 768px, 1024px)

**See implementation.md for complete testing strategy:**
- Testing Strategy (lines 63-104) for detailed test organization
- Testing Framework Configuration (lines 272-367) for Jest/Playwright setup
- Component Testing Strategy (lines 393-436) for testing patterns

## File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx          # Dashboard (main app)
│   ├── login/page.tsx    # Auth pages
│   └── signup/page.tsx
├── components/
│   ├── ui/               # ShadCN components
│   ├── auth/             # Authentication components
│   ├── transactions/     # Transaction CRUD
│   ├── dashboard/        # Charts and summaries
│   └── layout/           # Headers, navigation
├── lib/
│   ├── supabase.ts      # Database client
│   ├── validations.ts   # Zod schemas
│   └── utils.ts         # Utilities
├── hooks/               # Custom React hooks
├── store/               # Zustand stores
├── types/               # TypeScript definitions
└── __tests__/          # Shared test utilities

tests/
├── integration/         # API + DB tests
├── e2e/                # Critical user journeys
├── visual/             # Screenshot comparisons
└── fixtures/           # Test data and helpers
```

**See implementation.md for detailed file organization:**
- Component Architecture (lines 539-599) for complete folder structure
- Test Organization (lines 80-104) for testing file placement

## Development Workflow

### TDD Rhythm (Required)
1. **Red**: Write failing test first
2. **Green**: Implement minimal code to pass
3. **Refactor**: Clean up and optimize
4. **Commit**: At logical feature completion points

### Commit Standards (Gitmoji Required)
```bash
# Use https://gitmoji.dev/ format
✨ feat(transactions): add expense form validation
🐛 fix(auth): resolve session timeout issue
✅ test(goals): add goal progress calculation tests
♻️ refactor(store): simplify transaction state management
```

### Branch Naming
```bash
feat/US-011-expense-form       # Feature branches reference user stories
fix/US-020-search-performance  # Bug fixes
docs/update-prd-status         # Documentation updates
```

**See implementation.md for complete workflow details:**
- Git Workflow & Standards (lines 136-193) for commit and branching strategy
- TDD Rhythm (lines 627-641) for test-driven development process
- Daily Workflow (lines 643-659) for development session structure

## Database Schema Key Points

### Core Tables (via MCP only - no dashboard)
```sql
-- Transactions: Amount as INTEGER (Korean Won, no decimals)
CREATE TABLE transactions (
  amount INTEGER NOT NULL CHECK (amount > 0),
  type VARCHAR(20) CHECK (type IN ('income', 'expense')),
  is_deleted BOOLEAN DEFAULT false,  -- Soft deletes
  transaction_date DATE NOT NULL,
  -- ... other fields
);

-- Goals: Period-based spending limits
CREATE TABLE goals (
  period_type VARCHAR(20) CHECK (period_type IN ('daily', 'weekly', 'monthly', 'yearly')),
  amount INTEGER NOT NULL CHECK (amount > 0),
  -- ... other fields
);

-- All tables have RLS policies: users see only their own data
```

**See prd.md for complete database schema:**
- Database Schema (lines 984-1037) for full table definitions
- Technical Architecture (lines 957-1056) for complete backend specifications

## Testing Guidelines

### What to Test
```typescript
// ✅ Test YOUR business logic
test('transaction form calculates Korean Won formatting correctly', () => {
  expect(formatCurrency(1000000)).toBe('₩1,000,000')
})

// ✅ Test data flow and state management
test('adding transaction updates store and recalculates totals', () => {
  // Test your specific business logic
})

// ❌ Don't test ShadCN components (they're already tested)
test('Button has correct CSS classes', () => {}) // Skip this
```

### Visual Testing Strategy
- **Playwright visual regression** for UI appearance
- **Three breakpoints**: 375px (mobile), 768px (tablet), 1024px (desktop)
- **Jest snapshots** avoided in favor of Playwright screenshots

## PRD Integration

### Progress Tracking
- **160 indexed user stories** (US-001 to US-160) in prd.md
- **Status indicators**: ⏳ Not Started, 🚧 In Progress, ✅ Completed, 🚫 Blocked
- **Update PRD status** when starting/completing user stories
- **Include PRD updates** in same commits as implementation

### Implementation Phases
1. **Core Foundation** (US-001 to US-025): Auth + Basic Transactions
2. **Goals & Analytics** (US-056 to US-100): Charts + Goal tracking
3. **Advanced Features** (US-026+): Recurring transactions, bulk operations

**See prd.md and implementation.md for complete planning:**
- Implementation Progress tracking (prd.md lines 24-41)
- Implementation Phases (prd.md lines 1084-1135) for detailed phase breakdown
- Implementation Roadmap (implementation.md lines 194-271) for milestone details
- Implementation Checklist (prd.md lines 1156-1188) for completion tracking

## Environment Setup

### Required Environment Variables
```bash
# Local Development (.env.local)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Production (managed by Vercel)
# NEXT_PUBLIC_SUPABASE_URL=production-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=production-key
```

### Local Development Stack
```bash
# Terminal 1: Database
npx supabase start

# Terminal 2: Frontend
npm run dev

# Terminal 3: Tests (TDD)
npm run test:watch
```

**See implementation.md for complete environment setup:**
- Development Environment Setup (lines 23-61) for prerequisites and local stack
- Environment Variables (lines 970-984) for all required configuration

## Performance Requirements

### Targets
- Page load time: < 2 seconds
- UI interactions: < 100ms response
- Bundle size: < 500KB gzipped
- Test coverage: >90% for business logic

### Optimization Strategies
- **Virtual scrolling** for >500 transactions
- **Code splitting** by routes and heavy dependencies
- **Lazy loading** for charts and analytics
- **Optimistic updates** with background synchronization

**See prd.md and implementation.md for complete performance specifications:**
- Performance Requirements (prd.md lines 865-955) for detailed performance user stories
- Performance & Optimization (implementation.md lines 919-946) for optimization strategies
- Success Metrics (prd.md lines 1136-1154) for performance targets

## Common Patterns

### Error Handling
```typescript
// Standard error handling with user-friendly messages
try {
  await saveTransaction(data)
  toast.success('Transaction saved!')
} catch (error) {
  logger.error('Transaction save failed', error)
  toast.error('Failed to save. Please try again.')
}
```

### Form Validation (Zod + React Hook Form)
```typescript
const schema = z.object({
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  description: z.string().max(500)
})

const form = useForm<FormData>({
  resolver: zodResolver(schema)
})
```

### Currency Formatting
```typescript
// Always format Korean Won with thousand separators
formatCurrency(1000000) // "₩1,000,000"
```

**See implementation.md for complete patterns and standards:**
- Error Handling & Quality Standards (lines 824-899) for error handling patterns
- Common Patterns examples and best practices throughout the implementation guide

## Troubleshooting

### Common Issues
```bash
# Tests failing?
npm run db:reset && npm ci

# TypeScript errors?
npm run type-check

# Supabase connection issues?
npx supabase stop && npx supabase start

# Build failing?
npm run lint && npm run type-check && npm run build
```

### Test Data
```typescript
// Use consistent test data across all tests
export const TEST_USER = {
  email: 'test@expense-tracker.com',
  password: 'TestPassword123!'
}

export const MOCK_TRANSACTION = {
  amount: 50000,
  description: "점심",
  category: "Food",
  type: "expense"
}
```

**See implementation.md for additional troubleshooting:**
- Quick Reference (lines 948-1000) for common commands and troubleshooting
- Test User Credentials (lines 1002-1010) for consistent test data

## Key Implementation Notes

- **MCP-first database strategy**: Never use Supabase dashboard, only MCP server commands
- **Korean locale**: All currency in Korean Won (₩), dates in KST timezone
- **Desktop-first design**: Optimize for desktop, then tablet, then mobile
- **Test-driven development**: Write tests alongside implementation, not after
- **Soft deletes**: Never hard delete transaction data
- **Row Level Security**: All data access controlled at database level