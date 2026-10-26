import React, { useState, useEffect } from 'react';
import { RealEstateProperty } from '../types/realestate';
import { getStoredProperties } from '../lib/supabase';
import { PropertyDetailModal } from './PropertyDetailModal';
import { Building2, Search, SlidersHorizontal, MapPin, Maximize2, ShieldCheck, ArrowLeft, Home, Lock } from 'lucide-react';

interface RealEstateSectionProps {
  onBackToHome: () => void;
  onOpenAdminLogin: () => void;
  language?: 'pt' | 'en';
}

export const RealEstateSection: React.FC<RealEstateSectionProps> = ({ onBackToHome, onOpenAdminLogin, language = 'pt' }) => {
  const isPt = language === 'pt';
  const [properties, setProperties] = useState<RealEstateProperty[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTypology, setSelectedTypology] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<RealEstateProperty | null>(null);

  useEffect(() => {
    const loaded = getStoredProperties();
    setProperties(loaded);
  }, []);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
  };

  const filteredProperties = properties.filter((prop) => {
    if (selectedType !== 'all' && prop.type !== selectedType) return false;
    if (selectedTypology !== 'all' && prop.typology !== selectedTypology) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchLoc = prop.location.toLowerCase().includes(q);
      const matchDesc = prop.description.pt.toLowerCase().includes(q) || prop.description.en.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      {/* Top Bar / Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isPt ? 'Voltar ao Alojamento' : 'Back to Accommodation'}</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="text-center hidden sm:block">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                {isPt ? 'Mediação Imobiliária' : 'Real Estate'}
              </span>
              <h1 className="text-lg font-serif font-bold text-white">Aveiro Imóveis</h1>
            </div>

            <button
              onClick={onOpenAdminLogin}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isPt ? 'Painel Admin' : 'Admin Panel'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-medium uppercase tracking-wider">
            {isPt ? 'Portefólio Exclusivo em Aveiro' : 'Exclusive Portfolio in Aveiro'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            {isPt ? 'Compre ou Investir em Aveiro' : 'Buy or Invest in Aveiro'}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {isPt 
              ? 'Apartamentos, moradias e terrenos selecionados na região de Aveiro. Encontre a sua próxima casa ou oportunidade de investimento.'
              : 'Selected apartments, villas, and land plots in the Aveiro region. Find your next home or investment opportunity.'}
          </p>

          {/* Search Bar */}
          <div className="pt-6 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isPt ? 'Pesquisar por zona, título ou características...' : 'Search by zone, title or features...'}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Catalog */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 space-y-8">
        
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: isPt ? 'Todos os Imóveis' : 'All Properties' },
              { id: 'apartment', label: isPt ? 'Apartamentos' : 'Apartments' },
              { id: 'house', label: isPt ? 'Moradias' : 'Houses' },
              { id: 'land', label: isPt ? 'Terrenos' : 'Land' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedType === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-sm text-slate-400">
            {filteredProperties.length} {isPt ? 'imóveis encontrados' : 'properties found'}
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-slate-950/50 rounded-3xl border border-slate-800">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{isPt ? 'Nenhum imóvel encontrado' : 'No properties found'}</h3>
            <p className="text-slate-400 text-sm">
              {isPt ? 'Tente ajustar os seus filtros de pesquisa.' : 'Try adjusting your search filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => setSelectedProperty(prop)}
                className="group bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={prop.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider border border-slate-700">
                      {prop.type === 'apartment' ? (isPt ? 'Apartamento' : 'Apartment') :
                       prop.type === 'house' ? (isPt ? 'Moradia' : 'House') :
                       prop.type === 'land' ? (isPt ? 'Terreno' : 'Land') : 'Comercial'}
                    </span>
                    {prop.featured && (
                      <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold uppercase tracking-wider">
                        {isPt ? 'Destaque' : 'Featured'}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-emerald-400 font-bold text-xs border border-slate-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cert. {prop.energy_certificate}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-indigo-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{prop.location}</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {prop.title}
                    </h3>

                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                      {prop.description[isPt ? 'pt' : 'en'] || prop.description.pt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">{isPt ? 'Preço' : 'Price'}</span>
                      <span className="text-xl font-bold text-white font-sans">{formatPrice(prop.price)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">{isPt ? 'Tipologia / Área' : 'Typology / Area'}</span>
                      <span className="text-sm font-semibold text-slate-300">{prop.typology} • {prop.gross_area} m²</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          language={language}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6 text-center text-xs text-slate-500">
        <p>Aveiro Imóveis • Licença AMI nº 00000 • Aveiro, Portugal</p>
      </footer>
    </div>
  );
};
