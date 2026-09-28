import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

const navItems = [
  { label: 'About', href: '#about', isRoute: false, spyId: 'about', routeMatch: '/about' },
  { label: 'Experience', href: '/experience', isRoute: true, spyId: 'work-experience', routeMatch: '/experience' },
  { label: 'Projects', href: '#projects', isRoute: false, spyId: 'projects', routeMatch: '/project' },
  { label: 'Skills', href: '#skills', isRoute: false, spyId: 'skills', routeMatch: null },
  { label: 'Contact', href: '#contact', isRoute: false, spyId: 'contact', routeMatch: null },
];

export const Navbar = ({ onOpenTerminal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  // Scroll-driven state: compact look once scrolled + scroll-spy on the home page
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      if (!isHome) return;

      // Pick the section currently crossing the upper-third probe line
      const probe = window.innerHeight * 0.35;
      let current = null;
      for (const item of navItems) {
        const element = document.getElementById(item.spyId);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          current = item.spyId;
          break;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Route-driven active state for standalone pages
  useEffect(() => {
    if (isHome) return;
    const match = navItems.find(
      (item) => item.routeMatch && location.pathname.startsWith(item.routeMatch)
    );
    setActiveId(match ? match.spyId : null);
  }, [location.pathname, isHome]);

  const handleClick = (e, item) => {
    if (item.isRoute) {
      // Direct route navigation
      return;
    }

    e.preventDefault();
    if (isHome) {
      const targetId = item.href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + item.href);
    }
  };

  return (
    <header className="fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-max max-w-[96vw]">
      {/* Keyed by pathname so the bar re-animates on every page change */}
      <motion.nav
        key={location.pathname}
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`relative flex items-center gap-2 sm:gap-4 md:gap-6 pl-3 sm:pl-4 pr-3 sm:px-6 rounded-full bg-[#080d1a]/95 backdrop-blur-xl text-slate-300 font-medium border transition-[padding,border-color,box-shadow] duration-300 ${
          scrolled
            ? 'py-1 sm:py-1.5 border-cyan-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_22px_rgba(34,211,238,0.12)]'
            : 'py-1.5 sm:py-2 border-slate-700/70 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group" aria-label="Aditya Kumar Maurya — Home">
          <AnimatedLogo className="w-6 h-6 sm:w-7 sm:h-7" color="#22d3ee" glowColor="#22d3ee" showGlow />
          <span className="hidden sm:block text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
            Aditya.
          </span>
        </Link>

        <span className="hidden sm:block w-px h-5 bg-slate-700/60" />

        {navItems.map((item) => {
          const isActive = activeId === item.spyId;

          const label = (
            <span className="relative z-10 flex items-center gap-1.5">
              <span
                className={`hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 transition-opacity duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {item.label}
            </span>
          );

          const className = `relative transition-colors duration-200 whitespace-nowrap px-1.5 sm:px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-full ${
            isActive ? 'text-white' : 'hover:text-white'
          }`;

          const activePill = isActive && (
            <motion.span
              layoutId="navActivePill"
              className="absolute inset-0 rounded-full bg-slate-700/60 border border-cyan-500/30"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          );

          if (item.isRoute) {
            return (
              <Link
                key={item.label}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={className}
              >
                {activePill}
                {label}
              </Link>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              aria-current={isActive ? 'location' : undefined}
              className={`${className} cursor-pointer`}
            >
              {activePill}
              {label}
            </a>
          );
        })}

       

        {/* Scroll progress line */}
        <motion.span
          style={{ scaleX: progress }}
          className="pointer-events-none absolute bottom-0 left-4 right-4 h-[1.5px] origin-left rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 opacity-70"
        />
      </motion.nav>
    </header>
  );
};

export default Navbar;
