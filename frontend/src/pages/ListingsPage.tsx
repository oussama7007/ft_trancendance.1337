import React, { useEffect, useState } from 'react';
import { Listing, Language, User } from '../types';
import { HouseCard } from '../components/HouseCard';

interface ListingsPageProps {
  lang: Language;
  listings: Listing[];

  onSelectListing: (item: Listing) => void;

  t: any;

  // =========================
  // SEARCH
  // =========================

  searchQuery?: string;

  onSearchChange?: (query: string) => void;

  onCitySelect?: (cityName: string) => void;

  // =========================
  // ADD LISTING
  // =========================

  onAddListing?: (
    newListing: Listing
  ) => void | Promise<void>;

  // =========================
  // AUTH / NAVIGATION
  // =========================

  currentUser?: User | null;

  onNavigate?: (page: string) => void;
}

const ITEMS_PER_PAGE = 9;

export const ListingsPage: React.FC<ListingsPageProps> = ({
  lang,
  listings,
  onSelectListing,
  t,

  searchQuery = '',

  onSearchChange,
  onCitySelect,

  onAddListing,

  currentUser,
  onNavigate,

}) => {

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const [maxPrice, setMaxPrice] =
    useState(4000);

  const [currentPage, setCurrentPage] =
    useState(1);


  // =====================================================
  // ADD MODAL
  // =====================================================

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [newTitle, setNewTitle] =
    useState('');

  const [newPrice, setNewPrice] =
    useState('');

  const [newCity, setNewCity] =
    useState('');

  const [newDescription, setNewDescription] =
    useState('');

  const [formError, setFormError] =
    useState('');

  const [isPublishing, setIsPublishing] =
    useState(false);

  const [newBedrooms, setNewBedrooms] =
    useState('1');

  const [newHasWifi, setNewHasWifi] =
    useState(false);

  const [newOwnerName, setNewOwnerName] =
    useState('');


  // =====================================================
  // FAVORITES
  // =====================================================

  const [favorites, setFavorites] =
    useState<Set<number>>(() => {

      try {

        const raw =
          localStorage.getItem(
            'irent_favorites'
          );

        if (!raw) {
          return new Set<number>();
        }

        const parsed =
          JSON.parse(raw);

        return new Set<number>(
          parsed.map(
            (id: number | string) =>
              Number(id)
          )
        );

      } catch {

        return new Set<number>();

      }

    });


  const toggleFavorite = (id: number) => {

    setFavorites((prev) => {

      const next =
        new Set(prev);

      if (next.has(id)) {

        next.delete(id);

      } else {

        next.add(id);

      }

      try {

        localStorage.setItem(
          'irent_favorites',
          JSON.stringify(
            Array.from(next)
          )
        );

      } catch {
        // Ignore localStorage errors
      }

      return next;

    });

  };


  // =====================================================
  // IMAGES / VIDEO
  // =====================================================

  const [selectedImages, setSelectedImages] =
    useState<File[]>([]);

  const [imagePreviews, setImagePreviews] =
    useState<string[]>([]);

  const [selectedVideo, setSelectedVideo] =
    useState<File | null>(null);

  const [videoPreview, setVideoPreview] =
    useState('');


  // =====================================================
  // TRANSLATIONS
  // =====================================================

  const pageTexts = {

    ar: {

      popularCities:
        'مدن شائعة:',

      clearSearch:
        'مسح البحث ✖',

      addListingBtn:
        'إضافة عقار جديد',

      modalTitle:
        'إضافة عقار جديد (صور وفيديو)',

      titleLabel:
        'عنوان العقار',

      titlePlaceholder:
        'مثال: شقة مفروشة في خريبكة...',

      descriptionLabel:
        'وصف العقار',

      descriptionPlaceholder:
        'كتب وصف مختصر على العقار...',

      priceLabel:
        'الثمن (DH)',

      cityLabel:
        'المدينة',

      cityPlaceholder:
        'خريبكة',

      bedroomsLabel:
        'عدد الغرف',

      wifiLabel:
        '📶 كاين الواي فاي',

      ownerNameLabel:
        'اسمك (كيبان للمهتمين)',

      ownerNamePlaceholder:
        'مثال: يوسف',

      imagesLabel:
        'صور العقار (يمكنك اختيار عدة صور)',

      videoLabel:
        'فيديو العقار (جولة داخل الدار)',

      publishBtn:
        'نشر العقار الآن',

      publishingBtn:
        'جاري النشر...',

      successAlert:
        'تم نشر العقار بنجاح!',

      errorAlert:
        'وقع خطأ أثناء النشر، حاول مرة أخرى.',

      validationTitle:
        'خصك تكمل هاد المعلومات قبل النشر:',

      validationTitleMissing:
        'العنوان',

      validationDescriptionMissing:
        'الوصف',

      validationPriceMissing:
        'الثمن (لازم يكون رقم أكبر من صفر)',

      validationCityMissing:
        'المدينة',

      validationImageMissing:
        'صورة واحدة على الأقل',

      noResults:
        'لم يتم العثور على عقارات.',

      prevPage:
        '‹ السابق',

      nextPage:
        'التالي ›',

      pageOf:
        'صفحة {current} من {total}',
    },

    fr: {

      popularCities:
        'Villes populaires:',

      clearSearch:
        'Effacer ✖',

      addListingBtn:
        'Ajouter un bien',

      modalTitle:
        'Ajouter un nouveau bien (Photos & Vidéo)',

      titleLabel:
        'Titre du bien',

      titlePlaceholder:
        'Ex: Appartement meublé à Khouribga...',

      descriptionLabel:
        'Description',

      descriptionPlaceholder:
        'Décrivez brièvement le bien...',

      priceLabel:
        'Prix (DH)',

      cityLabel:
        'Ville',

      cityPlaceholder:
        'Khouribga',

      bedroomsLabel:
        'Nombre de chambres',

      wifiLabel:
        '📶 Wifi disponible',

      ownerNameLabel:
        'Votre nom (visible aux intéressés)',

      ownerNamePlaceholder:
        'Ex: Youssef',

      imagesLabel:
        'Photos du bien (plusieurs choix possibles)',

      videoLabel:
        'Vidéo du bien (visite virtuelle)',

      publishBtn:
        'Publier',

      publishingBtn:
        'Publication en cours...',

      successAlert:
        'Bien publié avec succès!',

      errorAlert:
        'Une erreur est survenue, veuillez réessayer.',

      validationTitle:
        'Merci de compléter les champs suivants avant de publier :',

      validationTitleMissing:
        'Titre',

      validationDescriptionMissing:
        'Description',

      validationPriceMissing:
        'Prix (doit être un nombre supérieur à 0)',

      validationCityMissing:
        'Ville',

      validationImageMissing:
        'Au moins une image',

      noResults:
        'Aucune location trouvée.',

      prevPage:
        '‹ Précédent',

      nextPage:
        'Suivant ›',

      pageOf:
        'Page {current} sur {total}',
    },

    en: {

      popularCities:
        'Popular Cities:',

      clearSearch:
        'Clear ✖',

      addListingBtn:
        'Add New Property',

      modalTitle:
        'Add New Property (Images & Video)',

      titleLabel:
        'Property Title',

      titlePlaceholder:
        'Ex: Furnished apartment in Khouribga...',

      descriptionLabel:
        'Property Description',

      descriptionPlaceholder:
        'Write a short description...',

      priceLabel:
        'Price (DH)',

      cityLabel:
        'City',

      cityPlaceholder:
        'Khouribga',

      bedroomsLabel:
        'Number of Rooms',

      wifiLabel:
        '📶 Wifi Available',

      ownerNameLabel:
        'Your Name (shown to interested people)',

      ownerNamePlaceholder:
        'Ex: Youssef',

      imagesLabel:
        'Property Images (Multiple allowed)',

      videoLabel:
        'Property Video (Tour inside)',

      publishBtn:
        'Publish Now',

      publishingBtn:
        'Publishing...',

      successAlert:
        'Property published successfully!',

      errorAlert:
        'Something went wrong, please try again.',

      validationTitle:
        'Please complete the following before publishing:',

      validationTitleMissing:
        'Title',

      validationDescriptionMissing:
        'Description',

      validationPriceMissing:
        'Price (must be greater than 0)',

      validationCityMissing:
        'City',

      validationImageMissing:
        'At least one image',

      noResults:
        'No listings found.',

      prevPage:
        '‹ Previous',

      nextPage:
        'Next ›',

      pageOf:
        'Page {current} of {total}',
    },

  };

  const currentT =
    pageTexts[lang] ||
    pageTexts.en;


  // =====================================================
  // RESET PAGINATION
  // =====================================================

  useEffect(() => {

    setCurrentPage(1);

  }, [searchQuery, maxPrice]);


  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const handleOpenAddModalCheck = () => {

    if (!currentUser) {

      onNavigate?.('signup');

      return;

    }

    setFormError('');

    setIsAddModalOpen(true);

  };


  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearchInput = (
    value: string
  ) => {

    onSearchChange?.(value);

  };


  // =====================================================
  // CITY
  // =====================================================

  const handleQuickCityClick = (
    cityName: string
  ) => {

    onSearchChange?.(cityName);

    onCitySelect?.(cityName);

  };


  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) {
      return;
    }

    const filesArray =
      Array.from(e.target.files);

    setSelectedImages((prev) => [
      ...prev,
      ...filesArray,
    ]);

    const previewsArray =
      filesArray.map((file) =>
        URL.createObjectURL(file)
      );

    setImagePreviews((prev) => [
      ...prev,
      ...previewsArray,
    ]);

    e.target.value = '';

  };


  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const handleRemoveImage = (
    indexToRemove: number
  ) => {

    const url =
      imagePreviews[indexToRemove];

    if (url) {

      URL.revokeObjectURL(url);

    }

    setSelectedImages((prev) =>
      prev.filter(
        (_, index) =>
          index !== indexToRemove
      )
    );

    setImagePreviews((prev) =>
      prev.filter(
        (_, index) =>
          index !== indexToRemove
      )
    );

  };


  // =====================================================
  // VIDEO
  // =====================================================

  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (videoPreview) {

      URL.revokeObjectURL(
        videoPreview
      );

    }

    const preview =
      URL.createObjectURL(file);

    setSelectedVideo(file);

    setVideoPreview(preview);

  };


  // =====================================================
  // REMOVE VIDEO
  // =====================================================

  const handleRemoveVideo = () => {

    if (videoPreview) {

      URL.revokeObjectURL(
        videoPreview
      );

    }

    setSelectedVideo(null);

    setVideoPreview('');

  };


  // =====================================================
  // FILTER LISTINGS
  // =====================================================

  const filteredListings =
    listings.filter((item) => {

      const query =
        searchQuery
          .toLowerCase()
          .trim();

      const searchableText = `
        ${item.city || ''}
        ${item.cityEnFr || ''}
        ${item.district || ''}
        ${item.districtEnFr || ''}
        ${item.title?.ar || ''}
        ${item.title?.fr || ''}
        ${item.title?.en || ''}
        ${item.description?.ar || ''}
        ${item.description?.fr || ''}
        ${item.description?.en || ''}
      `.toLowerCase();

      return (
        searchableText.includes(query) &&
        item.price <= maxPrice
      );

    });


  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredListings.length /
          ITEMS_PER_PAGE
      )
    );


  const paginatedListings =
    filteredListings.slice(

      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE

    );


  // =====================================================
  // VALIDATION
  // =====================================================

  const validatePublishForm =
    (): string[] => {

      const missing: string[] = [];

      if (!newTitle.trim()) {

        missing.push(
          currentT.validationTitleMissing
        );

      }

      if (!newDescription.trim()) {

        missing.push(
          currentT.validationDescriptionMissing
        );

      }

      if (
        !newPrice ||
        Number(newPrice) <= 0
      ) {

        missing.push(
          currentT.validationPriceMissing
        );

      }

      if (!newCity.trim()) {

        missing.push(
          currentT.validationCityMissing
        );

      }

      if (
        selectedImages.length === 0
      ) {

        missing.push(
          currentT.validationImageMissing
        );

      }

      return missing;

    };


  // =====================================================
  // PUBLISH
  // =====================================================

  const handlePublish = async () => {

    const missingFields =
      validatePublishForm();

    if (
      missingFields.length > 0
    ) {

      setFormError(

        `${currentT.validationTitle} ${
          missingFields.join(
            lang === 'ar'
              ? '، '
              : ', '
          )
        }`

      );

      return;

    }

    setFormError('');

    setIsPublishing(true);


    const fallbackOwner =
      lang === 'ar'
        ? 'مستخدم iRent.ma'
        : 'iRent.ma user';


    const newListingItem: Listing = {

      id: Date.now(),

      title: {

        ar: newTitle.trim(),

        fr: newTitle.trim(),

        en: newTitle.trim(),

      },

      description: {

        ar: newDescription.trim(),

        fr: newDescription.trim(),

        en: newDescription.trim(),

      },

      price:
        Number(newPrice),

      city:
        newCity.trim(),

      cityEnFr:
        newCity.trim(),

      district:
        lang === 'ar'
          ? 'حي جديد'
          : 'New District',

      districtEnFr:
        'New District',

      imageUrl:
        imagePreviews[0] ||
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',

      images:
        [...imagePreviews],

      video:
        videoPreview ||
        undefined,

      ownerName:
        newOwnerName.trim() ||
        currentUser?.fullName ||
        fallbackOwner,

      bedrooms:
        Number(newBedrooms) > 0
          ? Number(newBedrooms)
          : 1,

      hasWifi:
        newHasWifi,

    };


    try {

      if (onAddListing) {

        await onAddListing(
          newListingItem
        );

      }

      alert(
        currentT.successAlert
      );


      // =========================
      // RESET FORM
      // =========================

      setIsAddModalOpen(false);

      setNewTitle('');

      setNewDescription('');

      setNewPrice('');

      setNewCity('');

      setSelectedImages([]);

      setImagePreviews([]);

      setSelectedVideo(null);

      setVideoPreview('');

      setNewBedrooms('1');

      setNewHasWifi(false);

      setNewOwnerName('');


    } catch (error) {

      console.error(
        'Error publishing listing:',
        error
      );

      setFormError(
        currentT.errorAlert
      );

    } finally {

      setIsPublishing(false);

    }

  };


  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {

    if (isPublishing) {
      return;
    }

    setIsAddModalOpen(false);

    setFormError('');

  };


  // =====================================================
  // JSX
  // =====================================================

  return (

    <div
      className={`p-4 sm:p-6 max-w-7xl mx-auto space-y-6 font-sans relative ${
        lang === 'ar'
          ? 'rtl'
          : 'ltr'
      }`}
    >

      {/* =================================================
          POPULAR CITIES
      ================================================= */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">

          <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
            {currentT.popularCities}
          </span>


          {[
            'الرباط',
            'الدار البيضاء',
            'طنجة',
            'مراكش',
            'خريبكة',
          ].map((city) => (

            <button
              key={city}
              type="button"
              onClick={() =>
                handleQuickCityClick(
                  city
                )
              }
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm border whitespace-nowrap ${
                searchQuery.includes(city)
                  ? 'bg-[#F4845F] text-white border-[#F4845F]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#F4845F] hover:text-[#F4845F]'
              }`}
            >
              {city}
            </button>

          ))}


          {searchQuery && (

            <button
              type="button"
              onClick={() =>
                handleSearchInput('')
              }
              className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-gray-100 text-gray-500 hover:bg-gray-200 transition whitespace-nowrap"
            >
              {currentT.clearSearch}
            </button>

          )}

        </div>


        {/* =================================================
            ADD BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={
            handleOpenAddModalCheck
          }
          className="bg-[#F4845F] hover:bg-[#e07553] text-white text-xs font-black px-5 py-2.5 rounded-2xl shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer"
        >

          <span>
            ➕
          </span>

          {currentT.addListingBtn}

        </button>

      </div>


      {/* =================================================
          SEARCH / FILTER
      ================================================= */}

      <div className="bg-white p-5 sm:p-6 rounded-[2.5rem] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

        {/* SEARCH */}

        <div>

          <label className="block text-xs font-extrabold text-gray-500 mb-1.5">
            {t.searchLabel ||
              'Search Location'}
          </label>

          <input
            type="text"
            placeholder={
              t.searchPlaceholder ||
              'Search by city, district...'
            }
            value={searchQuery}
            onChange={(e) =>
              handleSearchInput(
                e.target.value
              )
            }
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F] transition"
          />

        </div>


        {/* PRICE */}

        <div>

          <label className="block text-xs font-extrabold text-gray-500 mb-1.5">

            {t.maxPriceLabel ||
              'Max Price'}{' '}

            <span className="text-[#F4845F] font-black">
              {maxPrice} DH
            </span>

          </label>

          <input
            type="range"
            min="500"
            max="4000"
            step="100"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full accent-[#F4845F] cursor-pointer"
          />

        </div>


        {/* RESULTS */}

        <div className="text-left font-medium text-xs text-gray-500 self-end pb-1">

          {t.resultsFound ||
            'Found'}{' '}

          <span className="font-extrabold text-[#F4845F]">
            {filteredListings.length}
          </span>{' '}

          {t.offersCount ||
            'offers'}

        </div>

      </div>


      {/* =================================================
          LISTINGS
      ================================================= */}

      {filteredListings.length > 0 ? (

        <>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {paginatedListings.map(
              (item) => (

                <HouseCard
                  key={item.id}
                  item={item}
                  lang={lang}
                  onSelect={
                    onSelectListing
                  }
                  isFavorite={
                    favorites.has(
                      item.id
                    )
                  }
                  onToggleFavorite={
                    toggleFavorite
                  }
                />

              )
            )}

          </div>


          {/* =================================================
              PAGINATION
          ================================================= */}

          {totalPages > 1 && (

            <div className="flex items-center justify-center gap-3 pt-2">

              <button
                type="button"
                onClick={() =>
                  setCurrentPage(
                    (p) =>
                      Math.max(
                        1,
                        p - 1
                      )
                  )
                }
                disabled={
                  currentPage === 1
                }
                className="px-4 py-2 rounded-xl text-xs font-black bg-white border border-gray-200 text-gray-700 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#F4845F] hover:text-[#F4845F] transition cursor-pointer"
              >
                {currentT.prevPage}
              </button>


              <span className="text-xs font-bold text-gray-500">

                {currentT.pageOf
                  .replace(
                    '{current}',
                    String(
                      currentPage
                    )
                  )
                  .replace(
                    '{total}',
                    String(
                      totalPages
                    )
                  )}

              </span>


              <button
                type="button"
                onClick={() =>
                  setCurrentPage(
                    (p) =>
                      Math.min(
                        totalPages,
                        p + 1
                      )
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                className="px-4 py-2 rounded-xl text-xs font-black bg-white border border-gray-200 text-gray-700 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#F4845F] hover:text-[#F4845F] transition cursor-pointer"
              >
                {currentT.nextPage}
              </button>

            </div>

          )}

        </>

      ) : (

        /* =================================================
           NO RESULTS
        ================================================= */

        <div className="bg-white rounded-[2.5rem] p-10 text-center border border-dashed border-gray-200 space-y-3 shadow-sm">

          <p className="text-5xl">
            🔍🇲🇦
          </p>

          <h3 className="text-base font-extrabold text-gray-900">

            {t.noResultsTitle ||
              currentT.noResults}

          </h3>


          <button
            type="button"
            onClick={() => {

              handleSearchInput('');

              setMaxPrice(4000);

            }}
            className="mt-2 inline-block bg-[#F4845F] hover:bg-[#e07553] text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-md transition"
          >

            {t.resetSearch ||
              'Reset Search'}

          </button>

        </div>

      )}


      {/* =================================================
          ADD MODAL
      ================================================= */}

      {isAddModalOpen && (

        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          >

            {/* HEADER */}

            <div className="flex justify-between items-center">

              <h3 className="text-sm font-black text-gray-900">
                {currentT.modalTitle}
              </h3>

              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold hover:bg-gray-200 cursor-pointer"
              >
                ✕
              </button>

            </div>


            {/* TITLE */}

            <div>

              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                {currentT.titleLabel}
              </label>

              <input
                type="text"
                value={newTitle}
                onChange={(e) =>
                  setNewTitle(
                    e.target.value
                  )
                }
                placeholder={
                  currentT.titlePlaceholder
                }
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F]"
              />

            </div>


            {/* DESCRIPTION */}

            <div>

              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                {currentT.descriptionLabel}
              </label>

              <textarea
                value={newDescription}
                onChange={(e) =>
                  setNewDescription(
                    e.target.value
                  )
                }
                placeholder={
                  currentT.descriptionPlaceholder
                }
                rows={4}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F] resize-none"
              />

            </div>


            {/* PRICE + CITY */}

            <div className="grid grid-cols-2 gap-3">

              <div>

                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {currentT.priceLabel}
                </label>

                <input
                  type="number"
                  min="1"
                  value={newPrice}
                  onChange={(e) =>
                    setNewPrice(
                      e.target.value
                    )
                  }
                  placeholder="2000"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F]"
                />

              </div>


              <div>

                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {currentT.cityLabel}
                </label>

                <input
                  type="text"
                  value={newCity}
                  onChange={(e) =>
                    setNewCity(
                      e.target.value
                    )
                  }
                  placeholder={
                    currentT.cityPlaceholder
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F]"
                />

              </div>

            </div>


            {/* OWNER + ROOMS */}

            <div className="grid grid-cols-2 gap-3">

              <div>

                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {currentT.ownerNameLabel}
                </label>

                <input
                  type="text"
                  value={newOwnerName}
                  onChange={(e) =>
                    setNewOwnerName(
                      e.target.value
                    )
                  }
                  placeholder={
                    currentT.ownerNamePlaceholder
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F]"
                />

              </div>


              <div>

                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {currentT.bedroomsLabel}
                </label>

                <input
                  type="number"
                  min="1"
                  value={newBedrooms}
                  onChange={(e) =>
                    setNewBedrooms(
                      e.target.value
                    )
                  }
                  placeholder="1"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F]"
                />

              </div>

            </div>


            {/* WIFI */}

            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600 cursor-pointer">

              <input
                type="checkbox"
                checked={newHasWifi}
                onChange={(e) =>
                  setNewHasWifi(
                    e.target.checked
                  )
                }
                className="w-4 h-4 accent-[#F4845F] cursor-pointer"
              />

              {currentT.wifiLabel}

            </label>


            {/* IMAGES */}

            <div className="space-y-1.5">

              <label className="block text-[11px] font-bold text-gray-600">
                {currentT.imagesLabel}
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="w-full border border-dashed border-gray-300 rounded-xl p-3 text-xs text-gray-500 bg-gray-50 cursor-pointer"
              />


              {imagePreviews.length > 0 && (

                <div className="flex gap-2 overflow-x-auto pt-2">

                  {imagePreviews.map(
                    (src, index) => (

                      <div
                        key={src}
                        className="relative group shrink-0"
                      >

                        <img
                          src={src}
                          alt={`preview-${index}`}
                          className="w-16 h-16 object-cover rounded-xl border shadow-sm"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveImage(
                              index
                            )
                          }
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow-md hover:bg-red-600 transition cursor-pointer"
                        >
                          ✕
                        </button>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>


            {/* VIDEO */}

            <div className="space-y-1.5">

              <label className="block text-[11px] font-bold text-gray-600">
                {currentT.videoLabel}
              </label>

              <input
                type="file"
                accept="video/*"
                onChange={
                  handleVideoChange
                }
                className="w-full border border-dashed border-gray-300 rounded-xl p-3 text-xs text-gray-500 bg-gray-50 cursor-pointer"
              />


              {videoPreview && (

                <div className="pt-2 relative">

                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-32 object-cover rounded-xl border shadow-sm"
                  />

                  <button
                    type="button"
                    onClick={
                      handleRemoveVideo
                    }
                    className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-md hover:bg-red-600 transition cursor-pointer"
                  >
                    ✕
                  </button>

                </div>

              )}

            </div>


            {/* ERROR */}

            {formError && (

              <div className="bg-red-50 border border-red-200 text-red-600 text-[11px] font-bold rounded-xl px-3.5 py-2.5 leading-relaxed">
                {formError}
              </div>

            )}


            {/* PUBLISH */}

            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full bg-[#F4845F] text-white py-3 rounded-xl font-black text-xs hover:bg-[#e07553] transition shadow-md mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >

              {isPublishing && (

                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />

              )}

              {isPublishing
                ? currentT.publishingBtn
                : currentT.publishBtn}

            </button>

          </div>

        </div>

      )}

    </div>

  );

};