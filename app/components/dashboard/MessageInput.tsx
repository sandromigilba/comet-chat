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
    <div className="flex shrink-0 items-center gap-2 border-t border-sky-100/50 p-4 bg-white/40 backdrop-blur-md dark:border-t-[#30363d] dark:bg-[#161b22]/40">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message…"
        className="min-w-0 flex-1 rounded-[30px] border border-sky-100/80 bg-slate-50/80 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100/40 transition-all duration-200 shadow-inner dark:border-[#30363d] dark:bg-[#0d1117] dark:text-[#c9d1d9] dark:placeholder:text-[#8b949e] dark:focus:border-[#58a6ff] dark:focus:bg-[#161b22] dark:focus:ring-[#58a6ff]/20"
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
