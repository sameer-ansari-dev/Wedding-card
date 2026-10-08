import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Code2, Globe2, MessageCircle } from 'lucide-react';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/sameer-ansari-dev', Icon: Code2 },
  { label: 'Portfolio', href: 'https://sameer-ansari-dev.github.io/The-Ansari-Portfolio/', Icon: Globe2 },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ansari-mohammed-sameer-naseem', Icon: BriefcaseBusiness },
  { label: 'WhatsApp', href: 'https://wa.me/919930013955', Icon: MessageCircle }
];

const socialVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export const FooterSection = () => {
  return (
    <footer className="relative py-3 px-4 w-full bg-maroon-950 text-cream border-t border-gold/40 overflow-hidden">
      {/* Background Star grid */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

      <div className="max-w-[500px] mx-auto flex flex-col items-center text-center relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-[20px] border border-gold/40 bg-maroon-800/60 p-3 shadow-[0_10px_24px_rgba(0,0,0,0.26),0_0_16px_rgba(212,175,55,0.08)] backdrop-blur-sm"
        >
          <h3 className="font-serif text-base sm:text-lg font-bold text-gold-light leading-tight">
            <span aria-hidden="true">❤️</span> Crafted with Love by Sameer Ansari
          </h3>
          <p className="text-[10px] sm:text-xs text-cream/70 mt-1 leading-snug">
            Designed &amp; Developed with Love for Beautiful Celebrations
          </p>

          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            className="flex flex-nowrap items-center justify-center gap-2 mt-2"
          >
            {socialLinks.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                variants={socialVariants}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="group relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/45 bg-maroon-950/50 text-gold transition-[border-color,box-shadow,color] duration-300 hover:border-gold hover:text-gold-light hover:shadow-[0_0_18px_rgba(212,175,55,0.42)]"
              >
                <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]" />
                <Icon className="relative h-5 w-5" aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>

        </motion.section>
      </div>
    </footer>
  );
};
