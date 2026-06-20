"use client"

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { io } from 'socket.io-client'
import {
  getMessages,
  getRecentChatPeers,
  initDatabase,
  loginUser,
  registerUser,
  sendMessage as dbSendMessage,
} from '../db/database'
import { apiSearchUsers } from '../db/apiClient'

import type { AuthMode, Message, Session, ToastState } from '../types'
import { isPasswordValid, isUsernameValid } from '../utils/validation'

export interface AppContextValue {
  dbReady: boolean
  session: Session | null
  authMode: AuthMode
  setAuthMode: (mode: AuthMode) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  searchResults: string[]
  recentPeers: string[]
  activePeer: string | null
  messages: Message[]
  toast: ToastState | null
  showToast: (message: string, type: ToastState['type']) => void
  login: (username: string, password: string) => Promise<string | null>
  register: (username: string, password: string) => Promise<string | null>
  logout: () => void
  openChat: (peerUsername: string) => void
  sendMessage: (content: string) => Promise<void>
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const AppContext = createContext<AppContextValue | null>(null)

const SESSION_KEY = 'linkverse-session'

function loadSession(): Session | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

function saveSession(session: Session | null): void {
  if (typeof window === 'undefined') return
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [dbReady, setDbReady] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [searchQuery, setSearchQuery] = useState('')
  const [activePeer, setActivePeer] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [toast, setToast] = useState<ToastState | null>(null)
  const [chatRevision, setChatRevision] = useState(0)

  const activePeerRef = useRef<string | null>(null)

  useEffect(() => {
    activePeerRef.current = activePeer
  }, [activePeer])

  const theme = 'light'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('dark')
    localStorage.setItem('comet-theme', 'light')
  }, [])

  const toggleTheme = useCallback(() => {}, [])

  const [socketConnected, setSocketConnected] = useState(false)

  useEffect(() => {
    if (!session) return

    const socketUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'
    const socket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      timeout: 5000,
    })

    socket.emit('join', session.user.username)

    socket.on('connect', () => {
      setSocketConnected(true)
    })

    socket.on('connect_error', () => {
      setSocketConnected(false)
    })

    socket.on('disconnect', () => {
      setSocketConnected(false)
    })

    socket.on('message', (msg: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) {
          return prev
        }

        const currentThreadId = activePeerRef.current
          ? [session.user.username, activePeerRef.current].sort().join(':')
          : null

        if (msg.threadId === currentThreadId) {
          return [...prev, msg]
        }
        return prev
      })
      setChatRevision((n) => n + 1)
    })

    return () => {
      socket.disconnect()
    }
  }, [session])

  // Polling Fallback Effect: Active when WebSockets are disconnected
  useEffect(() => {
    if (!session || !activePeer || socketConnected) return

    const interval = setInterval(async () => {
      try {
        const msgs = await getMessages(session.user.username, activePeer)
        setMessages((prev) => {
          // Avoid unnecessary rerenders if message logs match
          if (
            prev.length === msgs.length &&
            prev[prev.length - 1]?.id === msgs[msgs.length - 1]?.id
          ) {
            return prev
          }
          return msgs
        })
      } catch (err) {
        console.error('Polling messages error:', err)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [session, activePeer, socketConnected])

  useEffect(() => {
    initDatabase()
      .then(() => {
        setSession(loadSession())
        setDbReady(true)
      })
      .catch(() => {
        setDbReady(true)
      })
  }, [])

  const showToast = useCallback((message: string, type: ToastState['type']) => {
    setToast({ message, type })
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  const [searchResults, setSearchResults] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!session || !searchQuery.trim()) {
        setSearchResults([])
        return
      }
      const results = await apiSearchUsers(searchQuery.trim(), session.user.username)

      if (!cancelled) setSearchResults(results)
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [session, searchQuery])

  const [recentPeers, setRecentPeers] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!session) {
        setRecentPeers([])
        return
      }
      const peers = await getRecentChatPeers(session.user.username)
      if (!cancelled) setRecentPeers(peers)
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [session, chatRevision])

  const login = useCallback(
    async (username: string, password: string): Promise<string | null> => {
      const result = await loginUser(username, password)
      if (!result.ok) return result.error
      const newSession: Session = { user: result.user }
      setSession(newSession)
      saveSession(newSession)
      return null
    },
    [],
  )

  const register = useCallback(
    async (username: string, password: string): Promise<string | null> => {
      if (!isUsernameValid(username)) {
        return 'Username must be at least 2 characters (letters, numbers, underscore)'
      }
      if (!isPasswordValid(password)) {
        return 'Password must contain at least one letter and one number'
      }
      const result = await registerUser(username, password)
      if (!result.ok) return result.error
      setAuthMode('login')
      showToast('Account created successfully, please sign in', 'success')
      return null
    },
    [showToast],
  )

  const logout = useCallback(() => {
    setSession(null)
    saveSession(null)
    setActivePeer(null)
    setMessages([])
    setSearchQuery('')
  }, [])

  const openChat = useCallback(
    (peerUsername: string) => {
      if (!session) return
      setActivePeer(peerUsername)
      void (async () => {
        const msgs = await getMessages(session.user.username, peerUsername)
        setMessages(msgs)
      })()
      setSearchQuery('')
      setChatRevision((n) => n + 1)
    },
    [session],
  )

  const sendMessage = useCallback(
    async (content: string) => {
      if (!session || !activePeer || !content.trim()) return
      const msg = await dbSendMessage(
        session.user.username,
        activePeer,
        content,
      )
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) {
          return prev
        }
        return [...prev, msg]
      })
      setChatRevision((n) => n + 1)
    },
    [session, activePeer],
  )

  const value = useMemo<AppContextValue>(
    () => ({
      dbReady,
      session,
      authMode,
      setAuthMode,
      searchQuery,
      setSearchQuery,
      searchResults,
      recentPeers,
      activePeer,
      messages,
      toast,
      showToast,
      login,
      register,
      logout,
      openChat,
      sendMessage,
      theme,
      toggleTheme,
    }),
    [
      dbReady,
      session,
      authMode,
      searchQuery,
      searchResults,
      recentPeers,
      activePeer,
      messages,
      toast,
      showToast,
      login,
      register,
      logout,
      openChat,
      sendMessage,
      theme,
      toggleTheme,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
