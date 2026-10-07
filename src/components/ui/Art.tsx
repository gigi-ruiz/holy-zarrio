import { useId } from 'react'
import type { MockupStyle } from '@/data/catalog'

/*
  Ilustraciones vectoriales de producto (sobres, cartas, blísters, bolsas, cajas).
  Son genéricas a propósito: no copian logos ni personajes de ninguna marca.
  Para usar fotos reales, rellena `photo` en src/data/catalog.ts.
*/

const FONT = 'Fraunces, Georgia, serif'

function star(cx: number, cy: number, r1: number, r2: number, n: number) {
  return Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 === 0 ? r1 : r2
    const a = (Math.PI * i) / n - Math.PI / 2
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

function zig(x1: number, x2: number, y: number, amp: number, step = 5) {
  let d = ''
  let up = true
  const dir = x2 >= x1 ? 1 : -1
  for (let x = x1; dir > 0 ? x <= x2 : x >= x2; x += step * dir) {
    d += ` L${x} ${up ? y : y + amp}`
    up = !up
  }
  return d
}

function sparkle(cx: number, cy: number, s: number) {
  return `M${cx} ${cy - s} Q${cx} ${cy} ${cx + s} ${cy} Q${cx} ${cy} ${cx} ${cy + s} Q${cx} ${cy} ${cx - s} ${cy} Q${cx} ${cy} ${cx} ${cy - s}Z`
}

function Defs({ id, clip }: { id: string; clip: string }) {
  return (
    <defs>
      <linearGradient id={`${id}s`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset=".5" stopColor="#fff" stopOpacity=".65" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <clipPath id={`${id}c`}>
        <path d={clip} />
      </clipPath>
    </defs>
  )
}

function Sheen({ id }: { id: string }) {
  return (
    <g clipPath={`url(#${id}c)`}>
      <g transform="skewX(-18)">
        <rect className="sheen" x="-40" y="-10" width="46" height="330" fill={`url(#${id}s)`} />
      </g>
    </g>
  )
}

/* ---------- Sobre de cartas ---------- */
function Booster({ id }: { id: string }) {
  const body = `M18 8${zig(18, 182, 8, 5)} L182 292${zig(182, 18, 287, 5)} Z`
  return (
    <>
      <Defs id={id} clip={body} />
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C4DFF" />
          <stop offset=".55" stopColor="#FF7AC6" />
          <stop offset="1" stopColor="#FFC83D" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="294" rx="70" ry="5" fill="#000" opacity=".25" />
      <g clipPath={`url(#${id}c)`}>
        <rect x="14" y="4" width="172" height="292" fill={`url(#${id}g)`} />
        <polygon points={star(100, 150, 120, 62, 14)} fill="#fff" opacity=".22" />
        <polygon points={star(100, 150, 78, 44, 10)} fill="#fff" opacity=".2" />
        <circle cx="100" cy="150" r="40" fill="#1B1030" stroke="#FFF7EC" strokeWidth="4" />
        <polygon points={star(100, 150, 25, 11, 5)} fill="#FFC83D" />
        <text x="100" y="236" textAnchor="middle" fontFamily={FONT} fontWeight="900" fontSize="32" fill="#fff" stroke="#1B1030" strokeWidth="5" paintOrder="stroke">
          Booster
        </text>
        <text x="100" y="258" textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="12" fill="#1B1030">
          10 cartas · 1 holo
        </text>
        <rect x="14" y="4" width="172" height="30" fill="#1B1030" opacity=".22" />
        <rect x="14" y="266" width="172" height="30" fill="#1B1030" opacity=".22" />
        {Array.from({ length: 33 }, (_, i) => (
          <g key={i}>
            <line x1={18 + i * 5} x2={18 + i * 5} y1="6" y2="34" stroke="#fff" strokeOpacity=".28" />
            <line x1={18 + i * 5} x2={18 + i * 5} y1="266" y2="294" stroke="#fff" strokeOpacity=".28" />
          </g>
        ))}
      </g>
      <Sheen id={id} />
    </>
  )
}

/* ---------- Blind bag Oddity ---------- */
function Oddity({ id }: { id: string }) {
  const body = `M22 12${zig(22, 178, 12, 6, 6)} L184 290 Q100 300 16 290 Z`
  return (
    <>
      <Defs id={id} clip={body} />
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B1E78" />
          <stop offset="1" stopColor="#0C0620" />
        </linearGradient>
        <linearGradient id={`${id}o`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE08A" />
          <stop offset="1" stopColor="#FF9F1C" />
        </linearGradient>
        <radialGradient id={`${id}i`}>
          <stop offset="0" stopColor="#FF7AC6" />
          <stop offset="1" stopColor="#7C4DFF" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="296" rx="72" ry="5" fill="#000" opacity=".3" />
      <path d={body} fill={`url(#${id}g)`} stroke={`url(#${id}o)`} strokeWidth="3" />
      <g clipPath={`url(#${id}c)`}>
        {Array.from({ length: 24 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 24
          return (
            <line key={i} x1={100 + Math.cos(a) * 56} y1={140 + Math.sin(a) * 56} x2={100 + Math.cos(a) * 92} y2={140 + Math.sin(a) * 92} stroke={`url(#${id}o)`} strokeWidth="2.5" strokeLinecap="round" opacity=".7" />
          )
        })}
        <rect x="20" y="12" width="164" height="26" fill="#FFC83D" opacity=".18" />
        <path d="M44 140 Q100 82 156 140 Q100 198 44 140 Z" fill="#FFF7EC" stroke={`url(#${id}o)`} strokeWidth="3" />
        <circle cx="100" cy="140" r="21" fill={`url(#${id}i)`} />
        <circle cx="100" cy="140" r="8" fill="#0C0620" />
        <circle cx="106" cy="133" r="3.5" fill="#fff" />
        {[[40, 70, 8], [160, 82, 6], [34, 214, 5], [168, 204, 8], [150, 56, 4]].map(([x, y, s], i) => (
          <path key={i} d={sparkle(x, y, s)} fill="#FFD76A" />
        ))}
        <text x="100" y="244" textAnchor="middle" fontFamily={FONT} fontStyle="italic" fontWeight="900" fontSize="38" fill={`url(#${id}o)`}>
          Oddity
        </text>
        <text x="100" y="266" textAnchor="middle" fontFamily={FONT} fontSize="12" fontWeight="600" fill="#E8D9FF">
          worship the weird
        </text>
      </g>
      <Sheen id={id} />
    </>
  )
}

/* ---------- Blíster de coche de metal ---------- */
function HotWheels({ id }: { id: string }) {
  const body = 'M14 16 Q14 8 22 8 L178 8 Q186 8 186 16 L186 284 Q186 292 178 292 L22 292 Q14 292 14 284 Z'
  return (
    <>
      <Defs id={id} clip={body} />
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF9A1F" />
          <stop offset="1" stopColor="#E5251B" />
        </linearGradient>
        <pattern id={`${id}p`} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#fff" />
          <rect x="8" y="8" width="8" height="8" fill="#fff" />
          <rect x="8" width="8" height="8" fill="#1B1030" />
          <rect y="8" width="8" height="8" fill="#1B1030" />
        </pattern>
      </defs>
      <ellipse cx="100" cy="296" rx="72" ry="5" fill="#000" opacity=".25" />
      <g clipPath={`url(#${id}c)`}>
        <rect x="14" y="8" width="172" height="284" fill={`url(#${id}g)`} />
        <rect x="14" y="8" width="172" height="16" fill={`url(#${id}p)`} />
        <path d="M14 250 Q40 214 62 246 Q78 196 104 240 Q126 200 146 244 Q166 218 186 250 L186 292 L14 292Z" fill="#FFC83D" />
        <path d="M14 270 Q44 244 66 268 Q88 238 112 268 Q140 244 186 272 L186 292 L14 292Z" fill="#FFF7EC" opacity=".9" />
        <text x="28" y="56" fontFamily={FONT} fontStyle="italic" fontWeight="900" fontSize="26" fill="#fff" stroke="#1B1030" strokeWidth="5" paintOrder="stroke">
          Premium
        </text>
        <text x="28" y="76" fontFamily={FONT} fontWeight="700" fontSize="12" fill="#fff">
          Serie coleccionista
        </text>
        <rect x="26" y="90" width="148" height="116" rx="28" fill="#fff" fillOpacity=".25" stroke="#fff" strokeWidth="2.5" />
        <g transform="translate(32 126) scale(1.02)">
          <path d="M6 46 L22 34 Q42 14 78 14 L106 14 Q124 14 134 30 L152 35 Q164 38 164 48 L164 56 L6 56Z" fill="#19C3E6" stroke="#1B1030" strokeWidth="3" strokeLinejoin="round" />
          <path d="M38 34 Q50 22 78 22 L84 22 L84 34Z M92 22 L106 22 Q116 24 122 34 L92 34Z" fill="#1B1030" opacity=".85" />
          <rect x="150" y="40" width="10" height="6" rx="2" fill="#FFE08A" />
          <path d="M6 44 L30 44" stroke="#FF7AC6" strokeWidth="4" strokeLinecap="round" />
          {[36, 130].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="58" r="13" fill="#1B1030" />
              <circle cx={cx} cy="58" r="6" fill="#D9D2EA" />
            </g>
          ))}
        </g>
        <circle cx="156" cy="226" r="15" fill="#1B1030" />
        <path d="M156 214 Q164 224 158 232 Q152 236 150 228 Q150 222 156 214Z" fill="#FFC83D" />
      </g>
      <Sheen id={id} />
    </>
  )
}

/* ---------- Bolsa de minifigura de bloques ---------- */
function Bricks({ id }: { id: string }) {
  const body = `M24 18${zig(24, 176, 18, 5)} L176 288 Q100 296 24 288 Z`
  return (
    <>
      <Defs id={id} clip={body} />
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF6FF" />
          <stop offset="1" stopColor="#B9DDF7" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="294" rx="68" ry="5" fill="#000" opacity=".25" />
      <path d={body} fill={`url(#${id}g)`} stroke="#fff" strokeWidth="2" />
      <g clipPath={`url(#${id}c)`}>
        <rect x="24" y="24" width="152" height="48" fill="#2A63FF" />
        <text x="100" y="46" textAnchor="middle" fontFamily={FONT} fontWeight="900" fontSize="19" fill="#fff">
          Mini figuras
        </text>
        <text x="100" y="63" textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="12" fill="#FFE08A">
          Serie 25 · ¡sorpresa!
        </text>
        <path d="M100 66 L136 118 L64 118Z" fill="#FF7AC6" stroke="#1B1030" strokeWidth="3" strokeLinejoin="round" transform="translate(0 -12)" />
        <circle cx="100" cy="56" r="6" fill="#FFC83D" stroke="#1B1030" strokeWidth="2.5" />
        <rect x="92" y="94" width="16" height="9" rx="3" fill="#FFD21F" stroke="#1B1030" strokeWidth="3" />
        <rect x="78" y="100" width="44" height="34" rx="12" fill="#FFD21F" stroke="#1B1030" strokeWidth="3" />
        <circle cx="91" cy="116" r="3.2" fill="#1B1030" />
        <circle cx="109" cy="116" r="3.2" fill="#1B1030" />
        <path d="M91 125 Q100 132 109 125" stroke="#1B1030" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="58" y="140" width="14" height="46" rx="7" fill="#7C4DFF" stroke="#1B1030" strokeWidth="3" />
        <rect x="128" y="140" width="14" height="46" rx="7" fill="#7C4DFF" stroke="#1B1030" strokeWidth="3" />
        <circle cx="65" cy="192" r="8" fill="#FFD21F" stroke="#1B1030" strokeWidth="3" />
        <circle cx="135" cy="192" r="8" fill="#FFD21F" stroke="#1B1030" strokeWidth="3" />
        <path d="M74 134 L126 134 L130 192 L70 192Z" fill="#7C4DFF" stroke="#1B1030" strokeWidth="3" strokeLinejoin="round" />
        <polygon points={star(100, 162, 12, 5, 5)} fill="#FFC83D" />
        <rect x="74" y="192" width="52" height="14" rx="3" fill="#1B1030" />
        <rect x="74" y="204" width="24" height="46" rx="5" fill="#2A63FF" stroke="#1B1030" strokeWidth="3" />
        <rect x="102" y="204" width="24" height="46" rx="5" fill="#2A63FF" stroke="#1B1030" strokeWidth="3" />
        <rect x="70" y="246" width="30" height="14" rx="5" fill="#1B1030" />
        <rect x="100" y="246" width="30" height="14" rx="5" fill="#1B1030" />
        <path d="M34 90 L52 98 M30 150 L48 146 M158 108 L172 118 M154 232 L170 226" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".8" />
        <rect x="24" y="18" width="152" height="10" fill="#fff" opacity=".35" />
      </g>
      <Sheen id={id} />
    </>
  )
}

/* ---------- Caja con ventana ---------- */
function Mystery({ id }: { id: string }) {
  const body = 'M26 22 Q26 12 36 12 L164 12 Q174 12 174 22 L174 280 Q174 290 164 290 L36 290 Q26 290 26 280 Z'
  return (
    <>
      <Defs id={id} clip={body} />
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF7AC6" />
          <stop offset="1" stopColor="#7C4DFF" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="296" rx="66" ry="5" fill="#000" opacity=".25" />
      <g clipPath={`url(#${id}c)`}>
        <rect x="26" y="12" width="148" height="278" fill={`url(#${id}g)`} />
        {[[44, 30], [152, 38], [60, 46], [140, 24]].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontFamily={FONT} fontWeight="900" fontSize="20" fill="#FFF7EC" opacity=".85">?</text>
        ))}
        <text x="100" y="52" textAnchor="middle" fontFamily={FONT} fontWeight="900" fontSize="20" fill="#fff" stroke="#1B1030" strokeWidth="5" paintOrder="stroke">
          Mini misterio
        </text>
        <rect x="40" y="66" width="120" height="176" rx="14" fill="#F4EEFF" stroke="#1B1030" strokeWidth="3" />
        <ellipse cx="100" cy="228" rx="38" ry="8" fill="#1B1030" opacity=".18" />
        <path d="M70 100 L62 72 L88 90Z M130 100 L138 72 L112 90Z" fill="#1B1030" stroke="#1B1030" strokeWidth="3" strokeLinejoin="round" />
        <rect x="64" y="88" width="72" height="66" rx="26" fill="#FFE0C2" stroke="#1B1030" strokeWidth="3.5" />
        <circle cx="84" cy="122" r="7" fill="#1B1030" />
        <circle cx="116" cy="122" r="7" fill="#1B1030" />
        <circle cx="86.5" cy="119.5" r="2.4" fill="#fff" />
        <circle cx="118.5" cy="119.5" r="2.4" fill="#fff" />
        <ellipse cx="72" cy="136" rx="6" ry="3.5" fill="#FF7AC6" opacity=".7" />
        <ellipse cx="128" cy="136" rx="6" ry="3.5" fill="#FF7AC6" opacity=".7" />
        <path d="M95 138 Q100 142 105 138" stroke="#1B1030" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="76" y="152" width="48" height="50" rx="12" fill="#FF6B57" stroke="#1B1030" strokeWidth="3.5" />
        <rect x="70" y="200" width="22" height="22" rx="8" fill="#1B1030" />
        <rect x="108" y="200" width="22" height="22" rx="8" fill="#1B1030" />
        <rect x="40" y="252" width="120" height="26" rx="8" fill="#FFC83D" stroke="#1B1030" strokeWidth="3" />
        <text x="100" y="270" textAnchor="middle" fontFamily={FONT} fontWeight="900" fontSize="14" fill="#1B1030">
          24 figuras · ¿chase?
        </text>
      </g>
      <Sheen id={id} />
    </>
  )
}

