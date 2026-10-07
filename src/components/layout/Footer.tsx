import { InstagramLogo, TiktokLogo, EnvelopeSimple } from '@phosphor-icons/react'

const links = {
  Explorar: [
    { label: 'Abre un sobre',   href: '#opener' },
    { label: 'El catálogo',     href: '#catalog' },
    { label: 'Guía de rarezas', href: '#rarities' },
    { label: 'Las máquinas',    href: '#machines' },
  ],
  Legal: [
    { label: 'Aviso legal', href: '#' },
    { label: 'Privacidad',  href: '#' },
    { label: 'Cookies',     href: '#' },
  ],
}

const social = [
  { label: 'Instagram de Holy Zarrio', href: '#', Icon: InstagramLogo },
  { label: 'TikTok de Holy Zarrio', href: '#', Icon: TiktokLogo },
  { label: 'Escríbenos por email', href: 'mailto:hola@holyzarrio.com', Icon: EnvelopeSimple },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-cream">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <p
          aria-hidden="true"
          className="font-display font-black italic leading-none"
          style={{
            fontSize: 'clamp(3.5rem, 15vw, 12rem)',
            background: 'linear-gradient(100deg, #FFC83D, #FF7AC6 55%, #A88CFF)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            paddingBottom: '0.1em',
          }}
        >
          Holy Zarrio
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-5 md:col-span-2">
            <p className="max-w-sm text-lg text-cream/90">
              Máquinas con objetos de colección. Cartas, Hot Wheels, blind bags y minifiguras. Worship the weird.
            </p>
            <ul className="flex items-center gap-3">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center rounded-full border-2 border-cream/60 text-cream transition-colors hover:bg-cream hover:text-night"
                  >
                    <Icon size={22} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <nav key={group} aria-label={group} className="flex flex-col gap-4">
              <h2 className="font-sans text-base font-bold tracking-normal text-sun">{group}</h2>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="inline-block py-1 text-cream underline-offset-4 hover:underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-14 border-t border-cream/30 pt-6 text-cream/90">
          © {new Date().getFullYear()} Holy Zarrio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
