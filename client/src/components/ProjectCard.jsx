import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { TbBug } from 'react-icons/tb';

const ProjectCard = ({
  _id,
  title = 'Untitled',
  description = '',
  value = '',
  tech = [],
  features = [],
  coverImage,
  image,
  logoImage,
  type,
  category,
  liveLink = '',
  githubLink = '',
  github = '',
  metrics = [],
  challenge,
  index = 0,
}) => {
  const navigate = useNavigate();
  const coverSrc = (() => {
    if (coverImage) return coverImage;
    if (typeof image === 'string' && image.startsWith('http')) return image;
    if (image) return `http://localhost:5000${image}`;
    return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  })();

  const logoSrc = logoImage || null;
  const valueText = value || description;
  const techStack = Array.isArray(tech) ? tech : [];
  const categoryLabel = category || type || 'PROJECT';
  const githubHref = githubLink || github || '';
  const primaryHref = liveLink || githubHref;
  const isEven = index % 2 === 0;

  return (
    <div className="project-showcase-card" data-aos="fade-up">
      <div className="project-showcase-inner">
        <div className={`project-showcase-image ${!isEven ? 'order-last' : ''}`}>
          {coverSrc && <img src={coverSrc} alt={title} loading="lazy" />}
          <div className="project-showcase-overlay"></div>
          {logoSrc && (
            <div className="project-showcase-logo">
              <img src={logoSrc} alt={`${title} logo`} />
            </div>
          )}
        </div>

        <div className="project-showcase-content">
          <div className="project-showcase-header">
            <h3 className="project-showcase-title">{title}</h3>
            <span className="project-badge">{categoryLabel}</span>
          </div>
          <p className="project-showcase-description">{valueText}</p>

          {Array.isArray(metrics) && metrics.length > 0 && (
            <div className="project-showcase-metrics">
              {metrics.map((metric, i) => (
                <span key={i} className="project-metric-tag">{metric}</span>
              ))}
            </div>
          )}

          {techStack.length > 0 && (
            <div className="project-showcase-tech">
              {techStack.map((t) => (
                <span key={t} className="project-tech-chip">{t}</span>
              ))}
            </div>
          )}

          <div className="project-showcase-actions">
            {githubHref && (
              <a className="btn-global btn-global-secondary btn-global-sm" href={githubHref} target="_blank" rel="noopener noreferrer">
                <FaGithub /> Code
              </a>
            )}
            {liveLink && (
              <a className="btn-global btn-global-primary btn-global-sm" href={liveLink} target="_blank" rel="noopener noreferrer">
                <FiExternalLink /> Live Demo
              </a>
            )}
            {challenge && _id && (
              <button
                className="btn-global btn-global-secondary btn-global-sm"
                onClick={() => navigate(`/challenges/${_id}`)}
                style={{ borderColor: challenge.accentColor + '55', color: challenge.accentColor }}
              >
                <TbBug /> Challenges Faced
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

