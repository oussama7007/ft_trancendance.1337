export type Language = 'ar' | 'fr' | 'en';

export interface Listing {
  id: number;

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

  // الصور الإضافية ديال العقار
  images?: string[];

  // فيديو العقار
  video?: string;

  ownerName: string;

  lat?: number;
  lng?: number;
}

export interface RoommatePost {
  id: number;
  name: string;
  city: string;
  budget: number;
  bio: string;
  avatar: string;
  tags: string[];
}

export interface ChatMessage {
  sender: 'me' | 'other';
  text: string;
  time: string;
}

export interface ChatConversation {
  id: number;
  userName: string;
  avatar: string;
  lastMessage: string;
  messages: ChatMessage[];
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  avatar?: string;
}