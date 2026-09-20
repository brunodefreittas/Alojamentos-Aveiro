import React, { useState } from 'react';
import { Calendar, Users, Search, MessageCircle, ExternalLink, Sparkles, Building2 } from 'lucide-react';
import { Language, ApartmentId } from '../types';
import { APARTMENTS_DATA } from '../data/apartmentsData';

interface QuickSearchWidgetProps {
  lang: Language;
}

export const QuickSearchWidget: React.FC<QuickSearchWidgetProps> = ({ lang }) => {
  const [selectedApt, setSelectedApt] = useState<ApartmentId>('aveiro-sunset');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);

  const apartment = APARTMENTS_DATA[selectedApt];

  // Quick date presets
  const applyPreset = (type: 'weekend' | 'tomorrow' | 'nextWeek') => {
    const today = new Date();
    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    if (type === 'tomorrow') {
      const start = new Date(today);
      start.setDate(today.getDate() + 1);
      const end = new Date(start);
      end.setDate(start.getDate() + 2);
      setCheckIn(formatDate(start));
      setCheckOut(formatDate(end));
    } else if (type === 'weekend') {
      // Coming Friday to Sunday
      const start = new Date(today);
      const day = start.getDay();
      const diff = (5 - day + 7) % 7 || 7;
      start.setDate(start.getDate() + diff);
      const end = new Date(start);
      end.setDate(start.getDate() + 2);
      setCheckIn(formatDate(start));
      setCheckOut(formatDate(end));
    } else if (type === 'nextWeek') {
      const start = new Date(today);
      start.setDate(start.getDate() + 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 3);
      setCheckIn(formatDate(start));
      setCheckOut(formatDate(end));
    }
  };

  const handleBookingClick = () => {
    let finalCheckIn = checkIn;
    let finalCheckOut = checkOut;

    if (!finalCheckIn || !finalCheckOut) {
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() + 1);
      const end = new Date(start);
      end.setDate(start.getDate() + 3);
      finalCheckIn = start.toISOString().split('T')[0];
      finalCheckOut = end.toISOString().split('T')[0];
      setCheckIn(finalCheckIn);
      setCheckOut(finalCheckOut);
    }

    let url = apartment.bookingUrl;
    const params = new URLSearchParams();
    params.append('checkin', finalCheckIn);
    params.append('checkout', finalCheckOut);
    params.append('group_adults', String(guests));
    params.append('req_adults', String(guests));
    params.append('group_children', '0');
    params.append('req_children', '0');
    params.append('no_rooms', '1');
    params.append('room1', Array(guests).fill('A').join(','));
    params.append('sb_price_type', 'total');
    params.append('ucfs', '1');

    const queryString = params.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }

    url += '#no_availability_msg';

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = () => {
    const aptName = apartment.name;
    const checkInText = checkIn ? ` de ${checkIn}` : '';
    const checkOutText = checkOut ? ` a ${checkOut}` : '';
    const datesText = checkIn && checkOut ? ` de ${checkIn} a ${checkOut}` : '';
    
    const message = lang === 'pt'
      ? `Olá! Gostaria de saber a disponibilidade do ${aptName} para ${guests} hóspedes${datesText}.`
      : `Hello! I would like to check availability for ${aptName} for ${guests} guests${datesText}.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/351924323980?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="consulta-datas" className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 mb-16">
      <div className="bg-[#121622]/95 backdrop-blur-xl border border-[#c5a880]/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60">
        
        {/* Header inside widget */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1e2436]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-[#fbf8f3] font-normal">
                {lang === 'pt' ? 'Consulta Rápida de Disponibilidade' : 'Quick Availability Check'}
              </h3>
              <p className="text-xs text-[#9d978d]">
                {lang === 'pt' ? 'Verifique datas, hóspedes e reserve diretamente' : 'Select dates, guests and book securely'}
              </p>
            </div>
          </div>

          {/* Apartment Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-[#0a0c10] p-1.5 rounded-2xl border border-[#1e2436]">
            <button
              onClick={() => setSelectedApt('aveiro-sunset')}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                selectedApt === 'aveiro-sunset'
                  ? 'bg-[#c5a880] text-[#0a0c10] shadow'
                  : 'text-[#a39d91] hover:text-[#fbf8f3]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Aveiro Sunset</span>
            </button>
            <button
              onClick={() => setSelectedApt('aveiro-white-105')}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                selectedApt === 'aveiro-white-105'
                  ? 'bg-[#c5a880] text-[#0a0c10] shadow'
                  : 'text-[#a39d91] hover:text-[#fbf8f3]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Aveiro White 105</span>
            </button>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Check-in */}
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider text-[#a39d91] font-medium">
              {lang === 'pt' ? 'Check-in' : 'Check-in'}
            </label>
            <div className="relative flex items-center">
              <Calendar className="absolute left-3.5 w-4 h-4 text-[#c5a880] pointer-events-none" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#0a0c10] border border-[#232a3d] hover:border-[#c5a880]/50 focus:border-[#c5a880] rounded-2xl py-3 pl-11 pr-4 text-sm text-[#fbf8f3] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider text-[#a39d91] font-medium">
              {lang === 'pt' ? 'Check-out' : 'Check-out'}
            </label>
            <div className="relative flex items-center">
              <Calendar className="absolute left-3.5 w-4 h-4 text-[#c5a880] pointer-events-none" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#0a0c10] border border-[#232a3d] hover:border-[#c5a880]/50 focus:border-[#c5a880] rounded-2xl py-3 pl-11 pr-4 text-sm text-[#fbf8f3] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Hóspedes */}
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider text-[#a39d91] font-medium">
              {lang === 'pt' ? 'Hóspedes' : 'Guests'}
            </label>
            <div className="relative flex items-center">
              <Users className="absolute left-3.5 w-4 h-4 text-[#c5a880] pointer-events-none" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#0a0c10] border border-[#232a3d] hover:border-[#c5a880]/50 focus:border-[#c5a880] rounded-2xl py-3 pl-11 pr-4 text-sm text-[#fbf8f3] outline-none transition-colors appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num} className="bg-[#0a0c10] text-[#fbf8f3]">
                    {num} {num === 1 ? (lang === 'pt' ? 'Hóspede' : 'Guest') : (lang === 'pt' ? 'Hóspedes' : 'Guests')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Presets / Suggestions */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <span className="block text-[11px] uppercase tracking-wider text-[#9d978d] mb-1">
              {lang === 'pt' ? 'Sugestões rápidas' : 'Quick suggestions'}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => applyPreset('weekend')}
                className="flex-1 px-2.5 py-2 rounded-xl bg-[#0a0c10] hover:bg-[#181f30] text-[11px] text-[#c5a880] border border-[#232a3d] transition-colors truncate"
              >
                {lang === 'pt' ? 'Fim de Semana' : 'Weekend'}
              </button>
              <button
                onClick={() => applyPreset('tomorrow')}
                className="flex-1 px-2.5 py-2 rounded-xl bg-[#0a0c10] hover:bg-[#181f30] text-[11px] text-[#c5a880] border border-[#232a3d] transition-colors truncate"
              >
                {lang === 'pt' ? 'Amanhã (2n)' : 'Tomorrow (2n)'}
              </button>
              <button
                onClick={() => applyPreset('nextWeek')}
                className="flex-1 px-2.5 py-2 rounded-xl bg-[#0a0c10] hover:bg-[#181f30] text-[11px] text-[#c5a880] border border-[#232a3d] transition-colors truncate"
              >
                {lang === 'pt' ? 'Próx. Semana' : 'Next Week'}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1e2436]">
          <div className="text-xs text-[#a39d91] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {lang === 'pt'
                ? `Selecionado: ${apartment.name} (${apartment.capacity[lang]})`
                : `Selected: ${apartment.name} (${apartment.capacity[lang]})`}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* WhatsApp consult */}
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#18231c] hover:bg-[#203026] text-[#25d366] border border-[#25d366]/30 text-xs font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25d366]" />
              <span>{lang === 'pt' ? 'Consultar via WhatsApp' : 'Consult via WhatsApp'}</span>
            </button>

            {/* Booking action */}
            <button
              onClick={handleBookingClick}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#c5a880] hover:bg-[#b5966d] text-[#0a0c10] text-xs font-medium shadow-lg hover:shadow-[#c5a880]/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Ver Disponibilidade no Booking' : 'Check Availability on Booking'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
