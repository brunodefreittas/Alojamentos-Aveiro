import React from 'react';
import { Star, Quote, ExternalLink, ArrowRight, Sparkles, BedDouble } from 'lucide-react';
import { Language, ApartmentId } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HomeStayAndTestimonialsProps {
  lang: Language;
  onSelectApartment: (aptId: ApartmentId) => void;
  onExploreApartments: () => void;
  onDiscoverAveiro: () => void;
}

export const HomeStayAndTestimonials: React.FC<HomeStayAndTestimonialsProps> = ({
  lang,
  onSelectApartment,
  onExploreApartments,
  onDiscoverAveiro,
}) => {
  const tStay = TRANSLATIONS[lang].stay;
  const tTestimonials = TRANSLATIONS[lang].testimonials;
  const tFinal = TRANSLATIONS[lang].finalCta;

  const featuredReviews = [
    {
      author: 'Nuno',
      country: 'Portugal',
      apartment: 'Aveiro Sunset',
      rating: 5,
      comment:
        'O apartamento é fenomenal, as grandes janelas para o canal de Aveiro torna este pequeno apartamento muito bonito é a atração deste apartamento sem dúvida se não fosse isso era um simples e pequeno espaço, á noite dá um ar romântico até parece cena de filme de Hollywood 😆 é diferente de tudo onde já tinha ficado nesta cidade, notasse que é novo e equipado com tudo o que faz falta, gostei da experiência. Tudo muito limpo e cheiroso.',
      bookingUrl: 'https://www.booking.com/hotel/pt/aveiro-sunset.pt-br.html',
    },
    {
      author: 'Patrick',
      country: 'Portugal',
      apartment: 'Aveiro White 105',
      rating: 5,
      comment:
        'Apartamento impecável, como novo e super bem localizado. Check-in super simples Arejado e moderno Cama maravilhosa.',
      bookingUrl: 'https://www.booking.com/hotel/pt/aveiro-white-105.pt-br.html',
    },
    {
      author: 'Andrea',
      country: 'Suécia',
      apartment: 'Aveiro White 105',
      rating: 5,
      comment:
        "I can't believe there weren't more people leaving a review for this place. Super easy instructions. Super responsive host. Beautiful and clean apartment. Comfortable bed. Great location. Just a few minutes' walk from the station. Extremely quiet, indoor facing.",
      bookingUrl: 'https://www.booking.com/hotel/pt/aveiro-white-105.pt-br.html',
    },
    {
      author: 'Xavier',
      country: 'España',
      apartment: 'Aveiro Sunset',
      rating: 5,
      comment:
        'Decoración muy cuidada, con mucho gusto y estilo, se nota el cariño con el que se ha realizado. La ubicación es excelente, con un parking gratuito a pocos metros. Cama cómoda.',
      bookingUrl: 'https://www.booking.com/hotel/pt/aveiro-sunset.pt-br.html',
    },
  ];

  return (
    <div className="bg-[#0e1118] text-[#ecebe8]">
      {/* 1. Stay Section */}
      <section className="py-20 border-t border-[#1a1f2c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-4 font-medium bg-[#131722] border border-[#c5a880]/20">
            <BedDouble className="w-3.5 h-3.5" />
            <span>{tStay.eyebrow}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#fbf8f3] font-normal tracking-tight mb-5">
            {tStay.title}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#a8a396] font-light leading-relaxed mb-8">
            {tStay.text.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <button
            onClick={onExploreApartments}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] text-xs uppercase tracking-wider font-medium shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>{tStay.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. Testimonials Section */}
      <section className="py-24 bg-[#0a0c10] border-t border-[#181d29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-3 font-medium bg-[#131722] border border-[#c5a880]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{tTestimonials.eyebrow}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#fbf8f3] font-normal tracking-tight mb-3">
                {tTestimonials.title}
              </h2>
              <p className="text-sm text-[#9b9588] font-light">
                {tTestimonials.text}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.booking.com/hotel/pt/aveiro-sunset.pt-br.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#003580] hover:bg-[#002b66] text-white text-xs font-medium border border-[#1e4c9a] transition-colors"
              >
                <span>{tTestimonials.cta}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredReviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#11141c] border border-[#1e2434] hover:border-[#c5a880]/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#c5a880]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#181d2c] text-[#a09a8e] border border-[#252c3f]">
                      {rev.apartment}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#c4beb3] font-light leading-relaxed italic mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#1a1f2c] text-xs">
                  <div>
                    <span className="font-serif font-medium text-[#fbf8f3]">{rev.author}</span>
                    <span className="text-[#787265] ml-2">({rev.country})</span>
                  </div>
                  <a
                    href={rev.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#c5a880] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Booking.com</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Final CTA Banner */}
      <section className="py-24 bg-gradient-to-b from-[#0a0c10] to-[#0d1017] border-t border-[#1a1f2c] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf8f3] font-normal tracking-tight mb-5">
            {tFinal.title}
          </h2>

          <p className="text-sm sm:text-base text-[#a8a396] font-light max-w-2xl mx-auto leading-relaxed mb-10">
            {tFinal.text}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreApartments}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] font-medium text-xs tracking-wider uppercase shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>{tFinal.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onDiscoverAveiro}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#141824] hover:bg-[#1a202f] text-[#ecebe8] border border-[#2d3748] text-xs uppercase tracking-wider font-light transition-all duration-200"
            >
              <span>{tFinal.secondaryCta}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
