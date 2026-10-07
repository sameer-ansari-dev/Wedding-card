import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

export const MusicControl = ({ autoPlayTriggered = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hasAutoStarted = useRef(false);
  const shouldPlay = useRef(false);
  const muted = useRef(false);
  const synth = useRef(null);
  const synthPromise = useRef(null);

  const loadSynth = () => {
    if (synth.current) return Promise.resolve(synth.current);
    if (!synthPromise.current) {
      synthPromise.current = import('../../utils/audioSynth').then(({ synthAudio }) => {
        synth.current = synthAudio;
        return synthAudio;
      });
    }
    return synthPromise.current;
  };

  const playAudio = async () => {
    shouldPlay.current = true;
    const audio = await loadSynth();
    if (!shouldPlay.current) return;
    const started = await audio.start(muted.current ? 0 : 0.15, 2);
    if (!shouldPlay.current) {
      audio.stop(1);
      setIsPlaying(false);
      return;
    }
    setIsPlaying(started);
  };

  useEffect(() => {
    if (autoPlayTriggered && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      playAudio();
    }
  }, [autoPlayTriggered]);

  const pauseAudio = () => {
    shouldPlay.current = false;
    synth.current?.stop(1);
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
    muted.current = nextMuted;
    setIsMuted(nextMuted);
    synth.current?.setVolume(nextMuted ? 0 : 0.15, 0.2);
  };

  if (!autoPlayTriggered) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-gold/40 bg-maroon-950/70 p-1.5 shadow-[0_0_22px_rgba(212,175,55,0.22)] backdrop-blur-sm">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleAudio}
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gold text-maroon-950 transition-colors hover:bg-gold-light"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleMute}
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold/10"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        title={isMuted ? 'Unmute music' : 'Mute music'}
        aria-pressed={isMuted}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </motion.button>
    </div>
  );
};
