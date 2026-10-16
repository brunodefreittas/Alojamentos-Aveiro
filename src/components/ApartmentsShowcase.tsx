import React from 'react';
import { MapPin, Star, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language, ApartmentId } from '../types';
import { APARTMENTS_DATA } from '../data/apartmentsData';
import { TRANSLATIONS } from '../data/translations';

interface ApartmentsShowcaseProps {
  lang: Language;
  onSelectApartment: (aptId: ApartmentId) => void;
  onOpenPhotoLightbox: (url: string, caption: string, fallbackUrl?: string) => void;
}

export const ApartmentsShowcase: React.FC<ApartmentsShowcaseProps> = ({
  lang,
  onSelectApartment,
  onOpenPhotoLightbox,
}) => {
  const white = APARTMENTS_DATA['aveiro-white-105'];

  return (
    <section id="alojamentos" className="py-24 bg-[#0a0c10] text-[#ecebe8] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-4 font-medium bg-[#141824] border border-[#c5a880]/20">
            <span>{TRANSLATIONS[lang].nav.apartments}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-[#fbf8f3] font-normal mb-5">
            {lang === 'pt' ? 'O seu alojamento em Aveiro' : 'Your accommodation in Aveiro'}
          </h2>
          <p className="text-sm sm:text-base text-[#9b9588] font-light leading-relaxed">
            {lang === 'pt'
              ? 'Um espaço moderno, confortável e central para desfrutar da cidade com total comodidade.'
              : 'A modern, comfortable, and central space to enjoy the city with total convenience.'}
          </p>
        </div>

        {/* Single Featured Apartment Card */}
        <div className="rounded-3xl bg-[#11141c] border border-[#202738] hover:border-[#c5a880]/50 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row group shadow-2xl">
          {/* Image Container */}
          <div className="relative lg:w-1/2 aspect-[16/10] lg:aspect-auto bg-[#08090d] overflow-hidden min-h-[320px]">
            <img
              src={white.heroImage}
              alt="Aveiro White 105 - Apartamento moderno e central"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 cursor-pointer"
              onClick={() =>
                onOpenPhotoLightbox(
                  white.heroImage,
                  lang === 'pt'
                    ? 'Aveiro White 105 - Decoração contemporânea e conforto'
                    : 'Aveiro White 105 - Contemporary decor and comfort'
                )
              }
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#11141c] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Quick Tag */}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-[#0a0c10]/80 text-[#c5a880] border border-[#c5a880]/30 backdrop-blur-md">
              {lang === 'pt' ? 'Centro & Estação' : 'Center & Station'}
            </span>
          </div>

          {/* Card Content */}
          <div className="p-6 sm:p-10 lg:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f6f2ec] group-hover:text-[#c5a880] transition-colors">
                  {white.name}
                </h3>
              </div>

              {/* Address & Booking Rating Note */}
              <div className="flex items-center gap-2 text-xs text-[#a09a8e] mb-2 font-light">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <span>{white.address}, {white.city}</span>
              </div>



              <p className="text-sm text-[#b8b3a7] font-light leading-relaxed mb-6">
                {white.homeCardText[lang]}
              </p>

              {/* Key Highlights */}
              <div className="space-y-2.5 mb-8 pt-4 border-t border-[#1d2332]">
                {white.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#c9c4b8]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                    <span>{item[lang]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-[#1d2332]">
              <button
                onClick={() => onSelectApartment('aveiro-white-105')}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] font-medium text-xs tracking-wider uppercase transition-all duration-200"
              >
                <span>{lang === 'pt' ? 'Conhecer o Aveiro White 105' : 'Discover Aveiro White 105'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={white.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#003580] hover:bg-[#002b66] text-white text-xs font-medium border border-[#1e4c9a] transition-all duration-200"
              >
                <span>Booking</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
