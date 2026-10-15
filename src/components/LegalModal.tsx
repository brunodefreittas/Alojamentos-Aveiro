import React, { useEffect } from 'react';
import { X, Shield, FileText, Scale, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

export type LegalDocType = 'privacy' | 'terms' | 'disputes' | null;

interface LegalModalProps {
  type: LegalDocType;
  lang: Language;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, lang, onClose }) => {
  const t = TRANSLATIONS[lang].legal;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#111521] border border-[#c5a880]/40 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[85vh] overflow-y-auto text-[#ecebe8]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1b2233] border border-[#2e3954] flex items-center justify-center text-[#a09a8e] hover:text-white transition-colors"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-[#202738]">
          <div className="w-12 h-12 rounded-2xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
            {type === 'privacy' && <Shield className="w-6 h-6" />}
            {type === 'terms' && <FileText className="w-6 h-6" />}
            {type === 'disputes' && <Scale className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#fbf8f3] font-normal">
              {type === 'privacy' && t.privacyTitle}
              {type === 'terms' && t.termsTitle}
              {type === 'disputes' && t.disputesTitle}
            </h2>
            <span className="text-xs text-[#c5a880] uppercase tracking-widest font-medium">
              Alojamentos em Aveiro • Portugal
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-xs sm:text-sm text-[#b5af9f] font-light leading-relaxed">
          {type === 'privacy' && (
            <>
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-serif text-[#fbf8f3] font-medium">
                  1. {lang === 'pt' ? 'Responsável pelo Tratamento de Dados' : 'Data Controller'}
                </h3>
                <p>
                  {lang === 'pt'
                    ? 'A gestão dos alojamentos turísticos "Alojamentos em Aveiro" (Aveiro Sunset e Aveiro White 105), com sede em Aveiro, Portugal, assume o compromisso de proteger a privacidade dos utilizadores e hóspedes em conformidade com o Regulamento Geral de Proteção de Dados (RGPD - Regulamento UE 2016/679).'
                    : 'The management of "Alojamentos em Aveiro" (Aveiro Sunset and Aveiro White 105), located in Aveiro, Portugal, is committed to protecting user and guest privacy in accordance with the General Data Protection Regulation (GDPR - EU Regulation 2016/679).'}
                </p>
                <p className="text-xs text-[#8e887d]">
                  {lang === 'pt' ? 'Contacto para questões de privacidade:' : 'Contact for privacy inquiries:'}{' '}
                  <a href="mailto:contacto@alojamentosaveiro.pt" className="text-[#c5a880] underline">
                    contacto@alojamentosaveiro.pt
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-serif text-[#fbf8f3] font-medium">
                  2. {lang === 'pt' ? 'Recolha e Finalidade dos Dados' : 'Collection and Purpose of Data'}
                </h3>
                <p>
                  {lang === 'pt'
                    ? 'Recolhemos dados pessoais estritamente necessários para a prestação dos nossos serviços de alojamento e atendimento de pedidos de contacto (nome, endereço de e-mail, número de telefone e dados facultados em avaliações ou reservas). As reservas e pagamentos são processados com segurança através da plataforma Booking.com.'
                    : 'We collect personal data strictly necessary for providing our accommodation services and responding to inquiries (name, email address, phone number, and information provided in reviews or communications. Bookings and payments are securely processed via Booking.com.'}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-serif text-[#fbf8f3] font-medium">
                  3. {lang === 'pt' ? 'Direitos dos Utilizadores' : 'User Rights'}
                </h3>
                <p>
                  {lang === 'pt'
                    ? 'Em conformidade com a legislação europeia, o titular dos dados tem o direito de solicitar a acesso, retificação, limitação ou eliminação dos seus dados pessoais, bem como retirar o consentimento a qualquer momento, enviando um pedido escrito para o nosso e-mail oficial.'
                    : 'In compliance with European legislation, data subjects have the right to request access, rectification, restriction, or erasure of their personal data, as well as to withdraw consent at any time by sending a written request to our official email.'}
                </p>
              </div>
            </>
          )}

          {type === 'terms' && (
            <>
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-serif text-[#fbf8f3] font-medium">
                  1. {lang === 'pt' ? 'Âmbito e Informação dos Alojamentos' : 'Scope and Accommodation Information'}
                </h3>
                <p>
                  {lang === 'pt'
                    ? 'Estes Termos e Condições regem a utilização do website oficial dos Alojamentos em Aveiro (Aveiro Sunset e Aveiro White 105). Os nossos espaços encontram-se devidamente registados como alojamentos locais em Aveiro, Portugal.'
                    : 'These Terms and Conditions govern the use of the official website for Alojamentos em Aveiro (Aveiro Sunset and Aveiro White 105). Our properties are duly registered local accommodations in Aveiro, Portugal.'}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-serif text-[#fbf8f3] font-medium">
                  2. {lang === 'pt' ? 'Reservas e Pagamentos' : 'Reservas and Payments'}
                </h3>
                <p>
                  {lang === 'pt'
                    ? 'Todas as reservas efetuadas através dos nossos links oficiais são processadas, geridas e garantidas através da plataforma internacional Booking.com, aplicando-se os respetivos termos de cancelamento, políticas de reembolso e condições contratuais da referida plataforma.'
                    : 'All bookings made through our official links are processed, managed, and guaranteed via the international platform Booking.com, subject to the cancellation policies, refund terms, and contractual conditions of that platform.'}
                </p>
                <p className="text-xs text-[#8e887d]">
                  WhatsApp de apoio: +351 924 323 980 | E-mail: contacto@alojamentosaveiro.pt
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-serif text-[#fbf8f3] font-medium">
                  3. {lang === 'pt' ? 'Regras de Estadia e Convivência' : 'Stay and House Rules'}
                </h3>
                <p>
                  {lang === 'pt'
                    ? 'Os hóspedes comprometem-se a zelar pelo bom estado dos apartamentos, respeitar as normas de silêncio e as regras específicas de cada alojamento durante a sua estadia em Aveiro.'
                    : 'Guests agree to maintain the good condition of the apartments, respect quiet hours, and follow the specific rules of each accommodation during their stay in Aveiro.'}
                </p>
              </div>
            </>
          )}

          {type === 'disputes' && (
            <>
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-serif text-[#fbf8f3] font-medium">
                  1. {lang === 'pt' ? 'Resolução Alternativa de Litígios (RAL)' : 'Alternative Dispute Resolution (ADR)'}
                </h3>
                <p>
                  {lang === 'pt'
                    ? 'Em cumprimento da Lei n.º 144/2015, informamos que, em caso de litígio, o consumidor pode recorrer a uma Entidade de Resolução Alternativa de Litígios de Consumo:'
                    : 'In compliance with Law no. 144/2015, we inform that in the event of a dispute, consumers may resort to an Alternative Consumer Dispute Resolution Entity:'}
                </p>
                <div className="p-4 rounded-2xl bg-[#171c2b] border border-[#27314a] space-y-2">
                  <p className="font-semibold text-[#fbf8f3]">
                    CNIACC - Centro Nacional de Informação e Arbitragem de Conflitos de Consumo
                  </p>
                  <p className="text-xs text-[#a09a8e]">
                    Faculdade de Direito da Universidade Nova de Lisboa, Campus de Campolide, 1099-032 Lisboa
                  </p>
                  <p className="text-xs">
                    Site:{' '}
                    <a
                      href="https://www.cniacc.pt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c5a880] underline inline-flex items-center gap-1"
                    >
                      <span>www.cniacc.pt</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-serif text-[#fbf8f3] font-medium">
                  2. {lang === 'pt' ? 'Plataforma Europeia de Resolução de Litígios em Linha' : 'European Online Dispute Resolution Platform'}
                </h3>
                <p>
                  {lang === 'pt'
                    ? 'Pode também recorrer à Plataforma Europeia de Resolução de Litígios em Linha para resolução de conflitos decorrentes de compras online:'
                    : 'You can also use the European Online Dispute Resolution platform for resolving online purchase disputes:'}
                </p>
                <p>
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c5a880] underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>https://ec.europa.eu/consumers/odr</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#202738]">
                <h3 className="text-sm sm:text-base font-serif text-[#fbf8f3] font-medium">
                  {lang === 'pt' ? 'Livro de Reclamações Eletrónico' : 'Electronic Complaints Book'}
                </h3>
                <p>
                  {lang === 'pt'
                    ? 'Informamos que disponibilizamos o acesso ao Livro de Reclamações Eletrónico oficial para qualquer reclamação ou sugestão:'
                    : 'We provide direct access to the official Electronic Complaints Book for any complaint or suggestion:'}
                </p>
                <p>
                  <a
                    href="https://www.livroreclamacoes.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline inline-flex items-center gap-1.5 font-medium"
                  >
                    <span>www.livroreclamacoes.pt</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-[#202738] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] text-xs font-semibold shadow-lg shadow-[#c5a880]/20 transition-all"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
