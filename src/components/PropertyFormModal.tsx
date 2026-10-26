import React, { useState } from 'react';
import { RealEstateProperty, PropertyType, EnergyCertificate } from '../types/realestate';
import { X, Plus, Trash2, Save, Globe, Tag, Sparkles } from 'lucide-react';

interface PropertyFormModalProps {
  property?: RealEstateProperty | null;
  onSave: (property: RealEstateProperty) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
  language?: 'pt' | 'en';
}

export const PropertyFormModal: React.FC<PropertyFormModalProps> = ({ property, onSave, onDelete, onClose, language = 'pt' }) => {
  const isPt = language === 'pt';

  const [activeTab, setActiveTab] = useState<'details' | 'seo'>('details');

  const [formData, setFormData] = useState<RealEstateProperty>(
    property || {
      id: `prop-${Date.now()}`,
      title: '',
      slug: '',
      type: 'apartment',
      status: 'for_sale',
      price: 250000,
      typology: 'T2',
      gross_area: 100,
      useful_area: 85,
      energy_certificate: 'B',
      location: 'Vera Cruz, Aveiro',
      description: {
        pt: '',
        en: ''
      },
      features: ['Garagem', 'Varanda', 'Elevador'],
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
      featured: false,
      created_at: new Date().toISOString(),
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      og_image: ''
    }
  );

  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    onSave({
      ...formData,
      slug: slug || formData.id
    });
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData({
      ...formData,
      features: [...formData.features, newFeature.trim()]
    });
    setNewFeature('');
  };

  const removeFeature = (idx: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== idx)
    });
  };

  const addImage = () => {
    if (!newImage.trim()) return;
    setFormData({
      ...formData,
      images: [...formData.images, newImage.trim()]
    });
    setNewImage('');
  };

  const removeImage = (idx: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-800 shadow-2xl text-slate-100 my-8 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <h2 className="text-xl font-serif font-bold text-white">
            {property ? (isPt ? 'Editar Imóvel' : 'Edit Property') : (isPt ? 'Novo Imóvel' : 'New Property')}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 mb-6 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isPt ? 'Detalhes do Imóvel' : 'Property Details'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'seo'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{isPt ? 'SEO & Meta Tags' : 'SEO & Meta Tags'}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {activeTab === 'details' ? (
            <>
              {/* Title & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Título do Imóvel' : 'Property Title'}</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Apartamento T2 Rossio"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Tipo de Imóvel' : 'Property Type'}</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as PropertyType })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="apartment">{isPt ? 'Apartamento' : 'Apartment'}</option>
                    <option value="house">{isPt ? 'Moradia' : 'House'}</option>
                    <option value="land">{isPt ? 'Terreno' : 'Land'}</option>
                    <option value="commercial">{isPt ? 'Comercial' : 'Commercial'}</option>
                  </select>
                </div>
              </div>

              {/* Price, Typology & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Preço (€)' : 'Price (€)'}</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Tipologia' : 'Typology'}</label>
                  <input
                    type="text"
                    required
                    value={formData.typology}
                    onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                    placeholder="T2, T3, Terreno..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Localização em Aveiro' : 'Location in Aveiro'}</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Vera Cruz, Esgueira..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Areas & Energy Certificate */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Área Bruta (m²)' : 'Gross Area (m²)'}</label>
                  <input
                    type="number"
                    value={formData.gross_area}
                    onChange={(e) => setFormData({ ...formData, gross_area: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Área Útil (m²)' : 'Useful Area (m²)'}</label>
                  <input
                    type="number"
                    value={formData.useful_area}
                    onChange={(e) => setFormData({ ...formData, useful_area: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Certificado Energético' : 'Energy Certificate'}</label>
                  <select
                    value={formData.energy_certificate}
                    onChange={(e) => setFormData({ ...formData, energy_certificate: e.target.value as EnergyCertificate })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {['A+', 'A', 'B', 'B-', 'C', 'D', 'Exempt'].map((cert) => (
                      <option key={cert} value={cert}>{cert}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description PT */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Descrição (Português)' : 'Description (Portuguese)'}</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description.pt}
                  onChange={(e) => setFormData({ ...formData, description: { ...formData.description, pt: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Descreva o imóvel..."
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-700 focus:ring-indigo-500"
                />
                <label htmlFor="featured" className="text-sm text-slate-300">
                  {isPt ? 'Destacar na página principal / catálogo' : 'Feature on homepage / catalog'}
                </label>
              </div>

              {/* Features / Comodidades */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Comodidades (Garagem, Varanda...)' : 'Features'}</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Ex: Vista Ria"
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-800 text-indigo-300 text-xs border border-slate-700">
                      {feat}
                      <button type="button" onClick={() => removeFeature(idx)} className="hover:text-rose-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Image Uploads */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">{isPt ? 'Carregar Imagens do Imóvel (Upload)' : 'Upload Property Images'}</label>
                <div className="mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files) return;
                      Array.from(files).forEach((file) => {
                        const reader = new FileReader();
                        reader.onload = (uploadEvent) => {
                          const result = uploadEvent.target?.result as string;
                          if (result) {
                            setFormData((prev) => ({
                              ...prev,
                              images: [...prev.images, result]
                            }));
                          }
                        };
                        reader.readAsDataURL(file);
                      });
                    }}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group aspect-[16/10] rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* SEO & Meta Tags Tab */
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-1">
                    {isPt ? 'Otimização para Motores de Busca (SEO)' : 'Search Engine Optimization (SEO)'}
                  </span>
                  {isPt
                    ? 'Configure os meta títulos, descrições, palavras-chave e imagem de partilha social específicos para este imóvel para maximizar a visibilidade no Google e redes sociais em Portugal.'
                    : 'Configure specific meta titles, descriptions, keywords, and social share image for this property to maximize visibility on Google and social media.'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {isPt ? 'Título SEO (Meta Title)' : 'SEO Title (Meta Title)'}
                </label>
                <input
                  type="text"
                  value={formData.seo_title || ''}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  placeholder="Ex: Apartamento T2 à Venda em Aveiro | Alojamentos Aveiro"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {isPt ? 'Recomendado: 50 a 60 caracteres.' : 'Recommended: 50 to 60 characters.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {isPt ? 'Descrição SEO (Meta Description)' : 'SEO Description (Meta Description)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.seo_description || ''}
                  onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  placeholder="Ex: Magnífico apartamento T2 no Rossio, Aveiro. Com vista ria, acabamentos de luxo e garagem. Saiba mais e agende a sua visita."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {isPt ? 'Recomendado: 150 a 160 caracteres para exibição ideal nos resultados do Google.' : 'Recommended: 150 to 160 characters for optimal display in Google search results.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {isPt ? 'Palavras-chave (Keywords)' : 'Keywords'}
                </label>
                <input
                  type="text"
                  value={formData.seo_keywords || ''}
                  onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                  placeholder="comprar apartamento aveiro, t2 rossio, imobiliaria aveiro, moradia aveiro"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {isPt ? 'Separadas por vírgulas.' : 'Separated by commas.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {isPt ? 'URL da Imagem de Partilha Social (OpenGraph / OG Image)' : 'Social Share Image URL (OpenGraph)'}
                </label>
                <input
                  type="text"
                  value={formData.og_image || ''}
                  onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                  placeholder="https://exemplo.com/imagem-imovel.jpg"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {isPt ? 'Imagem exibida ao partilhar o link no WhatsApp, Facebook ou LinkedIn.' : 'Image displayed when sharing link on WhatsApp, Facebook, or LinkedIn.'}
                </p>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {property && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (onDelete && property) {
                    onDelete(property.id);
                  }
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-sm font-semibold transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isPt ? 'Eliminar Imóvel' : 'Delete Property'}</span>
              </button>
            ) : <div />}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                {isPt ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{isPt ? 'Guardar Imóvel' : 'Save Property'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
