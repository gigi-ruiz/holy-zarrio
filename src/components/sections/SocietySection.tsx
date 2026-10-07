import { InstagramLogo, TiktokLogo, Heart, ChatCircle } from '@phosphor-icons/react'
import SectionHeader from '@/components/ui/SectionHeader'
import { ProductArt, TradingCard } from '@/components/ui/Art'
import { Reveal, Section } from '@/lib/motion'
import type { MockupStyle } from '@/data/catalog'

interface Post {
  id: number
  user: string
  caption: string
  likes: number
  comments: number
  tag: string
  art: MockupStyle | 'card'
  bg: string
  avatar: string
}

const posts: Post[] = [
  { id: 1, user: 'colektor_bcn',    tag: 'Hidden pull',    art: 'oddity',    bg: 'from-violet to-night', avatar: 'bg-pink',  likes: 84,  comments: 12, caption: 'Acabo de sacar el Hidden de Oddity S2 a la tercera. Vale cada euro. #HolyZarrio #OddityCult' },
  { id: 2, user: 'rarezas_madrid',  tag: 'Carta dorada',   art: 'card',      bg: 'from-sun to-coral',    avatar: 'bg-sky',   likes: 211, comments: 31, caption: 'Carta dorada en la máquina de Fuencarral. Real. #ZarrioSociety' },
  { id: 3, user: 'blindbag_hunter', tag: 'Treasure Hunt',  art: 'hotwheels', bg: 'from-coral to-pink',   avatar: 'bg-sun',   likes: 143, comments: 19, caption: 'Treasure Hunt conseguido. 3% de probabilidad. Os lo juro. #HolyZarrio' },
  { id: 4, user: 'collector_vlc',   tag: 'Serie completa', art: 'funko',     bg: 'from-lime to-sky',     avatar: 'bg-lime', likes: 97, comments: 22, caption: 'Completé la serie. Máquina de Ruzafa. Si la encuentras, coge dos. #OddityCult' },
  { id: 5, user: 'unopening_es',    tag: 'Opening',        art: 'lego',      bg: 'from-sky to-violet',   avatar: 'bg-lime',  likes: 56,  comments: 8,  caption: 'Minifiguras serie 25 en abierto. Palpé ocho bolsas antes de encontrar la que quería. No me arrepiento. #ZarrioSociety' },
  { id: 6, user: 'figura_secreta',  tag: 'Aviso',          art: 'pokemon',   bg: 'from-pink to-violet',  avatar: 'bg-coral', likes: 178, comments: 44, caption: 'La máquina de Triana vuelve la semana que viene. Confirmado. Preparad el monedero. #HolyZarrio' },
]

const hashtags = ['#HolyZarrio', '#OddityCult', '#ZarrioSociety', '#BlindBag', '#Opening', '#CollectorLife']

export default function SocietySection() {
  return (
    <Section id="society" mood="society" labelledBy="society-title" className="px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="society-title"
            eyebrow="The Zarrio Society"
            title="La comunidad"
            subtitle="Openings, pulls raros, colecciones completas. Etiquétanos y apareces aquí."
          />
          <div className="flex shrink-0 gap-3">
            <a href="#" className="btn btn-ghost !min-h-11 !px-5"><InstagramLogo size={20} aria-hidden="true" />Instagram</a>
            <a href="#" className="btn btn-ghost !min-h-11 !px-5"><TiktokLogo size={20} aria-hidden="true" />TikTok</a>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.id}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <article className="card flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[0.5deg]">
                  <div className={`relative grid h-52 place-items-center overflow-hidden bg-gradient-to-br ${post.bg}`}>
                    <div aria-hidden="true" className="absolute -left-8 bottom-0 h-36 w-36 rounded-full bg-white/25 blur-xl" />
                    {post.art === 'card' ? (
                      <TradingCard variant="gold" name="Carta dorada" tier="Gold" className="h-44 -rotate-6 drop-shadow-[0_16px_16px_rgba(0,0,0,.35)]" />
                    ) : (
                      <ProductArt type={post.art} title={false} className="h-44 rotate-3 drop-shadow-[0_16px_16px_rgba(0,0,0,.35)]" />
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-night px-3 py-1 text-sm font-bold text-cream">{post.tag}</span>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <p className="flex items-center gap-3 font-bold text-ink">
                      <span aria-hidden="true" className={`grid h-9 w-9 place-items-center rounded-full border-2 border-night text-night ${post.avatar}`}>
                        {post.user[0]}
                      </span>
                      @{post.user}
                    </p>
                    <p className="text-ink/90">{post.caption}</p>
                    <p className="mt-auto flex gap-5 border-t-2 border-ink/10 pt-4 font-semibold text-ink">
                      <span className="flex items-center gap-1.5"><Heart size={18} weight="fill" className="text-accent" aria-hidden="true" /><span className="sr-only">Me gusta: </span>{post.likes}</span>
                      <span className="flex items-center gap-1.5"><ChatCircle size={18} weight="fill" className="text-accent" aria-hidden="true" /><span className="sr-only">Comentarios: </span>{post.comments}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <ul aria-label="Hashtags" className="flex flex-wrap justify-center gap-2">
          {hashtags.map((tag) => (
            <li key={tag} className="rounded-full border-2 border-ink bg-surface/70 px-4 py-2 font-bold text-ink">{tag}</li>
          ))}
        </ul>

        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-night bg-pink p-8 text-night md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-4xl font-black md:text-5xl">¿Hiciste un opening?</h3>
                <p className="mt-2 text-xl">Etiquétanos y te hacemos repost.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="btn bg-night text-cream hover:bg-white hover:text-night"><InstagramLogo size={20} aria-hidden="true" />@holyzarrio</a>
                <a href="#" className="btn border-2 border-night text-night hover:bg-night hover:text-cream"><TiktokLogo size={20} aria-hidden="true" />@holyzarrio</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
