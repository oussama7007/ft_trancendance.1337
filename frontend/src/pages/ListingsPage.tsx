import React, { useState } from 'react';
import { Listing, Language } from '../types';
import { HouseCard } from '../components/HouseCard';

interface ListingsPageProps {
  lang: Language;
  listings: Listing[];
  onSelectListing: (item: Listing) => void;
  t: any;
  onSearchChange?: (query: string) => void;
  onCitySelect?: (cityName: string) => void;
}

export const ListingsPage: React.FC<ListingsPageProps> = ({ 
  lang, 
  listings, 
  onSelectListing, 
  t,
  onSearchChange,
  onCitySelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(3000);

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleQuickCityClick = (cityName: string) => {
    setSearchQuery(cityName);
    if (onSearchChange) onSearchChange(cityName);
    if (onCitySelect) onCitySelect(cityName);
  };

  const filteredListings = listings.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const searchableText = `${item.city} ${item.cityEnFr} ${item.district} ${item.districtEnFr} ${item.title[lang]}`.toLowerCase();
    return searchableText.includes(query) && item.price <= maxPrice;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Quick Moroccan Cities Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
          {lang === 'ar' ? 'مدن شائعة:' : lang === 'fr' ? 'Villes populaires:' : 'Popular Cities:'}
        </span>
        {['الرباط', 'الدار البيضاء', 'طنجة', 'مراكش', 'خريبكة'].map((city) => (
          <button
            key={city}
            onClick={() => handleQuickCityClick(city)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm border ${
              searchQuery.includes(city) 
                ? 'bg-amber-600 text-white border-amber-600' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-amber-500 hover:text-amber-600'
            }`}
          >
            {city}
          </button>
        ))}
        {searchQuery && (
          <button
            onClick={() => handleSearchInput('')}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            {lang === 'ar' ? 'مسح البحث ✖' : lang === 'fr' ? 'Effacer ✖' : 'Clear ✖'}
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">{t.searchLabel}</label>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            value={searchQuery} 
            onChange={(e) => handleSearchInput(e.target.value)} 
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            {t.maxPriceLabel} <span className="text-amber-600 font-black">{maxPrice} DH</span>
          </label>
          <input 
            type="range" min="500" max="4000" step="100" 
            value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} 
            className="w-full accent-amber-600 cursor-pointer" 
          />
        </div>
        <div className="text-left font-medium text-sm text-gray-500 self-end pb-1">
          {t.resultsFound} <span className="font-bold text-amber-600">{filteredListings.length}</span> {t.offersCount}
        </div>
      </div>

      {/* Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <HouseCard key={item.id} item={item} lang={lang} onSelect={onSelectListing} />
          ))}
        </div>
      ) : (
        /* Moroccan Empty State (Fully Translated) */
        <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-amber-200 space-y-3 shadow-sm">
          <p className="text-5xl">🔍🇲🇦</p>
          <h3 className="text-lg font-bold text-gray-800">{t.noResultsTitle}</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            {t.noResultsSub}
          </p>
          <button
            onClick={() => {
              handleSearchInput('');
              setMaxPrice(4000);
            }}
            className="mt-2 inline-block bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:bg-amber-700 transition"
          >
            {t.resetSearch}
          </button>
        </div>
      )}
    </div>
  );
};