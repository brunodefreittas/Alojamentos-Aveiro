import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, Sliders, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CookieConsentProps {
  lang: Language;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].cookies;

  const [hasConsented, setHasConsented] = useState<boolean>(() => {
    return localStorage.getItem('cookie_consent_status') !== null;
  });

  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const saved = localStorage.getItem('cookie_preferences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      essential: true,
      analytics: true,
      marketing: false,
    };
  });

  useEffect(() => {
    const handleOpenSettings = () => {
      setShowSettingsModal(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => {
      window.removeEventListener('open-cookie-settings', handleOpenSettings);
    };
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie_preferences', JSON.stringify(allAccepted));
    localStorage.setItem('cookie_consent_status', 'accepted_all');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setHasConsented(true);
    setShowSettingsModal(false);
  };

  const handleRejectNonEssential = () => {
    const minimal: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(minimal);
    localStorage.setItem('cookie_preferences', JSON.stringify(minimal));
    localStorage.setItem('cookie_consent_status', 'rejected_non_essential');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setHasConsented(true);
    setShowSettingsModal(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
    localStorage.setItem('cookie_consent_status', 'custom');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setHasConsented(true);
    setShowSettingsModal(false);
  };

  return (
    <>
      {/* Cookie Banner (shown if no consent has been registered yet) */}
      {!hasConsented && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[#0f131f]/95 backdrop-blur-xl border-t border-[#c5a880]/30 shadow-2xl animate-slide-up">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-4xl">
              <div className="w-10 h-10 rounded-2xl bg-[#c5a880]/15 border border-[#c5a880]/40 flex-shrink-0 flex items-center justify-center text-[#c5a880] mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-medium text-[#fbf8f3] font-serif">
                  {t.bannerTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#b0a99c] font-light leading-relaxed">
                  {t.bannerText}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
              <button
                onClick={() => setShowSettingsModal(true)}
                className="px-4 py-2.5 rounded-full bg-[#181d2c] hover:bg-[#22293d] text-[#d5d0c5] border border-[#2e374f] text-xs font-medium transition-all"
              >
                {t.manage}
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2.5 rounded-full bg-[#181d2c] hover:bg-[#22293d] text-[#d5d0c5] border border-[#2e374f] text-xs font-medium transition-all"
              >
                {t.rejectAll}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 rounded-full bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] text-xs font-semibold shadow-lg shadow-[#c5a880]/20 transition-all"
              >
                {t.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121622] border border-[#c5a880]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1a2030] border border-[#2d374f] flex items-center justify-center text-[#a09a8e] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-[#fbf8f3] font-normal">
                  {t.settingsTitle}
                </h2>
                <span className="text-xs text-[#c5a880] tracking-wide uppercase">
                  GDPR & EU Compliant
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#b0a99c] font-light leading-relaxed mb-6">
              {t.settingsDesc}
            </p>

            <div className="space-y-4 mb-8">
              {/* Essential Cookies */}
              <div className="p-4 rounded-2xl bg-[#181d2c] border border-[#273046] flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-[#fbf8f3]">
                    {t.essentialTitle}
                  </h4>
                  <p className="text-xs text-[#9a9488] font-light leading-relaxed">
                    {t.essentialDesc}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#c5a880]/15 text-[#c5a880] text-[11px] font-medium border border-[#c5a880]/30 flex-shrink-0">
                  {t.alwaysActive}
                </span>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 rounded-2xl bg-[#181d2c] border border-[#273046] flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-[#fbf8f3]">
                    {t.analyticsTitle}
                  </h4>
                  <p className="text-xs text-[#9a9488] font-light leading-relaxed">
                    {t.analyticsDesc}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#28324a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c5a880]"></div>
                </label>
              </div>

              {/* Marketing Cookies */}
              <div className="p-4 rounded-2xl bg-[#181d2c] border border-[#273046] flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-[#fbf8f3]">
                    {t.marketingTitle}
                  </h4>
                  <p className="text-xs text-[#9a9488] font-light leading-relaxed">
                    {t.marketingDesc}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        marketing: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#28324a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c5a880]"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#1e2538]">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleRejectNonEssential}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#1a2030] hover:bg-[#22293d] text-[#d5d0c5] border border-[#2d374f] text-xs font-medium transition-all"
                >
                  {t.rejectAll}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#1a2030] hover:bg-[#22293d] text-[#c5a880] border border-[#c5a880]/30 text-xs font-medium transition-all"
                >
                  {t.acceptAll}
                </button>
              </div>

              <button
                onClick={handleSaveCustom}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] text-xs font-semibold shadow-lg shadow-[#c5a880]/20 transition-all"
              >
                {t.savePreferences}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
