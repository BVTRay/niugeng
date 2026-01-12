
export interface User {
  name: string;
  level: string;
  avatar: string;
  phone: string;
  validUntil: string;
  freeStaysRemaining: number;
  totalFreeStays: number;
  nextDelivery: string;
  deliveryStatus: '备货中' | '运输中' | '已送达' | '待确认' | '待开通';
  address: string;
  points: number;
  balance: number; // Added balance for wallet
}

export interface Product {
  id: number;
  name: string;
  price: number;
  memberPrice: number;
  image: string;
  tag?: string;
  desc: string;
  category: 'produce' | 'tea' | 'craft';
  // Detail fields
  story?: string;
  specs?: { label: string; value: string }[];
  tastingNotes?: string[];
  images?: string[];
}

export interface Room {
  id: number;
  name: string;
  price: number;
  memberPrice?: number; // Added member price
  image: string;
  tags: string[];
  isAvailable: boolean;
  // Detail fields
  description?: string;
  amenities?: string[];
  size?: string;
  images?: string[];
}

export interface WeatherData {
  day: string;
  temp: number;
}

export interface FieldNote {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  date: string;
  // Detail fields
  content?: string[]; // Array of paragraphs
  author?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'completed';
  items: string[];
  total: number;
}

// Updated Tab Types based on new requirements
export type TabType = 'home' | 'market' | 'letter' | 'homestay' | 'profile';

// Navigation Types
export type ViewState = 
  | { type: 'main'; tab: TabType }
  | { type: 'product-detail'; id: number }
  | { type: 'room-detail'; id: number }
  | { type: 'note-detail'; id: number }
  | { type: 'orders' }
  | { type: 'benefits' }
  | { type: 'membership-manual' }
  | { type: 'settings' }
  | { type: 'account-security'; from: 'profile' | 'settings' }
  | { type: 'notification-settings'; from: 'settings' | 'messages' }
  | { type: 'messages' }
  | { type: 'customer-service' }
  | { type: 'membership-intro'; from: string }
  | { type: 'membership-payment'; tierId: 'granary' | 'homestead' }
  | { type: 'certificate' };
