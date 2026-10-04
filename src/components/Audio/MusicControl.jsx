import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../../config/weddingData';
import { synthAudio } from '../../utils/audioSynth';
import { Music, Volume2, VolumeX, Disc } from 'lucide-react';

export const MusicControl = ({ autoPlayTriggered = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlayTriggered) {
      playAudio();
    }
  }, [autoPlayTriggered]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("HTML Audio autoplay blocked or failed, activating Web Audio Synth fallback:", err);
          synthAudio.start();
          setIsPlaying(true);
        });
    } else {
      synthAudio.start();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    synthAudio.stop();
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <>
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={WEDDING_DATA.audio.src}
        loop
        preload="auto"
      />

      {/* Floating Gold Music Control Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {/* Playing Soundwave Bar Visualizer pill */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-maroon-900/90 border border-gold/40 text-gold text-xs font-sans backdrop-blur-md shadow-lg"
          >
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-1 bg-gold rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-1 bg-gold-light rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
              <span className="w-1 bg-gold rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
            </div>
            <span className="text-[11px] font-semibold text-gold-light tracking-wide ml-1">
              Ambient Melody
            </span>
          </motion.div>
        )}

        {/* Circular Music Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-light p-0.5 shadow-[0_0_20px_rgba(212,175,55,0.5)] border border-gold-light cursor-pointer group flex items-center justify-center"
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <div className="w-full h-full rounded-full bg-maroon-950 flex items-center justify-center relative overflow-hidden">
            {/* Spinning Disc Effect when playing */}
            {isPlaying ? (
              <Disc className="w-6 h-6 text-gold animate-[spin_4s_linear_infinite]" />
            ) : (
              <VolumeX className="w-5 h-5 text-cream/60 group-hover:text-gold" />
            )}
          </div>
        </motion.button>
      </div>
    </>
  );
};
