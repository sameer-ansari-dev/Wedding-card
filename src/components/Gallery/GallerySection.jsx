import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { WEDDING_DATA } from '../../config/weddingData';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const GallerySection = () => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="relative py-20 px-4 w-full bg-radial-night overflow-hidden gpu-layer">
      {/* Background Islamic ornament */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-cinzel tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Precious Memories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient tracking-wide">
            Our Royal Gallery
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 mt-2 font-sans max-w-md mx-auto">
            Swipe left or right to explore portraits of love, grace, and joy.
          </p>
        </motion.div>

        {/* Swiper Gallery Slider */}
        <div className="w-full relative py-6">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="w-full max-w-4xl py-10 overflow-visible"
          >
            {WEDDING_DATA.gallery.map((item) => (
              <SwiperSlide key={item.id} className="w-72 sm:w-96 rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl relative bg-maroon-900 group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Caption Text Box */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-left flex flex-col justify-end">
                    <h4 className="font-serif text-xl font-bold text-gold-light">
                      {item.caption}
                    </h4>
                    <p className="text-xs text-cream/80 font-sans mt-0.5">
                      {item.subtext}
                    </p>
                  </div>

                  {/* Zoom Lightbox Trigger Button */}
                  <button
                    onClick={() => setActiveImage(item)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-maroon-900/70 border border-gold/40 text-gold hover:text-gold-amber backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                    aria-label="Zoom image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-maroon-900/80 border border-gold/40 text-gold hover:bg-gold hover:text-maroon-950 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-maroon-900/80 border border-gold/40 text-gold hover:bg-gold hover:text-maroon-950 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-gold/60 bg-maroon-900 shadow-2xl"
            >
              <img
                src={activeImage.url}
                alt={activeImage.caption}
                className="w-full max-h-[75vh] object-contain bg-black"
              />
              <div className="p-4 bg-maroon-950 flex items-center justify-between border-t border-gold/30">
                <div>
                  <h3 className="font-serif text-xl font-bold text-gold-light">{activeImage.caption}</h3>
                  <p className="text-xs text-cream/70 font-sans">{activeImage.subtext}</p>
                </div>
                <button
                  onClick={() => setActiveImage(null)}
                  className="p-2 rounded-full bg-gold/20 text-gold hover:bg-gold hover:text-maroon-950 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
