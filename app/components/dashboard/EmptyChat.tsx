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
      <div className="flex h-16 w-16 items-center justify-center rounded-[30px] bg-brand-light/10 border border-brand-light/30 shadow-inner dark:bg-brand-light/5 dark:border-brand-light/20">
        <MessageSquare className="h-7 w-7 text-brand-medium dark:text-brand-light" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">
          Search for a friend to start chatting
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-400 dark:text-slate-500">
          Use the sidebar to find users by username
        </p>
      </div>
    </motion.div>
  )
}
