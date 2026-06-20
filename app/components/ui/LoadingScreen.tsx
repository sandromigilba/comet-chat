"use client"

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-gradient-to-tr from-brand-light/20 to-brand-medium/10 dark:from-brand-deep dark:to-brand-dark">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="flex h-16 w-16 items-center justify-center rounded-[30px] bg-white border border-brand-light/40 shadow-sm dark:bg-brand-dark dark:border-brand-light/30"
      >
        <MessageCircle className="h-7 w-7 text-brand-medium dark:text-brand-light" />
      </motion.div>
      <p className="text-sm font-medium text-slate-500 dark:text-[#8b949e]">Loading Comet…</p>
    </div>
  )
}
