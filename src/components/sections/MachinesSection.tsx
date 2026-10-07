import { MapPin, ArrowRight, ArrowUpRight, CheckCircle, WarningCircle, Wrench, Package } from '@phosphor-icons/react'
import SectionHeader from '@/components/ui/SectionHeader'
import { Reveal, Section } from '@/lib/motion'
import { machines, type Machine } from '@/data/machines'

const statusConfig = {
  active:      { label: 'Activa',        chip: 'bg-lime text-night',  Icon: CheckCircle },
  empty:       { label: 'Sin stock',     chip: 'bg-ink text-canvas',  Icon: WarningCircle },
  maintenance: { label: 'Mantenimiento', chip: 'bg-sun text-night',   Icon: Wrench },
}

const cityTint: Record<string, string> = {
  Madrid: 'from-pink to-violet',
  Barcelona: 'from-sun to-coral',
  Valencia: 'from-sky to-lime',
  Sevilla: 'from-violet to-pink',
}

function MachineCard({ machine }: { machine: Machine }) {
  const { label, chip, Icon } = statusConfig[machine.status]
  const isActive = machine.status === 'active'

  return (
    <article className="card flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5">
      <div className={`flex items-end justify-between bg-gradient-to-br ${cityTint[machine.city] ?? 'from-pink to-violet'} px-6 pb-4 pt-8 text-night`}>
        <p className="font-display text-3xl font-black">{machine.city}</p>
        <p className="rounded-full bg-night px-3 py-1 text-sm font-bold text-cream">{machine.zone}</p>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-col items-start gap-3">
          <span className={`chip ${chip}`}>
            <Icon size={16} weight="fill" aria-hidden="true" />
            {label}
          </span>
          <h3 className="text-2xl font-black text-ink">{machine.name}</h3>
          <p className="flex items-center gap-2 text-mute">
            <MapPin size={18} weight="fill" aria-hidden="true" className="shrink-0" />
            {machine.address}, {machine.city}
          </p>
        </div>

        {machine.loaded.length > 0 ? (
          <div>
            <p className="mb-2 font-bold text-ink">Disponible ahora</p>
            <ul className="flex flex-wrap gap-2">
              {machine.loaded.map((item) => (
                <li key={item} className="rounded-full border-2 border-ink/25 px-3 py-1 text-sm font-semibold text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-ink">{machine.status === 'maintenance' ? 'Vuelve pronto: la estamos reponiendo.' : 'Sin stock por ahora.'}</p>
        )}

        {isActive ? (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(machine.address + ' ' + machine.city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-auto flex min-h-11 items-center justify-between border-t-2 border-ink/10 pt-4 font-bold text-ink"
          >
            <span>Cómo llegar<span className="sr-only"> a {machine.name} (se abre en una pestaña nueva)</span></span>
            <ArrowUpRight size={20} weight="bold" aria-hidden="true" className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        ) : (
          <p className="mt-auto border-t-2 border-ink/10 pt-4 text-mute">Ruta no disponible mientras esté inactiva</p>
        )}
      </div>
    </article>
  )
}

export default function MachinesSection() {
  const cities = [...new Set(machines.map((m) => m.city))]
  const activeCount = machines.filter((m) => m.status === 'active').length

  return (
    <Section id="machines" mood="machines" labelledBy="machines-title" className="px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="machines-title"
            eyebrow="Dónde encontrarnos"
            title="Las máquinas"
            subtitle={`${activeCount} máquinas activas en ${cities.length} ciudades.`}
          />
          <ul aria-label="Ciudades" className="flex shrink-0 flex-wrap gap-2">
            {cities.map((city) => (
              <li key={city} className="rounded-full border-2 border-ink bg-surface/70 px-4 py-1.5 font-bold text-ink">
                {city}
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine, i) => (
            <li key={machine.id}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <MachineCard machine={machine} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="flex flex-col items-start gap-4 rounded-3xl border-2 border-dashed border-ink p-6 sm:flex-row sm:items-center">
            <Package size={28} weight="fill" aria-hidden="true" className="shrink-0 text-ink" />
            <p className="flex-1 text-lg text-ink">
              Próximamente en <strong>Bilbao, Zaragoza y Málaga</strong>
            </p>
            <a href="#society" className="inline-flex min-h-11 items-center gap-2 font-bold text-ink underline decoration-2 underline-offset-4 hover:text-accent">
              Avisarme <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
