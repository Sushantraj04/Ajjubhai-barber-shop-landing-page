
import { Booking } from '../types';

const STORAGE_KEY = 'ajjubhai_bookings';

export const bookingService = {
  getBookings: (): Booking[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addBooking: async (booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
    const bookings = bookingService.getBookings();
    
    // Check for double booking
    const isConflict = bookings.some(
      b => b.date === booking.date && b.time === booking.time
    );

    if (isConflict) {
      throw new Error('This time slot is already booked. Please choose another one.');
    }

    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };

    const updatedBookings = [...bookings, newBooking];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));

    // Simulate SMS notification
    await bookingService.sendSMSNotification(newBooking);

    return newBooking;
  },

  deleteBooking: (id: string) => {
    const bookings = bookingService.getBookings();
    const updatedBookings = bookings.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  },

  sendSMSNotification: async (booking: Booking) => {
    const message = `
New Appointment Booked:
Name: ${booking.name}
Phone: ${booking.phone}
Service: ${booking.service}
Date: ${booking.date}
Time: ${booking.time}
    `.trim();

    console.log(`%c[SMS SYSTEM] Sending to +919306155980:`, 'color: #d4af37; font-weight: bold;');
    console.log(message);

    // In a real production environment, you would use:
    /*
    await fetch('https://api.twilio.com/...', {
      method: 'POST',
      body: JSON.stringify({ to: '+919306155980', body: message }),
      headers: { 'Authorization': `Basic ${btoa(TWILIO_SID + ':' + TWILIO_AUTH_TOKEN)}` }
    });
    */
    
    return true;
  }
};
