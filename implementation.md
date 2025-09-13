# Expense Tracker - Implementation Plan

## Executive Summary

This implementation plan outlines a pragmatic Test-Driven Development approach for building a modern expense tracking application. We'll build incrementally, focusing on getting one complete feature working end-to-end before expanding functionality.

### Core Principles
- **Test-First Mentality**: Write tests alongside implementation for confidence
- **Incremental Development**: Complete features vertically (DB → API → UI)
- **Quality Over Speed**: Solid foundation enables faster future development
- **Practical TDD**: Balance between pure TDD and development velocity

### Tech Stack
- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS, ShadCN components
- **Backend**: Supabase with Row Level Security
- **State**: Zustand for client-side state management
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts (React 19 compatible)
- **Testing**: Jest (unit/integration), Playwright (E2E/visual)
- **Deployment**: Vercel with GitHub Actions
- **Development Tools**: MCP servers (GitHub, Vercel, Supabase, ShadCN, Playwright)

## Development Environment Setup

### Prerequisites
```bash
# Install required tools
npm install -g supabase
npm install -g vercel

# Verify installations
node --version    # v18+
npm --version     # v9+
supabase --version
```

### Local Development Stack
```bash
# 1. Initialize Supabase locally
npx supabase init
npx supabase start  # Starts local Postgres, Auth, etc.

# 2. Environment variables
# .env.local
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3001

# 3. Install dependencies
npm install
npm run dev  # Start Next.js on localhost:3001
```

### MCP Server Integration
- **GitHub MCP**: Repository management, PR automation
- **Vercel MCP**: Deployments, preview URLs
- **Supabase MCP**: Production database operations
- **ShadCN MCP**: Component installations
- **Playwright MCP**: Visual regression testing

Trigger MCP operations with relevant keywords in commands and comments.

## Testing Strategy

### Testing Pyramid (Diamond Approach)
```
     Unit Tests (30%)
  Integration Tests (50%)  ← Focus here
     E2E Tests (20%)
```

Financial applications benefit from more integration tests that verify data flow and business logic.

### Coverage Goals
- **Unit Tests**: 85% (business logic, utilities, pure functions)
- **Integration Tests**: 70% (API routes, database operations, auth flows)
- **E2E Tests**: Critical user journeys only (auth, CRUD, dashboard)
- **Visual Tests**: All components at 3 breakpoints (375px, 768px, 1024px)

### Test Organization
```
src/
  components/
    transactions/
      TransactionForm.tsx
      TransactionForm.test.tsx        # Colocated component tests
  lib/
    utils.ts
    __tests__/
      utils.test.ts                   # Utility tests separate

tests/
  integration/
    transactions.integration.ts       # API + DB tests
  e2e/
    user-journeys/
      onboarding.spec.ts
      daily-transactions.spec.ts
  visual/
    layouts.spec.ts                   # Full page screenshots
  fixtures/
    test-data.ts                      # Shared test data
    auth.ts                           # Test user credentials
```

### Shared Test Infrastructure
```typescript
// tests/helpers/render.tsx
export const renderWithProviders = (ui: ReactElement, options = {}) => {
  return render(
    <ThemeProvider theme="dark">
      <AuthProvider>
        <QueryProvider>
          {ui}
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>,
    options
  )
}

// tests/fixtures/test-data.ts
export const TEST_TRANSACTIONS = [
  { amount: 12000, description: "점심", category: "Food" },
  { amount: 50000, description: "마트 장보기", category: "Shopping" },
  { amount: 3500, description: "지하철", category: "Transportation" }
]

export const TEST_USER = {
  email: 'test@expense-tracker.com',
  password: 'TestPassword123!',
  id: 'test-user-uuid'
}
```

## Git Workflow & Standards

### Commit Message Format (Gitmoji)
Reference: https://gitmoji.dev/

```bash
# Format: <emoji> <type>(<scope>): <description>

# Examples
✨ feat(transactions): add expense form validation
🐛 fix(auth): resolve session timeout issue
✅ test(transactions): add form validation tests
📝 docs(prd): update US-011 status to completed
♻️ refactor(store): simplify transaction state
🎨 style(ui): improve responsive layout
```

