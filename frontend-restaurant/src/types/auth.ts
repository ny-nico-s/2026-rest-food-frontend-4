export interface User {
  username: string
  role: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginInput {
  username: string
  password: string
}

export interface RegisterInput {
  username: string
  password: string
}
