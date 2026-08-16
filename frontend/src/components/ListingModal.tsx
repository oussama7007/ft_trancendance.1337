<<<<<<< HEAD
// import React from 'react';
// import { Listing, Language } from '../types';

// interface ListingModalProps {
//   listing: Listing | null;
//   lang: Language;
//   onClose: () => void;
//   onContactOwner: () => void;
//   t: any; // كائن الترجمة المركزي
// }

// export const ListingModal: React.FC<ListingModalProps> = ({ listing, lang, onClose, onContactOwner, t }) => {
//   if (!listing) return null;

//   // تحديد اتجاه النص حسب اللغة (عربي RTL، فرنسي/إنجليزي LTR)
//   const isArabic = lang === 'ar';

//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
//       <div 
//         dir={isArabic ? 'rtl' : 'ltr'}
//         className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-gray-100"
//       >
        
//         {/* Image & Close Button Container */}
//         <div className="relative h-64 w-full bg-gray-50">
//           <img src={listing.imageUrl} alt={listing.title[lang]} className="w-full h-full object-cover" />
//           <button 
//             onClick={onClose} 
//             className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur-md hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center font-extrabold shadow-md transition cursor-pointer`}
//           >
//             ✕
//           </button>
//         </div>

//         {/* Content Details */}
//         <div className="p-6 space-y-4">
//           <div className="flex justify-between items-start gap-4">
//             <div>
//               <h2 className="text-xl font-black text-gray-900 tracking-tight">{listing.title[lang]}</h2>
//               <p className="text-gray-500 font-semibold text-xs mt-1">📍 {listing.city} - {listing.district}</p>
//             </div>
//             <div className="text-end">
//               <span className="text-xl font-black text-[#F4845F]">
//                 {listing.price} DH
//               </span>
//               <span className="block text-[11px] font-medium text-gray-400">/ {t.perMonth}</span>
//             </div>
//           </div>

//           <div className="border-t border-b border-gray-100 py-3 flex gap-6 text-xs text-gray-700 font-extrabold">
//             <span>🛏️ {listing.bedrooms} {t.rooms}</span>
//             <span className="text-emerald-600">
//               {listing.hasWifi ? `📶 ${t.wifiAvailable}` : `🚫 ${t.wifiNotAvailable}`}
//             </span>
//           </div>

//           <div>
//             <h3 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider mb-1.5">{t.description}</h3>
//             <p className="text-gray-600 leading-relaxed text-xs font-medium">{listing.description[lang]}</p>
//           </div>

//           {/* Owner Box */}
//           <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex justify-between items-center">
//             <div>
//               <p className="text-[11px] text-gray-400 font-bold uppercase">{t.owner}</p>
//               <p className="font-extrabold text-xs text-gray-900">{listing.ownerName}</p>
//             </div>
//             <button 
//               onClick={() => { onClose(); onContactOwner(); }} 
//               className="bg-[#4285F4] hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer"
//             >
//               {t.contactOwner}
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };
=======
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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-gray-100">
        
        {/* Image & Close Button Container */}
        <div className="relative h-64 w-full bg-gray-50">
          <img src={listing.imageUrl} alt={listing.title[lang]} className="w-full h-full object-cover" />
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center font-extrabold shadow-md transition"
          >
            ✕
          </button>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">{listing.title[lang]}</h2>
              <p className="text-gray-500 font-semibold text-xs mt-1">📍 {listing.city} - {listing.district}</p>
            </div>
            <span className="text-xl font-black text-[#F4845F]">
              {listing.price} DH <span className="text-xs font-normal text-gray-400">{t.perMonth || '/ month'}</span>
            </span>
          </div>

          <div className="border-t border-b border-gray-100 py-3 flex gap-6 text-xs text-gray-700 font-extrabold">
            <span>🛏️ {listing.bedrooms} {t.bedrooms || 'Bedrooms'}</span>
            <span className="text-emerald-600">{listing.hasWifi ? (t.wifiAvailable || 'WiFi Available') : (t.noWifi || 'No WiFi')}</span>
          </div>

          <div>
            <h3 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider mb-1.5">{t.description || 'Description'}</h3>
            <p className="text-gray-600 leading-relaxed text-xs font-medium">{listing.description[lang]}</p>
          </div>

          {/* Owner Box */}
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase">{t.owner || 'Owner'}</p>
              <p className="font-extrabold text-xs text-gray-900">{listing.ownerName}</p>
            </div>
            <button 
              onClick={() => { onClose(); onContactOwner(); }} 
              className="bg-[#4285F4] hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition"
            >
              {t.contactOwner || 'Contact Owner'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
>>>>>>> origin/main
