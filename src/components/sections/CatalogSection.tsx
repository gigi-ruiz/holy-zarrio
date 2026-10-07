import { useState } from 'react'
import { Star, ArrowRight, Sparkle } from '@phosphor-icons/react'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import RarityBar from '@/components/ui/RarityBar'
import ProductMockup from '@/components/ui/ProductMockup'
import { catalog, type Series } from '@/data/catalog'

type Filter = 'all' | 'tcg' | 'hotwheels' | 'blindbag' | 'lego' | 'funko'

const filters: { id: Filter; label: string }[] = [
  { id: 'all',       label: 'Todo' },
  { id: 'blindbag',  label: 'Oddity' },
  { id: 'tcg',       label: 'TCG' },
  { id: 'hotwheels', label: 'Hot Wheels' },
  { id: 'lego',      label: 'LEGO' },
  { id: 'funko',     label: 'Funko' },
]

function SeriesCard({ series }: { series: Series }) {
  const [expanded, setExpanded] = useState(false)
  const isSoldOut = series.id === 'oddity-s1'

  return (
    <div className={`group flex flex-col bg-zarrio-smoke border rounded-2xl overflow-hidden transition-all duration-300 ${
      isSoldOut
        ? 'border-white/5 opacity-60'
        : 'border-white/5 hover:border-white/12 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30'
    }`}>
      <div className="relative h-52 overflow-hidden">
        <ProductMockup type={series.mockup} isNew={series.isNew} isHot={series.isHot} />
        {isSoldOut && (
          <div className="absolute inset-0 bg-zarrio-black/60 flex items-center justify-center">
            <Badge preset="soldout" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          {series.isExclusive && !isSoldOut && <Badge preset="exclusive" />}
          {series.isNew       && !isSoldOut && <Badge preset="new" />}
          {series.isHot       && !isSoldOut && <Badge preset="hot" />}
        </div>
        <div className="absolute bottom-0 right-0 z-20">
          <div className="px-4 py-2 bg-zarrio-black/95 rounded-tl-xl border-t border-l border-white/10">
            <span className="text-base font-black text-zarrio-bone">{series.price.toFixed(2)}€</span>
            <span className="text-xs text-gray-600 ml-1">/ tirada</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">{series.brand}</span>
          <h3 className="text-base font-bold text-zarrio-bone leading-snug">{series.name}</h3>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{series.description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Star size={11} weight="fill" className="text-brand-600" />
          <span>{series.itemsInSeries} items en la serie</span>
        </div>
        <div className="border-t border-white/5 pt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 hover:text-zarrio-bone transition-colors group/btn"
          >
            <span>Tasas de aparición</span>
            <span className="flex items-center gap-1 text-brand-500 group-hover/btn:text-brand-400">
              {expanded ? 'Ocultar' : 'Ver'} <ArrowRight size={11} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
            </span>
          </button>
          {expanded && (
            <div className="mt-3">
              <RarityBar tiers={series.rarityTiers} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function OddityFeature() {
  const s2 = catalog.find((s) => s.id === 'oddity-s2')!

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-zarrio-smoke">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
        {/* Mockup */}
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border border-white/8">
          <ProductMockup type="oddity" isHot />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 flex-1 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Badge preset="exclusive" />
              <Badge preset="hot" />
            </div>
            <h2 className="font-cormorant font-bold uppercase text-zarrio-bone" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1 }}>
              Oddity
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-md">
              Nuestra línea de blind bags. Solo en las máquinas Holy Zarrio. 8 objetos por serie — raros, innecesarios, perfectos.
              Un hidden que nadie ha encontrado todavía.
            </p>
          </div>

          <div className="flex items-center gap-6 justify-center md:justify-start">
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-black text-zarrio-bone">{s2.price.toFixed(2)}€</span>
              <span className="text-xs text-gray-600">por tirada</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-black text-zarrio-bone">{s2.itemsInSeries}</span>
              <span className="text-xs text-gray-600">items / serie</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-black text-zarrio-bone">2</span>
              <span className="text-xs text-gray-600">series activas</span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <a
              href="#rarities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-zarrio-black text-sm font-bold hover:bg-brand-400 transition-colors"
            >
              <Sparkle size={14} weight="fill" />
              Ver tasas de rareza
            </a>
            <a
              href="#machines"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-semibold hover:text-zarrio-bone hover:border-white/20 transition-colors"
            >
              Dónde encontrarla
            </a>
          </div>
        </div>
      </div>

      {/* Worship the weird tagline */}
      <div className="border-t border-white/5 px-8 md:px-10 py-3 flex items-center justify-between">
        <span className="text-xs text-gray-700 uppercase tracking-[0.3em]">Worship the weird.</span>
        <span className="text-xs text-gray-700">Solo en máquinas Holy Zarrio</span>
      </div>
    </div>
  )
}

export default function CatalogSection() {
  const [active, setActive] = useState<Filter>('all')

  const filtered = active === 'all'
    ? catalog
    : catalog.filter((s) => s.category === active)

  return (
    <section id="catalog" className="py-24 px-6 bg-zarrio-black">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Qué hay dentro"
            title="El catálogo"
            subtitle="Todo lo que puedes encontrar en las máquinas."
          />
          <a href="#machines" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-zarrio-bone transition-colors self-start shrink-0">
            Ver máquinas cercanas <ArrowRight size={13} />
          </a>
        </div>

        {/* ODDITY feature card */}
        <OddityFeature />

        {/* Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mt-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all whitespace-nowrap border ${
                active === f.id
                  ? 'bg-brand-500 text-zarrio-black border-brand-500'
                  : 'bg-transparent text-gray-500 border-white/10 hover:text-zarrio-bone hover:border-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border border-white/5 rounded-2xl bg-zarrio-smoke">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-zarrio-bone">¿Tienes un local?</span>
            <span className="text-sm text-gray-500">Ponemos una máquina. Tú te llevas parte de cada tirada.</span>
          </div>
          <a href="mailto:hola@holyzarrio.com" className="flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors shrink-0">
            Hablemos <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
