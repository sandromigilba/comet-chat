"use client"

import { motion } from 'framer-motion'

interface MessageBubbleProps {
  content: string
  isOwn: boolean
  time: string
}

export function MessageBubble({ content, isOwn, time }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] px-5 py-3 shadow-sm ${
          isOwn
            ? 'bg-gradient-to-br from-brand-light to-brand-dark text-white rounded-[30px] rounded-br-[8px] shadow-brand-medium/5'
            : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-[30px] rounded-bl-[8px] dark:bg-brand-dark/40 dark:text-slate-100 dark:border-brand-light/15'
        }`}
      >
        <p className="text-sm leading-relaxed font-medium">{content}</p>
        <p
          className={`mt-1 text-right text-[9px] font-semibold ${
            isOwn ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          {time}
        </p>
      </div>
    </motion.div>
  )
}
