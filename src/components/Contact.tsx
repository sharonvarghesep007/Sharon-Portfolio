import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resume } from '../data/resume';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Contact: React.FC = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2200);
  };

  return (
    <section id="contact" className="section-wrapper" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <div className="section-tag">Stage 08 · Triage & Contact</div>
          <h2 className="section-title">
            <span>Get In Touch / Hire Sharon</span>
            <span className="badge-pass">READY FOR HIRE</span>
          </h2>
          <p className="section-subtitle">
            Initiate communication, request a manual test suite review, or discuss QA opportunities.
          </p>
        </div>

        {/* Terminal Contact Window */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="glass-card"
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            padding: 0,
            overflow: 'hidden',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {/* Terminal Window Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 1.5rem',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
              <span
                style={{
                  marginLeft: '0.75rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                }}
              >
                triage-candidate.sh · bash
              </span>
            </div>
            <span className="badge-pass">ONLINE</span>
          </div>

          {/* Terminal Body */}
          <div style={{ padding: '2rem' }}>
            {/* Command Header */}
            <div style={{ marginBottom: '1.75rem', fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--qa-pass)', fontWeight: 700 }}>qa-recruiter@enterprise:~$ </span>
              <span style={{ color: 'var(--text-primary)' }}>./triage_candidate --name=&quot;{resume.name}&quot;</span>
            </div>

            {/* Structured Contact Rows */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '2rem',
              }}
            >
              {/* Email Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>PRIMARY EMAIL:</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600 }}>
                    {resume.email}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => copyToClipboard(resume.email, 'email')}
                    style={{
                      fontSize: '0.78rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-card)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: copiedItem === 'email' ? 'var(--qa-pass)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.15s',
                    }}
                    title="Copy email to clipboard"
                  >
                    <span>{copiedItem === 'email' ? '✓' : '📋'}</span>
                    <span>{copiedItem === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={`mailto:${resume.email}`}
                    className="btn-primary"
                    style={{
                      fontSize: '0.78rem',
                      padding: '0.35rem 0.85rem',
                    }}
                  >
                    Open Mailer →
                  </a>
                </div>
              </div>

              {/* Phone Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>PHONE / WHATSAPP:</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600 }}>
                    {resume.phone}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => copyToClipboard(resume.phone, 'phone')}
                    style={{
                      fontSize: '0.78rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-card)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: copiedItem === 'phone' ? 'var(--qa-pass)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                    title="Copy phone to clipboard"
                  >
                    <span>{copiedItem === 'phone' ? '✓' : '📋'}</span>
                    <span>{copiedItem === 'phone' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={`tel:${resume.phone}`}
                    className="btn-secondary"
                    style={{
                      fontSize: '0.78rem',
                      padding: '0.35rem 0.85rem',
                    }}
                  >
                    Call Now ☎
                  </a>
                </div>
              </div>

              {/* Location Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>RESIDENCE & GEO BASE:</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {resume.location}, Kerala, India
                  </div>
                </div>
                <span className="badge-accent">OPEN TO RELOCATE / HYBRID</span>
              </div>
            </div>

            {/* Social / Portfolio Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: '0.88rem', padding: '0.65rem 1.4rem' }}
              >
                <span>🔗</span>
                <span>LinkedIn / sharonvarghesep</span>
              </a>

              <a
                href={resume.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: '0.88rem', padding: '0.65rem 1.4rem' }}
              >
                <span>🐙</span>
                <span>GitHub / Sharon-github-profile</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copy Toast Pop-up */}
      <AnimatePresence>
        {copiedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              backgroundColor: 'var(--qa-pass)',
              color: '#0b1020',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.88rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 8px 24px rgba(62, 209, 168, 0.4)',
              zIndex: 9999,
            }}
          >
            ✓ {copiedItem === 'email' ? 'Email' : 'Phone'} copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

