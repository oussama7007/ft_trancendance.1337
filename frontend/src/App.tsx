import React, { useEffect, useState } from 'react';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { DetailsPage } from './pages/DetailsPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage, RegisterData } from './pages/SignUpPage';

import {
  Listing,
  ChatConversation,
  Language,
  User,
} from './types';

import { apiService } from './services/apiService';
import { translations } from './translations';

function App() {
  /*
   * =========================================================
   * APP STATE
   * =========================================================
   */

  const [activePage, setActivePage] =
    useState<string>('home');

  const [lang, setLang] =
    useState<Language>('en');

  const [activeChatId, setActiveChatId] =
    useState<number>(1);

  /*
   * =========================================================
   * SELECTED LISTING
   * =========================================================
   */

  const [selectedListing, setSelectedListing] =
    useState<Listing | null>(null);

  /*
   * =========================================================
   * AUTH
   * =========================================================
   */

  const [currentUser, setCurrentUser] =
    useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  /*
   * =========================================================
   * DATA
   * =========================================================
   */

  const [listings, setListings] =
    useState<Listing[]>([]);

  const [searchQuery, setSearchQuery] =
    useState<string>('');

  const [chats, setChats] =
    useState<ChatConversation[]>([]);

  /*
   * =========================================================
   * LOGIN FORM
   * =========================================================
   */

  const [loginEmail, setLoginEmail] =
    useState<string>('');

  const [loginPassword, setLoginPassword] =
    useState<string>('');
  
  const [loginError, setLoginError] =
    useState<string>("");

  /*
   * =========================================================
   * REGISTER FORM
   *
   * SignUpPage controls:
   * - password
   * - confirmPassword
   * - verificationCode
   * - identifier
   *
   * App controls:
   * - firstName
   * - lastName
   * - date of birth
   * - email
   * - phone
   * - CIN
   * =========================================================
   */

  const [registerFirstName, setRegisterFirstName] =
    useState<string>('');

  const [registerLastName, setRegisterLastName] =
    useState<string>('');

  const [registerDob, setRegisterDob] =
    useState<string>('');

  const [registerEmail, setRegisterEmail] =
    useState<string>('');

  const [registerPhone, setRegisterPhone] =
    useState<string>('');

  const [registerCin, setRegisterCin] =
    useState<string>('');

  const [registerGender, setGender] = useState('');

  /*
   * =========================================================
   * INITIAL LOAD
   * =========================================================
   */

  useEffect(() => {
    const initApp = async () => {
      try {
        /*
         * -----------------------------------------------------
         * CURRENT USER
         * -----------------------------------------------------
         */

        try {
          const user =
            await apiService.getCurrentUser();

          if (user) {
            setCurrentUser(user);
          }
        } catch (userError) {
          console.warn(
            'Could not load current user:',
            userError
          );
        }

        /*
         * -----------------------------------------------------
         * LISTINGS
         * -----------------------------------------------------
         */

        try {
          const fetchedListings =
            await apiService.getListings();

          setListings(
            Array.isArray(fetchedListings)
              ? fetchedListings
              : []
          );
        } catch (listingError) {
          console.warn(
            'Could not load listings:',
            listingError
          );

          setListings([]);
        }

        /*
         * -----------------------------------------------------
         * CHATS
         * -----------------------------------------------------
         *
         * Chat can require authentication.
         */

        try {
          const fetchedChats =
            await apiService.getChats();

          setChats(
            Array.isArray(fetchedChats)
              ? fetchedChats
              : []
          );
        } catch (chatError) {
          console.warn(
            'Could not load chats:',
            chatError
          );

          setChats([]);
        }

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

  /*
   * =========================================================
   * LOGIN
   * =========================================================
   */

  const handleLogin = async (
    credentials: {
      email: string;
      password: string;
    }
  ) => {
    try {

      setLoginError('');

      const user =
        await apiService.login(credentials);

      /*
       * Save authenticated user.
       */

      setCurrentUser(user);

      /*
       * Clear login form.
       */

      setLoginEmail('');
      setLoginPassword('');

      /*
       * Go to listings.
       */

      setActivePage('listings');

    } catch (error) {
      console.error(
        'Login error:',
        error
      );

      if (error instanceof Error) {
        setLoginError(error.message);
    } else {
        setLoginError(
          'Invalid email or password.'
      );
    }
    }
  };

  /*
   * =========================================================
   * REGISTER
   * =========================================================
   */


// ++++++++++++++++++++++++++++++++++++++++++++
const handleRegister = async (
  userData: RegisterData
) => {
  try {
    /*
     * Registration has already been completed
     * by SignUpPage through:
     *
     * /auth/register/start
     * /auth/register/contact
     * /auth/register/verify
     * /auth/register/finish
     *
     * Therefore, DO NOT call apiService.register()
     * here anymore.
     */

    /*
     * Move the user to the sign-in page after
     * successful registration.
     */
    setActivePage('signin');

    /*
     * Clear registration form data.
     */
    setRegisterFirstName('');
    setRegisterLastName('');
    setRegisterDob('');
    setGender('');
    setRegisterEmail('');
    setRegisterPhone('');
    setRegisterCin('');

  } catch (error) {
    console.error('Registration completed but UI transition failed:', error);
  }
};
//++++++++++++++++++++++++++++++++++++++++++++
  // const handleRegister = async (
  //   userData: RegisterData
  // ) => {
  //   try {
  //     /*
  //      * userData comes directly from SignUpPage.
  //      *
  //      * Example:
  //      *
  //      * {
  //      *   firstName: "Said",
  //      *   lastName: "..."
  //      *   dateOfBirth: "2000-01-01",
  //      *   email: "test@gmail.com",
  //      *   phone: "",
  //      *   password: "********",
  //      *   confirmPassword: "********",
  //      *   cin: "..."
  //      * }
  //      */

  //     const useeiService.register(userData);

  //     /*
  //      * Save new authenticated user.
  //      */

  //     setCurrentUser(user);

  //     /*
  //      * Clear registration fields.
  //      */

  //     setRegisterFirstName('');
  //     setRegisterLastName('');
  //     setRegisterDob('');
  //     setRegisterEmail('');
  //     setRegisterPhone('');
  //     setRegisterCin('');

  //     /*
  //      * Go to listings.
  //      */

  //     setActivePage('listings');

  //   } catch (error) {
  //     console.error(
  //       'Register error:',
  //       error
  //     );
  //   }
  // };

  /*
   * =========================================================
   * LOGOUT
   * =========================================================
   */

  const handleLogout = async () => {
    try {
      await apiService.logout();

      /*
       * Remove authenticated user.
       */

      setCurrentUser(null);

      /*
       * Clear selected listing.
       */

      setSelectedListing(null);

      /*
       * Clear search.
       */

      setSearchQuery('');

      /*
       * Clear chats.
       */

      setChats([]);

      /*
       * Go home.
       */

      setActivePage('home');

    } catch (error) {
      console.error(
        'Logout error:',
        error
      );
    }
  };

  /*
   * =========================================================
   * ADD NEW LISTING
   * =========================================================
   */

  const handleAddNewListing = async (
    newListingData: Listing
  ) => {
    try {
      /*
       * The backend should determine the real owner
       * from the authenticated session.
       *
       * ownerId here is only for frontend state.
       */

      const listingToCreate: Listing = {
        ...newListingData,

        ...(currentUser
          ? {
              ownerId: currentUser.id,
            }
          : {}),
      };

      const addedListing =
        await apiService.createListing(
          listingToCreate
        );

      /*
       * Add new listing at the beginning.
       */

      setListings((prevListings) => [
        addedListing,
        ...prevListings,
      ]);

      /*
       * Go to listings.
       */

      setActivePage('listings');

    } catch (error) {
      console.error(
        'Error creating listing:',
        error
      );
    }
  };

  /*
   * =========================================================
   * SELECT LISTING
   * =========================================================
   */

  const handleSelectListing = (
    item: Listing
  ) => {
    console.log(
      'Selected listing:',
      item
    );

    setSelectedListing(item);

    setActivePage('details');
  };

  /*
   * =========================================================
   * CONTACT OWNER
   * =========================================================
   */

  const handleContactOwner = () => {
    if (!selectedListing) {
      return;
    }

    /*
     * Chat page requires authentication.
     */

    if (!currentUser) {
      setActivePage('signin');
      return;
    }

    setActivePage('chat');
  };

  /*
   * =========================================================
   * LANGUAGE
   * =========================================================
   */

  const direction =
    lang === 'ar'
      ? 'rtl'
      : 'ltr';

  const t =
    translations[lang] ||
    translations.en;

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#F4FAFD]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0F5E9C]" />
      </div>
    );
  }

  /*
   * =========================================================
   * APP
   * =========================================================
   */

  return (
    <div
      dir={direction}
      className="w-full min-h-screen flex flex-col font-sans bg-[#F4FAFD]"
    >

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        lang={lang}
        setLang={setLang}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="flex-1 w-full relative flex flex-col">

        {/* ===================================================
            HOME
        =================================================== */}

        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            lang={lang}
            listings={listings}
            onSelectListing={handleSelectListing}
            isLoggedIn={Boolean(currentUser)}
            onSearch={(query) => {
              setSearchQuery(query);
              setActivePage('listings');
            }}
          />
        )}

        {/* ===================================================
            LISTINGS
        =================================================== */}

        {activePage === 'listings' && (
          <ListingsPage
            lang={lang}
            listings={listings}
            onSelectListing={handleSelectListing}
            t={t}
            onAddListing={handleAddNewListing}
            currentUser={currentUser}
            onNavigate={setActivePage}
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
            }}
          />
        )}

        {/* ===================================================
            DETAILS
        =================================================== */}

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
              onContactOwner={handleContactOwner}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="bg-white p-8 rounded-3xl shadow-xl text-center">

                <div className="text-4xl mb-4">
                  🏠
                </div>

                <h2 className="font-black text-gray-900">
                  Property not found
                </h2>

                <button
                  type="button"
                  onClick={() => {
                    setActivePage('listings');
                  }}
                  className="mt-5 bg-[#0F5E9C] text-white px-6 py-3 rounded-2xl font-black hover:bg-[#0B4B7A] transition"
                >
                  Back to listings
                </button>

              </div>
            </div>
          )
        )}

        {/* ===================================================
            CHAT
        =================================================== */}

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

                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#EAF6FB] flex items-center justify-center text-3xl">
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
                  onClick={() => {
                    setActivePage('signin');
                  }}
                  className="bg-[#0F5E9C] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg hover:bg-[#0B4B7A] transition"
                >
                  {t.signIn}
                </button>

              </div>

            </div>
          )
        )}

        {/* ===================================================
            PROFILE
        =================================================== */}

        {activePage === 'profile' && (
          currentUser ? (
            <ProfilePage
              lang={lang}
              listings={listings}
              onBackToHome={() => {
                setActivePage('home');
              }}
              onAddListing={handleAddNewListing}
              t={t}
              currentUser={currentUser}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">

              <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">

                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#EAF6FB] flex items-center justify-center text-3xl">
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
                  onClick={() => {
                    setActivePage('signin');
                  }}
                  className="bg-[#0F5E9C] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg hover:bg-[#0B4B7A] transition"
                >
                  {t.signIn}
                </button>

              </div>

            </div>
          )
        )}

        {/* ===================================================
            SIGN IN
        =================================================== */}

        {activePage === 'signin' && (
          <SignInPage
            lang={lang}
            t={t}

            email={loginEmail}
            password={loginPassword}

            setEmail={setLoginEmail}
            setPassword={setLoginPassword}

            loginError={loginError}
            setLoginError={setLoginError}

            onLogin={() => {
              handleLogin({
                email: loginEmail,
                password: loginPassword,
              });
            }}

            onGoToSignUp={() => {
              /*
               * Clear login fields.
               */

              setLoginEmail('');
              setLoginPassword('');
              setLoginError('');

              /*
               * Open signup.
               */

              setActivePage('signup');
            }}
          />
        )}

        {/* ===================================================
            SIGN UP
        =================================================== */}

        {activePage === 'signup' && (
          <SignUpPage
            lang={lang}
            t={t}

            /*
             * PERSONAL INFORMATION
             */

            firstName={registerFirstName}
            lastName={registerLastName}
            dob={registerDob}
            gender={registerGender}


            /*
             * CONTACT
             */

            email={registerEmail}
            phone={registerPhone}

            /*
             * CIN
             */

            cin={registerCin}

            /*
             * SETTERS
             */

            setFirstName={setRegisterFirstName}
            setLastName={setRegisterLastName}
            setDob={setRegisterDob}
            setGender={setGender}

            setEmail={setRegisterEmail}
            setPhone={setRegisterPhone}

            setCin={setRegisterCin}

            /*
             * REGISTER
             *
             * SignUpPage gives us the complete RegisterData.
             */

            onRegister={handleRegister}

            /*
             * GO TO SIGN IN
             */

            onGoToSignIn={() => {

              /*
               * Clear signup data.
               */

              setRegisterFirstName('');
              setRegisterLastName('');
              setRegisterDob('');
              setGender('');
              setRegisterEmail('');
              setRegisterPhone('');
              setRegisterCin('');

              /*
               * Go to sign in.
               */

              setActivePage('signin');
            }}
          />
        )}

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer
        lang={lang}
      />

    </div>
  );
}

export default App;