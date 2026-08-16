import React, { useState } from 'react';
import { Listing } from '../types';
import { AddModal } from '../components/AddModal';

interface ProfilePageProps {
  lang: 'ar' | 'fr' | 'en';
  listings: Listing[];
  onOpenAddModal: () => void;
  t: any;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ lang, listings, t }) => {
  const [showModal, setShowModal] = useState(false);
  const [myListings, setMyListings] = useState(listings);

  const handleAdd = (newListing: Listing) => {
    setMyListings([...myListings, newListing]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black">{t.myListings}</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#F4845F] text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg"
        >
          {t.addListing}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myListings.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border">
            <h3 className="font-bold">{item.title[lang]}</h3>
            <p className="text-xs text-gray-500">{item.price} DH</p>
          </div>
        ))}
      </div>

      {showModal && <AddModal onClose={() => setShowModal(false)} onAdd={handleAdd} lang={lang} />}
    </div>
  );
};