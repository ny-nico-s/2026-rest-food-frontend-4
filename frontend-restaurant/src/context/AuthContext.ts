import { createContext } from 'react'
import type { LoginInput, RegisterInput, User } from '../types/auth'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  login: (data: LoginInput) => Promise<void>
  register: (data: RegisterInput) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const USER_STORAGE_KEY = 'restaurant_user'
