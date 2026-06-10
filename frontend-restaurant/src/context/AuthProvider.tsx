import { useState } from 'react'
import type { ReactNode } from 'react'
import { TOKEN_STORAGE_KEY } from '../api/client'
import {
  login as loginRequest,
  register as registerRequest,
} from '../api/auth.api'
import type { LoginInput, RegisterInput, User } from '../types/auth'
import { AuthContext, USER_STORAGE_KEY } from './AuthContext'
import type { AuthContextValue } from './AuthContext'

function readStoredUser(): User | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) {
    return null
  }
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser)

  async function login(data: LoginInput) {
    const result = await loginRequest(data)
    localStorage.setItem(TOKEN_STORAGE_KEY, result.token)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user))
    setUser(result.user)
  }

  async function register(data: RegisterInput) {
    await registerRequest(data)
  }

  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
