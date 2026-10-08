import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import songUrl from '../../../ReelAudio-91225.mp3';

export const MusicControl = ({ autoPlayTriggered = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hasAutoStarted = useRef(false);
  const shouldPlay = useRef(false);
  const audio = useRef(null);

  const playAudio = async () => {
    shouldPlay.current = true;
    if (!audio.current) return;
    try {
      await audio.current.play();
      if (!shouldPlay.current) {
        audio.current.pause();
        return;
      }
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (autoPlayTriggered && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      playAudio();
    }
  }, [autoPlayTriggered]);

  const pauseAudio = () => {
    shouldPlay.current = false;
    audio.current?.pause();
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    if (audio.current) audio.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => () => audio.current?.pause(), []);

  if (!autoPlayTriggered) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-gold/40 bg-maroon-950/80 p-1.5 shadow-[0_0_22px_rgba(212,175,55,0.22)] backdrop-blur-sm sm:bottom-6 sm:right-6">
      <audio
        ref={audio}
        src={songUrl}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleAudio}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-maroon-950 transition-colors hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light sm:h-14 sm:w-14"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
        aria-pressed={isPlaying}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleMute}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light sm:h-11 sm:w-11"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        title={isMuted ? 'Unmute music' : 'Mute music'}
        aria-pressed={isMuted}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </motion.button>
    </div>
  );
};
