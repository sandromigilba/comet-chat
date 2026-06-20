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
        className="fixed left-4 top-4 z-30 rounded-[30px] glass hover:bg-white border border-brand-light/30 p-2.5 lg:hidden shadow-sm transition-colors duration-200 dark:border-brand-light/20 dark:hover:bg-brand-medium/20"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5 text-slate-600 dark:text-slate-200" />
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-brand-deep/5 backdrop-blur-sm lg:hidden dark:bg-brand-deep/60"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[calc(100%-2rem)] max-w-[320px] my-4 ml-4 flex-col glass rounded-[30px] transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0 lg:w-[min(100%,320px)] lg:h-full lg:m-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-brand-light/25 p-5 dark:border-b-brand-light/15">
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Comet</h1>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">@{session.user.username}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-[30px] p-2 text-slate-400 transition-colors hover:bg-brand-light/15 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-brand-light/10 dark:hover:text-slate-200"
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
              className="rounded-[30px] p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-[30px] p-2 text-slate-400 transition-colors hover:bg-brand-light/15 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-brand-light/10 dark:hover:text-slate-200 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username…"
              className="w-full rounded-[30px] border border-brand-light/40 bg-slate-50/80 py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-medium focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-light/20 transition-all duration-200 shadow-inner dark:border-brand-light/35 dark:bg-brand-deep dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-light dark:focus:bg-brand-deep/80 dark:focus:ring-brand-light/15"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <SearchResults />

          {showRecent && (
            <div className="px-3 pb-4">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                          ? 'bg-brand-medium/15 text-brand-dark border border-brand-light/20 dark:bg-brand-medium/30 dark:text-brand-light dark:border-brand-light/30'
                          : 'text-slate-600 hover:bg-brand-light/15 hover:text-brand-deep dark:text-slate-300 dark:hover:bg-brand-light/10 dark:hover:text-brand-light'
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[30px] bg-gradient-to-br from-brand-light to-brand-medium text-sm font-semibold uppercase text-white shadow-sm">
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
            <p className="px-6 py-8 text-center text-xs font-medium text-slate-400 dark:text-slate-500">
              Search for friends to start a conversation
            </p>
          )}
        </div>
      </aside>
    </>
  )
}
