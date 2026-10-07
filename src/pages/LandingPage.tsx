import NavBar from '@/components/layout/NavBar'
import Backdrop from '@/components/layout/Backdrop'
import Hero from '@/components/layout/Hero'
import Marquee from '@/components/sections/Marquee'
import StatsStrip from '@/components/sections/StatsStrip'
import PackOpener from '@/components/sections/PackOpener'
import CatalogSection from '@/components/sections/CatalogSection'
import RaritiesSection from '@/components/sections/RaritiesSection'
import MachinesSection from '@/components/sections/MachinesSection'
import SocietySection from '@/components/sections/SocietySection'
import Footer from '@/components/layout/Footer'
import { Section } from '@/lib/motion'

export default function LandingPage() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-6 focus:py-3 focus:font-bold focus:text-on-primary"
      >
        Saltar al contenido
      </a>
      <Backdrop />
      <div className="grain" aria-hidden="true" />
      <NavBar />

      <main id="contenido" className="relative z-10 overflow-x-clip">
        <Section id="hero-wrap" mood="hero" labelledBy="hero-title">
          <Hero />
        </Section>
        <Marquee />
        <StatsStrip />
        <PackOpener />
        <CatalogSection />
        <RaritiesSection />
        <MachinesSection />
        <SocietySection />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  )
}
