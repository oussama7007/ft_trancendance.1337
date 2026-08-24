import React, { useRef, useState } from 'react';
import { Language } from '../types';

export interface RegisterData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;

  password: string;
  confirmPassword: string;

  cin?: string;

  instagram?: string;
  facebook?: string;
  linkedin?: string;

  profilePicture?: File;
}
interface SignUpPageProps {
  lang: Language;
  t: any;

  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  cin: string;

  instagram: string;
  facebook: string;
  linkedin: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setDob: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setCin: (value: string) => void;

  setInstagram: (value: string) => void;
  setFacebook: (value: string) => void;
  setLinkedin: (value: string) => void;

//   onRegister: () => void;
  onRegister: (data: RegisterData) => void;
  onGoToSignIn: () => void;
}

/* =========================================================
   ICONS
========================================================= */

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
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
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2
      19.79 19.79 0 0 1-8.63-3.07
      19.5 19.5 0 0 1-6-6
      19.79 19.79 0 0 1-3.07-8.67
      A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72
      12.84 12.84 0 0 0 .7 2.81
      2 2 0 0 1-.45 2.11L8.09 9.91
      a16 16 0 0 0 6 6l1.27-1.27
      a2 2 0 0 1 2.11-.45
      12.84 12.84 0 0 0 2.81.7
      A2 2 0 0 1 22 16.92z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const IdIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M13 10h5M13 14h5" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.67.33-1 1-1z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V8.999h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.605 0 4.27 2.372 4.27 5.456v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM3.555 8.999h3.558v11.453H3.555V8.999zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-6 h-6"
  >
    <path d="M14.5 4h-5L8 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-1.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const ArrowIcon = () => (
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
);

/* =========================================================
   INPUT COMPONENT
========================================================= */

