import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { Listing, ChatConversation, Language, User } from './types';
import { apiService } from './services/apiService';
import { translations } from './translations'; // 👈 استيراد ملف الترجمة المركزي

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

  const handleAddNewListing = async (newListingData: any) => {
    try {
      const added = await apiService.createListing(newListingData);
      setListings(prev => [added, ...prev]);
      setActivePage('listings');
    } catch (error) {
      console.error("Error creating listing", error);
    }
  };

  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  // 👈 جلب الترجمات أوتوماتيكياً حسب اللغة المختارة
  const t = translations[lang] || translations.en;

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#eef3f7]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F4845F]"></div>
      </div>
    );
  }

  return (
    <div dir={direction} className="w-full min-h-screen flex flex-col font-sans bg-[#eef3f7]">
      <Navbar 
        setActivePage={setActivePage} 
        lang={lang} 
        setLang={setLang} 
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

      {/* هاد الـ main/div كياخد flex-1 باش يعمر المساحة الخاوية كاملة */}
      <main className="flex-1 w-full relative flex flex-col">
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
            onAddListing={handleAddNewListing} 
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
                {t.signIn}
              </h2>
              <p className="text-xs text-gray-500 text-center mb-6">
                {t.welcomeBack}
              </p>
              
              <form onSubmit={(e) => { e.preventDefault(); handleLogin({ email: 'test@irent.ma' }); }}>
                <input 
                  type="email" 
                  placeholder={t.email} 
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium"
                  required
                />
                <input 
                  type="password" 
                  placeholder={t.password} 
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-6 border border-gray-100 outline-none text-sm font-medium"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-[#F4845F] text-white py-3.5 rounded-2xl font-black text-sm shadow-lg hover:bg-[#e07553] transition cursor-pointer mb-4"
                >
                  {t.connectBtn}
                </button>
              </form>

              <p className="text-center text-xs text-gray-600 font-medium">
                {t.noAccount}{' '}
                <button onClick={() => setActivePage('signup')} className="text-[#F4845F] font-black underline cursor-pointer">
                  {t.signUp}
                </button>
              </p>
            </div>
          </div>
        )}

        {activePage === 'signup' && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-black mb-2 text-gray-900 text-center">
                {t.signUp}
              </h2>
              <p className="text-xs text-gray-500 text-center mb-6">
                {t.signUpSubtitle}
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleRegister({ fullName: 'New User', email: 'new@irent.ma' }); }}>
                <input 
                  type="text" 
                  placeholder={t.fullName} 
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium"
                  required
                />
                <input 
                  type="email" 
                  placeholder={t.email} 
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-0 text-sm font-medium"
                  required
                />
                <input 
                  type="password" 
                  placeholder={t.createPassword} 
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-6 border border-gray-100 outline-none text-sm font-medium"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-black text-sm shadow-lg hover:bg-gray-800 transition cursor-pointer mb-4"
                >
                  {t.createAccountBtn}
                </button>
              </form>

              <p className="text-center text-xs text-gray-600 font-medium">
                {t.haveAccount}{' '}
                <button onClick={() => setActivePage('signin')} className="text-[#F4845F] font-black underline cursor-pointer">
                  {t.signIn}
                </button>
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer lang={lang} />
    </div>
  );
}

export default App;