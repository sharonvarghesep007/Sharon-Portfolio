import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ScrollProgress';
import { PipelineNav } from './components/PipelineNav';
import { AmbientBackground } from './components/AmbientBackground';
import { Hero } from './components/Hero';
import { BugGame } from './components/BugGame';
import { TestRunner } from './components/TestRunner';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { DefectTimeline } from './components/DefectTimeline';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [testRunnerOpen, setTestRunnerOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  // Sync theme with document class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogoClick = () => {
    setLogoClickCount((prev) => prev + 1);
  };

  return (
    <div className="test-lab-app">
      {/* Top Test-Progress Bar */}
      <ScrollProgress />

      {/* Crosshair Magnifier Cursor */}
      <Cursor />

      {/* Floating Assertions / Ambient Code Drift */}
      <AmbientBackground />

      {/* Terminal Boot-up Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Top Navbar & Side Pipeline Stage Track */}
      <PipelineNav
        currentTheme={theme}
        onToggleTheme={toggleTheme}
        onLogoClick={handleLogoClick}
      />

      {/* Main Content Flow */}
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section with Squash the Bug Game */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <BugGame />
          <Hero onRunTests={() => setTestRunnerOpen(true)} />
        </div>

        {/* 02. About Section with Education */}
        <About />

        {/* 03. Skills Test Matrix */}
        <Skills />

        {/* 04. Defect Life Cycle Pipeline Timeline */}
        <DefectTimeline />

        {/* 05. Experience Git-Log & CI Timeline */}
        <Experience />

        {/* 06. Projects Test Reports & Stego Demo */}
        <Projects />

        {/* 07. Achievements Badges with Confetti Burst */}
        <Achievements />

        {/* 08. Contact Terminal Block */}
        <Contact />
      </main>

      {/* Footer & Harmless Bug Swarm Easter Egg */}
      <Footer swarmTriggeredCount={logoClickCount} />

      {/* Interactive Playwright Candidate Test Runner Modal */}
      <TestRunner isOpen={testRunnerOpen} onClose={() => setTestRunnerOpen(false)} />
    </div>
  );
};

export default App;

