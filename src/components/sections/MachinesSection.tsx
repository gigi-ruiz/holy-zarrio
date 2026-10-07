import { MapPin, ArrowRight, ArrowUpRight, Package } from '@phosphor-icons/react'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { machines, type Machine } from '@/data/machines'

const statusConfig = {
  active:      { label: 'Activa',        dot: 'bg-zarrio-bone',  text: 'text-gray-400' },
  empty:       { label: 'Sin stock',     dot: 'bg-white/20',     text: 'text-gray-600' },
  maintenance: { label: 'Mantenimiento', dot: 'bg-brand-600',    text: 'text-gray-500' },
}

function MachineCard({ machine }: { machine: Machine }) {
  const status = statusConfig[machine.status]
  const isActive = machine.status === 'active'

  return (
    <div className={`flex flex-col gap-5 p-6 rounded-2xl border transition-all duration-300 ${
      isActive
        ? 'bg-zarrio-smoke border-white/6 hover:border-white/10 hover:-translate-y-0.5'
        : 'bg-zarrio-black border-white/4 opacity-50'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${status.dot} ${isActive ? 'animate-pulse' : ''}`} />
            <span className={`text-xs uppercase tracking-widest font-medium ${status.text}`}>{status.label}</span>
          </div>
          <h3 className="text-base font-bold text-zarrio-bone">{machine.name}</h3>
        </div>
        <Badge label={machine.zone} variant="subtle" />
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin size={13} className="shrink-0" />
        <span>{machine.address}, {machine.city}</span>
      </div>

      {machine.loaded.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-700 uppercase tracking-widest">Disponible</span>
          <div className="flex flex-wrap gap-1.5">
            {machine.loaded.map((item) => (
              <span key={item} className="text-xs px-2.5 py-1 rounded-full border border-white/6 text-gray-500">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-700 italic">
          {machine.status === 'maintenance' ? 'Vuelve pronto.' : 'Sin stock.'}
        </p>
      )}

      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(machine.address + ' ' + machine.city)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-between pt-4 border-t border-white/5 text-sm transition-colors ${
          isActive ? 'text-gray-600 hover:text-zarrio-bone group/link' : 'text-gray-800 pointer-events-none'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <MapPin size={12} />
          Cómo llegar
        </span>
        <ArrowUpRight size={13} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      </a>
    </div>
  )
}

export default function MachinesSection() {
  const cities = [...new Set(machines.map((m) => m.city))]
  const activeCount = machines.filter((m) => m.status === 'active').length

  return (
    <section id="machines" className="py-24 px-6 bg-zarrio-dark">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Dónde encontrarnos"
            title="Las máquinas"
            subtitle={`${activeCount} máquinas activas en ${cities.length} ciudades.`}
          />
          <div className="flex flex-wrap gap-2 shrink-0">
            {cities.map((city) => (
              <span key={city} className="px-3 py-1 rounded-full border border-white/8 text-xs text-gray-600">
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>

        <div className="flex items-center gap-4 p-5 border border-dashed border-white/8 rounded-2xl">
          <Package size={16} className="text-gray-600 shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">
              Próximamente en <span className="text-zarrio-bone">Bilbao, Zaragoza y Málaga</span>
            </p>
          </div>
          <a href="#society" className="flex items-center gap-1 text-xs text-brand-500 hover:text-brand-400 transition-colors shrink-0">
            Avisarme <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}