const labels: Record<MockupStyle, string> = {
  oddity: 'Blind bag Oddity',
  pokemon: 'Sobre de cartas coleccionables',
  hotwheels: 'Coche de metal en blíster',
  lego: 'Bolsa de minifigura de bloques',
  funko: 'Caja de figura sorpresa',
}

export function ProductArt({
  type,
  title,
  className = '',
}: {
  type: MockupStyle
  title?: string | false
  className?: string
}) {
  const id = useId().replace(/:/g, '')
  const label = title === false ? undefined : (title ?? labels[type])
  const Art = { oddity: Oddity, pokemon: Booster, hotwheels: HotWheels, lego: Bricks, funko: Mystery }[type]
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <Art id={id} />
    </svg>
  )
}

/* ---------- Carta coleccionable ---------- */
export type CardVariant = 'classic' | 'holo' | 'gold' | 'night'

const cardPalette: Record<CardVariant, { frame: string[]; paper: string; artA: string; artB: string; ink: string }> = {
  classic: { frame: ['#FFD24A', '#FF9F1C'], paper: '#FFF4D6', artA: '#7FE0F2', artB: '#B7F08A', ink: '#1B1030' },
  holo: { frame: ['#8EE8FF', '#B58CFF'], paper: '#F1EAFF', artA: '#7C4DFF', artB: '#FF7AC6', ink: '#1B1030' },
  gold: { frame: ['#FFE9A0', '#E8A200'], paper: '#FFF1BF', artA: '#FF9F1C', artB: '#FF4F7B', ink: '#1B1030' },
  night: { frame: ['#FF7AC6', '#7C4DFF'], paper: '#241247', artA: '#1B1030', artB: '#7C4DFF', ink: '#FFF7EC' },
}

