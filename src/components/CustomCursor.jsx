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
    // Enable custom cursor on non-touch desktop screens (width >= 1024px)
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
      }
    };

    window.addEventListener('resize', handleResize);

    if (mobile) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
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

    const DURATION_MS = 1200; // Trail lifetime ~1.2 seconds

    const animate = () => {
      const ease = 0.25;
      positionRef.current.x +=
        (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y +=
        (targetRef.current.y - positionRef.current.y) * ease;

      const currX = positionRef.current.x;
      const currY = positionRef.current.y;

      // Position the red cursor arrow
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-8%, -8%)`;
      }

      // Record trail point at current cursor location
      const now = Date.now();
      const points = pointsRef.current;
      const lastPoint = points[points.length - 1];

      if (
        isVisible &&
        (!lastPoint || Math.hypot(currX - lastPoint.x, currY - lastPoint.y) > 2)
      ) {
        points.push({ x: currX, y: currY, time: now });
      }

      // Draw path trail on full screen canvas
      const canvas = canvasRef.current;
      if (canvas) {
        // Sync canvas buffer dimensions 1:1 with viewport
        if (
          canvas.width !== window.innerWidth ||
          canvas.height !== window.innerHeight
        ) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Filter out expired points
        pointsRef.current = points.filter((p) => now - p.time < DURATION_MS);
        const validPoints = pointsRef.current;

        if (validPoints.length > 1) {
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Draw tapering line segments connecting points
          for (let i = 0; i < validPoints.length - 1; i++) {
            const p1 = validPoints[i];
            const p2 = validPoints[i + 1];

            const age = now - ((p1.time + p2.time) / 2);
            const alpha = Math.max(0, 1 - age / DURATION_MS);
            if (alpha <= 0) continue;

            const progress = i / (validPoints.length - 1); // 0 (oldest) to 1 (newest/cursor tip)
            const lineWidth = 0.5 + progress * 2.5;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            ctx.strokeStyle = `rgba(237, 28, 36, ${alpha * 0.85})`;
            ctx.lineWidth = lineWidth;
            ctx.shadowColor = 'rgba(237, 28, 36, 0.6)';
            ctx.shadowBlur = 4 * alpha;

            ctx.stroke();
          }

          ctx.restore();
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
  }, [isVisible]);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
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
