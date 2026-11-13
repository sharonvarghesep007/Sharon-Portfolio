import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Stage {
  name: string;
  code: string;
  description: string;
  owner: string;
  badgeColor: string;
}

const STAGES: Stage[] = [
  {
    name: 'New',
    code: 'DEF-01',
    description: 'Defect identified and logged by QA with environment specs, logs, and exact steps to reproduce.',
    owner: 'QA Engineer',
    badgeColor: 'var(--qa-fail)',
  },
  {
    name: 'Assigned',
    code: 'DEF-02',
    description: 'Triage lead evaluates severity and priority, routing the ticket to the appropriate dev squad.',
    owner: 'QA Lead / Triage',
    badgeColor: 'var(--qa-warn)',
  },
  {
    name: 'Open',
    code: 'DEF-03',
    description: 'Developer investigates the defect, inspects code paths, and replicates the failure in dev environment.',
    owner: 'Developer',
    badgeColor: 'var(--qa-accent)',
  },
  {
    name: 'Fixed',
    code: 'DEF-04',
    description: 'Code change completed, unit tests passed, and build deployed to QA test server for retest.',
    owner: 'Developer',
    badgeColor: 'var(--qa-accent)',
  },
  {
    name: 'Retest',
    code: 'DEF-05',
    description: 'QA executes the original test case and negative scenarios to verify the bug is eliminated.',
    owner: 'QA Engineer',
    badgeColor: 'var(--qa-warn)',
  },
  {
    name: 'Verified',
    code: 'DEF-06',
    description: 'QA performs regression testing to ensure no neighboring functionality was broken by the fix.',
    owner: 'QA Engineer',
    badgeColor: 'var(--qa-pass)',
  },
  {
    name: 'Closed',
    code: 'DEF-07',
    description: 'Candidate release signed off; defect ticket marked resolved in the bug tracking system.',
    owner: 'QA Lead',
    badgeColor: 'var(--qa-pass)',
  },
];

export const DefectTimeline: React.FC = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reducedMotion = useReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Animate the ticket token across the stages when in view
  useEffect(() => {
    if (reducedMotion || !isInView) return;

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < STAGES.length) {
        setActiveStageIndex(idx);
      } else {
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isInView, reducedMotion]);

  const activeStage = STAGES[activeStageIndex];

  return (
    <section id="lifecycle" className="section-wrapper" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <div className="section-tag">Stage 04 · STLC Core Architecture</div>
          <h2 className="section-title">
            <span>Defect Life Cycle Pipeline</span>
            <span className="badge-pass">PASSING PROTOCOL</span>
          </h2>
          <p className="section-subtitle">
            A real-time visualization of Sharon&apos;s defect tracking rigor from bug discovery to production sign-off.
          </p>
        </div>

        {/* Pipeline Main Glass Card */}
        <div className="glass-card" style={{ padding: '2.5rem 1.75rem' }}>
          {/* Top Token Tracker Info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.1rem' }}>🎫</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                ACTIVE TICKET: <span style={{ color: 'var(--qa-accent)' }}>#DEF-2026-PLAYWRIGHT</span>
              </span>
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                padding: '0.35rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              Current State: <strong style={{ color: activeStage.badgeColor }}>{activeStage.name.toUpperCase()}</strong>
            </div>
          </div>

          {/* Interactive Horizontal Pipeline Track */}
          <div
            style={{
              position: 'relative',
              padding: '2.5rem 0 3.5rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
            className="lifecycle-track-scroll"
          >
            {/* Connecting Line Track */}
            <div
              style={{
                position: 'absolute',
                top: '50px',
                left: '4%',
                right: '4%',
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                zIndex: 1,
              }}
            >
              {/* Active filled line */}
              <motion.div
                style={{
                  height: '100%',
                  backgroundColor: 'var(--qa-pass)',
                  boxShadow: '0 0 12px var(--qa-pass-glow)',
                }}
                animate={{
                  width: `${(activeStageIndex / (STAGES.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            </div>

            {/* Stages Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 2,
                minWidth: '650px',
              }}
            >
              {STAGES.map((stage, idx) => {
                const isPassed = idx <= activeStageIndex;
                const isCurrent = idx === activeStageIndex;

                return (
                  <button
                    key={stage.name}
                    onClick={() => setActiveStageIndex(idx)}
                    onMouseEnter={() => setActiveStageIndex(idx)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      padding: '0 0.5rem',
                      transition: 'transform 0.15s ease',
                    }}
                    aria-label={`Inspect defect life cycle stage: ${stage.name}`}
                  >
                    {/* Stage Node */}
                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.25 : 1,
                        borderColor: isPassed ? 'var(--qa-pass)' : 'rgba(255, 255, 255, 0.15)',
                        backgroundColor: isCurrent
                          ? 'var(--qa-pass)'
                          : isPassed
                          ? 'var(--qa-pass-bg)'
                          : 'var(--bg-secondary)',
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '2px solid',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isCurrent ? '#0b1020' : isPassed ? 'var(--qa-pass)' : 'var(--text-muted)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        boxShadow: isCurrent ? '0 0 16px var(--qa-pass)' : 'none',
                        zIndex: 3,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isPassed ? (isCurrent ? '●' : '✓') : idx + 1}
                    </motion.div>

                    {/* Stage Name */}
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.86rem',
                          fontWeight: isCurrent ? 700 : 500,
                          color: isCurrent
                            ? 'var(--text-primary)'
                            : isPassed
                            ? 'var(--qa-pass)'
                            : 'var(--text-muted)',
                          transition: 'color 0.2s',
                        }}
                      >
                        {stage.name}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {stage.code}
                      </div>
                    </div>

                    {/* Traveling Bug Ticket Badge on Current Stage */}
                    {isCurrent && (
                      <motion.div
                        layoutId="ticket-indicator"
                        style={{
                          position: 'absolute',
                          top: '-32px',
                          backgroundColor: 'var(--qa-pass)',
                          color: '#0b1020',
                          padding: '0.15rem 0.55rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 8px var(--qa-pass-glow)',
                        }}
                      >
                        BUG TICKET 🐛
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Stage Explanation Card */}
          <motion.div
            key={activeStage.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: '1.5rem',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              border: `1px solid ${activeStage.badgeColor}`,
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                <span
                  style={{
                    backgroundColor: activeStage.badgeColor,
                    color: '#0b1020',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                  }}
                >
                  {activeStage.code}
                </span>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                  Stage: {activeStage.name}
                </h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', margin: 0 }}>
                {activeStage.description}
              </p>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                textAlign: 'right',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ color: 'var(--text-muted)' }}>Primary Custodian:</div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{activeStage.owner}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

