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
      <div className="flex h-16 w-16 items-center justify-center rounded-[30px] bg-blue-50/80 border border-blue-100/50 shadow-inner dark:bg-[#44475a]/70 dark:border-[#6272a4]/40">
        <MessageSquare className="h-7 w-7 text-blue-500 dark:text-[#bd93f9]" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-700 dark:text-[#f8f8f2]">
          Search for a friend to start chatting
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-400 dark:text-[#6272a4]">
          Use the sidebar to find users by username
        </p>
      </div>
    </motion.div>
  )
}
