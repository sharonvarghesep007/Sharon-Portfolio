import React, { useState, useEffect } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const docElement = document.documentElement;
          const totalHeight = docElement.scrollHeight - docElement.clientHeight;
          if (totalHeight > 0) {
            const current = (window.scrollY / totalHeight) * 100;
            setScrollPercentage(Math.min(100, Math.max(0, current)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        zIndex: 1000,
      }}
      role="progressbar"
      aria-valuenow={Math.round(scrollPercentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Portfolio test suite scroll progress"
    >
      <div
        style={{
          width: `${scrollPercentage}%`,
          height: '100%',
          backgroundColor: 'var(--qa-pass)',
          boxShadow: '0 0 10px var(--qa-pass-glow), 0 0 20px var(--qa-pass)',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
};

