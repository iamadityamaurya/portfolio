import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const navItems = [
  { label: 'About', href: '#about', isRoute: false },
  { label: 'Projects', href: '#projects', isRoute: false },
  { label: 'Skills', href: '#skills', isRoute: false },
  { label: 'Contact', href: '#contact', isRoute: false },
];

export const Navbar = ({ onOpenTerminal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

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
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      <nav className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#080d1a]/85 backdrop-blur-xl border border-slate-700/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)] text-xs sm:text-sm font-medium text-slate-300">
        {navItems.map((item) => {
          if (item.isRoute) {
            return (
              <Link
                key={item.label}
                to={item.href}
                className="transition-colors duration-200 hover:text-emerald-400 whitespace-nowrap"
              >
                {item.label}
              </Link>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              className="transition-colors duration-200 hover:text-emerald-400 cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </a>
          );
        })}

        {/* CLI Terminal Trigger Button */}
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-xs font-mono font-semibold cursor-pointer active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
          title="Open Robotics & Telemetry CLI Terminal"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>&gt;_ CLI</span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
