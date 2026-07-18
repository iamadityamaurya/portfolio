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
  return (
    <Router>
      <SeoMeta />
      <GlobalParticles />
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
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
