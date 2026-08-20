import React from 'react';
import {
  Listing,
  Language,
  User,
} from '../types';

interface DetailsPageProps {
  listing: Listing;
  lang: Language;
  t: any;
  currentUser: User | null;

  onBack: () => void;
  onContactOwner: () => void;
}

export const DetailsPage: React.FC<DetailsPageProps> = ({
  listing,
  lang,
  t,
  currentUser,
  onBack,
  onContactOwner,
}) => {

  // =====================================================
  // TITLE
  // =====================================================

  const title =
    listing.title?.[lang] ||
    listing.title?.en ||
    'Property';


  // =====================================================
  // IMAGE
  // =====================================================

  const image =
    listing.imageUrl ||
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2';


  // =====================================================
  // CONTACT
  // =====================================================

  const handleContact = () => {

    if (!currentUser) {
      alert(
        lang === 'ar'
          ? 'خاصك تسجل الدخول الأول.'
          : lang === 'fr'
            ? 'Veuillez vous connecter d’abord.'
            : 'Please sign in first.'
      );

      return;
    }

    onContactOwner();

  };


  return (

    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">

      {/* =================================================
          BACK
      ================================================= */}

      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-2 text-sm font-extrabold text-gray-600 hover:text-[#F4845F] transition"
      >
        {lang === 'ar'
          ? '→ رجوع'
          : lang === 'fr'
            ? '← Retour'
            : '← Back'}
      </button>


      {/* =================================================
          MAIN CARD
      ================================================= */}

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">

        {/* =================================================
            IMAGE
        ================================================= */}

        <div className="relative w-full h-[300px] sm:h-[430px]">

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* PRICE */}

          <div className="absolute top-5 right-5">

            <span className="bg-[#F4845F] text-white px-5 py-2.5 rounded-full shadow-lg font-black text-sm">

              {listing.price} DH

              <span className="text-xs font-medium opacity-90">
                {' '}
                / {t.perMonth}
              </span>

            </span>

          </div>


          {/* CITY */}

          <div className="absolute bottom-5 left-5">

            <span className="bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold">

              📍 {listing.city}

            </span>

          </div>

        </div>


        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="p-6 sm:p-8">

          {/* TITLE */}

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">

            {title}

          </h1>


          {/* DISTRICT */}

          <p className="text-sm text-gray-500 font-semibold mb-6">

            🏛️ {listing.district}

          </p>


          {/* =================================================
              DETAILS GRID
          ================================================= */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">

            {/* ROOMS */}

            <div className="bg-gray-50 rounded-2xl p-4">

              <div className="text-xl mb-1">
                🛏️
              </div>

              <p className="text-xs text-gray-400 font-semibold">
                {t.rooms || 'Rooms'}
              </p>

              <p className="text-sm font-black text-gray-900">
                {listing.bedrooms}
              </p>

            </div>


            {/* WIFI */}

            <div className="bg-gray-50 rounded-2xl p-4">

              <div className="text-xl mb-1">
                📶
              </div>

              <p className="text-xs text-gray-400 font-semibold">
                WiFi
              </p>

              <p className="text-sm font-black text-gray-900">

                {listing.hasWifi
                  ? t.wifiAvailable || 'Available'
                  : t.wifiNotAvailable || 'Not available'}

              </p>

            </div>


            {/* CITY */}

            <div className="bg-gray-50 rounded-2xl p-4">

              <div className="text-xl mb-1">
                📍
              </div>

              <p className="text-xs text-gray-400 font-semibold">
                City
              </p>

              <p className="text-sm font-black text-gray-900 truncate">
                {listing.city}
              </p>

            </div>


            {/* OWNER */}

            <div className="bg-gray-50 rounded-2xl p-4">

              <div className="text-xl mb-1">
                👤
              </div>

              <p className="text-xs text-gray-400 font-semibold">
                Owner
              </p>

              <p className="text-sm font-black text-gray-900 truncate">
                {listing.ownerName}
              </p>

            </div>

          </div>


          {/* =================================================
              OWNER
          ================================================= */}

          <div className="border-t border-gray-100 pt-6">

            <h2 className="text-lg font-black text-gray-900 mb-4">
              {lang === 'ar'
                ? 'معلومات المالك'
                : lang === 'fr'
                  ? 'Informations du propriétaire'
                  : 'Owner information'}
            </h2>


            <div className="flex items-center justify-between gap-4 bg-gray-50 rounded-3xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-xl">
                  👤
                </div>

                <div>

                  <p className="text-sm font-black text-gray-900">
                    {listing.ownerName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {lang === 'ar'
                      ? 'مالك العقار'
                      : lang === 'fr'
                        ? 'Propriétaire'
                        : 'Property owner'}
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              CONTACT BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={handleContact}
            className="mt-6 w-full bg-[#F4845F] hover:bg-[#e07553] text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:shadow-xl transition-all"
          >

            💬{' '}

            {lang === 'ar'
              ? 'تواصل مع المالك'
              : lang === 'fr'
                ? 'Contacter le propriétaire'
                : 'Contact owner'}

          </button>


          {!currentUser && (

            <p className="text-center text-xs text-gray-400 mt-3 font-semibold">

              {lang === 'ar'
                ? 'خاصك تسجل الدخول باش تتواصل مع المالك.'
                : lang === 'fr'
                  ? 'Connectez-vous pour contacter le propriétaire.'
                  : 'Please sign in to contact the owner.'}

            </p>

          )}

        </div>

      </div>

    </div>
  );
};