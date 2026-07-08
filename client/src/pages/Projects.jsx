import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProjectList from '../components/ProjectList';
import { LOCAL_PROJECTS } from '../data/projectsData';

const Projects = () => {
  // Combined projects+loading state to avoid cascading setState calls
  const [{ projects, loading }, setFetchState] = useState({ projects: [], loading: true });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        const apiProjects = Array.isArray(res.data) ? res.data : [];
        setFetchState({ projects: [...LOCAL_PROJECTS, ...apiProjects], loading: false });
      } catch (err) {
        setFetchState({ projects: LOCAL_PROJECTS, loading: false });
      }
    };
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container py-5 projects-editorial">
      <div className="section-title-wrapper mt-4" data-aos="fade-right">
        <h2 className="section-title">PROJECTS</h2>
        <div className="section-line"></div>
      </div>

      {/* Editorial header */}
      <header className="ce-header" data-aos="fade-up">
        <span className="ce-kicker">Selected work / 01</span>
        <h2 className="ce-headline">
          Things I&apos;ve<br />shipped<span className="ce-dot">.</span>
        </h2>
        <p className="ce-lead">
          Production-grade, fully deployed builds — real-time systems, full-stack
          apps, and developer tools. Tap any project for the full breakdown.
        </p>
      </header>

      <ProjectList projects={projects} loading={loading} />
    </div>
  );
};

export default Projects;
