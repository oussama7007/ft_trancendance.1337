import React, { useState, useEffect } from 'react';
import { Language, Listing, ChatConversation } from './types';
import { Navbar } from './components/Navbar';
import { ListingModal } from './components/ListingModal';
import { AddModal } from './components/AddModal';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { CITIES_CULTURE } from './data/citiesCulture';

// ==========================================
// TRANSLATIONS DICTIONARY
// ==========================================
const translations = {
  ar: {
    dir: "rtl",
    logo: "🏠 iRent",
    home: "الرئيسية",
    listings: "عروض السكن",
    chat: "المحادثات 💬",
    profile: "البروفايل",
    addListing: "+ إضافة إعلان",
    searchPlaceholder: "جرب اكتب: الرباط، مراكش، كازا، طنجة، خريبكة...",
    searchLabel: "البحث بالمدينة أو الحي:",
    maxPriceLabel: "الحد الأقصى للثمن:",
    resultsFound: "نتائج البحث:",
    offersCount: "عروض",
    perMonth: "/شهر",
    bedrooms: "غرف",
    wifiAvailable: "📶 فايبر متوفر",
    noWifi: "🚫 بدون فايبر",
    description: "الوصف:",
    owner: "صاحب الإعلان:",
    contactOwner: "مراسلة المالك 💬",
    heroTitle: "قلب على دارك أو شريك السكن المناسب فالمغرب 🇲🇦",
    typeMessage: "اكتب رسالتك هنا...",
    send: "إرسال",
    online: "متصل الآن",
    selectChat: "إختر محادثة لبدء التراسل 💬",
    myProfile: "الملف الشخصي",
    myListings: "إعلاناتي المعلنة",
    student: "طالب / موظف شاب — 1337 / 42 School",
    city: "المدينة",
    createNewListing: "إضافة إعلان سكن جديد 🏠",
    titleLabel: "عنوان الإعلان:",
    districtLabel: "الحي:",
    priceLabel: "الثمن (DH / الشهر):",
    roomsLabel: "عدد الغرف:",
    hasWifiLabel: "متوفر على فايبر (WiFi)",
    imageUrlLabel: "رابط صورة الدار (URL):",
    publishBtn: "نشر الإعلان الآن 🚀",
    cancelBtn: "إلغاء",
    noResultsTitle: "مالقينا حتى إعلان بهاد المواصفات",
    noResultsSub: "جرب تزيد فـ السعر الأقصى أو كتب اسم مدينة أخرى فـ البحث.",
    resetSearch: "إعادة ضبط البحث",
    famousForLabel: "معروفة بـ:"
  },
  en: {
    dir: "ltr",
    logo: "🏠 iRent",
    home: "Home",
    listings: "Listings",
    chat: "Chat 💬",
    profile: "Profile",
    addListing: "+ Add Listing",
    searchPlaceholder: "Try searching: Rabat, Marrakech, Casa, Tangier...",
    searchLabel: "Search by city or district:",
    maxPriceLabel: "Max Price:",
    resultsFound: "Search Results:",
    offersCount: "offers",
    perMonth: "/month",
    bedrooms: "Bedrooms",
    wifiAvailable: "📶 Fiber Available",
    noWifi: "🚫 No Fiber",
    description: "Description:",
    owner: "Posted by:",
    contactOwner: "Contact Owner 💬",
    heroTitle: "Find your ideal home or roommate in Morocco 🇲🇦",
    typeMessage: "Type a message...",
    send: "Send",
    online: "Online",
    selectChat: "Select a conversation to start chatting 💬",
    myProfile: "My Profile",
    myListings: "My Posted Listings",
    student: "Student / Young Professional — 1337 / 42 School",
    city: "City",
    createNewListing: "Post a New Housing Offer 🏠",
    titleLabel: "Listing Title:",
    districtLabel: "District:",
    priceLabel: "Price (DH / month):",
    roomsLabel: "Bedrooms:",
    hasWifiLabel: "Has Fiber Wifi",
    imageUrlLabel: "House Image URL:",
    publishBtn: "Publish Listing 🚀",
    cancelBtn: "Cancel",
    noResultsTitle: "No listings found matching your search",
    noResultsSub: "Try increasing max price or searching for another city.",
    resetSearch: "Reset Filters",
    famousForLabel: "Famous for:"
  },
  fr: {
    dir: "ltr",
    logo: "🏠 iRent",
    home: "Accueil",
    listings: "Annonces",
    chat: "Messages 💬",
    profile: "Profil",
    addListing: "+ Ajouter une annonce",
    searchPlaceholder: "Essayez: Rabat, Marrakech, Casa, Tanger...",
    searchLabel: "Rechercher par ville ou quartier:",
    maxPriceLabel: "Prix Max:",
    resultsFound: "Résultats:",
    offersCount: "offres",
    perMonth: "/mois",
    bedrooms: "Chambres",
    wifiAvailable: "📶 Fibre disponible",
    noWifi: "🚫 Sans Fibre",
    description: "Description:",
    owner: "Annonceur:",
    contactOwner: "Contacter l'hôte 💬",
    heroTitle: "Trouvez votre logement ou colocataire au Maroc 🇲🇦",
    typeMessage: "Écrivez votre message...",
    send: "Envoyer",
    online: "En ligne",
    selectChat: "Choisissez une conversation pour discuter 💬",
    myProfile: "Mon Profil",
    myListings: "Mes Annonces Publiées",
    student: "Étudiant / Jeune Actif — 1337 / 42 School",
    city: "Ville",
    createNewListing: "Publier une nouvelle offre 🏠",
    titleLabel: "Titre de l'annonce:",
    districtLabel: "Quartier:",
    priceLabel: "Prix (DH / mois):",
    roomsLabel: "Nombre de chambres:",
    hasWifiLabel: "Wifi Fibre disponible",
    imageUrlLabel: "URL de la photo:",
    publishBtn: "Publier l'annonce 🚀",
    cancelBtn: "Annuler",
    noResultsTitle: "Aucun logement trouvé",
    noResultsSub: "Essayez d'augmenter le prix max ou de chercher une autre ville.",
    resetSearch: "Réinitialiser",
    famousForLabel: "Connue pour:"
  }
};

