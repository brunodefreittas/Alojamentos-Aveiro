import React, { useState } from 'react';
import { RealEstateProperty } from '../types/realestate';
import { X, MapPin, Maximize2, ShieldCheck, Mail, Phone, CheckCircle2, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';

interface PropertyDetailModalProps {
  property: RealEstateProperty | null;
  onClose: () => void;
  language?: 'pt' | 'en';
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose, language = 'pt' }) => {
  if (!property) return null;

  const isPt = language === 'pt';
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: isPt 
      ? `Olá, gostaria de obter mais informações sobre o imóvel: ${property.title} (Ref: ${property.id}).`
      : `Hello, I would like more information about the property: ${property.title} (Ref: ${property.id}).`
  });

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          propertyTitle: property.title,
          propertyId: property.id,
          subject: isPt ? `Novo Pedido de Visita: ${property.title} (Ref: ${property.id})` : `New Visit Request: ${property.title} (Ref: ${property.id})`
        })
      });
      const data = await response.json();
      if (data.success) {
        setInquirySent(true);
      } else {
        alert(isPt ? 'Erro ao enviar email. Por favor tente novamente.' : 'Error sending email. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setInquirySent(true);
    }
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold uppercase tracking-wider">
              {property.type === 'apartment' ? (isPt ? 'Apartamento' : 'Apartment') :
               property.type === 'house' ? (isPt ? 'Moradia' : 'House') :
               property.type === 'land' ? (isPt ? 'Terreno' : 'Land') : (isPt ? 'Comercial' : 'Commercial')}
            </span>
            <span className="text-xs text-slate-500 font-medium">Ref: {property.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 lg:p-8 space-y-8">
          
          {/* Gallery & Quick Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Gallery Slider (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 shadow-lg">
                <img
                  src={property.images[activeImageIndex] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
                  alt={property.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/60 text-white text-xs backdrop-blur-sm">
                  {activeImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? 'border-indigo-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title, Price & Details (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h1 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>{property.location}</span>
                </div>

                <div className="text-3xl font-bold text-indigo-900 font-sans">
                  {formatPrice(property.price)}
                </div>

                {/* Key Specs badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-xs text-slate-500 block">{isPt ? 'Tipologia' : 'Typology'}</span>
                    <span className="text-base font-bold text-slate-800">{property.typology}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-xs text-slate-500 block">{isPt ? 'Área Bruta' : 'Gross Area'}</span>
                    <span className="text-base font-bold text-slate-800">{property.gross_area} m²</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-xs text-slate-500 block">{isPt ? 'Cert. Energético' : 'Energy Cert.'}</span>
                    <span className="text-base font-bold text-emerald-700 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> {property.energy_certificate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact quick buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/351924323980?text=${encodeURIComponent(isPt ? `Olá, gostaria de agendar uma visita ao imóvel: ${property.title} (Ref: ${property.id}).` : `Hello, I would like to schedule a visit for the property: ${property.title} (Ref: ${property.id}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all text-center"
                >
                  <Phone className="w-5 h-5" />
                  <span>{isPt ? 'Agendar Visita via WhatsApp' : 'Schedule Visit via WhatsApp'}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-slate-100">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                {isPt ? 'Sobre este imóvel' : 'About this property'}
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
                {property.description[isPt ? 'pt' : 'en'] || property.description.pt}
              </p>

              {property.features && property.features.length > 0 && (
                <div className="pt-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    {isPt ? 'Características e Comodidades' : 'Features & Amenities'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feat, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
                {isPt ? 'Agendar Visita / Pedir Informações' : 'Schedule Visit / Request Info'}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {isPt ? 'Preencha o formulário para enviar o seu pedido diretamente para contacto@alojamentosaveiro.pt.' : 'Fill out the form to send your request directly to contacto@alojamentosaveiro.pt.'}
              </p>

              {inquirySent ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="font-semibold">{isPt ? 'Mensagem enviada para contacto@alojamentosaveiro.pt!' : 'Message sent to contacto@alojamentosaveiro.pt!'}</p>
                  <p className="text-xs text-emerald-700">
                    {isPt ? 'Entraremos em contacto muito brevemente.' : 'We will get back to you shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">{isPt ? 'Nome' : 'Name'}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={isPt ? 'O seu nome' : 'Your name'}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="exemplo@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">{isPt ? 'Telefone' : 'Phone'}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="+351 900 000 000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">{isPt ? 'Mensagem' : 'Message'}</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md transition-all"
                  >
                    {isPt ? 'Enviar Pedido de Informação' : 'Send Information Request'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
