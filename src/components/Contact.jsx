import React, { useState } from 'react';
import { profile } from '../data.js';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
    const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="section-container" aria-labelledby="contact-heading">
      <header className="section-header">
        <h2 id="contact-heading" className="section-title">
          Contact
        </h2>
        <p className="section-intro">{profile.contactIntro}</p>
      </header>

      <div className="contact-grid">
        {/* Left Column: Direct Contact Links */}
        <div className="contact-links-col">
          <div className="contact-cards-stack">
            <a
              href={`mailto:${profile.email}`}
              className="contact-card-link"
              aria-label={`Send email to ${profile.email}`}
            >
              <div className="contact-card-icon" aria-hidden="true">
                ✉
              </div>
              <div className="contact-card-text">
                <span className="contact-card-label">Email</span>
                <span className="contact-card-value">{profile.email}</span>
              </div>
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="contact-card-link"
              aria-label={`Call ${profile.phone}`}
            >
              <div className="contact-card-icon" aria-hidden="true">
                ✆
              </div>
              <div className="contact-card-text">
                <span className="contact-card-label">Phone</span>
                <span className="contact-card-value">{profile.phone}</span>
              </div>
            </a>

            <a
              href={profile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-link"
              aria-label={`Open LinkedIn profile for ${profile.linkedInHandle} in a new tab`}
            >
              <div className="contact-card-icon" aria-hidden="true">
                ↗
              </div>
              <div className="contact-card-text">
                <span className="contact-card-label">LinkedIn</span>
                <span className="contact-card-value">linkedin.com/in/{profile.linkedInHandle}</span>
              </div>
            </a>
          </div>

          <p className="contact-location-note">{profile.contactNote}</p>
        </div>

        {/* Right Column: Controlled Form */}
        <div className="contact-form-col">
          <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="form-input"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="form-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                className="form-textarea"
                placeholder="Tell me about your project or QA requirements…"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="form-submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

