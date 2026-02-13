
export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
  icon: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  createdAt: number;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
}

export enum SectionId {
  Hero = 'hero',
  About = 'about',
  Services = 'services',
  Gallery = 'gallery',
  Interior = 'interior',
  Booking = 'booking',
  Admin = 'admin'
}