// ==========================================
// INITIAL SEED DATA
// ==========================================
const INITIAL_LISTINGS: Listing[] = [
  {
    id: 1,
    title: {
      ar: "شقة مفروشة قريبة من كلية العلوم والترامواي",
      en: "Furnished apartment near Science Faculty & Tramway",
      fr: "Appartement meublé près de la Faculté et Tramway"
    },
    city: "الرباط",
    cityEnFr: "rabat",
    district: "أكدال",
    districtEnFr: "agdal",
    price: 1800,
    bedrooms: 2,
    hasWifi: true,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    description: {
      ar: "شقة واسعة ومجهزة بالكامل للطلبة بلمسة أندلسية هادئة، قريبة من المكتبات والمطاعم.",
      en: "Spacious fully-equipped student apartment, close to tramway and amenities.",
      fr: "Grand appartement équipé pour étudiants, proche du tramway et des commerces."
    },
    ownerName: "أحمد بناني"
  },
  {
    id: 2,
    title: {
      ar: "غرفة خاوية فـ شقة مشتركة قريبة من المعاريف",
      en: "Private room in shared apartment near Maarif",
      fr: "Chambre privée en colocation près de Maârif"
    },
    city: "الدار البيضاء",
    cityEnFr: "casablanca casa",
    district: "المعاريف",
    districtEnFr: "maarif",
    price: 1200,
    bedrooms: 1,
    hasWifi: true,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    description: {
      ar: "نبحث عن شريك سكن هادئ ومنظم فـ شقة عصرية مشتركة فقلت الكازا.",
      en: "Looking for a quiet roommate to share a flat with two students.",
      fr: "Recherche un colocataire calme pour partager un logement avec deux étudiants."
    },
    ownerName: "ياسين العلمي"
  }
];

