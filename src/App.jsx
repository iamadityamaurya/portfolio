import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/01';
import AboutPage from './pages/02';
import ProjectsPage from './pages/03';
import SkillsPage from './pages/04';
import ContactPage from './pages/05';

import AllProjectsPage from './project/01';

import GlobalParticles from './components/GlobalParticles';

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
