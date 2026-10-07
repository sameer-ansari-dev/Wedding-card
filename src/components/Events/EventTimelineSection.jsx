import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../config/weddingData';
import { Heart, Sparkles, MapPin, Calendar, CalendarDays, Clock3, Shirt } from 'lucide-react';

export const EventTimelineSection = () => {
  const createGoogleCalendarUrl = (event) => {
    const title = encodeURIComponent(`${event.id === 'nikah' ? event.badge : event.title} - Zaid Ansari & Zainab Ansari`);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.address);
    const start = event.start.replace(/[-:]/g, '').slice(0, 15);
    const end = event.end.replace(/[-:]/g, '').slice(0, 15);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${start}/${end}&ctz=Asia%2FKolkata`;
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
            Wedding Celebrations
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 mt-2 font-sans max-w-md mx-auto">
            We eagerly anticipate your gracious presence at our celebration ceremonies.
          </p>
        </motion.div>

        {/* Shared event card layout */}
        <div className="flex flex-col gap-14 w-full">
          {WEDDING_DATA.events.map((event, index) => {
            const details = [
              { label: 'Date', value: event.date, Icon: CalendarDays },
              { label: 'Time', value: event.time, Icon: Clock3 },
              { label: 'Venue', value: `${event.venueName}\n${event.address}`, Icon: MapPin, wide: true },
              { label: 'Dress Code', value: event.dressCode, Icon: Shirt },
              ...(event.program ? [{ label: 'Program', value: event.program.map((item) => item.detail).join('\n'), Icon: Heart }] : [])
            ];

            return (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                className="w-full rounded-[24px] md:rounded-[32px] overflow-hidden border border-gold/50 bg-maroon-800/85 p-5 sm:p-7 md:p-8 shadow-[0_16px_44px_rgba(0,0,0,0.32),0_0_20px_rgba(212,175,55,0.1)] transition-shadow duration-300 hover:shadow-[0_20px_56px_rgba(0,0,0,0.38),0_0_30px_rgba(212,175,55,0.2)]"
              >
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/20 pb-5 mb-5">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                      {event.id === 'nikah' ? <Heart className="h-5 w-5 fill-gold/20" /> : <Sparkles className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-2xl sm:text-3xl text-gold-light font-bold leading-tight break-words">
                        {event.id === 'nikah' ? event.badge : event.title}
                      </h3>
                      {event.id === 'nikah' && <p className="text-sm sm:text-base text-cream/75 mt-1">{event.title}</p>}
                    </div>
                  </div>
                  <a
                    href={createGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-fit items-center justify-center gap-2 px-4 py-2 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/40 text-gold text-xs font-sans tracking-wide transition-colors duration-300"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Add to Calendar</span>
                  </a>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {details.map(({ label, value, Icon, wide }) => (
                    <section key={label} className={`rounded-2xl border border-gold/20 bg-maroon-950/35 p-4 sm:p-5 ${wide ? 'sm:col-span-2' : ''}`}>
                      <div className="flex items-center gap-2 text-gold/90 mb-2">
                        <Icon className="h-4 w-4 shrink-0" />
                        <h4 className="text-[11px] font-semibold uppercase tracking-wider">{label}</h4>
                      </div>
                      <p className="text-sm sm:text-base text-cream/90 font-serif leading-relaxed whitespace-pre-line break-words">{value}</p>
                    </section>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
