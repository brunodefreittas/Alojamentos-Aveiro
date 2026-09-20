import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  lang: Language;
  onExploreApartments: () => void;
  onDiscoverAveiro: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onExploreApartments,
  onDiscoverAveiro,
}) => {
  const t = TRANSLATIONS[lang].hero;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0a0c10]">
      {/* Background Image of Aveiro with refined overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src="/images/fotos-aveiro/aveiro-fim-do-dia.jpg"
          alt="Canais de Aveiro e Ria ao entardecer"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer gradient overlays for text readability and warm elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/70 to-[#0a0c10]/40" />
        <div className="absolute inset-0 bg-[#0a0c10]/30 backdrop-brightness-95" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131620]/80 border border-[#c5a880]/30 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
            {t.eyebrow}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#fbf8f3] font-normal tracking-tight leading-[1.15] mb-6 drop-shadow-md">
          {t.title}
        </h1>

        {/* Subtitle / Descriptive Copy */}
        <p className="text-base sm:text-lg md:text-xl text-[#d5d0c5] font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow">
          {t.text}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreApartments}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] font-medium text-sm tracking-wide shadow-xl hover:shadow-[#c5a880]/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>{t.cta}</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onDiscoverAveiro}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#141824]/80 hover:bg-[#1b2030] text-[#ecebe8] border border-[#2d3748] hover:border-[#c5a880]/40 backdrop-blur-md text-sm font-light tracking-wide transition-all duration-200"
          >
            <Compass className="w-4 h-4 text-[#c5a880]" />
            <span>{t.secondaryCta}</span>
          </button>
        </div>
      </motion.div>

      {/* Floating indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center text-[#8e887d] opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest mb-1">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-[#8e887d] flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-[#c5a880] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
