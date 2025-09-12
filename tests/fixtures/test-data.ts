// Shared test data for consistent testing across all test suites

export const TEST_USER = {
  email: 'test@expense-tracker.com',
  password: 'TestPassword123!',
  id: 'test-user-uuid'
}

export const MOCK_TRANSACTIONS = [
  { 
    id: '1',
    amount: 12000, 
    description: "점심", 
    category: "Food", 
    type: "expense" as const,
    transaction_date: '2025-01-15',
    created_at: new Date().toISOString()
  },
  { 
    id: '2',
    amount: 50000, 
    description: "마트 장보기", 
    category: "Shopping", 
    type: "expense" as const,
    transaction_date: '2025-01-14',
    created_at: new Date().toISOString()
  },
  { 
    id: '3',
    amount: 3500, 
    description: "지하철", 
    category: "Transportation", 
    type: "expense" as const,
    transaction_date: '2025-01-13',
    created_at: new Date().toISOString()
  }
]

export const MOCK_CATEGORIES = [
  { id: '1', name: 'Food', type: 'expense' as const, color: '#ef4444', is_default: true },
  { id: '2', name: 'Transportation', type: 'expense' as const, color: '#3b82f6', is_default: true },
  { id: '3', name: 'Shopping', type: 'expense' as const, color: '#8b5cf6', is_default: true },
  { id: '4', name: 'Salary', type: 'income' as const, color: '#10b981', is_default: true }
]

export const MOCK_GOALS = [
  {
    id: '1',
    amount: 500000,
    period_type: 'monthly' as const,
    period_start: '2025-01-01',
    period_end: '2025-01-31',
    category_id: null, // Overall goal
    is_active: true
  }
]