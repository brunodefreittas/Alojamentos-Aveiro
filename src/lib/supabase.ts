import { createClient } from '@supabase/supabase-js';
import { RealEstateProperty } from '../types/realestate';

const SUPABASE_URL = 'https://jmlesfknxwuocmwemjuh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Mue5cAG3WdLBAc9oGxGq0g_GROcDXA2';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Initial mock properties for Aveiro (Portuguese standards)
export const INITIAL_PROPERTIES: RealEstateProperty[] = [
  {
    id: 'prop-1',
    title: 'Apartamento T2 Luxo Vista Ria - Rossio',
    slug: 'apartamento-t2-luxo-vista-ria-rossio',
    type: 'apartment',
    status: 'for_sale',
    price: 285000,
    typology: 'T2',
    gross_area: 110,
    useful_area: 92,
    energy_certificate: 'A',
    location: 'Vera Cruz, Aveiro (Rossio)',
    description: {
      pt: 'Magnífico apartamento T2 localizado no coração de Aveiro, com vista panorâmica sobre a emblemática Ria de Aveiro. Acabamentos de luxo, cozinha equipada com eletrodomésticos Bosch, suite principal, varanda espaçosa e lugar de garagem com carregador para veículos elétricos.',
      en: 'Magnificent 2-bedroom luxury apartment located in the heart of Aveiro, with panoramic views over the emblematic Aveiro estuary. Luxury finishes, fully equipped kitchen with Bosch appliances, master suite, spacious balcony, and parking space with EV charger.'
    },
    features: ['Vista Ria', 'Garagem', 'Varanda', 'Elevador', 'Cozinha Equipada', 'Painéis Solares', 'Ar Condicionado'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    created_at: new Date().toISOString(),
    contact_email: 'geral@aveiro-white.pt',
    contact_phone: '+351 234 000 000'
  },
  {
    id: 'prop-2',
    title: 'Moradia T4 Contemporânea em Esgueira',
    slug: 'moradia-t4-contemporanea-esgueira',
    type: 'house',
    status: 'for_sale',
    price: 460000,
    typology: 'T4',
    gross_area: 280,
    useful_area: 240,
    energy_certificate: 'A+',
    location: 'Esgueira, Aveiro',
    description: {
      pt: 'Moradia unifamiliar T4 de arquitetura contemporânea, com piscina privativa, jardim circundante e zona de churrasco. Composta por ampla sala de estar em open space, 4 suites com roupeiros embutidos, bomba de calor e garagem fechada para 2 carros.',
      en: 'Contemporary 4-bedroom detached villa with private pool, surrounding garden, and BBQ area. Comprising a spacious open-plan living room, 4 suites with built-in wardrobes, heat pump, and closed garage for 2 cars.'
    },
    features: ['Piscina Privativa', 'Jardim', 'Churrasqueira', 'Garagem Fechada', 'Bomba de Calor', 'Suite Master'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    created_at: new Date().toISOString(),
    contact_email: 'geral@aveiro-white.pt',
    contact_phone: '+351 234 000 000'
  },
  {
    id: 'prop-3',
    title: 'Terreno Urbano para Construção de Moradia',
    slug: 'terreno-urbano-construcao-moradia-cacia',
    type: 'land',
    status: 'for_sale',
    price: 95000,
    typology: 'Terreno',
    gross_area: 750,
    useful_area: 750,
    energy_certificate: 'Exempt',
    location: 'Cacia, Aveiro',
    description: {
      pt: 'Excelente terreno urbano com 750m² para construção de moradia isolada de 2 pisos. Zona residencial calma, excelente exposição solar, com infraestruturas completas (água, eletricidade, saneamento e fibra óptica) à porta.',
      en: 'Excellent urban plot of 750m² for building a 2-story detached house. Quiet residential area, excellent sun exposure, with complete infrastructure (water, electricity, sanitation, and fiber optics) at the doorstep.'
    },
    features: ['Viabilidade de Construção', 'Água e Eletricidade', 'Fibra Óptica', 'Zona Calma'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    created_at: new Date().toISOString(),
    contact_email: 'geral@aveiro-white.pt',
    contact_phone: '+351 234 000 000'
  },
  {
    id: 'prop-4',
    title: 'Apartamento T3 Centro Histórico',
    slug: 'apartamento-t3-centro-historico-aveiro',
    type: 'apartment',
    status: 'for_sale',
    price: 320000,
    typology: 'T3',
    gross_area: 135,
    useful_area: 115,
    energy_certificate: 'B',
    location: 'Glória e Vera Cruz, Aveiro',
    description: {
      pt: 'Apartamento T3 repleto de charme no centro histórico de Aveiro, perto dos canais e da Sé. Totalmente renovado mantendo traços arquitetónicos originais, tetos trabalhados, soalho em madeira maciça e varandas soalheiras.',
      en: 'Charm-filled 3-bedroom apartment in the historic center of Aveiro, close to the canals and Cathedral. Fully renovated while maintaining original architectural features, ornate ceilings, solid wood flooring, and sunny balconies.'
    },
    features: ['Centro Histórico', 'Soalho em Madeira', 'Varanda', 'Próximo de Comércio', 'Renovado'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185010-5ad9371bf942?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    created_at: new Date().toISOString(),
    contact_email: 'geral@aveiro-white.pt',
    contact_phone: '+351 234 000 000'
  }
];

// LocalStorage fallback & sync helper for properties so admin changes work smoothly even if Supabase table is not yet migrated
const STORAGE_KEY = 'aveiro_real_estate_properties_v1';

export function getStoredProperties(): RealEstateProperty[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading localStorage properties', e);
  }
  // Initialize storage with mock data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
  return INITIAL_PROPERTIES;
}

export function saveStoredProperties(props: RealEstateProperty[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props));
  } catch (e) {
    console.error('Error saving localStorage properties', e);
  }
}
