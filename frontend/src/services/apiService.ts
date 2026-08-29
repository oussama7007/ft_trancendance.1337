import { Listing, User, ChatConversation } from '../types';

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

let loggedInUser: User | null = null;

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {

  getListings: async (): Promise<Listing[]> => {
    const response = await fetch('http://localhost:3000/listings');

    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.status}`);
    }

    return response.json();
  },

  createListing: async (newListingData: any): Promise<Listing> => {
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
      ownerName: loggedInUser?.fullName || 'Anonymous',
      ownerId: loggedInUser?.id || 999
    };

    mockListings.unshift(listingToAdd);

    return listingToAdd;
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<User> => {
    await delay(600);

    const nameFromEmail = credentials.email
      .split('@')[0]
      .replace(/[._-]/g, ' ');

    loggedInUser = {
      id: 101,
      fullName: nameFromEmail,
      email: credentials.email,
      profilePic: ''
    };

    localStorage.setItem('irent_token', 'mock_jwt_token_123');

    return loggedInUser;
  },
  startRegistration: async (data: {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  cin?: string;
}) => {
  const response = await fetch(
    'http://localhost:3000/auth/register/start',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
},

registerContact: async (data: {
  registrationSessionId: string;
  type: 'email' | 'phone';
  value: string;
}) => {
  const response = await fetch(
    'http://localhost:3000/auth/register/contact',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
},

verifyRegistration: async (data: {
  registrationSessionId: string;
  code: string;
}) => {
  const response = await fetch(
    'http://localhost:3000/auth/register/verify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
},

finishRegistration: async (data: {
  registrationSessionId: string;
  password: string;
  passwordConfirmation: string;
}) => {
  const response = await fetch(
    'http://localhost:3000/auth/register/finish',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
},

  // register: async (userData: any): Promise<User> => {
  //   await delay(800);

  //   loggedInUser = {
  //     id: Date.now(),
  //     fullName: userData.fullName,
  //     email: userData.email,
  //     profilePic: ''
  //   };

  //   localStorage.setItem('irent_token', 'mock_jwt_token_123');

  //   return loggedInUser;
  // },

  logout: async (): Promise<void> => {
    await delay(200);

    loggedInUser = null;
    localStorage.removeItem('irent_token');
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem('irent_token');
    return token ? loggedInUser : null;
  },

  getChats: async (): Promise<ChatConversation[]> => {
    await delay(400);
    return [...mockChats];
  }
};