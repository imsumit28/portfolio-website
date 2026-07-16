import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { EXPERIENCE_CONTRIBUTIONS, EXPERIENCE_TECHNOLOGIES } from '../../data/homeData';
import { fadeUp, fadeRight } from '../../utils/motion';

const ExperienceSection = () => {
  return (
    <section className="py-5 experience-editorial" id="experience">
      <div className="container py-4">
        <motion.div className="section-title-wrapper" {...fadeRight()}>
          <h2 className="section-title" style={{ width: '145px' }}>EXPERIENCE</h2>
          <div className="section-line"></div>
        </motion.div>

        {/* Editorial header */}
        <motion.header className="ce-header" {...fadeUp()}>
          <span className="ce-kicker">Experience / 01</span>
          <h2 className="ce-headline">
            Where I&apos;ve<br />shipped in production<span className="ce-dot">.</span>
          </h2>
          <p className="ce-lead">
            Hands-on engineering work — building and maintaining real product
            features alongside senior engineers and QA.
          </p>
        </motion.header>

        <motion.div
          className="exp-grid mt-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Left rail: period + status */}
          <aside className="exp-rail">
            <span className="exp-mono-label">2026</span>
            <p className="exp-period">Jun&nbsp;—&nbsp;Aug</p>
            <span className="exp-status">
              <span className="exp-status-dot" aria-hidden="true" />
              Internship
            </span>
            <p className="exp-location">
              <FaMapMarkerAlt size={11} aria-hidden="true" />
              <span>Noida, India</span>
            </p>
          </aside>

          {/* Main column */}
          <div className="exp-main">
            <header className="exp-head">
              <p className="exp-company">EncodersPro Private Limited</p>
              <h3 className="exp-role">Full&nbsp;Stack Developer Intern</h3>
            </header>

            {/* Featured metric */}
            <div className="exp-metric">
              <span className="exp-metric-num">8<span>+</span></span>
              <span className="exp-metric-text">
                REST endpoints and 5+ React components<br className="d-none d-sm-inline" /> shipped to production alongside engineering &amp; QA.
              </span>
            </div>

            {/* Contributions — numbered editorial list */}
            <ol className="exp-list">
              {EXPERIENCE_CONTRIBUTIONS.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                >
                  <span className="exp-list-idx">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="exp-list-text">{item}</span>
                </motion.li>
              ))}
            </ol>

            {/* Tech — understated inline mono */}
            <div className="exp-tech">
              <span className="exp-tech-label">Stack /</span>
              {EXPERIENCE_TECHNOLOGIES.map((tech) => (
                <span key={tech} className="exp-tech-item">{tech}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
