import React from 'react';
import {
  MapPin,
  Star,
  ExternalLink,
  CheckCircle2,
  Maximize2,
  Calendar,
  Users,
  Bed,
  Bath,
  ArrowLeft,
  Share2,
  Sparkles,
  Eye,
  Wind,
  Wifi,
  Utensils,
  Coffee,
  Tv,
  ShowerHead,
  Key,
  VolumeX,
  BedDouble,
  Train,
} from 'lucide-react';
import { Language, ApartmentData, Review } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ApartmentViewProps {
  apartment: ApartmentData;
  lang: Language;
  onBackToHome: () => void;
  onOpenPhotoLightbox: (url: string, caption: string, fallbackUrl?: string) => void;
}

export const ApartmentView: React.FC<ApartmentViewProps> = ({
  apartment,
  lang,
  onBackToHome,
  onOpenPhotoLightbox,
}) => {
  const t = TRANSLATIONS[lang].apartmentPage;

  // Icon mapping helper
  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye':
        return <Eye className="w-5 h-5 text-[#c5a880]" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-[#c5a880]" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-[#c5a880]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#c5a880]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#c5a880]" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-[#c5a880]" />;
      case 'ShowerHead':
        return <ShowerHead className="w-5 h-5 text-[#c5a880]" />;
      case 'Key':
        return <Key className="w-5 h-5 text-[#c5a880]" />;
      case 'VolumeX':
        return <VolumeX className="w-5 h-5 text-[#c5a880]" />;
      case 'BedDouble':
        return <BedDouble className="w-5 h-5 text-[#c5a880]" />;
      case 'Train':
        return <Train className="w-5 h-5 text-[#c5a880]" />;
      case 'MapPin':
      default:
        return <MapPin className="w-5 h-5 text-[#c5a880]" />;
    }
  };

  const allReviews = apartment.reviews;

  return (
    <article className="bg-[#0a0c10] text-[#ecebe8] pt-24 pb-20">
      {/* Top Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#a09a8e] hover:text-[#c5a880] transition-colors py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'pt' ? 'Voltar aos alojamentos' : 'Back to accommodations'}</span>
        </button>
      </div>

      {/* 1. HERO DO ALOJAMENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden border border-[#232b3d] shadow-2xl bg-[#11141c]">
          {/* Main Hero Photo Container */}
          <div className="relative min-h-[540px] sm:aspect-[21/9] w-full bg-[#08090d] flex flex-col justify-between p-5 sm:p-10">
            <img
              src={apartment.heroImage}
              alt={apartment.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const fallback = apartment.gallery[0]?.fallbackUrl;
                if (fallback && e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/85 to-[#0a0c10]/60" />

            {/* Top badges */}
            <div className="relative z-10 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#003580]/95 text-white backdrop-blur-md border border-[#1e4c9a] shadow-lg">
                <span className="text-xs font-semibold tracking-wider">Booking.com</span>
                <span className="px-1.5 py-0.5 rounded bg-white text-[#003580] text-xs font-bold">
                  {apartment.bookingLocationScore.toString().replace('.', ',')}
                </span>
              </div>
              <span className="text-[11px] text-[#e0ded8] bg-[#0a0c10]/90 border border-[#2c354a] px-3 py-1.5 rounded-xl backdrop-blur-md">
                {lang === 'pt'
                  ? `Baseado em ${apartment.bookingReviewsCount} avaliações`
                  : `Based on ${apartment.bookingReviewsCount} reviews`}
              </span>
            </div>

            {/* Bottom Hero Content */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mt-12 sm:mt-0">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
                  {apartment.eyebrow[lang]}
                </span>
                <h1 className="font-serif text-2xl sm:text-5xl text-[#fbf8f3] font-normal tracking-tight mb-3">
                  {apartment.heroTitle[lang]}
                </h1>
                <p className="text-xs sm:text-sm text-[#c9c4b8] font-light leading-relaxed mb-4">
                  {apartment.heroText[lang]}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#a09a8e]">
                  <MapPin className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>{apartment.address}, {apartment.postalCode} {apartment.city}</span>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="shrink-0">
                <a
                  href={apartment.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#003580] hover:bg-[#002b66] text-white font-medium text-xs tracking-wider uppercase border border-[#1e4c9a] shadow-2xl hover:scale-105 transition-all duration-200"
                >
                  <span>{t.bookButton}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUÇÃO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h2 className="font-serif text-2xl sm:text-4xl text-[#fbf8f3] font-normal tracking-tight mb-6">
          {apartment.introTitle[lang]}
        </h2>
        <p className="text-sm sm:text-base text-[#b0aaa0] font-light leading-relaxed max-w-3xl mx-auto">
          {apartment.introText[lang]}
        </p>
      </section>

      {/* 3. GALERIA DE FOTOGRAFIAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            {t.galleryEyebrow}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf8f3]">
            {t.galleryTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#9b9588] mt-1 font-light">
            {t.galleryText}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartment.gallery.map((img) => (
            <div
              key={img.id}
              onClick={() => onOpenPhotoLightbox(img.url, img.caption[lang], img.fallbackUrl)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#11141c] border border-[#202636] hover:border-[#c5a880]/50 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <img
                src={img.url}
                alt={img.alt[lang]}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  if (img.fallbackUrl && e.currentTarget.src !== img.fallbackUrl) {
                    e.currentTarget.src = img.fallbackUrl;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs text-[#f6f2ec] font-light truncate max-w-[85%]">
                    {img.caption[lang]}
                  </p>
                  <Maximize2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CARACTERÍSTICAS E COMODIDADES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            {lang === 'pt' ? 'DETALHES DO ALOJAMENTO' : 'APARTMENT SPECIFICATIONS'}
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl text-[#fbf8f3]">
            {t.specsTitle}
          </h3>
        </div>

        {/* Quick Specs 4-Box Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-[#11141c] border border-[#202738]">
            <Users className="w-5 h-5 text-[#c5a880] mb-2" />
            <div className="text-[11px] text-[#8e887d] uppercase tracking-wider mb-1">
              {t.capacityLabel}
            </div>
            <div className="text-sm font-medium text-[#fbf8f3]">{apartment.capacity[lang]}</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#11141c] border border-[#202738]">
            <Bed className="w-5 h-5 text-[#c5a880] mb-2" />
            <div className="text-[11px] text-[#8e887d] uppercase tracking-wider mb-1">
              {t.bedroomsLabel}
            </div>
            <div className="text-sm font-medium text-[#fbf8f3]">{apartment.bedrooms[lang]}</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#11141c] border border-[#202738]">
            <BedDouble className="w-5 h-5 text-[#c5a880] mb-2" />
            <div className="text-[11px] text-[#8e887d] uppercase tracking-wider mb-1">
              {t.bedsLabel}
            </div>
            <div className="text-sm font-medium text-[#fbf8f3]">{apartment.beds[lang]}</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#11141c] border border-[#202738]">
            <Bath className="w-5 h-5 text-[#c5a880] mb-2" />
            <div className="text-[11px] text-[#8e887d] uppercase tracking-wider mb-1">
              {t.bathroomsLabel}
            </div>
            <div className="text-sm font-medium text-[#fbf8f3]">{apartment.bathrooms[lang]}</div>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="rounded-3xl bg-[#11141c] border border-[#202738] p-8 sm:p-10">
          <h4 className="font-serif text-xl text-[#fbf8f3] mb-6">
            {t.amenitiesLabel}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apartment.amenities.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-[#151924]/60 border border-[#22293b]">
                <div className="w-9 h-9 rounded-lg bg-[#1b2030] flex items-center justify-center shrink-0">
                  {getAmenityIcon(item.iconName)}
                </div>
                <div>
                  <div className="text-xs font-medium text-[#f5efe6]">{item.label[lang]}</div>
                  {item.description && (
                    <div className="text-[11px] text-[#8e887d] font-light mt-0.5">
                      {item.description[lang]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LOCALIZAÇÃO E PONTOS DE INTERESSE A PÉ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            {t.locationEyebrow}
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl text-[#fbf8f3] mb-2">
            {t.locationTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#a09a8e] font-light">
            {apartment.id === 'aveiro-sunset'
              ? lang === 'pt'
                ? 'O Aveiro Sunset está situado na Rua de Abel Ribeiro, numa zona que permite explorar a cidade e chegar facilmente aos seus principais pontos de interesse.'
                : 'Aveiro Sunset is located on Rua de Abel Ribeiro, a prime setting allowing you to explore the city and easily stroll to key landmarks.'
              : lang === 'pt'
              ? 'O Aveiro White 105 está situado na Avenida Doutor Lourenço Peixinho, numa localização central que permite explorar Aveiro e descobrir a cidade a pé.'
              : 'Aveiro White 105 is situated on Avenida Doutor Lourenço Peixinho, a central avenue providing immediate access to explore Aveiro on foot.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Points of interest list */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-3">
              {t.pointsOfInterestTitle}
            </h4>

            {apartment.pointsOfInterest.map((poi) => (
              <div
                key={poi.id}
                className="p-4 rounded-2xl bg-[#11141c] border border-[#202738] hover:border-[#c5a880]/30 transition-all flex items-center justify-between"
              >
                <div>
                  <h5 className="font-medium text-xs sm:text-sm text-[#f5efe6]">{poi.name[lang]}</h5>
                  <p className="text-[11px] text-[#8e887d] font-light mt-0.5">{poi.description[lang]}</p>
                </div>
                <div className="shrink-0 text-right pl-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1b2030] text-[#c5a880] font-medium text-xs border border-[#2d374d]">
                    {poi.walkMinutes} {t.minutesWalk}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map Visualizer */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden bg-[#11141c] border border-[#222838] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] text-[#8e887d] uppercase tracking-wider block">Morada</span>
                <span className="font-serif text-sm text-[#fbf8f3]">{apartment.address}, Aveiro</span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${apartment.name}, ${apartment.address}, ${apartment.city}, Portugal`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#c5a880] hover:underline font-medium"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded interactive Google Map */}
            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#262e40] relative">
              <iframe
                title={`Mapa ${apartment.name}`}
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${apartment.address}, ${apartment.city}, Portugal`)}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. DEPOIMENTOS E AVALIAÇÕES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              {t.reviewsEyebrow}
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#fbf8f3]">
              {t.reviewsTitle}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={apartment.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003580] hover:bg-[#002b66] text-white text-xs font-medium border border-[#1e4c9a]"
            >
              <span>{t.reviewsBookingCta}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#11141c] border border-[#202738] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#c5a880]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#181d2c] text-[#8e887d]">
                    {rev.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#c9c4b8] font-light leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#1a1f2c] flex items-center justify-between text-xs">
                <span className="font-serif text-[#fbf8f3] font-medium">{rev.author}</span>
                <span className="text-[#8e887d]">{rev.country}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA DE RESERVA NO BOOKING */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#131722] to-[#0f121a] border border-[#232b3d] shadow-2xl">
          <h3 className="font-serif text-2xl sm:text-4xl text-[#fbf8f3] mb-4">
            {t.interestedQuestion}
          </h3>
          <p className="text-xs sm:text-sm text-[#a09a8e] font-light max-w-xl mx-auto leading-relaxed mb-8">
            {t.interestedText}
          </p>

          <a
            href={apartment.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#003580] hover:bg-[#002b66] text-white font-medium text-xs tracking-wider uppercase border border-[#1e4c9a] shadow-xl hover:scale-105 transition-all duration-200"
          >
            <span>{t.bookButton}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </article>
  );
};
