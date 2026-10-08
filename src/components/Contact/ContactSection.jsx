import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { Crown, Mail, MessageCircle, Phone } from 'lucide-react';

const contacts = [
  { name: 'Zaid Ansari', role: 'The Groom', purpose: 'For Personal Wedding Queries', phone: '+91 81668 15077' },
  { name: 'Huzaifa Ansari', role: 'Brother of the Groom', purpose: 'For Guest Assistance & Event Support', phone: '+91 87668 12546' },
  { name: 'Ubaid Ansari', role: 'Brother of the Groom', purpose: 'For Venue & Guest Coordination', phone: '+91 73517 57210' }
];

export const ContactSection = () => {
  const stageRef = useRef(null);
  const widthRef = useRef(0);
  const slotRef = useRef(1);
  const dragRef = useRef({ startX: 0, startTrackX: 0, startTime: 0, active: false });
  const visibleRef = useRef(false);
  const animatingRef = useRef(false);
  const lastInteractionRef = useRef(0);
  const transitionRef = useRef(0);
  const trackX = useMotionValue(0);
  const [stageWidth, setStageWidth] = useState(0);
  const [activeSlot, setActiveSlot] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const getTrackPosition = (slot, width = widthRef.current) => width * 0.06 - slot * width * 0.82;

  const setSlot = useCallback((slot) => {
    slotRef.current = slot;
    setActiveSlot(slot);
  }, []);

  const moveTo = useCallback((requestedSlot) => {
    const width = widthRef.current;
    if (!width) return;

    const slot = Math.max(0, Math.min(contacts.length + 1, requestedSlot));
    const transaction = ++transitionRef.current;
    animatingRef.current = true;
    setSlot(slot);
    trackX.stop();

    animate(trackX, getTrackPosition(slot, width), {
      type: 'spring',
      stiffness: 150,
      damping: 24,
      mass: 0.82
    }).then(() => {
      if (transaction !== transitionRef.current) return;
      animatingRef.current = false;
      if (slot === 0 || slot === contacts.length + 1) {
        const realSlot = slot === 0 ? contacts.length : 1;
        setSlot(realSlot);
        trackX.set(getTrackPosition(realSlot, width));
      }
    });
  }, [setSlot, trackX]);

  useEffect(() => {
    if (!stageRef.current) return undefined;
    const updateWidth = () => {
      const width = stageRef.current?.clientWidth || 0;
      if (Math.abs(width - widthRef.current) < 1) return;
      widthRef.current = width;
      setStageWidth(width);
      transitionRef.current += 1;
      trackX.stop();
      animatingRef.current = false;
      const currentSlot = slotRef.current;
      const settledSlot = currentSlot === 0 ? contacts.length : currentSlot === contacts.length + 1 ? 1 : currentSlot;
      setSlot(settledSlot);
      trackX.set(getTrackPosition(settledSlot, width));
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(stageRef.current);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    }, { threshold: 0.15 });
    visibilityObserver.observe(stageRef.current);
    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
    };
  }, [setSlot, trackX]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const interactionIsRecent = performance.now() - lastInteractionRef.current < 5000;
      if (visibleRef.current && !document.hidden && !dragRef.current.active && !animatingRef.current && !interactionIsRecent) {
        moveTo(slotRef.current + 1);
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [moveTo]);

  const handlePointerDown = (event) => {
    if (event.target.closest('a, button')) return;
    dragRef.current = {
      startX: event.clientX,
      startTrackX: trackX.get(),
      startTime: event.timeStamp,
      active: true
    };
    lastInteractionRef.current = event.timeStamp;
    animatingRef.current = false;
    transitionRef.current += 1;
    trackX.stop();
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.active) return;
    trackX.set(dragRef.current.startTrackX + event.clientX - dragRef.current.startX);
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current.active) return;
    const distance = event.clientX - dragRef.current.startX;
    const elapsed = Math.max(1, event.timeStamp - dragRef.current.startTime);
    const velocity = distance / elapsed;
    const threshold = widthRef.current * 0.12;
    dragRef.current.active = false;
    setIsDragging(false);

    if (distance < -threshold || velocity < -0.55) moveTo(slotRef.current + 1);
    else if (distance > threshold || velocity > 0.55) moveTo(slotRef.current - 1);
    else moveTo(slotRef.current);
  };

  const handlePointerCancel = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setIsDragging(false);
    moveTo(slotRef.current);
  };

  const handleDotClick = (index, event) => {
    lastInteractionRef.current = event.timeStamp;
    moveTo(index + 1);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      lastInteractionRef.current = event.timeStamp;
      moveTo(slotRef.current + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      lastInteractionRef.current = event.timeStamp;
      moveTo(slotRef.current - 1);
    }
  };

  const activeIndex = (activeSlot - 1 + contacts.length) % contacts.length;
  const slideWidth = stageWidth * 0.88;
  const slots = [contacts.length - 1, ...contacts.map((_, index) => index), 0];

  return (
    <section className="relative overflow-hidden border-t border-gold/30 bg-maroon-900 px-4 py-14 sm:py-16">
      <div className="absolute inset-0 bg-islamic-pattern opacity-15 pointer-events-none" />
      <div className="inquiry-ambient absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" />
      <div className="inquiry-particles absolute inset-0 pointer-events-none" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((particle) => <span key={particle} style={{ '--particle': particle }} />)}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="font-serif text-3xl font-bold leading-tight text-gold-light sm:text-5xl">
            For Any Inquiry / Assistance
          </h2>
          <p className="mt-2 font-cinzel text-xs uppercase tracking-[0.18em] text-gold/75 sm:text-sm">
            We&apos;re Here To Help
          </p>
        </motion.header>

        <div className="mx-auto max-w-[560px]">
          <div
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onKeyDown={handleKeyDown}
            className={`inquiry-stage relative ${isDragging ? 'is-dragging' : ''}`}
            role="region"
            aria-label="Inquiry contacts carousel"
            aria-roledescription="carousel"
            tabIndex={0}
          >
            <motion.div className="inquiry-track flex items-stretch" style={{ x: trackX }}>
              {slots.map((contactIndex, slot) => {
                const contact = contacts[contactIndex];
                const isActive = slot === activeSlot;
                const isClone = slot === 0 || slot === slots.length - 1;
                const phoneDigits = contact.phone.replace(/\D/g, '');
                const callPhoneDigits = phoneDigits.slice(-10);
                return (
                  <motion.article
                    key={`${contact.phone}-${slot}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                    aria-roledescription="slide"
                    aria-label={`${contactIndex + 1} of ${contacts.length}: ${contact.name}`}
                    animate={{ scale: isActive ? 1 : 0.92, opacity: isActive ? 1 : 0.66, y: isActive ? 0 : 5 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.8 }}
                    style={{ width: slideWidth || '88%', marginRight: stageWidth ? stageWidth * -0.06 : '-6%', zIndex: isActive ? 2 : 1 }}
                    className={`inquiry-card group relative shrink-0 overflow-hidden rounded-[24px] border bg-maroon-800/80 p-4 backdrop-blur-sm sm:rounded-[30px] sm:p-6 ${isActive ? 'inquiry-card-active border-gold/70' : 'border-gold/30'}`}
                  >
                    <span className="inquiry-shimmer absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] pointer-events-none" />
                    <div className="relative z-10 flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-gold/10 text-gold">
                        <Crown className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-lg font-bold leading-tight text-gold-light sm:text-2xl">{contact.name}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold/75">{contact.role}</p>
                      </div>
                    </div>
                    <p className="relative z-10 mt-4 min-h-10 text-sm leading-relaxed text-cream/75 sm:min-h-0">{contact.purpose}</p>
                    <div className="relative z-10 mt-3 border-t border-gold/20 pt-3">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-gold/70">Phone</p>
                      <p className="mt-0.5 text-base font-medium tracking-wide text-cream sm:text-lg">{contact.phone}</p>
                    </div>
                    <div className="relative z-10 mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
                      <a href={`tel:${callPhoneDigits}`} aria-label={`Call ${contact.name}`} className="flex min-h-11 items-center justify-center gap-1 rounded-xl border border-gold/40 bg-gold/10 text-[10px] font-semibold text-gold transition-colors hover:bg-gold/20 sm:gap-1.5 sm:text-xs">
                        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><span>Call</span>
                      </a>
                      <a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${contact.name}`} className="flex min-h-11 items-center justify-center gap-1 rounded-xl border border-gold/40 bg-gold/10 text-[10px] font-semibold text-gold transition-colors hover:bg-gold/20 sm:gap-1.5 sm:text-xs">
                        <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><span>WhatsApp</span>
                      </a>
                      <a href={`sms:${phoneDigits}`} aria-label={`SMS ${contact.name}`} className="flex min-h-11 items-center justify-center gap-1 rounded-xl border border-gold/40 bg-gold/10 text-[10px] font-semibold text-gold transition-colors hover:bg-gold/20 sm:gap-1.5 sm:text-xs">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><span>SMS</span>
                      </a>
                    </div>
                    {isClone && <span className="sr-only">Repeated slide</span>}
                  </motion.article>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1" role="group" aria-label="Choose an inquiry contact">
            {contacts.map((contact, index) => (
              <button key={contact.phone} type="button" onClick={(event) => handleDotClick(index, event)} aria-label={`Show ${contact.name}`} aria-current={activeIndex === index ? 'true' : undefined} className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                <span className={`block h-2.5 rounded-full transition-[width,background-color] duration-300 ${activeIndex === index ? 'w-7 bg-gold' : 'w-2.5 bg-gold/35 hover:bg-gold/70'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};