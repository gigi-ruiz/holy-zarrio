import { useState } from 'react'
import { Trophy, Question, Crown, Lightbulb } from '@phosphor-icons/react'
import SectionHeader from '@/components/ui/SectionHeader'
import RarityBar from '@/components/ui/RarityBar'
import { ProductArt, TradingCard } from '@/components/ui/Art'
import { Reveal, Section, Tilt } from '@/lib/motion'
import { catalog } from '@/data/catalog'

const rarityDocs = [
  {
    icon: Trophy,
    label: 'Treasure Hunt y Chase',
    description: 'La pieza más buscada de una serie. Menos del 3% de probabilidad y, casi siempre, acabados especiales.',
    tint: 'bg-sun',
  },
  {
    icon: Question,
    label: 'Secret y Hidden',
    description: 'No aparece en el packaging oficial. Solo la comunidad sabe que existe. Entre el 1% y el 5%.',
    tint: 'bg-pink',
  },
  {
    icon: Crown,
    label: 'Ultra Rare y Gold',
    description: 'Versión especial de una carta o figura: foil, metalizado o ilustración alternativa.',
    tint: 'bg-sky',
  },
]

export default function RaritiesSection() {
  const [selected, setSelected] = useState(catalog[0].id)
  const active = catalog.find((s) => s.id === selected)!

  return (
    <Section id="rarities" mood="rarities" labelledBy="rarities-title" className="px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal>
          <SectionHeader
            id="rarities-title"
            eyebrow="Probabilidades"
            title="Guía de rarezas"
            subtitle="Tasas reales por serie. Saber lo que hay dentro no le quita la gracia: se la añade."
            align="center"
          />
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-3">
          {rarityDocs.map(({ icon: Icon, label, description, tint }, i) => (
            <li key={label}>
              <Reveal delay={i * 100} className="h-full">
                <div className="card flex h-full flex-col gap-4 p-6">
                  <span className={`grid h-14 w-14 -rotate-3 place-items-center rounded-2xl border-2 border-night text-night ${tint}`}>
                    <Icon size={28} weight="fill" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-black text-ink">{label}</h3>
                  <p className="text-ink/90">{description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="flex flex-col gap-6">
            <div role="group" aria-label="Selecciona una serie" className="flex flex-wrap gap-2">
              {catalog.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={selected === s.id}
                  onClick={() => setSelected(s.id)}
                  className={`min-h-11 rounded-full border-2 border-ink px-5 font-bold transition-colors ${
                    selected === s.id ? 'bg-ink text-canvas' : 'bg-surface/70 text-ink hover:bg-raised'
                  }`}
                >
                  {s.name.split('—')[0].trim()}
                  {s.name.includes('—') && <span className="font-medium"> {s.name.split('—')[1].trim()}</span>}
                </button>
              ))}
            </div>

            <div className="card grid gap-10 p-6 md:grid-cols-[auto_1fr_1fr] md:items-center md:p-10">
              <Tilt max={12} className="mx-auto w-40 md:w-44">
                <ProductArt type={active.mockup} title={active.name} className="w-full drop-shadow-[0_20px_20px_rgba(0,0,0,.35)]" />
              </Tilt>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-semibold text-mute">{active.brand}</p>
                  <h3 className="text-3xl font-black text-ink">{active.name}</h3>
                </div>
                <p className="text-ink/90">{active.description}</p>
                <dl className="flex gap-8 border-t-2 border-ink/10 pt-4">
                  <div>
                    <dt className="text-mute">Precio</dt>
                    <dd className="text-2xl font-black text-ink">{active.price.toFixed(2)} €</dd>
                  </div>
                  <div>
                    <dt className="text-mute">Items en serie</dt>
                    <dd className="text-2xl font-black text-ink">{active.itemsInSeries}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-display text-xl font-black text-ink">Tasas de aparición</h4>
                <RarityBar tiers={active.rarityTiers} />
                <p className="text-mute">Las tasas son aproximadas y pueden variar por lote.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <aside className="relative overflow-hidden rounded-3xl border-2 border-night bg-sun p-6 text-night md:p-8">
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-night text-sun">
                <Lightbulb size={28} weight="fill" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="mb-1 text-2xl font-black">Truco de la comunidad</h3>
                <p className="text-lg">
                  En las minifiguras puedes identificar la figura por el código de puntos de la bolsa antes de abrirla. En
                  los sobres de cartas, el peso a veces da pistas. Y en los Hot Wheels Treasure Hunt: busca la llama
                  en la tarjeta.
                </p>
              </div>
              <div className="hidden w-28 shrink-0 lg:block">
                <TradingCard variant="gold" name="Zarrio Santo" tier="Hidden" className="w-full rotate-6 drop-shadow-[0_12px_12px_rgba(0,0,0,.3)]" />
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  )
}
