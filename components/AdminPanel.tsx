
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types';
import { Trash2, LogOut, Calendar, Clock, User, Phone, Briefcase } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      setBookings(bookingService.getBookings().sort((a, b) => b.createdAt - a.createdAt));
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock auth
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      bookingService.deleteBooking(id);
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800">
        <h2 className="font-cinzel text-3xl gold-gradient mb-8">Admin Login</h2>
        <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="bg-black border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="gold-bg text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 bg-neutral-900/30 rounded-2xl border border-neutral-800">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-cinzel text-3xl gold-gradient">Appointments</h2>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {bookings.length === 0 ? (
        <p className="text-neutral-500 text-center py-12">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-black/60 border border-neutral-800 p-5 rounded-xl hover:border-[#d4af37]/50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{booking.name}</h3>
                      <p className="text-neutral-400 text-sm flex items-center gap-1">
                        <Phone size={12} /> {booking.phone}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(booking.id)}
                    className="text-neutral-600 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-2 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Briefcase size={14} className="text-[#d4af37]" />
                    <span>{booking.service}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Calendar size={14} className="text-[#d4af37]" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Clock size={14} className="text-[#d4af37]" />
                    <span>{booking.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