export function TradingCard({
  variant = 'classic',
  name,
  tier,
  className = '',
}: {
  variant?: CardVariant
  name: string
  tier: string
  className?: string
}) {
  const id = useId().replace(/:/g, '')
  const p = cardPalette[variant]
  const clip = 'M12 0 H188 Q200 0 200 12 V268 Q200 280 188 280 H12 Q0 280 0 268 V12 Q0 0 12 0Z'
  const foil = variant !== 'classic'
  return (
    <svg viewBox="0 0 200 280" className={className} role="img" aria-label={`Carta ${tier}: ${name}`} focusable="false">
      <Defs id={id} clip={clip} />
      <defs>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.frame[0]} />
          <stop offset="1" stopColor={p.frame[1]} />
        </linearGradient>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.artA} />
          <stop offset="1" stopColor={p.artB} />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF4F7B" stopOpacity=".55" />
          <stop offset=".35" stopColor="#FFC83D" stopOpacity=".55" />
          <stop offset=".65" stopColor="#4FD8EB" stopOpacity=".55" />
          <stop offset="1" stopColor="#B58CFF" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <path d={clip} fill={`url(#${id}f)`} />
      <g clipPath={`url(#${id}c)`}>
        <rect x="9" y="9" width="182" height="262" rx="8" fill={p.paper} />
        <text x="18" y="31" fontFamily={FONT} fontWeight="900" fontSize="15" fill={p.ink}>
          {name.length > 20 ? `${name.slice(0, 19)}…` : name}
        </text>
        <rect x="16" y="40" width="168" height="124" rx="6" fill={`url(#${id}a)`} stroke={p.ink} strokeWidth="2.5" />
        {foil && (
          <g clipPath={`url(#${id}c)`}>
            <rect x="16" y="40" width="168" height="124" fill={`url(#${id}r)`} style={{ mixBlendMode: 'color-dodge' }} />
          </g>
        )}
        <circle cx="146" cy="68" r="14" fill="#FFF7EC" opacity=".85" />
        <path d="M16 140 L56 96 L86 128 L116 90 L184 150 L184 164 L16 164Z" fill={p.ink} opacity=".28" />
        <polygon points={star(100, 106, 34, 15, 8)} fill="#FFF7EC" opacity=".9" />
        <circle cx="100" cy="106" r="20" fill={p.ink} />
        <circle cx="93" cy="103" r="4" fill="#FFF7EC" />
        <circle cx="107" cy="103" r="4" fill="#FFF7EC" />
        <path d="M92 114 Q100 121 108 114" stroke="#FFF7EC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d={sparkle(34, 62, 7)} fill="#FFF7EC" />
        <path d={sparkle(170, 130, 5)} fill="#FFF7EC" />
        <rect x="16" y="174" width="100" height="22" rx="11" fill={p.ink} />
        <text x="66" y="189" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="12" fill={p.paper}>
          {tier}
        </text>
        {[210, 224, 238].map((y, i) => (
          <rect key={y} x="18" y={y} width={150 - i * 28} height="7" rx="3.5" fill={p.ink} opacity=".22" />
        ))}
        <circle cx="168" cy="252" r="12" fill={p.ink} />
        <polygon points={star(168, 252, 8, 3.5, 5)} fill="#FFC83D" />
        {foil && (
          <rect x="9" y="9" width="182" height="262" fill={`url(#${id}r)`} style={{ mixBlendMode: 'soft-light' }} />
        )}
      </g>
      <Sheen id={id} />
    </svg>
  )
}
