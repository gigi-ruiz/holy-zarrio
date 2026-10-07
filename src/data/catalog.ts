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
    color: string
  }[]
  tags: string[]
  isNew?: boolean
  isHot?: boolean
  isExclusive?: boolean
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
      { label: 'Common',  pct: 55, color: 'bg-gray-500' },
      { label: 'Rare',    pct: 28, color: 'bg-blue-500' },
      { label: 'Secret',  pct: 12, color: 'bg-purple-500' },
      { label: 'Hidden',  pct: 5,  color: 'bg-zarrio-sacred' },
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
      { label: 'Common',    pct: 60, color: 'bg-gray-500' },
      { label: 'Uncommon',  pct: 25, color: 'bg-green-600' },
      { label: 'Rare',      pct: 10, color: 'bg-blue-500' },
      { label: 'Ultra Rare', pct: 4, color: 'bg-purple-500' },
      { label: 'Gold',       pct: 1, color: 'bg-brand-500' },
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
      { label: 'Standard',     pct: 70, color: 'bg-gray-500' },
      { label: 'Premium',      pct: 20, color: 'bg-blue-500' },
      { label: 'Super T-Hunt', pct: 7,  color: 'bg-orange-500' },
      { label: 'Treasure',     pct: 3,  color: 'bg-brand-500' },
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
      { label: 'Base',   pct: 75, color: 'bg-yellow-600' },
      { label: 'Rare',   pct: 20, color: 'bg-orange-500' },
      { label: 'Secret', pct: 5,  color: 'bg-brand-500' },
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
      { label: 'Common',   pct: 65, color: 'bg-gray-500' },
      { label: 'Uncommon', pct: 22, color: 'bg-green-600' },
      { label: 'Rare',     pct: 10, color: 'bg-blue-500' },
      { label: 'Chase',    pct: 3,  color: 'bg-brand-500' },
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
      { label: 'Common',  pct: 55, color: 'bg-gray-500' },
      { label: 'Rare',    pct: 28, color: 'bg-blue-500' },
      { label: 'Secret',  pct: 12, color: 'bg-purple-500' },
      { label: 'Hidden',  pct: 5,  color: 'bg-zarrio-sacred' },
    ],
    tags: ['Exclusivo', 'Oddity', 'Agotándose'],
    isExclusive: true,
  },
]
