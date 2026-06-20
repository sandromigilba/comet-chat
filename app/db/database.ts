import type { Message, User } from '../types'

import {
  apiGetMessages,
  apiLogin,
  apiLogout,
  apiRecentPeers,
  apiRegister,
  apiSendMessage,
  fetchSession,
} from './apiClient'

export async function initDatabase(): Promise<void> {
  await fetchSession()
}

export async function registerUser(
  username: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  return apiRegister(username, password)
}

export async function loginUser(
  username: string,
  password: string,
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  const result = await apiLogin(username, password)
  if (!result.ok) return result
  return { ok: true, user: result.user }
}

export async function logoutUser(): Promise<void> {
  await apiLogout()
}

export function searchUsers(): string[] {
  throw new Error('searchUsers is no longer supported in the backend-enabled build')
}

export async function getRecentChatPeers(username: string): Promise<string[]> {
  return apiRecentPeers(username)
}

export async function getMessages(usernameA: string, usernameB: string): Promise<Message[]> {
  return apiGetMessages(usernameA, usernameB)
}

export async function sendMessage(
  senderUsername: string,
  recipientUsername: string,
  content: string,
): Promise<Message> {
  return apiSendMessage(senderUsername, recipientUsername, content)
}
