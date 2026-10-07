import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowCounterClockwise, HandGrabbing } from '@phosphor-icons/react'
import SectionHeader from '@/components/ui/SectionHeader'
import { ProductArt, TradingCard, type CardVariant } from '@/components/ui/Art'
import { Reveal, Section, Tilt, useReducedMotion } from '@/lib/motion'
import { catalog, type Series } from '@/data/catalog'

/* Nombres de los objetos por rareza (de más común a más rara) */
const names: Record<string, string[]> = {
  'oddity-s2': ['La cuchara que mira', 'Mano de gnomo', 'Moneda sin cara', 'Zarrio Santo'],
  'pkm-sv': ['Energía básica', 'Entrenadora', 'Full Art', 'Ilustración especial', 'Carta dorada'],
  'hw-premium': ['Coche estándar', 'Premium ruedas de goma', 'Super Treasure Hunt', 'Treasure Hunt'],
  'lego-cmf25': ['Figura base', 'Figura rara', 'Figura secreta'],
  'funko-mystery': ['Mini común', 'Mini poco común', 'Mini raro', 'Chase'],
}

const cardVariants: CardVariant[] = ['classic', 'classic', 'holo', 'holo', 'gold']
const pool = catalog.filter((s) => s.id !== 'oddity-s1')

type Phase = 'idle' | 'shaking' | 'opened'

interface Pull {
  tierIndex: number
  tier: string
  pct: number
  name: string
  variant: CardVariant
  rare: boolean
}

function roll(series: Series): Pull {
  const tiers = series.rarityTiers
  const total = tiers.reduce((a, t) => a + t.pct, 0)
  let r = Math.random() * total
  let tierIndex = tiers.length - 1
  for (let i = 0; i < tiers.length; i++) {
    r -= tiers[i].pct
    if (r < 0) {
      tierIndex = i
      break
    }
  }
  const last = tiers.length - 1
  const t = tiers[tierIndex]
  const variantIdx = last === 0 ? 0 : Math.round((tierIndex * 4) / last)
  const itemNames = names[series.id] ?? []
  return {
    tierIndex,
    tier: t.label,
    pct: t.pct,
    name: itemNames[tierIndex] ?? t.label,
    variant: series.id === 'oddity-s2' && tierIndex === last ? 'night' : cardVariants[variantIdx],
    rare: tierIndex >= last - 1 && last > 0,
  }
}

function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        x: `${(Math.random() - 0.5) * 460}px`,
        y: `${-80 - Math.random() * 260}px`,
        rot: `${Math.random() * 720 - 360}deg`,
        color: ['#FFC83D', '#FF7AC6', '#4FD8EB', '#C8F169', '#FF6B57'][i % 5],
        delay: `${Math.random() * 0.15}s`,
      })),
    [],
  )
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
      {bits.map((b, i) => (
        <span
          key={i}
          className="absolute h-3 w-2 animate-confetti rounded-sm"
          style={{ background: b.color, animationDelay: b.delay, '--x': b.x, '--y': b.y, '--rot': b.rot } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

export default function PackOpener() {
  const reduced = useReducedMotion()
  const [seriesId, setSeriesId] = useState(pool[0].id)
  const [phase, setPhase] = useState<Phase>('idle')
  const [pull, setPull] = useState<Pull | null>(null)
  const [count, setCount] = useState(0)
  const timer = useRef<number>()
  const series = pool.find((s) => s.id === seriesId)!

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const choose = (id: string) => {
    window.clearTimeout(timer.current)
    setSeriesId(id)
    setPhase('idle')
    setPull(null)
  }

  const open = () => {
    if (phase === 'shaking') return
    const result = roll(series)
    setPull(null)
    setCount((c) => c + 1)
    if (reduced) {
      setPull(result)
      setPhase('opened')
      return
    }
    setPhase('shaking')
    timer.current = window.setTimeout(() => {
      setPull(result)
      setPhase('opened')
    }, 750)
  }

  const reset = () => {
    setPhase('idle')
    setPull(null)
  }

  return (
    <Section id="opener" mood="opener" labelledBy="opener-title" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="flex flex-col gap-8">
          <SectionHeader
            id="opener-title"
            eyebrow="Pruébalo sin gastar"
            title="Tira de la palanca"
            subtitle="Elige una serie y ábrela. Las probabilidades son las reales de cada máquina, así que sí, el Hidden existe, pero tendrás que ganártelo."
          />

          <div role="group" aria-label="Elige una serie" className="flex flex-wrap gap-2">
            {pool.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={seriesId === s.id}
                onClick={() => choose(s.id)}
                className={`min-h-11 rounded-full border-2 px-5 font-bold transition-colors ${
                  seriesId === s.id
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-ink bg-surface/70 text-ink hover:bg-raised'
                }`}
              >
                {s.name.split('—')[0].trim()}
              </button>
            ))}
          </div>

          <p className="text-mute">
            Tiradas en esta sesión: <strong className="text-ink tabular-nums">{count}</strong>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="card relative mx-auto flex min-h-[480px] max-w-md flex-col items-center justify-between gap-6 overflow-hidden px-6 pb-8 pt-10">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-pink via-sun to-sky" />

            <div className="relative grid h-72 w-52 place-items-center">
              {phase === 'opened' && pull ? (
                <>
                  {pull.rare && !reduced && <Confetti />}
                  <div className="animate-rise w-full">
                    <Tilt max={14}>
                      <TradingCard variant={pull.variant} name={pull.name} tier={pull.tier} className="w-full drop-shadow-[0_24px_24px_rgba(0,0,0,.35)]" />
                    </Tilt>
                  </div>
                </>
              ) : (
                <div className={phase === 'shaking' ? 'animate-shake' : 'animate-bob'}>
                  <ProductArt type={series.mockup} title={`Sobre cerrado de ${series.name}`} className="w-44 drop-shadow-[0_24px_24px_rgba(0,0,0,.35)]" />
                </div>
              )}
            </div>

            <div aria-live="polite" className="min-h-[3.5rem] text-center">
              {phase === 'shaking' && <p className="font-semibold text-ink">Abriendo…</p>}
              {phase === 'opened' && pull && (
                <>
                  <p className="font-display text-2xl font-black text-ink">{pull.name}</p>
                  <p className="text-mute">
                    Rareza <strong className="text-ink">{pull.tier}</strong> · sale en el {pull.pct}% de las tiradas
                    {pull.rare ? '. ¡Qué suerte!' : ''}
                  </p>
                </>
              )}
              {phase === 'idle' && <p className="text-mute">{series.name} · {series.price.toFixed(2)} € la tirada</p>}
            </div>

            {phase === 'opened' ? (
              <button type="button" onClick={reset} className="btn btn-ghost">
                <ArrowCounterClockwise size={20} weight="bold" aria-hidden="true" />
                Otro sobre
              </button>
            ) : (
              <button type="button" onClick={open} disabled={phase === 'shaking'} className="btn btn-primary text-lg disabled:opacity-80">
                <HandGrabbing size={22} weight="fill" aria-hidden="true" />
                Abrir sobre
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
