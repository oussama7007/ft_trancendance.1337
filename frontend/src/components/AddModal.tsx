import React, { useState } from 'react';
import { Listing } from '../types';
<<<<<<< HEAD
import { translations } from '../translations'; // 👈 استيراد الترجمات
=======
>>>>>>> origin/main

interface AddModalProps {
  onClose: () => void;
  onAdd: (listing: Listing) => void;
  lang: 'ar' | 'fr' | 'en';
}

export const AddModal: React.FC<AddModalProps> = ({ onClose, onAdd, lang }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');

<<<<<<< HEAD
  // 👈 جلب الترجمات حسب اللغة
  const t = translations[lang] || translations.en;

  const handleSubmit = () => {
    // التحقق باش ما يصيفطش معلومات خاوية
    if (!title || !price || !city) return;

=======
  const handleSubmit = () => {
>>>>>>> origin/main
    const newListing: Listing = {
      id: Date.now(),
      title: { en: title, fr: title, ar: title },
      description: { en: 'New listing', fr: 'Nouvelle annonce', ar: 'إعلان جديد' },
      city: city,
      cityEnFr: city,
<<<<<<< HEAD
      district: 'City Center', // تقدر تزيد حقل ديال الحي من بعد
=======
      district: 'City Center',
>>>>>>> origin/main
      districtEnFr: 'City Center',
      price: Number(price),
      bedrooms: 1,
      hasWifi: true,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400',
      ownerName: 'User'
    };
<<<<<<< HEAD
    
=======
>>>>>>> origin/main
    onAdd(newListing);
    onClose();
  };

  return (
<<<<<<< HEAD
    // 👈 زدت backdrop-blur باش تعطي تأثير زجاجي واعر فاش كيتحل المودال
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
      <div className="bg-white p-6 md:p-8 rounded-[2rem] w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
        
        <h2 className="text-2xl font-black mb-6 text-gray-900">
          {t.addListingTitle}
        </h2>
        
        <div className="space-y-4 mb-8">
          <input 
            className="w-full bg-gray-50/50 border border-gray-200 p-3.5 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4845F]/50 focus:border-[#F4845F] transition-all" 
            placeholder={t.titlePlaceholder} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <input 
            className="w-full bg-gray-50/50 border border-gray-200 p-3.5 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4845F]/50 focus:border-[#F4845F] transition-all" 
            placeholder={t.pricePlaceholder} 
            type="number" 
            onChange={(e) => setPrice(e.target.value)} 
          />
          <input 
            className="w-full bg-gray-50/50 border border-gray-200 p-3.5 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4845F]/50 focus:border-[#F4845F] transition-all" 
            placeholder={t.cityPlaceholder} 
            onChange={(e) => setCity(e.target.value)} 
          />
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold transition-all active:scale-95"
          >
            {t.cancelBtn}
          </button>
          <button 
            onClick={handleSubmit} 
            className="flex-1 py-3.5 rounded-2xl bg-[#F4845F] hover:bg-[#e07553] shadow-lg shadow-[#F4845F]/30 text-white text-sm font-black transition-all active:scale-95"
          >
            {t.postBtn}
          </button>
        </div>
        
=======
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-3xl w-full max-w-sm shadow-2xl">
        <h2 className="text-xl font-black mb-4">{lang === 'ar' ? 'إضافة إعلان جديد' : 'Ajouter une annonce'}</h2>
        <input className="w-full bg-gray-100 p-3 rounded-xl mb-3 text-sm" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full bg-gray-100 p-3 rounded-xl mb-3 text-sm" placeholder="Price (DH)" type="number" onChange={(e) => setPrice(e.target.value)} />
        <input className="w-full bg-gray-100 p-3 rounded-xl mb-6 text-sm" placeholder="City" onChange={(e) => setCity(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl bg-gray-200 text-sm font-bold">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2 rounded-xl bg-[#F4845F] text-white text-sm font-bold">Post</button>
        </div>
>>>>>>> origin/main
      </div>
    </div>
  );
};