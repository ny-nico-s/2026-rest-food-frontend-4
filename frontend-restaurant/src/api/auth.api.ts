import { apiClient } from './client'
import type { AuthResponse, LoginInput, RegisterInput } from '../types/auth'

export async function login(data: LoginInput): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', data)
  return response.data
}

export async function register(data: RegisterInput): Promise<void> {
  await apiClient.post('/auth/register', data)
}
