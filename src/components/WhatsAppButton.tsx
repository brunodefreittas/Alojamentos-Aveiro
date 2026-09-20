import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WhatsAppButtonProps {
  lang: Language;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang].contact;
  const phoneNumber = '351924323980';
  const defaultMessage =
    lang === 'pt'
      ? 'Olá, gostaria de informações sobre os alojamentos em Aveiro (Aveiro Sunset / Aveiro White 105).'
      : 'Hello, I would like information regarding the accommodations in Aveiro (Aveiro Sunset / Aveiro White 105).';
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Expanded popup card */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-[#131620] border border-[#2d3748] shadow-2xl p-4 text-[#ecebe8] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-[#c5a880] uppercase tracking-wider">
                {t.floatingWhatsappTitle}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Fechar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-[#a09a8e] mb-3 leading-relaxed">
            {t.floatingWhatsappSub}
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{t.whatsappButton}</span>
          </a>

          <div className="mt-2 text-center text-[10px] text-[#71717a]">
            +351 {t.whatsappNumber}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-900/40 hover:scale-105 transition-all duration-300"
        aria-label="Contactar pelo WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#0e1014]"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
