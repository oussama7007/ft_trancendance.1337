import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { Listing, ChatConversation, Language, User } from './types';
import { apiService } from './services/apiService';
import { translations } from './translations';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [lang, setLang] = useState<Language>('en');
  const [activeChatId, setActiveChatId] = useState<number>(1);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [listings, setListings] = useState<Listing[]>([]);
  const [chats, setChats] = useState<ChatConversation[]>([]);

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    const initApp = async () => {
      try {
        const user = await apiService.getCurrentUser();

        if (user) {
          setCurrentUser(user);
        }

        const fetchedListings = await apiService.getListings();
        const fetchedChats = await apiService.getChats();

        setListings(fetchedListings);
        setChats(fetchedChats);
      } catch (error) {
        console.error('Error loading app data', error);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await apiService.login(credentials);

      setCurrentUser(user);
      setActivePage('listings');

      // Clear login form
      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async (userData: any) => {
    try {
      const user = await apiService.register(userData);

      setCurrentUser(user);
      setActivePage('listings');
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    try {
      await apiService.logout();

      setCurrentUser(null);
      setActivePage('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // =========================
  // CREATE LISTING
  // =========================
  const handleAddNewListing = async (newListingData: any) => {
    try {
      const added = await apiService.createListing(newListingData);

      setListings(prev => [added, ...prev]);
      setActivePage('listings');
    } catch (error) {
      console.error('Error creating listing', error);
    }
  };

  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  // Translation
  const t = translations[lang] || translations.en;

  // =========================
  // LOADING SCREEN
  // =========================
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#eef3f7]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F4845F]"></div>
      </div>
    );
  }

  return (
    <div
      dir={direction}
      className="w-full min-h-screen flex flex-col font-sans bg-[#eef3f7]"
    >
      {/* =========================
          NAVBAR
      ========================= */}
      <Navbar
        setActivePage={setActivePage}
        lang={lang}
        setLang={setLang}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

      {/* =========================
          MAIN
      ========================= */}
      <main className="flex-1 w-full relative flex flex-col">

        {/* =========================
            HOME
        ========================= */}
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            lang={lang}
            listings={listings}
            onSelectListing={() => setActivePage('listings')}
            currentUser={currentUser}
          />
        )}

        {/* =========================
            LISTINGS
        ========================= */}
        {activePage === 'listings' && (
          <ListingsPage
            lang={lang}
            listings={listings}
            onSelectListing={() => setActivePage('chat')}
            t={t}
            onAddListing={handleAddNewListing}
            currentUser={currentUser}
            onNavigate={setActivePage}
          />
        )}

        {/* =========================
            CHAT
        ========================= */}
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

        {/* =========================
            PROFILE
        ========================= */}
        {activePage === 'profile' && (
          <ProfilePage
            lang={lang}
            listings={listings}
            handleAddNewListing={handleAddNewListing}
            t={t}
            currentUser={currentUser}
          />
        )}

        {/* =========================
            SIGN IN
        ========================= */}
        {activePage === 'signin' && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

              <h2 className="text-2xl font-black mb-2 text-gray-900 text-center">
                {t.signIn}
              </h2>

              <p className="text-xs text-gray-500 text-center mb-6">
                {t.welcomeBack}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  handleLogin({
                    email: loginEmail,
                    password: loginPassword
                  });
                }}
              >

                {/* EMAIL */}
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder={t.email}
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium"
                  required
                />

                {/* PASSWORD */}
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder={t.password}
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-6 border border-gray-100 outline-none text-sm font-medium"
                  required
                />

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-[#F4845F] text-white py-3.5 rounded-2xl font-black text-sm shadow-lg hover:bg-[#e07553] transition cursor-pointer mb-4"
                >
                  {t.connectBtn}
                </button>

              </form>

              <p className="text-center text-xs text-gray-600 font-medium">
                {t.noAccount}{' '}

                <button
                  onClick={() => setActivePage('signup')}
                  className="text-[#F4845F] font-black underline cursor-pointer"
                >
                  {t.signUp}
                </button>
              </p>

            </div>
          </div>
        )}

        {/* =========================
            SIGN UP
        ========================= */}
        {activePage === 'signup' && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

              <h2 className="text-2xl font-black mb-2 text-gray-900 text-center">
                {t.signUp}
              </h2>

              <p className="text-xs text-gray-500 text-center mb-6">
                {t.signUpSubtitle}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  handleRegister({
                    fullName: 'New User',
                    email: 'new@irent.ma'
                  });
                }}
              >

                {/* FULL NAME */}
                <input
                  type="text"
                  placeholder={t.fullName}
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium"
                  required
                />

                {/* EMAIL */}
                <input
                  type="email"
                  placeholder={t.email}
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium"
                  required
                />

                {/* PASSWORD */}
                <input
                  type="password"
                  placeholder={t.createPassword}
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-6 border border-gray-100 outline-none text-sm font-medium"
                  required
                />

                {/* SIGN UP BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-black text-sm shadow-lg hover:bg-gray-800 transition cursor-pointer mb-4"
                >
                  {t.createAccountBtn}
                </button>

              </form>

              <p className="text-center text-xs text-gray-600 font-medium">
                {t.haveAccount}{' '}

                <button
                  onClick={() => setActivePage('signin')}
                  className="text-[#F4845F] font-black underline cursor-pointer"
                >
                  {t.signIn}
                </button>
              </p>

            </div>
          </div>
        )}

      </main>

      {/* =========================
          FOOTER
      ========================= */}
      <Footer lang={lang} />

    </div>
  );
}

export default App;