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
    'inline-flex items-center justify-center gap-2 rounded-[30px] px-6 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 dark:focus-visible:ring-[#58a6ff]/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-600 hover:to-teal-700 shadow-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] dark:bg-[#1f6feb] dark:from-transparent dark:to-transparent dark:text-white dark:border dark:border-[#388bfd]/30 dark:hover:bg-[#388bfd] dark:shadow-[#1f6feb]/15',
    secondary:
      'bg-cyan-50 text-cyan-600 border border-cyan-100/50 hover:bg-cyan-100/60 hover:text-cyan-700 active:scale-[0.98] dark:bg-[#21262d] dark:text-[#c9d1d9] dark:border dark:border-[#30363d] dark:hover:bg-[#30363d] dark:hover:text-[#f0f6fc] dark:shadow-black/20',
    ghost:
      'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-cyan-50/50 dark:text-[#8b949e] dark:hover:text-[#c9d1d9] dark:hover:bg-[#21262d]/50',
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
