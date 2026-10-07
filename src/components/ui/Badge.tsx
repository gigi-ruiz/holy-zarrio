import type { ReactNode } from 'react'

type Preset = 'new' | 'hot' | 'exclusive' | 'soldout'

const presets: Record<Preset, { label: string; className: string }> = {
  new:       { label: 'Novedad',   className: 'bg-sky text-night' },
  hot:       { label: 'Popular',   className: 'bg-pink text-night' },
  exclusive: { label: 'Exclusivo', className: 'bg-sun text-night' },
  soldout:   { label: 'Agotado',   className: 'bg-ink text-canvas' },
}

interface BadgeProps {
  preset?: Preset
  children?: ReactNode
  className?: string
}

export default function Badge({ preset, children, className = '' }: BadgeProps) {
  const p = preset ? presets[preset] : undefined
  return (
    <span className={`chip ${p?.className ?? 'bg-raised text-ink'} ${className}`}>
      {children ?? p?.label}
    </span>
  )
}
