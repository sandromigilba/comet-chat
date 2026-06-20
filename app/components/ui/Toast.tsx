"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useApp } from '../../hooks/useApp'

export function Toast() {
  const { toast } = useApp()

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.message}
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div
            className={`flex items-center gap-3 rounded-[30px] border px-6 py-3.5 text-sm font-medium shadow-lg backdrop-blur-xl transition-all duration-300 ${
              toast.type === 'success'
                ? 'bg-emerald-50/95 border-emerald-100/80 text-emerald-800 shadow-emerald-500/5 dark:bg-[#282a36]/95 dark:border-emerald-500/30 dark:text-[#f8f8f2] dark:shadow-black/25'
                : 'bg-rose-50/95 border-rose-100/80 text-rose-800 shadow-rose-500/5 dark:bg-[#282a36]/95 dark:border-rose-500/30 dark:text-[#f8f8f2] dark:shadow-black/25'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
            )}
            <span>{toast.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
