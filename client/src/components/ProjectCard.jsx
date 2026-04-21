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
  metrics = [],
  learned = ''
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

  const metricsArray = Array.isArray(metrics) ? metrics : [];

  return (
    <article className="project-showcase-card" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
      {primaryHref ? (
        <a
          className="project-showcase-media group"
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={mediaAriaLabel}
          style={{ position: 'relative', display: 'block', overflow: 'hidden', borderRadius: '12px' }}
        >
          <img className="project-showcase-cover" src={coverSrc} alt={`${title} cover`} loading="lazy" style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
          
          <div className="hover-cta-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
             <span style={{ background: '#10b981', color: '#fff', padding: '8px 16px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(16,185,129,0.4)', transition: 'transform 0.3s ease', transform: 'translateY(10px)' }} className="hover-cta-btn">View Project ↗</span>
          </div>
          
          <div className="project-showcase-overlay" />
          {logoSrc ? (
            <div className="project-showcase-logoWrap" aria-hidden="true">
              <img className="project-showcase-logo" src={logoSrc} alt="" loading="lazy" />
            </div>
          ) : null}
        </a>
      ) : (
        <div className="project-showcase-media project-showcase-media--static" aria-label={mediaAriaLabel} style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <img className="project-showcase-cover" src={coverSrc} alt={`${title} cover`} loading="lazy" />
          <div className="project-showcase-overlay" />
          {logoSrc ? (
            <div className="project-showcase-logoWrap" aria-hidden="true">
              <img className="project-showcase-logo" src={logoSrc} alt="" loading="lazy" />
            </div>
          ) : null}
        </div>
      )}

      {/* Injecting CSS here for the hover state of the new CTA overlay */}
      <style>{`
        .project-showcase-media:hover .hover-cta-overlay { opacity: 1 !important; }
        .project-showcase-media:hover .hover-cta-btn { transform: translateY(0) !important; }
      `}</style>

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

        {metricsArray.length > 0 && (
          <div className="d-flex flex-wrap gap-2 my-3">
             {metricsArray.map((m, i) => (
                <span key={i} style={{ fontSize: '0.72rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '3px 8px', borderRadius: '4px', fontWeight: '600', letterSpacing: '0.5px' }}>
                  {m}
                </span>
             ))}
          </div>
        )}

        {featureList.length ? (
          <ul className="project-showcase-features" aria-label="Key features">
            {featureList.map((feature, index) => (
              <li key={`${feature}-${index}`} className="project-showcase-feature">
                <span aria-hidden="true" style={{ color: '#10b981', marginRight: '6px' }}>▹</span>
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        {techStack.length ? (
          <div className="project-showcase-tech mt-2" aria-label="Tech stack">
            {techStack.slice(0, 7).map((t) => (
              <span key={t} className="project-showcase-chip">
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div className="project-showcase-actions mt-3">
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

        {learned && (
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="mb-0" style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.5' }}>
              <strong style={{ color: '#cbd5e1', fontStyle: 'normal' }}>Learned: </strong> {learned}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;

