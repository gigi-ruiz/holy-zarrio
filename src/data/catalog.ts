export type MockupStyle = 'oddity' | 'pokemon' | 'hotwheels' | 'lego' | 'funko'

export interface Series {
  id: string
  name: string
  brand: string
  category: 'tcg' | 'hotwheels' | 'blindbag' | 'lego' | 'funko'
  mockup: MockupStyle
  price: number
  itemsInSeries: number
  description: string
  rarityTiers: {
    label: string
    pct: number
  }[]
  tags: string[]
  isNew?: boolean
  isHot?: boolean
  isExclusive?: boolean
  /** Foto real del producto (ruta en public/ o URL). Si existe, sustituye a la ilustración. */
  photo?: string
}

export const catalog: Series[] = [
  {
    id: 'oddity-s2',
    name: 'Oddity — Series 2',
    brand: 'Holy Zarrio',
    category: 'blindbag',
    mockup: 'oddity',
    price: 6.0,
    itemsInSeries: 8,
    description: 'La segunda entrega. Figuras extrañas, objetos sin lógica y un hidden que nadie ha encontrado todavía.',
    rarityTiers: [
      { label: 'Common',  pct: 55 },
      { label: 'Rare',    pct: 28 },
      { label: 'Secret',  pct: 12 },
      { label: 'Hidden',  pct: 5 },
    ],
    tags: ['Exclusivo', 'Oddity', 'Series 2'],
    isHot: true,
    isExclusive: true,
  },
  {
    id: 'pkm-sv',
    name: 'Pokémon TCG — Scarlet & Violet',
    brand: 'Pokémon',
    category: 'tcg',
    mockup: 'pokemon',
    price: 4.5,
    itemsInSeries: 226,
    description: 'Booster packs de la última expansión. Full Art, Special Illustration Rare y Gold Cards.',
    rarityTiers: [
      { label: 'Common',    pct: 60 },
      { label: 'Uncommon',  pct: 25 },
      { label: 'Rare',      pct: 10 },
      { label: 'Ultra Rare', pct: 4 },
      { label: 'Gold',       pct: 1 },
    ],
    tags: ['TCG', 'Pokémon'],
    isHot: true,
  },
  {
    id: 'hw-premium',
    name: 'Hot Wheels — Premium Series',
    brand: 'Mattel',
    category: 'hotwheels',
    mockup: 'hotwheels',
    price: 3.5,
    itemsInSeries: 15,
    description: 'Metal real, ruedas de goma, detalles collectors. Y el Treasure Hunt que nadie quiere perderse.',
    rarityTiers: [
      { label: 'Standard',     pct: 70 },
      { label: 'Premium',      pct: 20 },
      { label: 'Super T-Hunt', pct: 7 },
      { label: 'Treasure',     pct: 3 },
    ],
    tags: ['Hot Wheels', 'Diecast'],
    isNew: true,
  },
  {
    id: 'lego-cmf25',
    name: 'LEGO CMF — Series 25',
    brand: 'LEGO',
    category: 'lego',
    mockup: 'lego',
    price: 5.0,
    itemsInSeries: 12,
    description: '12 figuras. Siente el código de puntos o arriésgate a la suerte. Tú decides.',
    rarityTiers: [
      { label: 'Base',   pct: 75 },
      { label: 'Rare',   pct: 20 },
      { label: 'Secret', pct: 5 },
    ],
    tags: ['LEGO', 'CMF'],
    isNew: true,
  },
  {
    id: 'funko-mystery',
    name: 'Funko Mystery Minis',
    brand: 'Funko',
    category: 'funko',
    mockup: 'funko',
    price: 5.5,
    itemsInSeries: 24,
    description: 'Horror, Gamer y Pop Culture. 24 figuras mezcladas. Chase al fondo.',
    rarityTiers: [
      { label: 'Common',   pct: 65 },
      { label: 'Uncommon', pct: 22 },
      { label: 'Rare',     pct: 10 },
      { label: 'Chase',    pct: 3 },
    ],
    tags: ['Funko', 'Mystery'],
  },
  {
    id: 'oddity-s1',
    name: 'Oddity — Series 1',
    brand: 'Holy Zarrio',
    category: 'blindbag',
    mockup: 'oddity',
    price: 6.0,
    itemsInSeries: 8,
    description: 'La serie original. Casi agotada. Si la encuentras, coge dos.',
    rarityTiers: [
      { label: 'Common',  pct: 55 },
      { label: 'Rare',    pct: 28 },
      { label: 'Secret',  pct: 12 },
      { label: 'Hidden',  pct: 5 },
    ],
    tags: ['Exclusivo', 'Oddity', 'Agotándose'],
    isExclusive: true,
  },
]
