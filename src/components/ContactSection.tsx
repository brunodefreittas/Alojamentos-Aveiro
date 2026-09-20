import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].contact;
  const phoneNumber = '351924323980';
  const defaultMessage =
    lang === 'pt'
      ? 'Olá! Gostaria de esclarecer uma dúvida sobre os alojamentos em Aveiro (Aveiro Sunset / Aveiro White 105).'
      : 'Hello! I would like to inquire about the accommodations in Aveiro (Aveiro Sunset / Aveiro White 105).';
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <section id="contacto" className="py-24 bg-[#0a0c10] text-[#ecebe8] border-t border-[#1a1f2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-4 font-medium bg-[#131722] border border-[#c5a880]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.eyebrow}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf8f3] font-normal tracking-tight mb-4">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed max-w-2xl mx-auto">
            {t.text}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WhatsApp Direct Card */}
          <div className="p-8 rounded-3xl bg-[#11141c] border border-[#202738] hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>

              <span className="text-xs uppercase tracking-wider text-[#8e887d] block mb-1">
                {t.whatsappLabel}
              </span>

              <h3 className="font-serif text-base sm:text-xl text-[#fbf8f3] mb-2">
                +351 {t.whatsappNumber}
              </h3>

              <p className="text-xs text-[#a09a8e] font-light mb-6">
                {lang === 'pt'
                  ? 'Atendimento rápido e direto para tirar dúvidas sobre a sua estadia ou disponibilidade.'
                  : 'Fast, direct messaging for inquiries regarding your stay or dates.'}
              </p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 shadow-lg shadow-emerald-900/20"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t.whatsappButton}</span>
            </a>
          </div>

          {/* Email Card */}
          <div className="p-8 rounded-3xl bg-[#11141c] border border-[#202738] hover:border-[#c5a880]/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#171b26] border border-[#2d3748] flex items-center justify-center mb-6 text-[#c5a880]">
                <Mail className="w-6 h-6" />
              </div>

              <span className="text-xs uppercase tracking-wider text-[#8e887d] block mb-1">
                {t.emailLabel}
              </span>

              <h3 className="font-serif text-sm sm:text-lg text-[#fbf8f3] mb-2 whitespace-nowrap overflow-x-auto">
                {t.emailAddress}
              </h3>

              <p className="text-xs text-[#a09a8e] font-light mb-6">
                {lang === 'pt'
                  ? 'Respondemos com todo o gosto para pedidos de estadias prolongadas ou detalhes sobre Aveiro.'
                  : 'We are delighted to assist with longer stays or bespoke local guidance.'}
              </p>
            </div>

            <a
              href={`mailto:${t.emailAddress}?subject=${encodeURIComponent(
                lang === 'pt' ? 'Informações sobre Alojamentos em Aveiro' : 'Inquiry about Accommodations in Aveiro'
              )}`}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-[#171b26] hover:bg-[#202638] text-[#c5a880] border border-[#c5a880]/30 font-medium text-xs tracking-wider uppercase transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Enviar Mensagem' : 'Send Email'}</span>
            </a>
          </div>
        </div>

        {/* Reassurance notes */}
        <div className="mt-12 text-center text-xs text-[#787265] max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{lang === 'pt' ? 'Resposta habitual em poucos minutos' : 'Typically replies within minutes'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{lang === 'pt' ? 'Reservas 100% garantidas no Booking' : '100% guaranteed bookings via Booking'}</span>
          </span>
        </div>
      </div>
    </section>
  );
};