interface InputProps {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  value: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

const FormInput: React.FC<InputProps> = ({
  icon,
  label,
  required = false,
  value,
  type = 'text',
  placeholder,
  autoComplete,
  onChange,
}) => {
  return (
    <div className="group">
      <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2">
        {label}

        {required && (
          <span className="text-red-500 text-sm leading-none">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <div
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            group-focus-within:text-[#F4845F]
            group-focus-within:scale-110
            transition-all
            duration-200
            pointer-events-none
          "
        >
          {icon}
        </div>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="
            w-full
            bg-gray-50/80
            border
            border-gray-200
            rounded-2xl
            py-3.5
            pl-12
            pr-4
            outline-none
            text-sm
            font-semibold
            text-gray-800
            placeholder:text-gray-400
            transition-all
            duration-200
            hover:border-gray-300
            hover:bg-white
            focus:border-[#F4845F]
            focus:bg-white
            focus:ring-4
            focus:ring-[#F4845F]/10
            focus:shadow-sm
          "
        />
      </div>
    </div>
  );
};

/* =========================================================
   SIGN UP PAGE
========================================================= */

export const SignUpPage: React.FC<SignUpPageProps> = ({
  t,

  firstName,
  lastName,
  dob,
  email,
  phone,
  cin,

  instagram,
  facebook,
  linkedin,

  setFirstName,
  setLastName,
  setDob,
  setEmail,
  setPhone,
  setCin,

  setInstagram,
  setFacebook,
  setLinkedin,

  onRegister,
  onGoToSignIn,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  /* =========================================================
     PROFILE PICTURE
  ========================================================= */

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setProfilePicture(file);

    const previewUrl = URL.createObjectURL(file);
    setProfilePreview(previewUrl);
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);

    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
    }

    setProfilePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /*
      Frontend only for now.

      Later, when backend + database are ready,
      onRegister() will call the API.
    */

    onRegister();
  };

  return (
    <div
      className="
        flex-1
        relative
        overflow-y-auto
        px-4
        py-10
        md:px-8
        bg-[#eef3f7]
      "
    >
      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -top-32
            -left-32
            w-96
            h-96
            rounded-full
            bg-[#F4845F]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-1/3
            -right-40
            w-96
            h-96
            rounded-full
            bg-orange-200/20
            blur-3xl
          "
        />
      </div>

      {/* =================================================
          CARD
      ================================================= */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-3xl
          bg-white/95
          backdrop-blur-xl
          rounded-[2rem]
          border
          border-white
          shadow-[0_25px_70px_rgba(0,0,0,0.10)]
          overflow-hidden
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            relative
            px-7
            md:px-10
            pt-9
            pb-8
            text-center
            border-b
            border-gray-100
            bg-gradient-to-b
            from-orange-50/70
            to-white
          "
        >
          <div
            className="
              mx-auto
              mb-4
              w-16
              h-16
              rounded-2xl
              bg-[#F4845F]
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              shadow-[#F4845F]/25
              rotate-3
            "
          >
            <UserIcon />
          </div>

          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {t.signUp || 'Create Your Account'}
          </h2>

          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            {t.signUpSubtitle ||
              'Create your account and start using iRent today.'}
          </p>

          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="h-1 w-10 rounded-full bg-[#F4845F]" />
            <span className="h-1 w-2 rounded-full bg-orange-200" />
            <span className="h-1 w-2 rounded-full bg-orange-200" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-7 md:p-10"
        >
          {/* =================================================
              REQUIRED SECTION
          ================================================= */}

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#F4845F] flex items-center justify-center">
                <UserIcon />
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">
                  Personal Information
                </h3>

                <p className="text-[11px] text-gray-400 mt-0.5">
                  Required information
                  <span className="text-red-500 ml-1">*</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                icon={<UserIcon />}
                label="First Name"
                required
                value={firstName}
                onChange={setFirstName}
                placeholder="Your first name"
                autoComplete="given-name"
              />

              <FormInput
                icon={<UserIcon />}
                label="Last Name"
                required
                value={lastName}
                onChange={setLastName}
                placeholder="Your last name"
                autoComplete="family-name"
              />

              {/* DATE OF BIRTH */}

              <div className="group">
                <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2">
                  Date of Birth

                  <span className="text-red-500 text-sm">
                    *
                  </span>
                </label>

                <div className="relative">
                  <div
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      group-focus-within:text-[#F4845F]
                      pointer-events-none
                    "
                  >
                    <CalendarIcon />
                  </div>

                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="
                      w-full
                      bg-gray-50/80
                      border
                      border-gray-200
                      rounded-2xl
                      py-3.5
                      pl-12
                      pr-4
                      outline-none
                      text-sm
                      font-semibold
                      text-gray-800
                      transition-all
                      hover:border-gray-300
                      hover:bg-white
                      focus:border-[#F4845F]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#F4845F]/10
                    "
                  />
                </div>
              </div>

              {/* PHONE */}

              <FormInput
                icon={<PhoneIcon />}
                label="Phone Number"
                required
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="+212 6XX XXX XXX"
                autoComplete="tel"
              />

              {/* EMAIL */}

              <div className="md:col-span-2">
                <FormInput
                  icon={<MailIcon />}
                  label="Email Address"
                  required
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>
          </div>

          {/* =================================================
              OPTIONAL INFORMATION
          ================================================= */}

          <div className="border-t border-gray-100 pt-8 mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                <IdIcon />
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">
                  Additional Information
                </h3>

                <p className="text-[11px] text-gray-400 mt-0.5">
                  Optional information
                </p>
              </div>

              <span className="ml-auto text-[10px] font-bold px-3 py-1.5 rounded-full bg-gray-100 text-gray-500">
                OPTIONAL
              </span>
            </div>

            <FormInput
              icon={<IdIcon />}
              label="CIN"
              value={cin}
              onChange={setCin}
              placeholder="Carte d'Identité Nationale"
            />
          </div>

          {/* =================================================
              PROFILE + SOCIAL
          ================================================= */}

          <div className="border-t border-gray-100 pt-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#F4845F] flex items-center justify-center">
                <CameraIcon />
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">
                  Profile & Social Media
                </h3>

                <p className="text-[11px] text-gray-400 mt-0.5">
                  Make your profile more personal
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* =================================================
                  PROFILE PICTURE
              ================================================= */}

              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-gray-500">
                  Profile Picture
                </label>

                <div className="mt-3 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="
                      group
                      relative
                      w-28
                      h-28
                      rounded-full
                      overflow-hidden
                      bg-gradient-to-br
                      from-orange-50
                      to-gray-100
                      border-2
                      border-dashed
                      border-orange-200
                      flex
                      items-center
                      justify-center
                      text-[#F4845F]
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:border-[#F4845F]
                      hover:bg-orange-50
                      hover:shadow-xl
                      hover:shadow-[#F4845F]/15
                    "
                  >
                    {profilePreview ? (
                      <>
                        <img
                          src={profilePreview}
                          alt="Profile preview"
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-black/40
                            opacity-0
                            group-hover:opacity-100
                            transition
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <CameraIcon />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <CameraIcon />

                        <span className="text-[9px] font-black uppercase">
                          Add photo
                        </span>
                      </div>
                    )}

                    {!profilePreview && (
                      <span
                        className="
                          absolute
                          bottom-0
                          right-0
                          w-8
                          h-8
                          rounded-full
                          bg-[#F4845F]
                          text-white
                          flex
                          items-center
                          justify-center
                          border-4
                          border-white
                          shadow-md
                          group-hover:scale-110
                          transition
                        "
                      >
                        +
                      </span>
                    )}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />

                  {profilePicture ? (
                    <button
                      type="button"
                      onClick={handleRemoveProfilePicture}
                      className="
                        mt-3
                        text-[10px]
                        font-bold
                        text-red-500
                        hover:text-red-600
                        hover:underline
                        transition
                      "
                    >
                      Remove photo
                    </button>
                  ) : (
                    <p className="mt-3 text-[10px] text-gray-400 text-center">
                      JPG, PNG or WEBP
                    </p>
                  )}
                </div>
              </div>

              {/* =================================================
                  SOCIAL MEDIA
              ================================================= */}

              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-gray-500">
                  Social Media
                </label>

                <div className="mt-3 space-y-3">
                  {/* INSTAGRAM */}

                  <div className="group relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500">
                      <InstagramIcon />
                    </div>

                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="Instagram username"
                      className="
                        w-full
                        bg-gray-50/80
                        border
                        border-gray-200
                        rounded-xl
                        py-3
                        pl-12
                        pr-4
                        outline-none
                        text-xs
                        font-semibold
                        transition
                        hover:bg-white
                        hover:border-gray-300
                        focus:border-pink-400
                        focus:bg-white
                        focus:ring-4
                        focus:ring-pink-100
                      "
                    />
                  </div>

                  {/* FACEBOOK */}

                  <div className="group relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                      <FacebookIcon />
                    </div>

                    <input
                      type="text"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      placeholder="Facebook username"
                      className="
                        w-full
                        bg-gray-50/80
                        border
                        border-gray-200
                        rounded-xl
                        py-3
                        pl-12
                        pr-4
                        outline-none
                        text-xs
                        font-semibold
                        transition
                        hover:bg-white
                        hover:border-gray-300
                        focus:border-blue-400
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-100
                      "
                    />
                  </div>

                  {/* LINKEDIN */}

                  <div className="group relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700">
                      <LinkedinIcon />
                    </div>

                    <input
                      type="text"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="LinkedIn username"
                      className="
                        w-full
                        bg-gray-50/80
                        border
                        border-gray-200
                        rounded-xl
                        py-3
                        pl-12
                        pr-4
                        outline-none
                        text-xs
                        font-semibold
                        transition
                        hover:bg-white
                        hover:border-gray-300
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-100
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              REQUIRED WARNING
          ================================================= */}

          <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
            <span className="text-red-500 font-black text-sm">
              *
            </span>

            <span className="text-[11px] font-medium text-red-600">
              Fields marked with * are required
            </span>
          </div>

          {/* =================================================
              REGISTER BUTTON
          ================================================= */}

          <button
            type="submit"
            className="
              group
              relative
              w-full
              overflow-hidden
              bg-[#F4845F]
              text-white
              py-4
              rounded-2xl
              font-black
              text-sm
              shadow-xl
              shadow-[#F4845F]/20
              hover:bg-[#e87350]
              hover:-translate-y-0.5
              hover:shadow-2xl
              hover:shadow-[#F4845F]/30
              active:translate-y-0
              transition-all
              duration-200
              cursor-pointer
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {t.createAccountBtn || 'Create Account'}
              <ArrowIcon />
            </span>

            <span
              className="
                absolute
                inset-0
                bg-white/10
                -translate-x-full
                group-hover:translate-x-full
                transition-transform
                duration-700
              "
            />
          </button>
        </form>

        {/* =================================================
            LOGIN
        ================================================= */}

        <div className="px-7 md:px-10 pb-9">
          <div className="h-px bg-gray-100 mb-6" />

          <p className="text-center text-xs text-gray-500 font-medium">
            {t.haveAccount || 'Already have an account?'}{' '}

            <button
              type="button"
              onClick={onGoToSignIn}
              className="
                text-[#F4845F]
                font-black
                hover:text-[#e87350]
                hover:underline
                transition
                cursor-pointer
              "
            >
              {t.signIn || 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};