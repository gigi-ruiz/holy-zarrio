import { useId, useState } from 'react'
import { ArrowRight, CaretDown, Sparkle } from '@phosphor-icons/react'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import RarityBar from '@/components/ui/RarityBar'
import { ProductArt } from '@/components/ui/Art'
import { Parallax, Reveal, Section, Tilt } from '@/lib/motion'
import { catalog, type MockupStyle, type Series } from '@/data/catalog'

type Filter = 'all' | Series['category']

const filters: { id: Filter; label: string }[] = [
  { id: 'all',       label: 'Todo' },
  { id: 'blindbag',  label: 'Oddity' },
  { id: 'tcg',       label: 'Cartas' },
  { id: 'hotwheels', label: 'Hot Wheels' },
  { id: 'lego',      label: 'Bloques' },
  { id: 'funko',     label: 'Figuras' },
]

const stageBg: Record<MockupStyle, string> = {
  oddity:    'from-violet to-night',
  pokemon:   'from-pink to-violet',
  hotwheels: 'from-sun to-coral',
  lego:      'from-sky to-violet',
  funko:     'from-lime to-sky',
}

function Visual({ series, className }: { series: Series; className: string }) {
  if (series.photo) {
    return <img src={series.photo} alt={series.name} className={`${className} object-contain`} loading="lazy" />
  }
  return <ProductArt type={series.mockup} title={series.name} className={className} />
}

function SeriesCard({ series }: { series: Series }) {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const soldOut = series.id === 'oddity-s1'

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5">
      <div className={`relative grid h-72 place-items-center overflow-hidden bg-gradient-to-br ${stageBg[series.mockup]}`}>
        <div aria-hidden="true" className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/25 blur-xl" />
        <Tilt max={14} className="w-36">
          <div className={soldOut ? 'grayscale' : ''}>
            <Visual series={series} className="w-full drop-shadow-[0_20px_20px_rgba(0,0,0,.4)] transition-transform duration-300 group-hover:scale-105" />
          </div>
        </Tilt>

        <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
          {soldOut && <Badge preset="soldout" />}
          {series.isExclusive && !soldOut && <Badge preset="exclusive" />}
          {series.isNew && !soldOut && <Badge preset="new" />}
          {series.isHot && !soldOut && <Badge preset="hot" />}
        </div>

        <p className="absolute bottom-4 right-4 rounded-full bg-night px-4 py-1.5 text-cream">
          <span className="text-lg font-black">{series.price.toFixed(2)} €</span>
          <span className="ml-1 text-sm"> / tirada</span>
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="font-semibold text-mute">{series.brand}</p>
          <h3 className="text-2xl font-black text-ink">{series.name}</h3>
        </div>
        <p className="text-ink/90">{series.description}</p>
        <p className="flex items-center gap-2 font-semibold text-ink">
          <Sparkle size={16} weight="fill" className="text-accent" aria-hidden="true" />
          {series.itemsInSeries} items en la serie
        </p>

        <div className="mt-auto border-t-2 border-ink/10 pt-4">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="flex min-h-11 w-full items-center justify-between rounded-xl font-bold text-ink"
          >
            Tasas de aparición
            <CaretDown size={18} weight="bold" aria-hidden="true" className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
          <div id={panelId} hidden={!expanded} className="pt-3">
            <RarityBar tiers={series.rarityTiers} />
          </div>
        </div>
      </div>
    </article>
  )
}

/* Bloque destacado: siempre oscuro y dorado, como un sobre Oddity gigante */
function OddityFeature() {
  const s2 = catalog.find((s) => s.id === 'oddity-s2')!

  return (
    <div className="on-night relative overflow-hidden rounded-[2rem] border-2 border-night bg-night text-cream">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(255,122,198,.35),transparent_55%),radial-gradient(circle_at_20%_90%,rgba(124,77,255,.45),transparent_50%)]" />

      <div className="relative grid items-center gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-14">
        <div className="flex flex-col items-start gap-6">
          <div className="flex gap-2">
            <Badge preset="exclusive" />
            <Badge preset="hot" />
          </div>
          <h3 className="font-black italic text-sun" style={{ fontSize: 'clamp(3.5rem, 9vw, 6.5rem)' }}>
            Oddity
          </h3>
          <p className="max-w-md text-xl text-cream">
            Nuestras blind bags. Solo existen en las máquinas Holy Zarrio. {s2.itemsInSeries} objetos por serie: raros,
            innecesarios, perfectos. Y un Hidden que nadie ha encontrado todavía.
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li><span className="block text-3xl font-black">{s2.price.toFixed(2)} €</span><span className="text-cream/90">por tirada</span></li>
            <li><span className="block text-3xl font-black">{s2.itemsInSeries}</span><span className="text-cream/90">items por serie</span></li>
            <li><span className="block text-3xl font-black">2</span><span className="text-cream/90">series activas</span></li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <a href="#rarities" className="btn bg-sun text-night hover:bg-cream">
              <Sparkle size={18} weight="fill" aria-hidden="true" />
              Ver tasas de rareza
            </a>
            <a href="#machines" className="btn border-2 border-cream text-cream hover:bg-cream hover:text-night">
              Dónde encontrarla
            </a>
          </div>
        </div>

        <Parallax speed={-0.08} rotate={0.4} className="mx-auto w-56 md:w-72">
          <Tilt max={14}>
            <ProductArt type="oddity" title="Blind bag Oddity Series 2" className="w-full drop-shadow-[0_30px_40px_rgba(255,200,61,.35)]" />
          </Tilt>
        </Parallax>
      </div>
    </div>
  )
}

export default function CatalogSection() {
  const [active, setActive] = useState<Filter>('all')
  const filtered = active === 'all' ? catalog : catalog.filter((s) => s.category === active)

  return (
    <Section id="catalog" mood="catalog" labelledBy="catalog-title" className="px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader id="catalog-title" eyebrow="Qué hay dentro" title="El catálogo" subtitle="Todo lo que puedes encontrar en las máquinas." />
          <a href="#machines" className="inline-flex shrink-0 items-center gap-2 self-start py-2 font-bold text-ink underline decoration-2 underline-offset-4 hover:text-accent">
            Ver máquinas cercanas <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal><OddityFeature /></Reveal>

        <div role="group" aria-label="Filtrar por tipo" className="scrollbar-hide -mb-4 flex gap-2 overflow-x-auto pb-2 pt-1">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className={`min-h-11 shrink-0 rounded-full border-2 border-ink px-5 font-bold transition-colors ${
                active === f.id ? 'bg-ink text-canvas' : 'bg-surface/70 text-ink hover:bg-raised'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((series, i) => (
            <li key={series.id}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <SeriesCard series={series} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="card flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xl font-black text-ink">¿Tienes un local?</p>
              <p className="text-mute">Ponemos una máquina. Tú te llevas parte de cada tirada.</p>
            </div>
            <a href="mailto:hola@holyzarrio.com" className="btn btn-primary shrink-0">
              Hablemos <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
