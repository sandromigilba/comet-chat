import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-[30px] px-6 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
  const variants = {
    primary:
      'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]',
    secondary:
      'bg-blue-50 text-blue-600 border border-blue-100/50 hover:bg-blue-100/60 hover:text-blue-700 active:scale-[0.98]',
    ghost:
      'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-blue-50/50',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
