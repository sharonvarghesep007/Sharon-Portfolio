import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

const TEST_STEPS = [
  { text: '✓ loads resume.ts', time: '14ms', status: 'pass' },
  { text: '✓ validates core QA & manual testing skills', time: '18ms', status: 'pass' },
  { text: '✓ verifies Playwright & TypeScript automation', time: '24ms', status: 'pass' },
  { text: '✓ checks STLC & defect life cycle model', time: '16ms', status: 'pass' },
  { text: '✓ parses PrestaShop test case & bug reports', time: '22ms', status: 'pass' },
  { text: '✓ confirms InvisData steganography modules', time: '19ms', status: 'pass' },
  { text: '✓ evaluates Sahrdaya B.Tech academic track', time: '15ms', status: 'pass' },
  { text: '✓ executes final regression assertions', time: '31ms', status: 'pass' },
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const reducedMotion = useReducedMotion();
  const [typedCommand, setTypedCommand] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const fullCommand = 'npx playwright test sharon.spec.ts --project=qa-portfolio';

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    // Keyboard listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        setIsDone(true);
        setTimeout(onComplete, 400);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Typewriter effect for command
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      if (charIdx <= fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typeInterval);
        // Start running test steps
        startSteps();
      }
    }, 28);

    const startSteps = () => {
      let step = 0;
      const stepInterval = setInterval(() => {
        if (step < TEST_STEPS.length) {
          setCurrentStepIndex(step);
          setProgress(Math.round(((step + 1) / TEST_STEPS.length) * 100));
          step++;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 450);
        }
      }, 160);
    };

    return () => {
      clearInterval(typeInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [reducedMotion, onComplete]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            className="terminal-window"
            style={{
              width: '100%',
              maxWidth: '680px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
              overflow: 'hidden',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {/* Terminal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.25rem',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
                <span
                  style={{
                    marginLeft: '0.75rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  playwright-runner · sharon.spec.ts
                </span>
              </div>
              <button
                onClick={() => {
                  setIsDone(true);
                  setTimeout(onComplete, 300);
                }}
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.2rem 0.55rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
                }}
                title="Skip preloader animation"
              >
                Skip [ESC]
              </button>
            </div>

            {/* Terminal Body */}
            <div
              style={{
                padding: '1.5rem',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                minHeight: '280px',
              }}
            >
              {/* Prompt line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <span style={{ color: 'var(--qa-pass)', fontWeight: 'bold' }}>test-lab@sharon:~$</span>
                <span>{typedCommand}</span>
                {typedCommand.length < fullCommand.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '1.1em',
                      backgroundColor: 'var(--qa-pass)',
                      verticalAlign: 'middle',
                    }}
                  />
                )}
              </div>

              {/* Step outputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                {TEST_STEPS.map((step, idx) => {
                  if (idx > currentStepIndex) return null;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'var(--qa-pass)',
                        fontSize: '0.86rem',
                      }}
                    >
                      <span>{step.text}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>({step.time})</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar and summary */}
              {currentStepIndex >= 0 && (
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span>
                      Running Playwright Suite ({currentStepIndex + 1}/{TEST_STEPS.length})
                    </span>
                    <span style={{ color: 'var(--qa-pass)', fontWeight: 600 }}>{progress}% Passed</span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      style={{
                        height: '100%',
                        backgroundColor: 'var(--qa-pass)',
                        boxShadow: '0 0 10px var(--qa-pass-glow)',
                        borderRadius: 3,
                      }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: 'easeOut', duration: 0.2 }}
                    />
                  </div>
                  {progress === 100 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        marginTop: '0.85rem',
                        fontSize: '0.84rem',
                        color: 'var(--qa-pass)',
                        fontWeight: 'bold',
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✓ 8 passed, 0 failed, 0 flaky · Test suite initialized successfully.
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

