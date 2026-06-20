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
    <div className="flex shrink-0 items-center gap-2 border-t border-blue-100/50 p-4 bg-white/40 backdrop-blur-md dark:border-t-zinc-700/30 dark:bg-[#09090b]/40">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message…"
        className="min-w-0 flex-1 rounded-[30px] border border-blue-100/80 bg-slate-50/80 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/40 transition-all duration-200 shadow-inner dark:border-zinc-700/50 dark:bg-zinc-800/70 dark:text-[#f4f4f5] dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:bg-[#09090b] dark:focus:ring-zinc-500/20"
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
