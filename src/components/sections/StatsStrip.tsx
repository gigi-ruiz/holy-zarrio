import { CountUp, Reveal } from '@/lib/motion'

const stats = [
  { value: 6,   suffix: '',  label: 'máquinas activas', tint: 'bg-pink' },
  { value: 4,   suffix: '',  label: 'ciudades',         tint: 'bg-sky' },
  { value: 500, suffix: '+', label: 'items en catálogo', tint: 'bg-sun' },
  { value: 800, suffix: '+', label: 'collectors',       tint: 'bg-lime' },
]

export default function StatsStrip() {
  return (
    <div className="px-6 py-16">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(({ value, suffix, label, tint }, i) => (
          <Reveal key={label} delay={i * 90}>
            <div className={`${tint} rounded-3xl border-2 border-night p-6 text-night shadow-[6px_6px_0_0_#1B1030]`}>
              <dd className="font-display text-5xl font-black tabular-nums">
                <CountUp value={value} suffix={suffix} />
              </dd>
              <dt className="mt-1 font-semibold">{label}</dt>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  )
}