### Commit Strategy
**Meaningful Feature Commits** - Commit when features are complete:

```bash
# ✅ Good: Complete features with tests
✨ feat(transactions): add transaction form with validation and tests
🐛 fix(auth): resolve session timeout with error handling
♻️ refactor(store): simplify transaction state management

# ❌ Avoid: Micro-commits during TDD
✅ test: add amount validation
✨ feat: add amount field  
✅ test: add category validation
✨ feat: add category field
```

**When to Commit:**
- After complete feature implementation (including tests)
- When making significant bug fixes
- When refactoring that improves code quality
- End of work session (even if incomplete)

### Branch Strategy
```bash
# Feature branches for user stories
git checkout -b feat/US-011-expense-form
git checkout -b fix/US-020-search-performance
git checkout -b docs/update-implementation-plan

# Naming convention: <type>/<US-number>-<description>
```

### Pull Request Process
1. Create feature branch
2. Implement feature with tests
3. Update PRD if specs changed
4. Push and create PR
5. GitHub Actions run all tests
6. Visual regression tests on main branch merges
7. Merge when tests pass

## Implementation Roadmap

### Milestone 1: Core Foundation (Week 1)
**Goal**: Get one complete feature working end-to-end

**Deliverables**:
- [ ] Project setup (Next.js + TypeScript + Tailwind)
- [ ] Local Supabase running
- [ ] Authentication flow (signup/signin/signout)
- [ ] Basic transaction add form
- [ ] Transaction list view
- [ ] Full test coverage for auth + basic transactions
- [ ] CI/CD pipeline working

**User Stories**: US-001 to US-010 (Auth), US-011, US-012, US-018 (Basic Transactions)

**Success Criteria**:
- User can register, login, add transaction, see it in list
- All tests pass
- Deploys to Vercel successfully

### Milestone 2: Full CRUD Operations (Week 2)
**Goal**: Complete transaction management

**Deliverables**:
- [ ] Edit/delete transactions
- [ ] Category management (predefined + custom)
- [ ] Search and filtering
- [ ] Month navigation
- [ ] Data validation and error handling
- [ ] Loading and error states

**User Stories**: US-013 to US-040 (Transaction Management), US-041 to US-055 (Categories)

**Success Criteria**:
- Full transaction CRUD with categories
- Responsive design working
- All error states handled gracefully

### Milestone 3: Goals & Analytics (Week 3)
**Goal**: Add financial tracking features

**Deliverables**:
- [ ] Goal setting (overall + category-specific)
- [ ] Goal progress tracking
- [ ] Basic charts (spending trends, category breakdown)
- [ ] Dashboard with summary cards
- [ ] Heat map calendar
- [ ] Insights calculations

**User Stories**: US-056 to US-075 (Goals), US-076 to US-100 (Analytics)

**Success Criteria**:
- Users can set and track progress toward financial goals
- Visual analytics provide spending insights
- Dashboard gives quick financial overview

### Milestone 4: Polish & Production (Week 4)
**Goal**: Production-ready application

**Deliverables**:
- [ ] Recurring transactions
- [ ] Bulk operations
- [ ] Advanced analytics features
- [ ] Performance optimizations
- [ ] Visual regression test suite
- [ ] Comprehensive E2E test coverage
- [ ] Production deployment
- [ ] Documentation updates

**User Stories**: All remaining user stories, performance optimization

**Success Criteria**:
- Full feature parity with PRD
- Performance benchmarks met
- All tests passing in CI/CD
- Production deployment successful

## Testing Framework Configuration

### Jest Setup
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.stories.*',
    '!src/**/*.config.*',
    '!src/**/types.*'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 85,
      statements: 85
    }
  }
}

