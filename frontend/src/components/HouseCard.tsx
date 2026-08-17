import React from 'react';
import { Listing, Language } from '../types';
import { translations } from '../translations'; // 👈 استيراد الترجمات
interface HouseCardProps {
  item: Listing;
  lang: Language;
  onSelect: (item: Listing) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

// ملاحظة: زدنا هاد الليبلز محلياً هنا (بحال pageTexts فـ ListingsPage) باش ما نحتاجوش نبدلو translations.ts
const favoriteLabels: Record<Language, { add: string; remove: string }> = {
  ar: { add: 'أضف للمفضلة ❤️', remove: 'إزالة من المفضلة' },
  fr: { add: 'Ajouter aux favoris', remove: 'Retirer des favoris' },
  en: { add: 'Add to favorites', remove: 'Remove from favorites' },
};

const getCityBadgeStyle = (city: string) => {
  if (city.includes('رباط') || city.includes('Rabat')) return 'bg-blue-600 text-white';
  if (city.includes('مراكش') || city.includes('Marrakech')) return 'bg-red-600 text-white';
  if (city.includes('طنجة') || city.includes('Tanger')) return 'bg-emerald-600 text-white';
  if (city.includes('بيضاء') || city.includes('Casablanca')) return 'bg-slate-800 text-white';
  if (city.includes('خريبكة') || city.includes('Khouribga')) return 'bg-amber-600 text-white';
  return 'bg-gray-800 text-white';
};
export const HouseCard: React.FC<HouseCardProps> = ({ item, lang, onSelect, isFavorite = false, onToggleFavorite }) => {
  const badgeStyle = getCityBadgeStyle(item.city);
  const t = translations[lang]; // 👈 جلب الترجمات
  const favLabel = favoriteLabels[lang] || favoriteLabels.en;
  return (
    <div 
      onClick={() => onSelect(item)}
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="h-48 w-full relative overflow-hidden bg-gray-50">
          <img 
            src={item.imageUrl} 
            alt={item.title[lang]} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(item.id); }}
            aria-label={isFavorite ? favLabel.remove : favLabel.add}
            title={isFavorite ? favLabel.remove : favLabel.add}
            className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-300 cursor-pointer ${
              isFavorite ? 'bg-black scale-105' : 'bg-white/90 hover:bg-white'
            }`}
          >
            <span className={`text-base ${isFavorite ? '' : 'grayscale opacity-70'}`}>❤️</span>
          </button>

          <span className="absolute top-3 right-3 bg-[#F4845F] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
            {item.price} DH <span className="text-[10px] font-normal opacity-90">/ {t.perMonth}</span>
          </span>
          <span className={`absolute bottom-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md ${badgeStyle}`}>
            📍 {item.city}
          </span>
        </div>
        <div className="p-5 space-y-3">
          <h3 className="font-extrabold text-sm text-gray-900 line-clamp-1 group-hover:text-[#F4845F] transition-colors">
            {item.title[lang]}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span className="text-gray-600">🏛️ {item.district}</span>
            <span>👤 {item.ownerName}</span>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100 text-xs">
            <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-xl font-bold">
              🛏️ {item.bedrooms} {t.rooms}
            </span>
            {item.hasWifi ? (
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl font-bold border border-emerald-100">
                📶 {t.wifiAvailable}
              </span>
            ) : (
              <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-xl font-medium">
                🚫 {t.wifiNotAvailable}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">
        <button className="w-full py-2.5 bg-gray-50 group-hover:bg-[#4285F4] text-gray-800 group-hover:text-white rounded-xl text-xs font-extrabold transition-all text-center shadow-sm">
          {t.viewDetails}
        </button>
      </div>
    </div>
  );
};