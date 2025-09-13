# Expense Tracker - Product Requirements Document

## Executive Summary

A single-page expense tracking application that enables users to manage their income and expenses, set spending goals, and analyze their financial patterns through interactive visualizations.

### Core Value Proposition
- **Simple**: Single-page interface for quick transaction management
- **Visual**: Interactive charts showing spending trends and patterns
- **Goal-Oriented**: Configurable expense goals with progress tracking
- **Responsive**: Desktop-first design with mobile and tablet optimization

### Tech Stack
- **Frontend**: Next.js 14+ with TypeScript, deployed on Vercel
- **Backend**: Supabase with Row Level Security (RLS)
- **UI Framework**: ShadCN/UI components with Tailwind CSS
- **Charts**: Recharts (React 19 compatible charting library)
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Development**: MCP servers (GitHub, Vercel, Supabase, ShadCN, Playwright)
- **Testing**: Jest (unit/integration), Playwright (E2E/visual regression)

## Implementation Progress

### Quick Stats
- **Total Stories**: 160
- **Completed**: 8 ✅
- **In Progress**: 0 🚧
- **Not Started**: 152 ⏳

### Current Focus
- **Completed Phase**: ✅ Authentication Foundation (US-001 to US-009)
- **Next Up**: US-011, US-012, US-018 (Basic Transactions)
- **Blockers**: None
- **Database**: ✅ Complete (3 tables, RLS policies, default categories seeded)

### Status Legend
- ⏳ = Not Started
- 🚧 = In Progress  
- ✅ = Completed
- 🚫 = Blocked

## Core Features

### 1. Transaction Management
- Add income and expense transactions with categories
- Edit and delete existing transactions (soft delete)
- Search and filter transactions by multiple criteria
- Monthly pagination with calendar navigation
- Bulk operations (select multiple, batch delete/categorize)

### 2. Goal Setting
- Configurable expense goals (daily/weekly/monthly/yearly)
- Independent category-specific goals
- Visual progress indicators with warnings
- Goal achievement celebrations

### 3. Analytics & Visualization
- Interactive trend charts (line/bar charts)
- Time period analysis (day/week/month/year)
- Category breakdown with pie charts
- Heat map calendar showing spending intensity
- Comparison views (current vs previous periods)

### 4. User Experience
- Dark theme with ShadCN design system
- Responsive design (desktop-first, mobile/tablet optimized)
- Keyboard shortcuts (ESC to close modals, Enter to submit)
- Toast notifications and optimistic updates
- Auto-categorization and predictive text

## User Stories

### Authentication (US-001 to US-010)

**✅ US-001**: As a user, I want to sign up with email and password so I can create my personal expense tracking account.
- **AC**: Email/password form with Supabase Auth
- **AC**: No email confirmation required (configured in Supabase)
- **AC**: Redirect to dashboard after successful signup

**✅ US-002**: As a user, I want to sign in with my credentials so I can access my expense data.
- **AC**: Email/password login form
- **AC**: Remember me functionality
- **AC**: Error messages for invalid credentials

**✅ US-003**: As a user, I want to sign out so I can secure my account.
- **AC**: ✅ Sign out button in header
- **AC**: ✅ Clear session and redirect to login
- **AC**: ✅ Confirmation dialog before signing out

**⏳ US-004**: As a user, I want to reset my password so I can regain access to my account.
- **AC**: Password reset via email
- **AC**: Secure token-based reset flow
- **AC**: Success confirmation after reset

**✅ US-005**: As a user, I want my session to persist so I don't have to log in repeatedly.
- **AC**: ✅ Session management with Supabase
- **AC**: ✅ Auto-refresh tokens before expiry
- **AC**: ✅ Graceful handling of expired sessions

**✅ US-006**: As a user, I want protected routes so unauthorized users cannot access my data.
- **AC**: ✅ Route guards for authenticated pages
- **AC**: ✅ Redirect to login if not authenticated
- **AC**: ⚠️ Maintain intended destination after login (basic implementation)

**✅ US-007**: As a user, I want my data to be private so only I can see my transactions.
- **AC**: ✅ Row Level Security (RLS) policies in Supabase
- **AC**: ✅ User-specific data isolation
- **AC**: ✅ Secure API endpoints

**✅ US-008**: As a user, I want error handling for auth failures so I understand what went wrong.
- **AC**: ✅ Clear error messages for common scenarios
- **AC**: ✅ Network error handling
- **AC**: ⚠️ Rate limiting protection (handled by Supabase)

**✅ US-009**: As a user, I want a loading state during authentication so I know the system is working.
- **AC**: ✅ Loading spinners during auth operations
- **AC**: ✅ Disable form submission while processing
- **AC**: ✅ Skeleton loading for initial auth check

**⏳ US-010**: As a user, I want to update my profile information so I can keep my account current.
- **AC**: Profile update form
- **AC**: Password change functionality
- **AC**: Account deletion option (future)

### Transaction Management (US-011 to US-040)

**⏳ US-011**: As a user, I want to add an expense transaction so I can track my spending.
- **AC**: Modal form with amount, category, description, date fields
- **AC**: Default to current date
- **AC**: Amount input with Korean Won (₩) formatting
- **AC**: Auto-format numbers with thousand separators (1,000,000)

**⏳ US-012**: As a user, I want to add an income transaction so I can track my earnings.
- **AC**: Same form as expenses with income/expense toggle
- **AC**: Different color indicators for income vs expense
- **AC**: Income categories (Salary, Freelance, Investment, Gift, Other)

**⏳ US-013**: As a user, I want to categorize my transactions so I can organize my spending.
- **AC**: Predefined expense categories (Food, Transportation, Housing, Entertainment, Healthcare, Shopping, Utilities, Other)
- **AC**: Custom category creation
- **AC**: Category dropdown with search functionality

