import React, { useState } from 'react';
import { Listing, Language } from '../types';

interface ProfilePageProps {
  lang: Language;
  listings: Listing[];
  onOpenAddModal: () => void;
  t: any;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ lang, listings, onOpenAddModal, t }) => {
  const [userRole, setUserRole] = useState<'seeker' | 'owner'>('owner');

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8 animate-fadeIn">
      
      {/* User Info Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 font-black">🇲🇦</div>
        
        <div className="relative">
          <img 
            src="https://i.pravatar.cc/150?img=68" 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-xl" 
          />
          <span className="absolute bottom-0 right-0 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px]">✓</span>
        </div>
        
        <div className="space-y-2 text-center md:text-right flex-1 z-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h2 className="text-2xl font-black text-amber-100">سفيان اللياني (Soufiane)</h2>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              {userRole === 'owner' 
                ? (lang === 'ar' ? '🏠 مالك معتمد' : lang === 'fr' ? '🏠 Propriétaire' : '🏠 Verified Host') 
                : (lang === 'ar' ? '🎓 طالب / باحث' : lang === 'fr' ? '🎓 Étudiant / Chercheur' : '🎓 Student / Seeker')
              }
            </span>
          </div>
          <p className="text-xs font-bold text-amber-200">
            {t.student}
          </p>
          <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold text-gray-300 justify-center md:justify-start">
            <span className="bg-black/30 px-3 py-1 rounded-xl">📍 Khouribga / Rabat</span>
            <span className="bg-black/30 px-3 py-1 rounded-xl">📞 +212 661-234567</span>
            <span className="bg-black/30 px-3 py-1 rounded-xl">✉️ student@1337.ma</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 z-10 w-full md:w-auto">
          <button 
            onClick={onOpenAddModal} 
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg transition-all hover:scale-105 text-center"
          >
            {t.addListing} 🏠
          </button>
        </div>
      </div>

      {/* Role Switcher Tabs */}
      <div className="flex bg-gray-200/70 p-1.5 rounded-2xl max-w-md mx-auto shadow-inner">
        <button
          onClick={() => setUserRole('owner')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            userRole === 'owner' 
              ? 'bg-amber-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {lang === 'ar' ? '🏠 وضع المالك (إعلاناتي)' : lang === 'fr' ? '🏠 Mode Propriétaire' : '🏠 Host Mode (My Listings)'}
        </button>
        <button
          onClick={() => setUserRole('seeker')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            userRole === 'seeker' 
              ? 'bg-amber-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {lang === 'ar' ? '🔍 وضع الباحث (المفضلة)' : lang === 'fr' ? '🔍 Mode Chercheur (Favoris)' : '🔍 Seeker Mode (Favorites)'}
        </button>
      </div>

      {/* Conditional Content based on Selected Role */}
      {userRole === 'owner' ? (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-r-4 border-amber-600 pr-3">
            <div>
              <h3 className="text-xl font-black text-gray-800">{t.myListings}</h3>
              <p className="text-xs text-gray-500">
                {lang === 'ar' && "إدارة العقارات والغرف التي تقم بعرضها للإيجار المشترك"}
                {lang === 'en' && "Manage properties and rooms you have listed for colocation"}
                {lang === 'fr' && "Gérez vos biens et chambres en colocation"}
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              {listings.length} {lang === 'ar' ? 'عروض نشطة' : lang === 'fr' ? 'offres actives' : 'active offers'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listings.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex gap-4 p-3.5 relative group">
                <img src={item.imageUrl} alt={item.title[lang]} className="w-28 h-28 rounded-2xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.title[lang]}</h4>
                    <p className="text-xs text-gray-500 mt-1">📍 {item.city} - {item.district}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-black text-amber-600 text-sm">{item.price} DH</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-1 rounded-full">
                      {lang === 'ar' ? 'متاح للحجز ✅' : lang === 'fr' ? 'Disponible ✅' : 'Available ✅'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="border-r-4 border-blue-600 pr-3">
            <h3 className="text-xl font-black text-gray-800">
              {lang === 'ar' ? 'العقارات المفضلة والمحفوظة' : lang === 'fr' ? 'Logements favoris' : 'Saved Properties'}
            </h3>
            <p className="text-xs text-gray-500">
              {lang === 'ar' && "الشقق والغرف التي قمت بحفظها للرجوع إليها لاحقاً"}
              {lang === 'en' && "Apartments and rooms you saved to review later"}
              {lang === 'fr' && "Appartements et chambres enregistrés"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-sm flex gap-4 p-3.5 bg-blue-50/20">
              <img src={listings[0]?.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"} alt="Saved" className="w-28 h-28 rounded-2xl object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md">
                    {lang === 'ar' ? 'مفضلة ❤️' : lang === 'fr' ? 'Favori ❤️' : 'Favorite ❤️'}
                  </span>
                  <h4 className="font-bold text-sm text-gray-800 line-clamp-1 mt-1">{listings[0]?.title[lang] || "شقة مفروشة"}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">📍 Rabat - Agdal</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-black text-blue-600 text-sm">1800 DH</span>
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-xl font-bold hover:bg-blue-700 transition">
                    {t.contactOwner}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 space-y-2">
            <h4 className="font-bold text-amber-900 text-sm">
              {lang === 'ar' ? '💡 تفضيلات البحث الخاصة بك:' : lang === 'fr' ? '💡 Vos préférences de recherche :' : '💡 Your Search Preferences:'}
            </h4>
            <p className="text-xs text-amber-800">
              {lang === 'ar' && "أنت تبحث حالياً عن: سكن قرب مدارس التكوين (1337 / 42)، بثمن أقل من 2500 درهم، مع توفر شبكة الفايبر (WiFi)."}
              {lang === 'en' && "Looking for: Housing near coding schools (1337 / 42), under 2500 DH, with Fiber WiFi."}
              {lang === 'fr' && "Recherche : Logement près des écoles (1337 / 42), moins de 2500 DH, avec Fibre WiFi."}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};