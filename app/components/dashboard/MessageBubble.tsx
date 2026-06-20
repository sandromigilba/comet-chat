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
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-[30px] rounded-br-[8px] shadow-blue-500/5 dark:from-[#bd93f9] dark:to-[#ff79c6] dark:text-[#282a36] dark:shadow-[#bd93f9]/5'
            : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-[30px] rounded-bl-[8px] dark:bg-[#44475a] dark:text-[#f8f8f2] dark:border-[#6272a4]/20'
        }`}
      >
        <p className="text-sm leading-relaxed font-medium">{content}</p>
        <p
          className={`mt-1 text-right text-[9px] font-semibold ${
            isOwn ? 'text-blue-100/80 dark:text-[#282a36]/75' : 'text-slate-400 dark:text-[#6272a4]'
          }`}
        >
          {time}
        </p>
      </div>
    </motion.div>
  )
}
