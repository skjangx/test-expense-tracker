import { type User as SupabaseUser, type Session } from '@supabase/supabase-js'

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

export interface SignupData {
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
  rememberMe: boolean
}

export interface AuthActions {
  signup: (data: SignupData) => Promise<void>
  login: (data: LoginData) => Promise<void>
  logout: () => Promise<void>
  initialize: () => Promise<(() => void) | undefined>
  clearError: () => void
}

export type AuthStore = AuthState & AuthActions

export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  signup: (data: SignupData) => Promise<void>
  login: (data: LoginData) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

// Transform Supabase User to our User type
export function transformUser(supabaseUser: SupabaseUser): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email!,
    created_at: supabaseUser.created_at,
    updated_at: supabaseUser.updated_at!,
  }
}