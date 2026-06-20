"use client"

import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useApp } from '../../hooks/useApp'
import { EmptyChat } from './EmptyChat'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

interface ChatWindowProps {
  onOpenSidebar: () => void
}

export function ChatWindow({ onOpenSidebar }: ChatWindowProps) {
  const { session, activePeer, messages, activePeerExists } = useApp()

  if (!session) return null

  if (!activePeer) {
    return (
      <main className="flex min-h-0 flex-1 flex-col glass rounded-[30px] shadow-sm relative">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="absolute left-4 top-4 z-30 rounded-[30px] glass hover:bg-white border border-brand-light/30 p-2.5 lg:hidden shadow-sm transition-colors duration-200"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6 text-slate-900" />
        </button>
        <EmptyChat />
      </main>
    )
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 lg:gap-6">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex shrink-0 items-center justify-center py-4 px-5 lg:px-6 glass rounded-[30px] shadow-sm min-h-[72px]"
      >
        <button
          type="button"
          onClick={onOpenSidebar}
          className="absolute left-5 rounded-[30px] p-2 text-slate-900 hover:bg-brand-light/15 hover:text-black lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="text-center">
          <h2 className="text-lg font-black tracking-tight text-slate-900">{activePeer}</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Direct message</p>
        </div>
      </motion.header>

      <div className="flex min-h-0 flex-1 flex-col glass rounded-[30px] overflow-hidden shadow-sm">
        <MessageList
          messages={messages}
          currentUsername={session.user.username}
        />
        {activePeerExists ? (
          <MessageInput />
        ) : (
          <div className="flex shrink-0 items-center justify-center p-5 border-t border-brand-light/20 bg-rose-50/15">
            <span className="text-sm font-semibold text-rose-600 bg-rose-50/70 border border-rose-200/50 px-4 py-2 rounded-[20px] shadow-sm">
              User telah menghapus akun
            </span>
          </div>
        )}
      </div>
    </main>
  )
}
