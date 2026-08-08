export type Language = 'ar' | 'en' | 'fr';

export interface LocalizedString {
  ar: string;
  en: string;
  fr: string;
}

export interface Listing {
  id: number;
  title: LocalizedString;
  city: string;
  cityEnFr: string;
  district: string;
  districtEnFr: string;
  price: number;
  bedrooms: number;
  hasWifi: boolean;
  imageUrl: string;
  description: LocalizedString;
  ownerName: string;
  lat?: number;
  lng?: number;
}

export interface Message {
  sender: 'me' | 'owner';
  text: string;
  time: string;
}

export interface ChatConversation {
  id: number;
  userName: string;
  avatar: string;
  lastMessage: string;
  messages: Message[];
}