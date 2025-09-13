import { render, screen } from '@testing-library/react'
import { AuthGuard } from './AuthGuard'
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

describe('AuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      refresh: jest.fn(),
    } as ReturnType<typeof useRouter>)
  })

  const TestComponent = () => <div>Protected Content</div>

  describe('when user is authenticated', () => {
    test('should render children', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', email: 'test@example.com', created_at: '', updated_at: '' },
        session: {} as NonNullable<ReturnType<typeof useAuth>['session']>,
        loading: false,
        error: null,
        isAuthenticated: true,
        signup: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
      })

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      )

      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })

  describe('when user is not authenticated', () => {
    test('should redirect to login page', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        session: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        signup: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
      })

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      )

      expect(mockPush).toHaveBeenCalledWith('/login')
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })
  })

  describe('when authentication is loading', () => {
    test('should show loading skeleton', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        session: null,
        loading: true,
        error: null,
        isAuthenticated: false,
        signup: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
      })

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      )

      // Should show loading state, not redirect or show content
      expect(mockPush).not.toHaveBeenCalled()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
      
      // Should show some kind of loading indicator
      expect(screen.getByTestId('auth-loading')).toBeInTheDocument()
    })
  })

  describe('with custom redirect path', () => {
    test('should redirect to custom path when not authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        session: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        signup: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
      })

      render(
        <AuthGuard redirectTo="/custom-login">
          <TestComponent />
        </AuthGuard>
      )

      expect(mockPush).toHaveBeenCalledWith('/custom-login')
    })
  })

  describe('when authentication fails', () => {
    test('should still redirect to login on error', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        session: null,
        loading: false,
        error: 'Authentication failed',
        isAuthenticated: false,
        signup: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
      })

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      )

      expect(mockPush).toHaveBeenCalledWith('/login')
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })
  })
})