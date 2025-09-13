import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from './LoginForm'
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

describe('LoginForm', () => {
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

  describe('when user enters valid login data', () => {
    test('should display email, password fields, and remember me checkbox', () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<LoginForm />)
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    test('should call login with form data when submitted', async () => {
      const mockLogin = jest.fn().mockResolvedValue(undefined)
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        login: mockLogin,
      })
      
      render(<LoginForm />)
      
      // Fill out form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'TestPassword123!' },
      })
      fireEvent.click(screen.getByLabelText(/remember me/i))
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'TestPassword123!',
          rememberMe: true,
        })
      })
    })

    test('should call login without rememberMe when checkbox unchecked', async () => {
      const mockLogin = jest.fn().mockResolvedValue(undefined)
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        login: mockLogin,
      })
      
      render(<LoginForm />)
      
      // Fill out form without checking remember me
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'TestPassword123!' },
      })
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'TestPassword123!',
          rememberMe: false,
        })
      })
    })

    test('should redirect to dashboard after successful login', async () => {
      const mockLogin = jest.fn().mockResolvedValue(undefined)
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        login: mockLogin,
        isAuthenticated: true,
        user: { id: '1', email: 'test@example.com', created_at: '', updated_at: '' },
        session: {} as NonNullable<ReturnType<typeof useAuth>['session']>,
      })
      
      render(<LoginForm />)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/')
      })
    })

    test('should show loading state during login', async () => {
      const mockLogin = jest.fn(() => new Promise(() => {})) // Never resolves
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        login: mockLogin,
        loading: true,
      })
      
      render(<LoginForm />)
      
      // Button should be disabled and show loading text when loading is true
      expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
    })
  })

  describe('when user enters invalid data', () => {
    test('should validate email format', async () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<LoginForm />)
      
      // Enter invalid email
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'invalid-email' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password' },
      })
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
      })
    })

    test('should require email and password fields', async () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<LoginForm />)
      
      // Submit form without filling fields
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument()
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()
      })
    })
  })

  describe('when login fails', () => {
    test('should display error message for invalid credentials', async () => {
      const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid login credentials'))
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        login: mockLogin,
        error: 'Invalid email or password',
      })
      
      render(<LoginForm />)
      
      // Fill out form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'wrongpassword' },
      })
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
      })
    })

    test('should clear error when user starts typing', async () => {
      const mockClearError = jest.fn()
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        error: 'Previous error',
        clearError: mockClearError,
      })
      
      render(<LoginForm />)
      
      // Start typing in email field
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@' },
      })
      
      expect(mockClearError).toHaveBeenCalled()
    })
  })

  test('should have link to signup page', () => {
    mockUseAuth.mockReturnValue(mockAuthSuccess)
    
    render(<LoginForm />)
    
    const signupLink = screen.getByRole('link', { name: /sign up/i })
    expect(signupLink).toHaveAttribute('href', '/signup')
  })

  test('should have forgot password link', () => {
    mockUseAuth.mockReturnValue(mockAuthSuccess)
    
    render(<LoginForm />)
    
    expect(screen.getByText(/forgot your password/i)).toBeInTheDocument()
  })
})