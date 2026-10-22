import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/scroll';

// Short 0→100 counter (~1.2s), then the panel wipes up to reveal the page.
const Preloader = ({ onDone }) => {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) {
      onDone();
      return;
    }
    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.to(counter, {
      v: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
        barRef.current.style.transform = `scaleX(${counter.v / 100})`;
      },
    })
      .to(rootRef.current, { yPercent: -100, duration: 0.7, ease: 'expo.inOut' }, '+=0.1')
      .add(onDone, '-=0.35');
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reducedMotion()) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[10000] bg-ink text-paper flex flex-col justify-between p-4 sm:p-8" aria-hidden="true">
      <span className="text-sm font-bold">Aditya.</span>
      <div>
        <div className="flex items-end justify-between">
          <span className="label text-muted">Loading</span>
          <span ref={countRef} className="font-mono text-5xl sm:text-7xl tabular-nums">000</span>
        </div>
        <div className="mt-4 h-px bg-white/10">
          <div ref={barRef} className="h-full bg-accent origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
