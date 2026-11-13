import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Bug {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  squashed: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

const TOAST_MESSAGES = [
  'Defect logged. Severity: High 🐛',
  'NullPointerException squashed! 🪲',
  'Heisenbug eliminated! 🎯',
  'AssertionError resolved ✨',
  'Flaky test stabilized 🛠️',
  'Boundary condition handled 🛡️',
  'Regression defect caught in production! 🔍',
];

export const BugGame: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [squashedCount, setSquashedCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nextIdRef = useRef(1);

  // Responsive & reduced motion check
  useEffect(() => {
    if (reducedMotion || window.innerWidth < 768) {
      setIsEnabled(false);
      return;
    }
  }, [reducedMotion]);

  // Bug spawning and movement loop
  useEffect(() => {
    if (!isEnabled) return;

    // Initial bugs
    const initialBugs: Bug[] = [];
    for (let i = 0; i < 4; i++) {
      initialBugs.push({
        id: nextIdRef.current++,
        x: Math.random() * (window.innerWidth - 120) + 60,
        y: Math.random() * 450 + 80,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        angle: 0,
        squashed: false,
      });
    }
    setBugs(initialBugs);

    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      // Pause if tab is hidden
      if (document.hidden) {
        lastTime = time;
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      setBugs((prevBugs) => {
        // Keep active bugs capped at 5
        const activeBugs = prevBugs.filter((b) => !b.squashed);
        if (activeBugs.length < 4 && Math.random() < 0.02) {
          activeBugs.push({
            id: nextIdRef.current++,
            x: Math.random() < 0.5 ? 20 : window.innerWidth - 60,
            y: Math.random() * 450 + 80,
            vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8,
            angle: 0,
            squashed: false,
          });
        }

        return activeBugs.map((bug) => {
          let nx = bug.x + bug.vx;
          let ny = bug.y + bug.vy;
          let nvx = bug.vx;
          let nvy = bug.vy;

          // Jitter direction randomly
          if (Math.random() < 0.03) {
            nvx += (Math.random() - 0.5) * 0.8;
            nvy += (Math.random() - 0.5) * 0.8;
            // Clamp speed
            const speed = Math.hypot(nvx, nvy);
            if (speed > 2.2) {
              nvx = (nvx / speed) * 2.2;
              nvy = (nvy / speed) * 2.2;
            }
          }

          // Bounds bounce
          const boundsW = window.innerWidth - 50;
          const boundsH = 550;
          if (nx < 30 || nx > boundsW) {
            nvx = -nvx;
            nx = Math.max(30, Math.min(boundsW, nx));
          }
          if (ny < 60 || ny > boundsH) {
            nvy = -nvy;
            ny = Math.max(60, Math.min(boundsH, ny));
          }

          const angle = Math.atan2(nvy, nvx) * (180 / Math.PI) + 90;

          return {
            ...bug,
            x: nx,
            y: ny,
            vx: nvx,
            vy: nvy,
            angle,
          };
        });
      });

      // Update particle canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.02);
          particlesRef.current.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha *= 0.92;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.globalAlpha = 1;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  // Adjust canvas size to window
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = 650;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const squashBug = (bug: Bug, e: React.MouseEvent) => {
    e.stopPropagation();

    // Spawn splat particles
    const colors = ['#ff5d6c', '#3ed1a8', '#f2b441', '#ffffff'];
    for (let i = 0; i < 24; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particlesRef.current.push({
        x: bug.x + 14,
        y: bug.y + 14,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 2,
      });
    }

    setSquashedCount((prev) => prev + 1);
    setBugs((prev) => prev.filter((b) => b.id !== bug.id));

    // Show toast message
    const msg = TOAST_MESSAGES[Math.floor(Math.random() * TOAST_MESSAGES.length)];
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  if (!isEnabled) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '650px',
        pointerEvents: 'none',
        zIndex: 20,
        overflow: 'hidden',
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 21,
        }}
      />

      {/* Floating Counter Badge */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          right: '2rem',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-full)',
          padding: '0.4rem 0.9rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          boxShadow: 'var(--shadow-sm)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 25,
        }}
      >
        <span style={{ color: 'var(--qa-fail)', fontSize: '0.9rem' }}>🐛</span>
        <span style={{ color: 'var(--text-secondary)' }}>Bugs squashed:</span>
        <span style={{ color: 'var(--qa-pass)', fontWeight: 700 }}>{squashedCount}</span>
      </div>

      {/* Witty Toast */}
      {toast && (
        <div
          style={{
            position: 'absolute',
            top: '125px',
            right: '2rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--qa-fail)',
            borderRadius: 'var(--radius-md)',
            padding: '0.55rem 1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            color: 'var(--text-primary)',
            boxShadow: '0 8px 24px rgba(255, 93, 108, 0.25)',
            zIndex: 30,
            animation: 'fadeInUp 0.25s ease-out',
          }}
        >
          {toast}
        </div>
      )}

      {/* Crawling Bugs */}
      {bugs.map((bug) => (
        <button
          key={bug.id}
          onClick={(e) => squashBug(bug, e)}
          style={{
            position: 'absolute',
            left: `${bug.x}px`,
            top: `${bug.y}px`,
            transform: `translate(-50%, -50%) rotate(${bug.angle}deg)`,
            width: '28px',
            height: '28px',
            border: 'none',
            background: 'none',
            cursor: 'crosshair',
            pointerEvents: 'auto',
            padding: 0,
            zIndex: 22,
            transition: 'opacity 0.15s ease',
          }}
          className="game-bug"
          aria-label="Squash bug"
          title="Click to squash this bug!"
        >
          {/* Detailed SVG Bug */}
          <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
            {/* Legs */}
            <path
              d="M8 10L3 7M24 10L29 7M7 16L2 16M25 16L30 16M8 22L3 25M24 22L29 25"
              stroke="var(--qa-fail)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Antennae */}
            <path d="M13 7L10 3M19 7L22 3" stroke="var(--qa-fail)" strokeWidth="1.8" strokeLinecap="round" />
            {/* Body */}
            <ellipse cx="16" cy="18" rx="6.5" ry="8.5" fill="var(--qa-fail)" />
            {/* Head */}
            <circle cx="16" cy="9" r="4.5" fill="var(--qa-fail)" />
            {/* Eyes */}
            <circle cx="14" cy="8" r="1.2" fill="#ffffff" />
            <circle cx="18" cy="8" r="1.2" fill="#ffffff" />
            {/* Shell slit */}
            <line x1="16" y1="13" x2="16" y2="24" stroke="var(--bg-primary)" strokeWidth="1.5" />
          </svg>
        </button>
      ))}
    </div>
  );
};

