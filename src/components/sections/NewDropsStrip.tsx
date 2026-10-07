import { ArrowRight } from '@phosphor-icons/react'
import ProductMockup from '@/components/ui/ProductMockup'
import Badge from '@/components/ui/Badge'
import { catalog } from '@/data/catalog'

export default function NewDropsStrip() {
  const newItems = catalog.filter((s) => s.isNew || s.isHot || s.isExclusive).slice(0, 5)

  return (
    <div className="bg-zarrio-dark border-b border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Novedades</span>
          </div>
          <a href="#catalog" className="flex items-center gap-1 text-xs text-gray-500 hover:text-zarrio-bone transition-colors">
            Ver todo <ArrowRight size={12} />
          </a>
        </div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {newItems.map((series) => (
            <a
              key={series.id}
              href="#catalog"
              className="flex items-center gap-3 shrink-0 px-4 py-3 bg-zarrio-smoke border border-white/5 rounded-xl hover:border-white/10 transition-colors group w-64"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <ProductMockup type={series.mockup} />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs font-bold text-zarrio-bone truncate leading-tight">{series.name.split('—')[0].trim()}</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {series.isNew       && <Badge preset="new" />}
                  {series.isHot       && <Badge preset="hot" />}
                  {series.isExclusive && <Badge preset="exclusive" />}
                </div>
                <span className="text-xs text-brand-400 font-semibold">{series.price.toFixed(2)}€</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
