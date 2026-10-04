import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { fetchGuestWishes, addGuestWish } from '../../services/firebase';
import { Sparkles, Send, Heart, UserCheck, MessageSquare, CheckCircle, Gift } from 'lucide-react';

export const GuestWishesSection = () => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    attendance: 'attending',
    guests: '2 Guests',
    message: ''
  });

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    setLoading(true);
    const data = await fetchGuestWishes();
    setWishes(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    try {
      const savedWish = await addGuestWish(formData);
      setWishes((prev) => [savedWish, ...prev]);

      // Trigger royal golden confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FCF6BA', '#AA771C', '#5B2033']
      });

      setSubmittedSuccess(true);
      setFormData({ name: '', attendance: 'attending', guests: '2 Guests', message: '' });
      setTimeout(() => setSubmittedSuccess(false), 5000);
    } catch (err) {
      console.error("Error submitting wish:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 px-4 w-full bg-maroon-900 border-t border-gold/30 overflow-hidden gpu-layer">
      {/* Background Star Ambient Grid */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
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
            <span>Duas & Warm Congratulations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient tracking-wide">
            Guest RSVP & Prayers
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 mt-2 font-sans max-w-md mx-auto">
            Leave your warm blessings and RSVP to let us know you'll be joining our joy.
          </p>
        </motion.div>

        {/* Grid: Left RSVP Form, Right Live Wishes Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Left Form (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 w-full rounded-3xl royal-glass-gold p-6 sm:p-8 border border-gold/40 shadow-2xl relative"
          >
            <h3 className="font-serif text-2xl font-bold text-gold-light mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-gold" />
              <span>Send Your Dua</span>
            </h3>

            {submittedSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-gold/10 border border-gold text-center my-6 flex flex-col items-center"
              >
                <CheckCircle className="w-12 h-12 text-gold mb-2" />
                <h4 className="font-serif text-xl font-bold text-gold-light">JazakAllah Khair!</h4>
                <p className="text-xs text-cream/90 mt-1">
                  Your blessed prayers & RSVP have been received with love.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-gold/90 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uncle Rashid & Family"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-maroon-950/80 border border-gold/30 text-cream placeholder-cream/40 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                {/* Attendance */}
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-gold/90 mb-1.5">
                    Attendance Confirmation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        formData.attendance === 'attending'
                          ? 'bg-gold text-maroon-950 border-gold shadow-md'
                          : 'bg-maroon-950/50 text-cream/70 border-gold/30 hover:border-gold/60'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Joyfully Attending</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'regret' })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        formData.attendance === 'regret'
                          ? 'bg-gold text-maroon-950 border-gold shadow-md'
                          : 'bg-maroon-950/50 text-cream/70 border-gold/30 hover:border-gold/60'
                      }`}
                    >
                      <span>Regretfully Decline</span>
                    </button>
                  </div>
                </div>

                {/* Guests */}
                {formData.attendance === 'attending' && (
                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-gold/90 mb-1.5">
                      Number of Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-maroon-950/80 border border-gold/30 text-cream text-sm focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4+ Family">4+ Family Members</option>
                    </select>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-gold/90 mb-1.5">
                    Your Blessing / Dua *
                  </label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Write your prayers and warm wishes for Zaid & Zainab..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-maroon-950/80 border border-gold/30 text-cream placeholder-cream/40 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-amber text-maroon-950 font-semibold tracking-wider text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'SENDING BLESSINGS...' : 'SEND BLESSINGS & RSVP'}</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Live Feed (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full flex flex-col"
          >
            <h3 className="font-serif text-2xl font-bold text-gold-light mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" />
              <span>Messages of Love ({wishes.length})</span>
            </h3>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="text-center py-12 text-gold/60 text-sm animate-pulse">
                  Loading blessings...
                </div>
              ) : wishes.length === 0 ? (
                <div className="text-center py-12 text-cream/50 text-sm">
                  Be the first to send prayers to the newlyweds!
                </div>
              ) : (
                wishes.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-maroon-800/70 border border-gold/30 shadow-lg relative"
                  >
                    <div className="flex items-center justify-between border-b border-gold/15 pb-2 mb-2">
                      <h4 className="font-serif text-lg font-bold text-gold-light flex items-center gap-2">
                        <Heart className="w-4 h-4 text-gold fill-gold/30" />
                        <span>{item.name}</span>
                      </h4>
                      <span className="text-[10px] font-sans text-gold/60 bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                        {item.attendance === 'attending' ? item.guests || 'Attending' : 'Decline'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-cream/90 font-serif italic leading-relaxed">
                      "{item.message}"
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
