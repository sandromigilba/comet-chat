import type { Message, Session, User } from '../types'

const API_BASE = typeof window === 'undefined' ? (process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000') : ''

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = typeof window === 'undefined' ? `${API_BASE}${path}` : path
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  })

  if (!res.ok) {
    let message = `Request failed: ${res.status}`
    try {
      const data = (await res.json()) as any
      if (data?.error && data?.details) {
        message = `${data.error} (${data.details})`
      } else {
        message = data?.error || data?.message || message
      }
    } catch {
      // ignore
    }
    throw new Error(message)
  }

  return (await res.json()) as T
}

export async function fetchSession(): Promise<Session | null> {
  try {
    const data = await api<{ user: User | null }>('/api/session', { method: 'GET' })
    if (!data.user) return null
    return { user: data.user }
  } catch {
    return null
  }
}

export async function apiRegister(username: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await api('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Registration failed' }
  }
}

export async function apiLogin(username: string, password: string): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const data = await api<{ ok: true; user: User }>('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    return { ok: true, user: data.user }
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Login failed' }
  }
}

export async function apiLogout(): Promise<void> {
  await api('/api/logout', { method: 'POST' })
}

export async function apiSearchUsers(queryStr: string, excludeUsername: string): Promise<string[]> {
  const data = await api<{ users: string[] }>(
    `/api/users/search?q=${encodeURIComponent(queryStr)}&exclude=${encodeURIComponent(excludeUsername)}`,
    { method: 'GET' },
  )
  return data.users
}

export async function apiRecentPeers(username: string): Promise<string[]> {
  const data = await api<{ peers: string[] }>(
    `/api/threads/recent?username=${encodeURIComponent(username)}`,
    { method: 'GET' },
  )
  return data.peers
}

export async function apiGetMessages(usernameA: string, usernameB: string): Promise<Message[]> {
  const data = await api<{ messages: Message[] }>(
    `/api/messages?a=${encodeURIComponent(usernameA)}&b=${encodeURIComponent(usernameB)}`,
    { method: 'GET' },
  )
  return data.messages
}

export async function apiSendMessage(senderUsername: string, recipientUsername: string, content: string): Promise<Message> {
  const data = await api<{ message: Message }>(`/api/messages`, {
    method: 'POST',
    body: JSON.stringify({ senderUsername, recipientUsername, content }),
  })
  return data.message
}

export async function apiDeleteAccount(): Promise<void> {
  await api('/api/users/delete', { method: 'POST' })
}
