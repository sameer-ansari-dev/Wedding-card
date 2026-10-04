import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../config/weddingData';
import { MapPin, Navigation, ExternalLink, Sparkles } from 'lucide-react';

export const VenueSection = () => {
  const [selectedEventId, setSelectedEventId] = useState('nikah');

  const currentEvent = WEDDING_DATA.events.find(e => e.id === selectedEventId) || WEDDING_DATA.events[0];

  return (
    <section className="relative py-20 px-4 w-full bg-maroon-900 border-t border-gold/30 overflow-hidden gpu-layer">
      {/* Geometric background */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-cinzel tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Venue Navigation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient tracking-wide">
            Location & Directions
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 mt-2 font-sans max-w-md mx-auto">
            Select an event to view venue map and get real-time GPS mobile directions.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex rounded-full bg-maroon-800/80 p-1.5 border border-gold/40 mb-8 max-w-md w-full shadow-lg">
          {WEDDING_DATA.events.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                selectedEventId === event.id
                  ? 'bg-gradient-to-r from-gold-dark to-gold text-maroon-950 shadow-md'
                  : 'text-cream/70 hover:text-gold'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{event.id === 'nikah' ? 'Nikah Venue' : 'Walima Venue'}</span>
            </button>
          ))}
        </div>

        {/* Interactive Google Map Display Card */}
        <motion.div
          key={selectedEventId}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-3xl royal-glass-gold overflow-hidden border border-gold/40 p-4 sm:p-6 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 border-b border-gold/20 pb-4">
            <div>
              <span className="text-[11px] font-cinzel tracking-widest text-gold uppercase">
                {currentEvent.date}
              </span>
              <h3 className="font-serif text-2xl font-bold text-gold-light">
                {currentEvent.venueName}
              </h3>
              <p className="text-xs sm:text-sm text-cream/80 font-sans mt-0.5">
                {currentEvent.address}
              </p>
            </div>

            {/* Direct Open in Google Maps Navigation Button */}
            <a
              href={currentEvent.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold hover:bg-gold-amber text-maroon-950 font-semibold text-xs sm:text-sm tracking-wide shadow-lg transition-all duration-300 shrink-0"
            >
              <Navigation className="w-4 h-4 fill-maroon-950" />
              <span>Open Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Responsive Map Embed Container */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-gold/30 shadow-inner bg-maroon-950">
            <iframe
              title={`Google Map - ${currentEvent.venueName}`}
              src={currentEvent.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) opacity(0.95)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
