import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Listing, Language } from '../types';
import L from 'leaflet';

// حل مشكلة أيقونات Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.parseOptions = { icon: DefaultIcon };

interface HomeMapProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  lang: Language;
}

export const HomeMap: React.FC<HomeMapProps> = ({ listings, onSelectListing, lang }) => {
  // مركز المغرب الافتراضي (باش يبان المغرب كامل)
  const moroccoCenter: [number, number] = [31.7917, -7.0926];

  return (
    <div className="h-96 w-full rounded-3xl overflow-hidden shadow-xl border-2 border-amber-200 z-0 relative">
      <MapContainer center={moroccoCenter} zoom={6} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {listings.map((item) => {
          // إحداثيات افتراضية حسب المدينة إيلا ما كانوش مدخلين بالدقة
          let lat = item.lat || 33.9716;
          let lng = item.lng || -6.8498;
          if (item.city.includes('بيضاء') || item.city.includes('casa')) { lat = 33.5731; lng = -7.5898; }
          if (item.city.includes('خريبكة')) { lat = 32.8811; lng = -6.9063; }
          if (item.city.includes('مراكش')) { lat = 31.6295; lng = -7.9811; }
          if (item.city.includes('طنجة')) { lat = 35.7595; lng = -5.8340; }

          return (
            <Marker key={item.id} position={[lat, lng]}>
              <Popup>
                <div className="p-1 space-y-2 text-center max-w-[160px]">
                  <img src={item.imageUrl} alt="" className="w-full h-20 object-cover rounded-xl" />
                  <p className="font-bold text-xs text-gray-800 line-clamp-1">{item.title[lang]}</p>
                  <span className="bg-amber-600 text-white text-[10px] font-black px-2 py-1 rounded-full block">
                    {item.price} DH / شهر
                  </span>
                  <button 
                    onClick={() => onSelectListing(item)}
                    className="w-full bg-gray-900 text-white text-[10px] py-1 rounded-lg font-bold hover:bg-black"
                  >
                    {lang === 'ar' ? 'التفاصيل ←' : 'View →'}
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};