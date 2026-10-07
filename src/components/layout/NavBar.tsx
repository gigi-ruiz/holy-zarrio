import { useState } from 'react'
import { List, X } from '@phosphor-icons/react'

const links = [
  { label: 'Catálogo',  href: '#catalog' },
  { label: 'Rarezas',   href: '#rarities' },
  { label: 'Máquinas',  href: '#machines' },
  { label: 'Society',   href: '#society' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-zarrio-black/80 backdrop-blur-md border-b border-white/5">
      <a href={import.meta.env.BASE_URL} className="text-md font-semibold tracking-widest uppercase text-zarrio-bone">
        Holy Zarrio
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-sm text-gray-400 hover:text-zarrio-bone transition-colors tracking-wide uppercase"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#machines"
        className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand-500 text-zarrio-black text-sm font-semibold hover:bg-brand-400 transition-colors"
      >
        Find a machine
      </a>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-zarrio-bone"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <List size={24} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-zarrio-dark border-b border-white/5 flex flex-col p-6 gap-6 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-400 hover:text-zarrio-bone transition-colors tracking-wide uppercase"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#machines"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-brand-500 text-zarrio-black text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            Find a machine
          </a>
        </div>
      )}
    </nav>
  )
}
