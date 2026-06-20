"use client"

import { LogOut, Menu, Search, X, Sun, Moon } from 'lucide-react'
import { useApp } from '../../hooks/useApp'
import { SearchResults } from './SearchResults'

interface SidebarProps {
  open: boolean
  onClose: () => void
  onOpen: () => void
}

export function Sidebar({ open, onClose, onOpen }: SidebarProps) {
  const {
    session,
    searchQuery,
    setSearchQuery,
    recentPeers,
    openChat,
    activePeer,
    logout,
    theme,
    toggleTheme,
  } = useApp()

  if (!session) return null

  const showRecent = !searchQuery.trim() && recentPeers.length > 0

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="fixed left-4 top-4 z-30 rounded-[30px] glass hover:bg-white border border-blue-100 p-2.5 lg:hidden shadow-sm transition-colors duration-200 dark:border-zinc-700/30 dark:hover:bg-zinc-800"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5 text-slate-600 dark:text-zinc-100" />
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-blue-900/10 backdrop-blur-sm lg:hidden dark:bg-black/40"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(100%,320px)] flex-col border-r border-blue-100/60 glass transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0 dark:border-zinc-700/30 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-blue-100/50 p-5 dark:border-zinc-700/30">
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-[#f4f4f5]">Comet</h1>
            <p className="text-xs font-semibold text-slate-400 dark:text-zinc-500">@{session.user.username}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-[30px] p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-slate-800 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-[30px] p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-zinc-500 dark:hover:bg-rose-950/20 dark:hover:text-rose-400"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-[30px] p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-slate-800 dark:text-zinc-500 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username…"
              className="w-full rounded-[30px] border border-blue-100/80 bg-slate-50/80 py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/40 transition-all duration-200 shadow-inner dark:border-zinc-700/50 dark:bg-zinc-800/70 dark:text-[#f4f4f5] dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:bg-[#09090b] dark:focus:ring-zinc-500/20"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <SearchResults />

          {showRecent && (
            <div className="px-3 pb-4">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Recent chats
              </p>
              <ul className="flex flex-col gap-1.5">
                {recentPeers.map((username) => (
                  <li key={username}>
                    <button
                      type="button"
                      onClick={() => {
                        openChat(username)
                        onClose()
                      }}
                      className={`flex w-full items-center gap-3 rounded-[30px] px-3.5 py-2.5 text-left transition-all duration-300 ${
                        activePeer === username
                          ? 'bg-blue-500/10 text-blue-600 border border-blue-100/20 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700/50'
                          : 'text-slate-600 hover:bg-blue-50/40 hover:text-slate-800 dark:text-zinc-300 dark:hover:bg-zinc-800/40 dark:hover:text-zinc-100'
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[30px] bg-gradient-to-br from-blue-400 to-indigo-500 text-sm font-semibold uppercase text-white shadow-sm dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-100">
                        {username[0]}
                      </div>
                      <span className="text-sm font-semibold">
                        {username}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!searchQuery.trim() && !showRecent && (
            <p className="px-6 py-8 text-center text-xs font-medium text-slate-400 dark:text-zinc-500">
              Search for friends to start a conversation
            </p>
          )}
        </div>
      </aside>
    </>
  )
}
