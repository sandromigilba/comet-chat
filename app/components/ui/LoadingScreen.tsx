"use client"

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-gradient-to-tr from-cyan-50 to-teal-50 dark:from-[#0d1117] dark:to-[#161b22]">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="flex h-16 w-16 items-center justify-center rounded-[30px] bg-white border border-cyan-100/50 shadow-sm dark:bg-[#161b22] dark:border-[#30363d] dark:shadow-black/35"
      >
        <MessageCircle className="h-7 w-7 text-cyan-500 dark:text-[#58a6ff]" />
      </motion.div>
      <p className="text-sm font-medium text-slate-500 dark:text-[#8b949e]">Loading Comet…</p>
    </div>
  )
}
