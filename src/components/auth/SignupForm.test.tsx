import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SignupForm } from './SignupForm'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

// Mock the useAuth hook
jest.mock('@/hooks/useAuth')
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

// Mock router push function
const mockPush = jest.fn()

describe('SignupForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      refresh: jest.fn(),
    } as ReturnType<typeof useRouter>)
  })

  const mockAuthSuccess = {
    user: null,
    session: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    signup: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    clearError: jest.fn(),
  }

  describe('when user enters valid signup data', () => {
    test('should display email and password fields', () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<SignupForm />)
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })

    test('should call signup with form data when submitted', async () => {
      const mockSignup = jest.fn().mockResolvedValue(undefined)
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        signup: mockSignup,
      })
      
      render(<SignupForm />)
      
      // Fill out form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'TestPassword123!' },
      })
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
      
      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'TestPassword123!',
        })
      })
    })

    test('should redirect to dashboard after successful signup', async () => {
      const mockSignup = jest.fn().mockResolvedValue(undefined)
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        signup: mockSignup,
        isAuthenticated: true,
        user: { id: '1', email: 'test@example.com', created_at: '', updated_at: '' },
        session: {} as NonNullable<ReturnType<typeof useAuth>['session']>,
      })
      
      render(<SignupForm />)
      
      // Fill out form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'TestPassword123!' },
      })
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/')
      })
    })

    test('should show loading state during signup', async () => {
      const mockSignup = jest.fn(() => new Promise(() => {})) // Never resolves
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        signup: mockSignup,
        loading: true,
      })
      
      render(<SignupForm />)
      
      // Button should be disabled and show loading text when loading is true
      expect(screen.getByRole('button', { name: /signing up/i })).toBeDisabled()
    })
  })

  describe('when user enters invalid data', () => {
    test('should validate email format', async () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<SignupForm />)
      
      // Enter invalid email
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'invalid-email' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'TestPassword123!' },
      })
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
      })
    })

    test('should validate password requirements', async () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<SignupForm />)
      
      // Enter weak password
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'weak' },
      })
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
      })
    })

    test('should require email field', async () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<SignupForm />)
      
      // Submit form without email
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      })
    })
  })

  describe('when signup fails', () => {
    test('should display error message', async () => {
      const mockSignup = jest.fn().mockRejectedValue(new Error('Signup failed'))
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        signup: mockSignup,
        error: 'Signup failed',
      })
      
      render(<SignupForm />)
      
      // Fill out form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'TestPassword123!' },
      })
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/signup failed/i)).toBeInTheDocument()
      })
    })

    test('should clear error when user starts typing', async () => {
      const mockClearError = jest.fn()
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        error: 'Previous error',
        clearError: mockClearError,
      })
      
      render(<SignupForm />)
      
      // Start typing in email field
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@' },
      })
      
      expect(mockClearError).toHaveBeenCalled()
    })
  })

  test('should have link to login page', () => {
    mockUseAuth.mockReturnValue(mockAuthSuccess)
    
    render(<SignupForm />)
    
    const loginLink = screen.getByRole('link', { name: /sign in/i })
    expect(loginLink).toHaveAttribute('href', '/login')
  })
})