import React from 'react';
import { Listing, Language } from '../types';

interface ListingModalProps {
  listing: Listing | null;
  lang: Language;
  onClose: () => void;
  onContactOwner: () => void;
  t: any;
}

export const ListingModal: React.FC<ListingModalProps> = ({ listing, lang, onClose, onContactOwner, t }) => {
  if (!listing) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="relative h-64 w-full">
          <img src={listing.imageUrl} alt={listing.title[lang]} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-4 left-4 bg-white/80 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center font-bold shadow">✕</button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{listing.title[lang]}</h2>
              <p className="text-gray-500 font-medium">📍 {listing.city} - {listing.district}</p>
            </div>
            <span className="text-2xl font-black text-blue-600">{listing.price} DH <span className="text-sm font-normal text-gray-500">{t.perMonth}</span></span>
          </div>

          <div className="border-t border-b py-3 flex gap-6 text-sm text-gray-700 font-medium">
            <span>🛏️ {listing.bedrooms} {t.bedrooms}</span>
            <span>{listing.hasWifi ? t.wifiAvailable : t.noWifi}</span>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-1">{t.description}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{listing.description[lang]}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium">{t.owner}</p>
              <p className="font-bold text-gray-800">{listing.ownerName}</p>
            </div>
            <button onClick={() => { onClose(); onContactOwner(); }} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-500/20">
              {t.contactOwner}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};