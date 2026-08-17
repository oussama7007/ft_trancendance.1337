import React, { useState, useEffect, useMemo } from 'react';
import { Listing, Language } from '../types';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { translations } from '../translations';
interface HomePageProps {
  setActivePage: (page: string) => void;
  lang: Language;
  listings: Listing[];
  onSelectListing: (item: Listing) => void;
  isLoggedIn: boolean;
  onSearch?: (query: string) => void; // 👈 اختياري: كيسمح لزر البحث يمرر الكلمة المكتوبة لصفحة ListingsPage عبر App
}

const CITIES = [
  { ar: 'الرباط', fr: 'Rabat', en: 'Rabat', lat: 34.0209, lng: -6.8416 },
  { ar: 'الدار البيضاء', fr: 'Casablanca', en: 'Casablanca', lat: 33.5883, lng: -7.6114 },
  { ar: 'مراكش', fr: 'Marrakech', en: 'Marrakech', lat: 31.6295, lng: -7.9811 },
  { ar: 'خريبكة', fr: 'Khouribga', en: 'Khouribga', lat: 32.8817, lng: -6.9063 },
  { ar: 'طنجة', fr: 'Tangier', en: 'Tangier', lat: 35.7595, lng: -5.8340 },
  { ar: 'فاس', fr: 'Fez', en: 'Fez', lat: 34.0181, lng: -5.0078 },
  { ar: 'أكادير', fr: 'Agadir', en: 'Agadir', lat: 30.4278, lng: -9.5981 },
  { ar: 'مكناس', fr: 'Meknes', en: 'Meknes', lat: 33.8938, lng: -5.5473 },
  { ar: 'وجدة', fr: 'Oujda', en: 'Oujda', lat: 34.6812, lng: -1.9036 },
  { ar: 'تطوان', fr: 'Tetouan', en: 'Tetouan', lat: 35.5889, lng: -5.3626 }
];

