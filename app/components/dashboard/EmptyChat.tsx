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
      <div className="flex h-16 w-16 items-center justify-center rounded-[30px] bg-cyan-50/80 border border-cyan-100/50 shadow-inner dark:bg-[#161b22] dark:border-[#30363d]">
        <MessageSquare className="h-7 w-7 text-cyan-500 dark:text-[#58a6ff]" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-700 dark:text-[#c9d1d9]">
          Search for a friend to start chatting
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-400 dark:text-[#8b949e]">
          Use the sidebar to find users by username
        </p>
      </div>
    </motion.div>
  )
}
