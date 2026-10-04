// Web Audio API fallback synthesizer for soothing ambient background melody
class AmbientAudioSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    // Oriental Hijaz/Maqam pentatonic scale notes (frequencies in Hz)
    const scale = [220, 246.94, 277.18, 293.66, 329.63, 349.23, 440, 493.88];
    let noteIndex = 0;

    const playNote = () => {
      if (!this.isPlaying || !this.ctx) return;
      
      const freq = scale[noteIndex % scale.length];
      noteIndex = (noteIndex + Math.floor(Math.random() * 3 + 1)) % scale.length;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Smooth attack & decay envelope
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.3);

      this.timer = setTimeout(playNote, 1200 + Math.random() * 800);
    };

    playNote();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }
}

export const synthAudio = new AmbientAudioSynth();
