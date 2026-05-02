import React, { Suspense } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaReact, FaServer, FaDatabase, FaMobileAlt, FaShieldAlt, FaBriefcase, FaCode, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GitHubCalendar } from 'react-github-calendar';
import Projects from './Projects';
import ContactForm from '../components/ContactForm';
import profileImg from '../assets/profile.png';
import profileVideo from '../assets/profile-video.mp4';
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
      <section className="d-flex align-items-center position-relative" style={{ minHeight: '85vh', overflow: 'hidden' }} id="home">
        <div className="hero-bg-glow"></div>
        <div className="container ps-md-5 position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h1 className="hero-name">Hi, I'm <span className="text-accent">Sumit</span> Kumar</h1>
              <h2 className="hero-subtitle mt-3">
                <span className="text-accent">
                  <Typewriter
                    words={[
                      'Full Stack Developer',
                      'Distributed systems & real-time apps',
                      'React · Node.js · TypeScript · Redis',
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
                I design and ship real-time, distributed systems — handling concurrency, fault tolerance, and production load. Not localhost demos.
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
                  3 Projects — All Deployed
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
                  Open to Full-time Roles
                </span>
              </div>

              <div className="hero-cta-row mt-4">
                <button
                  type="button"
                  className="btn-global btn-global-primary"
                  onClick={() => scrollToSection('projects')}
                >
                  View Projects
                </button>
                <a
                  href="/resume.pdf"
                  download="Sumit_Kumar_Full_Stack_Developer_resume.pdf"
                  className="btn-global btn-global-secondary text-decoration-none"
                >
                  Download Resume
                </a>
                <button
                  type="button"
                  className="btn-global btn-global-secondary"
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
            <h2 className="section-title">Who I Am</h2>
            <div className="section-line"></div>
          </div>

          <div className="row mt-5 align-items-start" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-4 col-md-5 mb-5 mb-md-0 text-center text-md-start">
              <div className="about-photo-frame mx-auto mx-md-0">
                <video
                  autoPlay
                  loop
                  muted
                  className="about-photo-img"
                  style={{ display: 'block', width: '100%' }}
                >
                  <source src={profileVideo} type="video/mp4" />
                </video>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2 text-white">
                  <span className="about-bullet">{'>'}</span> <strong>City:</strong>&nbsp; Patna, India
                </div>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-4 text-white">
                  <span className="about-bullet">{'>'}</span> <strong>Email:</strong>&nbsp; <button onClick={() => scrollToSection('contact')} style={{ background: 'none', border: 'none', color: '#10b981', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}>Available via Contact Form</button>
                </div>
                <div className="d-flex justify-content-center justify-content-md-start">
                  <a href="/resume.pdf" download="Sumit_Kumar_Full_Stack_Developer_resume.pdf" className="btn-global btn-global-secondary w-100" style={{ maxWidth: '300px', fontSize: '0.95rem' }}>
                    Download Resume
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-7 ps-lg-5">
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
                Full Stack Developer focused on real-time systems and scalable backend architecture.
              </p>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
                <strong>Built:</strong>
              </p>
              <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '1rem', color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '0.5rem' }}>▸ <strong>DevConnect</strong> → real-time developer network</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <strong>NotifyX</strong> → distributed notification system using Redis & BullMQ</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <strong>CollabDocs</strong> → CRDT-based collaborative editor with AI assistance</li>
              </ul>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
                All projects are deployed, handle real-time interactions, and solve concurrency problems. Every project I ship is deployed and live — not just a localhost demo.
              </p>
              <p className="mb-4" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
                Currently <strong>open to full-time roles</strong> — remote or India-based.
              </p>

              <p className="mb-5 fst-italic" style={{ color: '#10b981', fontSize: '1.1rem', borderLeft: '3px solid #10b981', paddingLeft: '15px' }}>
                "The interesting problems happen when two users hit save at the same time. That's what I build for."
              </p>

              {/* Badges */}
              <div className="mb-5 d-flex flex-wrap gap-3">
                <div className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6', fontWeight: '500', fontSize: '0.9rem' }}>
                  <FaBriefcase className="me-2" size={14} /> Open to Full-time Roles
                </div>
                <div className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontWeight: '500', fontSize: '0.9rem' }}>
                  <FaCode className="me-2" size={14} /> React · Node.js · TypeScript · Redis
                </div>
              </div>

              {/* Quick Stat Cards */}
              <div className="row g-3 mb-5">
                {[
                  { icon: <FaRocket size={20} className="text-accent" />, label: 'Projects Shipped', val: '3', sub: 'Deployed & Live' },
                  { icon: <FaCode size={20} className="text-accent" />, label: 'Tech Stack', val: 'React, Node, MongoDB' },
                  { icon: <FaMapMarkerAlt size={20} className="text-accent" />, label: 'Location', val: 'Patna, India' },
                  { icon: <FaBriefcase size={20} className="text-accent" />, label: 'Status', val: 'Open to Work' }
                ].map((stat, i) => (
                  <div className="col-sm-6 col-lg-3 col-6" key={i}>
                    <div className="p-3 rounded-3 h-100 d-flex flex-column" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <span style={{ flexShrink: 0 }}>{stat.icon}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700', lineHeight: '1.2' }}>{stat.label}</span>
                      </div>
                      <div className="mt-auto" style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem', lineHeight: '1.4' }}>
                        {stat.val}
                        {stat.sub && <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.sub}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* GitHub Contribution Calendar */}
          <div className="github-calendar-section" data-aos="fade-up" data-aos-delay="150">
            <div className="section-title-wrapper mb-4">
              <h2 className="section-title" style={{ minWidth: 'auto' }}>CODE ACTIVITY</h2>
              <div className="section-line"></div>
            </div>
            <div className="github-calendar-container">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <div>
                  <p className="mb-0" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    Contribution activity on GitHub over the past year
                  </p>
                </div>
                <a
                  href="https://github.com/imsumit28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-global btn-global-secondary"
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  <FaGithub style={{ marginRight: '6px' }} /> View Profile
                </a>
              </div>
              <div className="github-calendar-inner">
                <Suspense fallback={
                  <div style={{
                    height: '150px',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '8px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                }>
                  <GitHubCalendar
                    username="imsumit28"
                    colorScheme="dark"
                    theme={{
                      dark: ['#1e293b', '#0d3321', '#14532d', '#16a34a', '#10b981'],
                    }}
                    fontSize={12}
                    blockSize={13}
                    blockMargin={4}
                    style={{ width: '100%' }}
                  />
                </Suspense>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section className="pt-5 pb-0" id="skills">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title">SKILLS</h2>
            <div className="section-line"></div>
          </div>
          <div className="mt-4 d-flex flex-column gap-4">
            {[
              {
                category: 'CORE STACK',
                skills: [
                  { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                  { name: 'TypeScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                  { name: 'Node.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                  { name: 'Next.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
                  { name: 'Express.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
                  { name: 'MongoDB', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                ]
              },
              {
                category: 'UI & STYLING',
                skills: [
                  { name: 'HTML5', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                  { name: 'CSS3', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                  { name: 'Tailwind CSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
                ]
              },
              {
                category: 'AUTH & APIs',
                skills: [
                  { name: 'REST APIs', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
                  { name: 'JWT Auth', img: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/shield-lock-fill.svg', invert: true },
                ]
              },
              {
                category: 'Tools & Deployment',
                skills: [
                  { name: 'Git & GitHub', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
                  { name: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
                  { name: 'Vercel', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg', invert: true },
                  { name: 'Render', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/render.svg', invert: true },
                ]
              },
              {
                category: 'REAL-TIME & QUEUES',
                skills: [
                  { name: 'Socket.io', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/socketdotio.svg', invert: true },
                  { name: 'Redis', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
                  { name: 'BullMQ', img: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/bull.svg', invert: true },
                ]
              }
            ].map((section, idx) => (
              <div key={section.category} data-aos="fade-up" data-aos-delay={idx * 100}>
                <h6 className="mb-3 fw-bold" style={{ color: '#cbd5e1', borderLeft: '3px solid var(--accent)', paddingLeft: '10px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {section.category}
                </h6>
                <div className="row g-2">
                  {section.skills.map((skill) => (
                    <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={skill.name}>
                      <div className="d-flex align-items-center p-2 h-100 position-relative" style={{
                        background: 'rgba(15,23,42,0.6)',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        border: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'default',
                        overflow: 'hidden'
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                      >
                        <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{
                          width: '32px', height: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', marginRight: '10px', padding: '5px'
                        }}>
                          <img
                            src={skill.img}
                            alt={skill.name}
                            onError={(e) => { e.target.style.display = 'none'; }}
                            style={{
                              width: '100%', height: '100%', objectFit: 'contain',
                              filter: skill.invert
                                ? 'invert(1) brightness(1.25) contrast(1.15)'
                                : 'brightness(1.06) contrast(1.05)',
                            }}
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center overflow-hidden">
                          <p className="mb-0 fw-semibold text-truncate" style={{ fontSize: '0.85rem', color: '#f8fafc', lineHeight: '1.2' }}>{skill.name}</p>
                        </div>
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
      <section className="pt-0 pb-5" id="projects">
        <Projects />
      </section>

      {/* Experience Section */}
      <section className="py-5" id="experience">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title" style={{ width: '145px' }}>EXPERIENCE</h2>
            <div className="section-line"></div>
          </div>

          {/* PRIMARY: Real Internship */}
          <div className="mt-5" data-aos="fade-up">
            <div className="position-relative p-4 p-md-5" style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(15,23,42,0.9) 100%)',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: '16px',
              boxShadow: '0 0 40px rgba(16,185,129,0.06), 0 20px 60px rgba(0,0,0,0.4)',
            }}>
              {/* Glow blob */}
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}></div>

              <div className="position-relative" style={{ zIndex: 1 }}>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-2">
                  <div className="d-flex align-items-center gap-3">
                    {/* Icon badge */}
                    <div className="d-flex align-items-center justify-content-center rounded-3 shadow" style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #10b981, #059669)', flexShrink: 0 }}>
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0" style={{ color: '#f8fafc', fontSize: '1.3rem' }}>Full Stack Developer Intern</h4>
                      <p className="mb-0 mt-1" style={{ color: '#10b981', fontWeight: '600', fontSize: '0.95rem' }}>EncodersPro Private Limited · Noida, India</p>
                    </div>
                  </div>
                  <span style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', borderRadius: '30px', padding: '6px 18px', fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    June 2025 – August 2025
                  </span>
                </div>

                <hr style={{ borderColor: 'rgba(255,255,255,0.07)', margin: '1.5rem 0' }} />

                <ul className="d-flex flex-column gap-3 mb-4" style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {[
                    'Contributed to full-stack tasks in a production engineering team using Agile/Scrum workflows',
                    'Developed and reviewed React.js and Node.js features, participating in code reviews and sprint planning',
                    'Implemented 3+ new UI components and REST API endpoints, reducing bug backlog by 20%',
                  ].map((item, i) => (
                    <li key={i} className="d-flex align-items-start gap-3" style={{ color: '#94a3b8', fontSize: '0.97rem' }}>
                      <span style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }}>▸</span>
                      {item}
                    </li>
                  ))}

                  {/* Impact Highlight */}
                  <li className="d-flex align-items-center gap-3 mt-1 p-3 rounded" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <span style={{ color: '#10b981', flexShrink: 0, fontSize: '1.2rem', lineHeight: 1 }}>⚡</span>
                    <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: '600', letterSpacing: '0.3px' }}>
                      Reduced bug backlog by 20% — measurable production impact in a real engineering team
                    </span>
                  </li>
                </ul>

                <div className="d-flex flex-wrap gap-2">
                  {['React.js', 'Node.js', 'REST APIs', 'Agile/Scrum', 'Code Reviews', 'MongoDB'].map(tag => (
                    <span key={tag} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', borderRadius: '6px', padding: '4px 14px', fontSize: '0.8rem', fontWeight: '500' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY: Independent Projects */}
          <div className="mt-4" data-aos="fade-up" data-aos-delay="100">
            <div className="p-4 p-md-4" style={{
              background: 'rgba(15,23,42,0.4)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px',
            }}>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '42px', height: '42px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#cbd5e1', fontSize: '1.05rem' }}>Independent Projects</h5>
                    <p className="mb-0 mt-1" style={{ color: '#64748b', fontWeight: '500', fontSize: '0.88rem' }}>Self-Directed · Remote</p>
                  </div>
                </div>
                <span style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b', borderRadius: '30px', padding: '4px 14px', fontSize: '0.82rem', fontWeight: '500', whiteSpace: 'nowrap' }}>
                  Jan 2025 – Present
                </span>
              </div>

              <ul className="d-flex flex-column gap-2 mb-0" style={{ listStyle: 'none', paddingLeft: 0 }}>
                {[
                  { text: 'Built and deployed DevConnect — real-time developer network with Socket.io and JWT auth', link: 'https://devconnect2026.vercel.app/', color: '#8b5cf6' },
                  { text: 'Architected NotifyX — distributed notification platform with BullMQ, Redis Pub/Sub, and two-layer idempotency', link: 'https://github.com/imsumit28/NotifyX', color: '#3b82f6' },
                  { text: 'Engineered CollabDocs — collaborative editor with Y.js CRDT, 45+ test cases, and Groq AI integration', link: 'https://collabdocs2026.vercel.app/', color: '#10b981' },
                ].map((item, i) => (
                  <li key={i} className="d-flex align-items-start gap-3" style={{ color: '#64748b', fontSize: '0.92rem' }}>
                    <span style={{ color: '#475569', marginTop: '3px', flexShrink: 0 }}>▸</span>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none', transition: 'all 0.2s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.target.style.color = item.color; }} onMouseLeave={(e) => { e.target.style.color = '#64748b'; }}>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Education Section */}
      <section className="py-5" id="education">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title" style={{ minWidth: 'max-content', paddingRight: '20px' }}>Education & Learning</h2>
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
                      onError={(e) => {
                        if (!e.target.dataset.retried) {
                          e.target.dataset.retried = 'true';
                          e.target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/1200px-Vellore_Institute_of_Technology_seal_2017.svg.png';
                        }
                      }}
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
                      Academic Projects
                    </h6>
                    <p className="fw-bold mb-3" style={{ color: '#f8fafc', fontSize: '1rem' }}>
                      Open Source Audit & Automation Capstone (OSS – NGMC)
                    </p>
                    <ul className="list-mobile-padding" style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                      <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                        <span>Developed 5 Bash scripts for system reporting and auditing, reducing manual effort by 40%.</span>
                      </li>
                      <li className="d-flex align-items-start gap-2" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#10b981', fontSize: '1rem', flexShrink: 0 }}>▸</span>
                        <span>
                          Audited Python (OSS) and built an interactive Manifesto Generator.{' '}
                          <a href="https://github.com/imsumit28/Vityarthi-Open-Source-OSS" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>GitHub →</a>
                        </span>
                      </li>
                    </ul>
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
                      src="/cbse.svg"
                      onError={(e) => {
                        if (!e.target.dataset.retried) {
                          e.target.dataset.retried = 'true';
                          e.target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/CBSE_new_logo.svg/1200px-CBSE_new_logo.svg.png';
                        }
                      }}
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
            <h2 className="section-title">RESUME</h2>
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
                    Full Stack Developer
                  </h4>
                  <p className="mb-4" style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7 }}>
                    Get a detailed overview of my technical skills, hands-on experience, and educational background.
                  </p>

                  <div className="mb-4 d-flex flex-column gap-3">
                    <div>
                      <span className="badge rounded-pill" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)', padding: '8px 14px', fontSize: '0.9rem', fontWeight: '500' }}>
                        PDF • Updated April 2026
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <a
                      href="/resume.pdf"
                      download="Sumit_Kumar_Full_Stack_Developer_resume.pdf"
                      className="btn-global btn-global-primary text-decoration-none"
                      style={{ padding: '14px 32px', fontSize: '1.05rem' }}
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
                        <iframe
                          src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                          title="Resume PDF"
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                            background: '#fff',
                            border: 'none'
                          }}
                        >
                          <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4 text-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#1e293b' }}>
                            <p style={{ color: '#cbd5e1', marginBottom: '15px' }}>Preview not available in this browser.</p>
                            <a href="/resume.pdf" download="Sumit_Kumar_Resume.pdf" className="btn-global btn-global-primary">
                              Download PDF Instead
                            </a>
                          </div>
                        </iframe>
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
            <h2 className="section-title">CONTACT</h2>
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
                <div className="d-flex align-items-center gap-2 mb-4" style={{ fontSize: '0.85rem' }}>
                  <span style={{ color: '#10b981', display: 'inline-block', transform: 'scale(1.2)' }}>●</span>
                  <span style={{ color: '#94a3b8', fontWeight: '500' }}>Available for new opportunities</span>
                </div>
                <p className="mb-4" style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1.05rem' }}>
                  Open to internships, freelance, and full-time opportunities. Feel free to connect!
                </p>

                <div className="d-flex flex-column gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(16,185,129,0.15)' }}>
                  <a href="mailto:ersumitkumar45@gmail.com?subject=Connecting%20from%20your%20Portfolio&body=Hi%20Sumit,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity%20with%20you!%0A%0A" className="d-flex align-items-center gap-3 text-decoration-none" style={{ color: '#cbd5e1', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.color = '#10b981'; e.currentTarget.style.textDecoration = 'underline'; }} onMouseOut={(e) => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.textDecoration = 'none'; }}>
                    <div className="d-flex align-items-center justify-content-center rounded" style={{ width: '40px', height: '40px', background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                      <FaEnvelope size={18} />
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>ersumitkumar45@gmail.com</span>
                  </a>

                   <a href="https://linkedin.com/in/imsumit45/" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-3 text-decoration-none" style={{ color: '#cbd5e1', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.color = '#10b981'; e.currentTarget.style.textDecoration = 'underline'; }} onMouseOut={(e) => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.textDecoration = 'none'; }}>
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
