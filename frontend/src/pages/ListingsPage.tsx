import React, { useState } from 'react';
import { Listing, Language } from '../types';
import { HouseCard } from '../components/HouseCard';

interface ListingsPageProps {
  lang: Language;
  listings: Listing[];
  onSelectListing: (item: Listing) => void;
  t: any;
  onSearchChange?: (query: string) => void;
  onCitySelect?: (cityName: string) => void;
  onAddListing?: (newListing: Listing) => void; // دالة لإضافة العقار مباشرة للقائمة والأب
}

export const ListingsPage: React.FC<ListingsPageProps> = ({ 
  lang, 
  listings, 
  onSelectListing, 
  t,
  onSearchChange,
  onCitySelect,
  onAddListing
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(3000);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCity, setNewCity] = useState('');
  
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');

  const pageTexts = {
    ar: {
      popularCities: 'مدن شائعة:',
      clearSearch: 'مسح البحث ✖',
      addListingBtn: 'إضافة عقار جديد',
      modalTitle: 'إضافة عقار جديد (صور وفيديو)',
      titleLabel: 'عنوان أو وصف العقار',
      titlePlaceholder: 'مثال: شقة مفروشة في خريبكة...',
      priceLabel: 'الثمن (DH)',
      cityLabel: 'المدينة',
      cityPlaceholder: 'خريبكة',
      imagesLabel: 'صور العقار (يمكنك اختيار عدة صور)',
      videoLabel: 'فيديو العقار (جولة داخل الدار)',
      publishBtn: 'نشر العقار الآن',
      successAlert: 'تم نشر العقار بنجاح!',
      noResults: 'لم يتم العثور على عقارات.'
    },
    fr: {
      popularCities: 'Villes populaires:',
      clearSearch: 'Effacer ✖',
      addListingBtn: 'Ajouter un bien',
      modalTitle: 'Ajouter un nouveau bien (Photos & Vidéo)',
      titleLabel: 'Titre ou description du bien',
      titlePlaceholder: 'Ex: Appartement meublé à Khouribga...',
      priceLabel: 'Prix (DH)',
      cityLabel: 'Ville',
      cityPlaceholder: 'Khouribga',
      imagesLabel: 'Photos du bien (plusieurs choix possibles)',
      videoLabel: 'Vidéo du bien (visite virtuelle)',
      publishBtn: 'Publier',
      successAlert: 'Bien publié avec succès!',
      noResults: 'Aucune location trouvée.'
    },
    en: {
      popularCities: 'Popular Cities:',
      clearSearch: 'Clear ✖',
      addListingBtn: 'Add New Property',
      modalTitle: 'Add New Property (Images & Video)',
      titleLabel: 'Property Title or Description',
      titlePlaceholder: 'Ex: Furnished apartment in Khouribga...',
      priceLabel: 'Price (DH)',
      cityLabel: 'City',
      cityPlaceholder: 'Khouribga',
      imagesLabel: 'Property Images (Multiple allowed)',
      videoLabel: 'Property Video (Tour inside)',
      publishBtn: 'Publish Now',
      successAlert: 'Property published successfully!',
      noResults: 'No listings found.'
    }
  };

  const currentT = pageTexts[lang] || pageTexts.en;

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (onSearchChange) onSearchChange(value);
  };

  const handleQuickCityClick = (cityName: string) => {
    setSearchQuery(cityName);
    if (onSearchChange) onSearchChange(cityName);
    if (onCitySelect) onCitySelect(cityName);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...filesArray]);
      const previewsArray = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...previewsArray]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveVideo = () => {
    setSelectedVideo(null);
    setVideoPreview('');
  };

  const filteredListings = listings.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const searchableText = `${item.city} ${item.cityEnFr || ''} ${item.district || ''} ${item.districtEnFr || ''} ${item.title[lang] || ''}`.toLowerCase();
    return searchableText.includes(query) && item.price <= maxPrice;
  });

  const handlePublish = () => {
    // 1. إنشاء كائن العقار الجديد لكي يظهر فوراً في الـ Cards والخريطة
    const newListingItem: Listing = {
      id: Date.now().toString(),
      title: {
        ar: newTitle,
        fr: newTitle,
        en: newTitle,
      },
      price: Number(newPrice) || 0,
      city: newCity || 'خريبكة',
      cityEnFr: newCity || 'Khouribga',
      district: 'حي جديد',
      districtEnFr: 'New District',
      image: imagePreviews.length > 0 ? imagePreviews[0] : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      images: imagePreviews,
      video: videoPreview || undefined,
    };

    // 2. إرسال العقار للمكون الأب ليتم تحديث القائمتين (Cards + Map)
    if (onAddListing) {
      onAddListing(newListingItem);
    }

    // 3. تجهيز الـ FormData للباك إند (في حال أردت ربطه لاحقاً)
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('price', newPrice);
    formData.append('city', newCity);
    selectedImages.forEach((file) => formData.append('images', file));
    if (selectedVideo) formData.append('video', selectedVideo);

    console.log("FormData prepared for backend:", formData);

    alert(currentT.successAlert);
    
    // 4. إغلاق النافذة وتفريغ الحقول
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewPrice('');
    setNewCity('');
    setSelectedImages([]);
    setImagePreviews([]);
    setSelectedVideo(null);
    setVideoPreview('');
  };

  return (
    <div className={`p-4 sm:p-6 max-w-7xl mx-auto space-y-6 font-sans relative ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* شريط المدن السريعة وزر الإضافة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
          <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
            {currentT.popularCities}
          </span>
          {['الرباط', 'الدار البيضاء', 'طنجة', 'مراكش', 'خريبكة'].map((city) => (
            <button
              key={city}
              onClick={() => handleQuickCityClick(city)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm border ${
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
              onClick={() => handleSearchInput('')}
              className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
            >
              {currentT.clearSearch}
            </button>
          )}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#F4845F] hover:bg-[#e07553] text-white text-xs font-black px-5 py-2.5 rounded-2xl shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>➕</span> {currentT.addListingBtn}
        </button>
      </div>

      {/* شريط البحث والفلترة */}
      <div className="bg-white p-5 sm:p-6 rounded-[2.5rem] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <label className="block text-xs font-extrabold text-gray-500 mb-1.5">{t.searchLabel || 'Search Location'}</label>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder || 'Search by city, district...'} 
            value={searchQuery} 
            onChange={(e) => handleSearchInput(e.target.value)} 
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F] transition" 
          />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-gray-500 mb-1.5">
            {t.maxPriceLabel || 'Max Price'} <span className="text-[#F4845F] font-black">{maxPrice} DH</span>
          </label>
          <input 
            type="range" min="500" max="4000" step="100" 
            value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} 
            className="w-full accent-[#F4845F] cursor-pointer" 
          />
        </div>
        <div className="text-left font-medium text-xs text-gray-500 self-end pb-1">
          {t.resultsFound || 'Found'} <span className="font-extrabold text-[#F4845F]">{filteredListings.length}</span> {t.offersCount || 'offers'}
        </div>
      </div>

      {/* قائمة العقارات */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <HouseCard key={item.id} item={item} lang={lang} onSelect={onSelectListing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] p-10 text-center border border-dashed border-gray-200 space-y-3 shadow-sm">
          <p className="text-5xl">🔍🇲🇦</p>
          <h3 className="text-base font-extrabold text-gray-900">{t.noResultsTitle || currentT.noResults}</h3>
          <button
            onClick={() => {
              handleSearchInput('');
              setMaxPrice(4000);
            }}
            className="mt-2 inline-block bg-[#F4845F] hover:bg-[#e07553] text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-md transition"
          >
            {t.resetSearch || 'Reset Search'}
          </button>
        </div>
      )}

      {/* نافذة الإضافة (Modal) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-gray-900">{currentT.modalTitle}</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold hover:bg-gray-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">{currentT.titleLabel}</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={currentT.titlePlaceholder}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">{currentT.priceLabel}</label>
                <input 
                  type="number" 
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="2000"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">{currentT.cityLabel}</label>
                <input 
                  type="text" 
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder={currentT.cityPlaceholder}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#F4845F]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-600">{currentT.imagesLabel}</label>
              <input 
                type="file" 
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-dashed border-gray-300 rounded-xl p-3 text-xs text-gray-500 bg-gray-50 cursor-pointer"
              />
              {imagePreviews.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pt-2">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative group shrink-0">
                      <img src={src} alt="preview" className="w-16 h-16 object-cover rounded-xl border shadow-sm" />
                      <button 
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow-md hover:bg-red-600 transition cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-600">{currentT.videoLabel}</label>
              <input 
                type="file" 
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full border border-dashed border-gray-300 rounded-xl p-3 text-xs text-gray-500 bg-gray-50 cursor-pointer"
              />
              {videoPreview && (
                <div className="pt-2 relative">
                  <video src={videoPreview} controls className="w-full h-32 object-cover rounded-xl border shadow-sm" />
                  <button 
                    type="button"
                    onClick={handleRemoveVideo}
                    className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-md hover:bg-red-600 transition cursor-pointer"
                  >
                    حذف الفيديو ✕
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={handlePublish}
              className="w-full bg-[#F4845F] text-white py-3 rounded-xl font-black text-xs hover:bg-[#e07553] transition shadow-md mt-2 cursor-pointer"
            >
              {currentT.publishBtn}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};