**⏳ US-014**: As a user, I want to add descriptions to transactions so I can remember details.
- **AC**: Optional description field (name field)
- **AC**: Truncated display in table with expand on hover
- **AC**: Search functionality includes descriptions

**⏳ US-015**: As a user, I want to select transaction dates so I can log past expenses.
- **AC**: Calendar popup date picker
- **AC**: Quick date options (Today, Yesterday, etc.)
- **AC**: Date format: YYYY-MM-DD display

**⏳ US-016**: As a user, I want to edit existing transactions so I can correct mistakes.
- **AC**: Click transaction row to open edit modal
- **AC**: Pre-populated form with existing data
- **AC**: Save changes with optimistic update

**⏳ US-017**: As a user, I want to delete transactions so I can remove incorrect entries.
- **AC**: Delete button in transaction row (three-dot menu)
- **AC**: Confirmation dialog before deletion
- **AC**: Soft delete (mark as deleted, don't remove from DB)

**⏳ US-018**: As a user, I want to see all my transactions in a table so I can review my financial activity.
- **AC**: Paginated table showing current month by default
- **AC**: Columns: Date, Description, Category, Amount, Actions
- **AC**: Compact row spacing for desktop
- **AC**: Responsive card view for mobile

**⏳ US-019**: As a user, I want to navigate between months so I can review historical transactions.
- **AC**: Previous/Next month navigation buttons
- **AC**: Month/year picker dropdown
- **AC**: Show entire month of transactions (no pagination within month)

**⏳ US-020**: As a user, I want to search transactions so I can find specific entries.
- **AC**: Search bar above transaction table
- **AC**: Search by description, amount, and category
- **AC**: Real-time search with 500ms debounce
- **AC**: Clear search button

**⏳ US-021**: As a user, I want to filter transactions so I can view specific subsets.
- **AC**: Filter by category, transaction type (income/expense), date range
- **AC**: Multiple filters can be applied simultaneously
- **AC**: Active filters displayed as chips below search
- **AC**: Clear all filters button

**⏳ US-022**: As a user, I want to sort transactions so I can organize them by preference.
- **AC**: Sort by date, amount, category, description
- **AC**: Ascending/descending toggle
- **AC**: Default sort: newest first

**⏳ US-023**: As a user, I want the transaction form to remember my recent categories so I can enter data faster.
- **AC**: Auto-categorization based on description patterns
- **AC**: Predictive text for transaction names
- **AC**: Recently used categories appear first in dropdown

**⏳ US-024**: As a user, I want to use keyboard shortcuts so I can work more efficiently.
- **AC**: ESC key closes modals
- **AC**: Enter key submits forms
- **AC**: Tab navigation follows logical order

**⏳ US-025**: As a user, I want to perform calculations in the amount field so I can split expenses.
- **AC**: Support basic math operations (20+15, 100-25)
- **AC**: Evaluate expression on blur or enter
- **AC**: Show calculated result in field

**⏳ US-026**: As a user, I want visual feedback when I add transactions so I know they were saved.
- **AC**: Success toast notification
- **AC**: Optimistic UI updates
- **AC**: Loading states during save operations

**⏳ US-027**: As a user, I want to select multiple transactions so I can perform bulk operations.
- **AC**: Checkbox column (appears on hover for clean UI)
- **AC**: Select all/none functionality
- **AC**: Bulk action bar appears at top when items selected

**⏳ US-028**: As a user, I want to bulk delete transactions so I can clean up multiple entries at once.
- **AC**: Delete button in bulk action bar
- **AC**: Confirmation dialog with count of items
- **AC**: Soft delete all selected transactions

**⏳ US-029**: As a user, I want to bulk categorize transactions so I can organize multiple entries.
- **AC**: Change category button in bulk action bar
- **AC**: Category selection dropdown
- **AC**: Apply to all selected transactions

**⏳ US-030**: As a user, I want income and expenses to have different visual treatments so I can distinguish them easily.
- **AC**: Income amounts in green, expenses in red
- **AC**: Different colored category chips
- **AC**: Income/expense badges in table

**⏳ US-031**: As a user, I want to see transaction amounts properly formatted so they're easy to read.
- **AC**: Korean Won symbol (₩) prefix
- **AC**: Thousand separators (1,000,000)
- **AC**: No decimal places (whole numbers only)
- **AC**: Right-aligned in table for consistency

**⏳ US-032**: As a user, I want to add recurring transactions so I can automate regular expenses.
- **AC**: Recurring transaction setup (daily/weekly/monthly/yearly)
- **AC**: Auto-create entries on scheduled dates
- **AC**: Recurring badge indicator in transaction table
- **AC**: Edit individual occurrences with confirmation

**⏳ US-033**: As a user, I want to modify future recurring transactions so I can update regular expenses.
- **AC**: Edit recurring series or single instance option
- **AC**: Confirmation dialog for scope of changes
- **AC**: Clear indication of recurring vs one-time transactions

**⏳ US-034**: As a user, I want empty states to be encouraging so I'm motivated to start tracking.
- **AC**: "Start tracking your finances!" message for empty months
- **AC**: Clear call-to-action to add first transaction
- **AC**: Helpful tips for new users

**⏳ US-035**: As a user, I want error handling for failed operations so I understand what went wrong.
- **AC**: Inline error messages in forms
- **AC**: Network error handling with retry options
- **AC**: Clear error descriptions, not technical jargon

**⏳ US-036**: As a user, I want to save form data if I accidentally close a modal so I don't lose my work.
- **AC**: Not implemented (per requirement - no auto-save)
- **AC**: Clear warning if form has unsaved changes

**⏳ US-037**: As a user, I want my recent searches to be remembered so I can repeat common queries.
- **AC**: Persist recent searches in localStorage
- **AC**: Dropdown with recent searches on focus
- **AC**: Clear recent searches option

**⏳ US-038**: As a user, I want the transaction form to validate my input so I catch errors early.
- **AC**: Required field validation
- **AC**: Amount must be positive number
- **AC**: Date cannot be in future
- **AC**: Real-time validation with error messages

**⏳ US-039**: As a user, I want duplicate transaction warnings so I don't accidentally create duplicates.
- **AC**: Not implemented (per requirement - no duplicate warnings)

**⏳ US-040**: As a user, I want to see loading states so I know when operations are in progress.
- **AC**: Skeleton screens for table loading
- **AC**: Button loading states during operations
- **AC**: Form field loading during save

### Categories (US-041 to US-055)

**⏳ US-041**: As a user, I want predefined expense categories so I can quickly categorize my spending.
- **AC**: Default categories: Food, Transportation, Housing, Entertainment, Healthcare, Shopping, Utilities, Other
- **AC**: Each category has distinct color
- **AC**: Category selection via dropdown or chips

**⏳ US-042**: As a user, I want predefined income categories so I can organize my earnings.
- **AC**: Default categories: Salary, Freelance, Investment, Gift, Other
- **AC**: Separate from expense categories
- **AC**: Different color scheme for income categories

**⏳ US-043**: As a user, I want to create custom categories so I can track spending specific to my needs.
- **AC**: "Add new category" option in category dropdown
- **AC**: Custom category name input
- **AC**: Color picker for category visual
- **AC**: Save to user profile

**⏳ US-044**: As a user, I want to edit existing custom categories so I can refine my organization system.
- **AC**: Edit option for custom categories only
- **AC**: Cannot edit system default categories
- **AC**: Update all existing transactions with changed category

**⏳ US-045**: As a user, I want to delete unused custom categories so I can keep my list clean.
- **AC**: Delete option for custom categories only
- **AC**: Confirmation if category has transactions
- **AC**: Reassign transactions to "Other" before deletion

**⏳ US-046**: As a user, I want categories to be visually distinct so I can quickly identify transaction types.
- **AC**: Colored chips with category text
- **AC**: Consistent color usage across components
- **AC**: High contrast colors for accessibility

**⏳ US-047**: As a user, I want to see category usage statistics so I understand my spending patterns.
- **AC**: Category breakdown in analytics section
- **AC**: Pie chart showing category proportions
- **AC**: Total and average amounts per category

**⏳ US-048**: As a user, I want categories to be searchable so I can find them quickly in long lists.
- **AC**: Search functionality in category dropdown
- **AC**: Fuzzy search matching
- **AC**: Recently used categories appear first

**⏳ US-049**: As a user, I want category-specific insights so I can understand spending in each area.
- **AC**: Trend arrows showing category spending changes
- **AC**: Category spending vs previous period
- **AC**: Unusual spending alerts per category

**⏳ US-050**: As a user, I want to reorder categories so I can prioritize frequently used ones.
- **AC**: Not implemented initially
- **AC**: Future enhancement for custom ordering

**⏳ US-051**: As a user, I want category icons so I can visually identify them faster.
- **AC**: Not implemented initially
- **AC**: Future enhancement for category icons

**⏳ US-052**: As a user, I want subcategories so I can organize expenses more granularly.
- **AC**: Not implemented initially
- **AC**: Future enhancement for hierarchical categories

**⏳ US-053**: As a user, I want category budgets so I can set spending limits per area.
- **AC**: Implemented as part of goal system
- **AC**: Independent category-specific goals
- **AC**: Visual progress indicators per category

**⏳ US-054**: As a user, I want to merge categories so I can consolidate similar ones.
- **AC**: Not implemented initially
- **AC**: Future enhancement for category management

**⏳ US-055**: As a user, I want category analytics to show seasonal patterns so I can plan better.
- **AC**: Part of advanced analytics
- **AC**: Category spending over time visualization
- **AC**: Month-over-month comparison per category

### Goals (US-056 to US-075)

**⏳ US-056**: As a user, I want to set overall expense goals so I can control my spending.
- **AC**: Goal configuration modal
- **AC**: Goal amount input with Korean Won formatting
- **AC**: Time period selection (daily/weekly/monthly/yearly)
- **AC**: Save goal to user profile

**⏳ US-057**: As a user, I want to set category-specific goals so I can manage spending in different areas.
- **AC**: Independent goals per category
- **AC**: Category selection dropdown in goal form
- **AC**: Multiple active goals simultaneously
- **AC**: Goals don't roll up to overall goal

**⏳ US-058**: As a user, I want to see my goal progress so I know how I'm tracking.
- **AC**: Circular progress indicator in dashboard card
- **AC**: Ring progress around goal amount
- **AC**: Percentage complete display
- **AC**: Visual indicator of remaining budget

**⏳ US-059**: As a user, I want warnings when approaching my goal so I can adjust spending.
- **AC**: Warning icon when >80% of goal reached
- **AC**: Color change in progress indicator
- **AC**: Visual feedback in goal card

**⏳ US-060**: As a user, I want to see when I exceed my goals so I'm aware of overspending.
- **AC**: "₩X over budget" message display
- **AC**: Red color treatment for exceeded goals
- **AC**: Warning icon in goal card
- **AC**: Progress indicator shows >100%

**⏳ US-061**: As a user, I want goal achievement celebrations so I feel motivated when staying on budget.
- **AC**: Confetti animation for staying under monthly goal
- **AC**: Achievement toast notification
- **AC**: Positive reinforcement messaging

**⏳ US-062**: As a user, I want my goals to automatically reset so I don't need to recreate them each period.
- **AC**: Auto-create new goal with same amount for next period
- **AC**: Seamless transition between goal periods
- **AC**: History of past goal performance

**⏳ US-063**: As a user, I want to edit my goals so I can adjust them based on changing circumstances.
- **AC**: Edit goal button in goal card
- **AC**: Modify goal amount and time period
- **AC**: Changes apply to current goal period only

**⏳ US-064**: As a user, I want to delete goals so I can remove ones I no longer need.
- **AC**: Delete goal option in goal settings
- **AC**: Confirmation dialog before deletion
- **AC**: Historical data preserved

**⏳ US-065**: As a user, I want to see goal history so I can track my budgeting progress over time.
- **AC**: Goal performance history view
- **AC**: Success/failure indicators per period
- **AC**: Trend analysis of goal adherence

**⏳ US-066**: As a user, I want spending velocity tracking so I can see my burn rate.
- **AC**: Daily burn rate vs goal calculation
- **AC**: "At this rate, you'll exceed goal by X date" projection
- **AC**: Spending pace indicator in insights section

**⏳ US-067**: As a user, I want goal suggestions so I can set realistic targets.
- **AC**: Not implemented (per requirement)
- **AC**: Future enhancement based on spending history

**⏳ US-068**: As a user, I want multiple goal types so I can track different financial objectives.
- **AC**: Expense goals (current implementation)
- **AC**: Future: savings goals, income goals
- **AC**: Goal type selection in creation form

**⏳ US-069**: As a user, I want goal notifications so I'm reminded of my progress.
- **AC**: Category goal exceeded warnings
- **AC**: Approaching overall goal alerts
- **AC**: Goal period ending reminders

**⏳ US-070**: As a user, I want to pause goals so I can temporarily stop tracking during special circumstances.
- **AC**: Not implemented initially
- **AC**: Future enhancement for goal management

**⏳ US-071**: As a user, I want goal comparisons so I can see performance across categories.
- **AC**: Goal progress comparison view
- **AC**: Side-by-side goal performance
- **AC**: Best/worst performing categories

**⏳ US-072**: As a user, I want goal templates so I can quickly create common goal types.
- **AC**: Not implemented (per requirement)
- **AC**: Future enhancement for goal templates

**⏳ US-073**: As a user, I want flexible goal periods so I can track custom timeframes.
- **AC**: User-configurable goal periods
- **AC**: Support for daily, weekly, monthly, yearly goals
- **AC**: Custom start dates for goal periods

**⏳ US-074**: As a user, I want goal rollover options so I can handle unused budget.
- **AC**: Not implemented initially
- **AC**: Future enhancement for budget rollover logic

**⏳ US-075**: As a user, I want shared goals so I can track household budgets.
- **AC**: Not implemented (single-user application)
- **AC**: Future enhancement for collaborative budgeting

### Analytics & Graphs (US-076 to US-100)

**⏳ US-076**: As a user, I want to see spending trends over time so I can understand my financial patterns.
- **AC**: Line chart showing spending over time
- **AC**: Configurable time periods (day/week/month/year)
- **AC**: Toggle between different chart types
- **AC**: Interactive hover tooltips with exact values

**⏳ US-077**: As a user, I want to see income vs expense comparisons so I can understand my cash flow.
- **AC**: Side-by-side comparison charts
- **AC**: Separate income and expense trend lines
- **AC**: Net income calculation and display
- **AC**: Both absolute values and percentages

**⏳ US-078**: As a user, I want period selectors so I can analyze different timeframes.
- **AC**: Global period selector affecting all components
- **AC**: Day, week, month, year options
- **AC**: Custom date range picker
- **AC**: Quick filters (This week, This month, This year)

**⏳ US-079**: As a user, I want category breakdowns so I can see where my money goes.
- **AC**: Pie chart showing category proportions
- **AC**: Category spending totals and percentages
- **AC**: Click to filter transactions by category
- **AC**: Color-coded category segments

**⏳ US-080**: As a user, I want comparison views so I can see how current period relates to previous ones.
- **AC**: This month vs last month side-by-side cards
- **AC**: Percentage change indicators
- **AC**: Trend arrows showing spending direction
- **AC**: Both absolute and relative comparisons

**⏳ US-081**: As a user, I want interactive charts so I can explore my data in detail.
- **AC**: Click chart points to drill down to transactions
- **AC**: Hover tooltips with detailed information
- **AC**: Zoom and pan functionality for detailed views
- **AC**: Chart controls for switching between views

**⏳ US-082**: As a user, I want spending heat maps so I can see daily patterns.
- **AC**: Calendar heat map with spending intensity colors
- **AC**: Click dates to filter table to that day
- **AC**: Color intensity based on absolute spending amount
- **AC**: Monthly view with clear date labels

**⏳ US-083**: As a user, I want totals and summaries so I can quickly understand my financial position.
- **AC**: Summary cards showing income, expenses, net, goal progress
- **AC**: Current month and year totals
- **AC**: Quick calculation of key metrics
- **AC**: Prominent display in dashboard header

**⏳ US-084**: As a user, I want chart type options so I can view data in my preferred format.
- **AC**: Toggle between line charts and bar charts
- **AC**: Different chart types for different data types
- **AC**: Consistent styling across chart types
- **AC**: Responsive chart sizing

**⏳ US-085**: As a user, I want mobile-optimized charts so I can analyze data on any device.
- **AC**: Overlay lines instead of side-by-side on mobile
- **AC**: Touch-friendly chart interactions
- **AC**: Responsive chart legends and labels
- **AC**: Swipe gestures for navigation

**⏳ US-086**: As a user, I want spending insights so I understand my financial behavior.
- **AC**: "Insights of the day" prominent display
- **AC**: Key findings about spending patterns
- **AC**: Dedicated insights section in dashboard
- **AC**: Updated after each transaction

**⏳ US-087**: As a user, I want weekend vs weekday analysis so I can see behavioral patterns.
- **AC**: Spending pattern analysis by day type
- **AC**: Weekend vs weekday spending comparison
- **AC**: Visual indicators of spending habits

**⏳ US-088**: As a user, I want trend indicators so I can see spending direction.
- **AC**: Up/down arrows for category changes
- **AC**: Trend analysis over time
- **AC**: Visual trend lines in summary cards

**⏳ US-089**: As a user, I want mini charts in summary cards so I can see quick trends.
- **AC**: Sparklines showing 7-day spending trends
- **AC**: Small charts in dashboard cards
- **AC**: Minimal but informative visualizations

**⏳ US-090**: As a user, I want data export functionality so I can use my data elsewhere.
- **AC**: Not implemented (per requirement)
- **AC**: Future enhancement for CSV/PDF export

**⏳ US-091**: As a user, I want chart customization so I can view data in my preferred style.
- **AC**: Not implemented initially
- **AC**: Future enhancement for chart appearance settings

**⏳ US-092**: As a user, I want historical trend analysis so I can see long-term patterns.
- **AC**: Multi-month/year trend visualization
- **AC**: Historical data access (all time)
- **AC**: Long-term pattern recognition

**⏳ US-093**: As a user, I want spending forecasting so I can plan ahead.
- **AC**: Not implemented initially
- **AC**: Future enhancement for predictive analytics

**⏳ US-094**: As a user, I want anomaly detection so I can identify unusual spending.
- **AC**: Not implemented (unusual spending alerts removed per requirement)
- **AC**: Future enhancement for spending anomalies

**⏳ US-095**: As a user, I want drill-down capabilities so I can explore data in detail.
- **AC**: Click chart elements to filter data
- **AC**: Navigate from charts to detailed transaction lists
- **AC**: Context preservation during drill-down

**⏳ US-096**: As a user, I want chart performance optimization so they load quickly with large datasets.
- **AC**: Virtual scrolling for large datasets (>500 transactions)
- **AC**: Lazy loading of historical data
- **AC**: Efficient chart rendering with Recharts

**⏳ US-097**: As a user, I want chart accessibility so I can use screen readers and keyboard navigation.
- **AC**: ARIA labels for chart elements
- **AC**: Keyboard navigation support
- **AC**: High contrast color schemes

**⏳ US-098**: As a user, I want chart legends so I understand what data is being displayed.
- **AC**: Clear chart legends and labels
- **AC**: Color-coded legend items
- **AC**: Responsive legend positioning

**⏳ US-099**: As a user, I want chart data filtering so I can focus on specific information.
- **AC**: Filter charts by category, type, date range
- **AC**: Multiple filter application
- **AC**: Filter state persistence

**⏳ US-100**: As a user, I want chart state persistence so my view preferences are remembered.
- **AC**: Remember chart type preferences
- **AC**: Persist time period selections
- **AC**: Save filter states across sessions

### UI/UX (US-101 to US-125)

**⏳ US-101**: As a user, I want a responsive design so I can use the app on any device.
- **AC**: Desktop-first design (>1024px)
- **AC**: Tablet optimization (768-1024px) - closer to desktop layout
- **AC**: Mobile optimization (<768px) - simplified card views
- **AC**: Touch-friendly interactions on mobile/tablet

**⏳ US-102**: As a user, I want a dark theme so I can use the app comfortably in low-light conditions.
- **AC**: Dark theme as default
- **AC**: ShadCN design system colors
- **AC**: Consistent color usage across components
- **AC**: High contrast for accessibility

**⏳ US-103**: As a user, I want intuitive navigation so I can find features quickly.
- **AC**: Single-page application with clear sections
- **AC**: Sticky header with key actions
- **AC**: Hamburger menu for mobile navigation
- **AC**: Clear visual hierarchy

**⏳ US-104**: As a user, I want loading states so I know when the app is working.
- **AC**: Skeleton screens for table loading
- **AC**: Button loading spinners during operations
- **AC**: Page-level loading for initial data fetch
- **AC**: Smooth loading transitions

**⏳ US-105**: As a user, I want error states so I understand when something goes wrong.
- **AC**: Clear error messages with icons
- **AC**: Inline form validation errors
- **AC**: Network error handling with retry options
- **AC**: Graceful degradation for failed operations

**⏳ US-106**: As a user, I want toast notifications so I get feedback on my actions.
- **AC**: Success toasts for completed actions
- **AC**: Error toasts for failed operations
- **AC**: 5-second auto-dismiss timer
- **AC**: Manual dismiss option

**⏳ US-107**: As a user, I want modal dialogs so I can perform focused actions.
- **AC**: Modal popup for transaction forms
- **AC**: Confirmation dialogs for destructive actions
- **AC**: ESC key to close modals
- **AC**: Focus management for accessibility

**⏳ US-108**: As a user, I want consistent styling so the app feels cohesive.
- **AC**: ShadCN component library usage
- **AC**: Tailwind CSS utility classes
- **AC**: Consistent spacing and typography
- **AC**: Design system adherence

**⏳ US-109**: As a user, I want visual feedback so I know my interactions are registered.
- **AC**: Button hover and active states
- **AC**: Form field focus indicators
- **AC**: Click feedback for interactive elements
- **AC**: Visual confirmation of selections

**⏳ US-110**: As a user, I want optimistic updates so the app feels responsive.
- **AC**: Immediate UI updates before server confirmation
- **AC**: Rollback on server error
- **AC**: Loading states during background operations
- **AC**: Smooth transitions between states

**⏳ US-111**: As a user, I want keyboard accessibility so I can navigate without a mouse.
- **AC**: Tab navigation through interactive elements
- **AC**: ESC to close modals, Enter to submit forms
- **AC**: Logical tab order following visual hierarchy
- **AC**: Skip links for screen readers

**⏳ US-112**: As a user, I want proper spacing and layout so the interface is comfortable to use.
- **AC**: Compact table spacing for desktop
- **AC**: Generous touch targets for mobile
- **AC**: Consistent padding and margins
- **AC**: Responsive typography scaling

**⏳ US-113**: As a user, I want clear visual hierarchy so I can understand the interface quickly.
- **AC**: Header with key actions prominent
- **AC**: Summary cards at top of dashboard
- **AC**: Graphs in middle section
- **AC**: Transaction table at bottom

**⏳ US-114**: As a user, I want smooth animations so the interface feels polished.
- **AC**: Page transitions and loading animations
- **AC**: Modal slide-in/out animations
- **AC**: Hover and focus transitions
- **AC**: Confetti celebration animations

**⏳ US-115**: As a user, I want form validation so I catch errors before submitting.
- **AC**: Real-time validation on form fields
- **AC**: Required field indicators
- **AC**: Format validation for amounts and dates
- **AC**: Clear error messaging

**⏳ US-116**: As a user, I want empty states so I understand what to do when there's no data.
- **AC**: Encouraging messages for empty months
- **AC**: Clear call-to-action buttons
- **AC**: Helpful tips for new users
- **AC**: Illustration or icon support

**⏳ US-117**: As a user, I want consistent button styles so I understand their hierarchy.
- **AC**: Primary buttons for main actions
- **AC**: Secondary buttons for alternative actions
- **AC**: Destructive button styling for delete actions
- **AC**: Icon buttons for compact actions

**⏳ US-118**: As a user, I want proper color contrast so I can read all text clearly.
- **AC**: WCAG AA compliance for text contrast
- **AC**: High contrast color pairs
- **AC**: Clear distinction between active/inactive states
- **AC**: Color not the only indicator of meaning

**⏳ US-119**: As a user, I want mobile-specific interactions so touch navigation feels natural.
- **AC**: Hamburger menu for mobile navigation
- **AC**: Swipe gestures for calendar navigation
- **AC**: Touch-friendly dropdown menus
- **AC**: Number pad mode for amount entry on mobile/tablet

**⏳ US-120**: As a user, I want focus management so keyboard navigation flows logically.
- **AC**: Focus trapping in modals
- **AC**: Focus restoration after modal close
- **AC**: Visible focus indicators
- **AC**: Logical tab order throughout app

**⏳ US-121**: As a user, I want consistent iconography so I can quickly identify actions.
- **AC**: Icon library consistency
- **AC**: Icons with text labels for clarity
- **AC**: Consistent icon sizing
- **AC**: Icons that match the dark theme

**⏳ US-122**: As a user, I want proper typography so content is easy to read.
- **AC**: Font size hierarchy for different content types
- **AC**: Readable line spacing
- **AC**: Appropriate font weights
- **AC**: Responsive text sizing

**⏳ US-123**: As a user, I want visual grouping so related content is clearly organized.
- **AC**: Card-based layout for related content
- **AC**: Clear section divisions
- **AC**: Consistent spacing between groups
- **AC**: Visual relationship indicators

**⏳ US-124**: As a user, I want form UX best practices so data entry is efficient.
- **AC**: Two-column forms on desktop, single-column on mobile/tablet
- **AC**: Auto-focus on form open
- **AC**: Tab navigation through form fields
- **AC**: Submit on Enter key press

**⏳ US-125**: As a user, I want progressive disclosure so the interface doesn't feel overwhelming.
- **AC**: Collapsed filters by default
- **AC**: Expandable sections for detailed options
- **AC**: Show more/less toggles for long content
- **AC**: Contextual help when needed

### Data Management (US-126 to US-145)

**⏳ US-126**: As a user, I want my data to be securely stored so my financial information is protected.
- **AC**: Supabase with Row Level Security (RLS) policies
- **AC**: Encrypted data transmission (HTTPS)
- **AC**: User data isolation
- **AC**: Secure authentication tokens

**⏳ US-127**: As a user, I want soft deletes so I can recover accidentally deleted transactions.
- **AC**: Mark transactions as deleted instead of removing
- **AC**: Deleted transactions excluded from all queries
- **AC**: Admin recovery option (future feature)
- **AC**: Permanent deletion after retention period

**⏳ US-128**: As a user, I want efficient data loading so the app performs well.
- **AC**: Load current month data by default
- **AC**: Lazy load historical data on demand
- **AC**: Efficient pagination for large datasets
- **AC**: Virtual scrolling for 500+ transactions

**⏳ US-129**: As a user, I want data caching so frequently accessed information loads quickly.
- **AC**: Category lists cached in localStorage
- **AC**: User preferences persisted between sessions
- **AC**: Transaction data cached in sessionStorage
- **AC**: Cache invalidation on data changes

**⏳ US-130**: As a user, I want search optimization so I can find transactions quickly.
- **AC**: Debounced search (500ms delay)
- **AC**: Indexed database searches
- **AC**: Recent searches cached
- **AC**: Full-text search on descriptions

**⏳ US-131**: As a user, I want data validation so I can't enter invalid information.
- **AC**: Positive numbers only for amounts
- **AC**: Required field validation
- **AC**: Date format validation
- **AC**: Category selection validation

**⏳ US-132**: As a user, I want audit trails so I can track changes to my data.
- **AC**: Created timestamp for all transactions
- **AC**: Updated timestamp for modifications
- **AC**: User ID association for all data
- **AC**: No detailed audit log (simplified approach)

**⏳ US-133**: As a user, I want data consistency so my information is always accurate.
- **AC**: Database constraints on required fields
- **AC**: Referential integrity for categories
- **AC**: Transaction amounts stored as integers (smallest unit)
- **AC**: Timezone handling (KST) for all dates

**⏳ US-134**: As a user, I want backup and recovery so I don't lose my financial data.
- **AC**: Supabase automatic backups
- **AC**: Point-in-time recovery capability
- **AC**: User data export (future feature)
- **AC**: Data redundancy and replication

**⏳ US-135**: As a user, I want data migration support so I can upgrade the app safely.
- **AC**: Database schema versioning
- **AC**: Migration scripts for updates
- **AC**: Backward compatibility maintenance
- **AC**: Safe rollback procedures

**⏳ US-136**: As a user, I want performance monitoring so the app stays responsive.
- **AC**: Query performance optimization
- **AC**: Connection pooling for database access
- **AC**: Monitoring for slow operations
- **AC**: Resource usage optimization

**⏳ US-137**: As a user, I want data privacy controls so I control my information.
- **AC**: Account deletion option (future)
- **AC**: Data portability (future)
- **AC**: Privacy settings management
- **AC**: Data retention policies

**⏳ US-138**: As a user, I want concurrent access handling so multiple sessions work correctly.
- **AC**: Optimistic locking for updates
- **AC**: Conflict resolution strategies
- **AC**: Session management
- **AC**: Data synchronization

**⏳ US-139**: As a user, I want data compression so storage is efficient.
- **AC**: Efficient data types (integers for amounts)
- **AC**: Normalized database structure
- **AC**: Compressed text fields where appropriate
- **AC**: Optimal indexing strategy

**⏳ US-140**: As a user, I want data archiving so old information doesn't slow down the app.
- **AC**: Not implemented initially
- **AC**: Future enhancement for data archiving
- **AC**: Historical data access preservation
- **AC**: Performance optimization for large datasets

**⏳ US-141**: As a user, I want data synchronization so changes are reflected immediately.
- **AC**: Optimistic updates for immediate feedback
- **AC**: Background synchronization
- **AC**: Conflict resolution for concurrent changes
- **AC**: Connection status indicators

**⏳ US-142**: As a user, I want data integrity checks so my information stays accurate.
- **AC**: Database constraints and validations
- **AC**: Regular integrity verification
- **AC**: Automatic error correction where possible
- **AC**: Data consistency monitoring

**⏳ US-143**: As a user, I want bulk data operations so I can manage large datasets efficiently.
- **AC**: Bulk delete for selected transactions
- **AC**: Bulk category updates
- **AC**: Batch processing for performance
- **AC**: Progress indicators for long operations

**⏳ US-144**: As a user, I want data format standardization so information is consistent.
- **AC**: Standardized date formats (YYYY-MM-DD)
- **AC**: Consistent currency formatting (₩1,000,000)
- **AC**: Normalized text fields
- **AC**: Consistent data types throughout

**⏳ US-145**: As a user, I want error recovery so data problems can be resolved.
- **AC**: Graceful error handling
- **AC**: Automatic retry for transient failures
- **AC**: Error logging for diagnosis
- **AC**: User-friendly error messages

### Performance (US-146 to US-160)

**⏳ US-146**: As a user, I want fast page loads so I can start working immediately.
- **AC**: Initial page load under 2 seconds
- **AC**: Lazy loading for non-critical components
- **AC**: Optimized bundle size
- **AC**: Critical CSS inlining

**⏳ US-147**: As a user, I want smooth interactions so the app feels responsive.
- **AC**: UI interactions respond within 100ms
- **AC**: Optimistic updates for immediate feedback
- **AC**: Smooth animations and transitions
- **AC**: No blocking operations on UI thread

**⏳ US-148**: As a user, I want efficient memory usage so the app doesn't slow down my device.
- **AC**: Virtual scrolling for large lists
- **AC**: Component unmounting for unused views
- **AC**: Memory leak prevention
- **AC**: Efficient state management with Zustand

**⏳ US-149**: As a user, I want optimized database queries so data loads quickly.
- **AC**: Indexed database columns for common queries
- **AC**: Query optimization for complex operations
- **AC**: Pagination for large result sets
- **AC**: Connection pooling and reuse

**⏳ US-150**: As a user, I want cached data so frequently accessed information is instant.
- **AC**: Browser caching for static assets
- **AC**: Application-level caching for user data
- **AC**: Cache invalidation strategies
- **AC**: Offline-capable data access

**⏳ US-151**: As a user, I want progressive loading so I can start working while data loads.
- **AC**: Skeleton screens during loading
- **AC**: Progressive data loading (most recent first)
- **AC**: Background loading for non-critical data
- **AC**: Loading state management

**⏳ US-152**: As a user, I want optimized images so pages load quickly.
- **AC**: Image optimization and compression
- **AC**: Responsive image sizing
- **AC**: Lazy loading for non-critical images
- **AC**: Modern image formats (WebP/AVIF)

**⏳ US-153**: As a user, I want efficient bundling so the app downloads quickly.
- **AC**: Code splitting for route-based chunks
- **AC**: Dynamic imports for large dependencies
- **AC**: Tree shaking for unused code elimination
- **AC**: Bundle size monitoring and optimization

**⏳ US-154**: As a user, I want CDN delivery so the app loads quickly worldwide.
- **AC**: Vercel Edge Network deployment
- **AC**: Static asset CDN distribution
- **AC**: Geographic content delivery
- **AC**: Edge caching strategies

**⏳ US-155**: As a user, I want performance monitoring so issues can be detected early.
- **AC**: Core Web Vitals monitoring
- **AC**: Real user performance metrics
- **AC**: Performance regression detection
- **AC**: Automated performance testing

**⏳ US-156**: As a user, I want efficient re-renders so the UI stays smooth.
- **AC**: React optimization patterns (memo, useMemo, useCallback)
- **AC**: Efficient component architecture
- **AC**: Minimal unnecessary re-renders
- **AC**: State update optimization

**⏳ US-157**: As a user, I want background processing so the UI doesn't freeze.
- **AC**: Web Workers for heavy computations
- **AC**: Non-blocking operations
- **AC**: Background data synchronization
- **AC**: Async operation handling

**⏳ US-158**: As a user, I want efficient search so results appear instantly.
- **AC**: Debounced search input (500ms)
- **AC**: Optimized search algorithms
- **AC**: Indexed search fields
- **AC**: Search result caching

**⏳ US-159**: As a user, I want predictable performance so the app always feels fast.
- **AC**: Performance budgets and monitoring
- **AC**: Consistent response times
- **AC**: Graceful performance degradation
- **AC**: Resource usage optimization

**⏳ US-160**: As a user, I want scalable performance so the app works well with years of data.
- **AC**: Efficient pagination strategies
- **AC**: Data archiving for old records
- **AC**: Query optimization for large datasets
- **AC**: Performance testing with realistic data volumes

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with ShadCN components
- **State Management**: Zustand for client-side state
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts (React 19 compatible charting)
- **Date Handling**: date-fns for date manipulation
- **Testing**: Jest for unit/integration, Playwright for E2E/visual

### Backend Stack
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **API**: Supabase REST API with Row Level Security
- **Real-time**: Not implemented initially
- **Storage**: Not required for MVP

### Development Tools
- **Version Control**: Git with GitHub
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel
- **MCP Servers**: GitHub, Vercel, Supabase, ShadCN, Playwright
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks

### Database Schema

#### Users Table (handled by Supabase Auth)
- `id`: UUID (primary key)
- `email`: String (unique)
- `created_at`: Timestamp
- `updated_at`: Timestamp

#### Categories Table
```sql
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  color VARCHAR(7) NOT NULL, -- hex color code
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

#### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL CHECK (amount > 0), -- amount in smallest currency unit (won)
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description VARCHAR(500),
  transaction_date DATE NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  recurring_pattern JSONB, -- for recurring transactions
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

#### Goals Table
```sql
CREATE TABLE goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE, -- NULL for overall goals
  amount INTEGER NOT NULL CHECK (amount > 0),
  period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly', 'yearly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Performance Considerations
- **Virtual Scrolling**: Implement for >500 transactions
- **Lazy Loading**: Historical data loaded on demand
- **Caching Strategy**: localStorage for categories, sessionStorage for transaction data
- **Debouncing**: 500ms for search inputs
- **Optimistic Updates**: Immediate UI updates with background sync
- **Code Splitting**: Route-based chunking for optimal loading

### Security Measures
- **Row Level Security**: Supabase RLS policies for data isolation
- **Authentication**: Supabase Auth with JWT tokens
- **HTTPS**: All communications encrypted
- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Parameterized queries only

### Testing Strategy

#### Unit Testing (Jest)
- Component functionality testing
- Utility function testing
- State management testing
- Form validation testing
- Data transformation testing

#### Integration Testing (Jest + Testing Library)
- Component integration testing
- API integration testing
- Database interaction testing
- Authentication flow testing

#### E2E Testing (Playwright)
- Critical user journeys
- Cross-browser compatibility
- Mobile responsiveness
- Authentication flows
- Transaction management flows
- Goal setting and tracking

#### Visual Regression Testing (Playwright)
- Screenshot comparison across breakpoints
- Theme consistency testing
- Component appearance verification
- Layout integrity checking
- Responsive design validation

## Implementation Phases

### Phase 1: Core Foundation
**Duration**: 2-3 weeks

**Features**:
- Project setup and configuration
- Authentication system
- Basic transaction management
- Core UI components
- Database schema implementation
- Basic responsive design

**Deliverables**:
- Working authentication
- Add/edit/delete transactions
- Basic transaction table
- Mobile-responsive layout

### Phase 2: Goals and Analytics
**Duration**: 2-3 weeks

**Features**:
- Goal setting and tracking
- Basic charts and analytics
- Category management
- Search and filtering
- Progress indicators

**Deliverables**:
- Functional goal system
- Interactive charts
- Category breakdown
- Performance optimization

### Phase 3: Advanced Features
**Duration**: 2-3 weeks

**Features**:
- Recurring transactions
- Bulk operations
- Advanced analytics
- Heat map calendar
- Insights and trends
- Visual regression testing

**Deliverables**:
- Complete feature set
- Full test coverage
- Performance optimization
- Production deployment

## Success Metrics

### User Experience
- Page load time < 2 seconds
- Interaction response < 100ms
- Mobile usability score > 90%
- Zero accessibility violations

### Functionality
- 100% feature completion per user stories
- 90%+ test coverage
- Zero critical bugs in production
- Cross-browser compatibility

### Performance
- Core Web Vitals in "Good" range
- Bundle size < 500KB gzipped
- Database query time < 200ms
- 99.9% uptime

## Implementation Checklist

### Phase 1: Core Foundation
- [ ] Authentication (US-001 to US-010)
- [ ] Basic Transaction Management (US-011 to US-025)
- [ ] Core UI Components (US-101 to US-110)
- [ ] Data Management Foundation (US-126 to US-135)
- [ ] Performance Setup (US-146 to US-150)

### Phase 2: Goals & Analytics
- [ ] Goal System (US-056 to US-070)
- [ ] Basic Charts & Analytics (US-076 to US-085)
- [ ] Category Management (US-041 to US-050)
- [ ] Advanced Transaction Features (US-026 to US-040)
- [ ] Enhanced UI/UX (US-111 to US-120)

### Phase 3: Advanced Features
- [ ] Recurring Transactions (US-032, US-033)
- [ ] Bulk Operations (US-027 to US-029)
- [ ] Advanced Analytics (US-086 to US-100)
- [ ] Category Advanced Features (US-051 to US-055)
- [ ] Goal Advanced Features (US-071 to US-075)
- [ ] Final UI Polish (US-121 to US-125)
- [ ] Data Management Advanced (US-136 to US-145)
- [ ] Performance Optimization (US-151 to US-160)

### Testing Milestones
- [ ] Unit Test Coverage >90%
- [ ] Integration Tests for Core Features
- [ ] E2E Tests for Critical User Journeys
- [ ] Visual Regression Tests Across Breakpoints
- [ ] Performance Tests with Realistic Data

## Conclusion

This PRD provides a comprehensive roadmap for building a modern, responsive expense tracking application. The indexed user stories provide clear development targets, while the technical architecture ensures scalability and maintainability.

The focus on Test-Driven Development, visual regression testing, and performance optimization will ensure a high-quality product that meets user needs effectively.

Next steps involve setting up the development environment, configuring the database schema, and beginning implementation following the TDD approach outlined in the testing strategy.