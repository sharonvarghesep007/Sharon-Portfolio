import React from 'react';
import { profile } from '../data.js';

export default function Navbar() {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main navigation">
        <a href="#hero" className="navbar-brand">
          {profile.name}
        </a>
        <ul className="navbar-links">
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#background">Background</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

