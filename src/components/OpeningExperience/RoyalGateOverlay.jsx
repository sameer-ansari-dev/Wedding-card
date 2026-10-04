import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanternSVG } from '../common/LanternSVG';
import { MandalaOrnament } from '../common/MandalaOrnament';
import { WEDDING_DATA } from '../../config/weddingData';
import { Sparkles, MailOpen } from 'lucide-react';

export const RoyalGateOverlay = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="royal-gate-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, delay: 0.6 } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-midnight select-none gpu-layer"
        >
          {/* Moonlight & Night Sky Ambience */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-maroon-700/60 via-midnight to-black z-0">
            {/* Glowing Moon */}
            <div className="absolute top-10 right-10 w-28 h-28 rounded-full bg-amber-100/10 blur-xl pointer-events-none" />
            <div className="absolute top-12 right-12 w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold/20 to-gold-light/40 backdrop-blur-sm" />
            </div>

            {/* Stars background */}
            <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:36px_36px] opacity-25" />
          </div>

          {/* Floating Golden Lanterns */}
          <div className="absolute top-0 left-6 sm:left-16 z-20">
            <LanternSVG className="w-14 h-28 sm:w-20 sm:h-40" delay={0} />
          </div>
          <div className="absolute top-0 right-6 sm:right-16 z-20">
            <LanternSVG className="w-14 h-28 sm:w-20 sm:h-40" delay={1.5} />
          </div>

          {/* LEFT GATE DOOR */}
          <motion.div
            initial={{ x: 0 }}
            animate={isOpen ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 border-r-2 border-gold/60 z-10 flex items-center justify-end pr-2 sm:pr-8 shadow-2xl"
          >
            {/* Arch Pattern Overlay on Door */}
            <div className="absolute inset-0 opacity-15 bg-islamic-pattern pointer-events-none" />
            
            {/* Wooden Latticework & Gold Arch Detail */}
            <div className="h-4/5 w-4/5 rounded-r-[10rem] border-2 border-gold/40 border-l-0 p-4 flex flex-col justify-between items-end relative overflow-hidden bg-maroon-900/40">
              <div className="w-16 h-16 border-t-2 border-r-2 border-gold/60 rounded-tr-xl" />
              <MandalaOrnament className="w-32 h-32 sm:w-48 sm:h-48 opacity-30" color="#D4AF37" />
              <div className="w-16 h-16 border-b-2 border-r-2 border-gold/60 rounded-br-xl" />
            </div>

            {/* Left Handle */}
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-5 h-20 rounded-l-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-maroon-900" />
            </div>
          </motion.div>

          {/* RIGHT GATE DOOR */}
          <motion.div
            initial={{ x: 0 }}
            animate={isOpen ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-maroon-900 via-maroon-800 to-maroon-900 border-l-2 border-gold/60 z-10 flex items-center justify-start pl-2 sm:pl-8 shadow-2xl"
          >
            {/* Arch Pattern Overlay on Door */}
            <div className="absolute inset-0 opacity-15 bg-islamic-pattern pointer-events-none" />

            {/* Wooden Latticework & Gold Arch Detail */}
            <div className="h-4/5 w-4/5 rounded-l-[10rem] border-2 border-gold/40 border-r-0 p-4 flex flex-col justify-between items-start relative overflow-hidden bg-maroon-900/40">
              <div className="w-16 h-16 border-t-2 border-l-2 border-gold/60 rounded-tl-xl" />
              <MandalaOrnament className="w-32 h-32 sm:w-48 sm:h-48 opacity-30" color="#D4AF37" />
              <div className="w-16 h-16 border-b-2 border-l-2 border-gold/60 rounded-bl-xl" />
            </div>

            {/* Right Handle */}
            <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-20 rounded-r-full bg-gradient-to-l from-gold-dark via-gold to-gold-light border border-gold shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-maroon-900" />
            </div>
          </motion.div>

          {/* CENTER INVITATION CALL TO ACTION */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-30 flex flex-col items-center justify-center px-4 text-center max-w-sm"
          >
            {/* Islamic Star Badge */}
            <div className="mb-4 relative">
              <MandalaOrnament className="w-24 h-24 sm:w-28 sm:h-28" color="#D4AF37" animate={true} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gold-light animate-pulse" />
              </div>
            </div>

            {/* Bismillah Small Header */}
            <p className="font-arabic text-xl sm:text-2xl text-gold-light mb-1 leading-relaxed">
              {WEDDING_DATA.bismillah.arabic}
            </p>

            <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-gold/80 mb-2">
              The Royal Wedding Invitation
            </h2>

            <h1 className="font-serif text-3xl sm:text-4xl text-cream font-semibold mb-6 tracking-wide drop-shadow-md">
              {WEDDING_DATA.groom.name.split(" ")[0]} & {WEDDING_DATA.bride.name.split(" ")[0]}
            </h1>

            {/* Open Invitation Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenClick}
              className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-amber text-maroon-950 font-semibold tracking-wider text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.6)] flex items-center gap-3 overflow-hidden border border-gold-light cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <MailOpen className="w-5 h-5 text-maroon-950" />
              <span>OPEN INVITATION</span>
            </motion.button>
            <p className="mt-3 text-xs text-gold/60 font-sans tracking-wide">
              Click to unseal & enable music
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
