import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToTarget } from '../lib/scroll';

const navItems = [
  { label: 'work', to: '/experience' },
  { label: 'about', hash: 'about' },
  { label: 'projects', to: '/projects' },
  { label: 'contact', hash: 'contact' },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goHash = (e, hash) => {
    e.preventDefault();
    if (pathname === '/') scrollToTarget(`#${hash}`);
    else navigate('/', { state: { scrollTo: hash } });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-5 mix-blend-difference text-white">
      <Link to="/" className="text-base sm:text-lg font-bold tracking-tight" aria-label="Aditya Kumar Maurya, home">
        Aditya.
      </Link>
      <nav className="flex gap-4 sm:gap-8 font-mono text-xs sm:text-sm">
        {navItems.map((item) =>
          item.to ? (
            <Link
              key={item.label}
              to={item.to}
              className={`hover:opacity-100 transition-opacity ${pathname === item.to ? 'opacity-100' : 'opacity-60'}`}
            >
              {item.label}
            </Link>
          ) : (
            <a key={item.label} href={`/#${item.hash}`} onClick={(e) => goHash(e, item.hash)} className="opacity-60 hover:opacity-100 transition-opacity">
              {item.label}
            </a>
          )
        )}
      </nav>
    </header>
  );
};

export default Navbar;
