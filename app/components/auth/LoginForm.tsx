"use client"

import { useState, type FormEvent } from 'react'
import { LogIn } from 'lucide-react'
import { useApp } from '../../hooks/useApp'
import { Button } from '../ui/Button'

const inputClass =
  'w-full rounded-[30px] border border-brand-light/40 bg-slate-50/80 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-medium focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-light/20 transition-all duration-200 shadow-inner'

export function LoginForm() {
  const { login } = useApp()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const err = await login(username, password)
    setLoading(false)
    if (err) setError(err)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 ml-3 block text-xs font-semibold text-slate-500">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={inputClass}
          placeholder="Enter username"
          autoComplete="username"
          required
        />
      </div>

      <div>
        <label className="mb-1.5 ml-3 block text-xs font-semibold text-slate-500">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="Enter password"
          autoComplete="current-password"
          required
        />
      </div>

      {error && <p className="ml-3 text-xs font-medium text-rose-500">{error}</p>}

      <Button type="submit" disabled={loading} className="mt-2 w-full">
        <LogIn className="h-4 w-4" />
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
