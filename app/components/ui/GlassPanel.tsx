import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  strong?: boolean
}

export function GlassPanel({
  children,
  className = '',
  strong = false,
}: GlassPanelProps) {
  return (
    <div
      className={`rounded-[30px] ${strong ? 'glass-strong' : 'glass'} ${className}`}
    >
      {children}
    </div>
  )
}
