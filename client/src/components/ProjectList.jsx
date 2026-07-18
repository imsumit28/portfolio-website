import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
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
    liveLink = '',
    githubLink = '',
    github = '',
  } = project;

  const coverSrc = resolveCover(project);
  const categoryLabel = category || type || 'PROJECT';
  const valueText = value || description;
  const techStack = Array.isArray(tech) ? tech : [];
  const visibleTech = techStack.slice(0, 4);
  const extraTech = techStack.length - visibleTech.length;
  const githubHref = githubLink || github || '';

  const open = () => onOpen(project);
  const stop = (e) => e.stopPropagation();

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

        {(liveLink || githubHref) && (
          <div className="project-card-actions">
            {liveLink && (
              <a
                className="btn-global btn-global-primary btn-global-sm"
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
              >
                <FiExternalLink /> Live Demo
              </a>
            )}
            {githubHref && (
              <a
                className="btn-global btn-global-secondary btn-global-sm"
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
              >
                <FaGithub /> Code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const FeaturedProjectCard = ({ project, onOpen }) => {
  const {
    title = 'Untitled',
    value = '',
    description = '',
    type,
    category,
    tech = [],
    logoImage,
    liveLink = '',
    githubLink = '',
    github = '',
    metrics = [],
  } = project;

  const coverSrc = resolveCover(project);
  const categoryLabel = category || type || 'PROJECT';
  const valueText = value || description;
  const techStack = Array.isArray(tech) ? tech : [];
  const visibleTech = techStack.slice(0, 6);
  const extraTech = techStack.length - visibleTech.length;
  const metricList = Array.isArray(metrics) ? metrics.slice(0, 3) : [];
  const githubHref = githubLink || github || '';

  const open = () => onOpen(project);
  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="project-featured project-grid-card--clickable"
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
      <div className="project-featured-cover">
        {coverSrc && <img src={coverSrc} alt={title} loading="lazy" />}
        <div className="project-card-overlay"></div>
        <span className="project-featured-flag">★ Featured build</span>
        {logoImage && (
          <div className="project-card-logo">
            <img src={logoImage} alt={`${title} logo`} />
          </div>
        )}
      </div>

      <div className="project-featured-body">
        <div className="project-featured-head">
          <h3 className="project-featured-title">{title}</h3>
          <span className="project-badge">{categoryLabel}</span>
        </div>
        <p className="project-featured-desc">{valueText}</p>

        {metricList.length > 0 && (
          <div className="project-featured-metrics">
            {metricList.map((m) => (
              <span key={m} className="project-featured-metric">{m}</span>
            ))}
          </div>
        )}

        {visibleTech.length > 0 && (
          <div className="project-featured-tech">
            {visibleTech.map((t) => (
              <span key={t} className="project-tech-chip-sm">{t}</span>
            ))}
            {extraTech > 0 && <span className="project-tech-more">+{extraTech}</span>}
          </div>
        )}

        <div className="project-featured-actions">
          {liveLink && (
            <a
              className="btn-global btn-global-primary btn-global-sm"
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
            >
              <FiExternalLink /> Live Demo
            </a>
          )}
          {githubHref && (
            <a
              className="btn-global btn-global-secondary btn-global-sm"
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
            >
              <FaGithub /> Code
            </a>
          )}
          <span className="project-featured-hint">View details →</span>
        </div>
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

      {/* Projects Showcase — featured lead + grid */}
      {filteredProjects.length > 0 ? (
        <>
          <FeaturedProjectCard project={filteredProjects[0]} onOpen={setActiveProject} />
          {filteredProjects.length > 1 && (
            <div className="projects-showcase">
              {filteredProjects.slice(1).map((project, i) => (
                <ProjectPreviewCard
                  key={project._id || `${project.title}-${i}`}
                  project={project}
                  onOpen={setActiveProject}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-secondary" style={{ padding: '2rem' }}>
          No projects found with {selectedTech}
        </p>
      )}

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  );
};

export default React.memo(ProjectList);
