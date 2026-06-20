"use client"

import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Message } from '../../types'
import { formatTime } from '../../utils/formatTime'
import { MessageBubble } from './MessageBubble'

interface MessageListProps {
  messages: Message[]
  currentUsername: string
}

export function MessageList({ messages, currentUsername }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5 bg-brand-light/5 dark:bg-brand-deep/40">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            isOwn={msg.senderUsername === currentUsername}
            time={formatTime(msg.createdAt)}
          />
        ))}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  )
}
