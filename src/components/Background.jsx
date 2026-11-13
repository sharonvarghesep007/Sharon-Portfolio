import React from 'react';
import { profile, education, experience, achievements } from '../data.js';

export default function Background() {
  return (
    <section id="background" className="section-container" aria-labelledby="background-heading">
      <header className="section-header">
        <h2 id="background-heading" className="section-title">
          Background
        </h2>
        <p className="section-intro section-intro--body">
          {profile.backgroundIntro}
        </p>
      </header>

      <div className="background-cards-grid">
        {/* Education Card */}
        <article className="background-card" aria-labelledby="card-education-title">
          <div className="background-card-header">
            <h3 id="card-education-title" className="background-card-title">
              Education
            </h3>
          </div>
          <div className="background-card-body">
            <ul className="timeline-list">
              {education.map((item, idx) => (
                <li key={idx} className="timeline-item">
                  <div className="timeline-meta">
                    <span className="timeline-period">{item.period}</span>
                    {item.score && (
                      <span className="timeline-badge">Score: {item.score}</span>
                    )}
                  </div>
                  <h4 className="timeline-heading">{item.degree}</h4>
                  <p className="timeline-subtext">{item.institution}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Experience / GDSC Card */}
        <article className="background-card" aria-labelledby="card-gdsc-title">
          <div className="background-card-header">
            <h3 id="card-gdsc-title" className="background-card-title">
              Google Developer Student Clubs
            </h3>
          </div>
          <div className="background-card-body">
            <div className="timeline-meta">
              <span className="timeline-period">{experience.period}</span>
              <span className="timeline-badge">{experience.role}</span>
            </div>
            <h4 className="timeline-heading">{experience.organization}</h4>
            <ul className="card-bullet-list">
              {experience.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>
        </article>

        {/* Achievements Card */}
        <article className="background-card" aria-labelledby="card-achievements-title">
          <div className="background-card-header">
            <h3 id="card-achievements-title" className="background-card-title">
              Achievements
            </h3>
          </div>
          <div className="background-card-body">
            <ul className="achievements-list">
              {achievements.map((achievement, idx) => (
                <li key={idx} className="achievement-item">
                  <span className="achievement-icon" aria-hidden="true">
                    ★
                  </span>
                  <span className="achievement-text">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

