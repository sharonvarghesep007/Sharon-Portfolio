import React from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SNIPPETS = [
  { text: "expect(page.locator('.checkout')).toBeVisible();", top: '15%', left: '8%', delay: '0s' },
  { text: "assert.strictEqual(defect.severity, 'High');", top: '28%', left: '78%', delay: '4s' },
  { text: "await test.step('Validate user cart', async () => {});", top: '42%', left: '5%', delay: '2s' },
  { text: "expect(response.status()).toBe(200);", top: '56%', left: '82%', delay: '6s' },
  { text: "const bug = stlc.triage({ state: 'Verified' });", top: '70%', left: '10%', delay: '3s' },
  { text: "expect(auth.isAuthenticated).toBeTruthy();", top: '85%', left: '75%', delay: '5s' },
];

export const AmbientBackground: React.FC = () => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {SNIPPETS.map((snippet, idx) => (
        <div
          key={idx}
          className="ambient-snippet"
          style={{
            position: 'absolute',
            top: snippet.top,
            left: snippet.left,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--qa-accent)',
            opacity: 0.12,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            animation: `drift 16s ease-in-out infinite alternate`,
            animationDelay: snippet.delay,
          }}
        >
          {snippet.text}
        </div>
      ))}

      <style>{`
        @keyframes drift {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(0.8deg);
          }
          100% {
            transform: translateY(12px) rotate(-0.8deg);
          }
        }
      `}</style>
    </div>
  );
};

