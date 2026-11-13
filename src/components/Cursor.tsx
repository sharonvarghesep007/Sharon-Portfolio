import React from 'react';
import { useMouse } from '../hooks/useMouse';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Cursor: React.FC = () => {
  const { x, y, isHovered, isVisible } = useMouse();
  const reducedMotion = useReducedMotion();

  if (reducedMotion || !isVisible) return null;

  return (
    <div
      className="custom-cursor-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9998,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Center dot/crosshair */}
      <div
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isHovered ? 'var(--qa-pass)' : 'var(--qa-accent)',
          transform: 'translate(-50%, -50%)',
          boxShadow: isHovered ? '0 0 10px var(--qa-pass)' : '0 0 8px var(--qa-accent)',
          transition: 'background-color 0.15s ease, transform 0.1s ease',
        }}
      />

      {/* Crosshair ring */}
      <div
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          borderRadius: '50%',
          border: isHovered ? '1.5px solid var(--qa-pass)' : '1px solid rgba(126, 162, 255, 0.45)',
          backgroundColor: isHovered ? 'rgba(62, 209, 168, 0.08)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Subtle QA Crosshair notches */}
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            width: '1px',
            height: '4px',
            backgroundColor: isHovered ? 'var(--qa-pass)' : 'rgba(126, 162, 255, 0.6)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '-4px',
            width: '1px',
            height: '4px',
            backgroundColor: isHovered ? 'var(--qa-pass)' : 'rgba(126, 162, 255, 0.6)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '-4px',
            width: '4px',
            height: '1px',
            backgroundColor: isHovered ? 'var(--qa-pass)' : 'rgba(126, 162, 255, 0.6)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            right: '-4px',
            width: '4px',
            height: '1px',
            backgroundColor: isHovered ? 'var(--qa-pass)' : 'rgba(126, 162, 255, 0.6)',
          }}
        />
      </div>
    </div>
  );
};

