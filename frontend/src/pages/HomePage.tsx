import React from 'react';
import { Language, Listing } from '../types';
import { CITIES_CULTURE } from '../data/citiesCulture';

interface HomePageProps {
  lang: Language;
  listings: Listing[];
  setActivePage: (page: string) => void;
  onSelectListing: (listing: Listing) => void;
  onCityClick: (cityName: string) => void;
  t: any;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  listings,
  setActivePage,
  onSelectListing,
  onCityClick,
  t
}) => {
  const popularCities = ["الرباط", "الدار البيضاء", "خريبكة", "مراكش", "طنجة"];

  return (
    <div className="space-y-10 pb-12 animate-fadeIn">
      
      {/* 1. Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6">
        <div className="absolute -right-10 -bottom-10 text-9xl opacity-15 font-black">🇲🇦</div>
        
        <div className="space-y-3 max-w-2xl mx-auto z-10 relative">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full">
            🚀 ft_transcendence 1337 / 42 Project
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-amber-100 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            {lang === 'ar' && "منصة مخصصة للطلبة والموظفين الشباب في المغرب للبحث عن السكن المشترك (Colocation) بأمان وسهولة تامة."}
            {lang === 'en' && "A platform tailored for students and young professionals in Morocco to find shared housing easily."}
            {lang === 'fr' && "Une plateforme dédiée aux étudiants et jeunes actifs au Maroc pour trouver une colocation."}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 z-10 relative pt-2">
          <button 
            onClick={() => setActivePage('listings')} 
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 py-3 rounded-2xl text-xs font-black shadow-lg transition-all hover:scale-105"
          >
            {lang === 'ar' ? "تصفح العروض الحالية 🏠" : lang === 'fr' ? "Voir les offres 🏠" : "Browse Offers 🏠"}
          </button>
        </div>
      </div>

      {/* 2. Popular Cities Bar */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-gray-800 px-2">
          {lang === 'ar' ? '🌟 المدن الرئيسية (ابحث بسرعة):' : '🌟 Popular Hubs:'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {popularCities.map((cityKey) => {
            const cityData = CITIES_CULTURE[cityKey];
            if (!cityData) return null;
            return (
              <button
                key={cityKey}
                onClick={() => {
                  onCityClick(cityKey);
                  setActivePage('listings');
                }}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-500 transition text-center space-y-2 group"
              >
                <div className="text-2xl group-hover:scale-110 transition">{cityData.icon}</div>
                <div className="font-bold text-xs text-gray-800">{cityData.name[lang]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Why Choose iRent */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-2xl">🎓</span>
          <h4 className="font-black text-sm text-gray-800">{lang === 'ar' ? 'خاص بالطلبة والشباب' : 'Student Focused'}</h4>
          <p className="text-xs text-gray-500">
            {lang === 'ar' ? 'سكن مشترك آمن وقريب من مدارس التكوين (1337، الجامعات، والمعاهد).' : 'Secure shared housing close to major schools and universities.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-2xl">📶</span>
          <h4 className="font-black text-sm text-gray-800">{lang === 'ar' ? 'تجهيزات متكاملة (فايبر)' : 'Fiber WiFi Ready'}</h4>
          <p className="text-xs text-gray-500">
            {lang === 'ar' ? 'تركيز على توفر صبيب انترنت عالي (Fiber) للبرمجة والمذاكرة براحة.' : 'High-speed fiber internet for coding and studying.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-2xl">💬</span>
          <h4 className="font-black text-sm text-gray-800">{lang === 'ar' ? 'تواصل مباشر وآمن' : 'Direct Chat'}</h4>
          <p className="text-xs text-gray-500">
            {lang === 'ar' ? 'تحدث مباشرة مع أصحاب الشقق أو شركاء السكن المحتملين عبر الشات.' : 'Chat directly with apartment owners or potential roommates.'}
          </p>
        </div>
      </div>

      {/* 4. Featured Listings Preview */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-lg font-black text-gray-800">
            {lang === 'ar' ? '🔥 أحدث العروض المضافة:' : '🔥 Latest Listings:'}
          </h3>
          <button 
            onClick={() => setActivePage('listings')}
            className="text-xs font-bold text-amber-600 hover:underline"
          >
            {lang === 'ar' ? 'عرض الكل ←' : 'View All →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.slice(0, 2).map((item) => (
            <div 
              key={item.id} 
              onClick={() => onSelectListing(item)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex gap-4 p-3.5 cursor-pointer group"
            >
              <img src={item.imageUrl} alt={item.title[lang]} className="w-28 h-28 rounded-2xl object-cover group-hover:scale-105 transition" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.title[lang]}</h4>
                  <p className="text-xs text-gray-500 mt-1">📍 {item.city} - {item.district}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-black text-amber-600 text-sm">{item.price} DH {t.perMonth}</span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-bold px-2.5 py-1 rounded-full">
                    {item.hasWifi ? t.wifiAvailable : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};