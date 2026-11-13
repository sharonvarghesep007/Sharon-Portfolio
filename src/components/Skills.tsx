import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resume } from '../data/resume';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SkillItem {
  name: string;
  category: string;
  isPrimary?: boolean;
}

export const Skills: React.FC = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Object.keys(resume.skills)];

  // Flatten all skills with category
  const allSkills: SkillItem[] = [];
  Object.entries(resume.skills).forEach(([cat, list]) => {
    list.forEach((name) => {
      allSkills.push({
        name,
        category: cat,
        isPrimary: name === 'Playwright' || name === 'TypeScript',
      });
    });
  });

  const filteredSkills =
    selectedCategory === 'All'
      ? allSkills
      : allSkills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="section-wrapper" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <div className="section-tag">Stage 03 · Quality Assurance Matrix</div>
          <h2 className="section-title">
            <span>Skills & Assertions Matrix</span>
            <span className="badge-pass">ALL PASSING</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive verification matrix of testing methodologies, automation suites, and defect governance.
          </p>
        </div>

        {/* Filter Chips Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
          role="tablist"
          aria-label="Skill categories filter"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isSelected ? 'var(--qa-pass)' : 'var(--bg-secondary)',
                  color: isSelected ? '#0b1020' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--qa-pass)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? '0 0 14px var(--qa-pass-glow)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                role="tab"
                aria-selected={isSelected}
              >
                {isSelected && <span style={{ marginRight: '0.35rem' }}>✓</span>}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid with 3D Tilt on Hover and Shine Sweep */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <TiltSkillCard
                key={skill.name}
                skill={skill}
                index={index}
                reducedMotion={reducedMotion}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

interface TiltSkillCardProps {
  skill: SkillItem;
  index: number;
  reducedMotion: boolean;
  isInView: boolean;
}

const TiltSkillCard: React.FC<TiltSkillCardProps> = ({
  skill,
  index,
  reducedMotion,
  isInView,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, hovering: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -10;
    const ry = ((x - centerX) / centerX) * 10;
    const mx = (x / rect.width) * 100;
    const my = (y / rect.height) * 100;

    requestAnimationFrame(() => {
      setTilt({ rx, ry, mx, my, hovering: true });
    });
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50, hovering: false });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: reducedMotion ? 0 : Math.min(index * 0.03, 0.4) }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <div
        className="glass-card skill-card"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: tilt.hovering ? 'transform 0.05s ease-out' : 'transform 0.35s ease',
          transformStyle: 'preserve-3d',
          padding: '1.25rem 1.4rem',
          position: 'relative',
          border: skill.isPrimary
            ? '1.5px solid var(--qa-pass)'
            : '1px solid var(--border-card)',
          boxShadow: skill.isPrimary
            ? '0 0 16px var(--qa-pass-glow)'
            : tilt.hovering
            ? '0 12px 24px rgba(0, 0, 0, 0.4)'
            : 'none',
        }}
      >
        {/* Shine Sweep Overlay */}
        {tilt.hovering && !reducedMotion && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255, 255, 255, 0.12), transparent 70%)`,
              pointerEvents: 'none',
              borderRadius: 'inherit',
            }}
          />
        )}

        {/* Top Assertion Line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
            marginBottom: '0.65rem',
          }}
        >
          <span>assert.hasSkill()</span>
          <span
            style={{
              color: 'var(--qa-pass)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            ✓ PASS
          </span>
        </div>

        {/* Skill Title */}
        <div
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: skill.isPrimary ? 'var(--qa-pass)' : 'var(--text-primary)',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {skill.name}
          {skill.isPrimary && (
            <span
              style={{
                fontSize: '0.65rem',
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--qa-pass-bg)',
                color: 'var(--qa-pass)',
                border: '1px solid var(--qa-pass)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              PRIMARY
            </span>
          )}
        </div>

        {/* Category Tag */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
          }}
        >
          category: <span style={{ color: 'var(--qa-accent)' }}>{skill.category}</span>
        </div>
      </div>
    </motion.div>
  );
};

