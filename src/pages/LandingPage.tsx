import NavBar from '@/components/layout/NavBar'
import HeroBanner from '@/components/layout/HeroBanner'
import StatsStrip from '@/components/sections/StatsStrip'
import CatalogSection from '@/components/sections/CatalogSection'
import RaritiesSection from '@/components/sections/RaritiesSection'
import MachinesSection from '@/components/sections/MachinesSection'
import SocietySection from '@/components/sections/SocietySection'
import Footer from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <main>
      <NavBar />

      <HeroBanner
        id="hero"
        eyebrow="Vending machines · Coleccionables"
        title="HOLY ZARRIO"
        subtitle="Rare things. Sacred objects."
        description="Máquinas con TCG, Hot Wheels, LEGO y nuestras propias blind bags Oddity. Encuentra la tuya, tira, colecciona."
        cta={{ label: 'Ver el catálogo', href: '#catalog' }}
        ctaSecondary={{ label: 'Dónde estamos', href: '#machines' }}
        variant="gold"
        size="full"
      />

      <StatsStrip />
      <CatalogSection />
      <RaritiesSection />
      <MachinesSection />
      <SocietySection />
      <Footer />
    </main>
  )
}
