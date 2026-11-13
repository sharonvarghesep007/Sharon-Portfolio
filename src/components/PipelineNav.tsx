import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PipelineNavProps {
  currentTheme: 'dark' | 'light';
  onToggleTheme: () => void;
  onLogoClick: () => void;
}

const SECTIONS = [
  { id: 'hero', label: '01. INIT' },
  { id: 'about', label: '02. ABOUT' },
  { id: 'skills', label: '03. MATRIX' },
  { id: 'lifecycle', label: '04. LIFECYCLE' },
  { id: 'experience', label: '05. CI/CD' },
  { id: 'projects', label: '06. SUITES' },
  { id: 'achievements', label: '07. AWARDS' },
  { id: 'contact', label: '08. CONTACT' },
];

export const PipelineNav: React.FC<PipelineNavProps> = ({
  currentTheme,
  onToggleTheme,
  onLogoClick,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [passedSections, setPassedSections] = useState<string[]>(['hero']);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const passed: string[] = [];
      let current = SECTIONS[0].id;

      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop - 200;
          if (scrollY >= top) {
            passed.push(sec.id);
            current = sec.id;
          }
        }
      });

      setPassedSections(passed.length > 0 ? passed : ['hero']);
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '64px',
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
        }}
      >
        {/* Brand / Logo */}
        <button
          onClick={onLogoClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.92rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
          }}
          aria-label="Sharon Varghese Portfolio Test Lab Logo - Click 5 times for easter egg"
          title="Sharon Varghese P · The Test Lab"
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--qa-pass-bg)',
              border: '1px solid var(--border-active)',
              color: 'var(--qa-pass)',
              fontSize: '0.9rem',
            }}
          >
            ✓
          </span>
          <span>SHARON</span>
          <span style={{ color: 'var(--qa-pass)' }}>.TEST_LAB</span>
          <span
            style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.45rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--qa-pass-bg)',
              color: 'var(--qa-pass)',
              border: '1px solid rgba(62, 209, 168, 0.3)',
              marginLeft: '0.25rem',
            }}
            className="desktop-only"
          >
            PASSING
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
          className="desktop-nav"
          aria-label="Main Navigation"
        >
          {SECTIONS.slice(1).map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: activeSection === sec.id ? 'var(--qa-pass)' : 'var(--text-secondary)',
                fontWeight: activeSection === sec.id ? 600 : 400,
                transition: 'color var(--transition-fast)',
                padding: '0.4rem 0.2rem',
                position: 'relative',
              }}
            >
              {sec.label.split('. ')[1]}
              {activeSection === sec.id && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--qa-pass)',
                    boxShadow: '0 0 6px var(--qa-pass-glow)',
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              transition: 'all var(--transition-fast)',
            }}
            aria-label={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} mode`}
            title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {currentTheme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Quick Resume Link / CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="btn-primary desktop-only"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.82rem',
            }}
          >
            Run Hire Triage →
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '5px',
              width: '36px',
              height: '36px',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-card)',
              backgroundColor: 'var(--bg-secondary)',
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--text-primary)',
                transition: 'transform 0.2s',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--text-primary)',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--text-primary)',
                transition: 'transform 0.2s',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              width: '100%',
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-card)',
              padding: '1.5rem',
              zIndex: 899,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
            aria-label="Mobile Navigation Drawer"
          >
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                style={{
                  textAlign: 'left',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  padding: '0.6rem 0.5rem',
                  color: activeSection === sec.id ? 'var(--qa-pass)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span>{sec.label}</span>
                <span style={{ color: passedSections.includes(sec.id) ? 'var(--qa-pass)' : 'var(--text-muted)' }}>
                  {passedSections.includes(sec.id) ? '✓ PASSED' : '⏳ PENDING'}
                </span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Side Pipeline Track Nav (Visible on desktop viewports) */}
      <aside
        className="pipeline-side-nav"
        style={{
          position: 'fixed',
          left: '1.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 850,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
        }}
        aria-label="Pipeline Stage Tracker"
      >
        {SECTIONS.map((sec, idx) => {
          const isPassed = passedSections.includes(sec.id);
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textAlign: 'left',
                group: 'stage',
              }}
              aria-label={`Jump to ${sec.label}`}
              title={`${sec.label} (${isPassed ? 'Passed' : 'Pending'})`}
            >
              <div
                style={{
                  width: isActive ? '12px' : '8px',
                  height: isActive ? '12px' : '8px',
                  borderRadius: '50%',
                  backgroundColor: isPassed ? 'var(--qa-pass)' : 'var(--border-card)',
                  boxShadow: isActive ? '0 0 10px var(--qa-pass)' : isPassed ? '0 0 5px var(--qa-pass-glow)' : 'none',
                  transition: 'all 0.2s ease',
                  border: isActive ? '2px solid var(--bg-primary)' : 'none',
                }}
              />
              <span
                className="pipeline-label"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.05em',
                  color: isActive ? 'var(--qa-pass)' : isPassed ? 'var(--text-secondary)' : 'var(--text-muted)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                {sec.label}
              </span>
            </button>
          );
        })}
      </aside>

      <style>{`
        @media (max-width: 1024px) {
          .pipeline-side-nav {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-nav, .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-only {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

