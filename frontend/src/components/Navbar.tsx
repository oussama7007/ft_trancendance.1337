import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations'; // 👈 استيراد الترجمة المركزية

interface NavbarProps {
  activePage?: string;
  setActivePage: (page: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage = 'home', setActivePage, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // استدعاء قاموس الترجمة حسب اللغة الحالية
  const t = translations[lang] || translations.en;

  // إغلاق المنيو إيلا كليكا المستخدم برا
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇲🇦' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <nav className="backdrop-blur-xl bg-white/80 border-b border-gray-100 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm transition-all duration-300">
      
      {/* 🏠 الشعار / Logo 3D Pro حصري */}
      <div 
        onClick={() => setActivePage('home')}
        className="cursor-pointer group flex items-center gap-3 select-none"
      >
        <div className="relative w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#e0633c] via-[#F4845F] to-[#ffa384] p-[1px] shadow-[0_10px_20px_-5px_rgba(244,132,95,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_15px_25px_-5px_rgba(244,132,95,0.7)]">
          <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-950 rounded-[15px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
            
            <svg 
              className="w-5 h-5 text-[#F4845F] transform transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(244,132,95,0.8)]" 
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

        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tight text-gray-900 leading-none">
            i<span className="text-[#F4845F] drop-shadow-sm">rent</span>
          </span>
          <span className="text-[9px] font-extrabold text-gray-400 tracking-[0.2em] uppercase mt-1">
            {t.subtext}
          </span>
        </div>
      </div>

      {/* 🧭 روابط التنقل مترجمة مركزياً */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={() => setActivePage('home')} 
          className={`px-4 py-2 text-sm font-bold transition-all duration-300 ease-out hover:scale-110 hover:text-[#F4845F] active:scale-95 cursor-pointer ${activePage === 'home' ? 'text-[#F4845F]' : 'text-gray-700'}`}
        >
          {t.home}
        </button>
        <button 
          onClick={() => setActivePage('listings')} 
          className={`px-4 py-2 text-sm font-bold transition-all duration-300 ease-out hover:scale-110 hover:text-[#F4845F] active:scale-95 cursor-pointer ${activePage === 'listings' ? 'text-[#F4845F]' : 'text-gray-700'}`}
        >
          {t.listings}
        </button>
        <button 
          onClick={() => setActivePage('chat')} 
          className={`px-4 py-2 text-sm font-bold transition-all duration-300 ease-out hover:scale-110 hover:text-[#F4845F] active:scale-95 cursor-pointer ${activePage === 'chat' ? 'text-[#F4845F]' : 'text-gray-700'}`}
        >
          {t.chat}
        </button>
        <button 
          onClick={() => setActivePage('profile')} 
          className={`px-4 py-2 text-sm font-bold transition-all duration-300 ease-out hover:scale-110 hover:text-[#F4845F] active:scale-95 cursor-pointer ${activePage === 'profile' ? 'text-[#F4845F]' : 'text-gray-700'}`}
        >
          {t.profile}
        </button>
      </div>

      {/* 🌐 Custom Language Dropdown */}
      <div className="flex items-center gap-3">
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gray-100/80 hover:bg-gray-200/80 
                       text-xs font-black text-gray-800 transition-all duration-300 ease-out 
                       hover:scale-105 active:scale-95 shadow-sm cursor-pointer border border-gray-200/50"
          >
            <span className="text-sm">{currentLang.flag}</span>
            <span>{currentLang.label}</span>
            <span className={`transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {/* القائمة المنسدلة (Dropdown) */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white/90 backdrop-blur-xl border border-gray-100 
                            rounded-3xl shadow-2xl py-2 z-50 flex flex-col gap-1 
                            animate-in fade-in zoom-in-95 duration-200">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code as Language);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-all duration-200 
                            hover:bg-[#F4845F]/10 hover:text-[#F4845F] text-left w-full cursor-pointer
                            ${lang === l.code ? 'text-[#F4845F] bg-[#F4845F]/5 font-black' : 'text-gray-700'}`}
                >
                  <span className="text-base">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* زر Sign In / دخول */}
        <button
          onClick={() => setActivePage('signin')}
          className="px-5 py-2.5 text-xs font-black bg-gray-900 text-white rounded-2xl shadow-lg 
                     transition-all duration-300 ease-out 
                     hover:scale-105 hover:bg-black hover:shadow-xl 
                     active:scale-95 cursor-pointer"
        >
          {t.signIn}
        </button>

      </div>
    </nav>
  );
};