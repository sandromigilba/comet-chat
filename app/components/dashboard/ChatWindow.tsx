"use client"

import { motion } from 'framer-motion'
import { useApp } from '../../hooks/useApp'
import { EmptyChat } from './EmptyChat'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

export function ChatWindow() {
  const { session, activePeer, messages } = useApp()

  if (!session) return null

  if (!activePeer) {
    return (
      <main className="flex min-h-0 flex-1 flex-col glass">
        <EmptyChat />
      </main>
    )
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col glass border-l border-blue-100/50 overflow-hidden shadow-sm dark:border-l-zinc-700/30">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex shrink-0 items-center gap-3 border-b border-blue-100/50 bg-white/50 backdrop-blur-md px-5 py-4 lg:px-6 shadow-sm dark:border-b-zinc-700/30 dark:bg-[#09090b]/50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-[30px] bg-gradient-to-br from-blue-400 to-indigo-500 text-sm font-bold uppercase text-white shadow-sm dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-100">
          {activePeer[0]}
        </div>
        <div>
          <h2 className="font-bold text-slate-800 dark:text-zinc-100">{activePeer}</h2>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider dark:text-zinc-500">Direct message</p>
        </div>
      </motion.header>

      <MessageList
        messages={messages}
        currentUsername={session.user.username}
      />

      <MessageInput />
    </main>
  )
}
