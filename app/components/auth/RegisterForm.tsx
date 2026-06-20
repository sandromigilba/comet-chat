"use client"

import { useState, type FormEvent } from 'react'
import { UserPlus } from 'lucide-react'
import { useApp } from '../../hooks/useApp'
import { isPasswordValid } from '../../utils/validation'
import { Button } from '../ui/Button'
import { PasswordHint } from './PasswordHint'

const inputClass =
  'w-full rounded-[30px] border border-brand-light/40 bg-slate-50/80 px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-medium focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-light/20 transition-all duration-200 shadow-inner'

export function RegisterForm() {
  const { register } = useApp()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [touchedPassword, setTouchedPassword] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!isPasswordValid(password)) {
      setError('Password must contain at least one letter and one number')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    const err = await register(username, password)
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
          placeholder="Choose a username"
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
          onBlur={() => setTouchedPassword(true)}
          className={inputClass}
          placeholder="Create a password"
          autoComplete="new-password"
          required
        />
        <div className="mt-1.5">
          <PasswordHint
            password={password}
            show={touchedPassword || password.length > 0}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 ml-3 block text-xs font-semibold text-slate-500">
          Confirm password
        </label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={inputClass}
          placeholder="Confirm password"
          autoComplete="new-password"
          required
        />
      </div>

      {error && <p className="ml-3 text-xs font-medium text-rose-500">{error}</p>}

      <Button
        type="submit"
        disabled={loading || (password.length > 0 && !isPasswordValid(password))}
        className="mt-2 w-full"
      >
        <UserPlus className="h-4 w-4" />
        {loading ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
