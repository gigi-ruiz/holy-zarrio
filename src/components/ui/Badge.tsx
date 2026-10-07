type Preset = 'new' | 'hot' | 'exclusive' | 'soldout' | 'lowstock' | 'bestseller'
type Rarity = 'common' | 'rare' | 'super-rare' | 'secret' | 'hidden'

interface BadgeProps {
  label?: string
  preset?: Preset
  rarity?: Rarity
  variant?: 'default' | 'outline' | 'subtle'
  className?: string
}

const presetConfig: Record<Preset, { label: string; className: string }> = {
  new:        { label: 'Novedad',     className: 'bg-white/8 text-zarrio-bone border-white/10' },
  hot:        { label: 'Popular',     className: 'bg-white/5 text-gray-300 border-white/8' },
  exclusive:  { label: 'Exclusivo',   className: 'bg-brand-500/15 text-brand-400 border-brand-500/25' },
  soldout:    { label: 'Agotado',     className: 'bg-transparent text-gray-600 border-white/8' },
  lowstock:   { label: 'Últimas',     className: 'bg-white/5 text-gray-400 border-white/8' },
  bestseller: { label: 'Más vendido', className: 'bg-white/5 text-gray-300 border-white/8' },
}

const rarityConfig: Record<Rarity, { className: string }> = {
  common:       { className: 'bg-transparent text-gray-600 border-white/8' },
  rare:         { className: 'bg-white/5 text-gray-400 border-white/10' },
  'super-rare': { className: 'bg-white/8 text-gray-300 border-white/12' },
  secret:       { className: 'bg-brand-500/12 text-brand-400 border-brand-500/20' },
  hidden:       { className: 'bg-red-950/40 text-red-400/80 border-red-900/30' },
}

export default function Badge({ label, preset, rarity, variant = 'default', className = '' }: BadgeProps) {
  const base = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide uppercase border'

  if (preset) {
    const { label: defaultLabel, className: presetClass } = presetConfig[preset]
    return <span className={`${base} ${presetClass} ${className}`}>{label ?? defaultLabel}</span>
  }

  if (rarity) {
    return <span className={`${base} ${rarityConfig[rarity].className} ${className}`}>{label}</span>
  }

  const variantClass =
    variant === 'outline' ? 'bg-transparent text-gray-400 border-white/15' :
    variant === 'subtle'  ? 'bg-white/4 text-gray-500 border-transparent' :
                            'bg-white/6 text-gray-400 border-transparent'

  return <span className={`${base} ${variantClass} ${className}`}>{label}</span>
}
