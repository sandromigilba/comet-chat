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
            ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-[30px] rounded-br-[8px] shadow-sky-500/5 dark:bg-[#1f6feb] dark:from-transparent dark:to-transparent dark:text-white dark:border dark:border-[#388bfd]/30 dark:shadow-[#1f6feb]/15'
            : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-[30px] rounded-bl-[8px] dark:bg-[#161b22] dark:text-[#c9d1d9] dark:border dark:border-[#30363d]'
        }`}
      >
        <p className="text-sm leading-relaxed font-medium">{content}</p>
        <p
          className={`mt-1 text-right text-[9px] font-semibold ${
            isOwn ? 'text-sky-100/80 dark:text-blue-100/70' : 'text-slate-400 dark:text-[#8b949e]'
          }`}
        >
          {time}
        </p>
      </div>
    </motion.div>
  )
}
