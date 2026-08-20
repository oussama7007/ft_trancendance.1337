import { Listing, User, ChatConversation } from '../types';

// =====================================================
// MOCK DATA
// =====================================================

let mockListings: Listing[] = [
  {
    id: 1,
    title: {
      en: 'Modern Apartment in Agdal',
      fr: 'Appartement moderne à Agdal',
      ar: 'شقة عصرية في أكدال'
    },
    description: {
      en: 'Fully furnished apartment near all amenities.',
      fr: 'Appartement entièrement meublé près de toutes commodités.',
      ar: 'شقة مفروشة بالكامل قريبة من جميع المرافق.'
    },
    city: 'الرباط',
    cityEnFr: 'Rabat',
    district: 'أكدال',
    districtEnFr: 'Agdal',
    price: 1800,
    bedrooms: 2,
    hasWifi: true,
    imageUrl:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400',
    ownerName: 'Soufiane El Idrissi',
    ownerId: 101
  }
];

let mockChats: ChatConversation[] = [
  {
    id: 1,
    userId: 101,
    userName: 'Youssef Alami',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    lastMessage: 'Salam, is the apartment still available?',
    messages: [
      {
        sender: 'other',
        text: 'Salam, is the apartment still available?',
        time: '10:30 AM'
      }
    ]
  }
];

// =====================================================
// TEMPORARY MOCK AUTH
// =====================================================

let loggedInUser: User | null = null;

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));


// =====================================================
// API SERVICE
// =====================================================

export const apiService = {

  // ===================================================
  // GET LISTINGS
  // ===================================================

  getListings: async (): Promise<Listing[]> => {
    await delay(500);

    return [...mockListings];
  },


  // ===================================================
  // CREATE LISTING
  // ===================================================

  createListing: async (
    newListingData: any
  ): Promise<Listing> => {

    await delay(800);

    const titleText =
      newListingData instanceof FormData
        ? newListingData.get('title') || 'عقار جديد'
        : newListingData.title?.ar ||
          newListingData.title ||
          'عقار جديد';

    const priceVal =
      newListingData instanceof FormData
        ? Number(newListingData.get('price')) || 0
        : Number(newListingData.price) || 0;

    const cityVal =
      newListingData instanceof FormData
        ? newListingData.get('city') || 'خريبكة'
        : newListingData.city || 'خريبكة';


    const listingToAdd: Listing = {

      id: Date.now(),

      title: {
        en: String(titleText),
        fr: String(titleText),
        ar: String(titleText)
      },

      description: {
        en: 'Added via web platform',
        fr: 'Ajouté via la plateforme web',
        ar: 'مضاف عبر المنصة الإلكترونية'
      },

      city: String(cityVal),

      cityEnFr: String(cityVal),

      district: 'حي جديد',

      districtEnFr: 'New District',

      price: priceVal,

      bedrooms: 1,

      hasWifi: true,

      imageUrl:
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=400',

      ownerName:
        loggedInUser?.fullName || 'Anonymous',

      ownerId:
        loggedInUser?.id || 999
    };


    mockListings.unshift(listingToAdd);

    return listingToAdd;
  },


  // ===================================================
  // LOGIN
  // ===================================================

  login: async (
    credentials: {
      email: string;
      password: string;
    }
  ): Promise<User> => {

    await delay(600);

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }


    // -----------------------------------------------
    // TEMPORARY USER
    // -----------------------------------------------

    const nameFromEmail = credentials.email
      .split('@')[0]
      .replace(/[._-]/g, ' ');


    loggedInUser = {

      id: 101,

      fullName: nameFromEmail,

      email: credentials.email,

      profilePic: ''
    };


    // -----------------------------------------------
    // TEMPORARY TOKEN
    // -----------------------------------------------

    localStorage.setItem(
      'irent_token',
      'mock_jwt_token_123'
    );


    // -----------------------------------------------
    // SAVE USER LOCALLY
    // -----------------------------------------------

    localStorage.setItem(
      'irent_user',
      JSON.stringify(loggedInUser)
    );


    return loggedInUser;
  },


  // ===================================================
  // REGISTER
  // ===================================================

  register: async (
    userData: {
      fullName: string;
      email: string;
      password: string;
    }
  ): Promise<User> => {

    await delay(800);


    if (
      !userData.fullName ||
      !userData.email ||
      !userData.password
    ) {
      throw new Error(
        'Full name, email and password are required'
      );
    }


    loggedInUser = {

      id: Date.now(),

      fullName: userData.fullName,

      email: userData.email,

      profilePic: ''
    };


    localStorage.setItem(
      'irent_token',
      'mock_jwt_token_123'
    );


    localStorage.setItem(
      'irent_user',
      JSON.stringify(loggedInUser)
    );


    return loggedInUser;
  },


  // ===================================================
  // LOGOUT
  // ===================================================

  logout: async (): Promise<void> => {

    await delay(200);

    loggedInUser = null;

    localStorage.removeItem(
      'irent_token'
    );

    localStorage.removeItem(
      'irent_user'
    );
  },


  // ===================================================
  // GET CURRENT USER
  // ===================================================

  getCurrentUser: async (): Promise<User | null> => {

    await delay(100);

    const token =
      localStorage.getItem('irent_token');

    const savedUser =
      localStorage.getItem('irent_user');


    if (!token || !savedUser) {
      return null;
    }


    try {

      const user: User =
        JSON.parse(savedUser);

      loggedInUser = user;

      return user;

    } catch (error) {

      console.error(
        'Invalid saved user',
        error
      );

      return null;
    }
  },


  // ===================================================
  // GET CHATS
  // ===================================================

  getChats: async (): Promise<ChatConversation[]> => {

    await delay(400);

    return [...mockChats];
  }

};