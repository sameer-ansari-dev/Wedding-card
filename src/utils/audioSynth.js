class AmbientAudioSynth {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.filter = null;
    this.isPlaying = false;
    this.scheduler = null;
    this.stopTimer = null;
    this.volume = 0.15;
    this.noteIndex = 0;
    this.nextNoteTime = 0;
    this.motif = [
      { frequency: 293.66, beats: 1.5 },
      { frequency: 369.99, beats: 1 },
      { frequency: 415.3, beats: 1.5 },
      { frequency: 440, beats: 1 },
      { frequency: 493.88, beats: 1.5 },
      { frequency: 440, beats: 1 },
      { frequency: 415.3, beats: 1 },
      { frequency: 369.99, beats: 1.5 },
      { frequency: 329.63, beats: 1 },
      { frequency: 293.66, beats: 2 }
    ];
    this.padProgression = [
      [146.83, 174.61, 220],
      [130.81, 164.81, 196],
      [174.61, 220, 261.63],
      [146.83, 185, 220]
    ];
  }

  init() {
    if (this.ctx) return true;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;

    this.ctx = new AudioContextClass();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 1800;
    this.filter.Q.value = 0.5;
    this.filter.connect(this.master);
    this.master.connect(this.ctx.destination);

    [146.83, 220, 293.66].forEach((frequency, index) => {
      const oscillator = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.value = [0.045, 0.025, 0.012][index];
      oscillator.connect(gain);
      gain.connect(this.filter);
      oscillator.start();
    });

    return true;
  }

  async start(volume = this.volume, fadeDuration = 2) {
    if (!this.init()) return false;
    if (this.stopTimer) clearTimeout(this.stopTimer);
    this.stopTimer = null;
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.isPlaying) {
      this.setVolume(this.volume, fadeDuration);
      return true;
    }

    await this.ctx.resume();
    this.isPlaying = true;
    const now = this.ctx.currentTime;
    if (this.nextNoteTime < now) this.nextNoteTime = now + 0.05;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(this.volume, now + fadeDuration);
    this.scheduleUpcomingNotes();
    this.scheduler = setInterval(() => this.scheduleUpcomingNotes(), 200);
    return true;
  }

  scheduleUpcomingNotes() {
    if (!this.isPlaying || !this.ctx) return;

    const horizon = this.ctx.currentTime + 1.5;
    const beatDuration = 1.05;
    const cycleDuration = this.motif.reduce((total, note) => total + note.beats, 0) * beatDuration;

    while (this.nextNoteTime < horizon) {
      const note = this.motif[this.noteIndex % this.motif.length];
      const noteStart = this.nextNoteTime;
      const noteDuration = note.beats * beatDuration * 1.35;
      if (this.noteIndex % this.motif.length === 0) {
        const chord = this.padProgression[Math.floor(this.noteIndex / this.motif.length) % this.padProgression.length];
        this.schedulePad(chord, noteStart, cycleDuration);
      }
      this.scheduleNote(note.frequency, noteStart, noteDuration);
      this.nextNoteTime += note.beats * beatDuration;
      this.noteIndex += 1;
    }
  }

  scheduleNote(frequency, startTime, duration) {
    const pianoPartials = [
      { ratio: 1, gain: 0.075 },
      { ratio: 2, gain: 0.025 },
      { ratio: 3, gain: 0.009 }
    ];

    pianoPartials.forEach((partial) => {
      const oscillator = this.ctx.createOscillator();
      const envelope = this.ctx.createGain();
      oscillator.type = partial.ratio === 1 ? 'triangle' : 'sine';
      oscillator.frequency.value = frequency * partial.ratio;
      envelope.gain.setValueAtTime(0.0001, startTime);
      envelope.gain.linearRampToValueAtTime(partial.gain, startTime + 0.012);
      envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.max(0.45, duration * 1.35));
      oscillator.connect(envelope);
      envelope.connect(this.filter);
      oscillator.start(startTime);
      oscillator.stop(startTime + Math.max(0.5, duration * 1.4));
    });

    const flute = this.ctx.createOscillator();
    const fluteGain = this.ctx.createGain();
    const vibrato = this.ctx.createOscillator();
    const vibratoDepth = this.ctx.createGain();
    flute.type = 'sine';
    flute.frequency.value = frequency;
    vibrato.frequency.value = 5.1;
    vibratoDepth.gain.value = 0.65;
    vibrato.connect(vibratoDepth);
    vibratoDepth.connect(flute.frequency);
    fluteGain.gain.setValueAtTime(0.0001, startTime);
    fluteGain.gain.linearRampToValueAtTime(0.028, startTime + Math.min(0.3, duration * 0.3));
    fluteGain.gain.setValueAtTime(0.024, startTime + duration * 0.62);
    fluteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    flute.connect(fluteGain);
    fluteGain.connect(this.filter);
    flute.start(startTime);
    vibrato.start(startTime);
    flute.stop(startTime + duration + 0.04);
    vibrato.stop(startTime + duration + 0.04);
  }

  schedulePad(chord, startTime, duration) {
    chord.forEach((frequency, index) => {
      const oscillator = this.ctx.createOscillator();
      const envelope = this.ctx.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 1 ? -3 : 3;
      envelope.gain.setValueAtTime(0.0001, startTime);
      envelope.gain.linearRampToValueAtTime(0.012, startTime + 1.8);
      envelope.gain.setValueAtTime(0.01, startTime + duration - 1.6);
      envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      oscillator.connect(envelope);
      envelope.connect(this.filter);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration + 0.05);
    });
  }

  setVolume(volume, duration = 0.2) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (!this.ctx || !this.master || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(this.volume, now + duration);
  }

  stop(duration = 1) {
    if (!this.ctx || !this.master || !this.isPlaying) return;

    this.isPlaying = false;
    if (this.scheduler) clearInterval(this.scheduler);
    this.scheduler = null;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + duration);
    this.stopTimer = setTimeout(() => {
      this.ctx?.suspend();
      this.stopTimer = null;
    }, duration * 1000 + 50);
  }
}

export const synthAudio = new AmbientAudioSynth();
