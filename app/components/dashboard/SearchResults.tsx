"use client"

import { User, UserX } from 'lucide-react'
import { useApp } from '../../hooks/useApp'

export function SearchResults() {
  const { searchQuery, searchResults, openChat } = useApp()
  const query = searchQuery.trim()

  if (!query) return null

  if (searchResults.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
        <UserX className="h-7 w-7 text-slate-300 dark:text-[#6272a4]/60" />
        <p className="text-xs font-semibold text-slate-400 dark:text-[#6272a4]">User not found</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-1.5 px-3">
      {searchResults.map((username) => (
        <li key={username}>
          <button
            type="button"
            onClick={() => openChat(username)}
            className="flex w-full items-center gap-3 rounded-[30px] px-3.5 py-2.5 text-left transition-all duration-300 hover:bg-blue-50/40 text-slate-600 hover:text-slate-800 dark:text-[#f8f8f2]/90 dark:hover:bg-[#44475a]/40 dark:hover:text-[#f8f8f2]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[30px] bg-gradient-to-br from-blue-400 to-indigo-500 text-sm font-semibold uppercase text-white shadow-sm dark:from-[#bd93f9] dark:to-[#ff79c6] dark:text-[#282a36]">
              {username[0]}
            </div>
            <span className="text-sm font-semibold">
              {username}
            </span>
            <User className="ml-auto h-4 w-4 text-slate-300 dark:text-[#6272a4]/60" />
          </button>
        </li>
      ))}
    </ul>
  )
}
