import React, { useState, useEffect } from 'react';
import { RealEstateProperty } from '../types/realestate';
import { getStoredProperties, saveStoredProperties } from '../lib/supabase';
import { PropertyFormModal } from './PropertyFormModal';
import { Building2, Plus, Edit, Trash2, LogOut, ArrowLeft, ShieldCheck } from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
  onLogout: () => void;
  language?: 'pt' | 'en';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onLogout, language = 'pt' }) => {
  const isPt = language === 'pt';
  const [properties, setProperties] = useState<RealEstateProperty[]>([]);
  const [editingProperty, setEditingProperty] = useState<RealEstateProperty | null | undefined>(undefined);
  // undefined = closed, null = new property modal, RealEstateProperty = edit property modal

  useEffect(() => {
    loadProps();
  }, []);

  const loadProps = () => {
    const loaded = getStoredProperties();
    setProperties(loaded);
  };

  const handleSaveProperty = (saved: RealEstateProperty) => {
    const exists = properties.some((p) => p.id === saved.id);
    let updated: RealEstateProperty[];
    if (exists) {
      updated = properties.map((p) => (p.id === saved.id ? saved : p));
    } else {
      updated = [saved, ...properties];
    }
    saveStoredProperties(updated);
    setProperties(updated);
    setEditingProperty(undefined);
  };

  const handleDeleteProperty = (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    saveStoredProperties(updated);
    setProperties(updated);
    setEditingProperty(undefined);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      {/* Top bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-serif font-bold text-white">
              {isPt ? 'Painel de Controlo • Aveiro Imóveis' : 'Control Panel • Aveiro Properties'}
            </h1>
            <span className="text-xs text-slate-400">
              {isPt ? 'Gestão de Fichas de Imóveis' : 'Property Record Management'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditingProperty(null)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{isPt ? 'Novo Imóvel' : 'New Property'}</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 text-sm font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-white">
            {isPt ? 'Imóveis Registados' : 'Registered Properties'} ({properties.length})
          </h2>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 bg-slate-950 rounded-3xl border border-slate-800">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">{isPt ? 'Nenhum imóvel registado.' : 'No properties registered.'}</p>
          </div>
        ) : (
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">{isPt ? 'Imóvel' : 'Property'}</th>
                    <th className="px-6 py-4">{isPt ? 'Tipo' : 'Type'}</th>
                    <th className="px-6 py-4">{isPt ? 'Preço' : 'Price'}</th>
                    <th className="px-6 py-4">{isPt ? 'Tipologia / Área' : 'Typology / Area'}</th>
                    <th className="px-6 py-4">{isPt ? 'Localização' : 'Location'}</th>
                    <th className="px-6 py-4 text-right">{isPt ? 'Ações' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {properties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-900/55 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={prop.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=120&q=80'}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover bg-slate-800"
                        />
                        <div>
                          <div className="font-semibold text-white line-clamp-1">{prop.title}</div>
                          <div className="text-xs text-slate-500">Ref: {prop.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900 text-indigo-300 border border-slate-800 text-xs font-medium uppercase">
                          {prop.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        {formatPrice(prop.price)}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {prop.typology} • {prop.gross_area} m²
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {prop.location}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingProperty(prop)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(prop.id)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Property Form Modal (New or Edit) */}
      {editingProperty !== undefined && (
        <PropertyFormModal
          property={editingProperty}
          onSave={handleSaveProperty}
          onDelete={editingProperty && typeof editingProperty === 'object' ? handleDeleteProperty : undefined}
          onClose={() => setEditingProperty(undefined)}
          language={language}
        />
      )}

    </div>
  );
};
