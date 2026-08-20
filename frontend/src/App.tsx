import React, { useState, useEffect } from 'react';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { DetailsPage } from './pages/DetailsPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';

import {
  Listing,
  ChatConversation,
  Language,
  User,
} from './types';

import { apiService } from './services/apiService';
import { translations } from './translations';

function App() {

  // =====================================================
  // APP STATE
  // =====================================================

  const [activePage, setActivePage] =
    useState('home');

  const [lang, setLang] =
    useState<Language>('en');

  const [activeChatId, setActiveChatId] =
    useState<number>(1);


  // =====================================================
  // SELECTED LISTING
  // العقار اللي اختار المستخدم
  // =====================================================

  const [selectedListing, setSelectedListing] =
    useState<Listing | null>(null);


  // =====================================================
  // AUTH
  // =====================================================

  const [currentUser, setCurrentUser] =
    useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);


  // =====================================================
  // DATA
  // =====================================================

  const [listings, setListings] =
    useState<Listing[]>([]);

  const [searchQuery, setSearchQuery] = useState('');

  const [chats, setChats] =
    useState<ChatConversation[]>([]);


  // =====================================================
  // LOGIN
  // =====================================================

  const [loginEmail, setLoginEmail] =
    useState('');

  const [loginPassword, setLoginPassword] =
    useState('');


  // =====================================================
  // REGISTER
  // =====================================================

  const [registerFullName, setRegisterFullName] =
    useState('');

  const [registerEmail, setRegisterEmail] =
    useState('');

  const [registerPassword, setRegisterPassword] =
    useState('');


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    const initApp = async () => {

      try {

        // Current user

        const user =
          await apiService.getCurrentUser();

        if (user) {
          setCurrentUser(user);
        }


        // Listings

        const fetchedListings =
          await apiService.getListings();

        setListings(fetchedListings);


        // Chats

        const fetchedChats =
          await apiService.getChats();

        setChats(fetchedChats);

      } catch (error) {

        console.error(
          'Error loading app data:',
          error
        );

      } finally {

        setIsLoading(false);

      }

    };

    initApp();

  }, []);


  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (
    credentials: {
      email: string;
      password: string;
    }
  ) => {

    try {

      const user =
        await apiService.login(credentials);

      setCurrentUser(user);

      setLoginEmail('');
      setLoginPassword('');

      setActivePage('listings');

    } catch (error) {

      console.error(
        'Login error:',
        error
      );

    }

  };


  // =====================================================
  // REGISTER
  // =====================================================

  const handleRegister = async (
    userData: {
      fullName: string;
      email: string;
      password: string;
    }
  ) => {

    try {

      const user =
        await apiService.register(userData);

      setCurrentUser(user);

      setRegisterFullName('');
      setRegisterEmail('');
      setRegisterPassword('');

      setActivePage('listings');

    } catch (error) {

      console.error(
        'Register error:',
        error
      );

    }

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {

    try {

      await apiService.logout();

      setCurrentUser(null);

      setSelectedListing(null);

      setActivePage('home');

    } catch (error) {

      console.error(
        'Logout error:',
        error
      );

    }

  };


  // =====================================================
  // ADD LISTING
  // =====================================================

  const handleAddNewListing = async (
    newListingData: Listing
  ) => {

    try {

      const addedListing =
        await apiService.createListing(
          newListingData
        );

      setListings((prevListings) => [
        addedListing,
        ...prevListings,
      ]);

      setActivePage('listings');

    } catch (error) {

      console.error(
        'Error creating listing:',
        error
      );

    }

  };


  // =====================================================
  // SELECT LISTING
  // =====================================================

  const handleSelectListing = (
    item: Listing
  ) => {

    console.log(
      'Selected listing:',
      item
    );

    setSelectedListing(item);

    // مهم:
    // هنا ما نمشيوش مباشرة للـChat
    // نمشيو للـDetails

    setActivePage('details');

  };


  // =====================================================
  // CONTACT OWNER
  // =====================================================

  const handleContactOwner = () => {

    if (!selectedListing) {
      return;
    }

    // من Details → Chat

    setActivePage('chat');

  };


  // =====================================================
  // LANGUAGE
  // =====================================================

  const direction =
    lang === 'ar'
      ? 'rtl'
      : 'ltr';

  const t =
    translations[lang] ||
    translations.en;


  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {

    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#eef3f7]">

        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F4845F]" />

      </div>
    );

  }


  // =====================================================
  // APP
  // =====================================================

  return (

    <div
      dir={direction}
      className="w-full min-h-screen flex flex-col font-sans bg-[#eef3f7]"
    >

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        lang={lang}
        setLang={setLang}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="flex-1 w-full relative flex flex-col">


        {/* =================================================
            HOME
        ================================================= */}

        {activePage === 'home' && (

      <HomePage
        setActivePage={setActivePage}
        lang={lang}
        listings={listings}
        onSelectListing={
          handleSelectListing
        }
        isLoggedIn={
          !!currentUser
        }
        onSearch={(query) => {

          setSearchQuery(query);

          setActivePage(
            'listings'
          );

        }}
      />

    )}


        {/* =================================================
            LISTINGS
        ================================================= */}

        {activePage === 'listings' && (

            <ListingsPage
              lang={lang}
              listings={listings}
              onSelectListing={handleSelectListing}
              t={t}

              onAddListing={
                handleAddNewListing
              }

              currentUser={currentUser}

              onNavigate={
                setActivePage
              }

              searchQuery={
                searchQuery
              }

              onSearchChange={(query) => {
                setSearchQuery(query);
              }}
            />

          )}


        {/* =================================================
            DETAILS
        ================================================= */}

        {activePage === 'details' && (

          selectedListing ? (

            <DetailsPage
              listing={selectedListing}
              lang={lang}
              t={t}
              currentUser={currentUser}

              onBack={() => {
                setActivePage('listings');
              }}

              onContactOwner={
                handleContactOwner
              }
            />

          ) : (

            <div className="flex-1 flex items-center justify-center">

              <div className="bg-white p-8 rounded-3xl shadow-xl text-center">

                <div className="text-4xl mb-4">
                  🏠
                </div>

                <h2 className="font-black text-gray-900">
                  Property not found
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setActivePage('listings')
                  }
                  className="mt-5 bg-[#F4845F] text-white px-6 py-3 rounded-2xl font-black"
                >
                  Back to listings
                </button>

              </div>

            </div>

          )

        )}


        {/* =================================================
            CHAT
        ================================================= */}

        {activePage === 'chat' && (

          currentUser ? (

            <ChatPage
              lang={lang}
              chats={chats}
              setChats={setChats}
              activeChatId={activeChatId}
              setActiveChatId={setActiveChatId}
              t={t}
              selectedListing={selectedListing}
            />

          ) : (

            <div className="flex-1 flex items-center justify-center p-6">

              <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">

                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl">
                  🔐
                </div>

                <h2 className="text-xl font-black text-gray-900 mb-2">
                  {t.signIn}
                </h2>

                <p className="text-sm text-gray-500 mb-6">

                  {lang === 'ar'
                    ? 'خاصك تسجل الدخول باش تستعمل المحادثات.'
                    : lang === 'fr'
                      ? 'Connectez-vous pour utiliser la messagerie.'
                      : 'Please sign in to use the chat.'}

                </p>

                <button
                  type="button"
                  onClick={() =>
                    setActivePage('signin')
                  }
                  className="bg-[#F4845F] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg hover:bg-[#e07553] transition"
                >
                  {t.signIn}
                </button>

              </div>

            </div>

          )

        )}


        {/* =================================================
            PROFILE
        ================================================= */}

        {activePage === 'profile' && (

          currentUser ? (

            <ProfilePage
              lang={lang}
              listings={listings}
              onBackToHome={() =>
                setActivePage('home')
              }
              onAddListing={
                handleAddNewListing
              }
              t={t}
              currentUser={currentUser}
            />

          ) : (

            <div className="flex-1 flex items-center justify-center p-6">

              <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">

                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl">
                  👤
                </div>

                <h2 className="text-xl font-black text-gray-900 mb-2">
                  {t.signIn}
                </h2>

                <p className="text-sm text-gray-500 mb-6">

                  {lang === 'ar'
                    ? 'خاصك تسجل الدخول باش تشوف البروفايل ديالك.'
                    : lang === 'fr'
                      ? 'Connectez-vous pour accéder à votre profil.'
                      : 'Please sign in to access your profile.'}

                </p>

                <button
                  type="button"
                  onClick={() =>
                    setActivePage('signin')
                  }
                  className="bg-[#F4845F] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg hover:bg-[#e07553] transition"
                >
                  {t.signIn}
                </button>

              </div>

            </div>

          )

        )}


        {/* =================================================
            SIGN IN
        ================================================= */}

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
                    password: loginPassword,
                  });

                }}
              >

                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) =>
                    setLoginEmail(e.target.value)
                  }
                  placeholder={t.email}
                  autoComplete="email"
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium focus:border-[#F4845F] focus:bg-white transition"
                  required
                />

                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) =>
                    setLoginPassword(e.target.value)
                  }
                  placeholder={t.password}
                  autoComplete="current-password"
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-6 border border-gray-100 outline-none text-sm font-medium focus:border-[#F4845F] focus:bg-white transition"
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

                <button
                  type="button"
                  onClick={() => {

                    setLoginEmail('');
                    setLoginPassword('');

                    setActivePage('signup');

                  }}
                  className="text-[#F4845F] font-black underline cursor-pointer"
                >
                  {t.signUp}
                </button>

              </p>

            </div>

          </div>

        )}


        {/* =================================================
            SIGN UP
        ================================================= */}

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
                    fullName: registerFullName,
                    email: registerEmail,
                    password: registerPassword,
                  });

                }}
              >

                <input
                  type="text"
                  value={registerFullName}
                  onChange={(e) =>
                    setRegisterFullName(e.target.value)
                  }
                  placeholder={t.fullName}
                  autoComplete="name"
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium focus:border-[#F4845F] focus:bg-white transition"
                  required
                />

                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) =>
                    setRegisterEmail(e.target.value)
                  }
                  placeholder={t.email}
                  autoComplete="email"
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium focus:border-[#F4845F] focus:bg-white transition"
                  required
                />

                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) =>
                    setRegisterPassword(e.target.value)
                  }
                  placeholder={t.createPassword}
                  autoComplete="new-password"
                  className="w-full bg-gray-50 p-3.5 rounded-2xl mb-6 border border-gray-100 outline-none text-sm font-medium focus:border-[#F4845F] focus:bg-white transition"
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

                <button
                  type="button"
                  onClick={() => {

                    setRegisterFullName('');
                    setRegisterEmail('');
                    setRegisterPassword('');

                    setActivePage('signin');

                  }}
                  className="text-[#F4845F] font-black underline cursor-pointer"
                >
                  {t.signIn}
                </button>

              </p>

            </div>

          </div>

        )}

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer lang={lang} />

    </div>
  );
}

export default App;