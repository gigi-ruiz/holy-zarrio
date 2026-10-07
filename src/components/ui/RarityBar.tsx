interface RarityBarProps {
  tiers: { label: string; pct: number }[]
}

const ramp = ['bg-rar1', 'bg-rar2', 'bg-rar3', 'bg-rar4', 'bg-rar5']

export default function RarityBar({ tiers }: RarityBarProps) {
  const last = tiers.length - 1

  return (
    <ul className="flex flex-col gap-3 w-full" aria-label="Tasas de aparición">
      {tiers.map((tier, i) => {
        const color = ramp[last === 0 ? 0 : Math.round((i * 4) / last)]
        return (
          <li key={tier.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm font-semibold text-ink">{tier.label}</span>
            <div className="flex-1 h-3.5 rounded-full bg-ink/15 overflow-hidden" aria-hidden="true">
              <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${tier.pct}%` }} />
            </div>
            <span className="w-12 shrink-0 text-right text-sm font-bold tabular-nums text-ink">{tier.pct}%</span>
          </li>
        )
      })}
    </ul>
  )
}
