import React, { useState, useEffect } from 'react';
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
import { CookieConsent } from './components/CookieConsent';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { RealEstateHeroBanner } from './components/RealEstateHeroBanner';
import { RealEstateSection } from './components/RealEstateSection';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

export type AppView = 'accommodation' | 'real-estate' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('aveiro_lang');
    return saved === 'en' ? 'en' : 'pt';
  });

  const [activeApartmentId, setActiveApartmentId] = useState<ApartmentId | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('accommodation');

  // Legal Modal State
  const [legalModalType, setLegalModalType] = useState<LegalDocType>(null);

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
    setCurrentView('accommodation');
    setActiveApartmentId(aptId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('accommodation');
    setActiveApartmentId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    setCurrentView('accommodation');
    setActiveApartmentId(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Check admin session on mount
  useEffect(() => {
    const isAdminLogged = localStorage.getItem('aveiro_admin_logged') === 'true';
    // If user is trying to access admin
  }, []);

  if (currentView === 'real-estate') {
    return (
      <RealEstateSection
        onBackToHome={handleNavigateHome}
        onOpenAdminLogin={() => {
          const isAdminLogged = localStorage.getItem('aveiro_admin_logged') === 'true';
          if (isAdminLogged) {
            setCurrentView('admin-dashboard');
          } else {
            setCurrentView('admin-login');
          }
        }}
        language={lang}
      />
    );
  }

  if (currentView === 'admin-dashboard') {
    return (
      <AdminDashboard
        onClose={() => setCurrentView('real-estate')}
        onLogout={() => {
          localStorage.removeItem('aveiro_admin_logged');
          setCurrentView('real-estate');
        }}
        language={lang}
      />
    );
  }

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
        onNavigateRealEstate={() => setCurrentView('real-estate')}
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

             {/* 2. Escolha o seu Alojamento (Aveiro White 105) */}
            <ApartmentsShowcase
              lang={lang}
              onSelectApartment={handleSelectApartment}
              onOpenPhotoLightbox={handleOpenPhotoLightbox}
            />

            {/* Real Estate CTA Banner */}
            <div className="max-w-7xl mx-auto px-6">
              <RealEstateHeroBanner
                onOpenRealEstate={() => setCurrentView('real-estate')}
                language={lang}
              />
            </div>

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

            {/* 5. A Sua Estadia, Depoimentos e Banner Final */}
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
        onNavigateRealEstate={() => {
          setCurrentView('real-estate');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Admin Login Modal if triggered */}
      {currentView === 'admin-login' && (
        <AdminLogin
          onSuccess={() => setCurrentView('admin-dashboard')}
          onClose={() => setCurrentView('real-estate')}
          language={lang}
        />
      )}

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

      {/* Legal Information Modal */}
      <LegalModal
        type={legalModalType}
        lang={lang}
        onClose={() => setLegalModalType(null)}
      />

      {/* EU GDPR Cookie Consent & Settings */}
      <CookieConsent lang={lang} />
    </div>
  );
}
