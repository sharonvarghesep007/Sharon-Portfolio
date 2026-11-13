import React from 'react';
import { motion } from 'framer-motion';
import { resume } from '../data/resume';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const About: React.FC = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="section-wrapper" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <div className="section-tag">Stage 02 · Candidate Dossier</div>
          <h2 className="section-title">
            <span>About The Tester</span>
            <span className="badge-pass">STATUS: VERIFIED</span>
          </h2>
          <p className="section-subtitle">
            System specifications, professional objective, and academic background.
          </p>
        </div>

        {/* 2-Column Grid: Left is Objective & Dossier, Right is Education & QA Attributes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Left Column: Objective & Candidate Specs */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="glass-card"
          >
            {/* Header with terminal dot */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--qa-pass)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                  $ cat sharon_profile.json
                </span>
              </div>
              <span className="badge-pass">PASS</span>
            </div>

            <p style={{ marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.75' }}>
              {resume.objective}
            </p>

            {/* Quick Meta Specs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Location: </span>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{resume.location}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Degree Status: </span>
                <div style={{ color: 'var(--qa-pass)', fontWeight: 600 }}>B.Tech (2022–2026)</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Active Automation: </span>
                <div style={{ color: 'var(--qa-accent)', fontWeight: 600 }}>Playwright + TS</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Core Discipline: </span>
                <div style={{ color: 'var(--qa-warn)', fontWeight: 600 }}>Manual & STLC QA</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education Track */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="glass-card"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem',
              }}
            >
              <h3 style={{ fontSize: '1.25rem' }}>Education & Academic Foundation</h3>
              <span className="badge-accent">ACADEMIC RECORD</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {resume.education.map((edu, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    paddingLeft: '1.5rem',
                    borderLeft: '2px solid var(--qa-accent)',
                  }}
                >
                  {/* Dot */}
                  <span
                    style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '4px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--qa-accent)',
                      boxShadow: '0 0 8px var(--qa-accent-glow)',
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '0.25rem',
                    }}
                  >
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{edu.degree}</h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--qa-accent)',
                        backgroundColor: 'var(--qa-accent-bg)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {edu.period}
                    </span>
                  </div>

                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    {edu.school}
                  </div>
                </div>
              ))}
            </div>

            {/* QA Competencies summary box */}
            <div
              style={{
                marginTop: '1.75rem',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(62, 209, 168, 0.05)',
                border: '1px solid rgba(62, 209, 168, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>🛡️</span>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Rigorous training in Software Engineering principles, algorithms, data structures, and STLC best practices.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

