import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Sparkles, Building, Waves } from 'lucide-react';
import { Language, ApartmentId } from '../types';
import { APARTMENTS_DATA } from '../data/apartmentsData';

interface LocationSectionProps {
  lang: Language;
  onSelectApartment: (aptId: ApartmentId) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  lang,
  onSelectApartment,
}) => {
  const [selectedTab, setSelectedTab] = useState<ApartmentId>('aveiro-sunset');

  const currentApartment = APARTMENTS_DATA[selectedTab];

  return (
    <section id="localizacao" className="py-24 bg-[#0d1017] text-[#ecebe8] border-t border-[#1a1f2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-4 font-medium bg-[#131722] border border-[#c5a880]/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? 'LOCALIZAÇÃO PRIVILEGIADA' : 'PRIME LOCATION'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf8f3] font-normal tracking-tight mb-4">
            {lang === 'pt' ? 'Aveiro, mesmo ali.' : 'Aveiro, right outside.'}
          </h2>

          <p className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed">
            {lang === 'pt'
              ? 'Mais do que saber onde fica o alojamento, queremos que sinta o que existe à sua volta. Duas localizações pensadas para descobrir a cidade inteiramente a pé.'
              : 'Beyond knowing where your accommodation sits, we want you to envision what awaits around you. Two settings curated for effortless exploration on foot.'}
          </p>
        </div>

        {/* Accommodation Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={() => setSelectedTab('aveiro-sunset')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
              selectedTab === 'aveiro-sunset'
                ? 'bg-[#c5a880] text-[#0a0c10] shadow-lg shadow-[#c5a880]/10'
                : 'bg-[#141824] text-[#a09a8e] hover:text-[#ecebe8] border border-[#232b3d]'
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>Aveiro Sunset (Rua Abel Ribeiro)</span>
          </button>

          <button
            onClick={() => setSelectedTab('aveiro-white-105')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
              selectedTab === 'aveiro-white-105'
                ? 'bg-[#c5a880] text-[#0a0c10] shadow-lg shadow-[#c5a880]/10'
                : 'bg-[#141824] text-[#a09a8e] hover:text-[#ecebe8] border border-[#232b3d]'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Aveiro White 105 (Av. Lourenço Peixinho)</span>
          </button>
        </div>

        {/* Active Accommodation Details Card & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-[#11141c] border border-[#232b3d] shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf8f3]">
                  {currentApartment.name}
                </h3>
                <span className="px-2.5 py-1 rounded-lg bg-[#003580] text-white text-xs font-bold">
                  {currentApartment.bookingLocationScore.toString().replace('.', ',')} / 10
                </span>
              </div>

              <div className="flex items-start gap-2 text-xs text-[#b0aaa0] mb-6 font-light">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>{currentApartment.address}, {currentApartment.postalCode} {currentApartment.city}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#8e887d] font-light leading-relaxed mb-6">
                {currentApartment.homeCardText[lang]}
              </p>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#c5a880] mb-3">
                {lang === 'pt' ? 'A pé a partir da porta' : 'Walking distance from the door'}
              </h4>

              <div className="space-y-2 mb-8">
                {currentApartment.pointsOfInterest.map((poi) => (
                  <div
                    key={poi.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#161a26] border border-[#22293b] text-xs"
                  >
                    <span className="text-[#f5efe6] font-medium">{poi.name[lang]}</span>
                    <span className="text-[#c5a880] font-light shrink-0">
                      {poi.walkMinutes} {lang === 'pt' ? 'min a pé' : 'min walk'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#1e2536]">
              <button
                onClick={() => onSelectApartment(currentApartment.id)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] text-xs font-medium uppercase tracking-wider transition-colors text-center"
              >
                {lang === 'pt' ? 'Ver página do alojamento' : 'View accommodation page'}
              </button>

              <a
                href={currentApartment.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#003580] hover:bg-[#002b66] text-white text-xs font-medium border border-[#1e4c9a] flex items-center gap-1.5 transition-colors"
              >
                <span>Booking</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Map Embed Column */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-[#11141c] border border-[#232b3d] p-3 shadow-xl flex flex-col">
            <div className="relative w-full h-[450px] lg:h-full rounded-2xl overflow-hidden border border-[#22293b]">
              <iframe
                title={`Mapa ${currentApartment.name}`}
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${currentApartment.address}, ${currentApartment.city}, Portugal`)}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
              />

              <div className="absolute top-4 right-4 z-10">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${currentApartment.name}, ${currentApartment.address}, ${currentApartment.city}, Portugal`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a0c10]/90 text-[#fbf8f3] text-xs font-medium border border-[#2e374d] backdrop-blur-md hover:bg-[#131620] shadow-xl transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>{lang === 'pt' ? 'Abrir direções no Google Maps' : 'Open directions in Google Maps'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
