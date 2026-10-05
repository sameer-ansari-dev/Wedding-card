import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../config/weddingData';
import { IslamicArchBorder } from '../common/IslamicArch';
import { Sparkles, Users, Heart, Award } from 'lucide-react';

export const FamilyDetailsSection = () => {
  return (
    <section className="relative py-20 px-4 w-full bg-maroon-900 border-t border-gold/30 overflow-hidden gpu-layer">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-cinzel tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honored Families</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient tracking-wide">
            With Blessings of Our Elders
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 mt-2 font-sans max-w-md mx-auto">
            We solicit your gracious presence and prayers on this auspicious occasion.
          </p>
        </motion.div>

        {/* Family Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Groom's Family Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <IslamicArchBorder className="h-full flex flex-col justify-between text-center p-8">
              <div>
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 mx-auto flex items-center justify-center text-gold mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-cinzel text-gold uppercase tracking-widest font-bold">
                  Groom's Family
                </span>
                <h3 className="font-serif text-2xl font-bold text-gold-light mt-1">
                  {WEDDING_DATA.groom.fullName}
                </h3>
                <div className="w-16 h-[1px] bg-gold/30 mx-auto my-3" />
                <p className="text-sm text-cream/90 font-serif">
                  {WEDDING_DATA.groom.parents}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/15 text-xs text-gold/80 font-sans">
                Cordially invites you to share their joy
              </div>
            </IslamicArchBorder>
          </motion.div>

          {/* Bride's Family Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <IslamicArchBorder className="h-full flex flex-col justify-between text-center p-8">
              <div>
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 mx-auto flex items-center justify-center text-gold mb-4">
                  <Heart className="w-6 h-6 fill-gold/20" />
                </div>
                <span className="text-[11px] font-cinzel text-gold uppercase tracking-widest font-bold">
                  Bride's Family
                </span>
                <h3 className="font-serif text-2xl font-bold text-gold-light mt-1">
                  {WEDDING_DATA.bride.fullName}
                </h3>
                <div className="w-16 h-[1px] bg-gold/30 mx-auto my-3" />
                <p className="text-sm text-cream/90 font-serif">
                  {WEDDING_DATA.bride.parents}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/15 text-xs text-gold/80 font-sans">
                Requests the honor of your presence
              </div>
            </IslamicArchBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
