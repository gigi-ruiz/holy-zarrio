import { ArrowRight } from '@phosphor-icons/react'

type Variant = 'gold' | 'dark' | 'society'

interface HeroBannerProps {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  description?: string
  cta: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  variant: Variant
  size?: 'full' | 'compact'
}

const variantStyles: Record<Variant, {
  bg: string
  noise: string
  eyebrow: string
  title: string
  subtitle: string
  description: string
  ctaBg: string
  ctaText: string
  ctaHover: string
  divider: string
}> = {
  gold: {
    bg: 'bg-zarrio-black',
    noise: '0.035',
    eyebrow: 'text-brand-500 tracking-[0.3em]',
    title: 'text-zarrio-bone',
    subtitle: 'text-gray-400',
    description: 'text-gray-600',
    ctaBg: 'bg-brand-500',
    ctaText: 'text-zarrio-black',
    ctaHover: 'hover:bg-brand-400',
    divider: 'bg-brand-500',
  },
  dark: {
    bg: 'bg-zarrio-smoke',
    noise: '0.025',
    eyebrow: 'text-brand-500 tracking-[0.3em]',
    title: 'text-zarrio-bone',
    subtitle: 'text-gray-400',
    description: 'text-gray-600',
    ctaBg: 'bg-zarrio-bone',
    ctaText: 'text-zarrio-black',
    ctaHover: 'hover:bg-white',
    divider: 'bg-white/15',
  },
  society: {
    bg: 'bg-zarrio-dark',
    noise: '0.03',
    eyebrow: 'text-gray-500 tracking-[0.3em]',
    title: 'text-zarrio-bone',
    subtitle: 'text-gray-500',
    description: 'text-gray-700',
    ctaBg: 'bg-zarrio-bone',
    ctaText: 'text-zarrio-black',
    ctaHover: 'hover:bg-white',
    divider: 'bg-white/8',
  },
}

export default function HeroBanner({
  id, eyebrow, title, subtitle, description, cta, ctaSecondary, variant, size = 'full',
}: HeroBannerProps) {
  const s = variantStyles[variant]
  const heightClass = size === 'full' ? 'min-h-screen' : 'min-h-[75vh]'

  return (
    <section
      id={id}
      className={`relative flex flex-col items-center justify-center ${heightClass} px-6 text-center ${s.bg}`}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: s.noise,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-5">
        <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${s.eyebrow}`}>{eyebrow}</span>
        <div className={`w-10 h-px ${s.divider}`} />
        <h1 className={`font-cormorant font-bold tracking-wide uppercase leading-none ${s.title}`}
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}>
          {title}
        </h1>
        <p className={`text-lg md:text-xl font-light tracking-widest uppercase ${s.subtitle}`}
          style={{ letterSpacing: '0.2em' }}>
          {subtitle}
        </p>
        {description && (
          <p className={`text-sm leading-relaxed max-w-sm font-sans font-normal not-uppercase ${s.description}`}
            style={{ letterSpacing: 'normal', textTransform: 'none' }}>
            {description}
          </p>
        )}

        <div className="flex items-center gap-3 mt-2 flex-wrap justify-center">
          <a
            href={cta.href}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition-all ${s.ctaBg} ${s.ctaText} ${s.ctaHover} group`}
          >
            {cta.label}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          {ctaSecondary && (
            <a
              href={ctaSecondary.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold border border-white/10 text-gray-400 hover:text-zarrio-bone hover:border-white/20 transition-all"
            >
              {ctaSecondary.label}
            </a>
          )}
        </div>
      </div>

      {variant === 'gold' && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-brand-500/40 to-transparent" />
        </div>
      )}
    </section>
  )
}
