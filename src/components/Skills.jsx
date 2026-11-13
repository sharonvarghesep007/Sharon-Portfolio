import React, { useState } from 'react';
import { skills } from '../data.js';

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ['All', ...skills.groups.map((group) => group.name)];

  const displayedGroups =
    selectedFilter === 'All'
      ? skills.groups
      : skills.groups.filter((group) => group.name === selectedFilter);

  return (
    <section id="skills" className="section-container" aria-labelledby="skills-heading">
      <header className="section-header">
        <h2 id="skills-heading" className="section-title">
          Skills
        </h2>
        <p className="section-intro">{skills.intro}</p>
      </header>

      <div className="filter-chips-container" role="toolbar" aria-label="Skill group filters">
        {filterOptions.map((option) => {
          const isActive = selectedFilter === option;
          return (
            <button
              key={option}
              type="button"
              className={`filter-chip ${isActive ? 'filter-chip--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setSelectedFilter(option)}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="skills-content-wrapper">
        {displayedGroups.map((group) => (
          <div key={group.id} className="skill-group-block">
            <h3 className="skill-group-title">{group.name}</h3>
            <div className="skill-tiles-grid" role="list">
              {group.items.map((skillItem) => (
                <div key={skillItem} className="skill-tile" role="listitem">
                  <span className="skill-tile-bullet" aria-hidden="true" />
                  <span className="skill-tile-name">{skillItem}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

