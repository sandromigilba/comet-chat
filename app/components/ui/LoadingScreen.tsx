"use client"

import { motion } from 'framer-motion'

export function LoadingScreen() {
  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut' as const,
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-[#e0f2fe]">
      <div className="flex items-center gap-2">
        <motion.span
          className="h-3 w-3 rounded-full bg-brand-medium"
          animate={{ y: [0, -10] }}
          transition={dotTransition}
        />
        <motion.span
          className="h-3 w-3 rounded-full bg-brand-medium"
          animate={{ y: [0, -10] }}
          transition={{
            ...dotTransition,
            delay: 0.15,
          }}
        />
        <motion.span
          className="h-3 w-3 rounded-full bg-brand-medium"
          animate={{ y: [0, -10] }}
          transition={{
            ...dotTransition,
            delay: 0.3,
          }}
        />
      </div>
      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Loading</p>
    </div>
  )
}
