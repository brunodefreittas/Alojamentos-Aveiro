import React, { useState } from 'react';
import { Compass, Sparkles, BookOpen, Clock, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { Language, EditorialArticle } from '../types';
import { DISCOVER_AVEIRO_ARTICLES } from '../data/discoverAveiroData';
import { TRANSLATIONS } from '../data/translations';

interface DiscoverAveiroSectionProps {
  lang: Language;
  onOpenPhotoLightbox: (url: string, caption: string) => void;
}

export const DiscoverAveiroSection: React.FC<DiscoverAveiroSectionProps> = ({
  lang,
  onOpenPhotoLightbox,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<EditorialArticle | null>(null);

  return (
    <section id="descobrir-aveiro" className="py-24 bg-[#0a0c10] text-[#ecebe8] border-t border-[#1a1f2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-4 font-medium bg-[#131722] border border-[#c5a880]/20">
            <Compass className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? 'GUIA EDITORIAL' : 'EDITORIAL GUIDE'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf8f3] font-normal tracking-tight mb-5">
            {lang === 'pt' ? 'Descubra Aveiro sem pressa.' : 'Discover Aveiro unhurriedly.'}
          </h2>

          <p className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed">
            {lang === 'pt'
              ? 'Canais, moliceiros, arquitectura, sabores, praias e lugares que merecem ser descobertos a pé, no ritmo certo de quem viaja para descansar e viver a cidade.'
              : 'Canals, traditional boats, Art Nouveau architecture, authentic cuisine, beaches, and hidden quarters meant to be experienced on foot at your own serene pace.'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {DISCOVER_AVEIRO_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="rounded-3xl bg-[#11141c] border border-[#1e2434] hover:border-[#c5a880]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Article Image with safe aspect-ratio */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#08090d] cursor-pointer"
                  onClick={() => onOpenPhotoLightbox(article.image, article.title[lang])}
                >
                  <img
                    src={article.image}
                    alt={article.title[lang]}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#0a0c10]/80 text-[#c5a880] border border-[#c5a880]/30 backdrop-blur-md">
                    {article.category}
                  </span>
                </div>

                {/* Article Body */}
                <div className="p-6 sm:p-7">
                  <span className="text-[11px] uppercase tracking-widest text-[#8e887d] block mb-2 font-medium">
                    {article.eyebrow[lang]}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#fbf8f3] group-hover:text-[#c5a880] transition-colors mb-3 leading-snug">
                    {article.title[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9b9588] font-light leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt[lang]}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#c5a880] hover:text-[#e4cfb3] transition-colors"
                >
                  <span>{lang === 'pt' ? 'Ler artigo completo' : 'Read full article'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Experiences from each accommodation callout box */}
        <div className="rounded-3xl bg-[#11141c] border border-[#232b3d] p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              {lang === 'pt' ? 'A PARTIR DO ALOJAMENTO' : 'FROM YOUR ACCOMMODATION'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf8f3] mb-3">
              {lang === 'pt' ? 'Experiências a partir de cada alojamento' : 'Tailored experiences from each home'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9b9588] font-light">
              {lang === 'pt'
                ? 'As duas moradas estão em localizações centrais privilegiadas, mas oferecem pontos de partida ligeiramente distintos para explorar Aveiro.'
                : 'Both addresses enjoy privileged central locations while offering distinct vantage points for exploring Aveiro.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Aveiro Sunset Experience */}
            <div className="p-6 rounded-2xl bg-[#141824] border border-[#222a3d]">
              <h4 className="font-serif text-lg text-[#c5a880] mb-2">Aveiro Sunset</h4>
              <p className="text-xs text-[#b0aaa0] font-light leading-relaxed mb-4">
                {lang === 'pt'
                  ? 'Situado na Rua de Abel Ribeiro, junto aos canais e ao tecido histórico da Beira-Mar. A própria vista sobre a água pela janela é o início do dia.'
                  : 'Located on Rua de Abel Ribeiro, directly adjacent to the canals and historic Beira-Mar. The water reflections in your window begin every day.'}
              </p>
              <ul className="space-y-1.5 text-xs text-[#d6d1c7]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-[#c5a880] shrink-0" />
                  <span>{lang === 'pt' ? 'Passeios imediatos junto à ria e canais' : 'Immediate waterfront canal walks'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-[#c5a880] shrink-0" />
                  <span>{lang === 'pt' ? 'Restaurantes tradicionais e petiscos a passos' : 'Traditional seafood taverns a few steps away'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-[#c5a880] shrink-0" />
                  <span>{lang === 'pt' ? 'Estacionamento público gratuito nas imediações' : 'Free public parking immediately nearby'}</span>
                </li>
              </ul>
            </div>

            {/* Aveiro White 105 Experience */}
            <div className="p-6 rounded-2xl bg-[#141824] border border-[#222a3d]">
              <h4 className="font-serif text-lg text-[#c5a880] mb-2">Aveiro White 105</h4>
              <p className="text-xs text-[#b0aaa0] font-light leading-relaxed mb-4">
                {lang === 'pt'
                  ? 'Na Avenida Dr. Lourenço Peixinho, o grande eixo entre a estação de comboios e o coração de Aveiro, com comércio, pastelarias e total serenidade interior.'
                  : 'On Avenida Dr. Lourenço Peixinho, the grand boulevard between the train station and heart of Aveiro, offering cafes, shops, and absolute indoor quiet.'}
              </p>
              <ul className="space-y-1.5 text-xs text-[#d6d1c7]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-[#c5a880] shrink-0" />
                  <span>{lang === 'pt' ? 'A 4 minutos a pé da estação ferroviária de Aveiro' : '4 minutes walk to Aveiro railway station'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-[#c5a880] shrink-0" />
                  <span>{lang === 'pt' ? 'Silêncio absoluto voltado para o pátio interior' : 'Absolute peace and quiet facing interior courtyard'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-[#c5a880] shrink-0" />
                  <span>{lang === 'pt' ? 'Ligação pedonal plana e direta a todo o centro' : 'Flat direct pedestrian access to all central sights'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#11141c] border border-[#232b3d] p-6 sm:p-10 text-[#ecebe8] shadow-2xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#181d2a] hover:bg-[#202738] text-gray-300 hover:text-white transition-colors"
              aria-label="Fechar artigo"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              {selectedArticle.eyebrow[lang]}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf8f3] mb-6">
              {selectedArticle.title[lang]}
            </h3>

            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-[#08090d]">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title[lang]}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#b5af9f] font-light leading-relaxed mb-8">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p[lang]}</p>
              ))}
            </div>

            {selectedArticle.tips && (
              <div className="p-5 rounded-2xl bg-[#151924] border border-[#232b3d] mb-6">
                <h4 className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-3">
                  {lang === 'pt' ? 'Recomendações úteis' : 'Helpful suggestions'}
                </h4>
                <div className="space-y-2">
                  {selectedArticle.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#d6d1c7]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                      <span>{tip[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full py-3 rounded-xl bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] font-medium text-xs tracking-wider uppercase transition-colors"
            >
              {lang === 'pt' ? 'Fechar artigo' : 'Close article'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
