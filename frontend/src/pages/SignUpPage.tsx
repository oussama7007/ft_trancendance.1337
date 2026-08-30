import React, { useState } from 'react';
import { Language } from '../types';
import { apiService } from '../services/apiService';

export interface RegisterData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  cin?: string;
}

interface SignUpPageProps {
  lang: Language;
  t: any;

  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  cin: string;


  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setDob: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setCin: (value: string) => void;
  setGender: (value: string) => void;


  onRegister: (data: RegisterData) => void;
  onGoToSignIn: () => void;
}

/* =========================================================
   ICONS
========================================================= */

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 1 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const IdIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M13 10h5M13 14h5" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 shrink-0">
    <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3z" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-red-500 shrink-0">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const HouseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 text-[#1E3A5F]">
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" />
    <rect x="10.5" y="12" width="3" height="3" fill="currentColor" stroke="none" className="text-[#F4845F]" />
  </svg>
);

/* =========================================================
   SMALL HELPERS
========================================================= */

type Accent = 'orange' | 'blue' | 'navy';

const accentStyles: Record<
  Accent,
  { iconFocus: string; inputFocus: string }
> = {
  orange: {
    iconFocus: 'group-focus-within:text-[#F4845F]',
    inputFocus:
      'focus:border-[#F4845F] focus:bg-white focus:ring-4 focus:ring-[#F4845F]/10',
  },
  blue: {
    iconFocus: 'group-focus-within:text-[#3B82F6]',
    inputFocus:
      'focus:border-[#3B82F6] focus:bg-white focus:ring-4 focus:ring-[#3B82F6]/10',
  },
  navy: {
    iconFocus: 'group-focus-within:text-[#1E293B]',
    inputFocus:
      'focus:border-[#1E293B] focus:bg-white focus:ring-4 focus:ring-[#1E293B]/10',
  },
};

function getPasswordChecks(pw: string) {
  return [
    {
      label: 'At least 8 characters',
      met: pw.length >= 8,
    },
    {
      label: 'Include uppercase and lowercase',
      met: /[a-z]/.test(pw) && /[A-Z]/.test(pw),
    },
    {
      label: 'Include number or special character',
      met:
        /[0-9]/.test(pw) ||
        /[^A-Za-z0-9]/.test(pw),
    },
  ];
}

