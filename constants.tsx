
import React from 'react';
import { Scissors, User, Palette, Sparkles, Smile, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Service, GalleryItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Classic Haircut',
    price: 25,
    description: 'Precision cut tailored to your head shape and style preferences.',
    duration: '45 mins',
    icon: 'Scissors'
  },
  {
    id: 's2',
    name: 'Beard Styling',
    price: 15,
    description: 'Detailed shaping and grooming of your facial hair with hot towel finish.',
    duration: '30 mins',
    icon: 'User'
  },
  {
    id: 's3',
    name: 'Hair Coloring',
    price: 45,
    description: 'Professional coloring to cover greys or change your look completely.',
    duration: '90 mins',
    icon: 'Palette'
  },
  {
    id: 's4',
    name: 'Luxury Facial',
    price: 35,
    description: 'Deep cleansing and rejuvenation for a fresh, healthy glow.',
    duration: '40 mins',
    icon: 'Sparkles'
  },
  {
    id: 's5',
    name: 'Head Massage',
    price: 20,
    description: 'Relaxing pressure point massage to relieve stress and tension.',
    duration: '20 mins',
    icon: 'Smile'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800', title: 'Modern Fade' },
  { id: 2, url: 'https://images.unsplash.com/photo-1621605815841-aa33c6ceb02c?auto=format&fit=crop&q=80&w=800', title: 'Textured Crop' },
  { id: 3, url: 'https://images.unsplash.com/photo-1599351431247-f10b218163e3?auto=format&fit=crop&q=80&w=800', title: 'Executive Contour' },
  { id: 4, url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800', title: 'Beard Perfection' },
  { id: 5, url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800', title: 'Classic Side Part' },
  { id: 6, url: 'https://images.unsplash.com/photo-1592647425447-181099a8975c?auto=format&fit=crop&q=80&w=800', title: 'Viking Style' }
];

export const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM'
];

export const CONTACT_INFO = {
  phone: '+919306155980',
  whatsapp: '+919306155980',
  email: 'contact@ajjubhaibarber.com',
  address: '123 Luxury Lane, Royal Street, Mumbai, India',
  hours: 'Mon - Sun: 09:00 AM - 09:00 PM'
};
