export type PropertyType = 'apartment' | 'house' | 'land' | 'commercial';

export type PropertyStatus = 'for_sale' | 'reserved' | 'sold';

export type EnergyCertificate = 'A+' | 'A' | 'B' | 'B-' | 'C' | 'D' | 'Exempt';

export interface RealEstateProperty {
  id: string;
  title: string;
  slug: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  typology: string; // e.g. 'T2', 'T3', 'T4', 'Terreno Urbano', 'Moradia T3'
  gross_area: number; // m²
  useful_area: number; // m²
  energy_certificate: EnergyCertificate;
  location: string; // e.g., 'Vera Cruz, Aveiro', 'Glória e Vera Cruz', 'Esgueira'
  description: {
    pt: string;
    en: string;
  };
  features: string[]; // e.g., ['Garagem', 'Varanda', 'Elevador', 'Churrasqueira', 'Aquecimento Central', 'Vista Ria']
  images: string[];
  featured: boolean;
  created_at: string;
  contact_email?: string;
  contact_phone?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  og_image?: string;
}

export interface PropertyFilterState {
  type: string; // 'all' or PropertyType
  minPrice: number;
  maxPrice: number;
  typology: string; // 'all' or typology
  location: string; // 'all' or location
  searchQuery: string;
}
