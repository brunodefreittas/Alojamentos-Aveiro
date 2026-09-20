import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Globe, Compass, Home, Download } from 'lucide-react';
import { Language, ApartmentId } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeApartment: ApartmentId | null;
  onSelectApartment: (aptId: ApartmentId | null) => void;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  activeApartment,
  onSelectApartment,
  onNavigateHome,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isApartmentsDropdownOpen, setIsApartmentsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const t = TRANSLATIONS[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsApartmentsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsApartmentsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsApartmentsDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsApartmentsDropdownOpen(false);
    }, 250);
  };

  const handleToggleApartmentsDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsApartmentsDropdownOpen(prev => !prev);
  };

  const handleApartmentClick = (aptId: ApartmentId) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    onSelectApartment(aptId);
    setIsApartmentsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    onNavigateHome();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionId: string) => {
    if (activeApartment) {
      onSelectApartment(null);
      setTimeout(() => {
        onNavigateSection(sectionId);
      }, 100);
    } else {
      onNavigateSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0c10]/95 backdrop-blur-md border-b border-[#222838] py-3.5 shadow-xl'
          : 'bg-gradient-to-b from-[#0a0c10]/90 via-[#0a0c10]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={handleHomeClick}
            className="text-left group transition-transform duration-200"
          >
            <div className="font-serif text-lg sm:text-xl text-[#fbf8f3] tracking-wide font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a880] inline-block group-hover:scale-125 transition-transform" />
              <span>Alojamentos em Aveiro</span>
            </div>
            <p className="text-[11px] text-[#9b9588] tracking-widest uppercase font-light pl-4">
              Aveiro Sunset & White 105
            </p>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-light text-[#ecebe8]">
            <button
              onClick={handleHomeClick}
              className={`hover:text-[#c5a880] transition-colors py-1 ${
                !activeApartment ? 'text-[#c5a880] font-medium' : 'text-[#c4beb3]'
              }`}
            >
              {t.home}
            </button>

            {/* Apartments Dropdown */}
            <div
              ref={dropdownRef}
              className="relative py-1"
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={handleToggleApartmentsDropdown}
                aria-expanded={isApartmentsDropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 transition-colors py-1 cursor-pointer select-none ${
                  activeApartment || isApartmentsDropdownOpen
                    ? 'text-[#c5a880] font-medium'
                    : 'text-[#c4beb3] hover:text-[#c5a880]'
                }`}
              >
                <span>{t.apartments}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isApartmentsDropdownOpen ? 'rotate-180 text-[#c5a880]' : ''
                  }`}
                />
              </button>

              {isApartmentsDropdownOpen && (
                <div
                  className="absolute top-full left-0 pt-2.5 w-64 z-50"
                  onMouseEnter={handleMouseEnterDropdown}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <div className="rounded-2xl bg-[#131620]/95 backdrop-blur-xl border border-[#262e40] shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      type="button"
                      onClick={() => handleApartmentClick('aveiro-sunset')}
                      className={`w-full text-left px-3.5 py-3 rounded-xl text-xs transition-colors flex flex-col cursor-pointer ${
                        activeApartment === 'aveiro-sunset'
                          ? 'bg-[#1b2030] text-[#c5a880]'
                          : 'text-[#e0ded8] hover:bg-[#1a1e2b] hover:text-[#c5a880]'
                      }`}
                    >
                      <span className="font-serif text-sm font-medium text-[#fbf8f3]">Aveiro Sunset</span>
                      <span className="text-[11px] text-[#9b9588] mt-0.5">Rua de Abel Ribeiro (Vista Canal)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApartmentClick('aveiro-white-105')}
                      className={`w-full text-left px-3.5 py-3 rounded-xl text-xs transition-colors flex flex-col mt-1 cursor-pointer ${
                        activeApartment === 'aveiro-white-105'
                          ? 'bg-[#1b2030] text-[#c5a880]'
                          : 'text-[#e0ded8] hover:bg-[#1a1e2b] hover:text-[#c5a880]'
                      }`}
                    >
                      <span className="font-serif text-sm font-medium text-[#fbf8f3]">Aveiro White 105</span>
                      <span className="text-[11px] text-[#9b9588] mt-0.5">Av. Dr. Lourenço Peixinho (Central)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleSectionClick('contacto')}
              className="text-[#c4beb3] hover:text-[#c5a880] transition-colors py-1"
            >
              {t.contact}
            </button>
          </nav>

          {/* Right Action Area (Language switch + Booking CTA) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#141824] border border-[#262e40] rounded-full p-0.5 text-xs font-medium">
              <button
                onClick={() => onLanguageChange('pt')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'pt'
                    ? 'bg-[#c5a880] text-[#0e1014] font-semibold shadow-sm'
                    : 'text-[#9b9588] hover:text-[#ecebe8]'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'en'
                    ? 'bg-[#c5a880] text-[#0e1014] font-semibold shadow-sm'
                    : 'text-[#9b9588] hover:text-[#ecebe8]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Direct Booking CTA */}
            {activeApartment ? (
              <a
                href={
                  activeApartment === 'aveiro-sunset'
                    ? 'https://www.booking.com/hotel/pt/aveiro-sunset.pt-br.html'
                    : 'https://www.booking.com/hotel/pt/aveiro-white-105.pt-br.html'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium bg-[#003580] hover:bg-[#002b66] text-white border border-[#1e4c9a] shadow-md transition-all duration-200"
              >
                <span>{t.bookBooking}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={() => handleSectionClick('alojamentos')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium bg-[#c5a880] hover:bg-[#b5966d] text-[#0e1014] shadow-md transition-all duration-200"
              >
                <span>{TRANSLATIONS[lang].hero.cta}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Language Switcher on Mobile Header */}
            <button
              onClick={() => onLanguageChange(lang === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#141824] border border-[#262e40] text-[#c5a880]"
              aria-label="Mudar idioma"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="uppercase font-semibold">{lang}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-[#ecebe8] hover:bg-[#161a26] border border-[#262e40] transition-colors"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0e111a] border-b border-[#222838] px-4 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="space-y-1">
            <button
              onClick={handleHomeClick}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                !activeApartment ? 'bg-[#181d2c] text-[#c5a880]' : 'text-[#d6d2c9]'
              }`}
            >
              <span>{t.home}</span>
              <Home className="w-4 h-4 text-[#9b9588]" />
            </button>

            <div className="pt-2 pb-1 px-3 text-[11px] font-semibold text-[#8e887d] uppercase tracking-wider">
              {t.apartments}
            </div>

            <button
              onClick={() => handleApartmentClick('aveiro-sunset')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm ${
                activeApartment === 'aveiro-sunset'
                  ? 'bg-[#181d2c] text-[#c5a880] font-medium'
                  : 'text-[#d6d2c9] hover:bg-[#141824]'
              }`}
            >
              <div className="font-serif">Aveiro Sunset</div>
              <div className="text-[11px] text-[#9b9588]">Rua de Abel Ribeiro (Canal)</div>
            </button>

            <button
              onClick={() => handleApartmentClick('aveiro-white-105')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm ${
                activeApartment === 'aveiro-white-105'
                  ? 'bg-[#181d2c] text-[#c5a880] font-medium'
                  : 'text-[#d6d2c9] hover:bg-[#141824]'
              }`}
            >
              <div className="font-serif">Aveiro White 105</div>
              <div className="text-[11px] text-[#9b9588]">Av. Dr. Lourenço Peixinho (Centro)</div>
            </button>

            <div className="pt-2 border-t border-[#1e2434] mt-2">
              <button
                onClick={() => handleSectionClick('contacto')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-[#d6d2c9] hover:bg-[#141824]"
              >
                {t.contact}
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1e2434] space-y-2">
            <a
              href="https://www.booking.com/hotel/pt/aveiro-sunset.pt-br.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#003580] text-white text-xs font-medium"
            >
              <span>Booking — Aveiro Sunset</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.booking.com/hotel/pt/aveiro-white-105.pt-br.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#003580] text-white text-xs font-medium"
            >
              <span>Booking — Aveiro White 105</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