// jest.setup.js
import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Mock Next.js router
jest.mock('next/router', () => require('next-router-mock'))
```

### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    
    // Tablet
    {
      name: 'tablet',
      use: { ...devices['iPad'] },
    },

    // Visual regression tests
    {
      name: 'visual',
      testDir: './tests/visual',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  // Start local dev server before tests
  webServer: {
    command: 'npm run dev',
    port: 3001,
    reuseExistingServer: !process.env.CI
  }
})
```

### Test Naming Convention
Use descriptive, documentation-style test names:

```typescript
// ✅ Good: Readable and specific
describe('TransactionForm', () => {
  describe('when user adds an expense', () => {
    test('should validate that amount is positive', () => {})
    test('should require category selection', () => {})
    test('should save transaction with Korean Won formatting', () => {})
  })
  
  describe('when user edits existing transaction', () => {
    test('should pre-populate form with existing data', () => {})
    test('should update transaction in database', () => {})
  })
})

// ❌ Avoid: Vague or technical
test('validates input', () => {})
test('saves data', () => {})
```

### Component Testing Strategy

**Focus on Business Logic, Not UI Libraries:**

```typescript
// ❌ Don't test ShadCN components (they're already tested)
test('Button renders correctly', () => {
  render(<Button>Click</Button>)
  expect(button).toHaveClass('bg-primary')  // ShadCN's responsibility
})

// ✅ Test YOUR business logic and data flow
test('transaction form validates and submits data correctly', () => {
  const mockSubmit = jest.fn()
  render(<TransactionForm onSubmit={mockSubmit} />)
  
  // Test your validation logic
  fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '-100' }})
  expect(screen.getByText('Amount must be positive')).toBeInTheDocument()
  
  // Test your form submission
  fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '50000' }})
  fireEvent.click(screen.getByRole('button', { name: /save/i }))
  expect(mockSubmit).toHaveBeenCalledWith({
    amount: 50000,
    type: 'expense',
    // ... expected data
  })
})

// ✅ Test integration with your state management
test('saving transaction updates store correctly', () => {
  const { result } = renderHook(() => useTransactionStore())
  
  act(() => {
    result.current.addTransaction(mockTransaction)
  })
  
  expect(result.current.transactions).toContain(mockTransaction)
})
```

**UI Appearance Testing**: Use visual regression tests with Playwright instead of component tests.

## Database Strategy

### MCP-Only Migration Approach
All database operations handled through Supabase MCP server - no dashboard usage:

```sql
-- migrations/001_create_categories.sql
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  color VARCHAR(7) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

```typescript
// Apply migrations via MCP
await mcp.supabase.apply_migration({
  project_id: 'your-project-id',
  name: 'create_categories_table',
  query: migrationSQL
})

// Execute raw SQL via MCP
await mcp.supabase.execute_sql({
  project_id: 'your-project-id',
  query: 'INSERT INTO categories (name, type, color, is_default) VALUES ...'
})
```

**Workflow**:
1. Write SQL migration files locally
2. Test with local Supabase CLI: `npx supabase start`
3. Apply to production via MCP server commands
4. All schema changes version controlled in Git

### Database Schema (from PRD)
```sql
-- Categories
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  color VARCHAR(7) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Transactions  
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL CHECK (amount > 0),
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description VARCHAR(500),
  transaction_date DATE NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  recurring_pattern JSONB,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Goals
CREATE TABLE goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL CHECK (amount > 0),
  period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly', 'yearly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- RLS Policies (Row Level Security)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own categories"
  ON categories FOR ALL TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can only access their own transactions"
  ON transactions FOR ALL TO authenticated  
  USING (user_id = auth.uid());

CREATE POLICY "Users can only access their own goals"
  ON goals FOR ALL TO authenticated
  USING (user_id = auth.uid());
