export interface Machine {
  id: string
  name: string
  address: string
  city: string
  zone: string
  status: 'active' | 'empty' | 'maintenance'
  loaded: string[]
  image?: string
}

export const machines: Machine[] = [
  {
    id: 'mdr-01',
    name: 'Madrid Centro',
    address: 'C/ Fuencarral 45',
    city: 'Madrid',
    zone: 'Malasaña',
    status: 'active',
    loaded: ['Pokémon TCG', 'Hot Wheels Premium', 'Blind Bag S2'],
  },
  {
    id: 'mdr-02',
    name: 'Madrid Retiro',
    address: 'C/ Doctor Esquerdo 12',
    city: 'Madrid',
    zone: 'Retiro',
    status: 'active',
    loaded: ['LEGO CMF Series 25', 'Funko Mystery', 'Pokémon TCG'],
  },
  {
    id: 'bcn-01',
    name: 'Barcelona Raval',
    address: 'C/ Hospital 78',
    city: 'Barcelona',
    zone: 'El Raval',
    status: 'active',
    loaded: ['Hot Wheels Premium', 'Blind Bag S1', 'LEGO CMF Series 25'],
  },
  {
    id: 'bcn-02',
    name: 'Barcelona Gràcia',
    address: 'C/ Verdi 22',
    city: 'Barcelona',
    zone: 'Gràcia',
    status: 'empty',
    loaded: [],
  },
  {
    id: 'vlc-01',
    name: 'Valencia Ruzafa',
    address: 'C/ Cuba 33',
    city: 'Valencia',
    zone: 'Ruzafa',
    status: 'active',
    loaded: ['Pokémon TCG', 'Blind Bag S2'],
  },
  {
    id: 'sev-01',
    name: 'Sevilla Triana',
    address: 'C/ Betis 14',
    city: 'Sevilla',
    zone: 'Triana',
    status: 'maintenance',
    loaded: [],
  },
]
