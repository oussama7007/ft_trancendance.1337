export type Language = 'ar' | 'fr' | 'en';

export interface User {
  id: number;

  firstName: string;
  lastName: string;
  fullName: string;

  email: string;
  phone: string;

  dateOfBirth: string;

  cin?: string;

  avatar?: string;

  instagram?: string;
  facebook?: string;
  linkedin?: string;

  bio?: string;

  role?: 'user' | 'admin';

  createdAt?: string;
  updatedAt?: string;
}

export interface Listing {
  id: number;

  ownerId: number;

  title: Record<Language, string>;
  description: Record<Language, string>;

  city: string;
  cityEnFr: string;

  district: string;
  districtEnFr: string;

  price: number;
  bedrooms: number;

  hasWifi: boolean;

  imageUrl: string;

  images?: string[];

  video?: string;

  ownerName: string;

  lat?: number;
  lng?: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface RoommatePost {
  id: number;

  ownerId?: number;

  name: string;

  city: string;

  budget: number;

  bio: string;

  avatar: string;

  tags: string[];

  createdAt?: string;
}

export interface ChatMessage {
  sender: 'me' | 'other';

  text: string;

  time: string;
}

export interface ChatConversation {
  id: number;

  userId?: number;

  userName: string;

  avatar: string;

  lastMessage: string;

  messages: ChatMessage[];
}