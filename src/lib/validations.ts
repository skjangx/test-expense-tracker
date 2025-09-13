import { z } from 'zod'

// Authentication schemas
export const signupSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
})

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
})

// Transaction schemas
export const transactionSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than 0')
    .int('Amount must be a whole number')
    .max(99_999_999, 'Amount cannot exceed ₩99,999,999'),
  type: z.enum(['income', 'expense'], {
    message: 'Please select income or expense',
  }),
  category_id: z.string().min(1, 'Please select a category'),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  transaction_date: z.string().min(1, 'Please select a date'),
})

export const transactionFormSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(
      (val) => {
        // Allow basic math operations
        const mathResult = evaluateMathExpression(val)
        return mathResult !== null && mathResult > 0
      },
      { message: 'Please enter a valid positive amount' }
    ),
  type: z.enum(['income', 'expense']),
  category_id: z.string().min(1, 'Please select a category'),
  description: z.string().max(500, 'Description cannot exceed 500 characters'),
  transaction_date: z.string().min(1, 'Please select a date'),
})

// Goal schemas
export const goalSchema = z.object({
  amount: z
    .number()
    .positive('Goal amount must be greater than 0')
    .int('Goal amount must be a whole number')
    .max(99_999_999, 'Goal amount cannot exceed ₩99,999,999'),
  period_type: z.enum(['daily', 'weekly', 'monthly', 'yearly'], {
    message: 'Please select a goal period',
  }),
  category_id: z.string().optional(), // null for overall goals
  period_start: z.string().min(1, 'Please select a start date'),
  period_end: z.string().min(1, 'Please select an end date'),
})

// Category schemas
export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name cannot exceed 100 characters'),
  type: z.enum(['income', 'expense']),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, 'Please select a valid color'),
})

// Type exports for form data
export type SignupFormData = z.infer<typeof signupSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type TransactionFormData = z.infer<typeof transactionFormSchema>
export type TransactionData = z.infer<typeof transactionSchema>
export type GoalFormData = z.infer<typeof goalSchema>
export type CategoryFormData = z.infer<typeof categorySchema>

// Utility function for evaluating basic math expressions
function evaluateMathExpression(expression: string): number | null {
  try {
    // Clean the expression and allow only numbers and basic operators
    const cleaned = expression.replace(/[^0-9+\-*/().\s]/g, '')
    
    // Simple validation to prevent complex expressions
    if (cleaned !== expression.replace(/\s/g, '')) {
      return null
    }
    
    // Use Function constructor for safe evaluation (better than eval)
    const result = new Function(`"use strict"; return (${cleaned})`)()
    
    return typeof result === 'number' && isFinite(result) ? result : null
  } catch {
    return null
  }
}