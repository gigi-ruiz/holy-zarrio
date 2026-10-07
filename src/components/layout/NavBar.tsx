import { useEffect, useRef, useState } from 'react'
import { List, X, Sparkle } from '@phosphor-icons/react'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Abre uno',  href: '#opener' },
  { label: 'Catálogo',  href: '#catalog' },
  { label: 'Rarezas',   href: '#rarities' },
  { label: 'Máquinas',  href: '#machines' },
  { label: 'Society',   href: '#society' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-canvas/90 backdrop-blur-lg border-b-2 border-ink/15' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <a href={import.meta.env.BASE_URL} className="flex items-center gap-2 font-display text-xl font-black text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-on-primary" aria-hidden="true">
            <Sparkle size={20} weight="fill" />
          </span>
          Holy Zarrio
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2.5 font-semibold text-ink hover:bg-ink hover:text-canvas transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#machines" className="btn btn-primary hidden sm:inline-flex !min-h-11 !px-5">
            Encuentra una máquina
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-ink"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="menu-movil" className="lg:hidden flex flex-col gap-1 px-6 pb-6 pt-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-lg font-semibold text-ink hover:bg-ink hover:text-canvas"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a href="#machines" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              Encuentra una máquina
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
