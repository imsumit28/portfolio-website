import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProjectList from '../components/ProjectList';
import { LOCAL_PROJECTS } from '../data/projectsData';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        const apiProjects = Array.isArray(res.data) ? res.data : [];
        setProjects([...LOCAL_PROJECTS, ...apiProjects]);
      } catch (err) {
        setProjects(LOCAL_PROJECTS);
      }
      setLoading(false);
    };
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container py-5">
      <div className="section-title-wrapper mt-4 mb-5" data-aos="fade-right">
        <h3 className="section-title">PROJECTS</h3>
        <div className="section-line"></div>
      </div>

      <ProjectList projects={projects} loading={loading} />
    </div>
  );
};

export default Projects;
