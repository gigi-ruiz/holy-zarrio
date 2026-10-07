const stats = [
  { value: '6',    label: 'Máquinas activas' },
  { value: '4',    label: 'Ciudades' },
  { value: '500+', label: 'Items en catálogo' },
  { value: '800+', label: 'Collectors' },
]

export default function StatsStrip() {
  return (
    <div className="bg-zarrio-smoke border-b border-white/5 px-6 py-5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/5">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-0.5 pl-6 first:pl-0">
            <span className="text-xl font-black text-zarrio-bone tabular-nums">{value}</span>
            <span className="text-xs text-gray-600 uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
