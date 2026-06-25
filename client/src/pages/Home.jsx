import React, { Suspense, useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaReact, FaServer, FaDatabase, FaMobileAlt, FaShieldAlt, FaBriefcase, FaCode, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import Projects from './Projects';
import ContactForm from '../components/ContactForm';
import profileImg from '../assets/profile.png';
import profileVideo from '../assets/profile-video.mp4';
import aboutDevconnectImg from '../assets/about-devconnect.png';

const terminalLines = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Full-stack engineer focused on scalable systems & real-time apps' },
  { type: 'cmd', text: 'cat work.txt' },
  { type: 'out', text: 'Real-time collaborative editor syncing updates across users (<200ms latency)' },
  { type: 'cmd', text: 'cat philosophy.txt' },
  { type: 'out', text: 'I build production-grade systems, not CRUD demos' },
];

const Home = () => {
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    if (terminalStep >= terminalLines.length) return;
    const delay = terminalLines[terminalStep].type === 'cmd' ? 650 : 350;
    const t = setTimeout(() => setTerminalStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [terminalStep]);

  const scrollToSection = (sectionId) => {
    const el = sectionId === 'home' ? document.body : document.getElementById(sectionId);
    if (!el) return;

    const top = sectionId === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const experienceContributions = [
    'Developed React.js frontend features used in production.',
    'Built and maintained Node.js REST APIs for core product workflows.',
    'Worked with MongoDB queries and backend integrations across modules.',
    'Investigated and resolved production bugs with engineering and QA teams.',
  ];

  const experienceTechnologies = ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Git', 'Agile'];

  const areasOfWork = [
    { title: 'Frontend Development', subtitle: 'React.js Components', icon: <FaReact size={16} /> },
    { title: 'Backend APIs', subtitle: 'Node.js + Express', icon: <FaServer size={16} /> },
    { title: 'Database', subtitle: 'MongoDB', icon: <FaDatabase size={16} /> },
    { title: 'Bug Fixing', subtitle: 'Production Support', icon: <FaShieldAlt size={16} /> },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="d-flex align-items-center position-relative" style={{ minHeight: '85vh', overflow: 'hidden' }} id="home">
        <div className="hero-bg-glow"></div>
        <div className="container ps-md-5 position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h1 className="hero-name">Hi, I'm <span className="text-accent">Sumit</span> Kumar</h1>

              <p
                className="mt-3 mb-0"
                style={{
                  color: '#cbd5e1',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  maxWidth: '580px',
                }}
              >
                Built real-time apps with WebSockets, handling concurrent users and live updates with low latency.
              </p>

              {/* Terminal-style intro */}
              <div
                className="mt-4 hero-terminal"
                style={{
                  maxWidth: '520px',
                  background: 'rgba(2, 6, 23, 0.85)',
                  border: '1px solid rgba(16,185,129,0.18)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  fontFamily: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    background: 'rgba(15,23,42,0.9)',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ marginLeft: 8, color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.3px' }}>
                    sumit@portfolio: ~
                  </span>
                </div>
                <div
                  style={{
                    padding: '18px 20px',
                    fontSize: '0.86rem',
                    lineHeight: 2.1,
                    color: '#cbd5e1',
                    minHeight: '210px',
                  }}
                >
                  {terminalLines.map((line, i) => (
                    <div
                      key={`${line.type}-${i}`}
                      style={{
                        opacity: terminalStep > i ? 1 : 0,
                        transform: terminalStep > i ? 'translateY(0)' : 'translateY(4px)',
                        transition: 'opacity 0.25s ease, transform 0.25s ease',
                      }}
                    >
                      {line.type === 'cmd' ? (
                        <>
                          <span style={{ color: '#10b981', marginRight: 8 }}>$</span>
                          <span style={{ color: '#f8fafc' }}>{line.text}</span>
                        </>
                      ) : (
                        <span style={{ color: '#94a3b8', marginLeft: 14 }}>{line.text}</span>
                      )}
                    </div>
                  ))}
                  {terminalStep >= terminalLines.length && (
                    <div>
                      <span style={{ color: '#10b981', marginRight: 8 }}>$</span>
                      <span
                        style={{
                          display: 'inline-block',
                          color: '#10b981',
                          animation: 'heroBlink 1s steps(2) infinite',
                        }}
                      >
                        _
                      </span>
                    </div>
                  )}
                </div>
              </div>

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
                  5 Projects, All Deployed
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
                  download="Sumit_Kumar_Full_Stack_Developer_Resume.pdf"
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

            </div>

            <div className="col-lg-5 mt-5 mt-lg-0 text-center" data-aos="fade-left" data-aos-delay="200">
              <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
                {[
                  { href: 'https://www.linkedin.com/in/imsumit45/', icon: <FaLinkedinIn size={16} />, label: 'Connect', color: '#3b82f6', shadow: 'rgba(59,130,246,0.35)', target: '_blank' },
                  { href: 'https://github.com/imsumit28', icon: <FaGithub size={16} />, label: 'GitHub', color: '#10b981', shadow: 'rgba(16,185,129,0.35)', target: '_blank' },
                  { href: 'https://x.com/imsumit4545', icon: <FaXTwitter size={16} />, label: 'Follow', color: '#f8fafc', shadow: 'rgba(248,250,252,0.2)', target: '_blank' },
                  { href: 'mailto:ersumitkumar45@gmail.com?body=Hello%20Sumit%2C%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0AThank%20you.', icon: <FaEnvelope size={16} />, label: 'Say Hi', color: '#10b981', shadow: 'rgba(16,185,129,0.35)', target: '_self' },
                ].map(({ href, icon, label, color, shadow, target }) => (
                  <a
                    key={label}
                    href={href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-decoration-none d-flex flex-column align-items-center gap-1"
                    style={{ transition: 'transform 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; Object.assign(e.currentTarget.querySelector('.cta-icon-box').style, { borderColor: color, boxShadow: `0 6px 20px ${shadow}`, color }); e.currentTarget.querySelector('.cta-label').style.color = color; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; Object.assign(e.currentTarget.querySelector('.cta-icon-box').style, { borderColor: 'rgba(255,255,255,0.08)', boxShadow: '', color: '#94a3b8' }); e.currentTarget.querySelector('.cta-label').style.color = '#64748b'; }}
                  >
                    <div
                      className="cta-icon-box d-flex align-items-center justify-content-center"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: 'rgba(15,23,42,0.7)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#94a3b8',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
                      }}
                    >
                      {icon}
                    </div>
                    <span
                      className="cta-label"
                      style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.3px', transition: 'color 0.2s ease' }}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>

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
                  <a href="/resume.pdf" download="Sumit_Kumar_Full_Stack_Developer_Resume.pdf" className="btn-global btn-global-secondary w-100" style={{ maxWidth: '300px', fontSize: '0.95rem' }}>
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
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://paperpilot2026.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(16,185,129,0.4)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#10b981'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(16,185,129,0.4)'}>Paper Pilot</a> → AI-powered exam-paper generator with queue-based LLM pipeline</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://collabdocs2026.vercel.app/login" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(16,185,129,0.4)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#10b981'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(16,185,129,0.4)'}>CollabDocs</a> → CRDT-based collaborative editor with AI assistance</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://github.com/imsumit28/NotifyX" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(16,185,129,0.4)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#10b981'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(16,185,129,0.4)'}>NotifyX</a> → distributed notification system using Redis & BullMQ</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://curlix.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(16,185,129,0.4)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#10b981'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(16,185,129,0.4)'}>Curlix</a> → production-grade URL shortener with sub-10 ms redirects & async analytics</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://devconnect2026.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(16,185,129,0.4)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#10b981'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(16,185,129,0.4)'}>DevConnect</a> → real-time developer network</li>
              </ul>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
                All projects are deployed, handle real-time interactions, and solve concurrency problems. Every project I ship is deployed and live, not just a localhost demo.
              </p>
              <p className="mb-4" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
                Currently <strong>open to full-time roles</strong>, remote or India-based.
              </p>

              <p className="mb-5 fst-italic" style={{ color: '#10b981', fontSize: '1.1rem', borderLeft: '2px solid rgba(16,185,129,0.4)', paddingLeft: '15px' }}>
                "The interesting problems happen when two users hit save at the same time. That's what I build for."
              </p>

              {/* Badges */}
              <div className="mb-5 d-flex flex-wrap gap-3">
                <div
                  className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6', fontWeight: '500', fontSize: '0.9rem', cursor: 'default', transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease' }}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, { background: '#3b82f6', color: '#fff', borderColor: '#3b82f6', boxShadow: '0 6px 20px rgba(59,130,246,0.35)' })}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(59,130,246,0.1)', color: '#3b82f6', borderColor: 'rgba(59,130,246,0.3)', boxShadow: '' })}
                >
                  <FaBriefcase className="me-2" size={14} /> Open to Full-time Roles
                </div>
                <div
                  className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontWeight: '500', fontSize: '0.9rem', cursor: 'default', transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease' }}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, { background: '#10b981', color: '#fff', borderColor: '#10b981', boxShadow: '0 6px 20px rgba(16,185,129,0.35)' })}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(16,185,129,0.1)', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', boxShadow: '' })}
                >
                  <FaCode className="me-2" size={14} /> React · Node.js · TypeScript · Redis
                </div>
              </div>

              {/* Quick Stat Cards */}
              <div className="row g-3 mb-5">
                {[
                  { icon: <FaRocket size={20} className="text-accent" />, label: 'Projects Shipped', val: '5', sub: 'Deployed & Live' },
                  { icon: <FaCode size={20} className="text-accent" />, label: 'Tech Stack', val: 'React, Node, MongoDB' },
                  { icon: <FaMapMarkerAlt size={20} className="text-accent" />, label: 'Location', val: 'Patna, India' },
                  { icon: <FaBriefcase size={20} className="text-accent" />, label: 'Status', val: 'Open to Work' }
                ].map((stat) => (
                  <div className="col-sm-6 col-lg-3 col-6" key={stat.label}>
                    <div className="p-3 rounded-3 h-100 d-flex flex-column" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <span style={{ flexShrink: 0 }}>{stat.icon}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700', lineHeight: '1.2' }}>{stat.label}</span>
                      </div>
                      <div className="mt-auto" style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem', lineHeight: '1.4' }}>
                        {stat.val}
                        {stat.sub && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.sub}</div>}
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
                    animation: 'pulse 0.8s ease-in-out infinite'
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

      {/* Experience Section */}
      <section className="py-5" id="experience">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title" style={{ width: '145px' }}>EXPERIENCE</h2>
            <div className="section-line"></div>
          </div>
          <motion.div
            className="mt-5"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="rounded-4 p-4 p-md-5 backdrop-blur-sm"
              style={{
                background: 'linear-gradient(145deg, rgba(7,18,41,0.85) 0%, rgba(2,8,23,0.92) 100%)',
                border: '1px solid rgba(45,212,191,0.28)',
                boxShadow: '0 18px 42px rgba(0,0,0,0.38), 0 0 0 1px rgba(45,212,191,0.12)',
              }}
            >
              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-4">
                  <div className="d-flex align-items-start gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                      style={{
                        width: '56px',
                        height: '56px',
                        background: 'rgba(45,212,191,0.16)',
                        border: '1px solid rgba(45,212,191,0.3)',
                        color: '#5eead4',
                      }}
                      aria-hidden="true"
                    >
                      <FaBriefcase size={22} />
                    </div>
                    <div>
                      <h3 className="mb-1 fw-bold" style={{ color: '#f8fafc', fontSize: 'clamp(1.35rem, 2.5vw, 1.8rem)' }}>
                        Full Stack Developer Intern
                      </h3>
                      <p className="mb-1 fw-semibold" style={{ color: '#cbd5e1', fontSize: '1.05rem' }}>
                        EncodersPro Private Limited
                      </p>
                      <p className="mb-0 d-flex align-items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
                        <FaMapMarkerAlt size={13} aria-hidden="true" />
                        <span>Noida, India</span>
                      </p>
                    </div>
                  </div>

                  <div className="align-self-start">
                    <span
                      className="d-inline-flex align-items-center rounded-pill"
                      style={{
                        background: 'rgba(45,212,191,0.12)',
                        border: '1px solid rgba(45,212,191,0.34)',
                        color: '#5eead4',
                        padding: '8px 14px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        letterSpacing: '0.3px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      June 2025 – August 2025
                    </span>
                  </div>
                </div>

                <hr className="m-0" style={{ borderColor: 'rgba(148,163,184,0.22)' }} />

                <div>
                  <h4 className="mb-2 fw-semibold" style={{ color: '#f8fafc', fontSize: '1.04rem' }}>Key Contributions</h4>
                  <p className="mb-3 fw-semibold" style={{ color: '#5eead4', fontSize: '0.95rem' }}>
                    Reduced 20% bug backlog
                  </p>
                  <ul className="m-0 p-0 d-flex flex-column gap-2" style={{ listStyle: 'none' }}>
                    {experienceContributions.map((item) => (
                      <li key={item} className="d-flex align-items-start gap-2" style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                        <span style={{ color: '#5eead4', marginTop: '1px' }} aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="m-0" style={{ borderColor: 'rgba(148,163,184,0.22)' }} />

                <div>
                  <h4 className="mb-3 fw-semibold" style={{ color: '#f8fafc', fontSize: '1.04rem' }}>Technologies</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {experienceTechnologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-pill"
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(15,23,42,0.72)',
                          border: '1px solid rgba(148,163,184,0.25)',
                          color: '#dbeafe',
                          fontSize: '0.82rem',
                          fontWeight: '500',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <hr className="m-0" style={{ borderColor: 'rgba(148,163,184,0.22)' }} />

                <div>
                  <h4 className="mb-3 fw-semibold" style={{ color: '#f8fafc', fontSize: '1.04rem' }}>Areas of Work</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {areasOfWork.map((area, idx) => (
                      <motion.div
                        key={area.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.45 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                        whileHover={{ y: -3 }}
                        className="rounded-3 p-3"
                        style={{
                          background: 'rgba(15,23,42,0.72)',
                          border: '1px solid rgba(45,212,191,0.2)',
                        }}
                      >
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span style={{ color: '#5eead4' }} aria-hidden="true">{area.icon}</span>
                          <p className="mb-0 fw-semibold" style={{ color: '#f1f5f9', fontSize: '0.92rem' }}>{area.title}</p>
                        </div>
                        <p className="mb-0" style={{ color: '#94a3b8', fontSize: '0.83rem' }}>{area.subtitle}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

{/* Projects Section */}
      <section className="pt-0 pb-5" id="projects">
        <Projects />
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
                <h6 className="mb-3 fw-bold" style={{ color: '#cbd5e1', borderLeft: '2px solid rgba(16,185,129,0.4)', paddingLeft: '10px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {section.category}
                </h6>
                <div className="row g-2">
                  {section.skills.map((skill) => (
                    <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={skill.name}>
                      <div className="d-flex align-items-center p-2 h-100 position-relative" style={{
                        background: 'rgba(15,23,42,0.6)',
                        borderRadius: '8px',
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                        border: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'default',
                        overflow: 'hidden'
                      }}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, { transform: 'translateY(-2px)', borderColor: 'var(--accent)' })}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: 'translateY(0)', borderColor: 'rgba(255,255,255,0.05)' })}
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

      {/* Education Section */}
      <section className="py-4" id="education">
        <div className="container py-2">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title" style={{ minWidth: 'max-content', paddingRight: '20px', fontSize: '1.1rem', opacity: 0.85 }}>Education</h2>
            <div className="section-line"></div>
          </div>

          <div className="row mt-4">
            {/* Primary Focus: VIT */}
            <div className="col-12 mb-3" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3 gap-3">
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
                      style={{ width: '100px', height: '55px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="fw-bold mb-1" style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.4' }}>Vellore Institute of Technology</h5>
                      <p className="text-accent mb-0 fw-medium" style={{ fontSize: '0.85rem' }}>2024 - 2028</p>
                    </div>
                  </div>
                  <h6 className="fw-semibold mb-2" style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>B.Tech. in Computer Science and Engineering</h6>
                  <p className="mb-2" style={{ fontSize: '0.88rem', color: '#94a3b8' }}>CGPA: <span style={{ color: '#10b981', fontWeight: '600' }}>8.03</span> &nbsp;·&nbsp; <span style={{ color: '#94a3b8' }}>Data Structures, DBMS, Operating Systems</span></p>

                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <p className="mb-2" style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Academic Project
                    </p>
                    <p className="fw-semibold mb-2" style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                      Open Source Audit & Automation Capstone (OSS – NGMC)
                    </p>
                    <ul className="list-mobile-padding" style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                      <li className="d-flex align-items-start gap-2 mb-1" style={{ color: '#64748b', fontSize: '0.84rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#10b981', fontSize: '0.9rem', flexShrink: 0 }}>▸</span>
                        <span>Developed 5 Bash scripts for system reporting and auditing, reducing manual effort by 40%.</span>
                      </li>
                      <li className="d-flex align-items-start gap-2" style={{ color: '#64748b', fontSize: '0.84rem', lineHeight: '1.5' }}>
                        <span style={{ color: '#10b981', fontSize: '0.9rem', flexShrink: 0 }}>▸</span>
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
              <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px' }}>
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
                      style={{ width: '38px', height: '38px', objectFit: 'contain', backgroundColor: 'white', padding: '3px' }}
                    />
                    <div className="ms-3">
                      <h6 className="fw-semibold mb-0" style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Central Board Of Secondary Education, Class XII</h6>
                    </div>
                  </div>
                  <div className="text-md-end">
                    <p className="mb-0" style={{ color: '#64748b', fontSize: '0.82rem' }}>May 2021 – May 2023 &nbsp;·&nbsp; <span style={{ color: '#94a3b8', fontWeight: '600' }}>89.4%</span></p>
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
                      download="Sumit_Kumar_Full_Stack_Developer_Resume.pdf"
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
                            <a href="/resume.pdf" download="Sumit_Kumar_Full_Stack_Developer_Resume.pdf" className="btn-global btn-global-primary">
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
                <p className="mb-3" style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1.05rem' }}>
                  Open to internships, freelance, and full-time opportunities. Feel free to connect!
                </p>
                <p className="mb-4" style={{ color: '#64748b', fontSize: '0.88rem' }}>
                  I usually respond within 24 hours.
                </p>

                <div className="d-flex flex-column gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(16,185,129,0.15)' }}>
                  {[
                    { href: 'mailto:ersumitkumar45@gmail.com?subject=Connecting%20from%20your%20Portfolio&body=Hi%20Sumit,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity%20with%20you!%0A%0A', icon: <FaEnvelope size={18} />, label: 'Email Me', sub: 'ersumitkumar45@gmail.com', color: '#10b981', bg: 'rgba(16,185,129,0.1)', target: '_self' },
                    { href: 'https://linkedin.com/in/imsumit45/', icon: <FaLinkedinIn size={18} />, label: 'Connect on LinkedIn', sub: 'linkedin.com/in/imsumit45', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', target: '_blank' },
                    { href: 'https://github.com/imsumit28', icon: <FaGithub size={18} />, label: 'View My Work', sub: 'github.com/imsumit28', color: '#10b981', bg: 'rgba(16,185,129,0.1)', target: '_blank' },
                  ].map(({ href, icon, label, sub, color, bg, target }) => (
                    <a
                      key={label}
                      href={href}
                      target={target}
                      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="d-flex align-items-center gap-3 text-decoration-none"
                      style={{ color: '#cbd5e1', transition: 'color 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.color = color; Object.assign(e.currentTarget.querySelector('.contact-icon-box').style, { background: color, color: '#fff' }); }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#cbd5e1'; Object.assign(e.currentTarget.querySelector('.contact-icon-box').style, { background: bg, color }); }}
                    >
                      <div className="contact-icon-box d-flex align-items-center justify-content-center rounded flex-shrink-0" style={{ width: '42px', height: '42px', background: bg, color, transition: 'background-color 0.2s ease, color 0.2s ease' }}>
                        {icon}
                      </div>
                      <div className="d-flex flex-column">
                        <span style={{ fontSize: '0.95rem', fontWeight: '600', lineHeight: 1.3 }}>{label}</span>
                        <span style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>{sub}</span>
                      </div>
                    </a>
                  ))}
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
