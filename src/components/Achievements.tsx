import React from 'react';
import { motion } from 'framer-motion';
import { resume } from '../data/resume';
import { Confetti } from './Confetti';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ICONS = ['🏆', '🤖', '⚡'];

export const Achievements: React.FC = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reducedMotion = useReducedMotion();

  return (
    <section id="achievements" className="section-wrapper" ref={ref} style={{ position: 'relative' }}>
      {/* Confetti Burst when scrolled into view */}
      <Confetti trigger={isInView} />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <div className="section-tag">Stage 07 · Honors & Badges</div>
          <h2 className="section-title">
            <span>Certifications & Achievements</span>
            <span className="badge-pass">AWARDS GRANTED</span>
          </h2>
          <p className="section-subtitle">
            Verified competitive project prizes, foundational AI development, and Google cloud certifications.
          </p>
        </div>

        {/* Achievement Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {resume.achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: reducedMotion ? 0 : idx * 0.15 }}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--border-card)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '2rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(242, 180, 65, 0.12)',
                      border: '1px solid rgba(242, 180, 65, 0.3)',
                    }}
                  >
                    {ICONS[idx] || '🎖️'}
                  </span>
                  <span className="badge-warn">AWARDED</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                  {item.detail}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--qa-pass)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>✓</span>
                <span>VERIFIED QA & ACADEMIC CREDENTIAL</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

