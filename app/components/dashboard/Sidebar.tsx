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
        className="fixed left-4 top-4 z-30 rounded-[30px] glass hover:bg-white border border-sky-100 p-2.5 lg:hidden shadow-sm transition-colors duration-200 dark:border-[#30363d] dark:hover:bg-[#21262d]"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5 text-slate-600 dark:text-[#c9d1d9]" />
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-sky-900/10 backdrop-blur-sm lg:hidden dark:bg-black/40"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(100%,320px)] flex-col border-r border-sky-100/60 glass transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0 dark:border-[#30363d] ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-sky-100/50 p-5 dark:border-[#30363d]">
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-[#c9d1d9]">Comet</h1>
            <p className="text-xs font-semibold text-slate-400 dark:text-[#8b949e]">@{session.user.username}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-[30px] p-2 text-slate-400 transition-colors hover:bg-sky-50 hover:text-slate-800 dark:text-[#8b949e] dark:hover:bg-[#21262d] dark:hover:text-[#c9d1d9]"
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
              className="rounded-[30px] p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-[#8b949e] dark:hover:bg-[#da3633]/20 dark:hover:text-[#da3633]"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-[30px] p-2 text-slate-400 transition-colors hover:bg-sky-50 hover:text-slate-800 dark:text-[#8b949e] dark:hover:bg-[#21262d] dark:hover:text-[#c9d1d9] lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#8b949e]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username…"
              className="w-full rounded-[30px] border border-sky-100/80 bg-slate-50/80 py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100/40 transition-all duration-200 shadow-inner dark:border-[#30363d] dark:bg-[#0d1117] dark:text-[#c9d1d9] dark:placeholder:text-[#8b949e] dark:focus:border-[#58a6ff] dark:focus:bg-[#161b22] dark:focus:ring-[#58a6ff]/20"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <SearchResults />

          {showRecent && (
            <div className="px-3 pb-4">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8b949e]">
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
                          ? 'bg-sky-500/10 text-sky-600 border border-sky-100/20 dark:bg-[#21262d] dark:text-[#58a6ff] dark:border-[#30363d]/50'
                          : 'text-slate-600 hover:bg-sky-50/40 hover:text-sky-800 dark:text-[#c9d1d9]/90 dark:hover:bg-[#21262d]/50 dark:hover:text-[#f0f6fc]'
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[30px] bg-gradient-to-br from-sky-400 to-blue-500 text-sm font-semibold uppercase text-white shadow-sm dark:from-[#21262d] dark:to-[#30363d] dark:text-[#58a6ff]">
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
            <p className="px-6 py-8 text-center text-xs font-medium text-slate-400 dark:text-[#8b949e]">
              Search for friends to start a conversation
            </p>
          )}
        </div>
      </aside>
    </>
  )
}
