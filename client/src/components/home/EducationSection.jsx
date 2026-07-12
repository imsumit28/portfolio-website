import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeRight } from '../../utils/motion';

const EducationSection = () => {
  return (
    <section className="py-5 education-editorial" id="education">
      <div className="container py-4">
        <motion.div className="section-title-wrapper" {...fadeRight()}>
          <h2 className="section-title">EDUCATION</h2>
          <div className="section-line"></div>
        </motion.div>

        {/* Editorial header */}
        <motion.header className="ce-header" {...fadeUp()}>
          <span className="ce-kicker">Academics / 04</span>
          <h2 className="ce-headline">
            Where I&apos;m<br />studying<span className="ce-dot">.</span>
          </h2>
          <p className="ce-lead">
            B.Tech in Computer Science at VIT, class of 2028. The projects above
            happen alongside the coursework below.
          </p>
        </motion.header>

        <div className="edu-timeline">
          {/* Primary: VIT */}
          <motion.article className="edu-entry" {...fadeUp()}>
            <div className="edu-rail">
              <img src="/vit.jpg" alt="VIT" className="edu-logo" loading="lazy" />
              <span className="edu-period">2024 — 2028</span>
              <span className="edu-status"><span className="edu-status-dot"></span> Enrolled</span>
              <div className="edu-metric">
                <span className="edu-metric-num">8.18</span>
                <span className="edu-metric-label">CGPA / 10</span>
              </div>
            </div>

            <div className="edu-node">
              <span className="edu-node-dot"></span>
              <span className="edu-node-line"></span>
            </div>

            <div className="edu-main">
              <p className="edu-inst-meta">B.Tech · Computer Science &amp; Engineering</p>
              <h3 className="edu-inst">Vellore Institute of Technology</h3>

              <div className="edu-tags">
                <span className="edu-tag-label">Coursework</span>
                <span className="edu-tag">Data Structures</span>
                <span className="edu-tag">DBMS</span>
                <span className="edu-tag">Operating Systems</span>
              </div>

              <div className="edu-project">
                <p className="edu-block-label">Academic project</p>
                <p className="edu-project-title">Open Source Audit &amp; Automation Capstone (OSS – NGMC)</p>
                <ul className="edu-list">
                  <li>
                    <span className="edu-list-idx">01</span>
                    <span className="edu-list-text">Developed 5 Bash scripts for system reporting and auditing, reducing manual effort by 40%.</span>
                  </li>
                  <li>
                    <span className="edu-list-idx">02</span>
                    <span className="edu-list-text">Audited Python (OSS) and built an interactive Manifesto Generator.</span>
                  </li>
                </ul>
                <a href="https://github.com/imsumit28/Vityarthi-Open-Source-OSS" target="_blank" rel="noopener noreferrer" className="edu-link">
                  View on GitHub ↗
                </a>
              </div>
            </div>
          </motion.article>

          {/* Secondary: CBSE */}
          <motion.article className="edu-entry" {...fadeUp(100)}>
            <div className="edu-rail">
              <img src="/cbse.svg" alt="CBSE" className="edu-logo edu-logo--sm" loading="lazy" />
              <span className="edu-period">2021 — 2023</span>
            </div>

            <div className="edu-node">
              <span className="edu-node-dot"></span>
              <span className="edu-node-line"></span>
            </div>

            <div className="edu-main edu-main--row">
              <div>
                <p className="edu-inst-meta">Class XII · CBSE</p>
                <h3 className="edu-inst edu-inst--sm">Central Board of Secondary Education</h3>
              </div>
              <span className="edu-inline-score">89.4<span>%</span></span>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
