import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../config/weddingData';
import { LanternSVG } from '../common/LanternSVG';
import { MandalaOrnament } from '../common/MandalaOrnament';
import { Heart, Calendar, MapPin } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between pt-16 pb-12 px-4 overflow-hidden bg-radial-night gpu-layer">
      {/* Background Geometric Grid Pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none" />

      {/* Floating Side Lanterns */}
      <div className="absolute top-4 left-4 sm:left-12 z-10">
        <LanternSVG className="w-12 h-24 sm:w-16 sm:h-32" delay={0.2} />
      </div>
      <div className="absolute top-4 right-4 sm:right-12 z-10">
        <LanternSVG className="w-12 h-24 sm:w-16 sm:h-32" delay={1.2} />
      </div>

      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      {/* Top Welcome Crest */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex flex-col items-center text-center z-10 max-w-xl"
      >
        <MandalaOrnament className="w-20 h-20 sm:w-28 sm:h-28 mb-3" color="#D4AF37" />
        
        <span className="text-xs sm:text-sm font-cinzel tracking-[0.35em] text-gold uppercase mb-2">
          The Wedding Celebration Of
        </span>

        {/* Bismillah Calligraphy */}
        <div className="my-2 p-3 rounded-2xl bg-maroon-900/60 border border-gold/20 backdrop-blur-sm w-full max-w-md">
          <p className="font-arabic text-2xl sm:text-3xl text-gold-light leading-relaxed font-bold">
            {WEDDING_DATA.bismillah.arabic}
          </p>
          <p className="text-xs text-cream/70 italic mt-1 font-serif">
            {WEDDING_DATA.bismillah.translation}
          </p>
          <div className="mt-2 text-[11px] font-sans text-gold/90 font-medium tracking-wide border-t border-gold/10 pt-1.5">
            {WEDDING_DATA.bismillah.verse} <span className="text-gold/60">• {WEDDING_DATA.bismillah.surah}</span>
          </div>
        </div>
      </motion.div>

      {/* Middle Couple Names Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="flex flex-col items-center text-center my-6 z-10 w-full max-w-3xl"
      >
        {/* Groom */}
        <div className="relative group">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight gold-text-gradient drop-shadow-lg">
            {WEDDING_DATA.groom.name}
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 font-sans tracking-wider mt-1">
            {WEDDING_DATA.groom.parents}
          </p>
        </div>

        {/* Ampersand Crescent Divider */}
        <div className="my-4 flex items-center gap-4 w-full justify-center">
          <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-maroon-900/80 shadow-inner">
            <Heart className="w-5 h-5 text-gold animate-pulse fill-gold/20" />
          </div>
          <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        {/* Bride */}
        <div className="relative group">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight gold-text-gradient drop-shadow-lg">
            {WEDDING_DATA.bride.name}
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 font-sans tracking-wider mt-1">
            {WEDDING_DATA.bride.parents}
          </p>
        </div>
      </motion.div>

      {/* Bottom Save The Date Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="z-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md px-4"
      >
        <div className="w-full sm:w-auto px-6 py-3 rounded-full royal-glass flex items-center justify-center gap-3 border border-gold/40 text-cream shadow-xl">
          <Calendar className="w-4 h-4 text-gold" />
          <span className="text-xs sm:text-sm font-sans tracking-wide font-medium">
            {WEDDING_DATA.displayDates.nikah}
          </span>
        </div>
        <div className="w-full sm:w-auto px-6 py-3 rounded-full royal-glass flex items-center justify-center gap-3 border border-gold/40 text-cream shadow-xl">
          <MapPin className="w-4 h-4 text-gold" />
          <span className="text-xs sm:text-sm font-sans tracking-wide font-medium">
            Kotwali Dehat, Distt. Bijnor, Uttar Pardesh
          </span>
        </div>
      </motion.div>
    </section>
  );
};
