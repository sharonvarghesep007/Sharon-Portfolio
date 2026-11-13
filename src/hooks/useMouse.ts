import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
  isHovered: boolean;
  isVisible: boolean;
}

export function useMouse() {
  const [mouse, setMouse] = useState<MousePosition>({
    x: -100,
    y: -100,
    isHovered: false,
    isVisible: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only enable if pointer: fine (desktop mice)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    let rafId: number | null = null;
    let currentX = -100;
    let currentY = -100;
    let hovering = false;
    let visible = false;

    const onMouseMove = (e: MouseEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;
      visible = true;

      const target = e.target as HTMLElement | null;
      hovering = Boolean(
        target?.closest('button, a, input, [role="button"], .clickable, .skill-chip, .game-bug')
      );

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMouse({
            x: currentX,
            y: currentY,
            isHovered: hovering,
            isVisible: visible,
          });
          rafId = null;
        });
      }
    };

    const onMouseLeave = () => {
      visible = false;
      setMouse((prev) => ({ ...prev, isVisible: false }));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return mouse;
}

