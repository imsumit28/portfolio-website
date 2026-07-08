import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import ProjectCard from './ProjectCard';
import useScrollLock from '../hooks/useScrollLock';

const ProjectModal = ({ project, onClose }) => {
  // Lock body scroll while the modal is open
  useScrollLock();

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="project-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className="project-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        <div className="project-modal-body">
          <ProjectCard {...project} />
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
