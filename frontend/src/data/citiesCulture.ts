export interface CityCulture {
  name: { ar: string; en: string; fr: string };
  badgeClass: string;
  icon: string;
  tagline: { ar: string; en: string; fr: string };
  architectureVibe: { ar: string; en: string; fr: string };
  famousFor: { ar: string; en: string; fr: string };
  bannerImg: string;
}

export const CITIES_CULTURE: Record<string, CityCulture> = {
  "الرباط": {
    name: { ar: "الرباط", en: "Rabat", fr: "Rabat" },
    badgeClass: "bg-blue-600 text-white",
    icon: "🏛️",
    tagline: {
      ar: "عاصمة الأنوار، هدوء أكدال وقرب الترامواي والجامعات",
      en: "City of Light: Quiet Agdal, near Tramway & Universities",
      fr: "Ville Lumière: Agdal calme, proche du Tramway et Universités"
    },
    architectureVibe: {
      ar: "معمار أندلسي عصري، طمأنينة الطالب والباحث",
      en: "Modern Andalusian architecture, serene student vibes",
      fr: "Architecture andalouse moderne, ambiance étudiante paisible"
    },
    famousFor: {
      ar: "صومعة حسان، حي أكدال، العرفان، والترامواي",
      en: "Hassan Tower, Agdal, Madinat Al Irfane, Tramway",
      fr: "Tour Hassan, Agdal, Madinat Al Irfane, Tramway"
    },
    bannerImg: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80"
  },
  "مراكش": {
    name: { ar: "مراكش", en: "Marrakech", fr: "Marrakech" },
    badgeClass: "bg-red-700 text-white",
    icon: "🏰",
    tagline: {
      ar: "المدينة الحمراء، بهجة السكن وقرب جليز ودوار العسكر",
      en: "The Red City: Vibrant living near Gueliz",
      fr: "La Ville Rouge: Vie animée près de Guéliz"
    },
    architectureVibe: {
      ar: "رياضات تقليدية، طابع مراكشي أصيل ودفء الجيران",
      en: "Traditional Riads, authentic Marrakchi charm",
      fr: "Riads traditionnels, charme marrakchi authentique"
    },
    famousFor: {
      ar: "جامع الفنا، جليز، الكتبية، والأجواء المبهجة",
      en: "Jemaa el-Fnaa, Gueliz, Koutoubia, joyful atmosphere",
      fr: "Jemaa el-Fnaa, Guéliz, Koutoubia, ambiance joyeuse"
    },
    bannerImg: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80"
  },
  "طنجة": {
    name: { ar: "طنجة", en: "Tangier", fr: "Tanger" },
    badgeClass: "bg-emerald-700 text-white",
    icon: "🌊",
    tagline: {
      ar: "عروس الشمال، نسيم البحر وسكن حي الملاحة وبلايا",
      en: "Bride of the North: Ocean breeze near Malabata & Playa",
      fr: "La Perle du Nord: Brise marine près de Malabata et Playa"
    },
    architectureVibe: {
      ar: "إطلالات بحرية، منازل بيضاء وزرقاء وطاقة متجددة",
      en: "Sea views, white & blue houses, refreshing energy",
      fr: "Vues sur mer, maisons blanches et bleues, énergie fraîche"
    },
    famousFor: {
      ar: "مغارة هرقل، كاب سبارتيل، مالاباطا، ومارشان",
      en: "Cave of Hercules, Cap Spartel, Malabata, Marshan",
      fr: "Grotte d'Hercule, Cap Spartel, Malabata, Marshan"
    },
    bannerImg: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80"
  },
  "الدار البيضاء": {
    name: { ar: "الدار البيضاء", en: "Casablanca", fr: "Casablanca" },
    badgeClass: "bg-slate-700 text-white",
    icon: "🏢",
    tagline: {
      ar: "العاصمة الاقتصادية، حيوية المعاريف وغاندي وشارع أنوال",
      en: "Economic Capital: Lively Maarif, Ghandi & Anwal",
      fr: "Capitale Économique: Vie dynamique à Maârif et Ghandi"
    },
    architectureVibe: {
      ar: "عمارات حديثة، نبض الحياة السريعة وقرب كل المرافق",
      en: "Modern apartments, fast-paced city life",
      fr: "Appartements modernes, rythme de vie dynamique"
    },
    famousFor: {
      ar: "مسجد الحسن الثاني، المعاريف، عين الذئاب، والشركات",
      en: "Hassan II Mosque, Maarif, Ain Diab, Business hubs",
      fr: "Mosquée Hassan II, Maârif, Ain Diab, Centres d'affaires"
    },
    bannerImg: "https://images.unsplash.com/photo-1572314493295-09c3d7f95088?auto=format&fit=crop&w=1200&q=80"
  },
  "خريبكة": {
    name: { ar: "خريبكة", en: "Khouribga", fr: "Khouribga" },
    badgeClass: "bg-amber-600 text-white",
    icon: "💻",
    tagline: {
      ar: "عاصمة الفوسفاط ومقر مدرسة 1337، هدوء مثالي للبرمجة",
      en: "Phosphate Capital & 1337 Coding School home",
      fr: "Capitale du Phosphate & Foyer de l'école 1337"
    },
    architectureVibe: {
      ar: "سكن هادئ وقريب جداً من المجمع الشريف للفوسفاط و 1337",
      en: "Quiet housing very close to 1337 campus",
      fr: "Logements calmes à proximité du campus 1337"
    },
    famousFor: {
      ar: "مدرسة 1337 البرمجية، الفوسفاط، وحي الزيتونة والبيوت الهادئة",
      en: "1337 Coding School, OCP, Olive district",
      fr: "École 1337, OCP, Quartier Zeitouna"
    },
    bannerImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
  }
};