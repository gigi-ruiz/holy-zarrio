type MockupStyle = 'oddity' | 'pokemon' | 'hotwheels' | 'lego' | 'funko'

interface Config {
  bg: string
  label: string
  sub: string
  pattern: 'dots' | 'lines' | 'grid' | 'crosses' | 'none'
  accentLine: string
}

const configs: Record<MockupStyle, Config> = {
  oddity: {
    bg: '#0D0D0D',
    label: 'ODDITY',
    sub: 'Holy Zarrio',
    pattern: 'crosses',
    accentLine: '#D4A017',
  },
  pokemon: {
    bg: '#0C0F1A',
    label: 'Pokémon',
    sub: 'TCG · Scarlet & Violet',
    pattern: 'dots',
    accentLine: '#3B3F5A',
  },
  hotwheels: {
    bg: '#130A0A',
    label: 'Hot Wheels',
    sub: 'Premium Series',
    pattern: 'lines',
    accentLine: '#3D1515',
  },
  lego: {
    bg: '#111008',
    label: 'LEGO',
    sub: 'CMF Series 25',
    pattern: 'grid',
    accentLine: '#2E2A10',
  },
  funko: {
    bg: '#0C0C0C',
    label: 'Funko',
    sub: 'Mystery Minis',
    pattern: 'none',
    accentLine: '#222',
  },
}

function Pattern({ type, color }: { type: Config['pattern']; color: string }) {
  if (type === 'none') return null

  if (type === 'dots') return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1" fill={color} />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )

  if (type === 'lines') return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <pattern id="lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="20" stroke={color} strokeWidth="1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#lines)" />
    </svg>
  )

  if (type === 'grid') return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill={color} opacity="0.5" />
        <rect x="12" y="12" width="12" height="12" fill={color} opacity="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )

  if (type === 'crosses') return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <pattern id="crosses" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <line x1="12" y1="6" x2="12" y2="18" stroke={color} strokeWidth="0.8" />
        <line x1="6" y1="12" x2="18" y2="12" stroke={color} strokeWidth="0.8" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#crosses)" />
    </svg>
  )

  return null
}

export default function ProductMockup({ type }: { type: MockupStyle }) {
  const c = configs[type]
  const isOddity = type === 'oddity'

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center gap-2 overflow-hidden select-none"
      style={{ backgroundColor: c.bg }}
    >
      <Pattern type={c.pattern} color={c.accentLine} />

      {/* Top accent line — only for oddity */}
      {isOddity && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${c.accentLine}, transparent)` }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        {isOddity && (
          <div className="text-xs tracking-[0.5em] uppercase mb-1" style={{ color: c.accentLine }}>
            ✦
          </div>
        )}
        <span
          className="font-black uppercase tracking-wider leading-none"
          style={{
            fontSize: isOddity ? '1.5rem' : '1.1rem',
            color: isOddity ? '#F5F0E8' : 'rgba(245,240,232,0.5)',
            letterSpacing: isOddity ? '0.15em' : '0.1em',
          }}
        >
          {c.label}
        </span>
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'rgba(245,240,232,0.2)' }}
        >
          {c.sub}
        </span>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${c.bg}, transparent)` }}
      />
    </div>
  )
}
