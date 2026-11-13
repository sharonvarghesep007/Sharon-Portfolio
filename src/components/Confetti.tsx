import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ConfettiProps {
  trigger: boolean;
}

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  shape: 'rect' | 'circle';
}

export const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!trigger || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const colors = ['#3ed1a8', '#f2b441', '#7ea2ff', '#ff5d6c', '#ffffff'];
    const particles: ConfettiParticle[] = [];

    for (let i = 0; i < 65; i++) {
      const angle = Math.random() * Math.PI - Math.PI / 2; // upwards spread
      const speed = Math.random() * 8 + 4;
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 80,
        y: height - 20,
        vx: Math.sin(angle) * speed,
        vy: -Math.abs(Math.cos(angle) * speed),
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        shape: Math.random() < 0.5 ? 'rect' : 'circle',
      });
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.rotSpeed;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      });

      if (alive) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [trigger, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={320}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 10,
        maxWidth: '100%',
      }}
      aria-hidden="true"
    />
  );
};

