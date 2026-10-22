import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// One Lenis instance for the whole site, driven by GSAP's ticker so ScrollTrigger stays in sync.
export let lenis = null;

export function initLenis() {
  if (lenis || reducedMotion()) return;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToTarget(target, immediate = false) {
  if (lenis) {
    lenis.resize(); // page height may have changed since Lenis last measured (route change)
    lenis.scrollTo(target, { immediate, duration: 1.4 });
  }
  else if (typeof target === 'number') window.scrollTo(0, target);
  else document.querySelector(target)?.scrollIntoView();
}

export { gsap, ScrollTrigger, SplitText };
