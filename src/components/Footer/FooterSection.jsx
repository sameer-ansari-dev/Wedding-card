import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../config/weddingData';
import { MandalaOrnament } from '../common/MandalaOrnament';
import { Heart, Sparkles } from 'lucide-react';

export const FooterSection = () => {
  return (
    <footer className="relative py-16 px-4 w-full bg-maroon-950 text-cream border-t border-gold/40 overflow-hidden gpu-layer">
      {/* Background Star grid */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
        <MandalaOrnament className="w-20 h-20 sm:w-24 sm:h-24 mb-4" color="#D4AF37" />

        {/* JazakAllah Arabic Calligraphy */}
        <h3 className="font-arabic text-3xl sm:text-4xl text-gold-light mb-2">
          {WEDDING_DATA.hostNote.arabic}
        </h3>
        <p className="text-xs text-gold/80 font-serif italic mb-4">
          ({WEDDING_DATA.hostNote.translation})
        </p>

        <p className="text-sm sm:text-base text-cream/90 font-serif max-w-lg leading-relaxed mb-6">
          "{WEDDING_DATA.hostNote.text}"
        </p>

        {/* Couple Signature Line */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="w-12 sm:w-20 h-[1px] bg-gold/40" />
          <Heart className="w-4 h-4 text-gold fill-gold" />
          <span className="font-serif text-xl sm:text-2xl font-bold gold-text-gradient">
            {WEDDING_DATA.groom.name.split(" ")[0]} & {WEDDING_DATA.bride.name.split(" ")[0]}
          </span>
          <Heart className="w-4 h-4 text-gold fill-gold" />
          <div className="w-12 sm:w-20 h-[1px] bg-gold/40" />
        </div>

        <p className="text-xs font-sans text-cream/50 mt-6 tracking-widest uppercase">
          Crafted with love • Blessed Union 2026
        </p>
      </div>
    </footer>
  );
};