export const HomePage: React.FC<HomePageProps> = ({ setActivePage, lang, listings, onSelectListing, isLoggedIn, onSearch }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'roommate' | 'list'>('home');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('apartment');
  const [priceRange, setPriceRange] = useState('');

  const [isPropTypeOpen, setIsPropTypeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const [roommateLocation, setRoommateLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [roommateGender, setRoommateGender] = useState('');

  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [activeDetailItem, setActiveDetailItem] = useState<any>(null);

  const [cameraProps, setCameraProps] = useState({
    center: { lat: 32.8817, lng: -6.9063 },
    zoom: 17,
    tilt: 75,
    heading: 30
  });

  // عقارات تجريبية (Demo) كنعرضوها دائماً كـ "بذرة" محتوى، حتى قبل ما يكون عندنا عقارات حقيقية
  const demoMarkers = [
    { 
      id: 'demo-1', 
      city: { en: 'Rabat', fr: 'Rabat', ar: 'الرباط' }, 
      lat: 34.0209, 
      lng: -6.8416, 
      title: { en: 'Modern apartment in Rabat', fr: 'Appartement moderne à Rabat', ar: 'شقة عصرية في الرباط' }, 
      price: '2000 DH', 
      category: 'home', 
      type: 'apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600', 
      description: { en: 'Fully furnished apartment close to city center and transport.', fr: 'Appartement entièrement meublé près du centre-ville et des transports.', ar: 'شقة مفروشة بالكامل قريبة من وسط المدينة والمواصلات.' } 
    },
    { 
      id: 'demo-2', 
      city: { en: 'Casablanca', fr: 'Casablanca', ar: 'الدار البيضاء' }, 
      lat: 33.5883, 
      lng: -7.6114, 
      title: { en: 'Studio in Casablanca', fr: 'Studio à Casablanca', ar: 'ستوديو في الدار البيضاء' }, 
      price: '2500 DH', 
      category: 'home', 
      type: 'studio',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600', 
      description: { en: 'Nice studio near Maarif, fully equipped.', fr: 'Beau studio près de Maarif, entièrement équipé.', ar: 'ستوديو جميل قرب المعاريف، مجهز بالكامل.' } 
    },
    { 
      id: 'demo-3', 
      city: { en: 'Marrakech', fr: 'Marrakech', ar: 'مراكش' }, 
      lat: 31.6295, 
      lng: -7.9811, 
      title: { en: 'Riad for rent in Marrakech', fr: 'Riad à louer à Marrakech', ar: 'رياض للإيجار في مراكش' }, 
      price: '3000 DH', 
      category: 'home', 
      type: 'riad',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600', 
      description: { en: 'Wonderful traditional riad with authentic Moroccan design.', fr: 'Magnifique riad traditionnel au design marocain authentique.', ar: 'رياض تقليدي رائع بتصميم مغربي أصيل.' } 
    },
    { 
      id: 'demo-4', 
      city: { en: 'Khouribga', fr: 'Khouribga', ar: 'خريبكة' }, 
      lat: 32.8817, 
      lng: -6.9063, 
      title: { en: 'Spacious apartment in Khouribga', fr: 'Appartement spacieux à Khouribga', ar: 'شقة واسعة في خريبكة' }, 
      price: '1200 DH', 
      category: 'home', 
      type: 'apartment',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600', 
      description: { en: 'Clean and secure apartment in a strategic location in Khouribga.', fr: 'Appartement propre et sécurisé dans un emplacement stratégique à Khouribga.', ar: 'شقة نظيفة وآمنة في موقع استراتيجي بخريبكة.' } 
    },
    { 
      id: 'demo-5', 
      city: { en: 'Tangier', fr: 'Tanger', ar: 'طنجة' }, 
      lat: 35.7595, 
      lng: -5.8340, 
      title: { en: 'Sea view apartment in Tangier', fr: 'Appartement vue mer à Tanger', ar: 'شقة بإطلالة على البحر في طنجة' }, 
      price: '2800 DH', 
      category: 'home', 
      type: 'house',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', 
      description: { en: 'Apartment with a stunning direct view of the Mediterranean Sea.', fr: 'Appartement avec une vue directe imprenable sur la mer Méditerranée.', ar: 'شقة بإطلالة مباشرة مذهلة على البحر الأبيض المتوسط.' } 
    }
  ];

  // 👈 تحويل العقارات الحقيقية (اللي جايين من props.listings) لنفس شكل الماركر ديال الخريطة،
  // ونربطهم بإحداثيات المدينة عبر مصفوفة CITIES، لأن نوع Listing ما فيهش lat/lng مباشرة.
  const findCityCoords = (cityAr?: string, cityEnFr?: string) => {
    const match = CITIES.find(c =>
      (cityAr && (c.ar === cityAr || c.ar.includes(cityAr) || cityAr.includes(c.ar))) ||
      (cityEnFr && (c.fr.toLowerCase() === cityEnFr.toLowerCase() || c.en.toLowerCase() === cityEnFr.toLowerCase()))
    );
    return match || CITIES.find(c => c.en === 'Khouribga') || CITIES[0];
  };

  const mapMarkers = useMemo(() => {
    const jitter = () => (Math.random() - 0.5) * 0.01; // باش الماركرات ديال نفس المدينة ما يتراكبوش فوق بعضهم
    const realMarkers = (listings || []).map((item) => {
      const cityMatch = findCityCoords((item as any).city, (item as any).cityEnFr);
      const district = (item as any).district;
      const districtEnFr = (item as any).districtEnFr;
      return {
        id: `listing-${item.id}`,
        city: { ar: cityMatch.ar, fr: cityMatch.fr, en: cityMatch.en },
        lat: cityMatch.lat + jitter(),
        lng: cityMatch.lng + jitter(),
        title: item.title,
        price: `${item.price} DH`,
        category: 'home',
        type: 'apartment',
        image: (item as any).imageUrl,
        description: {
          ar: district ? `${district} - ${cityMatch.ar}` : cityMatch.ar,
          fr: districtEnFr ? `${districtEnFr} - ${cityMatch.fr}` : cityMatch.fr,
          en: districtEnFr ? `${districtEnFr} - ${cityMatch.en}` : cityMatch.en,
        }
      };
    });
    return [...realMarkers, ...demoMarkers];
  }, [listings]);

  const t = {
    ar: {
      ticker1: '🔥 ابحث عن منزلك المثالي أو شريك السكن فوراً مع iRent.ma 🚀',
      ticker2: '⭐ المنصة الأولى للإيجار والسكن المشترك في المغرب 🏠',
      title: 'ابحث عن منزلك أو شريك السكن المثالي بكل سهولة وسرعة.',
      subtitle: 'اكتشف منازل جديدة، ابحث عن شركاء سكن رائعين، أو اعرض مساحتك المتاحة بسهولة.',
      tabHome: 'أبحث عن منزل',
      tabRoommate: 'أبحث عن شريك سكن',
      tabList: 'لدي عقار للإيجار',
      locationPlaceholder: 'أدخل الموقع (مثال: الرباط، خريبكة)...',
      roommateLocationPlaceholder: 'موقع شريك السكن...',
      propType: 'نوع العقار',
      apt: 'شقة',
      house: 'منزل',
      studio: 'ستوديو',
      riad: 'رياض',
      priceRange: 'نطاق السعر',
      budgetPlaceholder: 'الحد الأقصى للميزانية (مثال: 1000 درهم)',
      genderPref: 'تفضيل الجنس',
      any: 'الكل',
      male: 'ذكور فقط',
      female: 'إناث فقط',
      searchBtn: 'بحث 🔍',
      featured: 'العقارات المميزة',
      available: 'متاح',
      detailsTitle: 'تفاصيل العقار',
      contactBtn: 'تواصل مع المعلن 💬',
      noRentals: 'لم يتم العثور على عقارات لهذا البحث.',
      appTitle: 'حمّل تطبيق iRent.ma - ابحث عن منزلك بذكاء',
      appDesc: 'ابحث عن المنازل، تواصل مع الملاك، وجد شركاء السكن بسهولة من هاتفك. متوفر قريباً على iOS و Android.',
      comingSoonBadge: "قريباً جداً في المغرب",
      alertMessage: "🚀 قريباً في المغرب!"
    },
    fr: {
      ticker1: '🔥 TROUVEZ VOTRE MAISON OU COLOCATAIRE IDÉAL INSTANTANÉMENT AVEC iRent.MA 🚀',
      ticker2: '⭐ LA PLATEFORME N°1 DE LOCATION ET COLOCATION AU MAROC 🏠',
      title: 'TROUVEZ VOTRE LOGEMENT OU COLOCATAIRE IDÉAL. RAPIDEMENT.',
      subtitle: 'Découvrez de nouveaux logements, trouvez des colocataires ou publiez votre espace.',
      tabHome: 'Je cherche un logement',
      tabRoommate: 'Je cherche un colocataire',
      tabList: "J'ai un bien à louer",
      locationPlaceholder: "Entrez l'emplacement (ex: Rabat, Khouribga)...",
      roommateLocationPlaceholder: 'Emplacement pour colocataire...',
      propType: 'Type de bien',
      apt: 'Appartement',
      house: 'Maison',
      studio: 'Studio',
      riad: 'Riad',
      priceRange: 'Fourchette de prix',
      budgetPlaceholder: 'Budget max (ex: 1000 DH)',
      genderPref: 'Préférence',
      any: 'Tous',
      male: 'Hommes uniquement',
      female: 'Femmes uniquement',
      searchBtn: 'RECHERCHER 🔍',
      featured: 'LOCATIONS EN VEDETTE',
      available: 'Disponibles',
      detailsTitle: 'Détails du bien',
      contactBtn: "Contacter l'annonceur 💬",
      noRentals: 'Aucune location trouvée pour cette recherche.',
      appTitle: "Téléchargez l'App iRent.ma - Trouvez Votre Logement Rapidement",
      appDesc: 'Trouvez des logements, contactez les propriétaires et gérez vos colocations facilement. Bientôt disponible sur iOS et Android.',
      comingSoonBadge: "Bientôt disponible au Maroc",
      alertMessage: "🚀 Bientôt au Maroc !"
    },
    en: {
      ticker1: '🔥 FIND YOUR DREAM HOME OR ROOMMATE INSTANTLY WITH iRENT.MA 🚀',
      ticker2: '⭐ THE #1 PLATFORM FOR RENTALS & COLOCATIONS IN MOROCCO 🏠',
      title: 'FIND YOUR PERFECT RENTAL OR ROOMMATE. FAST.',
      subtitle: 'Discover new homes, find great roommates, or easily list your available space.',
      tabHome: "I'm Looking for a Home",
      tabRoommate: "I'm Looking for a Roommate",
      tabList: 'I Have a Property to List',
      locationPlaceholder: 'Enter Location (e.g., Rabat, Khouribga)...',
      roommateLocationPlaceholder: 'Location for Roommate...',
      propType: 'Property Type',
      apt: 'Apartment',
      house: 'House',
      studio: 'Studio',
      riad: 'Riad',
      priceRange: 'Price Range',
      budgetPlaceholder: 'Max Budget (e.g. 1000 DH)',
      genderPref: 'Preference',
      any: 'Any',
      male: 'Male only',
      female: 'Female only',
      searchBtn: 'SEARCH 🔍',
      featured: 'FEATURED RENTALS',
      available: 'Available',
      detailsTitle: 'Property Details',
      contactBtn: 'Contact Advertiser 💬',
      noRentals: 'No rentals found for this search.',
      appTitle: 'Download the iRent.ma App - Find Your Home Smartly',
      appDesc: 'Find homes, connect with landlords, and manage roommates easily from your phone. Coming soon to iOS and Android.',
    comingSoonBadge: "Coming Soon to Morocco",
    alertMessage: "🚀 Coming soon to Morocco!"
    }
  };

  const currentLang = t[lang] || t.en;

  const detectNearestCity = (lat: number, lng: number) => {
    let nearest = CITIES[0];
    let minDistance = Infinity;

    CITIES.forEach(city => {
      const dist = Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = city;
      }
    });

    return nearest.fr;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const nearestFr = detectNearestCity(userLat, userLng);
          setSearchQuery(nearestFr);

          setCameraProps({
            center: { lat: userLat, lng: userLng },
            zoom: 17,
            tilt: 75,
            heading: 30
          });
        },
        (error) => {
          setSearchQuery('Khouribga');
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    const foundCity = CITIES.find(c => 
      c.ar.toLowerCase().includes(val.toLowerCase()) || 
      c.fr.toLowerCase().includes(val.toLowerCase()) ||
      c.en.toLowerCase().includes(val.toLowerCase())
    );

    if (foundCity && val.trim() !== '') {
      setCameraProps(prev => ({
        ...prev,
        center: { lat: foundCity.lat, lng: foundCity.lng },
        zoom: 17,
        tilt: 75,
        heading: 45
      }));
    }
  };

  const handleSearchClick = () => {
    if (activeTab === 'roommate') {
      // ⚠️ ملاحظة: المشروع ما فيهش بعد نوع بيانات خاص بـ "شركاء السكن" (roommate profiles) ولا صفحة مخصصة ليهم،
      // لذلك كنستعملو نفس صفحة العقارات مؤقتاً كحل بديل. خص تبنى صفحة/نموذج بيانات مخصص باش الفلترة تولي حقيقية.
      onSearch?.(roommateLocation || budget);
    } else {
      onSearch?.(searchQuery);
    }
    setActivePage('listings');
  };

  const filteredMarkers = mapMarkers.filter(m => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = q === '' || 
                          m.city.en.toLowerCase().includes(q) || 
                          m.city.fr.toLowerCase().includes(q) || 
                          m.city.ar.toLowerCase().includes(q) ||
                          m.title[lang === 'ar' || lang === 'fr' ? lang : 'en']?.toLowerCase().includes(q);

    const matchesType = propertyType === '' || m.type === propertyType;
    
    let matchesPrice = true;
    if (priceRange === '0-1500') {
      const numericPrice = parseInt(m.price);
      matchesPrice = numericPrice <= 1500;
    } else if (priceRange === '1500-3000') {
      const numericPrice = parseInt(m.price);
      matchesPrice = numericPrice > 1500 && numericPrice <= 3000;
    } else if (priceRange === '3000+') {
      const numericPrice = parseInt(m.price);
      matchesPrice = numericPrice > 3000;
    }

    const matchesTab = activeTab === 'list' ? true : m.category === activeTab;
    return matchesSearch && matchesType && matchesPrice && matchesTab;
  });

  return (
    <div className={`w-screen min-h-screen flex flex-col font-sans overflow-x-hidden bg-[#eef3f7] relative ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      <style>{`
        @keyframes tickerMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: tickerMove 20s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }

        @keyframes bounceMarker {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .marker-3d-bounce {
          animation: bounceMarker 1.2s ease-in-out infinite;
        }
      `}</style>

      {/* الـ Ticker */}
      <div className="w-full bg-gradient-to-r from-orange-600 via-[#F4845F] to-orange-500 text-white py-2.5 overflow-hidden shrink-0 shadow-md z-30">
        <div className="overflow-hidden w-full whitespace-nowrap">
          <div className="animate-ticker items-center">
            <div className="flex items-center space-x-12 px-6">
              <span className="text-xs md:text-sm font-black tracking-wider flex items-center gap-3 drop-shadow-sm">
                {currentLang.ticker1}
              </span>
              <span className="text-xs md:text-sm font-black tracking-wider flex items-center gap-3 drop-shadow-sm">
                {currentLang.ticker2}
              </span>
            </div>
            <div className="flex items-center space-x-12 px-6">
              <span className="text-xs md:text-sm font-black tracking-wider flex items-center gap-3 drop-shadow-sm">
                {currentLang.ticker1}
              </span>
              <span className="text-xs md:text-sm font-black tracking-wider flex items-center gap-3 drop-shadow-sm">
                {currentLang.ticker2}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* تفاصيل العقار */}
      {activeDetailItem && (
        <div 
          onClick={() => setActiveDetailItem(null)}
          className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-xs"
        />
      )}

      <div className={`fixed top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between ${
        activeDetailItem ? 'translate-x-0' : (lang === 'ar' ? '-translate-x-full' : 'translate-x-full')
      }`}>
        {activeDetailItem && (
          <>
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-black text-gray-900">{currentLang.detailsTitle}</h2>
                <button 
                  onClick={() => setActiveDetailItem(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer transition"
                >
                  ✕
                </button>
              </div>

              <div className="h-60 rounded-2xl overflow-hidden mb-4 shadow-inner bg-gray-100">
                <img src={activeDetailItem.image} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-black text-gray-900">
                  {activeDetailItem.title[lang === 'ar' || lang === 'fr' ? lang : 'en']}
                </h3>
                <span className="bg-[#F4845F]/10 text-[#F4845F] font-black px-3 py-1 rounded-xl text-xs">
                  {activeDetailItem.price}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-bold mb-3">
                📍 {activeDetailItem.city[lang === 'ar' || lang === 'fr' ? lang : 'en']}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {activeDetailItem.description[lang === 'ar' || lang === 'fr' ? lang : 'en']}
              </p>
            </div>

            <button 
              onClick={() => {
                onSelectListing(activeDetailItem);
                setActiveDetailItem(null);
              }}
              className="w-full bg-[#F4845F] text-white py-3 rounded-2xl font-black text-xs hover:bg-[#e07553] transition cursor-pointer shadow-lg mt-4"
            >
              {currentLang.contactBtn}
            </button>
          </>
        )}
      </div>

      {/* المحتوى الرئيسي */}
      <div className="w-full flex-1 flex flex-col px-4 md:px-8 pb-8 pt-6 md:pt-8 max-w-[1400px] mx-auto">
        
        {/* 1. العنوان الرئيسي */}
        <div className="text-center pb-4 px-2 shrink-0 max-w-2xl mx-auto">
          <h1 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">
            {currentLang.title.split('.')[0]}. <span className="text-[#F4845F]">FAST.</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1.5">
            {currentLang.subtitle}
          </p>
        </div>

        {/* 2. الـ Inputs والـ Tabs */}
        <div className="w-full max-w-[950px] mx-auto z-30 shrink-0 mb-4">
          
          <div className="flex gap-1.5 px-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 ${
                activeTab === 'home' ? 'bg-white text-gray-900 shadow-sm border-t border-x border-gray-200/60' : 'bg-white/40 text-gray-500 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              🏠 {currentLang.tabHome}
            </button>
            <button
              onClick={() => setActiveTab('roommate')}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 ${
                activeTab === 'roommate' ? 'bg-white text-gray-900 shadow-sm border-t border-x border-gray-200/60' : 'bg-white/40 text-gray-500 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              👥 {currentLang.tabRoommate}
            </button>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  setActivePage('signin');
                } else {
                  setActivePage('profile');
                }
              }}
              className="px-4 py-2.5 rounded-t-xl text-xs font-black bg-white/40 text-gray-500 hover:text-gray-900 hover:bg-white/60 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              🔑 {currentLang.tabList}
            </button>
          </div>

          <div className="bg-white p-3.5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-3 border border-gray-200/65 relative">
            
            {activeTab === 'home' && (
              <>
                <div className="flex-1 w-full bg-gray-50 hover:bg-gray-100/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md px-4 py-3 rounded-xl border border-gray-200/60 flex items-center gap-2">
                  <span className="text-gray-400 text-sm">📍</span>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={currentLang.locationPlaceholder}
                    className="w-full bg-transparent outline-none text-xs font-bold text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div className="flex-1 w-full relative">
                  <div 
                    onClick={() => { setIsPropTypeOpen(!isPropTypeOpen); setIsPriceOpen(false); }}
                    className="w-full bg-gray-50 hover:bg-gray-100/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md px-4 py-3 rounded-xl border border-gray-200/60 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">🏠</span>
                      <span className="text-xs font-bold text-gray-700">
                        {propertyType === 'apartment' ? currentLang.apt :
                         propertyType === 'house' ? currentLang.house :
                         propertyType === 'studio' ? currentLang.studio :
                         propertyType === 'riad' ? currentLang.riad : currentLang.propType}
                      </span>
                    </div>
                    <span className={`text-[10px] text-gray-400 transition-transform duration-300 ${isPropTypeOpen ? 'rotate-180' : ''}`}>▼</span>
                  </div>

                  {isPropTypeOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div 
                        onClick={() => { setPropertyType('apartment'); setIsPropTypeOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        🏢 {currentLang.apt}
                      </div>
                      <div 
                        onClick={() => { setPropertyType('house'); setIsPropTypeOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        🏡 {currentLang.house}
                      </div>
                      <div 
                        onClick={() => { setPropertyType('studio'); setIsPropTypeOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        🛋️ {currentLang.studio}
                      </div>
                      <div 
                        onClick={() => { setPropertyType('riad'); setIsPropTypeOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        🏛️ {currentLang.riad}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-[180px] relative">
                  <div 
                    onClick={() => { setIsPriceOpen(!isPriceOpen); setIsPropTypeOpen(false); }}
                    className="w-full bg-gray-50 hover:bg-gray-100/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md px-4 py-3 rounded-xl border border-gray-200/60 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-gray-400 text-sm shrink-0">💰</span>
                      <span className="text-xs font-bold text-gray-700 truncate">
                        {priceRange || currentLang.priceRange}
                      </span>
                    </div>
                    <span className={`text-[10px] text-gray-400 transition-transform duration-300 shrink-0 ${isPriceOpen ? 'rotate-180' : ''}`}>▼</span>
                  </div>

                  {isPriceOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div 
                        onClick={() => { setPriceRange(''); setIsPriceOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition"
                      >
                        {currentLang.priceRange}
                      </div>
                      <div 
                        onClick={() => { setPriceRange('0-1500'); setIsPriceOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        0 - 1500 DH
                      </div>
                      <div 
                        onClick={() => { setPriceRange('1500-3000'); setIsPriceOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        1500 - 3000 DH
                      </div>
                      <div 
                        onClick={() => { setPriceRange('3000+'); setIsPriceOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        3000+ DH
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'roommate' && (
              <>
                <div className="flex-1 w-full bg-gray-50 hover:bg-gray-100/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md px-4 py-3 rounded-xl border border-gray-200/60 flex items-center gap-2">
                  <span className="text-gray-400 text-sm">📍</span>
                  <input 
                    type="text" 
                    value={roommateLocation}
                    onChange={(e) => setRoommateLocation(e.target.value)}
                    placeholder={currentLang.roommateLocationPlaceholder}
                    className="w-full bg-transparent outline-none text-xs font-bold text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div className="flex-1 w-full bg-gray-50 hover:bg-gray-100/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md px-4 py-3 rounded-xl border border-gray-200/60 flex items-center gap-2">
                  <span className="text-gray-400 text-sm">💵</span>
                  <input 
                    type="text" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder={currentLang.budgetPlaceholder}
                    className="w-full bg-transparent outline-none text-xs font-bold text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div className="w-full md:w-[180px] relative">
                  <div 
                    onClick={() => { setIsGenderOpen(!isGenderOpen); }}
                    className="w-full bg-gray-50 hover:bg-gray-100/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md px-4 py-3 rounded-xl border border-gray-200/60 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">👤</span>
                      <span className="text-xs font-bold text-gray-700 truncate">
                        {roommateGender === 'any' ? currentLang.any :
                         roommateGender === 'male' ? currentLang.male :
                         roommateGender === 'female' ? currentLang.female : currentLang.genderPref}
                      </span>
                    </div>
                    <span className={`text-[10px] text-gray-400 transition-transform duration-300 ${isGenderOpen ? 'rotate-180' : ''}`}>▼</span>
                  </div>

                  {isGenderOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div 
                        onClick={() => { setRoommateGender(''); setIsGenderOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition"
                      >
                        {currentLang.genderPref}
                      </div>
                      <div 
                        onClick={() => { setRoommateGender('any'); setIsGenderOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        🌐 {currentLang.any}
                      </div>
                      <div 
                        onClick={() => { setRoommateGender('male'); setIsGenderOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        👨 {currentLang.male}
                      </div>
                      <div 
                        onClick={() => { setRoommateGender('female'); setIsGenderOpen(false); }}
                        className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F4845F] cursor-pointer transition border-t border-gray-50"
                      >
                        👩 {currentLang.female}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              onClick={handleSearchClick}
              className="w-full md:w-auto bg-[#F4845F] text-white px-7 py-3 rounded-xl font-black text-xs hover:bg-[#e07553] transition cursor-pointer shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              {currentLang.searchBtn}
            </button>
          </div>
        </div>

        {/* الخريطة */}
        <div className="w-full max-w-[1350px] mx-auto h-[480px] rounded-3xl border-2 border-[#F4845F]/40 shadow-xl overflow-hidden bg-[#111] relative mb-12">
          <APIProvider apiKey={'AIzaSyB2TfMELF7ntXHr0OZl6iSZqJSnlgyD0tw'}>
            <Map 
              center={cameraProps.center} 
              zoom={cameraProps.zoom} 
              tilt={cameraProps.tilt}
              heading={cameraProps.heading}
              mapId={'bf51a910020fa25a'}
              gestureHandling={'greedy'} // no need use ctrl
              renderingType={'VECTOR'}
              onCameraChanged={(ev) => setCameraProps(ev.detail)}
              style={{ width: '100%', height: '100%' }}
            >
              {filteredMarkers.map((m) => (
                <AdvancedMarker 
                  key={m.id} 
                  position={{ lat: m.lat, lng: m.lng }} 
                  onClick={() => {
                    setSelectedMarker(m);
                    setActiveDetailItem(m);
                  }}
                >
                  <div className="marker-3d-bounce group cursor-pointer flex flex-col items-center py-2">
                    <div className="bg-red-600 text-white font-black text-xs md:text-sm px-3.5 py-1.5 rounded-full shadow-2xl border-2 border-white mb-1.5 whitespace-nowrap transition-all duration-300 transform scale-100 group-hover:scale-135 group-hover:-translate-y-2 origin-bottom">
                      {m.price}
                    </div>
                    <div className="bg-white p-2.5 rounded-2xl shadow-2xl border-2 border-red-200 flex items-center justify-center transition-all duration-300 group-hover:scale-130">
                      🏠
                    </div>
                  </div>
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>
        </div>

        {/* 3. العقارات المميزة (Featured Rentals) */}
        <div className="w-full max-w-[1350px] mx-auto mb-16">
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-sm md:text-base font-black text-gray-900 tracking-tight flex items-center gap-2">
              🔥 {currentLang.featured}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mapMarkers.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveDetailItem(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 flex flex-col group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#F4845F] font-black text-xs px-3 py-1.5 rounded-xl shadow-md">
                    {item.price}
                  </span>
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xs md:text-sm font-black text-gray-900 mb-1">
                      {item.title[lang === 'ar' || lang === 'fr' ? lang : 'en']}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-bold mb-3">
                      📍 {item.city[lang === 'ar' || lang === 'fr' ? lang : 'en']}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {currentLang.available}
                    </span>
                    <span className="text-xs font-black text-[#F4845F] group-hover:translate-x-1 transition">
                      {lang === 'ar' ? 'التفاصيل ←' : lang === 'fr' ? 'Détails →' : 'Details →'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. سيكشن تحميل التطبيق (Coming Soon / App Download) - بارزة وكبيرة ديزين ناضي */}
        <div className="w-full max-w-[1350px] mx-auto mb-12 bg-gradient-to-br from-orange-600 via-[#F4845F] to-orange-700 rounded-[35px] p-8 md:p-14 shadow-2xl relative overflow-hidden text-white shrink-0">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-40 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="flex-1 flex flex-col items-start text-start">
        <div 
          onClick={() => alert(t[lang]?.alertMessage || t.ar.alertMessage)}
          className="bg-black/100 hover:bg-black/50 text-white font-black px-9 py-5 rounded-full text-sm md:text-base mb-8 shadow-lg hover:shadow-xl flex items-center gap-3 border border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md animate"
        >
          {/* <span className="w-3 h-3 rounded-full bg-white animate-ping"></span> */}
          <span>{t[lang]?.comingSoonBadge || t.ar.comingSoonBadge}</span>
        </div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-snug mb-4">
                {currentLang.appTitle}
              </h2>

              <p className="text-xs md:text-sm text-orange-100 font-medium leading-relaxed mb-8 max-w-2xl">
                {currentLang.appDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4">
          <a 
              href="#appstore" 
              onClick={(e) => { e.preventDefault(); alert('🚀 Application coming soon to App Store!'); }} 
              className="bg-black hover:bg-zinc-900 text-white px-5 py-2.5 rounded-xl flex items-center gap-3 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-zinc-800"
            >
              <span className="text-3xl leading-none"></span>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">Download on the</span>
                <span className="text-xs md:text-sm font-bold tracking-wide -mt-0.5">App Store</span>
              </div>
            </a>

          <a 
              href="#googleplay" 
              onClick={(e) => { e.preventDefault(); alert('🚀 Application coming soon to Google Play!'); }} 
              className="bg-black hover:bg-zinc-900 text-white px-5 py-2.5 rounded-xl flex items-center gap-3 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-zinc-800"
            >
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 512 512" fill="currentColor">
                <path fill="#EA4335" d="M325.3 234.3L104.2 13c-7.2-4.3-16.1-4.3-23.3 0-7.2 4.3-11.6 12-11.6 20.4v445.2c0 8.4 4.4 16.1 11.6 20.4 3.6 2.1 7.7 3.2 11.7 3.2 4.1 0 8.2-1.1 11.7-3.2l221.1-221.3c6.3-6.4 6.3-16.8 0-23.2z"/>
                <path fill="#FBBC04" d="M381.1 290.1l-55.8-55.8L104.2 455.7c5.9 6 15.6 6.5 22.1 1.2l254.8-166.8z"/>
                <path fill="#4285F4" d="M381.1 221.9L126.3 55.1c-6.5-5.3-16.2-4.8-22.1 1.2l221.1 221.4 55.8-55.8z"/>
                <path fill="#34A853" d="M325.3 277.7l55.8 55.8 74.5-48.8c9.6-6.3 12.2-19.3 5.9-28.9-2.1-3.2-5.2-5.7-8.8-7.1l-67.4-38-59.2 59z"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">GET IT ON</span>
                <span className="text-xs md:text-sm font-bold tracking-wide -mt-0.5">Google Play</span>
              </div>
            </a>
              </div>
            </div>

            {/* معاينة الهاتف للمحاكاة */}
            <div className="relative w-full lg:w-[360px] flex justify-center items-center">
              <div className="w-[280px] h-[540px] bg-gray-900 rounded-[45px] p-3.5 shadow-2xl border-4 border-white/30 relative flex flex-col justify-between overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-gray-900 rounded-b-2xl z-20"></div>
                
                <div className="w-full h-full bg-white rounded-[35px] overflow-hidden flex flex-col p-4 relative text-gray-900">
                  <div className="flex justify-between items-center mt-3 mb-4">
                    <span className="font-black text-xs text-[#F4845F]">iRent.ma</span>
                    <span className="text-xs">🇲🇦</span>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded-2xl mb-4">
                    <p className="text-[11px] font-black text-gray-900">Find your dream home in seconds</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">Rabat, Casablanca, Khouribga...</p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-8 bg-gray-100 rounded-xl w-full"></div>
                    <div className="h-8 bg-gray-100 rounded-xl w-full"></div>
                    <div className="h-10 bg-[#F4845F] rounded-xl w-full mt-4 flex items-center justify-center text-white text-xs font-black">
                      Search Now 🔍
                    </div>
                  </div>

                  <div className="mt-auto bg-gray-50 p-2.5 rounded-2xl flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="w-20 h-2 bg-gray-200 rounded mb-1"></div>
                      <div className="w-12 h-1.5 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};