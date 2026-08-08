import React from 'react';
import { Listing, Language } from '../types';

interface HouseCardProps {
  item: Listing;
  lang: Language;
  onSelect: (item: Listing) => void;
}

// ألوان شارات المدن حسب الهوية الثقافية
const getCityBadgeStyle = (city: string) => {
  if (city.includes('رباط') || city.includes('Rabat')) return 'bg-blue-600 text-white';
  if (city.includes('مراكش') || city.includes('Marrakech')) return 'bg-red-700 text-white';
  if (city.includes('طنجة') || city.includes('Tanger')) return 'bg-emerald-700 text-white';
  if (city.includes('بيضاء') || city.includes('Casablanca')) return 'bg-slate-700 text-white';
  if (city.includes('خريبكة') || city.includes('Khouribga')) return 'bg-amber-600 text-white';
  return 'bg-amber-700 text-white';
};

export const HouseCard: React.FC<HouseCardProps> = ({ item, lang, onSelect }) => {
  const badgeStyle = getCityBadgeStyle(item.city);

  return (
    <div 
      onClick={() => onSelect(item)}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Image & Price Container */}
        <div className="h-48 w-full relative overflow-hidden bg-gray-100">
          <img 
            src={item.imageUrl} 
            alt={item.title[lang]} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* Badge الثمن */}
          <span className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-black px-3 py-1.5 rounded-2xl shadow-lg border border-amber-400/40">
            {item.price} DH <span className="text-[10px] font-normal opacity-90">/ شهر</span>
          </span>

          {/* Badge المدينة المغربية */}
          <span className={`absolute bottom-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-md backdrop-blur-md ${badgeStyle}`}>
            📍 {item.city}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="font-bold text-base text-gray-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
            {item.title[lang]}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-semibold text-gray-600">🏛️ {item.district}</span>
            <span>👤 {item.ownerName}</span>
          </div>

          {/* Tags (Wifi & Bedrooms) */}
          <div className="flex items-center gap-2 pt-1 border-t border-gray-50 text-[11px] text-gray-600">
            <span className="bg-gray-100 px-2.5 py-1 rounded-lg font-medium">
              🛏️ {item.bedrooms} {lang === 'ar' ? 'غرف' : 'Rooms'}
            </span>
            {item.hasWifi ? (
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg font-bold border border-emerald-200/50">
                📶 فايبر متوفر
              </span>
            ) : (
              <span className="bg-gray-50 text-gray-400 px-2.5 py-1 rounded-lg font-medium">
                🚫 بدون فايبر
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Button footer */}
      <div className="px-5 pb-4">
        <button className="w-full py-2 bg-amber-50 hover:bg-amber-600 text-amber-800 hover:text-white rounded-xl text-xs font-bold transition-all text-center">
          عرض التفاصيل والمراسلة 💬
        </button>
      </div>
    </div>
  );
};