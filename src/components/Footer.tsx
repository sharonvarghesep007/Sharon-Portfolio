import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface FooterProps {
  swarmTriggeredCount: number;
}

interface SwarmBug {
  id: number;
  startX: number;
  startY: number;
  destX: number;
  destY: number;
  angle: number;
}

export const Footer: React.FC<FooterProps> = ({ swarmTriggeredCount }) => {
  const reducedMotion = useReducedMotion();
  const [swarmActive, setSwarmActive] = useState(false);
  const [bugs, setBugs] = useState<SwarmBug[]>([]);

  // Trigger from logo clicks (5 times)
  useEffect(() => {
    if (swarmTriggeredCount > 0 && swarmTriggeredCount % 5 === 0) {
      launchSwarm();
    }
  }, [swarmTriggeredCount]);

  // Global key listener for 'b', 'u', 'g'
  useEffect(() => {
    let keyBuffer = '';
    const handleKey = (e: KeyboardEvent) => {
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 5) keyBuffer = keyBuffer.slice(-5);
      if (keyBuffer.endsWith('bug')) {
        launchSwarm();
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const launchSwarm = () => {
    if (reducedMotion || swarmActive) return;

    const newBugs: SwarmBug[] = [];
    for (let i = 0; i < 35; i++) {
      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight + 50;
      const destX = Math.random() * window.innerWidth;
      const destY = -60 - Math.random() * 200;
      const angle = Math.atan2(destY - startY, destX - startX) * (180 / Math.PI) + 90;

      newBugs.push({
        id: i,
        startX,
        startY,
        destX,
        destY,
        angle,
      });
    }

    setBugs(newBugs);
    setSwarmActive(true);

    setTimeout(() => {
      setSwarmActive(false);
    }, 4200);
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '3rem 1.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.25rem',
        }}
      >
        {/* Brand & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
            Sharon Varghese P · The Test Lab
          </span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <span style={{ color: 'var(--qa-pass)' }}>● ALL 8 SUITES PASSING</span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <span style={{ color: 'var(--qa-accent)' }}>ZERO REGRESSION DEFECTS</span>
        </div>

        {/* Easter Egg Trigger Hint */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            Easter Egg: Type &quot;bug&quot; anywhere or click the logo 5 times.
          </span>
          <button
            onClick={launchSwarm}
            style={{
              fontSize: '0.72rem',
              color: 'var(--qa-fail)',
              border: '1px dashed var(--qa-fail)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.15rem 0.5rem',
              background: 'var(--qa-fail-bg)',
              cursor: 'pointer',
            }}
            title="Trigger easter egg bug swarm directly"
          >
            🐛 Trigger Swarm
          </button>
        </div>

        {/* Technical Stack Credits */}
        <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
          Built with React 18, TypeScript, Vite, Framer Motion &amp; Canvas 2D. Optimized for 60fps &amp; AA Accessibility.
        </div>
      </div>

      {/* Harmless Bug Swarm Easter Egg Overlay */}
      <AnimatePresence>
        {swarmActive && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 99999,
              overflow: 'hidden',
            }}
          >
            {/* Funny Alert Banner */}
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 20, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--qa-fail)',
                color: '#0b1020',
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 8px 30px rgba(255, 93, 108, 0.6)',
                zIndex: 100000,
              }}
            >
              ⚠️ DEFECT SWARM DETECTED! 35 BUGS ESCAPED QA TRIAGE!
            </motion.div>

            {/* Bugs scurrying up across screen */}
            {bugs.map((bug) => (
              <motion.div
                key={bug.id}
                initial={{
                  x: bug.startX,
                  y: bug.startY,
                  opacity: 0,
                }}
                animate={{
                  x: bug.destX,
                  y: bug.destY,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 1.2,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  transform: `rotate(${bug.angle}deg)`,
                }}
              >
                <span style={{ fontSize: '1.6rem', filter: 'drop-shadow(0 0 6px rgba(255, 93, 108, 0.6))' }}>
                  🐛
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