```

## Component Architecture

### File Organization
```
src/
├── components/
│   ├── ui/                    # ShadCN components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── form.tsx
│   │
│   ├── auth/                  # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AuthGuard.tsx
│   │
│   ├── transactions/          # Transaction management
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionTable.tsx
│   │   ├── TransactionRow.tsx
│   │   └── TransactionFilters.tsx
│   │
│   ├── dashboard/             # Dashboard components
│   │   ├── SummaryCards.tsx
│   │   ├── SpendingChart.tsx
│   │   └── GoalProgress.tsx
│   │
│   └── layout/                # Layout components
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── Footer.tsx
│
├── lib/                       # Utilities and configurations
│   ├── supabase.ts           # Supabase client
│   ├── validations.ts        # Zod schemas
│   ├── utils.ts              # General utilities
│   └── constants.ts          # App constants
│
├── hooks/                     # Custom React hooks
│   ├── useAuth.ts
│   ├── useTransactions.ts
│   └── useLocalStorage.ts
│
├── store/                     # Zustand stores
│   ├── authStore.ts
│   ├── transactionStore.ts
│   └── uiStore.ts
│
├── types/                     # TypeScript definitions
│   ├── database.ts           # Supabase generated types
│   ├── transaction.ts        # Business logic types
│   └── auth.ts               # Authentication types
│
└── app/                       # Next.js App Router
    ├── layout.tsx
    ├── page.tsx              # Dashboard
    ├── login/
    │   └── page.tsx
    └── api/                   # API routes (if needed)
        └── auth/
```

### Naming Conventions
```typescript
// Components: PascalCase
export function TransactionForm() {}

// Files: PascalCase for components, camelCase for utilities
TransactionForm.tsx
transactionUtils.ts

// Constants: UPPER_SNAKE_CASE
export const MAX_TRANSACTION_AMOUNT = 99_999_999

// Types/Interfaces: PascalCase
interface TransactionFormProps {}
type TransactionType = 'income' | 'expense'

// Functions: camelCase
export function formatCurrency(amount: number) {}

// Test files: Same as source + .test
TransactionForm.test.tsx
transactionUtils.test.ts
```

## Development Workflow

### TDD Rhythm
```bash
# 1. 🔴 Red: Write failing test
npm run test:watch  # Keep this running

# 2. 🟢 Green: Make test pass
# Write minimal code to pass

# 3. 🔵 Refactor: Clean up
# Improve code quality

# 4. Commit at logical points
✅ test(transactions): add amount validation test
✨ feat(transactions): implement amount validation
```

### Daily Workflow
```bash
# Start development session
npm run dev          # Terminal 1: Next.js
npm run test:watch   # Terminal 2: Jest in watch mode
npx supabase start   # Terminal 3: Local database

# Work on feature
# - Write test
# - Implement feature
# - Refactor
# - Commit

# End of session
git push origin feat/US-XXX-feature
npx supabase stop    # Stop local database
```

### Package Management
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "@supabase/supabase-js": "^2.39.0",
    "zustand": "^4.4.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "recharts": "^3.2.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "jest": "^29.7.0",
    "playwright": "^1.40.0",
    "@testing-library/react": "^13.4.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

Security audits: Run `npm audit` monthly for critical vulnerabilities.

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linting
        run: npm run lint
        
      - name: Run type checking
        run: npm run type-check
        
      - name: Run unit tests
        run: npm run test
        
      - name: Run integration tests
        run: npm run test:integration
        
      - name: Build application
        run: npm run build

  e2e:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
        
      - name: Install Playwright
        run: npx playwright install --with-deps
        
      - name: Run E2E tests
        run: npm run test:e2e
        
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

  visual:
    needs: test
    if: github.event_name == 'pull_request' && github.base_ref == 'main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install Playwright
        run: npx playwright install --with-deps
        
      - name: Run visual regression tests
        run: npm run test:visual
        
      - name: Upload visual diff artifacts
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: visual-diff-report
          path: visual-diff-report/

  deploy:
    needs: [test, e2e]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Test Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    
    "test": "jest",
    "test:watch": "jest --watch",
    "test:unit": "jest --testMatch='**/*.test.ts(x)?'",
    "test:integration": "jest --testMatch='**/*.integration.ts'",
    "test:e2e": "playwright test",
    "test:visual": "playwright test --project=visual",
    "test:all": "npm run test && npm run test:e2e",
    
    "db:start": "npx supabase start",
    "db:stop": "npx supabase stop",
    "db:reset": "npx supabase db reset",
    "db:dump": "npx supabase db dump --schema-only > schema.sql"
  }
}
```

