import React, { useState } from 'react';
import { Language, ApartmentId } from './types';
import { APARTMENTS_DATA } from './data/apartmentsData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickSearchWidget } from './components/QuickSearchWidget';
import { ApartmentsShowcase } from './components/ApartmentsShowcase';
import { DiscoverAveiroSection } from './components/DiscoverAveiroSection';
import { LocationSection } from './components/LocationSection';
import { HomeStayAndTestimonials } from './components/HomeStayAndTestimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApartmentView } from './components/ApartmentView';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PhotoLightbox } from './components/PhotoLightbox';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('aveiro_lang');
    return saved === 'en' ? 'en' : 'pt';
  });

  const [activeApartmentId, setActiveApartmentId] = useState<ApartmentId | null>(null);

  // Lightbox State
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageUrl: string;
    fallbackUrl?: string;
    caption: string;
  }>({
    isOpen: false,
    imageUrl: '',
    fallbackUrl: undefined,
    caption: '',
  });

  // Review Modal State
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('aveiro_lang', newLang);
  };

  const handleOpenPhotoLightbox = (url: string, caption: string, fallbackUrl?: string) => {
    setLightboxState({
      isOpen: true,
      imageUrl: url,
      fallbackUrl,
      caption,
    });
  };

  const handleClosePhotoLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSelectApartment = (aptId: ApartmentId | null) => {
    setActiveApartmentId(aptId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setActiveApartmentId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveApartmentId(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#ecebe8] font-sans selection:bg-[#c5a880] selection:text-[#0a0c10]">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeApartment={activeApartmentId}
        onSelectApartment={handleSelectApartment}
        onNavigateHome={handleNavigateHome}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content: Either Home Flow or Individual Apartment View */}
      <main id="main-content">
        {activeApartmentId ? (
          <ApartmentView
            apartment={APARTMENTS_DATA[activeApartmentId]}
            lang={lang}
            onBackToHome={handleNavigateHome}
            onOpenPhotoLightbox={handleOpenPhotoLightbox}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <Hero
              lang={lang}
              onExploreApartments={() => handleNavigateSection('alojamentos')}
              onDiscoverAveiro={() => handleNavigateSection('descobrir-aveiro')}
            />

            {/* Quick Availability Check Widget (#consulta-datas) */}
            <QuickSearchWidget lang={lang} />

             {/* 2. Escolha o seu Alojamento (Aveiro Sunset & Aveiro White 105) */}
            <ApartmentsShowcase
              lang={lang}
              onSelectApartment={handleSelectApartment}
              onOpenPhotoLightbox={handleOpenPhotoLightbox}
            />

            {/* 3. Guia Editorial / Descobrir Aveiro */}
            <DiscoverAveiroSection
              lang={lang}
              onOpenPhotoLightbox={handleOpenPhotoLightbox}
            />

            {/* 4. Localização Dedicada com Mapas Interativos e Tempos a Pé */}
            <LocationSection
              lang={lang}
              onSelectApartment={handleSelectApartment}
            />

            {/* 5. A Sua Estadia, Depoimentos do Booking e Banner Final */}
            <HomeStayAndTestimonials
              lang={lang}
              onSelectApartment={handleSelectApartment}
              onExploreApartments={() => handleNavigateSection('alojamentos')}
              onDiscoverAveiro={() => handleNavigateSection('descobrir-aveiro')}
            />

            {/* 8. Contacto Directo (WhatsApp & Email) */}
            <ContactSection lang={lang} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onSelectApartment={handleSelectApartment}
        onNavigateHome={handleNavigateHome}
        onNavigateSection={handleNavigateSection}
      />

      {/* Persistent Floating WhatsApp Button */}
      <WhatsAppButton lang={lang} />

      {/* High-Resolution Photo Lightbox */}
      <PhotoLightbox
        isOpen={lightboxState.isOpen}
        imageUrl={lightboxState.imageUrl}
        fallbackUrl={lightboxState.fallbackUrl}
        caption={lightboxState.caption}
        onClose={handleClosePhotoLightbox}
      />
    </div>
  );
}
