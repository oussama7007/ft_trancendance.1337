import React, { useState } from 'react';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userData: { name: string; email: string; role: 'owner' | 'seeker' }) => void;
  lang: Language;
  t: any; // 👈 استقبال كائن الترجمة المركزي
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, lang, t }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'owner' | 'seeker'>('owner');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthSuccess({
      name: name || 'Soufiane Liani',
      email: email,
      role: role
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[2rem] max-w-sm w-full p-6 shadow-2xl space-y-4 relative border border-gray-100">
        
        {/* زر الإغلاق */}
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-4 left-4 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 font-bold text-xs transition cursor-pointer"
        >
          ✕
        </button>

        {/* العنوان */}
        <div className="text-center pt-1">
          <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
            {isSignUp ? t.signUp : t.signIn}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t.fullNameLabel || 'Name:'}
              </label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Soufiane"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:border-[#F4845F] outline-none transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t.emailLabel || 'Email:'}</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:border-[#F4845F] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t.passwordLabel || 'Password:'}</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:border-[#F4845F] outline-none transition"
            />
          </div>

          {/* اختيار الدور (مالك أو باحث) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t.roleLabel || 'Role:'}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`py-2.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                  role === 'owner' ? 'bg-[#F4845F] text-white border-[#F4845F] shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                🏠 {t.ownerRole || 'Owner'}
              </button>
              <button
                type="button"
                onClick={() => setRole('seeker')}
                className={`py-2.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                  role === 'seeker' ? 'bg-[#F4845F] text-white border-[#F4845F] shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                🎓 {t.seekerRole || 'Seeker'}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#F4845F] hover:bg-[#e07553] text-white py-3 rounded-xl text-xs font-extrabold shadow-md transition mt-2 cursor-pointer"
          >
            {isSignUp ? t.createAccountBtn : t.connectBtn}
          </button>
        </form>

        {/* تبديل بين Login و Signup */}
        <div className="text-center pt-2 border-t border-gray-100">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-[#4285F4] font-bold hover:underline cursor-pointer"
          >
            {isSignUp ? t.haveAccountPrompt : t.noAccountPrompt}
          </button>
        </div>

      </div>
    </div>
  );
};