import React from 'react';
import { profile } from '../data.js';

export default function Hero() {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-container">
        <div className="hero-content">
          <h1 id="hero-heading" className="hero-name">
            {profile.name}
          </h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-tagline">{profile.tagline}</p>
        </div>

        <div className="hero-card-col">
          <aside className="profile-card" aria-label="Professional summary card">
            <div className="profile-header">
              <div className="profile-avatar" aria-hidden="true">
                {profile.initials}
              </div>
              <div className="profile-heading">
                <h2 className="profile-name">{profile.name}</h2>
                <span className="profile-badge">{profile.title}</span>
              </div>
            </div>

            <dl className="profile-details">
              <div className="profile-item">
                <dt className="profile-label">Focus</dt>
                <dd className="profile-value">{profile.focus}</dd>
              </div>
              <div className="profile-item">
                <dt className="profile-label">Education</dt>
                <dd className="profile-value">{profile.educationSummary}</dd>
              </div>
              <div className="profile-item">
                <dt className="profile-label">Location</dt>
                <dd className="profile-value">{profile.locationShort}</dd>
              </div>
              <div className="profile-item">
                <dt className="profile-label">Email</dt>
                <dd className="profile-value">
                  <a href={`mailto:${profile.email}`} className="profile-email-link">
                    {profile.email}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

