import React from 'react';
import { Language } from '../types';
import { translations } from '../translations'; // 👈 استيراد الترجمات المركزية

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  // 👈 جلب الترجمات حسب اللغة المختارة
  const t = translations[lang] || translations.en;

  return (
    <footer className="bg-white border-t border-gray-100 mt-12 py-12 px-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* معلومات الشركة */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-black text-gray-900 mb-2 tracking-wide">
            i<span className="text-[#F4845F] transition-colors duration-300 hover:text-gray-900">Rent</span>.ma
          </h3>
          <p className="text-sm text-gray-500 mb-4 max-w-sm leading-relaxed">{t.footerDesc}</p>
          <a 
            href="mailto:support@irent.ma" 
            className="inline-block text-sm font-bold text-[#F4845F] hover:text-gray-900 transition-colors duration-300"
          >
            support@irent.ma
          </a>
        </div>

        {/* روابط سريعة */}
        <div>
          <h4 className="font-extrabold text-gray-900 mb-4 text-sm uppercase tracking-wider">{t.footerAboutTitle}</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <span className="cursor-pointer transition-all duration-200 hover:text-[#F4845F] hover:translate-x-1 inline-block">
                {t.support}
              </span>
            </li>
            <li>
              <span className="cursor-pointer transition-all duration-200 hover:text-[#F4845F] hover:translate-x-1 inline-block">
                {t.terms}
              </span>
            </li>
          </ul>
        </div>

        {/* معلومات الاتصال */}
        <div>
          <h4 className="font-extrabold text-gray-900 mb-4 text-sm uppercase tracking-wider">{t.footerContactTitle}</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="hover:text-gray-900 transition-colors duration-200">
              📍 Khouribga, Morocco
            </li>
            <li className="hover:text-[#F4845F] transition-colors duration-200 cursor-pointer">
              📞 +212 600-000000
            </li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-6xl mx-auto mt-1 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
        <p>{t.footerRights}</p>
        <div className="flex gap-2.5 mt-4 sm:mt-0 items-center">
          <span className="hover:text-[#F4845F] transition-colors duration-200 cursor-pointer">{t.privacyPolicy || 'Privacy'}</span>
          <span className="hover:text-[#F4845F] transition-colors duration-200 cursor-pointer">{t.termsOfUse || 'Terms'}</span>
          <span className="hover:text-[#F4845F] transition-colors duration-200 cursor-pointer">{t.security || 'Security'}</span>
        </div>
      </div>
    </footer>
  );
};