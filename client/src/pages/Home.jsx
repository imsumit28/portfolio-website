import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaReact, FaServer, FaDatabase, FaMobileAlt, FaShieldAlt, FaBriefcase, FaCode } from 'react-icons/fa';
import { SiSpeedtest } from 'react-icons/si';
import { FaXTwitter } from 'react-icons/fa6';
import Projects from './Projects';
import ContactForm from '../components/ContactForm';
import profileImg from '../assets/profile.png';
import aboutDevconnectImg from '../assets/about-devconnect.png';

const Home = () => {
  const scrollToSection = (sectionId) => {
    const el = sectionId === 'home' ? document.body : document.getElementById(sectionId);
    if (!el) return;

    const top = sectionId === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="d-flex align-items-center" style={{ minHeight: '85vh', overflowX: 'hidden' }} id="home">
        <div className="container ps-md-5">
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h1 className="hero-name">Hi, I'm Sumit Kumar</h1>
              <h2 className="hero-subtitle mt-3">
                <span className="text-accent">
                  <Typewriter
                    words={[
                      'a Full Stack Developer',
                      'Building real-world projects',
                      'JavaScript | React | Node.js',
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    cursorColor="#10b981"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h2>

              <p
                className="mt-3 mb-0"
                style={{
                  color: '#cbd5e1',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  maxWidth: '580px',
                }}
              >
                I build fast, scalable, and user-friendly web applications.
              </p>

              <div
                className="mt-3 d-inline-flex align-items-center gap-2"
                style={{
                  color: '#94a3b8',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  letterSpacing: '0.2px',
                }}
              >
                <span
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: 'rgba(16,185,129,0.10)',
                    border: '1px solid rgba(16,185,129,0.22)',
                    color: 'rgba(248,250,252,0.90)',
                  }}
                >
                  2+ Projects Built
                </span>
                <span style={{ opacity: 0.7 }}>•</span>
                <span
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: 'rgba(59,130,246,0.10)',
                    border: '1px solid rgba(59,130,246,0.22)',
                    color: 'rgba(248,250,252,0.90)',
                  }}
                >
                  Open to Opportunities
                </span>
              </div>

              <div className="hero-cta-row mt-4">
                <button
                  type="button"
                  className="hero-cta-btn hero-cta-btn--primary"
                  onClick={() => scrollToSection('projects')}
                >
                  View Projects
                </button>
                <a
                  href="/resume.pdf"
                  download="Sumit_Kumar_Resume.pdf"
                  className="hero-cta-btn hero-cta-btn--secondary text-decoration-none"
                >
                  Download Resume
                </a>
                <button
                  type="button"
                  className="hero-cta-btn hero-cta-btn--secondary"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact Me
                </button>
              </div>

              <div className="hero-social-row mt-4">
                <a href="https://www.linkedin.com/in/imsumit45/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn"><FaLinkedinIn /></a>
                <a href="https://github.com/imsumit28" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub"><FaGithub /></a>
                <a href="https://x.com/imsumit4545" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="X (Twitter)"><FaXTwitter /></a>
                <a href="mailto:ersumitkumar45@gmail.com?body=Hello%20Sumit%2C%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0AThank%20you." className="social-icon-btn" aria-label="Email"><FaEnvelope /></a>
              </div>
            </div>

            <div className="col-lg-5 mt-5 mt-lg-0 text-center" data-aos="fade-left" data-aos-delay="200">
              <div className="hero-photo-frame mt-4 mt-lg-0">
                <div className="hero-photo-glow" aria-hidden="true"></div>
                <div className="hero-photo-border" aria-hidden="true"></div>
                <img
                  src={profileImg}
                  alt="Sumit Kumar"
                  className="hero-photo-img"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="pt-5 pb-3" id="about">
        <div className="container py-2">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h3 className="section-title">Who I Am</h3>
            <div className="section-line"></div>
          </div>

          <div className="row mt-5 align-items-start" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-3 mb-4 mb-lg-0 text-center text-lg-start">
              <img src={aboutDevconnectImg} alt="DevConnect preview" className="about-img" />
            </div>
            <div className="col-lg-9 ps-lg-5">
              <p className="mb-5" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
                I am a <strong>Full Stack Developer</strong> specializing in building real-world, <strong>scalable</strong> web applications.
                <br /><br />
                I have built 2+ projects like <strong>DevConnect</strong>, a full-stack developer platform with <strong>authentication</strong>, <strong>user profiles</strong>, and <strong>real-time chat</strong> features, and <strong>AI Resume Analyzer</strong>, a tool that analyzes resumes and provides smart <strong>AI-based feedback</strong>.
                <br /><br />
                Across these projects, I have implemented <strong>secure authentication</strong>, <strong>REST APIs</strong>, and fully <strong>responsive user interfaces</strong>, focusing on writing <strong>clean</strong>, <strong>efficient</strong>, and <strong>scalable</strong> code.
                <br /><br />
                I enjoy building projects that go beyond tutorials and solve practical problems. I am currently <strong>open to work</strong> and looking for opportunities to contribute to impactful products and grow as a developer.
              </p>

              {/* Highlights */}
              <div className="mb-5 d-flex flex-wrap gap-3">
                <div className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontWeight: '500', fontSize: '0.95rem' }}>
                  <FaBriefcase className="me-2" size={16} /> Open to Work
                </div>
                <div className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6', fontWeight: '500', fontSize: '0.95rem' }}>
                  <FaCode className="me-2" size={16} /> Strong in React & Backend APIs
                </div>
              </div>

              <div className="row mt-5 mb-3">
                <div className="col-md-6 mb-3 text-white">
                  <span className="about-bullet">{'>'}</span> <strong>City:</strong> Patna, India
                </div>
                <div className="col-md-6 mb-3 text-white">
                  <span className="about-bullet">{'>'}</span> <strong>Phone:</strong> +91 8210240106
                </div>
                <div className="col-md-6 mb-3 text-white">
                  <span className="about-bullet">{'>'}</span> <strong>Email:</strong> ersumitkumar45@gmail.com
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="mt-5" data-aos="fade-up" data-aos-delay="200">
            <div className="section-title-wrapper mb-4">
              <h4 className="section-title" style={{ minWidth: 'auto' }}>INTERESTS</h4>
              <div className="section-line"></div>
            </div>

            <div className="row g-3">
              {[
                { icon: <FaReact />, label: 'Frontend Development', sub: 'React', color: '#61dafb' },
                { icon: <FaServer />, label: 'Backend APIs', sub: 'Node & Express', color: '#68a063' },
                { icon: <FaDatabase />, label: 'Database Design', sub: 'MongoDB', color: '#4db33d' },
                { icon: <SiSpeedtest />, label: 'Performance', sub: 'Optimization', color: '#f59e0b' },
                { icon: <FaMobileAlt />, label: 'Responsive', sub: 'Web Apps', color: '#8b5cf6' },
                { icon: <FaShieldAlt />, label: 'Authentication', sub: '& Security', color: '#22c55e' },
              ].map((item, i) => (
                <div className="col-lg-4 col-md-4 col-sm-6" key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
                  <div className="interest-card">
                    <span className="interest-icon" style={{ color: item.color }}>{item.icon}</span>
                    <span>{item.label}<br />{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-5" id="skills">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h3 className="section-title">SKILLS</h3>
            <div className="section-line"></div>
          </div>

          <div className="mt-4 mb-4" data-aos="fade-up">
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px' }}>
              I build full-stack web applications using the MERN stack, focusing on scalable backend systems, clean frontend architecture, and efficient API design.
              <br />
              <span style={{ color: '#10b981', fontWeight: '500' }}>Comfortable building full-stack applications independently.</span>
            </p>
          </div>

          <div className="mt-5 d-flex flex-column gap-5">
            {[
              {
                category: 'Frontend',
                skills: [
                  { name: 'HTML', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                  { name: 'CSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                  { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', highlight: true },
                ]
              },
              {
                category: 'Backend',
                skills: [
                  { name: 'Node.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                  { name: 'Express.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
                ]
              },
              {
                category: 'Database',
                skills: [
                  { name: 'MongoDB', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                ]
              },
              {
                category: 'Tools',
                skills: [
                  { name: 'Git', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                  { name: 'GitHub', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
                  { name: 'Postman', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postman.svg', invert: true },
                  { name: 'VS Code', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg', invert: true },
                ]
              },
              {
                category: 'Deployment',
                skills: [
                  { name: 'Vercel (Frontend)', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg', invert: true },
                  { name: 'Render (Backend)', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/render.svg', invert: true },
                  { name: 'Railway (Backend)', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/railway.svg', invert: true },
                ]
              },
              {
                category: 'Concepts',
                skills: [
                  { name: 'REST APIs', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
                  { name: 'Authentication (JWT)', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jsonwebtokens.svg', invert: true },
                  { name: 'Database Operations (CRUD)', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                ]
              }
            ].map((section, idx) => (
              <div key={section.category} data-aos="fade-up" data-aos-delay={idx * 100}>
                <h5 className="mb-4 fw-bold" style={{ color: '#f8fafc', borderLeft: '4px solid var(--accent)', paddingLeft: '12px' }}>
                  {section.category}
                </h5>
                <div className="row g-3">
                  {section.skills.map((skill) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={skill.name}>
                      <div className="d-flex align-items-center p-3 h-100 position-relative" style={{
                        background: skill.highlight ? 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, #1e293b 100%)' : '#1e293b',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        border: skill.highlight ? '1px solid rgba(34,197,94,0.8)' : '1px solid transparent',
                        boxShadow: skill.highlight ? '0 0 15px rgba(34,197,94,0.25)' : 'none',
                        cursor: 'default',
                        overflow: 'hidden',
                        transform: 'scale(1)'
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = skill.highlight ? 'rgba(34,197,94,1)' : 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(34,197,94,0.4)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = skill.highlight ? 'rgba(34,197,94,0.8)' : 'transparent'; e.currentTarget.style.boxShadow = skill.highlight ? '0 0 15px rgba(34,197,94,0.25)' : 'none'; }}
                      >
                        {skill.highlight && (
                          <div style={{
                            position: 'absolute', top: 0, right: 0, padding: '2px 8px', background: 'var(--accent)', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', borderBottomLeftRadius: '8px'
                          }}>
                            CORE
                          </div>
                        )}
                        <div className="d-flex align-items-center justify-content-center" style={{
                          width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginRight: '15px', padding: '6px'
                        }}>
                          <img
                            src={skill.img}
                            alt={skill.name}
                            style={{
                              width: '100%', height: '100%', objectFit: 'contain',
                              filter: skill.invert
                                ? 'invert(1) brightness(1.25) contrast(1.15)'
                                : 'brightness(1.06) contrast(1.05)',
                            }}
                          />
                        </div>
                        <p className="mb-0 fw-semibold" style={{ fontSize: '0.95rem', color: skill.highlight ? '#22c55e' : '#e2e8f0' }}>{skill.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-5" id="projects">
        <Projects />
      </section>

      {/* Experience Section */}
      <section className="py-5" id="experience">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h3 className="section-title" style={{ width: '145px' }}>EXPERIENCE</h3>
            <div className="section-line"></div>
          </div>

          <div className="mt-5" data-aos="fade-up">
            <div className="position-relative p-4 p-md-5" style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(15,23,42,0.9) 100%)',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: '16px',
              boxShadow: '0 0 40px rgba(16,185,129,0.06), 0 20px 60px rgba(0,0,0,0.4)',
            }}>
              {/* Glow blob top-right */}
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}></div>

              <div className="position-relative" style={{ zIndex: 1 }}>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-2">
                  <div className="d-flex align-items-center gap-3">
                    {/* Icon badge */}
                    <div className="d-flex align-items-center justify-content-center rounded-3 shadow" style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #10b981, #059669)', flexShrink: 0 }}>
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0" style={{ color: '#f8fafc', fontSize: '1.3rem' }}>Full Stack Developer</h4>
                      <p className="mb-0 mt-1" style={{ color: '#10b981', fontWeight: '500', fontSize: '0.95rem' }}>Full Stack Developer | Independent Projects</p>
                    </div>
                  </div>
                  <span style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', borderRadius: '30px', padding: '6px 18px', fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    2025 – Present (Personal Projects)
                  </span>
                </div>

                <hr style={{ borderColor: 'rgba(255,255,255,0.07)', margin: '1.5rem 0' }} />

                <ul className="d-flex flex-column gap-3 mb-4" style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {[
                    'Built and deployed full-stack applications including DevConnect and AI Resume Analyzer',
                    'Implemented real-time chat functionality using Socket.io, handling 50+ concurrent users',
                    'Designed systems focusing on scalability, performance, and real-world usability',
                    'Developed secure authentication systems',
                    'Designed responsive UI using React and modern frontend practices',
                    'Built and integrated REST APIs with MongoDB database',
                    'Gained hands-on experience building scalable full-stack applications and real-time systems',
                  ].map((item, i) => (
                    <li key={i} className="d-flex align-items-start gap-3" style={{ color: '#94a3b8', fontSize: '0.97rem' }}>
                      <span style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }}>▸</span>
                      {item}
                    </li>
                  ))}

                  {/* Differentiator Highlight */}
                  <li className="d-flex align-items-center gap-3 mt-1 p-3 rounded" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', boxShadow: '0 4px 20px rgba(59,130,246,0.06)' }}>
                    <span style={{ color: '#3b82f6', flexShrink: 0, fontSize: '1.2rem', lineHeight: 1 }}>⚡</span>
                    <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: '600', letterSpacing: '0.3px' }}>
                      Built projects beyond tutorials, focusing on solving real-world problems with scalable solutions
                    </span>
                  </li>
                </ul>

                {/* Tech tag chips */}
                <div className="d-flex flex-wrap gap-2">
                  {['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs', 'JWT'].map(tag => (
                    <span key={tag} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', borderRadius: '6px', padding: '4px 14px', fontSize: '0.8rem', fontWeight: '500' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-5" id="education">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h3 className="section-title" style={{ minWidth: 'max-content', paddingRight: '20px' }}>Education & Learning</h3>
            <div className="section-line"></div>
          </div>

          <div className="row mt-5">
            {/* Primary Focus: VIT */}
            <div className="col-12 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <div className="card-body p-4 p-md-5">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-4 gap-3">
                    <img
                      src="/vit.jpg"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/1200px-Vellore_Institute_of_Technology_seal_2017.svg.png'; }}
                      alt="VIT"
                      className="rounded shadow-sm"
                      style={{ width: '140px', height: '75px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="fw-bold mb-1" style={{ color: 'var(--text-main)', fontSize: '1.15rem', lineHeight: '1.4' }}>Vellore Institute of Technology</h5>
                      <p className="text-accent mb-0 fw-medium" style={{ fontSize: '0.95rem' }}>2024 - 2028</p>
                    </div>
                  </div>
                  <h6 className="fw-bold mb-2" style={{ color: '#cbd5e1', fontSize: '1.05rem' }}>B.Tech. in Computer Science and Engineering</h6>
                  <p className="mb-2" style={{ fontSize: '1rem', color: '#e2e8f0' }}>CGPA: <span style={{ color: '#10b981', fontWeight: '600' }}>8.03 (till now)</span></p>
                  <p className="mb-3" style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#e2e8f0' }}>
                    <span style={{ color: '#f8fafc', fontWeight: '700' }}>Relevant Coursework:</span> Data Structures, DBMS, Operating Systems
                  </p>

                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <h6 className="fw-bold mb-2" style={{ color: '#3b82f6', fontSize: '0.85rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Coursework Project Signal
                    </h6>
                    <p className="fw-bold mb-3" style={{ color: '#f8fafc', fontSize: '1rem' }}>
                      Open Source Audit & Automation Capstone (OSS – NGMC)
                    </p>
                    <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                      <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                        <span>Audited Python (open-source software) through Linux-based automation scripts.</span>
                      </li>
                      <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                        <span>Developed 5 Bash scripts for system reporting, package inspection, log analysis, and disk auditing, reducing manual audit effort by 40%.</span>
                      </li>
                      <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                        <span>Implemented concepts like loops, conditionals, file handling, and system utilities (grep, awk, dpkg).</span>
                      </li>
                      <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                        <span>Applied core OS and scripting concepts in real-world automation scenarios</span>
                      </li>
                      <li className="d-flex align-items-start gap-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                        <span>
                          Built an interactive Open Source Manifesto Generator showcasing OSS philosophy.{' '}
                          <a href="https://github.com/imsumit28/Vityarthi-Open-Source-OSS" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>View on GitHub →</a>
                        </span>
                      </li>
                    </ul>

                    <div className="mt-4 pt-4" style={{ borderTop: '1px dashed rgba(255,255,255,0.08)' }}>
                      <p className="fw-bold mb-3" style={{ color: '#f8fafc', fontSize: '1rem' }}>
                        Resume Analyzer (Core Java)
                      </p>
                      <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                        <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                          <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                          <span>Engineered a resume analysis application in Java (OOP) to evaluate content quality and structure.</span>
                        </li>
                        <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                          <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                          <span>Implemented skill extraction, section validation, and scoring algorithm processing resumes with 85% accuracy.</span>
                        </li>
                        <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                          <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                          <span>Built a rule-based suggestion engine to generate actionable resume improvements.</span>
                        </li>
                        <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                          <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                          <span>Developed both CLI and Swing-based GUI, improving usability and user interaction.</span>
                        </li>
                        <li className="d-flex align-items-start gap-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                          <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                          <span>
                            Structured application using modular architecture (Analyzer, Reader, Suggestion Engine).{' '}
                            <a href="https://github.com/imsumit28/AIResumeAnalyzer" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>View on GitHub →</a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Focus: CBSE */}
          <div className="row" data-aos="fade-up" data-aos-delay="200">
            <div className="col-12">
              <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <div className="card-body p-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                  <div className="d-flex align-items-center">
                    <img
                      src="/cbse.jpg"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/CBSE_new_logo.svg/1200px-CBSE_new_logo.svg.png'; }}
                      alt="CBSE"
                      className="rounded shadow-sm"
                      style={{ width: '45px', height: '45px', objectFit: 'contain', backgroundColor: 'white', padding: '4px' }}
                    />
                    <div className="ms-3">
                      <h6 className="fw-bold mb-0" style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Central Board Of Secondary Education</h6>
                      <p className="mb-0" style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>Class XII</p>
                    </div>
                  </div>
                  <div className="text-md-end">
                    <p className="mb-0 text-accent fw-medium" style={{ fontSize: '0.85rem' }}>May 2021 - May 2023</p>
                    <p className="mb-0" style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>Score: <span style={{ color: '#f8fafc', fontWeight: '600' }}>89.4%</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-5" id="resume">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h3 className="section-title">RESUME</h3>
            <div className="section-line"></div>
          </div>

          <div className="mt-5" data-aos="fade-up">
            <div
              className="p-4 p-md-5"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(15,23,42,0.92) 100%)',
                border: '1px solid rgba(59,130,246,0.22)',
                borderRadius: '16px',
                boxShadow: '0 0 40px rgba(59,130,246,0.06), 0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              <div className="row align-items-center">
                <div className="col-lg-5 mb-5 mb-lg-0">
                  <h4 className="fw-bold mb-3" style={{ color: '#f8fafc', fontSize: '1.8rem' }}>
                    My Resume
                  </h4>
                  <p className="mb-4" style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7 }}>
                    Get a detailed overview of my technical skills, hands-on experience, and educational background.
                  </p>
                  
                  <div className="mb-4 d-flex flex-column gap-3">
                    <div>
                      <span className="badge rounded-pill" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)', padding: '8px 14px', fontSize: '0.9rem', fontWeight: '500' }}>
                        📄 PDF • Updated April 2026
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <a 
                      href="/resume.pdf" 
                      download="Sumit_Kumar_Resume.pdf"
                      className="hero-cta-btn hero-cta-btn--primary text-decoration-none d-inline-flex align-items-center justify-content-center"
                      style={{ padding: '14px 32px', fontSize: '1.05rem', fontWeight: '600', letterSpacing: '0.5px' }}
                    >
                      Download Resume
                    </a>
                  </div>
                </div>
                
                <div className="col-lg-7 px-lg-5">
                  <div 
                    className="position-relative w-100 mx-auto" 
                    style={{ 
                      paddingTop: '120%', /* aspect ratio for A4 preview */
                      background: 'rgba(15, 23, 42, 0.6)', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(59,130,246,0.3)',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.5), 0 0 25px rgba(59,130,246,0.15)'
                    }}
                  >
                    <div style={{ 
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                      overflow: 'hidden', 
                      borderRadius: '15px', 
                      transform: 'translateZ(0)',
                      clipPath: 'inset(0px round 15px)' 
                    }}>
                      <div style={{ position: 'absolute', top: 0, left: '-18px', width: 'calc(100% + 36px)', height: '100%', overflow: 'hidden' }}>
                        <object 
                          data="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
                          type="application/pdf" 
                          style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            background: '#fff'
                          }}
                        >
                        <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4 text-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#1e293b' }}>
                          <p style={{ color: '#cbd5e1', marginBottom: '15px' }}>Preview not available in this browser.</p>
                          <a href="/resume.pdf" download="Sumit_Kumar_Resume.pdf" className="btn btn-primary px-4 py-2" style={{ borderRadius: '8px' }}>
                            Download PDF Instead
                          </a>
                        </div>
                      </object>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5" id="contact">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h3 className="section-title">CONTACT</h3>
            <div className="section-line"></div>
          </div>

          <div className="row g-5 align-items-stretch mt-4">
            <div className="col-lg-5" data-aos="fade-right">
              <div
                className="h-100 p-4 p-md-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(15,23,42,0.92) 100%)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: '16px',
                  boxShadow: '0 0 50px rgba(16,185,129,0.05), 0 25px 60px rgba(0,0,0,0.35)',
                }}
              >
                <h4 className="fw-bold mb-2" style={{ color: '#f8fafc' }}>
                  Let’s build something
                </h4>
                <p className="mb-4" style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1.05rem' }}>
                  Open to internships, freelance, and full-time opportunities. Feel free to connect!
                </p>

                <div className="d-flex flex-column gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(16,185,129,0.15)' }}>
                  <a href="mailto:ersumitkumar45@gmail.com?subject=Connecting%20from%20your%20Portfolio&body=Hi%20Sumit,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity%20with%20you!%0A%0A" className="d-flex align-items-center gap-3 text-decoration-none" style={{ color: '#cbd5e1', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#10b981'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                    <div className="d-flex align-items-center justify-content-center rounded" style={{ width: '40px', height: '40px', background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                      <FaEnvelope size={18} />
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>ersumitkumar45@gmail.com</span>
                  </a>

                  <a href="https://linkedin.com/in/imsumit45/" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-3 text-decoration-none" style={{ color: '#cbd5e1', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#10b981'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                    <div className="d-flex align-items-center justify-content-center rounded" style={{ width: '40px', height: '40px', background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                      <FaLinkedinIn size={18} />
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>linkedin.com/in/imsumit45</span>
                  </a>

                  <a href="https://github.com/imsumit28" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-3 text-decoration-none" style={{ color: '#cbd5e1', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#10b981'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                    <div className="d-flex align-items-center justify-content-center rounded" style={{ width: '40px', height: '40px', background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                      <FaGithub size={18} />
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>github.com/imsumit28</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7" data-aos="fade-left">
              <div
                className="position-relative p-4 p-md-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, #0f172a 100%)',
                  border: '1px solid rgba(16,185,129,0.15)',
                  borderRadius: '16px',
                  boxShadow: '0 0 50px rgba(16,185,129,0.04), 0 25px 60px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                ></div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
