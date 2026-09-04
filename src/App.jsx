import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/01';
import AboutPage from './pages/02';
import ProjectsPage from './pages/03';
import SkillsPage from './pages/04';

import ContactPage from './pages/05';

import AllProjectsPage from './project/01';
import HackathonPage from './hackathon/01';

import GlobalParticles from './components/GlobalParticles';
import Navbar from './components/Navbar';
import TerminalModal from './components/TerminalModal';
import { useState } from 'react';
import { Terminal } from 'lucide-react';

const pageMetadata = {
  
  '/': {
    title: 'Aditya Kumar Maurya | Full-Stack & IoT Developer',
    description: 'Portfolio of Aditya Kumar Maurya, a full-stack, Android, IoT, and embedded systems developer.',
  },
  '/project': {
    title: 'Projects | Aditya Kumar Maurya',
    description: 'Explore full-stack, Chrome extension, IoT, robotics, and embedded systems projects by Aditya Kumar Maurya.',
  },
  '/hackathon-winning': {
    title: 'Hackathon Wins | Aditya Kumar Maurya',
    description: 'Explore Aditya Kumar Maurya’s competitive engineering projects, hardware builds, and hackathon achievements.',
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

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

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
      <GlobalParticles />
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
      
      {/* Interactive Terminal Modal */}
      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      {/* Floating CLI Access Pill */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#080d1a]/90 hover:bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.35)] backdrop-blur-md text-xs font-mono transition-all duration-300 active:scale-95 cursor-pointer"
          title="Open Robotics & Telemetry CLI (Press ` or Ctrl+K)"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <Terminal className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-slate-200 group-hover:text-emerald-300">Terminal CLI</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
            `
          </span>
        </button>
      </div>

      <Routes>
        <Route path="/" element={
          <>
            <HomePage onOpenTerminal={() => setIsTerminalOpen(true)} />
            <AboutPage />
            <ProjectsPage />
            <SkillsPage />
            <ContactPage />
          </>
        } />

        <Route path="/project" element={<AllProjectsPage />} />
        <Route path="/hackathon-winning" element={<HackathonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
