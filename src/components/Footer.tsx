import React from 'react';
import { ExternalLink, Shield, FileText, Scale, BookOpen } from 'lucide-react';
import { Language, ApartmentId } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { LegalDocType } from './LegalModal';

interface FooterProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectApartment: (aptId: ApartmentId) => void;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenLegal: (type: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageChange,
  onSelectApartment,
  onNavigateHome,
  onNavigateSection,
  onOpenLegal,
}) => {
  const t = TRANSLATIONS[lang].footer;
  const legalT = TRANSLATIONS[lang].legal;

  return (
    <footer className="bg-[#07080b] text-[#ecebe8] border-t border-[#181d29] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-[#181d29]">
          {/* Brand Col */}
          <div className="lg:col-span-1 space-y-4">
            <button
              onClick={onNavigateHome}
              className="text-left font-serif text-xl sm:text-2xl text-[#fbf8f3] hover:text-[#c5a880] transition-colors"
            >
              Alojamento em Aveiro
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

          {/* Legal & Complaints Col */}
          <div>
            <h4 className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-4">
              {lang === 'pt' ? 'Informação Legal' : 'Legal Information'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a09a8e] font-light">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5 text-left"
                >
                  <Shield className="w-3 h-3 text-[#c5a880]" />
                  <span>{legalT.privacyLink}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3 h-3 text-[#c5a880]" />
                  <span>{legalT.termsLink}</span>
                </button>
              </li>
              <li>
                <a
                  href="https://www.livroreclamacoes.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>{legalT.complaintsLink}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('disputes')}
                  className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5 text-left"
                >
                  <Scale className="w-3 h-3 text-[#c5a880]" />
                  <span>{legalT.disputesLink}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6b675d] gap-4">
          <p>© {new Date().getFullYear()} Alojamentos em Aveiro. {t.allRights}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5 text-center sm:text-right">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
              className="text-[#9e978b] hover:text-[#c5a880] transition-colors underline underline-offset-4"
            >
              {TRANSLATIONS[lang].cookies.footerLink}
            </button>
            <span className="text-xs text-[#787265]">{t.legalNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
