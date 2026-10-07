interface RarityTier {
  label: string
  pct: number
}

interface RarityBarProps {
  tiers: RarityTier[]
}

export default function RarityBar({ tiers }: RarityBarProps) {
  const total = tiers.length

  return (
    <div className="flex flex-col gap-2 w-full">
      {tiers.map((tier, i) => {
        // Most rare = last item (lowest pct). Give it the brightest color.
        const brightness = i === total - 1 ? 'bg-brand-500' :
                           i === total - 2 ? 'bg-brand-700' :
                                             'bg-white/20'

        return (
          <div key={tier.label} className="flex items-center gap-3">
            <span className="text-xs text-gray-600 uppercase tracking-wide w-20 shrink-0 truncate">
              {tier.label}
            </span>
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${brightness} transition-all duration-500`}
                style={{ width: `${tier.pct}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 w-8 text-right shrink-0 tabular-nums">
              {tier.pct}%
            </span>
          </div>
        )
      })}
    </div>
  )
}
