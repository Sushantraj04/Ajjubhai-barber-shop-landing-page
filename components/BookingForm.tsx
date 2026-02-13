
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES, TIME_SLOTS } from '../constants';
import { bookingService } from '../services/bookingService';
import { CheckCircle, Calendar, Clock, User, Phone, Scissors, Loader2 } from 'lucide-react';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: SERVICES[0].name,
    date: new Date().toISOString().split('T')[0],
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.time) throw new Error('Please select a time slot.');
      await bookingService.addBooking(formData);
      setSuccess(true);
      // Reset form after success
      setFormData({
        name: '',
        phone: '',
        service: SERVICES[0].name,
        date: new Date().toISOString().split('T')[0],
        time: ''
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during booking.');
    } finally {
      setLoading(false);
    }
  };

  const alreadyBookedSlots = bookingService.getBookings()
    .filter(b => b.date === formData.date)
    .map(b => b.time);

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 bg-neutral-900/50 rounded-2xl border-2 border-[#d4af37]/30 text-center"
      >
        <div className="w-20 h-20 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-[#d4af37]" />
        </div>
        <h3 className="font-cinzel text-3xl gold-gradient mb-4">Booking Confirmed!</h3>
        <p className="text-neutral-300 max-w-xs mb-8">
          Your appointment has been successfully booked! We've sent a notification to our team.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="gold-bg text-black px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all"
        >
          Book Another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900/50 p-8 md:p-12 rounded-2xl border border-neutral-800 backdrop-blur-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
            <User size={14} /> Full Name
          </label>
          <input
            required
            type="text"
            placeholder="John Doe"
            className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-white focus:outline-none focus:border-[#d4af37] transition-all"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
            <Phone size={14} /> Phone Number
          </label>
          <input
            required
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-white focus:outline-none focus:border-[#d4af37] transition-all"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        {/* Service Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
            <Scissors size={14} /> Select Service
          </label>
          <select
            className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-white focus:outline-none focus:border-[#d4af37] transition-all appearance-none"
            value={formData.service}
            onChange={e => setFormData({...formData, service: e.target.value})}
          >
            {SERVICES.map(s => <option key={s.id} value={s.name}>{s.name} - ${s.price}</option>)}
          </select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
            <Calendar size={14} /> Date
          </label>
          <input
            required
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-white focus:outline-none focus:border-[#d4af37] transition-all"
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value, time: ''})}
          />
        </div>
      </div>

      {/* Time Slots */}
      <div className="mt-10">
        <label className="text-sm font-medium text-neutral-400 flex items-center gap-2 mb-4">
          <Clock size={14} /> Available Time Slots
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {TIME_SLOTS.map(slot => {
            const isBooked = alreadyBookedSlots.includes(slot);
            const isSelected = formData.time === slot;
            return (
              <button
                key={slot}
                type="button"
                disabled={isBooked}
                onClick={() => setFormData({...formData, time: slot})}
                className={`
                  p-3 rounded-lg text-sm font-medium transition-all border
                  ${isBooked ? 'opacity-30 cursor-not-allowed bg-neutral-800 border-neutral-700 text-neutral-500' : ''}
                  ${isSelected ? 'gold-bg text-black border-[#d4af37] scale-105 shadow-lg shadow-[#d4af37]/20' : 'bg-black border-neutral-700 text-white hover:border-[#d4af37]'}
                `}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="mt-6 text-red-500 text-center font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

      <div className="mt-10">
        <button
          type="submit"
          disabled={loading}
          className="w-full gold-bg text-black font-black text-lg py-5 rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'CONFIRM APPOINTMENT'}
        </button>
      </div>
      <p className="mt-4 text-center text-neutral-500 text-xs">
        Secure checkout • 24h cancellation policy • Premium Service Guaranteed
      </p>
    </form>
  );
};

export default BookingForm;
