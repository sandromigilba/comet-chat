"use client"

import { useState, type KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { useApp } from '../../hooks/useApp'
import { Button } from '../ui/Button'

export function MessageInput() {
  const { sendMessage, activePeer } = useApp()
  const [text, setText] = useState('')

  async function handleSend() {
    if (!text.trim() || !activePeer) return
    await sendMessage(text)
    setText('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  return (
    <div className="flex shrink-0 items-center gap-2 border-t border-brand-light/35 p-4 bg-white/40 backdrop-blur-md dark:border-t-brand-light/15 dark:bg-brand-deep/30">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message…"
        className="min-w-0 flex-1 rounded-[30px] border border-brand-light/40 bg-slate-50/80 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-medium focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-light/20 transition-all duration-200 shadow-inner dark:border-brand-light/30 dark:bg-brand-deep dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-light dark:focus:bg-brand-deep/80 dark:focus:ring-brand-light/15"
      />
      <Button
        type="button"
        onClick={() => void handleSend()}
        disabled={!text.trim()}
        aria-label="Send message"
        className="aspect-square !p-3.5"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
