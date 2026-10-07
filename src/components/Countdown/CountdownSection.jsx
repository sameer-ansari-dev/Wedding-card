import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../config/weddingData';
import { Clock, Sparkles } from 'lucide-react';

export const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.nikahDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="relative py-16 px-4 w-full bg-maroon-900 overflow-hidden border-y border-gold/30 gpu-layer">
      {/* Background Star Ambient Grid */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-cinzel tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Counting Down To The Sacred Covenant</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient tracking-wide">
            The Blessed Countdown
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 mt-2 font-sans max-w-md">
            Counting every second until Zaid Ansari & Zainab Ansari unite in Nikah inshaAllah.
          </p>
        </motion.div>

        {/* Live Timer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Gold Frame Card */}
              <div className="p-4 sm:p-6 rounded-2xl royal-glass-gold flex flex-col items-center justify-center border border-gold/40 shadow-2xl relative overflow-hidden group-hover:border-gold transition-colors duration-300">
                {/* Background Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-gold/10 pointer-events-none" />

                {/* Animated Number display */}
                <motion.span 
                  key={unit.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-cinzel text-3xl sm:text-5xl font-bold text-gold-light drop-shadow-md"
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>

                <span className="text-[11px] sm:text-xs font-sans tracking-widest uppercase text-cream/80 mt-2 font-semibold">
                  {unit.label}
                </span>

                {/* Corner Accents */}
                <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-gold/60" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-gold/60" />
                <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-gold/60" />
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-gold/60" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Date Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 inline-flex items-center gap-2 text-xs text-gold/80 font-sans tracking-wide"
        >
          <Clock className="w-4 h-4 text-gold" />
          <span>Nikah Solemnization • {WEDDING_DATA.displayDates.nikah}</span>
        </motion.div>
      </div>
    </section>
  );
};
