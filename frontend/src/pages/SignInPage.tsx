import React from 'react';
import { Language } from '../types';

interface SignInPageProps {
  lang: Language;
  t: any;
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onLogin: () => void;
  onGoToSignUp: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({
  t,
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  onGoToSignUp,
}) => {
  return (
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
            onLogin();
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
            autoComplete="email"
            className="w-full bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100 outline-none text-sm font-medium focus:border-[#F4845F] focus:bg-white transition"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={onGoToSignUp}
            className="text-[#F4845F] font-black underline cursor-pointer hover:text-[#e07553] transition"
          >
            {t.signUp}
          </button>
        </p>

      </div>
    </div>
  );
};