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
    <div className="flex shrink-0 items-center gap-3 px-5 py-4 border-t border-brand-light/20 bg-brand-light/5">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message…"
        className="min-w-0 flex-1 bg-white border border-brand-light/35 rounded-[30px] px-5 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-light/20 transition-all duration-200 shadow-sm"
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
