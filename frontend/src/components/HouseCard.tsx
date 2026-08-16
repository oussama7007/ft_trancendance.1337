import React from 'react';
import { Listing, Language } from '../types';
<<<<<<< HEAD
import { translations } from '../translations'; // 👈 استيراد الترجمات
=======
>>>>>>> origin/main

interface HouseCardProps {
  item: Listing;
  lang: Language;
  onSelect: (item: Listing) => void;
}

<<<<<<< HEAD
=======
// ألوان شارات المدن حسب الهوية الثقافية بأسلوب عصري
>>>>>>> origin/main
const getCityBadgeStyle = (city: string) => {
  if (city.includes('رباط') || city.includes('Rabat')) return 'bg-blue-600 text-white';
  if (city.includes('مراكش') || city.includes('Marrakech')) return 'bg-red-600 text-white';
  if (city.includes('طنجة') || city.includes('Tanger')) return 'bg-emerald-600 text-white';
  if (city.includes('بيضاء') || city.includes('Casablanca')) return 'bg-slate-800 text-white';
  if (city.includes('خريبكة') || city.includes('Khouribga')) return 'bg-amber-600 text-white';
  return 'bg-gray-800 text-white';
};

export const HouseCard: React.FC<HouseCardProps> = ({ item, lang, onSelect }) => {
  const badgeStyle = getCityBadgeStyle(item.city);
<<<<<<< HEAD
  const t = translations[lang]; // 👈 جلب الترجمات
=======
>>>>>>> origin/main

  return (
    <div 
      onClick={() => onSelect(item)}
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
<<<<<<< HEAD
=======
        {/* Image & Price Container */}
>>>>>>> origin/main
        <div className="h-48 w-full relative overflow-hidden bg-gray-50">
          <img 
            src={item.imageUrl} 
            alt={item.title[lang]} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          
<<<<<<< HEAD
          <span className="absolute top-3 right-3 bg-[#F4845F] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
            {item.price} DH <span className="text-[10px] font-normal opacity-90">/ {t.perMonth}</span>
          </span>

=======
          {/* Badge الثمن */}
          <span className="absolute top-3 right-3 bg-[#F4845F] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
            {item.price} DH <span className="text-[10px] font-normal opacity-90">/ {lang === 'ar' ? 'شهر' : 'mo'}</span>
          </span>

          {/* Badge المدينة المغربية */}
>>>>>>> origin/main
          <span className={`absolute bottom-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md ${badgeStyle}`}>
            📍 {item.city}
          </span>
        </div>

<<<<<<< HEAD
=======
        {/* Content */}
>>>>>>> origin/main
        <div className="p-5 space-y-3">
          <h3 className="font-extrabold text-sm text-gray-900 line-clamp-1 group-hover:text-[#F4845F] transition-colors">
            {item.title[lang]}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span className="text-gray-600">🏛️ {item.district}</span>
            <span>👤 {item.ownerName}</span>
          </div>

<<<<<<< HEAD
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
=======
          {/* Tags (Wifi & Bedrooms) */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100 text-xs">
            <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-xl font-bold">
              🛏️ {item.bedrooms} {lang === 'ar' ? 'غرف' : 'Rooms'}
            </span>
            {item.hasWifi ? (
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl font-bold border border-emerald-100">
                📶 {lang === 'ar' ? 'فايبر متوفر' : 'WiFi Available'}
              </span>
            ) : (
              <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-xl font-medium">
                🚫 {lang === 'ar' ? 'بدون فايبر' : 'No WiFi'}
>>>>>>> origin/main
              </span>
            )}
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="px-5 pb-5">
        <button className="w-full py-2.5 bg-gray-50 group-hover:bg-[#4285F4] text-gray-800 group-hover:text-white rounded-xl text-xs font-extrabold transition-all text-center shadow-sm">
          {t.viewDetails}
=======
      {/* Button footer */}
      <div className="px-5 pb-5">
        <button className="w-full py-2.5 bg-gray-50 group-hover:bg-[#4285F4] text-gray-800 group-hover:text-white rounded-xl text-xs font-extrabold transition-all text-center shadow-sm">
          {lang === 'ar' ? 'عرض التفاصيل والمراسلة 💬' : 'View Details & Chat 💬'}
>>>>>>> origin/main
        </button>
      </div>
    </div>
  );
};