'use client';

let audioCtx: AudioContext | null = null;
let lastPlayTime = 0;
const DEBOUNCE_MS = 200;

const chords = [
  [220.00, 261.63, 329.63], // Am
  [164.81, 207.65, 246.94], // E
  [261.63, 329.63, 392.00], // C
  [293.66, 369.99, 440.00], // D
  [174.61, 220.00, 261.63], // F
];

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playHoverSound = (index: number) => {
  const now = Date.now();
  if (now - lastPlayTime < DEBOUNCE_MS) return;
  lastPlayTime = now;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const chord = chords[index % chords.length];
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.08;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350;
    filter.Q.value = 0.5;

    masterGain.connect(filter);
    filter.connect(ctx.destination);

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.detune.value = (i - 1) * 4; 
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 6.0);

      osc.connect(gainNode);

      if (typeof ctx.createStereoPanner === 'function') {
        const panner = ctx.createStereoPanner();
        panner.pan.value = (i === 0) ? -0.6 : (i === 2) ? 0.6 : 0;
        gainNode.connect(panner);
        panner.connect(masterGain);
      } else {
        gainNode.connect(masterGain);
      }

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 6.0);
    });
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

export const playDeepContemplatingSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 1.5);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + 0.3);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const closeAudioContext = () => {
  if (audioCtx) {
    audioCtx.close().catch(() => {});
    audioCtx = null;
  }
};
