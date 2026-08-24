import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Listing,
  Language,
  User,
} from '../types';

import { AddModal } from '../components/AddModal';

interface ProfilePageProps {
  lang: Language;
  listings: Listing[];
  onBackToHome?: () => void;
  onAddListing: (newListing: Listing) => void;
  t: any;
  currentUser: User | null;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  lang,
  listings,
  onBackToHome,
  onAddListing,
  t,
  currentUser,
}) => {
  /*
   * =========================================================
   * STATE
   * =========================================================
   */

  const [activeTab, setActiveTab] = useState<
    'overview' | 'listings' | 'stats' | 'settings'
  >('overview');

  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  /*
   * =========================================================
   * LANGUAGE
   * =========================================================
   */

  const isArabic = lang === 'ar';
  const isFrench = lang === 'fr';

  /*
   * =========================================================
   * USER DATA
   * =========================================================
   *
   * Everything here comes from currentUser.
   *
   * currentUser should contain data coming from:
   *
   * Signup -> Backend -> Login -> currentUser -> Profile
   *
   * =========================================================
   */

  const fullName =
    currentUser?.fullName?.trim() || 'User';

  const nameParts = fullName.split(/\s+/);

  const firstName =
    nameParts[0] ||
    (isArabic ? 'المستخدم' : 'User');

  const lastName =
    nameParts.slice(1).join(' ') || '';

  const email =
    currentUser?.email || '';

  const phone =
    currentUser?.phone || '';

  const bio =
    currentUser?.bio || '';

  const profilePic =
    currentUser?.profilePic || '';

  /*
   * =========================================================
   * SETTINGS DATA
   * =========================================================
   */

  const [settingsData, setSettingsData] = useState({
    firstName,
    lastName,
    email,
    phone,
    bio,
  });

  /*
   * IMPORTANT:
   * If currentUser changes after login/signup,
   * update the profile settings automatically.
   */

  useEffect(() => {
    setSettingsData({
      firstName,
      lastName,
      email,
      phone,
      bio,
    });
  }, [
    firstName,
    lastName,
    email,
    phone,
    bio,
  ]);

  /*
   * =========================================================
   * USER LISTINGS
   * =========================================================
   *
   * Only listings belonging to the logged-in user.
   */

  const myListings = useMemo(() => {
    if (!currentUser?.id) {
      return [];
    }

    return listings.filter(
      (listing) =>
        String(listing.ownerId) ===
        String(currentUser.id)
    );
  }, [
    listings,
    currentUser,
  ]);

  /*
   * =========================================================
   * SAVE SETTINGS
   * =========================================================
   */

  const handleSaveSettings = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    /*
     * IMPORTANT:
     *
     * This currently changes the local UI only.
     *
     * Once backend is connected, you should send
     * settingsData to your API here.
     */

    setIsSaved(true);

    window.setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  /*
   * =========================================================
   * ADD LISTING
   * =========================================================
   */

  const handleAdd = (
    newListing: Listing
  ) => {
    if (!currentUser) {
      return;
    }

    /*
     * Force ownerId to the currently logged-in user.
     */

    const listingWithOwner: Listing = {
      ...newListing,
      ownerId: currentUser.id,
    };

    onAddListing(listingWithOwner);

    setShowModal(false);

    /*
     * Open My Listings after creating listing.
     */

    setActiveTab('listings');
  };

  /*
   * =========================================================
   * TRANSLATIONS
   * =========================================================
   */

  const text = {
    overview: isArabic
      ? 'نظرة عامة'
      : isFrench
      ? 'Vue d’ensemble'
      : 'Overview',

    myListings: isArabic
      ? 'عقاراتي'
      : isFrench
      ? 'Mes biens'
      : 'My Listings',

    stats: isArabic
      ? 'الإحصائيات'
      : isFrench
      ? 'Statistiques'
      : 'Analytics',

    settings: isArabic
      ? 'الإعدادات'
      : isFrench
      ? 'Paramètres'
      : 'Settings',

    verified: isArabic
      ? 'حساب موثّق'
      : isFrench
      ? 'Compte vérifié'
      : 'Verified account',

    active: isArabic
      ? 'نشط'
      : isFrench
      ? 'Actif'
      : 'Active',

    addListing:
      t?.addListing ||
      (isArabic
        ? 'إضافة عقار'
        : isFrench
        ? 'Ajouter un bien'
        : 'Add Listing'),

    totalListings: isArabic
      ? 'إجمالي العقارات'
      : isFrench
      ? 'Biens publiés'
      : 'Total listings',

    messages: isArabic
      ? 'المحادثات'
      : isFrench
      ? 'Messages'
      : 'Messages',

    views: isArabic
      ? 'المشاهدات'
      : isFrench
      ? 'Vues'
      : 'Views',

    saved: isArabic
      ? 'المفضلة'
      : isFrench
      ? 'Favoris'
      : 'Saved',

    recentListings: isArabic
      ? 'آخر العقارات'
      : isFrench
      ? 'Derniers biens'
      : 'Recent listings',

    noListings: isArabic
      ? 'لم تقم بإضافة أي عقار بعد'
      : isFrench
      ? 'Vous n’avez encore publié aucun bien'
      : 'You have not published any listings yet',

    addFirst: isArabic
      ? 'أضف أول عقار'
      : isFrench
      ? 'Ajouter votre premier bien'
      : 'Add your first listing',

    editProfile: isArabic
      ? 'تعديل الملف الشخصي'
      : isFrench
      ? 'Modifier le profil'
      : 'Edit profile',

    profileInfo: isArabic
      ? 'معلومات الحساب'
      : isFrench
      ? 'Informations du compte'
      : 'Profile information',

    firstName: isArabic
      ? 'الاسم الشخصي'
      : isFrench
      ? 'Prénom'
      : 'First name',

    lastName: isArabic
      ? 'الاسم العائلي'
      : isFrench
      ? 'Nom'
      : 'Last name',

    email: isArabic
      ? 'البريد الإلكتروني'
      : isFrench
      ? 'Adresse e-mail'
      : 'Email address',

    phone: isArabic
      ? 'رقم الهاتف'
      : isFrench
      ? 'Téléphone'
      : 'Phone',

    bio: isArabic
      ? 'نبذة عني'
      : isFrench
      ? 'Biographie'
      : 'About me',

    save: isArabic
      ? 'حفظ التغييرات'
      : isFrench
      ? 'Enregistrer'
      : 'Save changes',

    savedSuccess: isArabic
      ? 'تم حفظ التغييرات بنجاح'
      : isFrench
      ? 'Modifications enregistrées'
      : 'Changes saved successfully',

    back: isArabic
      ? 'العودة'
      : isFrench
      ? 'Retour'
      : 'Back',

    noAccount: isArabic
      ? 'يجب تسجيل الدخول لرؤية الملف الشخصي'
      : isFrench
      ? 'Connectez-vous pour voir votre profil'
      : 'Please sign in to view your profile',

    manageListings: isArabic
      ? 'إدارة العقارات والمنشورات الخاصة بك'
      : isFrench
      ? 'Gérez vos biens et publications'
      : 'Manage your properties and listings',

    accountCreated: isArabic
      ? 'الحساب نشط'
      : isFrench
      ? 'Compte actif'
      : 'Account active',

    member: isArabic
      ? 'عضو منذ 2026'
      : isFrench
      ? 'Membre depuis 2026'
      : 'Member since 2026',

    emptyStats: isArabic
      ? 'ستظهر الإحصائيات الحقيقية بعد ربط الـ backend'
      : isFrench
      ? 'Les statistiques réelles apparaîtront après connexion au backend'
      : 'Real analytics will appear once the backend is connected',

    profileDescription: isArabic
      ? 'حسابك جاهز لإدارة العقارات والتواصل مع المستخدمين.'
      : isFrench
      ? 'Votre compte est prêt pour gérer vos biens et communiquer avec les utilisateurs.'
      : 'Your account is ready to manage listings and communicate with users.',

    updateProfileDescription: isArabic
      ? 'قم بتحديث المعلومات الظاهرة في ملفك الشخصي.'
      : isFrench
      ? 'Mettez à jour les informations de votre profil.'
      : 'Update the information displayed on your profile.',

    emailBackend: isArabic
      ? 'يجب تغيير البريد الإلكتروني بشكل آمن من خلال الـ backend.'
      : isFrench
      ? 'La modification de l’e-mail doit être gérée par le backend.'
      : 'Email changes should be handled securely by the backend.',

    publishedProperties: isArabic
      ? 'العقارات المنشورة'
      : isFrench
      ? 'Biens publiés'
      : 'Published properties',

    activeConversations: isArabic
      ? 'المحادثات النشطة'
      : isFrench
      ? 'Conversations actives'
      : 'Active conversations',

    listingPerformance: isArabic
      ? 'أداء العقارات'
      : isFrench
      ? 'Performance des biens'
      : 'Listing performance',

    last30Days: isArabic
      ? 'آخر 30 يومًا'
      : isFrench
      ? '30 derniers jours'
      : 'Last 30 days',

    writeAboutYou: isArabic
      ? 'اكتب نبذة قصيرة عنك...'
      : isFrench
      ? 'Écrivez une courte présentation...'
      : 'Write a short description about yourself...',
  };

  /*
   * =========================================================
   * NOT LOGGED IN
   * =========================================================
   */

  if (!currentUser) {
    return (
      <div
        className={`min-h-screen bg-[#f6f7f9] flex items-center justify-center p-6 ${
          isArabic ? 'rtl' : 'ltr'
        }`}
      >
        <div className="max-w-md w-full bg-white rounded-[2rem] p-10 text-center shadow-xl border border-gray-100">

          <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-50 flex items-center justify-center text-4xl mb-6">
            👤
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-3">
            {text.noAccount}
          </h2>

          <button
            type="button"
            onClick={onBackToHome}
            className="mt-6 px-6 py-3 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-[#F4845F] transition"
          >
            {text.back}
          </button>

        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * MAIN PROFILE
   * =========================================================
   */

  return (
    <div
      className={`min-h-screen bg-[#f6f7f9] px-4 py-6 md:px-8 md:py-10 ${
        isArabic
          ? 'rtl text-right'
          : 'ltr text-left'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ===================================================
            PROFILE HERO
        =================================================== */}

        <section className="relative overflow-hidden rounded-[2.5rem] bg-gray-950 text-white shadow-2xl">

          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#F4845F]/20 blur-3xl" />

          <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-orange-400/10 blur-3xl" />

          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

          <div className="relative z-10 p-6 md:p-10">

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

              {/* USER */}

              <div className="flex items-center gap-5">

                <div className="relative shrink-0">

                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt={fullName}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] object-cover border-4 border-white/10 shadow-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] bg-gradient-to-br from-[#F4845F] to-orange-500 flex items-center justify-center text-4xl font-black shadow-2xl">
                      {firstName
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-gray-950" />

                </div>

                <div className="space-y-2">

                  <div className="flex flex-wrap items-center gap-2">

                    <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                      {fullName}
                    </h1>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[10px] font-black">
                      ✓ {text.verified}
                    </span>

                  </div>

                  <p className="text-sm text-gray-400">
                    {email}
                  </p>

                  {phone && (
                    <p className="text-xs text-gray-500">
                      📱 {phone}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">

                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">
                      {text.accountCreated}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">
                      {text.member}
                    </span>

                  </div>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab('settings')
                  }
                  className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition font-bold text-xs"
                >
                  ✏️ {text.editProfile}
                </button>

                <button
                  type="button"
                  onClick={onBackToHome}
                  className="px-5 py-3 rounded-2xl bg-[#F4845F] hover:bg-orange-500 transition shadow-lg shadow-orange-500/20 font-black text-xs"
                >
                  {text.back} →
                </button>

              </div>

            </div>

          </div>
        </section>

        {/* ===================================================
            QUICK STATS
        =================================================== */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="group bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all">

            <div className="flex items-center justify-between mb-5">

              <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center text-xl">
                🏠
              </div>

              <span className="text-[10px] font-black text-emerald-500">
                +12%
              </span>

            </div>

            <p className="text-xs text-gray-400 font-bold">
              {text.totalListings}
            </p>

            <p className="text-3xl font-black text-gray-900 mt-1">
              {myListings.length}
            </p>

          </div>

          <div className="group bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all">

            <div className="flex items-center justify-between mb-5">

              <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">
                💬
              </div>

              <span className="text-[10px] font-black text-blue-500">
                Live
              </span>

            </div>

            <p className="text-xs text-gray-400 font-bold">
              {text.messages}
            </p>

            <p className="text-3xl font-black text-gray-900 mt-1">
              4
            </p>

          </div>

          <div className="group bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all">

            <div className="flex items-center justify-between mb-5">

              <div className="w-11 h-11 rounded-2xl bg-purple-50 flex items-center justify-center text-xl">
                👁️
              </div>

              <span className="text-[10px] font-black text-emerald-500">
                +24%
              </span>

            </div>

            <p className="text-xs text-gray-400 font-bold">
              {text.views}
            </p>

            <p className="text-3xl font-black text-gray-900 mt-1">
              342
            </p>

          </div>

          <div className="group bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all">

            <div className="flex items-center justify-between mb-5">

              <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center text-xl">
                ❤️
              </div>

              <span className="text-[10px] font-black text-gray-400">
                Personal
              </span>

            </div>

            <p className="text-xs text-gray-400 font-bold">
              {text.saved}
            </p>

            <p className="text-3xl font-black text-gray-900 mt-1">
              0
            </p>

          </div>

        </section>

        {/* ===================================================
            TABS
        =================================================== */}

        <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap">

          {[
            {
              id: 'overview',
              label: text.overview,
              icon: '✨',
            },
            {
              id: 'listings',
              label: text.myListings,
              icon: '🏠',
            },
            {
              id: 'stats',
              label: text.stats,
              icon: '📊',
            },
            {
              id: 'settings',
              label: text.settings,
              icon: '⚙️',
            },
          ].map((tab) => (

            <button
              type="button"
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as
                    | 'overview'
                    | 'listings'
                    | 'stats'
                    | 'settings'
                )
              }
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-black transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-950 text-white shadow-lg'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab.icon} {tab.label}
            </button>

          ))}

        </div>

        {/* ===================================================
            OVERVIEW
        =================================================== */}

        {activeTab === 'overview' && (

          <section className="grid lg:grid-cols-[1.5fr_1fr] gap-6">

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-lg font-black text-gray-900">
                    {text.recentListings}
                  </h2>

                  <p className="text-xs text-gray-400 mt-1">
                    {text.manageListings}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(true)
                  }
                  className="px-4 py-2.5 rounded-xl bg-[#F4845F] text-white text-xs font-black hover:bg-orange-500 transition"
                >
                  + {text.addListing}
                </button>

              </div>

              {myListings.length === 0 ? (

                <div className="border-2 border-dashed border-gray-100 rounded-3xl py-14 text-center">

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center text-2xl mb-4">
                    🏠
                  </div>

                  <h3 className="font-black text-gray-800 text-sm">
                    {text.noListings}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      setShowModal(true)
                    }
                    className="mt-5 px-5 py-3 rounded-2xl bg-gray-900 text-white text-xs font-black hover:bg-[#F4845F] transition"
                  >
                    {text.addFirst}
                  </button>

                </div>

              ) : (

                <div className="space-y-3">

                  {myListings
                    .slice(0, 4)
                    .map((listing) => (

                      <div
                        key={listing.id}
                        className="group flex items-center gap-4 p-3 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition"
                      >

                        <img
                          src={listing.imageUrl}
                          alt={
                            listing.title[lang] ||
                            listing.title.en
                          }
                          className="w-20 h-16 object-cover rounded-xl"
                        />

                        <div className="flex-1 min-w-0">

                          <h3 className="font-black text-sm text-gray-900 truncate group-hover:text-[#F4845F] transition">
                            {listing.title[lang] ||
                              listing.title.en}
                          </h3>

                          <p className="text-xs text-gray-400 mt-1">
                            📍 {listing.city}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-sm font-black text-[#F4845F]">
                            {listing.price} DH
                          </p>

                          <span className="inline-block mt-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            {text.active}
                          </span>

                        </div>

                      </div>

                    ))}

                </div>

              )}

            </div>

            {/* ACCOUNT CARD */}

            <div className="bg-gray-950 rounded-[2rem] p-6 text-white relative overflow-hidden">

              <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#F4845F]/20 blur-2xl" />

              <div className="relative z-10">

                <span className="text-3xl">
                  🚀
                </span>

                <h2 className="text-xl font-black mt-5">
                  iRent Profile
                </h2>

                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  {text.profileDescription}
                </p>

                <div className="mt-8 space-y-3">

                  <div className="flex justify-between text-xs">

                    <span className="text-gray-500">
                      Profile
                    </span>

                    <span className="font-black">
                      80%
                    </span>

                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">

                    <div className="h-full w-[80%] bg-[#F4845F] rounded-full" />

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab('settings')
                  }
                  className="mt-8 w-full py-3.5 rounded-2xl bg-white text-gray-950 text-xs font-black hover:bg-[#F4845F] hover:text-white transition"
                >
                  {text.editProfile}
                </button>

              </div>

            </div>

          </section>

        )}

        {/* ===================================================
            MY LISTINGS
        =================================================== */}

        {activeTab === 'listings' && (

          <section className="space-y-5">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>

                <h2 className="text-xl font-black text-gray-900">
                  {text.myListings}
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  {text.manageListings}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(true)
                }
                className="px-5 py-3 rounded-2xl bg-[#F4845F] text-white font-black text-xs shadow-lg shadow-orange-500/20 hover:bg-orange-500 transition"
              >
                + {text.addListing}
              </button>

            </div>

            {myListings.length === 0 ? (

              <div className="bg-white rounded-[2rem] border border-gray-100 py-20 text-center">

                <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-50 flex items-center justify-center text-3xl mb-5">
                  🏠
                </div>

                <h3 className="text-lg font-black text-gray-900">
                  {text.noListings}
                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  {text.manageListings}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(true)
                  }
                  className="mt-6 px-6 py-3 rounded-2xl bg-gray-950 text-white text-xs font-black hover:bg-[#F4845F] transition"
                >
                  {text.addFirst}
                </button>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {myListings.map((listing) => (

                  <div
                    key={listing.id}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >

                    <div className="relative h-48 overflow-hidden">

                      <img
                        src={listing.imageUrl}
                        alt={
                          listing.title[lang] ||
                          listing.title.en
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                      <div className="absolute top-3 left-3">

                        <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[9px] font-black shadow-lg">
                          ● {text.active}
                        </span>

                      </div>

                      <div className="absolute bottom-3 left-3">

                        <span className="px-3 py-1.5 rounded-xl bg-gray-950/80 backdrop-blur text-white text-xs font-black">
                          {listing.price} DH
                        </span>

                      </div>

                    </div>

                    <div className="p-5">

                      <h3 className="font-black text-gray-900 text-sm truncate">
                        {listing.title[lang] ||
                          listing.title.en}
                      </h3>

                      <p className="text-xs text-gray-400 mt-2">
                        📍 {listing.city}
                      </p>

                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">

                        <span className="text-[10px] text-gray-500 font-bold">
                          🛏 {listing.bedrooms}
                        </span>

                        <span className="text-[10px] text-gray-500 font-bold">
                          📶{' '}
                          {listing.hasWifi
                            ? 'WiFi'
                            : 'No WiFi'}
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}

        {/* ===================================================
            STATS
        =================================================== */}

        {activeTab === 'stats' && (

          <section className="space-y-5">

            <div className="bg-white rounded-[2rem] border border-gray-100 p-7">

              <h2 className="text-xl font-black text-gray-900">
                {text.stats}
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                {text.emptyStats}
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-white rounded-[2rem] p-6 border border-gray-100">

                <span className="text-2xl">
                  👁️
                </span>

                <p className="text-xs text-gray-400 font-bold mt-5">
                  {text.views}
                </p>

                <p className="text-4xl font-black mt-1">
                  342
                </p>

                <p className="text-[10px] text-emerald-500 font-black mt-2">
                  ↑ 24% this month
                </p>

              </div>

              <div className="bg-white rounded-[2rem] p-6 border border-gray-100">

                <span className="text-2xl">
                  💬
                </span>

                <p className="text-xs text-gray-400 font-bold mt-5">
                  {text.messages}
                </p>

                <p className="text-4xl font-black mt-1">
                  4
                </p>

                <p className="text-[10px] text-blue-500 font-black mt-2">
                  {text.activeConversations}
                </p>

              </div>

              <div className="bg-white rounded-[2rem] p-6 border border-gray-100">

                <span className="text-2xl">
                  🏠
                </span>

                <p className="text-xs text-gray-400 font-bold mt-5">
                  {text.totalListings}
                </p>

                <p className="text-4xl font-black mt-1">
                  {myListings.length}
                </p>

                <p className="text-[10px] text-[#F4845F] font-black mt-2">
                  {text.publishedProperties}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 p-7">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h3 className="font-black text-gray-900">
                    {text.listingPerformance}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    {text.last30Days}
                  </p>

                </div>

                <span className="px-3 py-1.5 rounded-xl bg-gray-50 text-[10px] font-black text-gray-500">
                  30 DAYS
                </span>

              </div>

              <div className="h-48 flex items-end gap-2">

                {[25, 35, 30, 50, 42, 65, 58, 75, 68, 85, 78, 92].map(
                  (height, index) => (

                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-[#F4845F] to-orange-300 rounded-t-xl opacity-80 hover:opacity-100 transition"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                  )
                )}

              </div>

            </div>

          </section>

        )}

        {/* ===================================================
            SETTINGS
        =================================================== */}

        {activeTab === 'settings' && (

          <section className="max-w-3xl mx-auto">

            <form
              onSubmit={handleSaveSettings}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8 space-y-7"
            >

              <div className="border-b border-gray-100 pb-6">

                <h2 className="text-xl font-black text-gray-900">
                  {text.profileInfo}
                </h2>

                <p className="text-xs text-gray-400 mt-2">
                  {text.updateProfileDescription}
                </p>

              </div>

              {isSaved && (

                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-2xl text-xs font-black">
                  <span>✓</span>
                  {text.savedSuccess}
                </div>

              )}

              {/* FIRST NAME + LAST NAME */}

              <div className="grid md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-xs font-black text-gray-700 mb-2">
                    {text.firstName}
                  </label>

                  <input
                    type="text"
                    value={settingsData.firstName}
                    onChange={(e) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        firstName:
                          e.target.value,
                      }))
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-semibold outline-none focus:bg-white focus:border-[#F4845F] transition"
                  />

                </div>

                <div>

                  <label className="block text-xs font-black text-gray-700 mb-2">
                    {text.lastName}
                  </label>

                  <input
                    type="text"
                    value={settingsData.lastName}
                    onChange={(e) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        lastName:
                          e.target.value,
                      }))
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-semibold outline-none focus:bg-white focus:border-[#F4845F] transition"
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-xs font-black text-gray-700 mb-2">
                  {text.email}
                </label>

                <input
                  type="email"
                  value={settingsData.email}
                  disabled
                  className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-500 outline-none cursor-not-allowed"
                />

                <p className="text-[10px] text-gray-400 mt-2">
                  {text.emailBackend}
                </p>

              </div>

              {/* PHONE */}

              <div>

                <label className="block text-xs font-black text-gray-700 mb-2">
                  {text.phone}
                </label>

                <input
                  type="tel"
                  placeholder="+212 6 XX XX XX XX"
                  value={settingsData.phone}
                  onChange={(e) =>
                    setSettingsData((prev) => ({
                      ...prev,
                      phone:
                        e.target.value,
                    }))
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-semibold outline-none focus:bg-white focus:border-[#F4845F] transition"
                />

              </div>

              {/* BIO */}

              <div>

                <label className="block text-xs font-black text-gray-700 mb-2">
                  {text.bio}
                </label>

                <textarea
                  rows={4}
                  value={settingsData.bio}
                  onChange={(e) =>
                    setSettingsData((prev) => ({
                      ...prev,
                      bio:
                        e.target.value,
                    }))
                  }
                  placeholder={text.writeAboutYou}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-semibold outline-none focus:bg-white focus:border-[#F4845F] transition resize-none"
                />

              </div>

              {/* SAVE */}

              <button
                type="submit"
                className="w-full bg-gray-950 hover:bg-[#F4845F] text-white py-4 rounded-2xl font-black text-xs shadow-xl transition-all"
              >
                ✓ {text.save}
              </button>

            </form>

          </section>

        )}

        {/* ===================================================
            ADD MODAL
        =================================================== */}

        {showModal && (

          <AddModal
            onClose={() =>
              setShowModal(false)
            }
            onAdd={handleAdd}
            lang={lang}
          />

        )}

      </div>
    </div>
  );
};