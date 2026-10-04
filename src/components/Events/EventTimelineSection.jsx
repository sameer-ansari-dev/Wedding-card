import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../config/weddingData';
import { IslamicArchBorder } from '../common/IslamicArch';
import { Heart, Sparkles, Clock, MapPin, Calendar, Shirt, ChevronRight } from 'lucide-react';

export const EventTimelineSection = () => {

  const createGoogleCalendarUrl = (event) => {
    const title = encodeURIComponent(`${event.title} - Zaid & Zainab Wedding`);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.address);
    // Simple mock start/end ISO for Google Calendar
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section className="relative py-20 px-4 w-full bg-radial-night overflow-hidden gpu-layer">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-15 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-cinzel tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Itinerary of Joy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient tracking-wide">
            Wedding Itinerary & Events
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 mt-2 font-sans max-w-md mx-auto">
            We eagerly anticipate your gracious presence at our celebration ceremonies.
          </p>
        </motion.div>

        {/* Events Container */}
        <div className="flex flex-col gap-14 w-full">
          {WEDDING_DATA.events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <IslamicArchBorder className="w-full">
                {/* Event Top Badge */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gold/20 pb-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                      {event.id === 'nikah' ? <Heart className="w-6 h-6 fill-gold/20" /> : <Sparkles className="w-6 h-6" />}
                    </div>
                    <div>
                      <span className="text-[11px] font-cinzel tracking-widest text-gold uppercase font-bold">
                        {event.badge}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-gold-light font-bold">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Add to Calendar Button */}
                  <a
                    href={createGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/40 text-gold text-xs font-sans tracking-wide transition-all duration-300"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Add to Calendar</span>
                  </a>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Date & Venue */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 text-cream/90">
                      <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gold/80 font-semibold uppercase tracking-wider">Date & Time</p>
                        <p className="text-sm sm:text-base font-serif font-semibold text-cream">{event.date}</p>
                        <p className="text-xs text-cream/70 font-sans">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-cream/90">
                      <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gold/80 font-semibold uppercase tracking-wider">Venue Location</p>
                        <p className="text-sm sm:text-base font-serif font-semibold text-cream">{event.venueName}</p>
                        <p className="text-xs text-cream/70 font-sans">{event.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-cream/90">
                      <Shirt className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gold/80 font-semibold uppercase tracking-wider">Dress Code</p>
                        <p className="text-xs sm:text-sm font-sans text-cream/90">{event.dressCode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Program Schedule */}
                  <div className="p-4 rounded-xl bg-maroon-900/60 border border-gold/20">
                    <p className="text-xs font-cinzel text-gold tracking-wider uppercase mb-3 flex items-center gap-1.5 font-bold">
                      <Clock className="w-4 h-4" />
                      <span>Program Schedule</span>
                    </p>
                    <ul className="space-y-2.5">
                      {event.program.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm">
                          <span className="font-mono text-gold-light font-medium shrink-0 bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                            {item.time}
                          </span>
                          <span className="text-cream/80 flex-1">{item.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </IslamicArchBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
