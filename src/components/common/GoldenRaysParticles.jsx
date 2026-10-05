import React from 'react';
import { motion } from 'framer-motion';

export const GoldenRaysParticles = ({ active = false }) => {
  // Generate 20 floating golden dust particles with fixed pseudo-random parameters
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: (i * 37) % 100, // percentage x
    y: (i * 53) % 100, // percentage y
    size: 2 + (i % 4),
    duration: 3 + (i % 4),
    delay: (i % 5) * 0.4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      {/* Volumetric Radial Light Rays */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={active ? { opacity: 1, scale: 1.3 } : { opacity: 0.3, scale: 0.9 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle,_rgba(255,223,128,0.55)_0%,_rgba(212,175,55,0.25)_35%,_rgba(91,32,51,0.1)_65%,_transparent_80%)] filter blur-3xl" />
      </motion.div>

      {/* Floating Gold Dust Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: active ? [0.2, 0.9, 0.2] : [0.1, 0.5, 0.1],
            y: [-15, -60, -100],
            x: [0, (p.id % 2 === 0 ? 15 : -15), 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: '#FFF4B8',
            boxShadow: '0 0 8px #FFD700',
          }}
        />
      ))}
    </div>
  );
};
