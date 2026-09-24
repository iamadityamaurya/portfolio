import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
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
    window.addEventListener('resize', () => {
      const isMobileNow = checkDevice();
      if (isMobileNow) {
        document.body.classList.remove('custom-cursor-active');
      } else {
        document.body.classList.add('custom-cursor-active');
      }
    });

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

    // MutationObserver to handle dynamically added interactive elements
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    const animate = () => {
      const ease = 0.15;
      positionRef.current.x +=
        (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y +=
        (targetRef.current.y - positionRef.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-8%, -8%)`;
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
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isMobile) return null;

  return (
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
  );
};

export default CustomCursor;
