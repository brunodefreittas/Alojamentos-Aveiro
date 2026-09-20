export type Language = 'pt' | 'en';

export type ApartmentId = 'aveiro-sunset' | 'aveiro-white-105';

export interface PointOfInterest {
  id: string;
  name: { pt: string; en: string };
  description: { pt: string; en: string };
  walkMinutes: number;
  category: 'canais' | 'cultura' | 'transporte' | 'gastronomia' | 'lazer';
}

export interface Review {
  id: string;
  apartmentId: ApartmentId;
  author: string;
  country: string;
  rating: number; // 0 to 5
  comment: string;
  date?: string;
  source: 'Booking' | 'Website';
  status: 'approved' | 'pending';
}

export interface GalleryImage {
  id: string;
  url: string;
  fallbackUrl?: string;
  caption: { pt: string; en: string };
  alt: { pt: string; en: string };
  tag: 'interior' | 'vista' | 'quarto' | 'cozinha' | 'exterior';
}

export interface ApartmentVideo {
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  videoUrl: string;
  thumbnail: string;
}

export interface ApartmentData {
  id: ApartmentId;
  name: string;
  eyebrow: { pt: string; en: string };
  heroTitle: { pt: string; en: string };
  heroText: { pt: string; en: string };
  address: string;
  postalCode: string;
  city: string;
  country: string;
  bookingLocationScore: number;
  bookingReviewsCount: number;
  bookingUrl: string;
  heroImage: string;
  introTitle: { pt: string; en: string };
  introText: { pt: string; en: string };
  homeCardText: { pt: string; en: string };
  capacity: { pt: string; en: string };
  bedrooms: { pt: string; en: string };
  beds: { pt: string; en: string };
  bathrooms: { pt: string; en: string };
  amenities: {
    iconName: string;
    label: { pt: string; en: string };
    description?: { pt: string; en: string };
  }[];
  gallery: GalleryImage[];
  video: ApartmentVideo;
  pointsOfInterest: PointOfInterest[];
  reviews: Review[];
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: { pt: string; en: string }[];
}

export interface EditorialArticle {
  id: string;
  slug: string;
  title: { pt: string; en: string };
  eyebrow: { pt: string; en: string };
  excerpt: { pt: string; en: string };
  content: { pt: string; en: string }[];
  image: string;
  category: 'canais' | 'centro' | 'gastronomia' | 'costa' | 'roteiros' | 'dicas';
  tips?: { pt: string; en: string }[];
}
