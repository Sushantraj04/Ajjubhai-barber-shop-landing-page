
import React from 'react';
import { motion } from 'framer-motion';

const Logo3D: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  return (
    <motion.div 
      className={`relative flex items-center justify-center ${sizes[size]}`}
      animate={{ 
        rotateY: [0, 360],
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {/* Crown Icon */}
      <div className="absolute top-0 transform -translate-y-1/2">
        <svg width="60%" height="40" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="#d4af37" fillOpacity="0.2" />
        </svg>
      </div>

      {/* Circle Emblem */}
      <div className="w-full h-full rounded-full border-4 border-[#d4af37] flex items-center justify-center bg-black/40 backdrop-blur-sm gold-glow relative">
         <div className="absolute inset-2 rounded-full border border-[#d4af37]/30"></div>
         <span className="font-cinzel text-3xl md:text-5xl font-bold gold-gradient mt-4">AJ</span>
      </div>
    </motion.div>
  );
};

export default Logo3D;
