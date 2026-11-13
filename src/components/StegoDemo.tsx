import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const StegoDemo: React.FC = () => {
  const [secretText, setSecretText] = useState('PASS_TOKEN_2026');
  const [isEmbedded, setIsEmbedded] = useState(true);
  const [hoveredPixel, setHoveredPixel] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  // Draw pixel grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = 12;
    const rows = 6;
    const pixelSize = canvas.width / cols;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        const charCode = index < secretText.length ? secretText.charCodeAt(index) : 0;
        const hasBit = isEmbedded && charCode > 0;

        // Base color
        const baseR = 15 + (c * 6);
        const baseG = 25 + (r * 12);
        const baseB = 45 + (c * 8);

        // If embedded, modify LSB
        const finalR = hasBit ? (baseR ^ (charCode & 1)) : baseR;
        const finalG = hasBit ? (baseG ^ ((charCode >> 1) & 1)) : baseG;
        const finalB = hasBit ? (baseB ^ ((charCode >> 2) & 1)) : baseB;

        ctx.fillStyle = `rgb(${finalR}, ${finalG}, ${finalB})`;
        ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize - 1.5, pixelSize - 1.5);

        // Highlight hovered or embedded bit
        if (hoveredPixel === index) {
          ctx.strokeStyle = '#3ed1a8';
          ctx.lineWidth = 2;
          ctx.strokeRect(c * pixelSize, r * pixelSize, pixelSize - 1.5, pixelSize - 1.5);
        } else if (hasBit && !reducedMotion) {
          // Micro glow on hidden payload pixels
          ctx.fillStyle = 'rgba(62, 209, 168, 0.2)';
          ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize - 1.5, pixelSize - 1.5);
        }
      }
    }
  }, [secretText, isEmbedded, hoveredPixel, reducedMotion]);

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        padding: '1.25rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--qa-pass)' }}>●</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>LSB Pixel Matrix Steganography Visualizer</span>
        </div>
        <button
          onClick={() => setIsEmbedded(!isEmbedded)}
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: isEmbedded ? '1px solid var(--qa-pass)' : '1px solid var(--border-card)',
            backgroundColor: isEmbedded ? 'var(--qa-pass-bg)' : 'transparent',
            color: isEmbedded ? 'var(--qa-pass)' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          {isEmbedded ? '✓ LSB Payload Active' : '○ Clean Cover Image'}
        </button>
      </div>

      {/* Secret Input Control */}
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <label
          htmlFor="stego-input"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          Secret Payload:
        </label>
        <input
          id="stego-input"
          type="text"
          value={secretText}
          onChange={(e) => setSecretText(e.target.value)}
          maxLength={18}
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.35rem 0.75rem',
            color: 'var(--qa-pass)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            outline: 'none',
          }}
          placeholder="Enter secret text..."
        />
      </div>

      {/* Canvas Pixel Visualizer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <canvas
          ref={canvasRef}
          width={480}
          height={160}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            cursor: 'crosshair',
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const col = Math.floor(x * 12);
            const row = Math.floor(y * 6);
            setHoveredPixel(row * 12 + col);
          }}
          onMouseLeave={() => setHoveredPixel(null)}
        />
      </div>

      {/* Footer Info */}
      <div
        style={{
          marginTop: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <span>
          Bit Modulation: <strong>Least Significant Bit (LSB ±1)</strong>
        </span>
        <span style={{ color: 'var(--qa-pass)' }}>
          Imperceptible Variance: &Delta;E &lt; 0.4 · Undetectable
        </span>
      </div>
    </div>
  );
};

