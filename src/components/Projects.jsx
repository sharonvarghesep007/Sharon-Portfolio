import React, { useState } from 'react';
import { projects } from '../data.js';

export default function Projects() {
  const [expandedTestTypes, setExpandedTestTypes] = useState(false);

  return (
    <section id="projects" className="section-container" aria-labelledby="projects-heading">
      <header className="section-header">
        <h2 id="projects-heading" className="section-title">
          Projects
        </h2>
        <p className="section-intro">{projects.intro}</p>
      </header>

      <div className="projects-grid">
        {projects.items.map((project) => {
          const isPrestaShop = project.id === 'prestashop';

          return (
            <article
              key={project.id}
              className={`project-card ${isPrestaShop ? 'project-card--accent' : 'project-card--pass'}`}
            >
              <div className="project-card-header">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>
                <span className="project-tag">{project.tag}</span>
              </div>

              <ul className="project-bullets">
                {project.highlights.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>

              {project.workflows && (
                <div className="project-workflow-block">
                  <h4 className="workflow-title">Workflows tested</h4>
                  <div className="workflow-flow" aria-label="Testing sequence flow">
                    {project.workflows.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="workflow-step">{step}</span>
                        {idx < project.workflows.length - 1 && (
                          <span className="workflow-arrow" aria-hidden="true">
                            →
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {project.testCoverage && (
                <div className="project-coverage-wrapper">
                  <button
                    type="button"
                    className="coverage-toggle-btn"
                    onClick={() => setExpandedTestTypes(!expandedTestTypes)}
                    aria-expanded={expandedTestTypes}
                    aria-controls="coverage-details"
                  >
                    <span>{expandedTestTypes ? 'Hide test types covered' : 'Expand test types I covered'}</span>
                    <span className="toggle-indicator" aria-hidden="true">
                      {expandedTestTypes ? '−' : '+'}
                    </span>
                  </button>

                  {expandedTestTypes && (
                    <div id="coverage-details" className="coverage-panel">
                      <div className="coverage-bars-list">
                        {project.testCoverage.areas.map((areaItem) => (
                          <div key={areaItem.area} className="coverage-bar-group">
                            <div className="coverage-bar-meta">
                              <span className="coverage-area-name">{areaItem.area}</span>
                              <span className="coverage-types-list">
                                {areaItem.testTypes.join(' • ')}
                              </span>
                            </div>
                            <div
                              className="coverage-bar-track"
                              role="progressbar"
                              aria-valuenow={areaItem.level}
                              aria-valuemin="0"
                              aria-valuemax="100"
                              aria-label={`Coverage breadth for ${areaItem.area}`}
                            >
                              <div
                                className="coverage-bar-fill"
                                style={{ width: `${areaItem.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="coverage-footnote">
                        Note: {project.testCoverage.note}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

