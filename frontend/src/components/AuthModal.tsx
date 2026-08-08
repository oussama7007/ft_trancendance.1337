import React, { useState } from 'react';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userData: { name: string; email: string; role: 'owner' | 'seeker' }) => void;
  lang: Language;
  t: any;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4 relative">
        
        {/* زر الإغلاق */}
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 font-bold text-sm"
        >
          ✕
        </button>

        {/* العنوان */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900">
            {isSignUp ? (lang === 'ar' ? 'حساب جديد' : 'Sign Up') : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                {lang === 'ar' ? 'الاسم:' : 'Name:'}
              </label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Soufiane"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1">Email:</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1">Password:</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
            />
          </div>

          {/* اختيار الدور (مالك أو باحث) بطريقة خفيفة */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1">Role:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-none ${
                  role === 'owner' ? 'bg-amber-600 text-white border-amber-600' : 'bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                🏠 {lang === 'ar' ? 'مالك' : 'Owner'}
              </button>
              <button
                type="button"
                onClick={() => setRole('seeker')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-none ${
                  role === 'seeker' ? 'bg-amber-600 text-white border-amber-600' : 'bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                🎓 {lang === 'ar' ? 'باحث' : 'Seeker'}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-xl text-xs font-bold transition-none mt-2"
          >
            {isSignUp ? (lang === 'ar' ? 'تسجيل' : 'Submit') : (lang === 'ar' ? 'دخول' : 'Login')}
          </button>
        </form>

        {/* تبديل بين Login و Signup */}
        <div className="text-center pt-1">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[11px] text-amber-700 font-semibold hover:underline"
          >
            {isSignUp ? (lang === 'ar' ? 'عندك حساب؟ دخول' : 'Have an account?') : (lang === 'ar' ? 'ما عندكش حساب؟ تسجل' : 'Create account')}
          </button>
        </div>

      </div>
    </div>
  );
};