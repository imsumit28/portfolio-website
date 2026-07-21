import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ExperienceSection from '../components/home/ExperienceSection';
import SkillsSection from '../components/home/SkillsSection';
import EducationSection from '../components/home/EducationSection';
import ResumeSection from '../components/home/ResumeSection';
import ContactSection from '../components/home/ContactSection';
import Projects from './Projects';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />

      {/* Projects Section */}
      <section className="pt-0 pb-5" id="projects">
        <Projects embedded />
      </section>

      <SkillsSection />
      <EducationSection />
      <ResumeSection />
      <ContactSection />
    </div>
  );
};

export default Home;
