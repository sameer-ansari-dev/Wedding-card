import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MandalaOrnament } from '../common/MandalaOrnament';
import { GoldenRaysParticles } from '../common/GoldenRaysParticles';
import { MailOpen, Sparkles } from 'lucide-react';

export const RoyalGateOverlay = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpenClick = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);
    
    // Trigger audio & parent state
    if (onOpen) {
      onOpen();
    }

    // Unmount overlay after 2.4s (3D gate animation completion)
    setTimeout(() => {
      setIsOpen(true);
    }, 2400);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="royal-gate-master"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-50 overflow-hidden bg-[#0A0307] select-none flex items-center justify-center gpu-layer"
          style={{ perspective: '2500px' }}
        >
          {/* Ambient Deep Luxury Vignette Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#3D1421_0%,_#1B0B12_60%,_#090206_100%)] z-0 pointer-events-none">
            <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
          </div>

          {/* Divine Light Rays & Dust Particles */}
          <GoldenRaysParticles active={isAnimating} />

          {/* 3D MASSIVE PALACE LEFT GATE DOOR */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={isAnimating ? { rotateY: -105 } : { rotateY: 0 }}
            transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1F0710] via-[#350F1B] to-[#210711] border-r-2 border-gold/40 z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-end pointer-events-none"
          >
            <motion.div
              aria-hidden="true"
              animate={isAnimating ? { opacity: [0, 0.55, 0], x: [18, -8, -28] } : { opacity: 0, x: 18 }}
              transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.45, 1] }}
              className="absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-r from-transparent via-gold/25 to-transparent"
            />
            {/* Massive Engraved Gold Islamic Arch & Carvings */}
            <div className="absolute inset-4 sm:inset-8 rounded-r-[10rem] border-2 border-gold/30 border-l-0 p-6 pointer-events-none bg-maroon-900/20 flex flex-col justify-between items-end">
              <div className="w-16 h-16 border-t-2 border-r-2 border-gold/60 rounded-tr-xl" />
              <MandalaOrnament className="w-40 h-40 sm:w-60 sm:h-60 opacity-15" color="#D4AF37" animate={false} />
              <div className="w-16 h-16 border-b-2 border-r-2 border-gold/60 rounded-br-xl" />
            </div>
            {/* Gold Handle */}
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-4 sm:w-6 h-28 rounded-l-full bg-gradient-to-r from-gold-dark via-gold to-gold-amber border border-gold-light shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          </motion.div>

          {/* 3D MASSIVE PALACE RIGHT GATE DOOR */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={isAnimating ? { rotateY: 105 } : { rotateY: 0 }}
            transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1F0710] via-[#350F1B] to-[#210711] border-l-2 border-gold/40 z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-start pointer-events-none"
          >
            <motion.div
              aria-hidden="true"
              animate={isAnimating ? { opacity: [0, 0.55, 0], x: [-18, 8, 28] } : { opacity: 0, x: -18 }}
              transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.45, 1] }}
              className="absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-l from-transparent via-gold/25 to-transparent"
            />
            {/* Massive Engraved Gold Islamic Arch & Carvings */}
            <div className="absolute inset-4 sm:inset-8 rounded-l-[10rem] border-2 border-gold/30 border-r-0 p-6 pointer-events-none bg-maroon-900/20 flex flex-col justify-between items-start">
              <div className="w-16 h-16 border-t-2 border-l-2 border-gold/60 rounded-tl-xl" />
              <MandalaOrnament className="w-40 h-40 sm:w-60 sm:h-60 opacity-15" color="#D4AF37" animate={false} />
              <div className="w-16 h-16 border-b-2 border-l-2 border-gold/60 rounded-bl-xl" />
            </div>
            {/* Gold Handle */}
            <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-6 h-28 rounded-r-full bg-gradient-to-l from-gold-dark via-gold to-gold-amber border border-gold-light shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          </motion.div>

          {/* CLOSED GATE FOREGROUND CONTENT (SEAL & BUTTON ONLY - NAMES ARE HIDDEN UNTIL GATES OPEN!) */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={isAnimating ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative z-30 flex flex-col items-center justify-between min-h-screen py-12 px-4 w-full max-w-2xl mx-auto text-center"
          >
            {/* TOP AREA: LUXURY ISLAMIC SEAL (SLOW MATERIALIZE & CONTINUOUS ROTATION) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isAnimating ? { opacity: 1, scale: 1.3 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 1.0 }}
              className="mt-auto mb-[50px] flex flex-col items-center"
            >
              <div className="relative p-3 rounded-full border border-gold/50 bg-maroon-950/80 shadow-[0_0_35px_rgba(212,175,55,0.4)]">
                <MandalaOrnament className="w-24 h-24 sm:w-32 sm:h-32" color="#D4AF37" animate={!isAnimating} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-gold-light animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* MIDDLE AREA: SUBTITLE (NO NAMES SHOWING BEFORE GATES UNLOCK!) */}
            <div className="flex flex-col items-center text-center my-auto w-full">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.4 }}
                className="font-cinzel text-gold-light uppercase tracking-[0.35em] font-semibold"
                style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.5rem)' }}
              >
                THE ROYAL WEDDING INVITATION
              </motion.h2>
              <p className="text-xs font-serif italic text-gold/70 mt-2 tracking-widest">
                Solemnization of Sacred Union
              </p>
            </div>

            {/* BOTTOM AREA: OPEN INVITATION BUTTON (MAGNETIC HOVER, GOLD SHIMMER & RIPPLE) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-auto mt-[60px]"
            >
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenClick}
                disabled={isAnimating}
                className="group relative px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-amber text-maroon-950 font-bold tracking-[0.25em] shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center gap-3.5 border-2 border-gold-light cursor-pointer transition-all duration-300"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)' }}
              >
                {/* Continuous Gold Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <MailOpen className="w-5 h-5 text-maroon-950 shrink-0" />
                <span className="font-cinzel uppercase">OPEN INVITATION</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
