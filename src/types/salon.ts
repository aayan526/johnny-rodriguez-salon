export type ServiceCategory = 'all' | 'cuts' | 'color' | 'treatments' | 'styling' | 'bridal-lashes';

export interface SalonService {
  id: string;
  name: string;
  category: 'cuts' | 'color' | 'treatments' | 'styling' | 'bridal-lashes';
  priceDisplay: string;
  startingPrice: number | null; // null for by consultation
  duration: string;
  description: string;
  image: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  bio: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  location: string;
  avatar: string;
  serviceMention: string;
}

export interface DailySchedule {
  day: string;
  hours: string;
  hoursDisplay: string;
  isClosed: boolean;
  openHour?: number; // 24-hr format
  closeHour?: number; // 24-hr format
}

export interface BookingState {
  serviceId: string;
  stylistId: string;
  date: string;
  time: string;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}
