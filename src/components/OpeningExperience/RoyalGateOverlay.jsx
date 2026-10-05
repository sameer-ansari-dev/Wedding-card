import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MandalaOrnament } from '../common/MandalaOrnament';
import { LanternSVG } from '../common/LanternSVG';
import { WEDDING_DATA } from '../../config/weddingData';
import { Sparkles, MailOpen } from 'lucide-react';

export const RoyalGateOverlay = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpenClick = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);
    
    // Trigger audio & parent notifications
    if (onOpen) {
      onOpen();
    }

    // After animation duration (2.8s), unmount gate completely
    setTimeout(() => {
      setIsOpen(true);
    }, 2800);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="royal-gate-3d-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-50 overflow-hidden bg-midnight select-none flex items-center justify-center gpu-layer"
          style={{ perspective: '2000px' }}
        >
          {/* Ambient Moonlight & Radial Vignette Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3D1421_0%,_#1B0B12_70%,_#090306_100%)] z-0 pointer-events-none">
            {/* Stars & Grid Texture */}
            <div className="absolute inset-0 bg-islamic-pattern opacity-15" />
            <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
          </div>

          {/* Golden Rays Light Beam when Gate Opens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isAnimating ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.45)_0%,_rgba(212,175,55,0.15)_40%,_transparent_70%)] blur-2xl" />
          </motion.div>

          {/* Floating Corner Lanterns */}
          <div className="absolute top-2 left-4 sm:left-12 z-30 pointer-events-none">
            <LanternSVG className="w-10 h-20 sm:w-16 sm:h-32 opacity-80" delay={0} />
          </div>
          <div className="absolute top-2 right-4 sm:right-12 z-30 pointer-events-none">
            <LanternSVG className="w-10 h-20 sm:w-16 sm:h-32 opacity-80" delay={1.2} />
          </div>

          {/* 3D ROYAL LEFT GATE DOOR */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={isAnimating ? { rotateY: -110 } : { rotateY: 0 }}
            transition={{ duration: 2.6, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#2A0D16] via-[#3D1421] to-[#250912] border-r border-gold/50 z-20 shadow-2xl flex items-center justify-end"
          >
            {/* Left Door Gold Arch Pattern */}
            <div className="absolute inset-3 sm:inset-6 rounded-r-[8rem] border-2 border-gold/30 border-l-0 p-4 pointer-events-none bg-maroon-900/30 flex flex-col justify-between items-end">
              <div className="w-12 h-12 border-t-2 border-r-2 border-gold/50 rounded-tr-lg" />
              <MandalaOrnament className="w-32 h-32 sm:w-48 sm:h-48 opacity-20" color="#D4AF37" animate={false} />
              <div className="w-12 h-12 border-b-2 border-r-2 border-gold/50 rounded-br-lg" />
            </div>
            {/* Left Door Gold Handle */}
            <div className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 w-4 sm:w-6 h-24 rounded-l-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-amber shadow-lg" />
          </motion.div>

          {/* 3D ROYAL RIGHT GATE DOOR */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={isAnimating ? { rotateY: 110 } : { rotateY: 0 }}
            transition={{ duration: 2.6, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2A0D16] via-[#3D1421] to-[#250912] border-l border-gold/50 z-20 shadow-2xl flex items-center justify-start"
          >
            {/* Right Door Gold Arch Pattern */}
            <div className="absolute inset-3 sm:inset-6 rounded-l-[8rem] border-2 border-gold/30 border-r-0 p-4 pointer-events-none bg-maroon-900/30 flex flex-col justify-between items-start">
              <div className="w-12 h-12 border-t-2 border-l-2 border-gold/50 rounded-tl-lg" />
              <MandalaOrnament className="w-32 h-32 sm:w-48 sm:h-48 opacity-20" color="#D4AF37" animate={false} />
              <div className="w-12 h-12 border-b-2 border-l-2 border-gold/50 rounded-bl-lg" />
            </div>
            {/* Right Door Gold Handle */}
            <div className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 w-4 sm:w-6 h-24 rounded-r-full bg-gradient-to-l from-gold-dark via-gold to-gold-light border border-gold-amber shadow-lg" />
          </motion.div>

          {/* CENTERED UNIFIED CLOSED GATE CONTENT */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={isAnimating ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="relative z-30 flex flex-col items-center justify-between h-full max-h-[85vh] py-8 px-4 w-full max-w-lg mx-auto text-center"
          >
            {/* 1. ROYAL ISLAMIC EMBLEM / SEAL */}
            <motion.div
              animate={isAnimating ? { scale: [1, 1.2, 1.1], filter: 'brightness(1.5)' } : { scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative my-auto"
            >
              <div className="relative flex items-center justify-center p-3 rounded-full bg-maroon-950/80 border border-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <MandalaOrnament className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32" color="#D4AF37" animate={!isAnimating} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-gold-light animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* 2. SUBTITLE & COUPLE NAMES (CLAMP TYPOGRAPHY) */}
            <div className="flex flex-col items-center text-center my-auto px-2 space-y-2">
              <p
                className="font-cinzel text-gold-light uppercase tracking-[0.3em] font-semibold drop-shadow"
                style={{ fontSize: 'clamp(0.75rem, 2.2vw, 1.05rem)' }}
              >
                The Royal Wedding Invitation
              </p>

              <div className="py-2 flex flex-col items-center justify-center">
                <h1
                  className="font-serif font-bold gold-text-gradient tracking-wide leading-none drop-shadow-2xl"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}
                >
                  {WEDDING_DATA.groom.name.split(" ")[0]}
                </h1>

                <span
                  className="font-serif italic text-gold/80 my-1 font-normal"
                  style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)' }}
                >
                  &amp;
                </span>

                <h1
                  className="font-serif font-bold gold-text-gradient tracking-wide leading-none drop-shadow-2xl"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}
                >
                  {WEDDING_DATA.bride.name.split(" ")[0]}
                </h1>
              </div>
            </div>

            {/* 3. OPEN INVITATION BUTTON */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={isAnimating ? { scale: 1.08, boxShadow: '0 0 40px rgba(212,175,55,0.9)' } : {}}
              className="my-auto pt-2"
            >
              <button
                onClick={handleOpenClick}
                disabled={isAnimating}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-amber text-maroon-950 font-bold tracking-widest text-xs sm:text-sm shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center gap-3 overflow-hidden border border-gold-light cursor-pointer transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <MailOpen className="w-5 h-5 text-maroon-950" />
                <span className="font-cinzel">OPEN INVITATION</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
