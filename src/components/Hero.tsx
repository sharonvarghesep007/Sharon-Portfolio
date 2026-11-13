import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { resume } from '../data/resume';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface HeroProps {
  onRunTests: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRunTests }) => {
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const roles = resume.roles;

  // Typewriter effect for rotating roles
  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(roles[0]);
      return;
    }

    const currentFullRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentFullRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles, reducedMotion]);

  const nameLetters = resume.name.split('');

  return (
    <section
      id="hero"
      className="section-wrapper"
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '6rem',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
        {/* Environment Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--qa-pass-bg)',
            border: '1px solid var(--border-active)',
            marginBottom: '1.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            color: 'var(--qa-pass)',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--qa-pass)', boxShadow: '0 0 8px var(--qa-pass)' }} />
          <span>SUITE: PLAYWRIGHT & MANUAL QA · 100% READY</span>
        </motion.div>

        {/* Large Name with Letter-by-Letter Reveal and Glitch on Hover */}
        <div
          onMouseEnter={() => setGlitchActive(true)}
          onMouseLeave={() => setGlitchActive(false)}
          style={{
            cursor: 'pointer',
            marginBottom: '1rem',
            userSelect: 'none',
          }}
          title="Sharon Varghese P · Hover for glitch effect"
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              textShadow: glitchActive ? '2px 0 var(--qa-fail), -2px 0 var(--qa-accent)' : 'none',
              transition: 'text-shadow 0.1s ease',
            }}
          >
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: reducedMotion ? 0 : index * 0.035,
                  ease: 'easeOut',
                }}
                style={{
                  display: 'inline-block',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                  color: char === 'P' ? 'var(--qa-pass)' : 'inherit',
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Rotating Role Line */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.1rem, 2.8vw, 1.8rem)',
            color: 'var(--text-secondary)',
            minHeight: '2.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ color: 'var(--qa-accent)' }}>&gt;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{displayText}</span>
          {!reducedMotion && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              style={{
                display: 'inline-block',
                width: '10px',
                height: '1.2em',
                backgroundColor: 'var(--qa-pass)',
                verticalAlign: 'middle',
              }}
            />
          )}
        </div>

        {/* Current Stack Highlighting: Playwright & TypeScript Prominently */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
            }}
          >
            Core Automation Focus:
          </span>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(62, 209, 168, 0.14)',
              border: '1px solid var(--qa-pass)',
              color: 'var(--qa-pass)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              boxShadow: '0 0 12px var(--qa-pass-glow)',
            }}
          >
            <span>🎭</span>
            <span>Playwright</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(126, 162, 255, 0.14)',
              border: '1px solid var(--qa-accent)',
              color: 'var(--qa-accent)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              boxShadow: '0 0 12px var(--qa-accent-glow)',
            }}
          >
            <span>🔷</span>
            <span>TypeScript</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(242, 180, 65, 0.14)',
              border: '1px solid var(--qa-warn)',
              color: 'var(--qa-warn)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <span>📋</span>
            <span>Manual & STLC</span>
          </div>
        </motion.div>

        {/* Short Hook */}
        <p
          style={{
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
          }}
        >
          Specializing in end-to-end manual and automated quality assurance. Designing bulletproof test
          cases, uncovering edge defects, and validating real-world web applications.
        </p>

        {/* Action Buttons: Run Tests CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={onRunTests}
            className="btn-primary"
            style={{
              fontSize: '1rem',
              padding: '0.9rem 2rem',
            }}
            title="Execute interactive candidate test suite"
          >
            <span>▶</span>
            <span>Run Tests (8/8)</span>
          </button>

          <a
            href="#projects"
            className="btn-secondary"
            style={{
              fontSize: '0.95rem',
              padding: '0.9rem 1.75rem',
            }}
          >
            <span>📊</span>
            <span>View Test Reports</span>
          </a>

          <a
            href="#contact"
            className="btn-secondary"
            style={{
              fontSize: '0.95rem',
              padding: '0.9rem 1.75rem',
            }}
          >
            <span>✉</span>
            <span>Hire Sharon</span>
          </a>
        </div>

        {/* Subtle Hint for mini-game */}
        <div
          style={{
            marginTop: '3.5rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
          className="desktop-only"
        >
          <span>Tip: 🐛 Defect bugs are crawling in the environment — click to squash them!</span>
        </div>
      </div>
    </section>
  );
};

