import { InstagramLogo, TiktokLogo, EnvelopeSimple } from '@phosphor-icons/react'

const links = {
  Explorar: [
    { label: 'Las máquinas',    href: '#machines' },
    { label: 'El catálogo',     href: '#catalog' },
    { label: 'Guía de rarezas', href: '#rarities' },
    { label: 'The Society',     href: '#society' },
  ],
  Legal: [
    { label: 'Aviso legal',         href: '#' },
    { label: 'Privacidad',          href: '#' },
    { label: 'Cookies',             href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zarrio-black">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <span className="text-lg font-black uppercase tracking-widest text-zarrio-bone">
              Holy Zarrio
            </span>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Vending machines con objetos de colección. TCG, Hot Wheels, blind bags, LEGO. Rare things. Sacred objects.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-zarrio-bone hover:border-white/20 transition-colors">
                <InstagramLogo size={16} />
              </a>
              <a href="#" aria-label="TikTok" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-zarrio-bone hover:border-white/20 transition-colors">
                <TiktokLogo size={16} />
              </a>
              <a href="mailto:hola@holyzarrio.com" aria-label="Email" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-zarrio-bone hover:border-white/20 transition-colors">
                <EnvelopeSimple size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">{group}</span>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-gray-500 hover:text-zarrio-bone transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-white/5">
          <span className="text-xs text-gray-600">
            © {new Date().getFullYear()} Holy Zarrio. Todos los derechos reservados.
          </span>
          <span className="text-xs text-gray-700 uppercase tracking-widest">
            Worship the weird.
          </span>
        </div>
      </div>
    </footer>
  )
}
