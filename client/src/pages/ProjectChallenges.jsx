import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LOCAL_PROJECTS } from '../data/projectsData';
import { FiArrowLeft } from 'react-icons/fi';

const ProjectChallenges = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = LOCAL_PROJECTS.find((p) => p._id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project || !project.challenge) {
    return (
      <div className="container py-5 text-center">
        <p style={{ color: '#94a3b8' }}>No challenges found for this project.</p>
        <button className="btn-global btn-global-secondary btn-global-sm mt-3" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  const { challenge } = project;

  return (
    <section className="py-5">
      <div className="container py-4" style={{ maxWidth: '780px' }}>
        {/* Back button */}
        <button
          className="btn-global btn-global-secondary btn-global-sm mb-4"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft /> Back
        </button>

        {/* Header */}
        <div className="section-title-wrapper mb-2" data-aos="fade-right">
          <h2 className="section-title" style={{ minWidth: 'max-content', paddingRight: '20px' }}>
            CHALLENGES FACED
          </h2>
          <div className="section-line"></div>
        </div>
        <p className="mb-5" style={{ color: '#94a3b8', fontSize: '0.97rem' }}>
          What actually broke in{' '}
          <span style={{ color: challenge.accentColor, fontWeight: 700 }}>{project.title}</span>
          , and what it took to fix it.
        </p>

        {/* Challenge card */}
        <div
          data-aos="fade-up"
          className="d-flex flex-column"
          style={{
            background: 'var(--bg-card)',
            border: `1px solid ${challenge.accentColor}30`,
            borderRadius: '14px',
            overflow: 'hidden',
          }}
        >
          {/* Card header */}
          <div style={{ padding: '22px 24px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span
              style={{
                color: challenge.accentColor,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '1.2px',
              }}
            >
              {project.title.toUpperCase()} — THE PROBLEM
            </span>
            <p className="mb-0 mt-2" style={{ color: '#64748b', fontSize: '0.93rem', lineHeight: '1.65' }}>
              {challenge.context}
            </p>
          </div>

          {/* Code window */}
          <div style={{ padding: '18px 24px 20px', background: 'rgba(0,0,0,0.3)', flex: 1 }}>
            <div className="d-flex gap-1 mb-3">
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f59e0b', opacity: 0.7 }} />
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#22c55e', opacity: 0.7 }} />
            </div>
            <pre
              style={{
                margin: 0,
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontSize: '0.85rem',
                lineHeight: '1.9',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {challenge.codeLines.map((line, i) => {
                if (line.t === 'spacer') return <br key={i} />;
                if (line.t === 'comment')
                  return (
                    <span key={i} style={{ color: '#475569', display: 'block' }}>
                      {line.text}
                    </span>
                  );
                return (
                  <span key={i} style={{ color: '#e2e8f0', display: 'block' }}>
                    {line.text}
                  </span>
                );
              })}
            </pre>
          </div>

          {/* Takeaway */}
          <div style={{ padding: '16px 24px 20px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <span
              style={{
                color: challenge.accentColor,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Takeaway
            </span>
            <p className="mb-0 mt-1" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
              {challenge.takeaway}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectChallenges;
