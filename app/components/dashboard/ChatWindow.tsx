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
    <main className="flex min-h-0 flex-1 flex-col glass border-l border-blue-100/50 overflow-hidden shadow-sm dark:border-l-[#6272a4]/20">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex shrink-0 items-center gap-3 border-b border-blue-100/50 bg-white/50 backdrop-blur-md px-5 py-4 lg:px-6 shadow-sm dark:border-b-[#6272a4]/20 dark:bg-[#282a36]/50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-[30px] bg-gradient-to-br from-blue-400 to-indigo-500 text-sm font-bold uppercase text-white shadow-sm dark:from-[#bd93f9] dark:to-[#ff79c6] dark:text-[#282a36]">
          {activePeer[0]}
        </div>
        <div>
          <h2 className="font-bold text-slate-800 dark:text-[#f8f8f2]">{activePeer}</h2>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider dark:text-[#6272a4]">Direct message</p>
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
