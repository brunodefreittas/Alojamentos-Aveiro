import { ApartmentData } from '../types';

export const APARTMENTS_DATA: Record<'aveiro-sunset' | 'aveiro-white-105', ApartmentData> = {
  'aveiro-sunset': {
    id: 'aveiro-sunset',
    name: 'Aveiro Sunset',
    eyebrow: {
      pt: 'AVEIRO SUNSET',
      en: 'AVEIRO SUNSET',
    },
    heroTitle: {
      pt: 'Um espaço especial para viver Aveiro.',
      en: 'A special place to experience Aveiro.',
    },
    heroText: {
      pt: 'Um pequeno apartamento onde a vista para o canal, a luz natural e o ambiente acolhedor tornam a estadia ainda mais especial.',
      en: 'A charming apartment where canal views, natural light, and a warm atmosphere make your stay truly memorable.',
    },
    homeCardText: {
      pt: 'Um pequeno apartamento com uma vista especial para o canal de Aveiro. As grandes janelas deixam a cidade entrar e criam um ambiente acolhedor, luminoso e particularmente bonito ao fim do dia.',
      en: 'A charming apartment with a scenic view over the Aveiro canal. Expansive windows welcome the city in, creating a warm, bright ambiance that is especially enchanting at sunset.',
    },
    address: 'Rua de Abel Ribeiro, nº 49',
    postalCode: '3800-350',
    city: 'Aveiro',
    country: 'Portugal',
    bookingLocationScore: 9.1,
    bookingReviewsCount: 11,
    bookingUrl: 'https://www.booking.com/hotel/pt/aveiro-sunset.pt-br.html',
    heroImage: '/images/aveiro-sunset/aveiro-sunset-01.jpg',
    introTitle: {
      pt: 'Aveiro pela janela. Conforto ao chegar.',
      en: 'Aveiro through the window. Pure comfort upon arrival.',
    },
    introText: {
      pt: 'As grandes janelas com vista para o canal são uma das características que tornam o Aveiro Sunset tão particular. Durante o dia, deixam entrar a luz e a paisagem. Ao fim da tarde, criam um ambiente tranquilo e romântico para simplesmente parar e aproveitar. Um espaço pensado para quem quer conhecer Aveiro e ter um lugar agradável para regressar no final do dia.',
      en: 'The large windows overlooking the canal are what make Aveiro Sunset so distinct. By day, they invite golden light and canal views inside. Come evening, they create a peaceful, romantic setting to unwind and savor the moment. Thoughtfully designed for travelers who want to explore Aveiro and return to a cozy haven.',
    },
    capacity: {
      pt: 'Até 2 hóspedes',
      en: 'Up to 2 guests',
    },
    bedrooms: {
      pt: '1 Quarto / Estúdio em plano aberto',
      en: '1 Bedroom / Open-plan studio',
    },
    beds: {
      pt: '1 Cama de casal confortável',
      en: '1 Comfortable double bed',
    },
    bathrooms: {
      pt: '1 Casa de banho privativa completa com duche',
      en: '1 Full private bathroom with walk-in shower',
    },
    coordinates: {
      lat: 40.64333,
      lng: -8.65644,
    },
    highlights: [
      {
        pt: 'Grandes janelas panorâmicas com vista direta sobre o canal de Aveiro',
        en: 'Expansive panoramic windows with direct view over the Aveiro canal',
      },
      {
        pt: 'Luz natural deslumbrante e atmosfera romântica ao pôr do sol',
        en: 'Gorgeous natural sunlight and a romantic evening ambiance at dusk',
      },
      {
        pt: 'Estacionamento público gratuito a escassos metros do alojamento',
        en: 'Free public parking located just a few steps from the building',
      },
      {
        pt: 'A 1 minuto a pé dos barcos moliceiros e do histórico Bairro da Beira-Mar',
        en: '1 minute walk to the iconic moliceiro boats and the historic Beira-Mar quarter',
      },
    ],
    amenities: [
      {
        iconName: 'Eye',
        label: { pt: 'Vista para o Canal', en: 'Canal View' },
        description: { pt: 'Grandes janelas viradas para a água', en: 'Floor-to-ceiling windows facing water' },
      },
      {
        iconName: 'Wind',
        label: { pt: 'Ar Condicionado', en: 'Air Conditioning' },
        description: { pt: 'Climatização eficiente e silenciosa', en: 'Efficient heating and cooling' },
      },
      {
        iconName: 'Wifi',
        label: { pt: 'Wi-Fi de Alta Velocidade', en: 'High-Speed Wi-Fi' },
        description: { pt: 'Ligação estável gratuita', en: 'Reliable fast internet' },
      },
      {
        iconName: 'Utensils',
        label: { pt: 'Kitchenette Equipada', en: 'Equipped Kitchenette' },
        description: { pt: 'Frigorífico, placa, micro-ondas e loiça', en: 'Fridge, stove, microwave & kitchenware' },
      },
      {
        iconName: 'Coffee',
        label: { pt: 'Máquina de Café & Chaleira', en: 'Coffee Maker & Kettle' },
        description: { pt: 'Para o seu pequeno-almoço e pausas', en: 'For morning coffee and tea' },
      },
      {
        iconName: 'Tv',
        label: { pt: 'Televisão de Ecrã Plano', en: 'Flat-screen TV' },
        description: { pt: 'Canais por cabo', en: 'Cable channels' },
      },
      {
        iconName: 'ShowerHead',
        label: { pt: 'Casa de Banho Privativa', en: 'Private Bathroom' },
        description: { pt: 'Duche com produtos de higiene e toalhas', en: 'Shower, fresh towels & toiletries' },
      },
      {
        iconName: 'Key',
        label: { pt: 'Self Check-in Descomplicado', en: 'Smooth Self Check-in' },
        description: { pt: 'Instruções simples para entrada autónoma', en: 'Seamless keyless access' },
      },
    ],
    gallery: [
      {
        id: 'sunset-1',
        url: '/images/aveiro-sunset/aveiro-sunset-01.jpg',
        caption: {
          pt: 'Vista direta do quarto para as águas calmas da Ria e a passagem dos barcos moliceiros',
          en: 'Direct bedroom view over the calm waters of the Ria and passing moliceiro boats',
        },
        alt: { pt: 'Vista da janela do Aveiro Sunset para o canal', en: 'Window view of Aveiro Sunset over canal' },
        tag: 'vista',
      },
      {
        id: 'sunset-2',
        url: '/images/aveiro-sunset/aveiro-sunset-02.jpg',
        caption: {
          pt: 'Cama de casal acolhedora com almofadas artesanais, mantas quentes e cadeiras de design',
          en: 'Cozy double bed with handcrafted cushions, warm throws, and designer chairs',
        },
        alt: { pt: 'Quarto com cama de casal do Aveiro Sunset', en: 'Double bedroom at Aveiro Sunset' },
        tag: 'quarto',
      },
      {
        id: 'sunset-3',
        url: '/images/aveiro-sunset/aveiro-sunset-03.jpg',
        caption: {
          pt: 'Casa de banho privativa contemporânea com duche walk-in de teto e bancada suspensa',
          en: 'Contemporary private bathroom with walk-in rainfall shower and suspended vanity',
        },
        alt: { pt: 'Casa de banho moderna do Aveiro Sunset', en: 'Modern private bathroom at Aveiro Sunset' },
        tag: 'interior',
      },
      {
        id: 'sunset-4',
        url: '/images/aveiro-sunset/aveiro-sunset-04.jpg',
        caption: {
          pt: 'Kitchenette moderna com máquina de lavar louça, placa, micro-ondas e máquina de café',
          en: 'Modern kitchenette equipped with dishwasher, hob, microwave, and coffee maker',
        },
        alt: { pt: 'Kitchenette equipada do Aveiro Sunset', en: 'Kitchenette at Aveiro Sunset' },
        tag: 'cozinha',
      },
      {
        id: 'sunset-5',
        url: '/images/aveiro-sunset/aveiro-sunset-05.jpg',
        caption: {
          pt: 'Marquise envidraçada panorâmica de ângulo para contemplar o canal e a ponte com luz natural',
          en: 'Corner panoramic glazed loggia for gazing at the canal and bridge in natural light',
        },
        alt: { pt: 'Marquise panorâmica com vista sobre o canal', en: 'Panoramic enclosed balcony over the canal' },
        tag: 'vista',
      },
      {
        id: 'sunset-6',
        url: '/images/aveiro-sunset/aveiro-sunset-06.jpg',
        caption: {
          pt: 'Detalhes aconchegantes com candeeiro de palhinha natural e arte botânica dourada',
          en: 'Warm decorative accents with natural straw lamp and golden botanical wall art',
        },
        alt: { pt: 'Decoração e pormenor da cabeceira no Aveiro Sunset', en: 'Bedside decor detail at Aveiro Sunset' },
        tag: 'quarto',
      },
      {
        id: 'sunset-7',
        url: '/images/aveiro-sunset/aveiro-sunset-07.jpg',
        caption: {
          pt: 'Casa de banho com sanita suspensa, chão em madeira e apontamento de arte marítima azul',
          en: 'Bathroom featuring suspended toilet, light wood flooring, and blue ocean art piece',
        },
        alt: { pt: 'Pormenor sanitário e arte na casa de banho', en: 'Sanitary details and art in bathroom' },
        tag: 'interior',
      },
      {
        id: 'sunset-8',
        url: '/images/aveiro-sunset/aveiro-sunset-08.jpg',
        caption: {
          pt: 'Linhas limpas dos armários brancos lacados e espelho com moldura rústica em madeira',
          en: 'Clean aesthetic of white custom cabinetry and rustic wooden framed mirror',
        },
        alt: { pt: 'Armários e espelho de madeira rústica', en: 'Kitchen storage and rustic framed mirror' },
        tag: 'cozinha',
      },
      {
        id: 'sunset-9',
        url: '/images/aveiro-sunset/aveiro-sunset-09.jpg',
        caption: {
          pt: 'Claridade, ventilação natural e acabamentos brancos impecáveis na casa de banho privativa',
          en: 'Natural ventilation and pristine white contemporary finishes in the bathroom',
        },
        alt: { pt: 'Luz natural na casa de banho', en: 'Natural light in private bathroom' },
        tag: 'interior',
      },
      {
        id: 'sunset-10',
        url: '/images/aveiro-sunset/aveiro-sunset-10.jpg',
        caption: {
          pt: 'Fluidez do espaço: corredor e kitchenette em direção à varanda cheia de luz',
          en: 'Seamless open flow: kitchenette hallway extending towards the sunlit balcony',
        },
        alt: { pt: 'Corredor aberto e soalho claro', en: 'Open hallway and light wooden floors' },
        tag: 'interior',
      },
      {
        id: 'sunset-11',
        url: '/images/aveiro-sunset/aveiro-sunset-11.jpg',
        caption: {
          pt: 'Acordar e ter os moliceiros e a Ria de Aveiro no horizonte imediato',
          en: 'Waking up with traditional boats and the Aveiro Ria right on your horizon',
        },
        alt: { pt: 'Quarto com vista desafogada sobre a ria', en: 'Bedroom with open view over the ria' },
        tag: 'quarto',
      },
      {
        id: 'sunset-12',
        url: '/images/aveiro-sunset/aveiro-sunset-12.jpg',
        caption: {
          pt: 'Fachada contemporânea em terracota na pitoresca Rua de Abel Ribeiro com calçada portuguesa',
          en: 'Striking terracotta contemporary facade on historic Rua de Abel Ribeiro with cobblestone',
        },
        alt: { pt: 'Rua de Abel Ribeiro e fachada do alojamento', en: 'Rua de Abel Ribeiro and accommodation exterior' },
        tag: 'exterior',
      },
      {
        id: 'sunset-13',
        url: '/images/aveiro-sunset/aveiro-sunset-13.jpg',
        caption: {
          pt: 'Edifício de arquitetura de autor, esquina aberta para a Ria com pilares canelados',
          en: 'Architectural statement building with fluted pillars and open ria-facing corner',
        },
        alt: { pt: 'Esquina do edifício Aveiro Sunset', en: 'Corner architecture of Aveiro Sunset' },
        tag: 'exterior',
      },
      {
        id: 'sunset-14',
        url: '/images/aveiro-sunset/aveiro-sunset-14.jpg',
        caption: {
          pt: 'Passadiço de madeira e cais de embarque mesmo em frente ao alojamento',
          en: 'Wooden deck and boat boarding pier immediately in front of the accommodation',
        },
        alt: { pt: 'Cais e passadiço do canal junto ao Aveiro Sunset', en: 'Canal pier right in front of Aveiro Sunset' },
        tag: 'exterior',
      },
      {
        id: 'sunset-15',
        url: '/images/aveiro-sunset/aveiro-sunset-15.jpg',
        caption: {
          pt: 'O canal navegável de Aveiro e a ponte rodoviária sob a luminosidade límpida da cidade',
          en: 'The navigable canal of Aveiro and bridge under the pristine coastal sunlight',
        },
        alt: { pt: 'Canal de Aveiro e ponte', en: 'Aveiro canal and distant bridge' },
        tag: 'vista',
      },
    ],
    video: {
      title: {
        pt: 'Veja o Aveiro Sunset por dentro',
        en: 'Take a look inside Aveiro Sunset',
      },
      description: {
        pt: 'Uma forma simples de conhecer o espaço antes de chegar.',
        en: 'An effortless way to get to know the space before you arrive.',
      },
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-with-cozy-furniture-41480-large.mp4',
      thumbnail: '/images/aveiro-sunset/aveiro-sunset-01.jpg',
    },
    pointsOfInterest: [
      {
        id: 'poi-s-1',
        name: { pt: 'Canais Urbanos e Moliceiros', en: 'Urban Canals & Moliceiro Boats' },
        description: { pt: 'Passeios de barco tradicional e margens floridas', en: 'Traditional boat tours along picturesque banks' },
        walkMinutes: 1,
        category: 'canais',
      },
      {
        id: 'poi-s-2',
        name: { pt: 'Capela de São Gonçalinho', en: 'São Gonçalinho Chapel' },
        description: { pt: 'Coração das tradições e festas da Beira-Mar', en: 'Heart of local festivals and historic district' },
        walkMinutes: 3,
        category: 'cultura',
      },
      {
        id: 'poi-s-3',
        name: { pt: 'Praça do Peixe e Beira-Mar', en: 'Fish Market Square & Beira-Mar' },
        description: { pt: 'Zona vibrante de petiscos, esplanadas e convívio', en: 'Lively area with terraces, tapas, and atmosphere' },
        walkMinutes: 4,
        category: 'gastronomia',
      },
      {
        id: 'poi-s-4',
        name: { pt: 'Jardim do Rossio', en: 'Rossio Garden' },
        description: { pt: 'Espaço verde requalificado e palmeiras frente à ria', en: 'Refurbished riverside garden with scenic palms' },
        walkMinutes: 5,
        category: 'lazer',
      },
      {
        id: 'poi-s-5',
        name: { pt: 'Museu de Aveiro / Santa Joana', en: 'Aveiro Museum (Santa Joana)' },
        description: { pt: 'Antigo Convento de Jesus e arte sacra de referência', en: 'Former convent with rich sacred art collection' },
        walkMinutes: 12,
        category: 'cultura',
      },
    ],
    reviews: [
      {
        id: 'rev-s-1',
        apartmentId: 'aveiro-sunset',
        author: 'Nuno',
        country: 'Portugal',
        rating: 5,
        comment:
          'O apartamento é fenomenal, as grandes janelas para o canal de Aveiro torna este pequeno apartamento muito bonito é a atração deste apartamento sem dúvida se não fosse isso era um simples e pequeno espaço, á noite dá um ar romântico até parece cena de filme de Hollywood 😆 é diferente de tudo onde já tinha ficado nesta cidade, notasse que é novo e equipado com tudo o que faz falta, gostei da experiência. Tudo muito limpo e cheiroso.',
        source: 'Booking',
        status: 'approved',
      },
      {
        id: 'rev-s-2',
        apartmentId: 'aveiro-sunset',
        author: 'John',
        country: 'Australia',
        rating: 5,
        comment: 'Great location and outlook. A nice sunny apartment.',
        source: 'Booking',
        status: 'approved',
      },
      {
        id: 'rev-s-3',
        apartmentId: 'aveiro-sunset',
        author: 'Agrawal',
        country: 'Portugal',
        rating: 5,
        comment: 'Amazing place to stay, definitely choose for amazing sunset and canal view.',
        source: 'Booking',
        status: 'approved',
      },
      {
        id: 'rev-s-4',
        apartmentId: 'aveiro-sunset',
        author: 'Xavier',
        country: 'España',
        rating: 5,
        comment:
          'Decoración muy cuidada, con mucho gusto y estilo, se nota el cariño con el que se ha realizado. La ubicación es excelente, con un parking gratuito a pocos metros. Cama cómoda.',
        source: 'Booking',
        status: 'approved',
      },
    ],
  },

  'aveiro-white-105': {
    id: 'aveiro-white-105',
    name: 'Aveiro White 105',
    eyebrow: {
      pt: 'AVEIRO WHITE 105',
      en: 'AVEIRO WHITE 105',
    },
    heroTitle: {
      pt: 'Aveiro à porta. Conforto no lugar certo.',
      en: 'Aveiro at your doorstep. Comfort in the perfect spot.',
    },
    heroText: {
      pt: 'Um apartamento moderno, confortável e muito bem localizado para quem quer descobrir a cidade e ter um espaço tranquilo para regressar no final do dia.',
      en: 'A modern, comfortable, and ideally situated apartment for those who want to discover the city and have a peaceful retreat to return to at the end of the day.',
    },
    homeCardText: {
      pt: 'Um apartamento moderno, confortável e muito bem localizado, pensado para quem quer estar perto de tudo e ter um espaço tranquilo para regressar depois de um dia a descobrir Aveiro.',
      en: 'A modern, comfortable, and exceptionally well-located apartment, curated for those who wish to be close to everything and enjoy a tranquil haven after exploring Aveiro.',
    },
    address: 'Avenida Doutor Lourenço Peixinho, nº 50',
    postalCode: '3800-165',
    city: 'Aveiro',
    country: 'Portugal',
    bookingLocationScore: 9.9,
    bookingReviewsCount: 40,
    bookingUrl: 'https://www.booking.com/hotel/pt/aveiro-white-105.pt-br.html',
    heroImage: '/images/aveiro-white/aveiro-white-01.jpg',
    introTitle: {
      pt: 'Fique perto de tudo o que faz Aveiro especial.',
      en: 'Stay close to everything that makes Aveiro truly special.',
    },
    introText: {
      pt: 'Há viagens em que a localização muda tudo. Sair para explorar a cidade, descobrir um novo lugar para comer, caminhar junto aos canais e regressar facilmente ao seu alojamento torna a experiência mais simples — e mais agradável. No Aveiro White 105, a ideia é essa: ter Aveiro por perto e um espaço confortável para aproveitar a estadia.',
      en: 'There are trips where location changes everything. Stepping out to explore, finding a new favorite café, walking alongside the canals, and effortlessly returning home makes travel seamlessly delightful. At Aveiro White 105, that is the essence: Aveiro at your fingertips, paired with serene, quiet comfort.',
    },
    capacity: {
      pt: 'Até 2 hóspedes',
      en: 'Up to 2 guests',
    },
    bedrooms: {
      pt: '1 Quarto privativo aconchegante',
      en: '1 Cozy private bedroom',
    },
    beds: {
      pt: '1 Cama de casal maravilhosa',
      en: '1 Exceptional double bed',
    },
    bathrooms: {
      pt: '1 Casa de banho privativa contemporânea',
      en: '1 Contemporary private bathroom',
    },
    coordinates: {
      lat: 40.64241,
      lng: -8.64932,
    },
    highlights: [
      {
        pt: 'Localização imbatível na principal avenida de Aveiro (9,9/10 no Booking)',
        en: 'Unbeatable address on Aveiro main avenue (9.9/10 location score on Booking)',
      },
      {
        pt: 'Extremamente silencioso com janelas voltadas para pátio interior pacífico',
        en: 'Extremely quiet with windows facing an indoor peaceful courtyard',
      },
      {
        pt: 'A escassos minutos a pé da Estação Ferroviária de Aveiro (comboios)',
        en: 'A short pleasant walk from Aveiro Central Railway Station',
      },
      {
        pt: 'Decoração contemporânea, arejada e cama considerada maravilhosa pelos hóspedes',
        en: 'Airy modern decor with a bed praised as wonderful by guests',
      },
    ],
    amenities: [
      {
        iconName: 'MapPin',
        label: { pt: 'Localização Central 9,9/10', en: 'Central Location 9.9/10' },
        description: { pt: 'Avenida Dr. Lourenço Peixinho', en: 'On main central avenue' },
      },
      {
        iconName: 'VolumeX',
        label: { pt: 'Extremamente Silencioso', en: 'Extremely Quiet' },
        description: { pt: 'Virado para o interior, sem ruído de trânsito', en: 'Indoor-facing, undisturbed rest' },
      },
      {
        iconName: 'Wind',
        label: { pt: 'Ar Condicionado', en: 'Air Conditioning' },
        description: { pt: 'Temperatura perfeita em qualquer estação', en: 'Climate control for all seasons' },
      },
      {
        iconName: 'Wifi',
        label: { pt: 'Wi-Fi Fibra de Alta Velocidade', en: 'High-Speed Fiber Wi-Fi' },
        description: { pt: 'Ideal para lazer ou teletrabalho', en: 'Great for leisure or remote work' },
      },
      {
        iconName: 'BedDouble',
        label: { pt: 'Cama de Casal Confortável', en: 'Premium Bed' },
        description: { pt: 'Colchão de elevada qualidade e lençóis macios', en: 'High comfort mattress and soft sheets' },
      },
      {
        iconName: 'Utensils',
        label: { pt: 'Kitchenette Completa', en: 'Complete Kitchenette' },
        description: { pt: 'Placa, frigorífico, micro-ondas e máquina de café', en: 'Stove, fridge, microwave & coffee maker' },
      },
      {
        iconName: 'Train',
        label: { pt: 'Perto da Estação de Comboios', en: 'Close to Railway Station' },
        description: { pt: 'Fácil chegada de comboio a partir do Porto ou Lisboa', en: 'Easy train arrival from Porto or Lisbon' },
      },
      {
        iconName: 'Key',
        label: { pt: 'Instruções de Check-in Simples', en: 'Super Easy Check-in' },
        description: { pt: 'Anfitrião atencioso e entrada autónoma rápida', en: 'Responsive host and keyless entry' },
      },
    ],
    gallery: [
      {
        id: 'white-1',
        url: '/images/aveiro-white/aveiro-white-01.jpg',
        caption: {
          pt: 'Espaço arejado, moderno e luminoso com paleta branca e toques contemporâneos',
          en: 'Airy, modern, and luminous living area with clean white palette',
        },
        alt: { pt: 'Sala e ambiente do Aveiro White 105', en: 'Living area at Aveiro White 105' },
        tag: 'interior',
      },
      {
        id: 'white-2',
        url: '/images/aveiro-white/aveiro-white-02.jpg',
        caption: {
          pt: 'Cama maravilhosa elogiada pelos hóspedes para noites de sono serenas e revigorantes',
          en: 'Wonderful comfortable bed praised by guests for restful nights',
        },
        alt: { pt: 'Quarto acolhedor Aveiro White 105', en: 'Bedroom at Aveiro White 105' },
        tag: 'quarto',
      },
      {
        id: 'white-3',
        url: '/images/aveiro-white/aveiro-white-03.jpg',
        caption: {
          pt: 'Área de descanso e detalhes de design moderno',
          en: 'Relaxing area and modern design nuances',
        },
        alt: { pt: 'Pormenor do quarto Aveiro White 105', en: 'Bedroom detail at Aveiro White 105' },
        tag: 'quarto',
      },
      {
        id: 'white-4',
        url: '/images/aveiro-white/aveiro-white-04.jpg',
        caption: {
          pt: 'Kitchenette prática e totalmente equipada para preparar refeições',
          en: 'Practical kitchenette fully equipped to prepare meals',
        },
        alt: { pt: 'Kitchenette Aveiro White 105', en: 'Kitchenette at Aveiro White 105' },
        tag: 'cozinha',
      },
      {
        id: 'white-5',
        url: '/images/aveiro-white/aveiro-white-05.jpg',
        caption: {
          pt: 'Espaço de refeições e preparação culinária acolhedor',
          en: 'Cozy dining space and culinary preparation counter',
        },
        alt: { pt: 'Espaço de refeições Aveiro White 105', en: 'Dining area at Aveiro White 105' },
        tag: 'cozinha',
      },
      {
        id: 'white-6',
        url: '/images/aveiro-white/aveiro-white-06.jpg',
        caption: {
          pt: 'Casa de banho privativa moderna com duche espaçoso e acabamentos elegantes',
          en: 'Modern private bathroom with spacious walk-in shower and refined finishes',
        },
        alt: { pt: 'Casa de banho Aveiro White 105', en: 'Bathroom at Aveiro White 105' },
        tag: 'interior',
      },
      {
        id: 'white-7',
        url: '/images/aveiro-white/aveiro-white-07.jpg',
        caption: {
          pt: 'Detalhe da casa de banho, espelho iluminado e comodidades contemporâneas',
          en: 'Bathroom detail with illuminated mirror and contemporary amenities',
        },
        alt: { pt: 'Detalhes da casa de banho Aveiro White 105', en: 'Bathroom details at Aveiro White 105' },
        tag: 'interior',
      },
      {
        id: 'white-8',
        url: '/images/aveiro-white/aveiro-white-08.jpg',
        caption: {
          pt: 'Ambiente silencioso voltado para o interior, garantindo noites tranquilas',
          en: 'Quiet inward-facing setting ensuring serene, undisturbed nights',
        },
        alt: { pt: 'Ambiente acolhedor Aveiro White 105', en: 'Cozy interior at Aveiro White 105' },
        tag: 'interior',
      },
      {
        id: 'white-9',
        url: '/images/aveiro-white/aveiro-white-09.jpg',
        caption: {
          pt: 'Iluminação cuidada e pormenores que criam uma atmosfera acolhedora',
          en: 'Thoughtful lighting and tasteful nuances creating a welcoming atmosphere',
        },
        alt: { pt: 'Iluminação e design Aveiro White 105', en: 'Lighting and design at Aveiro White 105' },
        tag: 'interior',
      },
      {
        id: 'white-10',
        url: '/images/aveiro-white/aveiro-white-10.jpg',
        caption: {
          pt: 'Espaço otimizado, moderno e funcional para estadias curtas ou prolongadas',
          en: 'Optimized, modern and functional space for short or extended stays',
        },
        alt: { pt: 'Espaço interior Aveiro White 105', en: 'Interior space at Aveiro White 105' },
        tag: 'interior',
      },
      {
        id: 'white-11',
        url: '/images/aveiro-white/aveiro-white-11.jpg',
        caption: {
          pt: 'Pormenores de conforto e arrumação prática',
          en: 'Comfort details and practical storage solutions',
        },
        alt: { pt: 'Detalhes Aveiro White 105', en: 'Details at Aveiro White 105' },
        tag: 'interior',
      },
      {
        id: 'white-12',
        url: '/images/aveiro-white/aveiro-white-12.jpg',
        caption: {
          pt: 'Acesso prático e localização central na principal artéria de Aveiro',
          en: 'Convenient access and central location on Aveiro main thoroughfare',
        },
        alt: { pt: 'Acesso e localização Aveiro White 105', en: 'Access and location Aveiro White 105' },
        tag: 'exterior',
      },
    ],
    video: {
      title: {
        pt: 'Entre e descubra o Aveiro White 105',
        en: 'Step in and discover Aveiro White 105',
      },
      description: {
        pt: 'Veja o espaço, os ambientes e os detalhes do apartamento antes da sua chegada.',
        en: 'See the space, rooms, and nuances of the apartment before your arrival.',
      },
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-contemporary-bright-apartment-43405-large.mp4',
      thumbnail: '/images/aveiro-white/aveiro-white-01.jpg',
    },
    pointsOfInterest: [
      {
        id: 'poi-w-1',
        name: { pt: 'Avenida Dr. Lourenço Peixinho', en: 'Avenida Dr. Lourenço Peixinho' },
        description: { pt: 'Principal eixo comercial com cafés, padarias e passeios pedonais', en: 'Main city boulevard with cafes, bakeries, and pedestrian areas' },
        walkMinutes: 0,
        category: 'lazer',
      },
      {
        id: 'poi-w-2',
        name: { pt: 'Estação Ferroviária de Aveiro', en: 'Aveiro Railway Station' },
        description: { pt: 'Fachada histórica com azulejos tradicionais e comboios Alfa Pendular', en: 'Historic tile facade and high-speed train connections' },
        walkMinutes: 4,
        category: 'transporte',
      },
      {
        id: 'poi-w-3',
        name: { pt: 'Centro Histórico e Canal Central', en: 'Historic Center & Central Canal' },
        description: { pt: 'Início dos canais de Aveiro e dos moliceiros', en: 'Gateway to Aveiro canals and traditional boats' },
        walkMinutes: 6,
        category: 'canais',
      },
      {
        id: 'poi-w-4',
        name: { pt: 'Bairro da Beira-Mar', en: 'Beira-Mar Historic Quarter' },
        description: { pt: 'Ruas pitorescas, pastelarias de ovos moles e arquitetura típica', en: 'Picturesque alleyways, local bakeries, and typical houses' },
        walkMinutes: 9,
        category: 'cultura',
      },
      {
        id: 'poi-w-5',
        name: { pt: 'Centro de Congressos de Aveiro', en: 'Aveiro Congressional Center' },
        description: { pt: 'Antiga fábrica Jerónimo Pereira Campos junto ao lago', en: 'Historic brick factory by the lake converted into congress center' },
        walkMinutes: 10,
        category: 'cultura',
      },
    ],
    reviews: [
      {
        id: 'rev-w-1',
        apartmentId: 'aveiro-white-105',
        author: 'Patrick',
        country: 'Portugal',
        rating: 5,
        comment:
          'Apartamento impecável, como novo e super bem localizado. Check-in super simples Arejado e moderno Cama maravilhosa.',
        source: 'Booking',
        status: 'approved',
      },
      {
        id: 'rev-w-2',
        apartmentId: 'aveiro-white-105',
        author: 'Inês',
        country: 'Portugal',
        rating: 5,
        comment:
          'A localização, fica no centro acessível a tudo para explicar a cidade O apartamento é realmente confortável e aconchegante.',
        source: 'Booking',
        status: 'approved',
      },
      {
        id: 'rev-w-3',
        apartmentId: 'aveiro-white-105',
        author: 'Mariana',
        country: 'Brasil',
        rating: 5,
        comment:
          'Apartamento muito limpo e bem mobiliado. Tem tudo que é necessário para uma ótima estada.',
        source: 'Booking',
        status: 'approved',
      },
      {
        id: 'rev-w-4',
        apartmentId: 'aveiro-white-105',
        author: 'Felipe',
        country: 'Portugal',
        rating: 5,
        comment: 'De tudo, acomodação maravilhosa. Minha esposa e eu adoramos.',
        source: 'Booking',
        status: 'approved',
      },
      {
        id: 'rev-w-5',
        apartmentId: 'aveiro-white-105',
        author: 'Andrea',
        country: 'Suécia',
        rating: 5,
        comment:
          "I can't believe there weren't more people leaving a review for this place. In summary: Super easy instructions. Super responsive host. Beautiful and clean apartment. Comfortable bed. Great location. Just a few minutes' walk from the station. Beautiful windows. Extremely quiet, indoor facing.",
        source: 'Booking',
        status: 'approved',
      },
    ],
  },
};
