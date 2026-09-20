import React from 'react';
import { MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { Language, ApartmentId } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectApartment: (aptId: ApartmentId) => void;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageChange,
  onSelectApartment,
  onNavigateHome,
  onNavigateSection,
}) => {
  const t = TRANSLATIONS[lang].footer;

  return (
    <footer className="bg-[#07080b] text-[#ecebe8] border-t border-[#181d29] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#181d29]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={onNavigateHome}
              className="text-left font-serif text-xl sm:text-2xl text-[#fbf8f3] hover:text-[#c5a880] transition-colors"
            >
              Alojamentos em Aveiro
            </button>
            <p className="text-xs sm:text-sm text-[#8e887d] font-light max-w-sm leading-relaxed">
              {t.brandDesc}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-[#8e887d]">
                {lang === 'pt' ? 'Idioma' : 'Language'}:
              </span>
              <div className="inline-flex rounded-full bg-[#12151f] p-0.5 border border-[#232a3b] text-xs">
                <button
                  onClick={() => onLanguageChange('pt')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    lang === 'pt'
                      ? 'bg-[#c5a880] text-[#0a0c10] font-semibold'
                      : 'text-[#8e887d] hover:text-white'
                  }`}
                >
                  Português
                </button>
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    lang === 'en'
                      ? 'bg-[#c5a880] text-[#0a0c10] font-semibold'
                      : 'text-[#8e887d] hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Accommodations Col */}
          <div>
            <h4 className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-4">
              {t.apartmentsHeading}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a09a8e] font-light">
              <li>
                <button
                  onClick={() => onSelectApartment('aveiro-sunset')}
                  className="hover:text-[#c5a880] transition-colors text-left"
                >
                  Aveiro Sunset (Rua Abel Ribeiro)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApartment('aveiro-white-105')}
                  className="hover:text-[#c5a880] transition-colors text-left"
                >
                  Aveiro White 105 (Av. Lourenço Peixinho)
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Links Col */}
          <div>
            <h4 className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-4">
              {t.discoverHeading}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a09a8e] font-light">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  {TRANSLATIONS[lang].nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('descobrir-aveiro')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  {TRANSLATIONS[lang].nav.discover}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('localizacao')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  {TRANSLATIONS[lang].nav.location}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('contacto')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  {TRANSLATIONS[lang].nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Booking & Contact Col */}
          <div>
            <h4 className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-4">
              {t.contactHeading}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a09a8e] font-light">
              <li>
                <a
                  href="https://www.booking.com/hotel/pt/aveiro-sunset.pt-br.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c5a880] flex items-center gap-1.5 transition-colors"
                >
                  <span>Booking — Aveiro Sunset</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.booking.com/hotel/pt/aveiro-white-105.pt-br.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c5a880] flex items-center gap-1.5 transition-colors"
                >
                  <span>Booking — Aveiro White 105</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/351924323980"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: 924 323 980</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@alojamentosaveiro.pt"
                  className="hover:text-white flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>contacto@alojamentosaveiro.pt</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6b675d] gap-4">
          <p>© {new Date().getFullYear()} Alojamentos em Aveiro. {t.allRights}</p>
          <div className="flex items-center gap-4 text-center sm:text-right">
            <span>{t.legalNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
