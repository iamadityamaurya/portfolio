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
    <header className="fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-max max-w-[96vw]">
      <nav className="flex items-center gap-2 sm:gap-4 md:gap-6 pl-4 pr-3 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#080d1a]/95 backdrop-blur-xl border border-slate-700/70 shadow-[0_10px_35px_rgba(0,0,0,0.6)] text-slate-300 font-medium">
        {navItems.map((item) => {
          if (item.isRoute) {
            return (
              <Link
                key={item.label}
                to={item.href}
                className="transition-colors duration-200 hover:text-white whitespace-nowrap px-1 sm:px-1.5 py-1 text-xs sm:text-sm font-semibold"
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
              className="transition-colors duration-200 hover:text-white cursor-pointer whitespace-nowrap px-1 sm:px-1.5 py-1 text-xs sm:text-sm font-semibold"
            >
              {item.label}
            </a>
          );
        })}

        {/* CLI Terminal Trigger Button */}
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-600 hover:border-slate-400 transition-all text-[11px] sm:text-xs font-mono font-semibold cursor-pointer active:scale-95 shrink-0 ml-1"
          title="Open Robotics & Telemetry CLI Terminal"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>&gt;_ CLI</span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