const INITIAL_CHATS: ChatConversation[] = [
  {
    id: 1,
    userName: "أحمد بناني (صاحب شقة أكدال)",
    avatar: "https://i.pravatar.cc/150?img=11",
    lastMessage: "السلام، واش باقي مهتم بالشقة؟",
    messages: [
      { sender: "owner", text: "السلام عليكم، تفضل كيف قدر نساعدك؟", time: "10:30 AM" },
      { sender: "me", text: "وعليكم السلام، واش الدار باقا متوفرة فـ أكدال؟", time: "10:32 AM" },
      { sender: "owner", text: "نعم باقا متوفرة، كاين إمكانية تجي تشوفها غدا.", time: "10:35 AM" }
    ]
  }
];

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  
  // States الخاصة بالمصادقة (Auth States جاهزة للباك إند)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: 'owner' | 'seeker' } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [chats, setChats] = useState<ChatConversation[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<number>(1);

  // المدينة الحالية للبانر المغربي
  const [currentCityKey, setCurrentCityKey] = useState<string>("الرباط");

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  // دالة ذكية للتعرف على المدينة من نص البحث
  const handleDetectCityFromSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    if (q.includes('مراكش') || q.includes('marrakech') || q.includes('kech')) {
      setCurrentCityKey('مراكش');
    } else if (q.includes('طنجة') || q.includes('tanger') || q.includes('tangier')) {
      setCurrentCityKey('طنجة');
    } else if (q.includes('بيضاء') || q.includes('casa') || q.includes('casablanca') || q.includes('كازا')) {
      setCurrentCityKey('الدار البيضاء');
    } else if (q.includes('خريبكة') || q.includes('khouribga') || q.includes('1337')) {
      setCurrentCityKey('خريبكة');
    } else if (q.includes('رباط') || q.includes('rabat') || q.includes('أكدال')) {
      setCurrentCityKey('الرباط');
    }
  };

  const handleAddListing = (newListing: Listing) => {
    setListings([newListing, ...listings]);
    setActivePage('listings');
  };

  const selectedCityInfo = CITIES_CULTURE[currentCityKey] || CITIES_CULTURE["الرباط"];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans border-t-4 border-amber-600">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        lang={lang}
        setLang={setLang}
        onOpenAddModal={() => {
          if (!isLoggedIn) {
            setIsAuthModalOpen(true);
          } else {
            setIsAddModalOpen(true);
          }
        }}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
          setActivePage('home');
        }}
        t={t}
      />

      {/* Moroccan Cultural Hero Banner */}
      {(activePage === 'listings' || activePage === 'home') && (
        <div className="max-w-7xl mx-auto w-full px-4 pt-4">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-b-4 border-amber-600 bg-gray-900 transition-all duration-500">
            <img 
              src={selectedCityInfo.bannerImg} 
              alt={selectedCityInfo.name[lang]} 
              className="w-full h-56 sm:h-64 object-cover opacity-60 transition-all duration-500 hover:scale-105" 
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${selectedCityInfo.badgeClass}`}>
                  {selectedCityInfo.icon} {selectedCityInfo.name[lang]}
                </span>
                <span className="bg-amber-500/20 backdrop-blur-md text-amber-200 border border-amber-400/40 text-[11px] px-2.5 py-1 rounded-full font-bold">
                  🇲🇦 {selectedCityInfo.architectureVibe[lang]}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-amber-100">{selectedCityInfo.tagline[lang]}</h1>
              <p className="text-xs text-gray-300 mt-1">
                ✨ <strong>{t.famousForLabel}</strong> {selectedCityInfo.famousFor[lang]}
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full p-4">
        {activePage === 'home' && (
          <HomePage
            lang={lang}
            listings={listings}
            setActivePage={setActivePage}
            onSelectListing={(item) => setSelectedListing(item)}
            onCityClick={(cityName) => {
              if (CITIES_CULTURE[cityName]) setCurrentCityKey(cityName);
            }}
            t={t}
          />
        )}

        {activePage === 'listings' && (
          <ListingsPage
            lang={lang}
            listings={listings}
            onSelectListing={(item) => setSelectedListing(item)}
            t={t}
            onCitySelect={(cityName) => {
              if (CITIES_CULTURE[cityName]) setCurrentCityKey(cityName);
            }}
            onSearchChange={handleDetectCityFromSearch}
          />
        )}

        {activePage === 'chat' && (
          <ChatPage
            lang={lang}
            chats={chats}
            setChats={setChats}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            t={t}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            lang={lang}
            listings={listings}
            onOpenAddModal={() => {
              if (!isLoggedIn) setIsAuthModalOpen(true);
              else setIsAddModalOpen(true);
            }}
            t={t}
          />
        )}
      </main>

      <ListingModal
        listing={selectedListing}
        lang={lang}
        onClose={() => setSelectedListing(null)}
        onContactOwner={() => setActivePage('chat')}
        t={t}
      />

      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        lang={lang}
        onAddListing={handleAddListing}
        t={t}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
        t={t}
        onAuthSuccess={(user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
          setActivePage('profile');
        }}
      />

      <footer className="bg-white border-t py-6 text-center text-xs text-gray-500">
        iRent © 2026 — Moroccan Student Housing Platform (ft_transcendence 1337 / 42)
      </footer>
    </div>
  );
};

export default App;