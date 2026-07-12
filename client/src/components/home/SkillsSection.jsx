import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../data/skillsData';
import { fadeUp, fadeRight } from '../../utils/motion';

const SkillsSection = () => {
  return (
    <section className="pt-5 pb-0 skills-editorial" id="skills">
      <div className="container py-4">
        <motion.div className="section-title-wrapper" {...fadeRight()}>
          <h2 className="section-title">SKILLS</h2>
          <div className="section-line"></div>
        </motion.div>

        {/* Editorial header */}
        <motion.header className="ce-header" {...fadeUp()}>
          <span className="ce-kicker">Toolkit / 03</span>
          <h2 className="ce-headline">
            The tools I<br />reach for<span className="ce-dot">.</span>
          </h2>
          <p className="ce-lead">
            A working stack for building and shipping full-stack, real-time
            applications — from interface to infrastructure.
          </p>
        </motion.header>

        <div className="sk-list-wrap">
          {SKILL_CATEGORIES.map((section, idx) => (
            <motion.div className="sk-cat" key={section.category} {...fadeUp(idx * 60)}>
              <div className="sk-cat-head">
                <span className="sk-cat-idx">{String(idx + 1).padStart(2, '0')}</span>
                <span className="sk-cat-name">{section.category}</span>
                <span className="sk-cat-count">{String(section.skills.length).padStart(2, '0')}</span>
              </div>
              <div className="sk-list">
                {section.skills.map((skill) => (
                  <div className="sk-chip" key={skill.name}>
                    <span className="sk-chip-ico">
                      <img
                        src={skill.img}
                        alt={skill.name}
                        width={20}
                        height={20}
                        loading="lazy"
                        style={{
                          filter: skill.invert
                            ? 'invert(1) brightness(1.25) contrast(1.15)'
                            : 'brightness(1.06) contrast(1.05)',
                        }}
                      />
                    </span>
                    <span className="sk-chip-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
