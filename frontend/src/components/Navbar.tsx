import React, { useState } from 'react';
import { Language } from '../types';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenAddModal: () => void;
  onOpenAuthModal: () => void;
  isLoggedIn: boolean;
  currentUser: { name: string; role: 'owner' | 'seeker' } | null;
  onLogout: () => void;
  t: any;
}

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'ar', name: 'الدارجة', flag: '🇲🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  lang,
  setLang,
  onOpenAddModal,
  onOpenAuthModal,
  isLoggedIn,
  currentUser,
  onLogout,
  t
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
            <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              {t.logo}
            </span>
            <span className="hidden sm:inline-block text-[10px] bg-amber-100 text-amber-800 font-black px-2 py-0.5 rounded-full border border-amber-200">
              🇲🇦 Morocco
            </span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6 font-bold text-sm">
            <button 
              onClick={() => setActivePage('home')} 
              className={`transition ${activePage === 'home' ? "text-amber-600 font-black border-b-2 border-amber-600 pb-1" : "text-gray-600 hover:text-amber-600"}`}
            >
              {t.home}
            </button>
            <button 
              onClick={() => setActivePage('listings')} 
              className={`transition ${activePage === 'listings' ? "text-amber-600 font-black border-b-2 border-amber-600 pb-1" : "text-gray-600 hover:text-amber-600"}`}
            >
              {t.listings}
            </button>
            <button 
              onClick={() => setActivePage('chat')} 
              className={`transition ${activePage === 'chat' ? "text-amber-600 font-black border-b-2 border-amber-600 pb-1" : "text-gray-600 hover:text-amber-600"}`}
            >
              {t.chat}
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 px-3 py-2 rounded-2xl text-xs font-bold transition border border-amber-200/60"
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.name}</span>
                <span className="text-[10px] text-amber-600">▼</span>
              </button>

              {isLangOpen && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-amber-100 rounded-2xl shadow-xl py-2 z-50 min-w-[130px]">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                      className={`w-full text-right px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-amber-50 hover:text-amber-700 transition ${
                        lang === l.code ? 'text-amber-700 bg-amber-50/80' : 'text-gray-700'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons / Profile & Logout */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActivePage('profile')} 
                  className="bg-amber-50 text-amber-900 px-3 py-2 rounded-2xl text-xs font-bold border border-amber-200 hover:bg-amber-100 transition"
                >
                  👤 {currentUser?.name || 'البروفايل'}
                </button>
                <button 
                  onClick={onLogout} 
                  title="تسجيل الخروج (Logout)"
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-2 rounded-2xl text-xs font-bold transition border border-red-200"
                >
                  🚪
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAuthModal} 
                className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-2xl text-xs font-black transition shadow-md shadow-amber-600/20"
              >
                {lang === 'ar' ? 'تسجيل الدخول / Login' : lang === 'fr' ? 'Connexion / Login' : 'Sign In / Login'}
              </button>
            )}
            
            <button 
              onClick={onOpenAddModal} 
              className="bg-gray-900 hover:bg-black text-white px-3 py-2 rounded-2xl text-xs font-bold transition shadow-md"
            >
              {t.addListing}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};