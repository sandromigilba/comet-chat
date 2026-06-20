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
    'inline-flex items-center justify-center gap-2 rounded-[30px] px-6 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-medium/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
  const variants = {
    primary:
      'bg-gradient-to-r from-brand-light to-brand-dark text-white hover:from-brand-medium hover:to-brand-deep shadow-brand-medium/10 hover:shadow-lg hover:shadow-brand-medium/20 active:scale-[0.98]',
    secondary:
      'bg-brand-light/10 text-brand-dark border border-brand-light/30 hover:bg-brand-light/20 hover:text-brand-deep active:scale-[0.98]',
    ghost:
      'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-brand-light/15',
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
