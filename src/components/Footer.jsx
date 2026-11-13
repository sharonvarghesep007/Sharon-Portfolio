import React from 'react';
import { profile } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <p className="footer-copyright">{profile.copyright}</p>
      </div>
    </footer>
  );
}

