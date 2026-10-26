import React from 'react';
import { Building2, ArrowRight, ShieldCheck } from 'lucide-react';

interface RealEstateHeroBannerProps {
  onOpenRealEstate: () => void;
  language?: 'pt' | 'en';
}

export const RealEstateHeroBanner: React.FC<RealEstateHeroBannerProps> = ({ onOpenRealEstate, language = 'pt' }) => {
  const isPt = language === 'pt';

  return (
    <section className="relative my-16 rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-2xl border border-slate-700/50">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-medium tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            {isPt ? 'Mediação Imobiliária Autorizada em Aveiro' : 'Authorized Real Estate Mediation in Aveiro'}
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-serif font-bold tracking-tight text-white leading-tight">
            {isPt 
              ? 'Quer investir ou comprar? Veja nossos imóveis em Aveiro.' 
              : 'Looking to invest or buy? Explore our properties in Aveiro.'}
          </h2>
          
          <p className="text-slate-300 text-base lg:text-lg max-w-2xl leading-relaxed">
            {isPt
              ? 'Descubra apartamentos de luxo, moradias exclusivas e terrenos na região de Aveiro. Acompanhamento especializado com rigor, transparência e segurança jurídica em Portugal.'
              : 'Discover luxury apartments, exclusive villas, and land plots in the Aveiro region. Expert guidance with rigor, transparency, and legal security in Portugal.'}
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
          <button
            onClick={onOpenRealEstate}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Building2 className="w-5 h-5" />
            <span>{isPt ? 'Ver Imóveis à Venda' : 'View Properties for Sale'}</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>

          <div className="text-center lg:text-left px-2">
            <span className="text-xs text-slate-400 block">
              {isPt ? 'Licença AMI nº 00000 • Aveiro, Portugal' : 'AMI License nº 00000 • Aveiro, Portugal'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
