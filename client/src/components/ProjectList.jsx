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
    <div className="row g-5">
      {projects.map((project, i) => (
        <div
          className="col-lg-6 col-md-6 d-flex"
          key={project._id || `${project.title}-${i}`}
          data-aos="zoom-in-up"
          data-aos-delay={Math.min(i * 100, 500)}
        >
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(ProjectList);
