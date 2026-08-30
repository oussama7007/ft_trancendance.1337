import React, { useState } from 'react';
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

/* =========================================================
   HOUSE / iRENT LOGO
========================================================= */

const HouseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className="w-6 h-6 text-[#1E3A5F]"
  >
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" />
    <rect
      x="10.5"
      y="12"
      width="3"
      height="3"
      fill="currentColor"
      stroke="none"
      className="text-[#F4845F]"
    />
  </svg>
);

export const SignInPage: React.FC<SignInPageProps> = ({
  t,
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  onGoToSignUp,
}) => {
    const isEmailIdentifier =
      email.length === 0 || email.includes('@');
    const [errorMessage, setErrorMessage] = useState('');
    const validateIdentifier = () => {
  const value = email.trim();

  // Empty field
  if (!value) {
    setErrorMessage('Please enter your email or phone number.');
    return false;
  }

  // If user is using email
  if (value.includes('@')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
  }

  // If user is using phone
  else {
    const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/;

    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      setErrorMessage('Please enter a valid phone number.');
      return false;
    }
  }

  setErrorMessage('');
  return true;
};
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-10 md:px-8 bg-white">

      {/* =====================================================
         MAIN CARD
      ===================================================== */}
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* =====================================================
           HEADER
        ===================================================== */}
        <div className="relative px-7 md:px-10 pt-9 pb-8 text-center border-b border-gray-100 bg-gradient-to-b from-orange-50/70 to-white">

          {/* LOGO */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <HouseIcon />

            <span className="text-xl font-black text-gray-900 tracking-tight">
              {t.appName || 'iRent'}
            </span>
          </div>

        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          <span className="text-gray-900">Welcome Back, </span>
          <span className="text-[#F4845F]">Your Home Awaits</span>
        </h2>

        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          Sign in to iRent and discover your next perfect place.
        </p>
        </div>

        {/* =====================================================
           FORM
        ===================================================== */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (validateIdentifier()) {
              onLogin();
            }
          }}
          className="p-7 md:p-10"
        >

{/* EMAIL OR PHONE */}
<div className="group mb-5">

  <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2">
    Email or Phone Number
    <span className="text-red-500 text-sm leading-none">
      *
    </span>
  </label>

  <div className="relative">

    {/* DYNAMIC ICON */}
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F4845F] group-focus-within:scale-110 transition-all duration-200 pointer-events-none">

      {isEmailIdentifier ? (

        /* EMAIL ICON */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>

      ) : (

        /* PHONE ICON */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>

      )}

    </div>

    {/* EMAIL OR PHONE INPUT */}
    <input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="name@example.com or +212 6..."
      autoComplete="username"
      required
      className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-semibold text-gray-800 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300 hover:bg-white focus:border-[#F4845F] focus:bg-white focus:ring-4 focus:ring-[#F4845F]/10"
    />

  </div>

  {/* DYNAMIC DETECTION MESSAGE */}
  {email.trim().length > 0 && (
    <p className="mt-2 text-[11px] font-medium text-gray-400">

      {isEmailIdentifier
        ? 'Signing in with Email'
        : 'Signing in with Phone Number'}

    </p>
  )}
  {errorMessage && (
    <p className="mt-2 text-[11px] font-semibold text-red-500">
      {errorMessage}
    </p>
  )}

</div>

          {/* PASSWORD */}
          <div className="group mb-6">

            <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2">
              {t.password || 'Password'}
              <span className="text-red-500 text-sm leading-none">
                *
              </span>
            </label>

            <div className="relative">

              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F4845F] group-focus-within:scale-110 transition-all duration-200 pointer-events-none">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                  />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.password || '••••••••'}
                autoComplete="current-password"
                required
                className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-semibold text-gray-800 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300 hover:bg-white focus:border-[#F4845F] focus:bg-white focus:ring-4 focus:ring-[#F4845F]/10"
              />

            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="group relative w-full overflow-hidden bg-[#F4845F] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-[#F4845F]/20 hover:bg-[#e87350] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#F4845F]/30 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {t.connectBtn || 'Sign In'}

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>

            <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          {/* REQUIRED WARNING */}
          <div className="flex items-center gap-2 mt-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
            <span className="text-red-500 font-black text-sm">
              *
            </span>

            <span className="text-[11px] font-medium text-red-600">
              Fields marked with * are required
            </span>
          </div>

        </form>

        {/* =====================================================
           FOOTER
        ===================================================== */}
        <div className="px-7 md:px-10 pb-9">

          <div className="h-px bg-gray-100 mb-6" />

          <p className="text-center text-xs text-gray-500 font-medium">
            {t.noAccount || "Don't have an account?"}{' '}

            <button
              type="button"
              onClick={onGoToSignUp}
              className="text-[#F4845F] font-black hover:text-[#e87350] hover:underline transition cursor-pointer"
            >
              {t.signUp || 'Sign Up'}
            </button>
          </p>

        </div>

      </div>
    </div>
  );
};