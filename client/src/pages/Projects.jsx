import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import ProjectList from '../components/ProjectList';
import { LOCAL_PROJECTS } from '../data/projectsData';
import { fadeUp, fadeRight } from '../utils/motion';

const Projects = () => {
  // Combined projects+loading state to avoid cascading setState calls.
  // Seeded with LOCAL_PROJECTS so the list has content before the API responds —
  // prerendering has no server to fetch from, and in the browser this removes the
  // blank frame that `loading` used to render.
  const [{ projects, loading }, setFetchState] = useState({
    projects: LOCAL_PROJECTS,
    loading: false,
  });

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
      <motion.div className="section-title-wrapper mt-4" {...fadeRight()}>
        <h2 className="section-title">PROJECTS</h2>
        <div className="section-line"></div>
      </motion.div>

      {/* Editorial header */}
      <motion.header className="ce-header" {...fadeUp()}>
        <span className="ce-kicker">Selected work / 02</span>
        <h2 className="ce-headline">
          Things I&apos;ve<br />shipped<span className="ce-dot">.</span>
        </h2>
        <p className="ce-lead">
          Deployed, working builds — real-time systems, full-stack apps, and
          developer tools. Tap any project for the full breakdown.
        </p>
      </motion.header>

      <ProjectList projects={projects} loading={loading} />
    </div>
  );
};

export default Projects;
