
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Scissors, User, Phone, MapPin, Instagram, Facebook, 
  Twitter, MessageCircle, ArrowRight, Menu, X, ChevronRight,
  ExternalLink, Award, ShieldCheck, Zap, Mail, Clock
} from 'lucide-react';
import { SectionId, Service } from './types';
import { SERVICES, GALLERY_ITEMS, CONTACT_INFO } from './constants';
import Logo3D from './components/Logo3D';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Hero);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Intersection observer for section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(SectionId).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: 'Home', id: SectionId.Hero },
    { label: 'About', id: SectionId.About },
    { label: 'Services', id: SectionId.Services },
    { label: 'Gallery', id: SectionId.Gallery },
    { label: 'Booking', id: SectionId.Booking },
  ];

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 gold-bg z-[100] origin-left" style={{ scaleX }} />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a 
          href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
        >
          <MessageCircle size={32} />
        </a>
        <a 
          href={`tel:${CONTACT_INFO.phone}`} 
          className="w-14 h-14 gold-bg rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 transition-transform"
        >
          <Phone size={28} />
        </a>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick(SectionId.Hero)}>
            <Logo3D size="sm" />
            <h1 className="font-cinzel text-xl md:text-2xl font-bold tracking-tighter">
              <span className="text-white">AJJUBHAI</span>
              <span className="block text-[#d4af37] text-xs font-montserrat tracking-[0.3em]">BARBER SHOP</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-[#d4af37] ${
                  activeSection === item.id ? 'text-[#d4af37]' : 'text-white/60'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick(SectionId.Booking)}
              className="px-6 py-2 border-2 border-[#d4af37] text-[#d4af37] font-bold rounded-full hover:bg-[#d4af37] hover:text-black transition-all"
            >
              BOOK NOW
            </button>
          </nav>

          <button className="md:hidden text-[#d4af37]" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        >
          <button className="absolute top-6 right-6 text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>
            <X size={40} />
          </button>
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-cinzel text-3xl text-white hover:text-[#d4af37]"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick(SectionId.Booking)}
              className="mt-4 gold-bg text-black font-black px-12 py-4 rounded-full text-xl"
            >
              BOOK NOW
            </button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section id={SectionId.Hero} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
            alt="Barber" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 z-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Logo3D size="lg" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-cinzel text-5xl md:text-8xl font-black mt-12 mb-4 tracking-tighter"
          >
            <span className="block text-white">AJJUBHAI</span>
            <span className="gold-gradient">BARBER SHOP</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-neutral-400 text-lg md:text-2xl max-w-2xl font-light tracking-widest uppercase mb-12"
          >
            Premium Grooming Experience
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col md:flex-row gap-6"
          >
            <button 
              onClick={() => handleNavClick(SectionId.Booking)}
              className="gold-bg text-black px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl shadow-[#d4af37]/30"
            >
              BOOK APPOINTMENT <ArrowRight />
            </button>
            <button 
              onClick={() => handleNavClick(SectionId.Services)}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all"
            >
              VIEW SERVICES
            </button>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
           <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
             <div className="w-1 h-2 bg-[#d4af37] rounded-full" />
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id={SectionId.About} className="py-32 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 relative">
               <div className="absolute -inset-4 gold-border border-2 rounded-2xl -z-10 translate-x-4 translate-y-4" />
               <img 
                 src="https://images.unsplash.com/photo-1599351431247-f10b218163e3?auto=format&fit=crop&q=80&w=1000" 
                 alt="Luxury Salon" 
                 className="w-full h-[600px] object-cover rounded-2xl"
               />
               <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-xl p-8 rounded-xl border border-white/10">
                 <div className="flex gap-4 items-center mb-4">
                   <div className="w-12 h-12 gold-bg rounded-lg flex items-center justify-center text-black">
                     <Award size={28} />
                   </div>
                   <h4 className="font-cinzel text-xl font-bold">15+ Years Excellence</h4>
                 </div>
                 <p className="text-neutral-400">Master barbers dedicated to the craft of traditional and modern grooming.</p>
               </div>
            </div>

            <div className="w-full lg:w-1/2">
               <span className="text-[#d4af37] font-bold tracking-[0.3em] text-sm mb-4 block">ESTABLISHED 2008</span>
               <h2 className="font-cinzel text-4xl md:text-6xl font-black mb-8 leading-tight">THE ART OF <br/><span className="gold-gradient">MASCULINE LUXURY</span></h2>
               <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                 AJJUBHAI BARBER SHOP isn't just a place for a haircut. It's a sanctuary for the modern man who values precision, style, and a moment of relaxation. Founded on the principles of traditional craftsmanship and modern aesthetics, we provide a grooming experience that is second to none.
               </p>
               <p className="text-neutral-400 text-lg mb-12 leading-relaxed">
                 From our premium products to our expert techniques, every detail is designed to make you look and feel your absolute best. Step into our world of luxury and transform your style.
               </p>

               <div className="grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2">
                   <div className="text-[#d4af37] font-bold text-4xl font-cinzel">5000+</div>
                   <div className="text-white font-medium uppercase tracking-widest text-xs">Happy Clients</div>
                 </div>
                 <div className="flex flex-col gap-2">
                   <div className="text-[#d4af37] font-bold text-4xl font-cinzel">12</div>
                   <div className="text-white font-medium uppercase tracking-widest text-xs">Expert Barbers</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id={SectionId.Services} className="py-32 bg-neutral-900/40 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#d4af37] font-bold tracking-[0.3em] text-sm mb-4 block">OUR EXPERTISE</span>
            <h2 className="font-cinzel text-4xl md:text-6xl font-black mb-4">PREMIUM <span className="gold-gradient">SERVICES</span></h2>
            <div className="w-24 h-1 gold-bg mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -10 }}
                className="bg-black/60 p-10 rounded-3xl border border-white/5 hover:border-[#d4af37]/40 transition-all group"
              >
                <div className="w-16 h-16 gold-bg rounded-2xl flex items-center justify-center text-black mb-8 group-hover:scale-110 transition-transform">
                  {service.name === 'Classic Haircut' && <Scissors size={32} />}
                  {service.name === 'Beard Styling' && <User size={32} />}
                  {service.name === 'Hair Coloring' && <ShieldCheck size={32} />}
                  {service.name === 'Luxury Facial' && <Zap size={32} />}
                  {service.name === 'Head Massage' && <Award size={32} />}
                </div>
                <h3 className="font-cinzel text-2xl font-bold mb-4">{service.name}</h3>
                <p className="text-neutral-500 mb-8 h-12 line-clamp-2">{service.description}</p>
                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                  <span className="text-2xl font-bold text-[#d4af37]">${service.price}</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-500">{service.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button 
              onClick={() => handleNavClick(SectionId.Booking)}
              className="px-12 py-5 border-2 border-[#d4af37] text-[#d4af37] font-black text-xl rounded-full hover:bg-[#d4af37] hover:text-black transition-all"
            >
              EXPLORE ALL SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id={SectionId.Gallery} className="py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#d4af37] font-bold tracking-[0.3em] text-sm mb-4 block">STYLISH CUTS</span>
            <h2 className="font-cinzel text-4xl md:text-6xl font-black mb-4">HAIRSTYLE <span className="gold-gradient">GALLERY</span></h2>
            <div className="w-24 h-1 gold-bg mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-[#d4af37] transition-all"
              >
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <div>
                    <h4 className="font-cinzel text-2xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-[#d4af37] text-sm font-bold tracking-widest">MASTERPIECE</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior Showcase Section */}
      <section id={SectionId.Interior} className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-[#d4af37] font-bold tracking-[0.3em] text-sm mb-4 block">OUR AMBIANCE</span>
              <h2 className="font-cinzel text-4xl md:text-6xl font-black mb-8 leading-tight">ELEGANT <br/><span className="gold-gradient">SALON INTERIOR</span></h2>
              <p className="text-neutral-400 text-lg mb-12">
                Our salon is designed to offer a tranquil escape from the urban hustle. With vintage-inspired décor, Italian leather chairs, and custom lighting, every aspect of our interior reflects the premium nature of our services.
              </p>
              <ul className="space-y-6">
                {[
                  'Vintage-style professional barber chairs',
                  'Complimentary premium drinks lounge',
                  'State-of-the-art grooming equipment',
                  'Private VIP grooming booths'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white">
                    <div className="w-6 h-6 rounded-full gold-bg flex items-center justify-center">
                       <ChevronRight size={16} className="text-black" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/2 relative group">
               <div className="absolute inset-0 bg-[#d4af37]/10 -rotate-3 rounded-3xl scale-105" />
               <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                 <img 
                   src="https://images.unsplash.com/photo-1512690196252-7170ef692c4c?auto=format&fit=crop&q=80&w=1200" 
                   alt="Interior" 
                   className="w-full h-auto"
                 />
                 <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/5">
                   <p className="font-cinzel text-xl text-center italic">"Luxury is in each detail."</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking System Section */}
      <section id={SectionId.Booking} className="py-32 bg-black">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-bold tracking-[0.3em] text-sm mb-4 block">GET THE LOOK</span>
            <h2 className="font-cinzel text-4xl md:text-6xl font-black mb-4">BOOK YOUR <span className="gold-gradient">APPOINTMENT</span></h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Select your preferred service, date, and time. We'll handle the rest and send you a confirmation.</p>
          </div>
          
          <BookingForm />
        </div>
      </section>

      {/* Admin Panel Section */}
      <section id={SectionId.Admin} className="py-32 bg-neutral-950 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
           <AdminPanel />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Logo3D size="sm" />
                <h1 className="font-cinzel text-2xl font-bold">AJJUBHAI</h1>
              </div>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Defining the standard of masculine excellence since 2008. The ultimate destination for modern grooming in Mumbai.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"><Twitter size={18} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-cinzel text-xl font-bold mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button onClick={() => handleNavClick(item.id)} className="text-neutral-500 hover:text-[#d4af37] transition-colors flex items-center gap-2">
                      <ChevronRight size={14} /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-cinzel text-xl font-bold mb-8">Contact Info</h4>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <MapPin className="text-[#d4af37] shrink-0" size={20} />
                  <span className="text-neutral-500">{CONTACT_INFO.address}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <Phone className="text-[#d4af37] shrink-0" size={20} />
                  <span className="text-neutral-500">{CONTACT_INFO.phone}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <Mail className="text-[#d4af37] shrink-0" size={20} />
                  <span className="text-neutral-500">{CONTACT_INFO.email}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <Clock className="text-[#d4af37] shrink-0" size={20} />
                  <span className="text-neutral-500">{CONTACT_INFO.hours}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-cinzel text-xl font-bold mb-8">Location</h4>
              <div className="h-48 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 flex items-center justify-center group relative cursor-pointer">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.1895696660124!2d72.8335!3d18.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c6fd6e340b%3A0xc49b78e24c0840c2!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625482319042!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  className="grayscale invert hover:grayscale-0 transition-all duration-700"
                ></iframe>
                <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-black/80 px-4 py-2 rounded-full text-xs font-bold text-[#d4af37] border border-[#d4af37]">VIEW MAP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-neutral-600 text-sm">
              © 2024 AJJUBHAI BARBER SHOP. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-neutral-600 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-neutral-600 hover:text-white text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
