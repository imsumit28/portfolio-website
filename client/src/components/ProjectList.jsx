import React, { useState } from 'react';
import ProjectModal from './ProjectModal';
import { ASSET_BASE_URL } from '../utils/api';

const EMPTY_PROJECTS = [];
const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

const resolveCover = ({ coverImage, image }) => {
  if (coverImage) return coverImage;
  if (typeof image === 'string' && image.startsWith('http')) return image;
  if (image) return `${ASSET_BASE_URL}${image}`;
  return FALLBACK_COVER;
};

const ProjectPreviewCard = ({ project, onOpen }) => {
  const {
    title = 'Untitled',
    value = '',
    description = '',
    type,
    category,
    tech = [],
    logoImage,
  } = project;

  const coverSrc = resolveCover(project);
  const categoryLabel = category || type || 'PROJECT';
  const valueText = value || description;
  const techStack = Array.isArray(tech) ? tech : [];
  const visibleTech = techStack.slice(0, 4);
  const extraTech = techStack.length - visibleTech.length;

  const open = () => onOpen(project);

  return (
    <div
      className="project-grid-card project-grid-card--clickable"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      aria-label={`View details for ${title}`}
    >
      <div className="project-card-image-wrapper">
        {coverSrc && <img className="project-card-image" src={coverSrc} alt={title} loading="lazy" />}
        <div className="project-card-overlay"></div>
        {logoImage && (
          <div className="project-card-logo">
            <img src={logoImage} alt={`${title} logo`} />
          </div>
        )}
        <span className="project-card-view-hint">View details →</span>
      </div>

      <div className="project-card-content">
        <div className="project-card-header">
          <h3 className="project-card-title">{title}</h3>
          <span className="project-badge">{categoryLabel}</span>
        </div>
        <p className="project-card-description">{valueText}</p>
        {visibleTech.length > 0 && (
          <div className="project-card-tech">
            {visibleTech.map((t) => (
              <span key={t} className="project-tech-chip-sm">{t}</span>
            ))}
            {extraTech > 0 && <span className="project-tech-more">+{extraTech}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectList = ({ projects = EMPTY_PROJECTS, loading = false }) => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  if (loading) {
    return null;
  }

  if (!projects.length) {
    return <p className="text-center text-secondary">No projects found.</p>;
  }

  // Get all unique technologies for filter
  const allTechs = [...new Set(projects.flatMap(p => p.tech || []))].toSorted();

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
            <ProjectPreviewCard
              key={project._id || `${project.title}-${i}`}
              project={project}
              onOpen={setActiveProject}
            />
          ))
        ) : (
          <p className="text-center text-secondary" style={{ padding: '2rem' }}>
            No projects found with {selectedTech}
          </p>
        )}
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  );
};

export default React.memo(ProjectList);
