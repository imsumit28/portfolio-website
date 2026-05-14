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
    <div className="container py-5">
      <div className="section-title-wrapper mt-4 mb-5" data-aos="fade-right">
        <h2 className="section-title">PROJECTS</h2>
        <div className="section-line"></div>
      </div>

      <ProjectList projects={projects} loading={loading} />
    </div>
  );
};

export default Projects;
