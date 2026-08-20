import React, { useEffect, useRef, useState } from 'react';
import { Language, User } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  activePage?: string;
  setActivePage: (page: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  currentUser: User | null;
  handleLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage = 'home',
  setActivePage,
  lang,
  setLang,
  currentUser,
  handleLogout,
}) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const languageRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const t = translations[lang] || translations.en;

  /*
   * =========================
   * LANGUAGES
   * =========================
   */

  const languages = [
    {
      code: 'en',
      label: 'English',
      flag: '🇬🇧',
    },
    {
      code: 'fr',
      label: 'Français',
      flag: '🇫🇷',
    },
    {
      code: 'ar',
      label: 'العربية',
      flag: '🇲🇦',
    },
  ];

  const currentLanguage =
    languages.find((language) => language.code === lang) ||
    languages[0];

  /*
   * =========================
   * CLOSE DROPDOWNS
   * =========================
   */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        languageRef.current &&
        !languageRef.current.contains(target)
      ) {
        setIsLanguageOpen(false);
      }

      if (
        userRef.current &&
        !userRef.current.contains(target)
      ) {
        setIsUserOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  /*
   * =========================
   * NAVIGATION
   * =========================
   */

  const goToPage = (page: string) => {
    setActivePage(page);
    setIsUserOpen(false);
  };

  /*
   * =========================
   * USER INITIAL
   * =========================
   */

  const getUserInitial = () => {
    if (!currentUser?.fullName) {
      return 'U';
    }

    return currentUser.fullName
      .trim()
      .charAt(0)
      .toUpperCase();
  };

  /*
   * =========================
   * NAV ITEM
   * =========================
   */

  const navItemClass = (page: string) => {
    const isActive = activePage === page;

    return `
      relative
      px-3
      py-2
      text-sm
      font-bold
      transition-all
      duration-300
      cursor-pointer
      ${
        isActive
          ? 'text-[#F4845F]'
          : 'text-gray-600 hover:text-[#F4845F]'
      }
    `;
  };

  /*
   * =========================
   * NAVBAR
   * =========================
   */

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        w-full
        px-4
        md:px-6
        py-3
        bg-white/85
        backdrop-blur-xl
        border-b
        border-gray-100
        shadow-sm
      "
    >
      <div
        className="
          max-w-[1500px]
          mx-auto
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* =========================
            LOGO
        ========================= */}

        <button
          onClick={() => goToPage('home')}
          className="
            flex
            items-center
            gap-3
            shrink-0
            cursor-pointer
            group
          "
        >
          {/* Logo icon */}

          <div
            className="
              relative
              w-10
              h-10
              rounded-2xl
              bg-gradient-to-tr
              from-[#e0633c]
              via-[#F4845F]
              to-[#ffa384]
              p-[1px]
              shadow-lg
              shadow-[#F4845F]/30
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:rotate-3
            "
          >
            <div
              className="
                w-full
                h-full
                rounded-[15px]
                bg-gradient-to-br
                from-gray-900
                to-black
                flex
                items-center
                justify-center
              "
            >
              <svg
                className="
                  w-5
                  h-5
                  text-[#F4845F]
                  drop-shadow-[0_2px_8px_rgba(244,132,95,0.7)]
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
          </div>

          {/* Logo text */}

          <div className="hidden sm:flex flex-col text-left">
            <span
              className="
                text-xl
                font-black
                tracking-tight
                text-gray-900
                leading-none
              "
            >
              i
              <span className="text-[#F4845F]">
                rent
              </span>
            </span>

            <span
              className="
                text-[8px]
                font-black
                text-gray-400
                tracking-[0.2em]
                uppercase
                mt-1
              "
            >
              {t.subtext}
            </span>
          </div>
        </button>

        {/* =========================
            NAVIGATION
        ========================= */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-1
          "
        >
          {/* HOME */}

          <button
            onClick={() => goToPage('home')}
            className={navItemClass('home')}
          >
            {t.home}

            {activePage === 'home' && (
              <span
                className="
                  absolute
                  left-1/2
                  -bottom-1
                  -translate-x-1/2
                  w-1
                  h-1
                  rounded-full
                  bg-[#F4845F]
                "
              />
            )}
          </button>

          {/* LISTINGS */}

          <button
            onClick={() => goToPage('listings')}
            className={navItemClass('listings')}
          >
            {t.listings}

            {activePage === 'listings' && (
              <span
                className="
                  absolute
                  left-1/2
                  -bottom-1
                  -translate-x-1/2
                  w-1
                  h-1
                  rounded-full
                  bg-[#F4845F]
                "
              />
            )}
          </button>

          {/* CHAT */}

          <button
            onClick={() => {
              if (currentUser) {
                goToPage('chat');
              } else {
                goToPage('signin');
              }
            }}
            className={navItemClass('chat')}
          >
            {t.chat}

            {activePage === 'chat' && (
              <span
                className="
                  absolute
                  left-1/2
                  -bottom-1
                  -translate-x-1/2
                  w-1
                  h-1
                  rounded-full
                  bg-[#F4845F]
                "
              />
            )}
          </button>

          {/* PROFILE */}

          {currentUser && (
            <button
              onClick={() => goToPage('profile')}
              className={navItemClass('profile')}
            >
              {t.profile}

              {activePage === 'profile' && (
                <span
                  className="
                    absolute
                    left-1/2
                    -bottom-1
                    -translate-x-1/2
                    w-1
                    h-1
                    rounded-full
                    bg-[#F4845F]
                  "
                />
              )}
            </button>
          )}
        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div
          className="
            flex
            items-center
            gap-2
            shrink-0
          "
        >
          {/* =========================
              LANGUAGE
          ========================= */}

          <div
            ref={languageRef}
            className="relative"
          >
            <button
              onClick={() =>
                setIsLanguageOpen(
                  !isLanguageOpen
                )
              }
              className="
                flex
                items-center
                gap-2
                px-3
                py-2.5
                rounded-2xl
                bg-gray-100
                hover:bg-gray-200
                border
                border-gray-200
                text-xs
                font-black
                text-gray-700
                transition
                cursor-pointer
              "
            >
              <span>
                {currentLanguage.flag}
              </span>

              <span className="hidden sm:block">
                {currentLanguage.code.toUpperCase()}
              </span>

              <span
                className={`
                  text-[9px]
                  transition-transform
                  duration-300
                  ${
                    isLanguageOpen
                      ? 'rotate-180'
                      : ''
                  }
                `}
              >
                ▼
              </span>
            </button>

            {isLanguageOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-2
                  w-40
                  bg-white
                  border
                  border-gray-100
                  rounded-2xl
                  shadow-2xl
                  p-1.5
                  overflow-hidden
                "
              >
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setLang(
                        language.code as Language
                      );
                      setIsLanguageOpen(false);
                    }}
                    className={`
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-xl
                      text-xs
                      font-bold
                      transition
                      cursor-pointer
                      ${
                        lang === language.code
                          ? 'bg-[#F4845F]/10 text-[#F4845F]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span className="text-base">
                      {language.flag}
                    </span>

                    <span>
                      {language.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =========================
              AUTH
          ========================= */}

          {!currentUser ? (
            <button
              onClick={() =>
                goToPage('signin')
              }
              className="
                px-4
                sm:px-5
                py-2.5
                rounded-2xl
                bg-gray-900
                hover:bg-[#F4845F]
                text-white
                text-xs
                font-black
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                active:scale-95
                cursor-pointer
              "
            >
              {t.signIn}
            </button>
          ) : (
            <div
              ref={userRef}
              className="relative"
            >
              {/* USER BUTTON */}

              <button
                onClick={() =>
                  setIsUserOpen(!isUserOpen)
                }
                className="
                  flex
                  items-center
                  gap-2
                  pl-1
                  pr-2.5
                  py-1
                  rounded-2xl
                  bg-white
                  border
                  border-gray-200
                  shadow-sm
                  hover:shadow-md
                  transition
                  cursor-pointer
                "
              >
                {/* Avatar */}

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-gradient-to-br
                    from-[#F4845F]
                    to-[#e0633c]
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-black
                    shadow-sm
                  "
                >
                  {getUserInitial()}
                </div>

                {/* Name */}

                <div className="hidden md:flex flex-col text-left max-w-[110px]">
                  <span
                    className="
                      text-[8px]
                      text-gray-400
                      font-bold
                      uppercase
                      tracking-wider
                    "
                  >
                    Account
                  </span>

                  <span
                    className="
                      text-xs
                      font-black
                      text-gray-800
                      truncate
                    "
                  >
                    {currentUser.fullName}
                  </span>
                </div>

                <span
                  className={`
                    text-[9px]
                    text-gray-400
                    transition-transform
                    ${
                      isUserOpen
                        ? 'rotate-180'
                        : ''
                    }
                  `}
                >
                  ▼
                </span>
              </button>

              {/* USER DROPDOWN */}

              {isUserOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    mt-2
                    w-60
                    bg-white
                    border
                    border-gray-100
                    rounded-3xl
                    shadow-2xl
                    p-2
                    overflow-hidden
                  "
                >
                  {/* User header */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      p-3
                      mb-1
                      bg-gray-50
                      rounded-2xl
                    "
                  >
                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-gradient-to-br
                        from-[#F4845F]
                        to-[#e0633c]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-black
                      "
                    >
                      {getUserInitial()}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-xs
                          font-black
                          text-gray-900
                          truncate
                        "
                      >
                        {currentUser.fullName}
                      </p>

                      <p
                        className="
                          text-[10px]
                          text-gray-400
                          truncate
                        "
                      >
                        {currentUser.email}
                      </p>
                    </div>
                  </div>

                  {/* Profile */}

                  <button
                    onClick={() =>
                      goToPage('profile')
                    }
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-3
                      rounded-xl
                      text-xs
                      font-bold
                      text-gray-700
                      hover:bg-[#F4845F]/10
                      hover:text-[#F4845F]
                      transition
                      cursor-pointer
                    "
                  >
                    <span>👤</span>

                    <span>
                      {t.profile}
                    </span>
                  </button>

                  {/* Chat */}

                  <button
                    onClick={() =>
                      goToPage('chat')
                    }
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-3
                      rounded-xl
                      text-xs
                      font-bold
                      text-gray-700
                      hover:bg-[#F4845F]/10
                      hover:text-[#F4845F]
                      transition
                      cursor-pointer
                    "
                  >
                    <span>💬</span>

                    <span>
                      {t.chat}
                    </span>
                  </button>

                  <div className="h-px bg-gray-100 my-1" />

                  {/* Logout */}

                  <button
                    onClick={() => {
                      setIsUserOpen(false);
                      handleLogout();
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-3
                      rounded-xl
                      text-xs
                      font-black
                      text-red-500
                      hover:bg-red-50
                      transition
                      cursor-pointer
                    "
                  >
                    <span>↪</span>

                    <span>
                      {lang === 'ar'
                        ? 'تسجيل الخروج'
                        : lang === 'fr'
                          ? 'Déconnexion'
                          : 'Logout'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================= */}

      <div
        className="
          lg:hidden
          max-w-[1500px]
          mx-auto
          w-full
          mt-3
          flex
          items-center
          gap-1
          overflow-x-auto
          pb-1
          scrollbar-hide
        "
      >
        <button
          onClick={() => goToPage('home')}
          className={`
            px-4
            py-2
            rounded-xl
            text-xs
            font-black
            whitespace-nowrap
            cursor-pointer
            transition
            ${
              activePage === 'home'
                ? 'bg-[#F4845F] text-white'
                : 'bg-gray-100 text-gray-600'
            }
          `}
        >
          {t.home}
        </button>

        <button
          onClick={() => goToPage('listings')}
          className={`
            px-4
            py-2
            rounded-xl
            text-xs
            font-black
            whitespace-nowrap
            cursor-pointer
            transition
            ${
              activePage === 'listings'
                ? 'bg-[#F4845F] text-white'
                : 'bg-gray-100 text-gray-600'
            }
          `}
        >
          {t.listings}
        </button>

        <button
          onClick={() => {
            if (currentUser) {
              goToPage('chat');
            } else {
              goToPage('signin');
            }
          }}
          className={`
            px-4
            py-2
            rounded-xl
            text-xs
            font-black
            whitespace-nowrap
            cursor-pointer
            transition
            ${
              activePage === 'chat'
                ? 'bg-[#F4845F] text-white'
                : 'bg-gray-100 text-gray-600'
            }
          `}
        >
          {t.chat}
        </button>

        {currentUser && (
          <button
            onClick={() =>
              goToPage('profile')
            }
            className={`
              px-4
              py-2
              rounded-xl
              text-xs
              font-black
              whitespace-nowrap
              cursor-pointer
              transition
              ${
                activePage === 'profile'
                  ? 'bg-[#F4845F] text-white'
                  : 'bg-gray-100 text-gray-600'
              }
            `}
          >
            {t.profile}
          </button>
        )}
      </div>
    </nav>
  );
};