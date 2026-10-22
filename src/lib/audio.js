// Background music + section whoosh. Browsers block autoplay with sound,
// so music starts on the visitor's first click (unlock), like gustavobatista.dev.
const MUSIC_VOLUME = 0.35;

const music = new Audio('/audio/ambient.mp3');
music.loop = true;
music.preload = 'none';
music.volume = 0;

const whoosh = new Audio('/audio/whoosh.mp3');
whoosh.volume = 0.45;

const stored = (() => { try { return localStorage.getItem('sound'); } catch { return null; } })();
let muted = stored ? stored === 'off' : window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let unlocked = false;
let lastSfx = 0;
let fadeId = 0;
const listeners = new Set();

const emit = () => listeners.forEach((fn) => fn(isPlaying()));

function fadeTo(target, ms = 500) {
  const id = ++fadeId;
  const from = music.volume;
  const start = performance.now();
  return new Promise((resolve) => {
    const step = (now) => {
      if (id !== fadeId) return resolve();
      const k = Math.min(1, (now - start) / ms);
      music.volume = Math.min(1, Math.max(0, from + (target - from) * k));
      if (k < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

function play() {
  music.play().then(() => fadeTo(MUSIC_VOLUME)).catch(() => {});
}

export const isPlaying = () => unlocked && !muted;

export function unlock() {
  if (unlocked) return;
  unlocked = true;
  if (!muted) play();
  emit();
}

export function toggleSound() {
  muted = !muted;
  unlocked = true;
  try { localStorage.setItem('sound', muted ? 'off' : 'on'); } catch { /* storage blocked */ }
  if (muted) fadeTo(0, 300).then(() => muted && music.pause());
  else play();
  emit();
}

export function sfx() {
  const now = performance.now();
  if (!isPlaying() || now - lastSfx < 800) return;
  lastSfx = now;
  whoosh.currentTime = 0;
  whoosh.play().catch(() => {});
}

export function onSoundChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

document.addEventListener('visibilitychange', () => {
  if (!isPlaying()) return;
  if (document.hidden) music.pause();
  else music.play().catch(() => {});
});
