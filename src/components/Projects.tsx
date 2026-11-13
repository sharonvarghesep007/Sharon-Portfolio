import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resume } from '../data/resume';
import { StegoDemo } from './StegoDemo';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Projects: React.FC = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();
  const [prestaShopTab, setPrestaShopTab] = useState<'overview' | 'coverage' | 'deliverables'>('overview');

  const prestaShop = resume.projects.find((p) => p.title === 'PrestaShop');
  const invisData = resume.projects.find((p) => p.title === 'InvisData');

  return (
    <section id="projects" className="section-wrapper" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <div className="section-tag">Stage 06 · Test Reports & Deliverables</div>
          <h2 className="section-title">
            <span>Verified Project Test Suites</span>
            <span className="badge-pass">PASSING AUDIT</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive test executions, end-to-end e-commerce quality assurance, and security steganography algorithms.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
          }}
        >
          {/* Card 1: PrestaShop Test Report */}
          {prestaShop && (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="glass-card"
              style={{
                border: '1.5px solid var(--border-card)',
              }}
            >
              {/* Card Header & Report Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--qa-accent)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    TEST SUITE #QA-PS-2026
                  </div>
                  <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>
                    {prestaShop.title}
                  </h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    Type: <strong style={{ color: 'var(--qa-pass)' }}>{prestaShop.type}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="badge-pass">SUITE: COMPLETE</span>
                  <span className="badge-accent">7 WORKFLOWS</span>
                </div>
              </div>

              {/* Sub-tabs for PrestaShop: Overview / Workflow Coverage / Deliverables */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '0.75rem',
                  flexWrap: 'wrap',
                }}
                role="tablist"
              >
                <button
                  onClick={() => setPrestaShopTab('overview')}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    fontWeight: prestaShopTab === 'overview' ? 700 : 500,
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: prestaShopTab === 'overview' ? 'var(--qa-pass-bg)' : 'transparent',
                    color: prestaShopTab === 'overview' ? 'var(--qa-pass)' : 'var(--text-secondary)',
                    border: prestaShopTab === 'overview' ? '1px solid var(--qa-pass)' : '1px solid transparent',
                    cursor: 'pointer',
                  }}
                  role="tab"
                  aria-selected={prestaShopTab === 'overview'}
                >
                  Overview & Findings
                </button>

                <button
                  onClick={() => setPrestaShopTab('coverage')}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    fontWeight: prestaShopTab === 'coverage' ? 700 : 500,
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: prestaShopTab === 'coverage' ? 'var(--qa-pass-bg)' : 'transparent',
                    color: prestaShopTab === 'coverage' ? 'var(--qa-pass)' : 'var(--text-secondary)',
                    border: prestaShopTab === 'coverage' ? '1px solid var(--qa-pass)' : '1px solid transparent',
                    cursor: 'pointer',
                  }}
                  role="tab"
                  aria-selected={prestaShopTab === 'coverage'}
                >
                  Workflow & Test Types ({prestaShop.workflows?.length})
                </button>

                <button
                  onClick={() => setPrestaShopTab('deliverables')}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    fontWeight: prestaShopTab === 'deliverables' ? 700 : 500,
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: prestaShopTab === 'deliverables' ? 'var(--qa-pass-bg)' : 'transparent',
                    color: prestaShopTab === 'deliverables' ? 'var(--qa-pass)' : 'var(--text-secondary)',
                    border: prestaShopTab === 'deliverables' ? '1px solid var(--qa-pass)' : '1px solid transparent',
                    cursor: 'pointer',
                  }}
                  role="tab"
                  aria-selected={prestaShopTab === 'deliverables'}
                >
                  QA Deliverable Artifacts ({prestaShop.deliverables?.length})
                </button>
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                {prestaShopTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ul
                      style={{
                        paddingLeft: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {prestaShop.points.map((pt, pIdx) => (
                        <li key={pIdx} style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {prestaShopTab === 'coverage' && (
                  <motion.div
                    key="coverage"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          color: 'var(--qa-accent)',
                          marginBottom: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        COVERED E-COMMERCE WORKFLOWS:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                        {prestaShop.workflows?.map((wf) => (
                          <div
                            key={wf}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              padding: '0.4rem 0.85rem',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: 'rgba(62, 209, 168, 0.1)',
                              border: '1px solid var(--qa-pass)',
                              color: 'var(--qa-pass)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                            }}
                          >
                            <span>✓</span>
                            <span>{wf}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          color: 'var(--qa-warn)',
                          marginBottom: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        TEST SCENARIO TYPES APPLIED:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                        {prestaShop.testTypes?.map((tt) => (
                          <div
                            key={tt}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              padding: '0.35rem 0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'rgba(242, 180, 65, 0.1)',
                              border: '1px solid rgba(242, 180, 65, 0.3)',
                              color: 'var(--qa-warn)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.82rem',
                            }}
                          >
                            <span>⚡</span>
                            <span>{tt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {prestaShopTab === 'deliverables' && (
                  <motion.div
                    key="deliverables"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1rem',
                      }}
                    >
                      {prestaShop.deliverables?.map((doc, dIdx) => (
                        <div
                          key={dIdx}
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            border: '1px solid var(--border-card)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '1.5rem' }}>📄</span>
                            <span className="badge-pass">AUDITED</span>
                          </div>
                          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                            {doc}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              color: 'var(--text-muted)',
                            }}
                          >
                            Standard QA Documentation Package
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Card 2: InvisData Steganography Project & Canvas Demo */}
          {invisData && (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="glass-card"
              style={{
                border: '1.5px solid var(--border-card)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--qa-accent)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    SECURITY & ENCRYPTION #INVIS-01
                  </div>
                  <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>
                    {invisData.title}
                  </h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    Type: <strong style={{ color: 'var(--qa-accent)' }}>{invisData.type}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="badge-accent">STEGANOGRAPHY</span>
                  <span className="badge-pass">LSB ENCODING</span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul
                style={{
                  paddingLeft: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                }}
              >
                {invisData.points.map((pt, pIdx) => (
                  <li key={pIdx} style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                    {pt}
                  </li>
                ))}
              </ul>

              {/* Embedded Canvas Steganography Visualizer */}
              <StegoDemo />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

