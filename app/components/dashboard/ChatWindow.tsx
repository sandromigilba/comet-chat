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
    <main className="flex min-h-0 flex-1 flex-col glass border-l border-brand-light/30 overflow-hidden shadow-sm">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex shrink-0 items-center gap-3 border-b border-brand-light/30 bg-white/50 backdrop-blur-md px-5 py-4 lg:px-6 shadow-sm"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-[30px] bg-gradient-to-br from-brand-light to-brand-medium text-sm font-bold uppercase text-white shadow-sm">
          {activePeer[0]}
        </div>
        <div>
          <h2 className="font-bold text-slate-800">{activePeer}</h2>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Direct message</p>
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
