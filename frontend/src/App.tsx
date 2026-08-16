import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { Listing, ChatConversation, Language, User } from './types';
import { apiService } from './services/apiService';
<<<<<<< HEAD
import { translations } from './translations'; // 👈 استيراد ملف الترجمة المركزي
=======
>>>>>>> origin/main

function App() {
  const [activePage, setActivePage] = useState('home');
  const [lang, setLang] = useState<Language>('en');
  const [activeChatId, setActiveChatId] = useState<number>(1);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [listings, setListings] = useState<Listing[]>([]);
  const [chats, setChats] = useState<ChatConversation[]>([]);

  useEffect(() => {
    const initApp = async () => {
      try {
        const user = await apiService.getCurrentUser();
        if (user) setCurrentUser(user);

        const fetchedListings = await apiService.getListings();
        const fetchedChats = await apiService.getChats();

        setListings(fetchedListings);
        setChats(fetchedChats);
      } catch (error) {
        console.error("Error loading app data", error);
      } finally {
        setIsLoading(false);
      }
    };
    initApp();
  }, []);

  const handleLogin = async (credentials: any) => {
    const user = await apiService.login(credentials);
    setCurrentUser(user);
    setActivePage('home');
  };

  const handleRegister = async (userData: any) => {
    const user = await apiService.register(userData);
    setCurrentUser(user);
    setActivePage('home');
  };

  const handleLogout = async () => {
    await apiService.logout();
    setCurrentUser(null);
    setActivePage('home');
  };

<<<<<<< HEAD
  const handleAddNewListing = async (newListingData: any) => {
    try {
      const added = await apiService.createListing(newListingData);
      setListings(prev => [added, ...prev]);
=======
  // --- تعديل دالة الإضافة لتحديث الـ State العامة فوراً ---
  const handleAddNewListing = async (newListingData: any) => {
    try {
      // إذا كانت البيانات قادمة عبر FormData أو كائن عادي
      const added = await apiService.createListing(newListingData);
      setListings(prev => [added, ...prev]); // إضافة العقار الجديد في أول القائمة
>>>>>>> origin/main
      setActivePage('listings');
    } catch (error) {
      console.error("Error creating listing", error);
    }
  };

  const direction = lang === 'ar' ? 'rtl' : 'ltr';

<<<<<<< HEAD
  // 👈 جلب الترجمات أوتوماتيكياً حسب اللغة المختارة
  const t = translations[lang] || translations.en;
=======
  const t = {
    chat: lang === 'ar' ? 'المحادثات' : lang === 'fr' ? 'Discussions' : 'Chats',
    online: lang === 'ar' ? 'متصل' : lang === 'fr' ? 'En ligne' : 'Online',
    directContact: lang === 'ar' ? 'دردشة مباشرة' : lang === 'fr' ? 'Chat direct' : 'Direct Chat',
    typeMessage: lang === 'ar' ? 'اكتب رسالة...' : lang === 'fr' ? 'Écrivez un message...' : 'Type a message...',
    send: lang === 'ar' ? 'إرسال' : lang === 'fr' ? 'Envoyer' : 'Send',
    selectChat: lang === 'ar' ? 'اختر محادثة' : lang === 'fr' ? 'Sélectionnez une discussion' : 'Select a chat conversation',
    searchLabel: lang === 'ar' ? 'ابحث عن موقع' : lang === 'fr' ? 'Rechercher un lieu' : 'Search Location',
    searchPlaceholder: lang === 'ar' ? 'ابحث بالمدينة أو الحي...' : lang === 'fr' ? 'Rechercher par ville, quartier...' : 'Search by city, district...',
    maxPriceLabel: lang === 'ar' ? 'أقصى سعر' : lang === 'fr' ? 'Prix max' : 'Max Price',
    resultsFound: lang === 'ar' ? 'تم العثور على' : lang === 'fr' ? 'Trouvé' : 'Found',
    offersCount: lang === 'ar' ? 'عروض' : lang === 'fr' ? 'offres' : 'offers',
    noResultsTitle: lang === 'ar' ? 'لم يتم العثور على عروض' : lang === 'fr' ? 'Aucune annonce trouvée' : 'No Listings Found',
    noResultsSub: lang === 'ar' ? 'جرب البحث عن مدينة أخرى أو تغيير الفلاتر.' : lang === 'fr' ? 'Essayez de chercher une autre ville.' : 'Try searching for another city.',
    resetSearch: lang === 'ar' ? 'إعادة ضبط البحث' : lang === 'fr' ? 'Réinitialiser' : 'Reset Search',
    student: lang === 'ar' ? 'طالب مدرسة 1337 للبرمجة' : lang === 'fr' ? 'Étudiant 1337' : '1337 Coding School Student',
    addListing: lang === 'ar' ? 'إضافة إعلان' : lang === 'fr' ? 'Ajouter une annonce' : 'Add Listing',
    myListings: lang === 'ar' ? 'إعلاناتي' : lang === 'fr' ? 'Mes annonces' : 'My Listings',
    contactOwner: lang === 'ar' ? 'تواصل' : lang === 'fr' ? 'Contacter' : 'Contact'
  };
>>>>>>> origin/main

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#eef3f7]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F4845F]"></div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div dir={direction} className="w-full min-h-screen flex flex-col font-sans bg-[#eef3f7]">
=======
    <div dir={direction} className="w-screen h-screen flex flex-col font-sans overflow-hidden bg-[#eef3f7]">
>>>>>>> origin/main
      <Navbar 
        setActivePage={setActivePage} 
        lang={lang} 
        setLang={setLang} 
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

<<<<<<< HEAD
      <div className="flex-1 w-full relative flex flex-col">
=======
      <div className="flex-1 w-full relative flex flex-col overflow-y-auto">
>>>>>>> origin/main
        {activePage === 'home' && (
          <HomePage 
            setActivePage={setActivePage} 
            lang={lang} 
            listings={listings} 
            onSelectListing={() => setActivePage('listings')}
            currentUser={currentUser}
          />
        )}
        {activePage === 'listings' && (
          <ListingsPage 
            lang={lang} 
            listings={listings} 
            onSelectListing={() => setActivePage('chat')} 
            t={t} 
<<<<<<< HEAD
            onAddListing={handleAddNewListing} 
=======
            onAddListing={handleAddNewListing} // <--- هنا تم ربط دالة الإضافة لكي تظهر في الـ Cards والخريطة تلقائياً
>>>>>>> origin/main
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
            handleAddNewListing={handleAddNewListing}
            t={t} 
            currentUser={currentUser}
          />
        )}

        {activePage === 'signin' && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-black mb-2 text-gray-900 text-center">
<<<<<<< HEAD
                {t.signIn}
              </h2>
              <p className="text-xs text-gray-500 text-center mb-6">
                {t.welcomeBack}
=======
                {lang === 'ar' ? 'تسجيل الدخول' : lang === 'fr' ? 'Connexion' : 'Sign In'}
              </h2>
              <p className="text-xs text-gray-500 text-center mb-6">
                {lang === 'ar' ? 'مرحباً بك مجدداً، أدخل معلوماتك للولوج لحسابك' : lang === 'fr' ? 'Bon retour, connectez-vous à votre compte' : 'Welcome back, sign in to access your account'}
>>>>>>> origin/main
              </p>
              
              <form onSubmit={(e) => { e.preventDefault(); handleLogin({ email: 'test@irent.ma' }); }}>
                <input 
                  type="email" 
<<<<<<< HEAD
                  placeholder={t.email} 
=======
                  placeholder={lang === 'ar' ? 'البريد الإلكتروني' : lang === 'fr' ? 'Email' : 'Email address'} 
>>>>>>> origin/main
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium"
                  required
                />
                <input 
                  type="password" 
<<<<<<< HEAD
                  placeholder={t.password} 
=======
                  placeholder={lang === 'ar' ? 'كلمة المرور' : lang === 'fr' ? 'Mot de passe' : 'Password'} 
>>>>>>> origin/main
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-6 border border-gray-100 outline-none text-sm font-medium"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-[#F4845F] text-white py-3.5 rounded-2xl font-black text-sm shadow-lg hover:bg-[#e07553] transition cursor-pointer mb-4"
                >
<<<<<<< HEAD
                  {t.connectBtn}
=======
                  {lang === 'ar' ? 'دخول' : lang === 'fr' ? 'Se connecter' : 'Sign In'}
>>>>>>> origin/main
                </button>
              </form>

              <p className="text-center text-xs text-gray-600 font-medium">
<<<<<<< HEAD
                {t.noAccount}{' '}
                <button onClick={() => setActivePage('signup')} className="text-[#F4845F] font-black underline cursor-pointer">
                  {t.signUp}
=======
                {lang === 'ar' ? 'ليس لديك حساب؟' : lang === 'fr' ? "Vous n'avez pas de compte ?" : "Don't have an account?"}{' '}
                <button onClick={() => setActivePage('signup')} className="text-[#F4845F] font-black underline cursor-pointer">
                  {lang === 'ar' ? 'أنشئ حساباً' : lang === 'fr' ? 'Inscrivez-vous' : 'Sign Up'}
>>>>>>> origin/main
                </button>
              </p>
            </div>
          </div>
        )}

        {activePage === 'signup' && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-black mb-2 text-gray-900 text-center">
<<<<<<< HEAD
                {t.signUp}
              </h2>
              <p className="text-xs text-gray-500 text-center mb-6">
                {t.signUpSubtitle}
=======
                {lang === 'ar' ? 'إنشاء حساب جديد' : lang === 'fr' ? 'Inscription' : 'Sign Up'}
              </h2>
              <p className="text-xs text-gray-500 text-center mb-6">
                {lang === 'ar' ? 'انضم إلينا اليوم وابحث عن مسكنك أو رفيق سكنك' : lang === 'fr' ? 'Rejoignez-nous et trouvez votre logement' : 'Join us today and find your perfect place'}
>>>>>>> origin/main
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleRegister({ fullName: 'New User', email: 'new@irent.ma' }); }}>
                <input 
                  type="text" 
<<<<<<< HEAD
                  placeholder={t.fullName} 
=======
                  placeholder={lang === 'ar' ? 'الاسم الكامل' : lang === 'fr' ? 'Nom complet' : 'Full Name'} 
>>>>>>> origin/main
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium"
                  required
                />
                <input 
                  type="email" 
<<<<<<< HEAD
                  placeholder={t.email} 
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-0 text-sm font-medium"
=======
                  placeholder={lang === 'ar' ? 'البريد الإلكتروني' : lang === 'fr' ? 'Email' : 'Email address'} 
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium"
>>>>>>> origin/main
                  required
                />
                <input 
                  type="password" 
<<<<<<< HEAD
                  placeholder={t.createPassword} 
=======
                  placeholder={lang === 'ar' ? 'أنشئ كلمة مرور' : lang === 'fr' ? 'Créer un mot de passe' : 'Create password'} 
>>>>>>> origin/main
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-6 border border-gray-100 outline-none text-sm font-medium"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-black text-sm shadow-lg hover:bg-gray-800 transition cursor-pointer mb-4"
                >
<<<<<<< HEAD
                  {t.createAccountBtn}
=======
                  {lang === 'ar' ? 'تسجيل الحساب' : lang === 'fr' ? "S'inscrire" : 'Create Account'}
>>>>>>> origin/main
                </button>
              </form>

              <p className="text-center text-xs text-gray-600 font-medium">
<<<<<<< HEAD
                {t.haveAccount}{' '}
                <button onClick={() => setActivePage('signin')} className="text-[#F4845F] font-black underline cursor-pointer">
                  {t.signIn}
=======
                {lang === 'ar' ? 'لديك حساب بالفعل؟' : lang === 'fr' ? 'Vous avez déjà un compte ?' : 'Already have an account?'}{' '}
                <button onClick={() => setActivePage('signin')} className="text-[#F4845F] font-black underline cursor-pointer">
                  {lang === 'ar' ? 'سجل الدخول' : lang === 'fr' ? 'Connectez-vous' : 'Sign In'}
>>>>>>> origin/main
                </button>
              </p>
            </div>
          </div>
        )}

        <Footer lang={lang} />
      </div>
    </div>
  );
}

export default App;