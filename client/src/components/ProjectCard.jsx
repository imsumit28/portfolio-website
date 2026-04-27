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
  learned = '',
  index = 0
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
  const isEven = index % 2 === 0;

  return (
    <article 
      className="row align-items-center mb-0 overflow-hidden" 
      style={{ 
        background: 'rgba(15,23,42,0.3)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        borderRadius: '24px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)'; }} 
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Media Column */}
      <div 
        className={`col-lg-5 p-0 m-0 ${!isEven ? 'order-lg-2' : ''}`} 
        style={{ position: 'relative' }}
      >
        {primaryHref ? (
          <a
            className="group"
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={mediaAriaLabel}
            style={{ display: 'block', overflow: 'hidden', position: 'relative' }}
          >
            <img className="project-showcase-cover" src={coverSrc} alt={`${title} cover`} loading="lazy" style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease', objectFit: 'contain' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            <div className="hover-cta-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
               <span style={{ background: '#10b981', color: '#fff', padding: '10px 24px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 20px rgba(16,185,129,0.5)', transition: 'transform 0.3s ease', transform: 'translateY(10px)' }} className="hover-cta-btn">View Project ↗</span>
            </div>
          </a>
        ) : (
          <div aria-label={mediaAriaLabel} style={{ overflow: 'hidden', position: 'relative' }}>
            <img className="project-showcase-cover" src={coverSrc} alt={`${title} cover`} loading="lazy" style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
        )}
      </div>

      {/* Content Column (Padded) */}
      <div 
        className={`col-lg-7 p-4 p-xl-5 ${!isEven ? 'order-lg-1' : ''} d-flex flex-column justify-content-center`}
        style={{ 
          borderLeft: isEven ? '1px solid rgba(255,255,255,0.1)' : 'none', 
          borderRight: !isEven ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}
      >
        <div className="d-flex align-items-center mb-3">
          <h3 className="mb-0 fw-bold" style={{ color: '#f8fafc', fontSize: '1.75rem', letterSpacing: '-0.5px' }}>{title}</h3>
          <span className="ms-3 project-showcase-badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px' }}>{categoryLabel}</span>
        </div>

        {valueText ? <p className="project-showcase-desc" style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>{valueText}</p> : null}

        {metricsArray.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mb-4">
             {metricsArray.map((m, i) => (
                <span key={i} style={{ fontSize: '0.8rem', color: '#38bdf8', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', padding: '4px 10px', borderRadius: '6px', fontWeight: '600' }}>
                  {m}
                </span>
             ))}
          </div>
        )}

        {featureList.length ? (
          <ul className="project-showcase-features mb-4" aria-label="Key features" style={{ listStyle: 'none', paddingLeft: 0 }}>
            {featureList.map((feature, index) => (
              <li key={`${feature}-${index}`} className="mb-2" style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5', display: 'flex', alignItems: 'flex-start' }}>
                <span aria-hidden="true" style={{ color: '#10b981', marginRight: '10px', marginTop: '2px' }}>▹</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {techStack.length ? (
          <div className="d-flex flex-wrap gap-2 mb-4" aria-label="Tech stack">
            {techStack.slice(0, 7).map((t) => (
              <span key={t} className="project-showcase-chip" style={{ fontSize: '0.8rem', padding: '5px 12px', background: 'rgba(30,41,59,0.8)', color: '#e2e8f0', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div className="d-flex gap-3 mt-4">
          {githubHref ? (
            <a className="btn-global btn-global-secondary btn-global-sm rounded-pill px-4" href={githubHref} target="_blank" rel="noopener noreferrer">
              <FaGithub className="me-2" /> Code
            </a>
          ) : null}
          {liveLink ? (
            <a className="btn-global btn-global-primary btn-global-sm rounded-pill px-4" href={liveLink} target="_blank" rel="noopener noreferrer">
              <FiExternalLink className="me-2" /> Live Demo
            </a>
          ) : null}
        </div>

        {/* Removed Learned section as requested */}
      </div>

      <style>{`
        a.group:hover .hover-cta-overlay { opacity: 1 !important; }
        a.group:hover .hover-cta-btn { transform: translateY(0) !important; }
      `}</style>
    </article>
  );
};

export default ProjectCard;

