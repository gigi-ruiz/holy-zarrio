import { useState } from 'react'
import { Trophy, Question, Skull } from '@phosphor-icons/react'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import RarityBar from '@/components/ui/RarityBar'
import { catalog } from '@/data/catalog'

const rarityDocs = [
  {
    icon: Trophy,
    label: 'Treasure Hunt / Chase',
    description: 'La pieza más buscada de una serie. Menos del 3% de probabilidad. Suele tener acabados especiales.',
    rarity: 'secret' as const,
  },
  {
    icon: Question,
    label: 'Secret / Hidden',
    description: 'No aparece en el packaging oficial. Solo la comunidad sabe que existe. Entre 1% y 5%.',
    rarity: 'hidden' as const,
  },
  {
    icon: Skull,
    label: 'Ultra Rare / Gold',
    description: 'Versión especial de una carta o figura. Foil, metalizado, o ilustración alternativa.',
    rarity: 'super-rare' as const,
  },
]

export default function RaritiesSection() {
  const [selected, setSelected] = useState(catalog[0].id)
  const activeSeries = catalog.find((s) => s.id === selected)!

  return (
    <section id="rarities" className="py-24 px-6 bg-zarrio-smoke">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <SectionHeader
          eyebrow="Probabilidades"
          title="Guía de rarezas"
          subtitle="Tasas reales por serie. Saber lo que hay dentro no le quita la gracia — se la añade."
          align="center"
        />

        {/* Rarity explainer cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {rarityDocs.map(({ icon: Icon, label, description, rarity }) => (
            <div key={label} className="flex flex-col gap-3 p-5 bg-zarrio-black border border-white/5 rounded-xl">
              <Icon size={20} className="text-brand-500" />
              <Badge label={label} rarity={rarity} />
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Series selector + rates */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Selecciona una serie</span>
            <div className="flex flex-wrap gap-2">
              {catalog.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    selected === s.id
                      ? 'bg-brand-500 text-zarrio-black border-brand-500'
                      : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20 hover:text-zarrio-bone'
                  }`}
                >
                  {s.name.split('—')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-zarrio-black border border-white/5 rounded-xl">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">{activeSeries.brand}</span>
                <h3 className="text-xl font-black text-zarrio-bone">{activeSeries.name}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{activeSeries.description}</p>
              <div className="flex gap-4 pt-2 border-t border-white/5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-600">Precio</span>
                  <span className="text-lg font-bold text-zarrio-bone">{activeSeries.price.toFixed(2)}€</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-600">Items en serie</span>
                  <span className="text-lg font-bold text-zarrio-bone">{activeSeries.itemsInSeries}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Tasas de aparición</span>
              <RarityBar tiers={activeSeries.rarityTiers} />
              <p className="text-xs text-gray-600 leading-relaxed">
                Las tasas son aproximadas y pueden variar por lote. La rareza es lo que lo hace especial.
              </p>
            </div>
          </div>
        </div>

        {/* Community tip */}
        <div className="flex items-start gap-4 p-5 border border-brand-500/20 rounded-xl bg-brand-500/5">
          <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <Trophy size={16} className="text-brand-400" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-zarrio-bone">Tip de la comunidad</span>
            <p className="text-sm text-gray-400 leading-relaxed">
              En los LEGO CMF puedes identificar la figura por el código de puntos en la bolsa antes de abrirla.
              En los Pokémon, el peso del sobre puede darte pistas. Para los Hot Wheels Treasure Hunt: busca la llama en la tarjeta.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
