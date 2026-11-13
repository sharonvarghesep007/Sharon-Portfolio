import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Background from './components/Background';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main id="main-content" className="main-content">
        <Hero />
        <Projects />
        <Skills />
        <Background />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

