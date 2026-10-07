import { InstagramLogo, TiktokLogo, ArrowRight, Heart, ChatCircle } from '@phosphor-icons/react'
import SectionHeader from '@/components/ui/SectionHeader'

const mockPosts = [
  {
    id: 1,
    user: 'colektor_bcn',
    initials: 'CB',
    caption: 'Acabo de sacar el Hidden de Oddity S2 🤯 tercer intento. Vale cada euro. #HolyZarrio #OddityCult',
    likes: 84,
    comments: 12,
    tag: 'Hidden pull',
  },
  {
    id: 2,
    user: 'rarezas_madrid',
    initials: 'RM',
    caption: 'Gold Charizard en la máquina de Fuencarral. Real. #ZarrioSociety #Pokémon',
    likes: 211,
    comments: 31,
    tag: 'Gold card',
  },
  {
    id: 3,
    user: 'blindbag_hunter',
    initials: 'BH',
    caption: 'Hot Wheels Treasure Hunt conseguido. 3% de probabilidad. Os lo juro. #HolyZarrio',
    likes: 143,
    comments: 19,
    tag: 'Treasure Hunt',
  },
  {
    id: 4,
    user: 'collector_vlc',
    initials: 'CV',
    caption: 'Completé la serie Oddity S1. Máquina de Ruzafa. Si la encuentras, coge dos. #OddityCult',
    likes: 97,
    comments: 22,
    tag: 'Serie completa',
  },
  {
    id: 5,
    user: 'unopening_es',
    initials: 'UE',
    caption: 'LEGO CMF S25 en abierto. Palpé 8 antes de encontrar la que quería. No me arrepiento. #ZarrioSociety',
    likes: 56,
    comments: 8,
    tag: 'Opening',
  },
  {
    id: 6,
    user: 'figura_secreta',
    initials: 'FS',
    caption: 'La máquina de Triana vuelve la semana que viene. Confirmed. Preparad el monedero. #HolyZarrio',
    likes: 178,
    comments: 44,
    tag: 'Info',
  },
]

const hashtags = ['#HolyZarrio', '#OddityCult', '#ZarrioSociety', '#BlindBag', '#Opening', '#CollectorLife']

export default function SocietySection() {
  return (
    <section id="society" className="py-24 px-6 bg-zarrio-black">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="The Zarrio Society"
            title="La comunidad"
            subtitle="Openings, pulls raros, colecciones completas. Taggeanos y apareces aquí."
          />
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 text-xs text-gray-500 hover:text-zarrio-bone hover:border-white/15 transition-colors">
              <InstagramLogo size={14} />
              Instagram
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 text-xs text-gray-500 hover:text-zarrio-bone hover:border-white/15 transition-colors">
              <TiktokLogo size={14} />
              TikTok
            </a>
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPosts.map((post) => (
            <div key={post.id} className="flex flex-col bg-zarrio-smoke border border-white/5 rounded-xl overflow-hidden hover:border-white/8 transition-colors">
              {/* Image area — monochrome, consistent */}
              <div className="h-36 bg-zarrio-black flex items-center justify-center border-b border-white/5 relative">
                <div className="w-12 h-12 rounded-xl border border-white/8 flex items-center justify-center">
                  <span className="text-xl text-white/10">📦</span>
                </div>
                <span className="absolute top-3 left-3 text-xs text-gray-600 border border-white/6 px-2 py-0.5 rounded">
                  {post.tag}
                </span>
              </div>

              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/6 border border-white/8 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-500">{post.initials[0]}</span>
                  </div>
                  <span className="text-xs text-gray-500">@{post.user}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{post.caption}</p>
                <div className="flex items-center gap-4 pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1 text-xs text-gray-700">
                    <Heart size={10} />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-700">
                    <ChatCircle size={10} />
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {hashtags.map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full border border-white/6 text-sm text-gray-600 hover:text-gray-400 hover:border-white/10 transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 border border-white/6 rounded-2xl">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-lg font-black text-zarrio-bone uppercase tracking-tight">¿Hiciste un opening?</span>
            <span className="text-sm text-gray-600">Taggeanos. Te reposteamos.</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zarrio-bone text-zarrio-black text-sm font-bold hover:bg-white transition-colors">
              <InstagramLogo size={14} />
              @holyzarrio
            </a>
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/8 text-gray-500 text-sm hover:text-zarrio-bone hover:border-white/15 transition-colors">
              <TiktokLogo size={14} />
              @holyzarrio
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
