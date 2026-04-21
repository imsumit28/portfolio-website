import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects = [], loading = false }) => {
  if (loading) {
    return null;
  }

  if (!projects.length) {
    return <p className="text-center text-secondary">No projects found.</p>;
  }

  return (
    <div className="d-flex flex-column gap-5">
      {projects.map((project, i) => (
        <div
          key={project._id || `${project.title}-${i}`}
          data-aos="fade-up"
          data-aos-delay={Math.min(i * 100, 500)}
        >
          <ProjectCard index={i} {...project} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(ProjectList);
