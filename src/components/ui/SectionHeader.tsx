interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zarrio-bone">
        {title}
      </h2>
      {subtitle && (
        <p className="text-md text-gray-400 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
