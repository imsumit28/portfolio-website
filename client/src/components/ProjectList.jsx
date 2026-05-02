import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects = [], loading = false }) => {
  const [selectedTech, setSelectedTech] = useState(null);

  if (loading) {
    return null;
  }

  if (!projects.length) {
    return <p className="text-center text-secondary">No projects found.</p>;
  }

  // Get all unique technologies for filter
  const allTechs = [...new Set(projects.flatMap(p => p.tech || []))].sort();

  // Filter projects based on selected tech
  const filteredProjects = selectedTech
    ? projects.filter(p => (p.tech || []).includes(selectedTech))
    : projects;

  return (
    <div className="projects-container">
      {/* Tech Filter */}
      {allTechs.length > 0 && (
        <div className="projects-filter-section mb-5">
          <div className="projects-filter-label">Filter by tech:</div>
          <div className="projects-filter-tags">
            <button
              className={`filter-tag ${!selectedTech ? 'active' : ''}`}
              onClick={() => setSelectedTech(null)}
            >
              All
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                className={`filter-tag ${selectedTech === tech ? 'active' : ''}`}
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Projects Showcase */}
      <div className="projects-showcase">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, i) => (
            <ProjectCard
              key={project._id || `${project.title}-${i}`}
              {...project}
              index={i}
            />
          ))
        ) : (
          <p className="text-center text-secondary" style={{ padding: '2rem' }}>
            No projects found with {selectedTech}
          </p>
        )}
      </div>

    </div>
  );
};

export default React.memo(ProjectList);
