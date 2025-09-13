import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { transformUser, type AuthStore, type SignupData, type LoginData } from '@/types/auth'

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  session: null,
  loading: true,
  error: null,

  // Actions
  signup: async (data: SignupData) => {
    set({ loading: true, error: null })
    
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      if (authData.user && authData.session) {
        const user = transformUser(authData.user)
        set({
          user,
          session: authData.session,
          loading: false,
          error: null,
        })
      } else {
        // Email confirmation required
        set({
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      console.error('Signup error:', error)
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during signup',
      })
      throw error
    }
  },

  login: async (data: LoginData) => {
    set({ loading: true, error: null })
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      if (authData.user && authData.session) {
        const user = transformUser(authData.user)
        set({
          user,
          session: authData.session,
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      let errorMessage = 'An error occurred during login'
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password'
        } else {
          errorMessage = error.message
        }
      }
      
      set({
        loading: false,
        error: errorMessage,
      })
      throw error
    }
  },

  logout: async () => {
    set({ loading: true, error: null })
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error

      set({
        user: null,
        session: null,
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error('Logout error:', error)
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during logout',
      })
      throw error
    }
  },

  initialize: async () => {
    set({ loading: true, error: null })
    
    try {
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) throw error

      if (session?.user) {
        const user = transformUser(session.user)
        set({
          user,
          session,
          loading: false,
          error: null,
        })
      } else {
        set({
          user: null,
          session: null,
          loading: false,
          error: null,
        })
      }

      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            const user = transformUser(session.user)
            set({
              user,
              session,
              loading: false,
              error: null,
            })
          } else {
            set({
              user: null,
              session: null,
              loading: false,
              error: null,
            })
          }
        }
      )

      // Store subscription for cleanup if needed
      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({
        user: null,
        session: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize authentication',
      })
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))