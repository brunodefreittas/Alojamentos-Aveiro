import React from 'react';
import { Utensils, Sparkles, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HomeGastronomySectionProps {
  lang: Language;
  onExploreGastronomy: () => void;
  onOpenPhotoLightbox: (url: string, caption: string) => void;
}

export const HomeGastronomySection: React.FC<HomeGastronomySectionProps> = ({
  lang,
  onExploreGastronomy,
  onOpenPhotoLightbox,
}) => {
  const t = TRANSLATIONS[lang].gastronomy;
  const foodImg = '/images/fotos-aveiro/foto-menor-detalhe-aveiro-08.jpg';

  return (
    <section id="gastronomia" className="py-24 bg-[#0a0c10] text-[#ecebe8] border-t border-[#1a1f2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-4 font-medium bg-[#131722] border border-[#c5a880]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.eyebrow}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf8f3] font-normal tracking-tight mb-6">
              {t.title}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#a8a396] font-light leading-relaxed mb-8">
              {t.text.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <button
              onClick={onExploreGastronomy}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] text-xs uppercase tracking-wider font-medium shadow-lg transition-all duration-200"
            >
              <span>{t.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Imagery */}
          <div className="lg:col-span-5">
            <div
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#232b3d] shadow-2xl group cursor-pointer"
              onClick={() =>
                onOpenPhotoLightbox(
                  foodImg,
                  lang === 'pt'
                    ? 'Gastronomia e doçaria tradicional de Aveiro'
                    : 'Gastronomy and traditional sweets of Aveiro'
                )
              }
            >
              <img
                src={foodImg}
                alt="Gastronomia de Aveiro"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/90 via-[#0a0c10]/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0a0c10]/80 text-[#c5a880] border border-[#c5a880]/30 text-[10px] uppercase tracking-wider backdrop-blur-md mb-2">
                  <Utensils className="w-3 h-3" />
                  <span>{lang === 'pt' ? 'Tradição & Paladar' : 'Tradition & Flavor'}</span>
                </div>
                <h4 className="font-serif text-lg text-[#fbf8f3]">
                  {lang === 'pt' ? 'Ovos Moles IGP & Sabores do Mar' : 'Ovos Moles & Fresh Seafood'}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
