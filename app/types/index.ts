export interface User {
  id: number
  username: string
}

export interface Message {
  id: number
  threadId: string
  senderUsername: string
  content: string
  createdAt: number
}

export interface Session {
  user: User
}

export type AuthMode = 'login' | 'register'

export interface ToastState {
  message: string
  type: 'success' | 'error'
}
