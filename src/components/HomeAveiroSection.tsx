import React from 'react';
import { Compass, Sparkles, Waves, Building2, Palmtree, Sunset } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HomeAveiroSectionProps {
  lang: Language;
  onExploreMore: () => void;
}

export const HomeAveiroSection: React.FC<HomeAveiroSectionProps> = ({
  lang,
  onExploreMore,
}) => {
  const t = TRANSLATIONS[lang].aveiroIntro;

  const icons = [
    <Waves key="waves" className="w-5 h-5 text-[#c5a880]" />,
    <Building2 key="bld" className="w-5 h-5 text-[#c5a880]" />,
    <Palmtree key="palm" className="w-5 h-5 text-[#c5a880]" />,
    <Sunset key="sun" className="w-5 h-5 text-[#c5a880]" />,
  ];

  return (
    <section id="sobre-aveiro" className="py-24 bg-[#0d1017] text-[#ecebe8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-4 font-medium bg-[#131722] border border-[#c5a880]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.eyebrow}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf8f3] font-normal tracking-tight mb-6">
            {t.title}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#a8a396] font-light leading-relaxed">
            {t.text.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={onExploreMore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171c2a] hover:bg-[#202738] text-[#c5a880] border border-[#c5a880]/30 text-xs uppercase tracking-wider font-medium transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{t.cta}</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#11141c] border border-[#1e2434] hover:border-[#c5a880]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#171b26] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {icons[idx]}
                </div>
                <h3 className="font-serif text-lg text-[#f4eee6] mb-3 group-hover:text-[#c5a880] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9b9588] font-light leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
