"use client"

import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

export function EmptyChat() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-[30px] bg-blue-50/80 border border-blue-100/50 shadow-inner dark:bg-zinc-800/70 dark:border-zinc-700/50">
        <MessageSquare className="h-7 w-7 text-blue-500 dark:text-zinc-400" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-700 dark:text-zinc-100">
          Search for a friend to start chatting
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-400 dark:text-zinc-500">
          Use the sidebar to find users by username
        </p>
      </div>
    </motion.div>
  )
}
