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

  const filteredProjects =
    filter === 'ALL'
      ? projects
      : projects.filter((p) => (p.type || '').toUpperCase() === filter);

  return (
    <div className="container py-5">
      <div className="section-title-wrapper mt-4" data-aos="fade-right">
        <h3 className="section-title">PROJECTS</h3>
        <div className="section-line"></div>
      </div>
      
      <div className="d-flex justify-content-center mb-5 mt-4" data-aos="fade-in">
        <button 
          className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
          onClick={() => setFilter('ALL')}
        >ALL</button>
        <button 
          className={`filter-btn ${filter === 'WEB-APP' ? 'active' : ''}`}
          onClick={() => setFilter('WEB-APP')}
        >WEB-APP</button>
        <button 
          className={`filter-btn ${filter === 'PROJECT' ? 'active' : ''}`}
          onClick={() => setFilter('PROJECT')}
        >PROJECT</button>
      </div>

      <ProjectList projects={filteredProjects} loading={loading} />
    </div>
  );
};

export default Projects;
