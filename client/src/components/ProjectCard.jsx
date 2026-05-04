import React, { useState } from 'react';
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
  highlights = [],
  highlightsLabel = 'HIGHLIGHTS',
  architecture = [],
  architectureDecisions = [],
  challenge,
  index = 0,
}) => {
  const navigate = useNavigate();
  const [showDecisions, setShowDecisions] = useState(false);
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

  return (
    <div className="project-showcase-card" data-aos="fade-up">
      <div className="project-showcase-inner">
        <div className="project-showcase-image">
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

          {Array.isArray(highlights) && highlights.length > 0 && (
            <div className="project-showcase-highlights">
              <div className="project-highlights-label">{highlightsLabel}</div>
              <ul className="project-highlights-list">
                {highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(architecture) && architecture.length > 0 && (
            <div className="project-architecture">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div className="project-highlights-label" style={{ marginBottom: 0 }}>ARCHITECTURE</div>
                {architectureDecisions.length > 0 && (
                  <button
                    onClick={() => setShowDecisions(v => !v)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: showDecisions ? '#10b981' : '#64748b',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 10px',
                      cursor: 'pointer',
                      letterSpacing: '0.3px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.color = '#10b981'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = showDecisions ? '#10b981' : '#64748b'; }}
                  >
                    Why this? {showDecisions ? '↑' : '↓'}
                  </button>
                )}
              </div>
              <div className="project-arch-flow">
                {architecture.map((step, i) => (
                  <React.Fragment key={step}>
                    <span className="project-arch-node">{step}</span>
                    {i < architecture.length - 1 && (
                      <span className="project-arch-arrow">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {showDecisions && architectureDecisions.length > 0 && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '14px 16px',
                    background: 'rgba(16,185,129,0.04)',
                    border: '1px solid rgba(16,185,129,0.15)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {architectureDecisions.map(({ q, a }, i) => (
                    <div key={i}>
                      <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.82rem', marginBottom: '3px' }}>{q}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.6 }}>{a}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {Array.isArray(metrics) && metrics.length > 0 && (
            <div className="project-showcase-metrics">
              {metrics.map((metric, i) => {
                const isTestMetric = title === 'CollabDocs' && (metric.toLowerCase().includes('test') || metric.toLowerCase().includes('coverage'));
                return (
                  <span
                    key={i}
                    className="project-metric-tag"
                    onClick={() => isTestMetric && navigate('/testing-guide')}
                    style={{
                      cursor: isTestMetric ? 'pointer' : 'default',
                      transition: 'all 0.2s ease',
                      ...(isTestMetric && {
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16,185,129,0.1)',
                      })
                    }}
                    onMouseEnter={(e) => {
                      if (isTestMetric) {
                        e.target.style.borderColor = '#10b981';
                        e.target.style.backgroundColor = 'rgba(16,185,129,0.15)';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isTestMetric) {
                        e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.target.style.backgroundColor = 'rgba(255,255,255,0.04)';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                    title={isTestMetric ? 'Click to view testing guide' : ''}
                  >
                    {metric}
                  </span>
                );
              })}
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

