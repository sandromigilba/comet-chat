"use client"

import { ArrowLeft, Trash2, Type } from 'lucide-react'
import { useApp } from '../../hooks/useApp'

interface SettingsPageProps {
  onClose: () => void
}

const FONT_OPTIONS = [
  { id: 'sans', name: 'Sans-Serif', family: 'Inter', className: 'font-sans-custom', preview: 'Aa Bb Cc 123' },
  { id: 'raleway', name: 'Raleway', family: 'Raleway', className: 'font-raleway-custom', preview: 'Aa Bb Cc 123' },
  { id: 'monospace', name: 'Monospace', family: 'Monospace', className: 'font-mono-custom', preview: 'Aa Bb Cc 123' },
  { id: 'serif', name: 'Serif', family: 'Georgia', className: 'font-serif-custom', preview: 'Aa Bb Cc 123' },
  { id: 'dyslexic', name: 'Comic Sans', family: 'Comic Sans', className: 'font-dyslexic-custom', preview: 'Aa Bb Cc 123' },
]

export function SettingsPage({ onClose }: SettingsPageProps) {
  const { font, setFont, deleteAccount } = useApp()

  async function handleDeleteAccount() {
    if (confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      await deleteAccount()
    }
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col glass rounded-[30px] shadow-sm p-6 lg:p-8 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-4 border-b border-brand-light/20 pb-5 mb-6">
        <button
          type="button"
          onClick={onClose}
          className="rounded-[30px] p-2 text-slate-600 hover:bg-brand-light/15 hover:text-slate-900 transition-colors"
          aria-label="Back to chat"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-black text-slate-900">Settings</h2>
          <p className="text-xs text-slate-500 font-semibold">Customize your Comet experience</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8 max-w-xl">
        {/* Font section */}
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
            <Type className="h-4 w-4" />
            Font Family
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FONT_OPTIONS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFont(f.id)}
                className={`flex flex-col gap-2 rounded-[20px] p-4 text-left border transition-all duration-300 active:scale-[0.98] ${
                  font === f.id
                    ? 'bg-brand-light/10 border-brand-dark shadow-sm ring-2 ring-brand-light/35'
                    : 'bg-white border-brand-light/25 hover:border-brand-medium hover:bg-brand-light/5'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-bold text-slate-900">{f.name}</span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{f.family}</span>
                </div>
                <div className={`text-xl font-medium text-slate-700 ${f.className}`}>
                  {f.preview}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Account Delete section */}
        <div className="border-t border-brand-light/20 pt-6 flex flex-col gap-3">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
            <Trash2 className="h-4 w-4" />
            Danger Zone
          </label>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Permanently delete your account. This will completely remove your user profile from the database and log you out. This action cannot be undone.
          </p>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="w-full sm:w-auto self-start rounded-[30px] bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 text-sm transition-all duration-200 shadow-sm active:scale-[0.98]"
          >
            Delete Account
          </button>
        </div>
      </div>
    </main>
  )
}
