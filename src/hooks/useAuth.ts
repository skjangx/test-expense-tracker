import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { type SignupData, type LoginData } from '@/types/auth'

export function useAuth() {
  const {
    user,
    session,
    loading,
    error,
    signup,
    login,
    logout,
    initialize,
    clearError,
  } = useAuthStore()

  // Initialize auth on first render
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const init = async () => {
      cleanup = await initialize()
    }

    init()

    // Cleanup subscription on unmount
    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [initialize])

  const handleSignup = async (data: SignupData) => {
    try {
      await signup(data)
    } catch (error) {
      // Error is already handled in the store
      throw error
    }
  }

  const handleLogin = async (data: LoginData) => {
    try {
      await login(data)
    } catch (error) {
      // Error is already handled in the store
      throw error
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      // Error is already handled in the store
      throw error
    }
  }

  return {
    // State
    user,
    session,
    loading,
    error,
    isAuthenticated: !!user && !!session,
    
    // Actions
    signup: handleSignup,
    login: handleLogin,
    logout: handleLogout,
    clearError,
  }
}