function getPasswordStrength(pw: string) {
  const score = getPasswordChecks(pw).filter(
    (c) => c.met
  ).length;

  const label = !pw
    ? ''
    : score <= 1
    ? 'Weak'
    : score === 2
    ? 'Fair'
    : 'Strong';

  const barColor =
    score <= 1
      ? 'bg-red-400'
      : score === 2
      ? 'bg-orange-400'
      : 'bg-green-500';

  const textColor =
    score <= 1
      ? 'text-red-500'
      : score === 2
      ? 'text-orange-500'
      : 'text-green-600';

  return {
    score,
    label,
    barColor,
    textColor,
  };
}

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
  accent?: Accent;
  isError?: boolean;
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
  accent = 'orange',
  isError = false,
  onChange,
}) => {
  const a = accentStyles[accent];

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
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 ${
            isError
              ? 'text-red-400'
              : a.iconFocus
          } group-focus-within:scale-110 transition-all duration-200 pointer-events-none`}
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
          className={`w-full bg-gray-50/80 border ${
            isError
              ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'border-gray-200 hover:border-gray-300 hover:bg-white ' +
                a.inputFocus
          } rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-semibold text-gray-800 placeholder:text-gray-400 transition-all duration-200 focus:shadow-sm`}
        />
      </div>
    </div>
  );
};

/* =========================================================
   STEP INDICATOR
========================================================= */

const STEP_META = [
  { number: 1, label: 'Personal Info' },
  { number: 2, label: 'Verification' },
  { number: 3, label: 'Password Setup' },
];

const StepIndicator: React.FC<{ step: number }> = ({
  step,
}) => (
  <div className="flex items-center justify-center mt-6">
    {STEP_META.map((s, idx) => (
      <React.Fragment key={s.number}>
        <div className="flex flex-col items-center gap-1.5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${
              step === s.number
                ? 'bg-[#F4845F] text-white shadow-lg shadow-[#F4845F]/30 scale-110'
                : step > s.number
                ? 'bg-[#F4845F] text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {step > s.number ? '✓' : s.number}
          </div>

          <span
            className={`text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${
              step === s.number
                ? 'text-[#F4845F]'
                : 'text-gray-400'
            }`}
          >
            {s.label}
          </span>
        </div>

        {idx < STEP_META.length - 1 && (
          <div
            className={`h-0.5 w-10 sm:w-16 md:w-24 mb-5 mx-1 transition-all duration-300 ${
              step > s.number
                ? 'bg-[#F4845F]'
                : 'bg-gray-200'
            }`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

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
  gender,
  setGender,
  setFirstName,
  setLastName,
  setDob,
  setEmail,
  setPhone,
  setCin,
  onRegister,
  onGoToSignIn,
}) => {
  const [step, setStep] = useState<number>(1);

  const [registrationSessionId, setRegistrationSessionId] =
    useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [verificationCode, setVerificationCode] =
    useState('');

  const [identifier, setIdentifier] = useState('');

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [codeSent, setCodeSent] = useState(false);

  const passwordChecks =
    getPasswordChecks(password);

  const strength =
    getPasswordStrength(password);

  const isEmailIdentifier =
    identifier.includes('@');

  /*
   * PREVIOUS IMPLEMENTATION
   *
   * const handleSubmit = (
   *   e: React.FormEvent<HTMLFormElement>
   * ) => {
   *   e.preventDefault();
   *   setErrorMessage(null);
   *
   *   if (step < 3) {
   *     if (step === 2) {
   *       if (isEmailIdentifier) {
   *         setEmail(identifier);
   *         setPhone('');
   *       } else {
   *         setPhone(identifier);
   *         setEmail('');
   *       }
   *     }
   *     setStep(step + 1);
   *   } else {
   *     if (password !== confirmPassword) {
   *       setErrorMessage(
   *         "Passwords do not match! Please check again."
   *       );
   *       return;
   *     }
   *
   *     onRegister({
   *       firstName,
   *       lastName,
   *       dateOfBirth: dob,
   *       email: isEmailIdentifier ? identifier : '',
   *       phone: !isEmailIdentifier ? identifier : '',
   *       password,
   *       confirmPassword,
   *       cin,
   *     });
   *   }
   * };
   */

  /* =========================================================
     NEW REAL BACKEND FLOW
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      /* STEP 1 */
      if (step === 1) {
        const result =
          await apiService.startRegistration({
            firstName,
            lastName,
            dateOfBirth: dob,
            gender,
            cin: cin || undefined,
          });

        setRegistrationSessionId(
          result.registrationSessionId
        );

        setStep(2);
        return;
      }

      /* STEP 2 */
      if (step === 2) {
        if (!registrationSessionId) {
          setErrorMessage(
            'Registration session is missing.'
          );
          return;
        }

        if (!identifier.trim()) {
          setErrorMessage(
            'Please enter your email or phone number.'
          );
          return;
        }

        if (!codeSent) {
          setErrorMessage(
            'Please click "Send Code" first.'
          );
          return;
        }

        if (!verificationCode.trim()) {
          setErrorMessage(
            'Please enter the verification code.'
          );
          return;
        }

        const isEmail =
          identifier.includes('@');

        if (isEmail) {
          setEmail(identifier);
          setPhone('');
        } else {
          setPhone(identifier);
          setEmail('');
        }

        await apiService.verifyRegistration({
          registrationSessionId,
          code: verificationCode,
        });

        setStep(3);
        return;
      }

      /* STEP 3 */
      if (!registrationSessionId) {
        setErrorMessage(
          'Registration session is missing.'
        );
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage(
          'Passwords do not match! Please check again.'
        );
        return;
      }

      await apiService.finishRegistration({
        registrationSessionId,
        password,
        passwordConfirmation:
          confirmPassword,
      });
      setErrorMessage(null);
      onRegister({
        firstName,
        lastName,
        dateOfBirth: dob,
        gender,
        email: isEmailIdentifier
          ? identifier
          : '',
        phone: !isEmailIdentifier
          ? identifier
          : '',
        password,
        confirmPassword,
        cin,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong.'
      );
    }
  };

  /* =========================================================
     SEND VERIFICATION CODE
  ========================================================= */

  const handleSendCode = async () => {
    setErrorMessage(null);

    if (!registrationSessionId) {
      setErrorMessage(
        'Registration session is missing.'
      );
      return;
    }

    if (!identifier.trim()) {
      setErrorMessage(
        'Please enter your email or phone number.'
      );
      return;
    }

    try {
      const isEmail =
        identifier.includes('@');

      if (isEmail) {
        setEmail(identifier);
        setPhone('');
      } else {
        setPhone(identifier);
        setEmail('');
      }

      await apiService.registerContact({
        registrationSessionId,
        type: isEmail ? 'email' : 'phone',
        value: identifier,
      });

      setCodeSent(true);
      setErrorMessage(
        'Verification code sent. For now, use 0000.'
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to send verification code.'
      );
    }
  };

  return (
    <div className="flex-1 relative overflow-y-auto px-4 py-10 md:px-8 bg-white">
      <div className="relative mx-auto w-full max-w-3xl bg-white rounded-[2rem] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* HEADER */}
        <div className="relative px-7 md:px-10 pt-9 pb-8 text-center border-b border-gray-100 bg-gradient-to-b from-orange-50/70 to-white">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HouseIcon />
            <span className="text-xl font-black text-gray-900 tracking-tight">
              {t.appName || 'iRent'}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            <span className="text-gray-900">
              {t.signUpTitlePart1 || 'Create '}
            </span>
            <span className="text-[#F4845F]">
              {t.signUpTitlePart2 || 'Your Account'}
            </span>
          </h2>

          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            {t.signUpSubtitle ||
              'Join us today and find your perfect place'}
          </p>

          <StepIndicator step={step} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-7 md:p-10"
        >

          {/* STEP 1 */}
          {step === 1 && (
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
                    Required information{' '}
                    <span className="text-red-500 ml-1">
                      *
                    </span>
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
                  accent="orange"
                />

                <FormInput
                  icon={<UserIcon />}
                  label="Last Name"
                  required
                  value={lastName}
                  onChange={setLastName}
                  placeholder="Your last name"
                  autoComplete="family-name"
                  accent="orange"
                />

                <div className="group md:col-span-2">
                  <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2">
                    Date of Birth{' '}
                    <span className="text-red-500 text-sm">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F4845F] pointer-events-none">
                      <CalendarIcon />
                    </div>

                    <input
                      type="date"
                      value={dob}
                      onChange={(e) =>
                        setDob(e.target.value)
                      }
                      required
                      className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-semibold text-gray-800 transition-all hover:border-gray-300 hover:bg-white focus:border-[#F4845F] focus:bg-white focus:ring-4 focus:ring-[#F4845F]/10"
                    />
                  </div>
                </div>
              </div>
        <div className="group md:col-span-2">
          <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2">
            Gender
            <span className="text-red-500 text-sm">
              *
            </span>
          </label>

          <div className="grid grid-cols-2 gap-4">

            {/* HOMME */}
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer group/gender ${
                gender === 'male'
                  ? 'border-[#F4845F] bg-orange-50 shadow-md shadow-[#F4845F]/10'
                  : 'border-gray-200 bg-gray-50/80 hover:border-[#F4845F]/50 hover:bg-white hover:-translate-y-0.5'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  gender === 'male'
                    ? 'bg-[#F4845F] text-white scale-105'
                    : 'bg-gray-100 text-gray-400 group-hover/gender:text-[#F4845F] group-hover/gender:bg-orange-50'
                }`}
              >
                <UserIcon />
              </div>

              <div className="text-left">
                <p
                  className={`text-sm font-black transition-colors ${
                    gender === 'male'
                      ? 'text-[#F4845F]'
                      : 'text-gray-700 group-hover/gender:text-[#F4845F]'
                  }`}
                >
                  Homme
                </p>

                <p className="text-[10px] text-gray-400 mt-0.5">
                  Male
                </p>
              </div>

              {/* Check */}
              <div
                className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  gender === 'male'
                    ? 'border-[#F4845F] bg-[#F4845F] text-white'
                    : 'border-gray-300'
                }`}
              >
                {gender === 'male' && (
                  <span className="text-[10px] font-black">
                    ✓
                  </span>
                )}
              </div>
            </button>

            {/* FEMME */}
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer group/gender ${
                gender === 'female'
                  ? 'border-[#F4845F] bg-orange-50 shadow-md shadow-[#F4845F]/10'
                  : 'border-gray-200 bg-gray-50/80 hover:border-[#F4845F]/50 hover:bg-white hover:-translate-y-0.5'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  gender === 'female'
                    ? 'bg-[#F4845F] text-white scale-105'
                    : 'bg-gray-100 text-gray-400 group-hover/gender:text-[#F4845F] group-hover/gender:bg-orange-50'
                }`}
              >
                <UserIcon />
              </div>

              <div className="text-left">
                <p
                  className={`text-sm font-black transition-colors ${
                    gender === 'female'
                      ? 'text-[#F4845F]'
                      : 'text-gray-700 group-hover/gender:text-[#F4845F]'
                  }`}
                >
                  Femme
                </p>

                <p className="text-[10px] text-gray-400 mt-0.5">
                  Female
                </p>
              </div>

              {/* Check */}
              <div
                className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  gender === 'female'
                    ? 'border-[#F4845F] bg-[#F4845F] text-white'
                    : 'border-gray-300'
                }`}
              >
                {gender === 'female' && (
                  <span className="text-[10px] font-black">
                    ✓
                  </span>
                )}
              </div>
            </button>

          </div>
        </div>



              <div className="border-t border-gray-100 pt-6 mt-6">
                <FormInput
                  icon={<IdIcon />}
                  label="CIN (Optional)"
                  value={cin}
                  onChange={setCin}
                  placeholder="Carte d'Identité Nationale"
                  accent="orange"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3B82F6] flex items-center justify-center">
                  <LockIcon />
                </div>

                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">
                    Account Verification
                  </h3>

                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Enter your email or phone number
                  </p>
                </div>
              </div>

              <div className="group">
                <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2">
                  Email or Phone Number{' '}
                  <span className="text-red-500 text-sm">
                    *
                  </span>
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3B82F6] transition-all duration-200 pointer-events-none">
                    {isEmailIdentifier ||
                    identifier.length === 0 ||
                    isNaN(
                      Number(
                        identifier.charAt(0)
                      )
                    ) ? (
                      <MailIcon />
                    ) : (
                      <PhoneIcon />
                    )}
                  </div>

                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setCodeSent(false);
                      setVerificationCode('');
                      setErrorMessage(null);
                    }}
                    placeholder="name@example.com or +212 6..."
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-semibold text-gray-800 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300 hover:bg-white focus:border-[#3B82F6] focus:bg-white focus:ring-4 focus:ring-[#3B82F6]/10"
                  />
                </div>
              </div>

              {identifier.trim().length > 0 && (
                <div className="mt-3 flex items-center gap-2.5 px-3.5 py-3 bg-blue-50 border border-blue-100 rounded-2xl text-[#3B82F6] animate-fadeIn">
                  <ShieldIcon />

                  <span className="text-[11px] font-medium text-blue-700 leading-relaxed">
                    {isEmailIdentifier
                      ? "✓ System detected: We'll send a verification code to this Email."
                      : "✓ System detected: We'll send an SMS verification code to this Phone Number."}
                  </span>
                </div>
              )}

              {/* VERIFICATION CODE */}
              <div className="group mt-5">
                <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2">
                  Verification Code{' '}
                  <span className="text-red-500 text-sm">
                    *
                  </span>
                </label>

                <div className="relative flex items-center">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3B82F6] pointer-events-none">
                    <LockIcon />
                  </div>

                  <input
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) =>
                      setVerificationCode(
                        e.target.value
                      )}
                    placeholder="0000"
                    maxLength={4}
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-24 outline-none text-sm font-semibold text-gray-800 focus:border-[#3B82F6] focus:bg-white focus:ring-4 focus:ring-[#3B82F6]/10"
                  />

                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="absolute right-2 px-4 py-2 bg-[#3B82F6] hover:bg-[#2f6fed] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    {codeSent
                      ? 'Resend'
                      : 'Send Code'}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-3 mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 shadow-sm">
                  <AlertIcon />
                  <span className="text-xs font-bold">
                    {errorMessage}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="mb-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#1E293B] flex items-center justify-center">
                  <LockIcon />
                </div>

                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">
                    Set Your Password
                  </h3>

                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Protect your account with a secure password
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 shadow-sm">
                  <AlertIcon />
                  <span className="text-xs font-bold">
                    {errorMessage}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 p-3.5 bg-gray-50 border border-gray-200 rounded-2xl">
                <span className="text-green-500 font-bold">
                  ✓
                </span>

                <span className="text-xs font-semibold text-gray-700">
                  {identifier} (
                  {isEmailIdentifier
                    ? 'Verified via Email'
                    : 'Verified via Phone'}
                  )
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <FormInput
                    icon={<LockIcon />}
                    label="Create Password"
                    required
                    type="password"
                    value={password}
                    onChange={(val) => {
                      setPassword(val);

                      if (errorMessage) {
                        setErrorMessage(null);
                      }
                    }}
                    placeholder="••••••••"
                    accent="navy"
                    isError={Boolean(
                      errorMessage
                    )}
                  />

                  {password && (
                    <div className="flex items-center gap-2 mt-2.5 px-1">
                      <div className="flex gap-1 flex-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              i < strength.score
                                ? strength.barColor
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>

                      <span
                        className={`text-[10px] font-black uppercase ${strength.textColor}`}
                      >
                        {strength.label}
                      </span>
                    </div>
                  )}
                </div>

                <FormInput
                  icon={<LockIcon />}
                  label="Confirm Password"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(val) => {
                    setConfirmPassword(val);

                    if (errorMessage) {
                      setErrorMessage(null);
                    }
                  }}
                  placeholder="••••••••"
                  accent="navy"
                  isError={Boolean(
                    errorMessage
                  )}
                />

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                  {passwordChecks.map((c) => (
                    <div
                      key={c.label}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
                          c.met
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        ✓
                      </span>

                      <span
                        className={`text-[11px] font-medium ${
                          c.met
                            ? 'text-gray-700'
                            : 'text-gray-400'
                        }`}
                      >
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REQUIRED WARNING */}
          <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
            <span className="text-red-500 font-black text-sm">
              *
            </span>

            <span className="text-[11px] font-medium text-red-600">
              Fields marked with * are required
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => {
                  setStep(step - 1);
                  setErrorMessage(null);
                }}
                className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-black text-sm transition-all cursor-pointer"
              >
                Back
              </button>
            )}

            {step === 1 && (
              <button
                type="submit"
                className="group relative w-full overflow-hidden bg-[#F4845F] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-[#F4845F]/20 hover:bg-[#e87350] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#F4845F]/30 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Next
                  <ArrowIcon />
                </span>

                <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            )}

            {step === 2 && (
              <button
                type="submit"
                className="group relative w-2/3 overflow-hidden bg-[#3B82F6] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-[#3B82F6]/20 hover:bg-[#2f6fed] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#3B82F6]/30 transition-all duration-200 cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Verify & Continue
                  <ArrowIcon />
                </span>

                <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                className="group relative w-2/3 overflow-hidden bg-[#1E293B] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-[#1E293B]/20 hover:bg-[#0f172a] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#1E293B]/30 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t.createAccountBtn || 'Finish'} 🎉
                </span>

                <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            )}
          </div>
        </form>

        {/* LOGIN FOOTER */}
        <div className="px-7 md:px-10 pb-9">
          <div className="h-px bg-gray-100 mb-6" />

          <p className="text-center text-xs text-gray-500 font-medium">
            {t.haveAccount ||
              'Already have an account?'}{' '}

            <button
              type="button"
              onClick={onGoToSignIn}
              className="text-[#F4845F] font-black hover:text-[#e87350] hover:transition cursor-pointer"
            >
              {t.signIn || 'Login'}
            </button>
          </p>
        </div>
      </div>

      {/* SAFETY NOTE */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
          <LockIcon />

          <span className="text-xs font-semibold text-gray-700">
            Your data is safe with us
          </span>
        </div>
      </div>
    </div>
  );
};