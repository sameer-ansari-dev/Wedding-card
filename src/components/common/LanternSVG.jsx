import React from 'react';
import { motion } from 'framer-motion';

export const LanternSVG = ({ className = "w-16 h-32", delay = 0, scale = 1 }) => {
  return (
    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [-8, 8, -8],
        rotate: [-2, 2, -2]
      }}
      transition={{ 
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      style={{ transformOrigin: 'top center', scale }}
      className={`inline-block relative filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)] ${className}`}
    >
      <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Hanging Rope/Chain */}
        <line x1="50" y1="0" x2="50" y2="40" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 2" />
        
        {/* Top Ring */}
        <circle cx="50" cy="42" r="6" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
        
        {/* Dome Top */}
        <path d="M 30 65 Q 50 48 70 65 L 75 75 L 25 75 Z" fill="url(#goldGradient)" stroke="#AA771C" strokeWidth="1" />

        {/* Glass Lamp Body */}
        <path d="M 25 75 L 35 140 L 65 140 L 75 75 Z" fill="rgba(255, 230, 150, 0.2)" stroke="#D4AF37" strokeWidth="2" />

        {/* Intricate Geometric Grid Lines */}
        <line x1="50" y1="75" x2="50" y2="140" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
        <line x1="30" y1="107" x2="70" y2="107" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
        <line x1="28" y1="90" x2="72" y2="90" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
        <line x1="32" y1="124" x2="68" y2="124" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />

        {/* Inner Glowing Flame */}
        <circle cx="50" cy="107" r="12" fill="#FFF4B8" opacity="0.95" className="animate-pulse" />
        <circle cx="50" cy="107" r="22" fill="#FFD700" opacity="0.3" className="animate-ping" />

        {/* Base Bottom */}
        <path d="M 30 140 L 70 140 L 65 155 L 35 155 Z" fill="url(#goldGradient)" stroke="#AA771C" strokeWidth="1" />
        
        {/* Hanging Tassel */}
        <line x1="50" y1="155" x2="50" y2="185" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="50" cy="188" r="4" fill="#D4AF37" />

        {/* Gradients */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};
