import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scrollToTarget } from '../lib/scroll';
import { sfx } from '../lib/audio';

const navItems = [
  { label: 'work', to: '/experience' },
  { label: 'about', hash: 'about' },
  { label: 'projects', to: '/projects' },
  { label: 'contact', hash: 'contact' },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goHash = (e, hash) => {
    e.preventDefault();
    sfx();
    if (pathname === '/') scrollToTarget(`#${hash}`);
    else navigate('/', { state: { scrollTo: hash } });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)] py-3.5'
          : 'bg-transparent py-5'
      } text-white`}
    >
      <Link
        to="/"
        onMouseEnter={() => sfx()}
        className="group flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight select-none cursor-pointer"
        aria-label="Aditya Kumar Maurya, home"
      >
        <span className="transition-transform duration-300 group-hover:scale-105">
          Aditya.
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#2b4bff] shadow-[0_0_8px_#2b4bff] animate-pulse" />
      </Link>

      <nav
        className="flex items-center gap-1 sm:gap-2 font-mono text-xs sm:text-sm"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {navItems.map((item, idx) => {
          const isCurrent = item.to ? pathname === item.to : false;
          const isHovered = hoveredIndex === idx;

          const content = (
            <span className="relative z-10 px-3 py-1.5 block">
              {item.label}
              {isHovered && (
                <motion.span
                  layoutId="navHoverPill"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              {isCurrent && !isHovered && (
                <span className="absolute bottom-0 inset-x-3 h-[2px] bg-[#2b4bff] rounded-full shadow-[0_0_6px_#2b4bff]" />
              )}
            </span>
          );

          return item.to ? (
            <Link
              key={item.label}
              to={item.to}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                sfx();
              }}
              className={`transition-opacity duration-200 relative ${
                isCurrent ? 'opacity-100 text-white font-medium' : 'opacity-65 hover:opacity-100'
              }`}
            >
              {content}
            </Link>
          ) : (
            <a
              key={item.label}
              href={`/#${item.hash}`}
              onClick={(e) => goHash(e, item.hash)}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                sfx();
              }}
              className="opacity-65 hover:opacity-100 transition-opacity duration-200 relative"
            >
              {content}
            </a>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;
