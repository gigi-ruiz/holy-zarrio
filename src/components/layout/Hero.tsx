import { ArrowRight, MapPin } from '@phosphor-icons/react'
import { ProductArt, TradingCard } from '@/components/ui/Art'
import { Parallax, Tilt } from '@/lib/motion'

/* Escenario con capas a distintas profundidades: cada una se mueve a su propia velocidad */
function Stage() {
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[560px]" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sun via-pink to-violet opacity-60 blur-2xl" />

      <Parallax speed={0.04} className="absolute left-[26%] top-[6%] w-[48%]">
        <Tilt max={8}><div className="animate-bob" style={{ '--r': '-3deg' } as React.CSSProperties}>
          <ProductArt type="oddity" title={false} className="w-full drop-shadow-[0_30px_30px_rgba(0,0,0,.35)]" />
        </div></Tilt>
      </Parallax>

      <Parallax speed={-0.12} className="absolute left-[-2%] top-[34%] w-[34%]">
        <div className="animate-bob" style={{ '--r': '-12deg', animationDelay: '-2s' } as React.CSSProperties}>
          <ProductArt type="pokemon" title={false} className="w-full -rotate-12 drop-shadow-[0_24px_24px_rgba(0,0,0,.35)]" />
        </div>
      </Parallax>

      <Parallax speed={-0.2} rotate={-1} className="absolute right-[-2%] top-[22%] w-[36%]">
        <div className="animate-bob" style={{ '--r': '10deg', animationDelay: '-4s' } as React.CSSProperties}>
          <TradingCard variant="gold" name="Zarrio Santo" tier="Hidden" className="w-full rotate-[10deg] drop-shadow-[0_24px_24px_rgba(0,0,0,.35)]" />
        </div>
      </Parallax>

      <Parallax speed={-0.3} className="absolute bottom-[0%] left-[16%] hidden w-[26%] sm:block">
        <div className="animate-bob" style={{ '--r': '6deg', animationDelay: '-1s' } as React.CSSProperties}>
          <ProductArt type="hotwheels" title={false} className="w-full rotate-6 drop-shadow-[0_24px_24px_rgba(0,0,0,.35)]" />
        </div>
      </Parallax>

      <Parallax speed={-0.16} className="absolute bottom-[2%] right-[12%] w-[24%]">
        <div className="animate-bob" style={{ '--r': '-6deg', animationDelay: '-3s' } as React.CSSProperties}>
          <ProductArt type="lego" title={false} className="w-full -rotate-6 drop-shadow-[0_24px_24px_rgba(0,0,0,.35)]" />
        </div>
      </Parallax>

      <Parallax speed={-0.36} className="absolute right-[34%] top-[64%] hidden w-[20%] sm:block">
        <div className="animate-bob" style={{ '--r': '8deg', animationDelay: '-5s' } as React.CSSProperties}>
          <ProductArt type="funko" title={false} className="w-full rotate-[8deg] drop-shadow-[0_24px_24px_rgba(0,0,0,.35)]" />
        </div>
      </Parallax>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative flex min-h-screen items-center px-6 pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col items-start gap-7">
          <p className="chip bg-ink text-canvas">
            <MapPin size={16} weight="fill" aria-hidden="true" />
            Vending de coleccionables · 6 máquinas
          </p>

          <h1 id="hero-title" className="font-black" style={{ fontSize: 'clamp(3rem, 8.5vw, 6.5rem)' }}>
            ¿Qué habrá <span className="grad-text italic">dentro</span>?
          </h1>

          <p className="max-w-lg text-xl text-ink">
            <strong className="font-bold">Holy Zarrio</strong>: sobres de cartas, Hot Wheels, minifiguras y nuestras
            blind bags Oddity. Echas la moneda, tiras de la palanca y descubres qué te ha tocado.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#opener" className="btn btn-primary text-lg">
              Abre uno ahora
              <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </a>
            <a href="#machines" className="btn btn-ghost text-lg">
              Dónde están
            </a>
          </div>

          <p className="text-mute">Rare things. Sacred objects. Desde 3,50 € la tirada.</p>
        </div>

        <Stage />
      </div>
    </section>
  )
}
