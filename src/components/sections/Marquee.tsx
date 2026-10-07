const words = ['Sobres TCG', 'Hot Wheels', 'Blind bags Oddity', 'Minifiguras', 'Mystery Minis', 'Treasure Hunt', 'Hidden', 'Gold cards', 'Worship the weird']

/* Cinta decorativa. El contenido real ya está en el catálogo, por eso va oculta a lectores de pantalla. */
export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div aria-hidden="true" className="-rotate-1 border-y-2 border-night bg-sun py-4 text-night overflow-hidden">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-3xl font-black italic">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            {w}
            <svg width="22" height="22" viewBox="-10 -10 20 20"><path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10Z" fill="currentColor" /></svg>
          </span>
        ))}
      </div>
    </div>
  )
}
