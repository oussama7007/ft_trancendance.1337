import React, { useState } from 'react';
import { Listing } from '../types';
import { AddModal } from '../components/AddModal';

interface ProfilePageProps {
  lang: 'ar' | 'fr' | 'en';
  listings: Listing[];
  onBackToHome: () => void; // 👈 دالة للرجوع لصفحة العروض
  onAddListing: (newListing: Listing) => void;
  t: any;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ 
  lang, 
  listings, 
  onBackToHome, 
  onAddListing, 
  t 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [myListings, setMyListings] = useState(listings);

  const handleAdd = (newListing: Listing) => {
    const updated = [...myListings, newListing];
    setMyListings(updated);
    onAddListing(newListing); // إرسال العقار الجديد حتى لـ App الرئيسي باش يبان في العروض العامة
    setShowModal(false);
  };

  return (
    <div className={`p-6 max-w-4xl mx-auto space-y-6 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* شريط علوي للرجوع وزر الإضافة */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={onBackToHome}
          className="text-xs font-bold text-gray-600 hover:text-[#F4845F] flex items-center gap-2 transition cursor-pointer"
        >
          {lang === 'ar' ? '← الرجوع إلى العروض' : lang === 'fr' ? '← Retour aux offres' : '← Back to Listings'}
        </button>

        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#F4845F] hover:bg-[#e07553] text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-md transition cursor-pointer"
        >
          ➕ {t.addListing || (lang === 'ar' ? 'إضافة عقار' : 'Add Listing')}
        </button>
      </div>

      <h1 className="text-xl font-black text-gray-900">
        {lang === 'ar' ? 'عقاراتي الشخصية' : lang === 'fr' ? 'Mes Biens Immobiliers' : 'My Listings'}
      </h1>

      {/* قائمة العقارات الخاصة بالمستخدم */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myListings.length > 0 ? (
          myListings.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-1">
              <h3 className="font-extrabold text-sm text-gray-800">{item.title[lang] || item.title.ar}</h3>
              <p className="text-xs font-black text-[#F4845F]">{item.price} DH</p>
              <p className="text-[10px] text-gray-400">📍 {item.city}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400 text-xs font-bold">
            {lang === 'ar' ? 'ليس لديك أي عقار منشور حالياً.' : 'Aucun bien publié pour le moment.'}
          </div>
        )}
      </div>

      {showModal && <AddModal onClose={() => setShowModal(false)} onAdd={handleAdd} lang={lang} />}
    </div>
  );
};