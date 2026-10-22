import { useEffect, useRef, useState } from 'react';

// Ring + dot cursor (lerp 0.2 / 0.35). Grows into a "VIEW" disc over [data-cursor="view"],
// swells slightly over links and buttons. Desktop fine pointers only.
const CustomCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024);
  const [mode, setMode] = useState('default');

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('custom-cursor-active');
    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const dot = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onOver = (e) => {
      const el = e.target.closest?.('[data-cursor], a, button, input, textarea, select, label');
      setMode(el ? el.dataset.cursor || 'link' : 'default');
    };
    const tick = () => {
      ring.x += (target.x - ring.x) * 0.2;
      ring.y += (target.y - ring.y) * 0.2;
      dot.x += (target.x - dot.x) * 0.35;
      dot.y += (target.y - dot.y) * 0.35;
      ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const scale = mode === 'view' ? 3.36 : mode === 'link' ? 1.5 : 1;
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <div ref={ringRef} className="absolute left-0 top-0">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border flex items-center justify-center transition-[transform,background-color,border-color] duration-300 ease-out ${
            mode === 'view' ? 'bg-paper border-paper' : 'border-paper/70 mix-blend-difference'
          }`}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <span className={`font-mono text-[3px] tracking-[0.15em] text-ink transition-opacity ${mode === 'view' ? 'opacity-100' : 'opacity-0'}`}>VIEW</span>
        </div>
      </div>
      <div ref={dotRef} className="absolute left-0 top-0">
        <div className={`-translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-paper mix-blend-difference ${mode === 'view' ? 'opacity-0' : ''}`} />
      </div>
    </div>
  );
};

export default CustomCursor;
