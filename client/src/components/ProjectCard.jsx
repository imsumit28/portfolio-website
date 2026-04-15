import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const ProjectCard = ({
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
}) => {
  const coverSrc = (() => {
    if (coverImage) return coverImage;
    if (typeof image === 'string' && image.startsWith('http')) return image;
    if (image) return `http://localhost:5000${image}`;
    return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  })();

  const logoSrc = logoImage || null;
  const valueText = value || description;
  const featureList = Array.isArray(features)
    ? features.filter(Boolean).slice(0, 3)
    : [];
  const techStack = Array.isArray(tech) ? tech : [];
  const categoryLabel = category || type || 'PROJECT';
  const githubHref = githubLink || github || '';
  const primaryHref = liveLink || githubHref;
  const mediaAriaLabel = liveLink
    ? `Open ${title} live website`
    : githubHref
      ? `Open ${title} GitHub repository`
      : `${title} preview image`;

  return (
    <article className="project-showcase-card">
      {primaryHref ? (
        <a
          className="project-showcase-media"
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={mediaAriaLabel}
        >
          <img className="project-showcase-cover" src={coverSrc} alt={`${title} cover`} loading="lazy" />
          <div className="project-showcase-overlay" />
          {logoSrc ? (
            <div className="project-showcase-logoWrap" aria-hidden="true">
              <img className="project-showcase-logo" src={logoSrc} alt="" loading="lazy" />
            </div>
          ) : null}
        </a>
      ) : (
        <div className="project-showcase-media project-showcase-media--static" aria-label={mediaAriaLabel}>
          <img className="project-showcase-cover" src={coverSrc} alt={`${title} cover`} loading="lazy" />
          <div className="project-showcase-overlay" />
          {logoSrc ? (
            <div className="project-showcase-logoWrap" aria-hidden="true">
              <img className="project-showcase-logo" src={logoSrc} alt="" loading="lazy" />
            </div>
          ) : null}
        </div>
      )}

      <div className="project-showcase-quickActions" aria-label="Quick links">
        {githubHref ? (
          <a className="project-showcase-quickIcon" href={githubHref} target="_blank" rel="noopener noreferrer" aria-label="View Source">
            <FaGithub />
          </a>
        ) : null}
        {liveLink ? (
          <a className="project-showcase-quickIcon" href={liveLink} target="_blank" rel="noopener noreferrer" aria-label="View Live Version">
            <FiExternalLink />
          </a>
        ) : null}
      </div>

      <div className="project-showcase-body">
        <div className="project-showcase-head">
          <h4 className="project-showcase-title">{title}</h4>
          <span className="project-showcase-badge">{categoryLabel}</span>
        </div>

        {valueText ? <p className="project-showcase-desc project-showcase-value">{valueText}</p> : null}

        {featureList.length ? (
          <ul className="project-showcase-features" aria-label="Key features">
            {featureList.map((feature, index) => (
              <li key={`${feature}-${index}`} className="project-showcase-feature">
                <span aria-hidden="true">- </span>
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        {techStack.length ? (
          <div className="project-showcase-tech" aria-label="Tech stack">
            {techStack.slice(0, 7).map((t) => (
              <span key={t} className="project-showcase-chip">
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div className="project-showcase-actions">
          {githubHref ? (
            <a className="btn-global btn-global-secondary btn-global-sm" style={{flex:1}} href={githubHref} target="_blank" rel="noopener noreferrer">
              <FaGithub />
              View Code
            </a>
          ) : (
            <span className="btn-global btn-global-secondary btn-global-sm btn-global--disabled" style={{flex:1}} aria-disabled="true">
              <FaGithub />
              Source Private
            </span>
          )}
          {liveLink ? (
            <a className="btn-global btn-global-primary btn-global-sm" style={{flex:1}} href={liveLink} target="_blank" rel="noopener noreferrer">
              <FiExternalLink />
              View Live
            </a>
          ) : (
            <span className="btn-global btn-global-primary btn-global-sm btn-global--disabled" style={{flex:1}} aria-disabled="true">
              <FiExternalLink />
              Live Demo Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

