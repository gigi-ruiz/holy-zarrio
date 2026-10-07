import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(m.matches)
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/* Un único listener de scroll para todo el sitio, throttled con rAF */
const subscribers = new Set<() => void>()
let ticking = false
let bound = false

function tick() {
  ticking = false
  document.documentElement.style.setProperty('--sy', String(window.scrollY))
  subscribers.forEach((fn) => fn())
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(tick)
}

export function subscribeScroll(fn: () => void) {
  subscribers.add(fn)
  if (!bound) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    bound = true
  }
  fn()
  return () => {
    subscribers.delete(fn)
  }
}

interface ParallaxProps {
  /** Positivo: se queda atrás (lejano). Negativo: sube más rápido (cercano). */
  speed?: number
  /** Grados de giro por cada 100px de desplazamiento */
  rotate?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}

export function Parallax({ speed = 0.1, rotate = 0, className = '', style, children }: ParallaxProps) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    return subscribeScroll(() => {
      const o = outer.current
      const i = inner.current
      if (!o || !i) return
      const r = o.getBoundingClientRect()
      if (r.bottom < -500 || r.top > window.innerHeight + 500) return
      const d = r.top + r.height / 2 - window.innerHeight / 2
      i.style.transform = `translate3d(0, ${(-d * speed).toFixed(1)}px, 0) rotate(${((d * rotate) / 100).toFixed(2)}deg)`
    })
  }, [speed, rotate, reduced])

  return (
    <div ref={outer} className={className} style={style}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

/* Inclinación 3D con brillo siguiendo el puntero. Decorativo: no cambia el contenido. */
export function Tilt({
  children,
  max = 10,
  className = '',
  glare = true,
}: {
  children: ReactNode
  max?: number
  className?: string
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || reduced || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${((0.5 - y) * max * 2).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${((x - 0.5) * max * 2).toFixed(2)}deg`)
    el.style.setProperty('--mx', `${(x * 100).toFixed(0)}%`)
    el.style.setProperty('--my', `${(y * 100).toFixed(0)}%`)
    if (glare) el.style.setProperty('--glare', '1')
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--glare', '0')
  }

  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  )
}

/* Sección que cambia el "ánimo" del fondo dinámico al entrar en pantalla */
export function Section({
  id,
  mood,
  className = '',
  labelledBy,
  children,
}: {
  id: string
  mood: string
  className?: string
  labelledBy: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) document.documentElement.dataset.mood = mood
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mood])

  return (
    <section id={id} ref={ref} aria-labelledby={labelledBy} className={`relative scroll-mt-20 ${className}`}>
      {children}
    </section>
  )
}

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? value : 0)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !('IntersectionObserver' in window)) {
      setN(value)
      return
    }
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const step = (t: number) => {
        const p = Math.min((t - start) / 1400, 1)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, reduced])

  return (
    <span ref={ref}>
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden="true">{n}{suffix}</span>
    </span>
  )
}
