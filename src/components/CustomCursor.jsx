import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices with enough width
    const checkDevice = () => {
      const mobile =
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 1024;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkDevice();

    const handleResize = () => {
      const isMobileNow = checkDevice();
      if (isMobileNow) {
        document.body.classList.remove('custom-cursor-active');
      } else {
        document.body.classList.add('custom-cursor-active');
        setupCanvas();
      }
    };

    const setupCanvas = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);

    if (mobile) return;

    document.body.classList.add('custom-cursor-active');
    setupCanvas();

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const now = Date.now();
      const points = pointsRef.current;
      const lastPoint = points[points.length - 1];

      // Record point if moved at least 2px
      if (
        !lastPoint ||
        Math.hypot(e.clientX - lastPoint.x, e.clientY - lastPoint.y) > 2
      ) {
        points.push({ x: e.clientX, y: e.clientY, time: now });
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const interactiveSelectors = [
      'a',
      'button',
      '[role="button"]',
      'input',
      'textarea',
      'select',
      'label',
      '[data-cursor-hover]',
    ];

    const addHoverListeners = () => {
      interactiveSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.addEventListener('mouseenter', () => setIsHovering(true));
          el.addEventListener('mouseleave', () => setIsHovering(false));
        });
      });
    };

    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    const DURATION_MS = 1800; // Trail fades over ~1.8 seconds

    const animate = () => {
      const ease = 0.2;
      positionRef.current.x +=
        (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y +=
        (targetRef.current.y - positionRef.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-8%, -8%)`;
      }

      // Draw path trail on canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const now = Date.now();

        // 1. Reset matrix to identity and clear physical canvas buffer
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Remove points older than DURATION_MS
        pointsRef.current = pointsRef.current.filter(
          (p) => now - p.time < DURATION_MS
        );
        const points = pointsRef.current;

        if (points.length > 1) {
          // 2. Set DPR scaling matrix for drawing CSS pixel coordinates
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          // Draw tapering, smooth glowing path lines
          for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];

            const age1 = now - p1.time;
            const age2 = now - p2.time;
            const alpha1 = Math.max(0, 1 - age1 / DURATION_MS);
            const alpha2 = Math.max(0, 1 - age2 / DURATION_MS);
            const avgAlpha = (alpha1 + alpha2) / 2;

            if (avgAlpha <= 0) continue;

            const progress = i / (points.length - 1); // 0 (oldest) to 1 (newest)
            const lineWidth = 0.8 + progress * 3.2;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            ctx.strokeStyle = `rgba(237, 28, 36, ${avgAlpha * 0.75})`;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = 'rgba(237, 28, 36, 0.7)';
            ctx.shadowBlur = 8 * avgAlpha;

            ctx.stroke();
          }

          // Draw soft glowing particle dots along the path
          for (let i = 0; i < points.length; i += 2) {
            const p = points[i];
            const age = now - p.time;
            const alpha = Math.max(0, 1 - age / DURATION_MS);
            if (alpha <= 0) continue;

            const progress = i / points.length;
            const radius = 0.8 + progress * 1.5;

            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 90, 95, ${alpha * 0.85})`;
            ctx.shadowColor = 'rgba(237, 28, 36, 0.8)';
            ctx.shadowBlur = 6;
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    addHoverListeners();
    observer.observe(document.body, { childList: true, subtree: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-[opacity,filter] duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: isHovering ? '44px' : '36px',
          height: isHovering ? '35px' : '29px',
          backgroundImage: 'url(/cursor.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: isHovering
            ? 'drop-shadow(0 0 8px rgba(237,28,36,0.6))'
            : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          transition: 'width 0.15s ease, height 0.15s ease',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
