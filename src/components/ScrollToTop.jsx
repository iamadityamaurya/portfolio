import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger, scrollToTarget } from '../lib/scroll';

// Reset scroll on route change; honour { state: { scrollTo: 'id' } } from nav links on other pages.
const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    scrollToTarget(0, true);
    if (!state?.scrollTo) return;
    const id = setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToTarget(`#${state.scrollTo}`, true);
    }, 150);
    return () => clearTimeout(id);
  }, [pathname, state]);

  return null;
};

export default ScrollToTop;
