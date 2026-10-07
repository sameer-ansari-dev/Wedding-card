import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../config/weddingData';
import { LanternSVG } from '../common/LanternSVG';
import { MandalaOrnament } from '../common/MandalaOrnament';
import { GoldenRaysParticles } from '../common/GoldenRaysParticles';
import { Calendar, MapPin } from 'lucide-react';

export const HeroSection = () => {
  const groomName = WEDDING_DATA.groom.name.toUpperCase();
  const brideName = WEDDING_DATA.bride.name.toUpperCase();

  // Custom cubic-bezier easing for cinematic smooth blur-to-sharp reveals
  const customEase = [0.22, 1, 0.36, 1];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-4 overflow-hidden bg-radial-night gpu-layer">
      {/* Background Geometric Grid Pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-25 pointer-events-none" />

      {/* Floating Ambient Light Rays & Particles */}
      <GoldenRaysParticles active={true} />

      {/* Floating Side Lanterns */}
      <div className="absolute top-4 left-4 sm:left-12 z-10 pointer-events-none">
        <LanternSVG className="w-12 h-24 sm:w-16 sm:h-32" delay={0.2} />
      </div>
      <div className="absolute top-4 right-4 sm:right-12 z-10 pointer-events-none">
        <LanternSVG className="w-12 h-24 sm:w-16 sm:h-32" delay={1.2} />
      </div>

      {/* 1. BISMILLAH SECTION (FADE-UP) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: customEase }}
        className="flex flex-col items-center text-center z-10 max-w-xl w-full mt-4"
      >
        <MandalaOrnament className="w-20 h-20 sm:w-24 sm:h-24 mb-3" color="#D4AF37" />
        
        <span
          className="font-cinzel tracking-[0.35em] text-gold uppercase mb-3 font-semibold"
          style={{ fontSize: 'clamp(0.75rem, 2vw, 0.95rem)' }}
        >
          The Royal Wedding Celebration Of
        </span>

        {/* Bismillah Calligraphy Frame */}
          <div className="my-2 p-4 rounded-2xl bg-maroon-900/70 border border-gold/30 backdrop-blur-sm w-full shadow-2xl">
          <p
            className="font-arabic text-gold-light leading-relaxed font-bold"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            {WEDDING_DATA.bismillah.arabic}
          </p>
          <p
            className="text-cream/70 italic mt-1 font-serif"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 0.95rem)' }}
          >
            {WEDDING_DATA.bismillah.translation}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
            className="mt-2 text-sm sm:text-base font-serif text-gold/90 font-medium tracking-wide border-t border-gold/15 pt-2"
          >
            {WEDDING_DATA.bismillah.verse}
          </motion.p>
        </div>
      </motion.div>

      {/* 2. Couple name reveal */}
      <div className="flex flex-col items-center text-center my-8 z-10 w-full max-w-4xl px-2">
        {/* ZAID (GROOM NAME) REVEAL FIRST */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: customEase }}
          className="relative"
        >
          <h1
            className="font-serif font-bold text-gold-gradient tracking-wide uppercase leading-none drop-shadow-2xl"
            style={{ fontSize: 'clamp(2.4rem, 8vw, 6rem)' }}
          >
            {groomName}
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 font-sans tracking-wider mt-2">
            {WEDDING_DATA.groom.parents}
          </p>
        </motion.div>

        {/* GOLDEN "&" REVEAL SECOND */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: customEase }}
          className="my-3 flex items-center justify-center gap-4 w-full"
        >
          <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span
            className="font-serif italic text-gold-light font-normal drop-shadow-lg"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            &amp;
          </span>
          <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* ZAINAB (BRIDE NAME) REVEAL THIRD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: customEase }}
          className="relative"
        >
          <h1
            className="font-serif font-bold text-gold-gradient tracking-wide uppercase leading-none drop-shadow-2xl"
            style={{ fontSize: 'clamp(2.4rem, 8vw, 6rem)' }}
          >
            {brideName}
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 font-sans tracking-wider mt-2">
            {WEDDING_DATA.bride.parents}
          </p>
        </motion.div>
      </div>

      {/* 3. SAVE THE DATE PILL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0, ease: customEase }}
        className="z-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md px-4 mb-4"
      >
        <div className="w-full sm:w-auto px-6 py-3 rounded-full royal-glass flex items-center justify-center gap-3 border border-gold/40 text-cream shadow-xl">
          <Calendar className="w-4 h-4 text-gold shrink-0" />
          <span className="flex flex-col text-xs sm:text-sm font-sans tracking-wide font-medium text-center">
            <span>{WEDDING_DATA.displayDates.nikah}</span>
            <span className="text-[11px] text-gold/80 mt-0.5">{WEDDING_DATA.displayDates.hijri}</span>
          </span>
        </div>
        <div className="w-full sm:w-auto px-6 py-3 rounded-full royal-glass flex items-center justify-center gap-3 border border-gold/40 text-cream shadow-xl">
          <MapPin className="w-4 h-4 text-gold shrink-0" />
          <span className="text-xs sm:text-sm font-sans tracking-wide font-medium">
            Kotwali Dehat, Bijnor, Uttar Pradesh 246764
          </span>
        </div>
      </motion.div>
    </section>
  );
};
