import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Header } from './Header'
import { useAuth } from '@/hooks/useAuth'

// Mock the useAuth hook
jest.mock('@/hooks/useAuth')
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockAuthSuccess = {
    user: { id: '1', email: 'test@example.com', created_at: '', updated_at: '' },
    session: {} as NonNullable<ReturnType<typeof useAuth>['session']>,
    loading: false,
    error: null,
    isAuthenticated: true,
    signup: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    clearError: jest.fn(),
  }

  describe('when user is authenticated', () => {
    test('should display app title', () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<Header />)
      
      expect(screen.getByText('Expense Tracker')).toBeInTheDocument()
    })

    test('should display user email', () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<Header />)
      
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })

    test('should display sign out button', () => {
      mockUseAuth.mockReturnValue(mockAuthSuccess)
      
      render(<Header />)
      
      expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
    })

    test('should show confirmation dialog and call logout when confirmed', async () => {
      const mockLogout = jest.fn().mockResolvedValue(undefined)
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        logout: mockLogout,
      })
      
      render(<Header />)
      
      // Click the sign out button to open dialog
      fireEvent.click(screen.getByRole('button', { name: /sign out/i }))
      
      // Should show confirmation dialog
      expect(screen.getByText('Sign out of your account?')).toBeInTheDocument()
      expect(screen.getByText('You will need to sign in again to access your expense data.')).toBeInTheDocument()
      
      // Click confirm button in dialog
      fireEvent.click(screen.getByRole('button', { name: 'Sign out' }))
      
      await waitFor(() => {
        expect(mockLogout).toHaveBeenCalled()
      })
    })

    test('should not call logout when dialog is cancelled', async () => {
      const mockLogout = jest.fn().mockResolvedValue(undefined)
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        logout: mockLogout,
      })
      
      render(<Header />)
      
      // Click the sign out button to open dialog
      fireEvent.click(screen.getByRole('button', { name: /sign out/i }))
      
      // Click cancel button in dialog
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      
      // Logout should not be called
      expect(mockLogout).not.toHaveBeenCalled()
    })

    test('should show loading state during logout', () => {
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        loading: true,
      })
      
      render(<Header />)
      
      // Button should be disabled and show loading text
      const signOutButton = screen.getByRole('button', { name: /signing out/i })
      expect(signOutButton).toBeDisabled()
    })
  })

  describe('when user is not authenticated', () => {
    test('should not render anything', () => {
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        user: null,
        session: null,
        isAuthenticated: false,
      })
      
      const { container } = render(<Header />)
      
      expect(container.firstChild).toBeNull()
    })
  })

  describe('when authentication is loading', () => {
    test('should not render anything', () => {
      mockUseAuth.mockReturnValue({
        ...mockAuthSuccess,
        user: null,
        session: null,
        loading: true,
        isAuthenticated: false,
      })
      
      const { container } = render(<Header />)
      
      expect(container.firstChild).toBeNull()
    })
  })
})