import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestRunnerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TestCase {
  id: number;
  name: string;
  duration: string;
  status: 'idle' | 'running' | 'passed';
}

const INITIAL_TESTS: TestCase[] = [
  { id: 1, name: "Profile & Identity verification (Sharon Varghese P)", duration: '12ms', status: 'idle' },
  { id: 2, name: "Manual & Functional Test Scenario Matrix", duration: '28ms', status: 'idle' },
  { id: 3, name: "Playwright Automation Suite (TypeScript / E2E)", duration: '45ms', status: 'idle' },
  { id: 4, name: "Defect Life Cycle compliance (New → Closed)", duration: '18ms', status: 'idle' },
  { id: 5, name: "PrestaShop E-Commerce 7 Workflows (Cart, Checkout)", duration: '34ms', status: 'idle' },
  { id: 6, name: "InvisData Image Steganography covert bit checks", duration: '22ms', status: 'idle' },
  { id: 7, name: "Regression, Smoke, Sanity & Boundary Value Analysis", duration: '31ms', status: 'idle' },
  { id: 8, name: "Candidate Hire Readiness (Software Tester / QA)", duration: '14ms', status: 'idle' },
];

export const TestRunner: React.FC<TestRunnerProps> = ({ isOpen, onClose }) => {
  const [tests, setTests] = useState<TestCase[]>(INITIAL_TESTS);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      runSuite();
    } else {
      setTests(INITIAL_TESTS);
      setIsRunning(false);
      setCompleted(false);
    }
  }, [isOpen]);

  const runSuite = () => {
    setIsRunning(true);
    setCompleted(false);
    setTests(INITIAL_TESTS);

    let current = 0;
    const interval = setInterval(() => {
      if (current < INITIAL_TESTS.length) {
        const testIndex = current;
        // set current running
        setTests((prev) =>
          prev.map((t, idx) => (idx === testIndex ? { ...t, status: 'running' } : t))
        );

        setTimeout(() => {
          setTests((prev) =>
            prev.map((t, idx) => (idx === testIndex ? { ...t, status: 'passed' } : t))
          );
        }, 180);

        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setCompleted(true);
        }, 300);
      }
    }, 240);
  };

  const passedCount = tests.filter((t) => t.status === 'passed').length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '720px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--qa-pass-bg)',
                    color: 'var(--qa-pass)',
                    fontSize: '0.85rem',
                  }}
                >
                  ⚡
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    Playwright Interactive Test Suite
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    sharon-test-runner.spec.ts · Chrome Chromium Headless
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={runSuite}
                  disabled={isRunning}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--qa-pass)',
                    backgroundColor: 'var(--qa-pass-bg)',
                    color: 'var(--qa-pass)',
                    fontSize: '0.78rem',
                    cursor: isRunning ? 'not-allowed' : 'pointer',
                    opacity: isRunning ? 0.6 : 1,
                  }}
                >
                  {isRunning ? 'Running...' : '↺ Re-run'}
                </button>
                <button
                  onClick={onClose}
                  style={{
                    color: 'var(--text-muted)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                  aria-label="Close Test Runner modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Test List */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                maxHeight: '400px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              {tests.map((test) => {
                const isPassed = test.status === 'passed';
                const isCurrent = test.status === 'running';

                return (
                  <motion.div
                    key={test.id}
                    layout
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.9rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isCurrent
                        ? 'rgba(126, 162, 255, 0.12)'
                        : isPassed
                        ? 'rgba(62, 209, 168, 0.06)'
                        : 'rgba(255, 255, 255, 0.02)',
                      border: isCurrent
                        ? '1px solid var(--qa-accent)'
                        : isPassed
                        ? '1px solid rgba(62, 209, 168, 0.25)'
                        : '1px solid var(--border-subtle)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.95rem' }}>
                        {isPassed ? (
                          <span style={{ color: 'var(--qa-pass)' }}>✓</span>
                        ) : isCurrent ? (
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            style={{ display: 'inline-block', color: 'var(--qa-accent)' }}
                          >
                            ⏳
                          </motion.span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>○</span>
                        )}
                      </span>
                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: isPassed
                            ? 'var(--text-primary)'
                            : isCurrent
                            ? 'var(--qa-accent)'
                            : 'var(--text-muted)',
                          fontWeight: isPassed || isCurrent ? 500 : 400,
                        }}
                      >
                        {test.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: isPassed ? 'var(--qa-pass)' : 'var(--text-muted)',
                        }}
                      >
                        {isPassed ? `${test.duration}` : isCurrent ? 'evaluating...' : 'queued'}
                      </span>
                      {isPassed && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            padding: '0.15rem 0.4rem',
                            borderRadius: '4px',
                            backgroundColor: 'var(--qa-pass-bg)',
                            color: 'var(--qa-pass)',
                            border: '1px solid rgba(62, 209, 168, 0.3)',
                          }}
                        >
                          PASS
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Summary */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--qa-pass)', fontWeight: 700 }}>
                  {passedCount}/{tests.length} passing
                </span>
                <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>·</span>
                <span style={{ color: 'var(--text-muted)' }}>0 failed</span>
                <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>·</span>
                <span style={{ color: 'var(--qa-accent)' }}>100% QA readiness</span>
              </div>

              {completed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    backgroundColor: 'var(--qa-pass-bg)',
                    color: 'var(--qa-pass)',
                    border: '1px solid var(--qa-pass)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  STATUS: HIRED CANDIDATE VERIFIED 🎯
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

