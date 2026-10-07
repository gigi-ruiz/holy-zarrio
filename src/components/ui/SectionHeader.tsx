interface SectionHeaderProps {
  id: string
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ id, eyebrow, title, subtitle, align = 'left' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start'

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <span className="chip bg-ink text-canvas">{eyebrow}</span>
      )}
      <h2 id={id} className="font-black text-ink" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}>
        {title}
      </h2>
      {subtitle && <p className="text-lg text-mute max-w-xl">{subtitle}</p>}
    </div>
  )
}
