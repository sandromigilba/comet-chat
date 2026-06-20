"use client"

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-gradient-to-tr from-blue-50 to-indigo-50">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="flex h-16 w-16 items-center justify-center rounded-[30px] bg-white border border-blue-100/50 shadow-sm"
      >
        <MessageCircle className="h-7 w-7 text-blue-500" />
      </motion.div>
      <p className="text-sm font-medium text-slate-500">Loading Comet…</p>
    </div>
  )
}