## Error Handling & Quality Standards

### Error Handling Patterns
```typescript
// lib/logger.ts
export const logger = {
  error: (message: string, error?: any) => {
    console.error(`❌ ${message}`, error)
    // Future: Add Sentry or similar
  },
  info: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`ℹ️ ${message}`)
    }
  }
}

// Error boundaries for React components
export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {children}
    </ErrorBoundary>
  )
}

// API error handling
try {
  const result = await api.saveTransaction(data)
  toast.success('Transaction saved!')
  return result
} catch (error) {
  logger.error('Failed to save transaction', error)
  
  if (error instanceof ValidationError) {
    toast.error('Please check your input')
  } else if (error instanceof NetworkError) {
    toast.error('Network error. Please try again.')
  } else {
    toast.error('Something went wrong')
  }
  
  throw error
}
```

### Code Quality Standards
```typescript
// Use TypeScript strictly
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}

// Validation with Zod
import { z } from 'zod'

export const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1),
  description: z.string().max(500),
  date: z.date()
})

// Consistent formatting with Prettier
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## PRD Integration

### Update Process
- Update PRD status when starting work: ⏳ → 🚧
- Update PRD status when completing: 🚧 → ✅
- Include PRD updates in same commit as implementation
- Update acceptance criteria if specs change during development

### Traceability
```bash
# Commit messages reference user stories
✨ feat(auth): implement signup flow
# Updates: US-001 status ⏳ → ✅

# PR titles include user story context
feat: Authentication Flow (US-001 to US-010)
```

## Performance & Optimization

### Performance Targets
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
- Bundle size: < 500KB gzipped

### Optimization Strategies
```typescript
// Code splitting
const TransactionChart = lazy(() => import('./TransactionChart'))

// Memoization
const ExpensiveCalculation = memo(({ data }) => {
  const result = useMemo(() => 
    calculateComplexStats(data), [data]
  )
  return <div>{result}</div>
})

// Virtual scrolling for large lists
import { VirtualizedList } from '@tanstack/react-virtual'

// Image optimization
import Image from 'next/image'
```

## Quick Reference

### Common Commands
```bash
# Development
npm run dev                 # Start Next.js
npm run test:watch         # TDD mode
npx supabase start         # Start local DB

# Testing
npm run test               # Unit tests
npm run test:e2e          # E2E tests
npm run test:all          # All tests

# Database
npx supabase db reset     # Fresh DB
npx supabase db dump      # Export schema

# Deployment
git push origin main      # Auto-deploy to Vercel
```

### Environment Variables
```bash
# Local Development (.env.local)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Production (Vercel auto-injects these)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
NEXT_PUBLIC_APP_URL=https://expense-tracker.vercel.app

# Only two environments: Local development and Production
# No separate test environment - use local for testing
```

### Troubleshooting
```bash
# Tests failing?
npm run db:reset           # Reset test database
rm -rf .next               # Clear Next.js cache
npm ci                     # Fresh install

# Local Supabase issues?
npx supabase stop
npx supabase start

# Build errors?
npm run type-check         # Check TypeScript
npm run lint              # Check ESLint
```

### Test User Credentials
```typescript
// Use for all non-auth tests
export const TEST_USER = {
  email: 'test@expense-tracker.com',
  password: 'TestPassword123!',
  id: 'test-user-uuid'
}
```

---

## Success Metrics

### Development Velocity
- Complete user story implementation in 1-2 days
- 90% test coverage maintained
- Zero failing tests in main branch
- Deploy to production weekly

### Code Quality
- TypeScript strict mode with no `any` types
- ESLint/Prettier passing
- All PRs reviewed and approved
- Performance budgets met

### User Experience
- Page load < 2 seconds
- All critical user journeys covered by E2E tests
- Responsive design working across all breakpoints
- Error states handled gracefully

This implementation plan provides a clear roadmap for building a robust, well-tested expense tracking application using modern development practices and tools.