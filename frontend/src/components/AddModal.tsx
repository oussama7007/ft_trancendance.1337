import React, { useState } from 'react';
import { Listing, Language } from '../types';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddListing: (newListing: Listing) => void;
  t: any;
}

export const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, lang, onAddListing, t }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('الرباط');
  const [district, setDistrict] = useState('');
  const [price, setPrice] = useState(1500);
  const [bedrooms, setBedrooms] = useState(1);
  const [hasWifi, setHasWifi] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: Listing = {
      id: Date.now(),
      title: { ar: title, en: title, fr: title },
      city: city,
      cityEnFr: city.toLowerCase(),
      district: district || 'وسط المدينة',
      districtEnFr: (district || 'centre').toLowerCase(),
      price: Number(price),
      bedrooms: Number(bedrooms),
      hasWifi: hasWifi,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
      description: { ar: desc || title, en: desc || title, fr: desc || title },
      ownerName: 'أنا (المستخدم الحالي)'
    };

    onAddListing(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-gray-900">{t.createNewListing}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">{t.titleLabel}</label>
            <input required type="text" placeholder="مثلاً: شقة مفروشة قريبة من الترام" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">{t.city}:</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option value="الرباط">الرباط</option>
                <option value="الدار البيضاء">الدار البيضاء</option>
                <option value="طنجة">طنجة</option>
                <option value="مراكش">مراكش</option>
                <option value="أكادير">أكادير</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">{t.districtLabel}</label>
              <input type="text" placeholder="أكدال، المعاريف..." value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">{t.priceLabel}</label>
              <input required type="number" step="50" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">{t.roomsLabel}</label>
              <input required type="number" min="1" max="10" value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">{t.imageUrlLabel}</label>
            <input type="url" placeholder="https://images.unsplash.com/..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">{t.description}</label>
            <textarea rows={3} placeholder="تفاصيل الدار والمرافق المتاحة..." value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="wifi" checked={hasWifi} onChange={(e) => setHasWifi(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <label htmlFor="wifi" className="text-sm font-semibold text-gray-700 cursor-pointer">{t.hasWifiLabel}</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100">{t.cancelBtn}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md shadow-blue-500/20">{t.publishBtn}</button>
          </div>
        </form>
      </div>
    </div>
  );
};