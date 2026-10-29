import { motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#2b4bff] via-[#5c75ff] to-[#93a4ff] origin-left z-[100] pointer-events-none shadow-[0_0_8px_rgba(43,75,255,0.8)]"
      style={{ scaleX }}
    />
  );
}
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/01';
import AboutPage from './pages/02';
import ProjectsPage from './pages/03';
import SkillsPage from './pages/04';
import ContactPage from './pages/05';
import AllProjectsPage from './project/01';
import HackathonPage from './hackathon/01';
import ExperiencePage from './pages/Experience';
import NotFound from './pages/NotFound';

import Navbar from './components/Navbar';
import TerminalModal from './components/TerminalModal';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import { initLenis, ScrollTrigger, gsap, reducedMotion } from './lib/scroll';

const pageMetadata = {
  
  '/': {
    title: 'Aditya Kumar Maurya | Full-Stack & IoT Developer',
    description: 'Portfolio of Aditya Kumar Maurya, a full-stack, Android, IoT, and embedded systems developer.',
  },
  '/projects': {
    title: 'Projects | Aditya Kumar Maurya',
    description: 'Explore full-stack, Chrome extension, IoT, robotics, and embedded systems projects by Aditya Kumar Maurya.',
  },
  '/hackathon-winning': {
    title: 'Hackathon Wins | Aditya Kumar Maurya',
    description: 'Explore Aditya Kumar Maurya’s competitive engineering projects, hardware builds, and hackathon achievements.',
  },
  '/experience': {
    title: 'Experience | Aditya Kumar Maurya',
    description: 'Explore Aditya Kumar Maurya’s work experience across software internships, IoT hardware engineering, and robotics.',
  },
  '/about': {
    title: 'About | Aditya Kumar Maurya',
    description: 'Learn about Aditya Kumar Maurya — full-stack, Android, and IoT developer; his background, experience, and engineering journey.',
  },
};

const siteUrl = 'https://iamadityamaurya.vercel.app';

const setMetaContent = (selector, content) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute('content', content);
};

function SeoMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? pageMetadata['/'];
    const canonicalUrl = `${siteUrl}${pathname}`;
    document.title = metadata.title;
    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[property="og:image"]', `${siteUrl}/logo.svg`);
    setMetaContent('meta[name="twitter:title"]', metadata.title);
    setMetaContent('meta[name="twitter:description"]', metadata.description);
    setMetaContent('meta[name="twitter:image"]', `${siteUrl}/logo.svg`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [pathname]);

  return null;
}



// Curtain that lifts off each new route (douglus.site-style sweep, reveal half only).
function RouteCurtain() {
  const { pathname } = useLocation();
  const ref = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current || reducedMotion()) {
      first.current = false;
      return;
    }
    gsap.fromTo(ref.current,
      { yPercent: 0, borderBottomLeftRadius: '0%', borderBottomRightRadius: '0%', visibility: 'visible' },
      { yPercent: -100, borderBottomLeftRadius: '50% 20%', borderBottomRightRadius: '50% 20%', duration: 0.9, ease: 'power4.inOut', delay: 0.1,
        onComplete: () => gsap.set(ref.current, { visibility: 'hidden' }) });
  }, [pathname]);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-[9000] invisible bg-[#1c1d20]" aria-hidden="true" />;
}

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initLenis();
  }, []);

  // Pins and spacers depend on final layout: refresh once fonts are in.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  // Global shortcut to toggle terminal: ` (backquote) or Ctrl+` or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '`' && !e.shiftKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') ||
          ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === '`' || e.key === 'j'))) {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <SeoMeta />
      <ScrollProgress />
      <ScrollToTop />
      <RouteCurtain />
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Navbar />
      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      <Routes>
        <Route path="/" element={
          <main>
            <HomePage ready={ready} />
            <AboutPage />
            <ProjectsPage />
            <SkillsPage />
            <ContactPage />
          </main>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/hackathon-winning" element={<HackathonPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
