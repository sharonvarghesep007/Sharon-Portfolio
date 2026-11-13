import React from 'react';
import { motion } from 'framer-motion';
import { resume } from '../data/resume';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

const COMMIT_HASHES = ['c8f94a2', 'b4e197c', 'a10d32f'];

export const Experience: React.FC = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  return (
    <section id="experience" className="section-wrapper" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <div className="section-tag">Stage 05 · CI/CD & Production Logs</div>
          <h2 className="section-title">
            <span>Experience & Git Log</span>
            <span className="badge-pass">DEPLOYED</span>
          </h2>
          <p className="section-subtitle">
            A chronological timeline of QA internships, automation framework development, and community impact.
          </p>
        </div>

        {/* Pulsing Active Status Banner for CURRENT role */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(62, 209, 168, 0.1)',
            border: '1px solid var(--qa-pass)',
            boxShadow: '0 0 20px var(--qa-pass-glow)',
            marginBottom: '3rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            color: 'var(--text-primary)',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--qa-pass)',
              boxShadow: '0 0 10px var(--qa-pass)',
              animation: 'pulse 1.8s infinite',
            }}
          />
          <span style={{ color: 'var(--qa-pass)', fontWeight: 700 }}>CURRENTLY RUNNING:</span>
          <span>Testing Mavens · QA Intern (Playwright & TypeScript Automation)</span>
        </div>

        {/* Vertical Git Log Timeline */}
        <div
          style={{
            position: 'relative',
            paddingLeft: '2.5rem',
          }}
        >
          {/* Vertical Connecting Line */}
          <div
            style={{
              position: 'absolute',
              left: '11px',
              top: '8px',
              bottom: '16px',
              width: '2px',
              backgroundColor: 'var(--border-subtle)',
            }}
          >
            <motion.div
              style={{
                width: '100%',
                backgroundColor: 'var(--qa-pass)',
                boxShadow: '0 0 8px var(--qa-pass)',
                originY: 0,
              }}
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>

          {/* Experience Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {resume.experience.map((item, idx) => {
              const hash = COMMIT_HASHES[idx] || 'e49a12b';
              const isCurrent = Boolean(item.current);

              return (
                <motion.div
                  key={item.company}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: reducedMotion ? 0 : idx * 0.15 }}
                  style={{ position: 'relative' }}
                >
                  {/* Timeline Commit Node */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-2.5rem',
                      top: '1.25rem',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isCurrent ? 'var(--qa-pass)' : 'var(--bg-secondary)',
                      border: isCurrent ? '3px solid var(--bg-primary)' : '2px solid var(--qa-accent)',
                      boxShadow: isCurrent ? '0 0 14px var(--qa-pass)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCurrent ? '#0b1020' : 'var(--qa-accent)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      transform: 'translateX(-50%)',
                      zIndex: 2,
                    }}
                  >
                    {isCurrent ? '●' : '○'}
                  </div>

                  {/* Card Container */}
                  <div
                    className="glass-card"
                    style={{
                      border: isCurrent
                        ? '1.5px solid var(--qa-pass)'
                        : '1px solid var(--border-card)',
                      boxShadow: isCurrent
                        ? '0 10px 30px rgba(62, 209, 168, 0.15)'
                        : 'var(--shadow-sm)',
                    }}
                  >
                    {/* Commit Meta Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid var(--border-subtle)',
                        marginBottom: '1.25rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ color: 'var(--qa-accent)', fontWeight: 700 }}>
                          commit {hash}
                        </span>
                        {isCurrent && (
                          <span
                            style={{
                              backgroundColor: 'var(--qa-pass-bg)',
                              color: 'var(--qa-pass)',
                              border: '1px solid var(--qa-pass)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                            }}
                          >
                            HEAD -&gt; ACTIVE
                          </span>
                        )}
                      </div>

                      <div style={{ color: 'var(--text-muted)' }}>{item.period}</div>
                    </div>

                    {/* Role & Company */}
                    <div style={{ marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {item.role}
                      </h3>
                      <div
                        style={{
                          fontSize: '1rem',
                          color: 'var(--qa-accent)',
                          fontWeight: 600,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        @ {item.company}
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul
                      style={{
                        paddingLeft: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {item.points.map((point, pIdx) => (
                        <li key={pIdx} style={{ fontSize: '0.98rem', lineHeight: '1.65' }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
};

