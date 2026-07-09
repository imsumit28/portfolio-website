import React, { Suspense, useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaMobileAlt, FaBriefcase, FaCode, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import Projects from './Projects';
import ContactForm from '../components/ContactForm';
import profileImg from '../assets/profile-new.jpeg';
import profileImgWebp from '../assets/profile-new.webp';
import profileVideo from '../assets/profile-video.mp4';
import aboutDevconnectImg from '../assets/about-devconnect.png';

const terminalLines = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Full-stack engineer focused on scalable systems & real-time apps' },
  { type: 'cmd', text: 'cat work.txt' },
  { type: 'out', text: 'Real-time collaborative editor · syncing at <200ms latency' },
  { type: 'cmd', text: 'cat philosophy.txt' },
  { type: 'out', text: 'I build production-grade systems, not CRUD demos' },
];

const Home = () => {
  const [terminalStep, setTerminalStep] = useState(0);
  // Mobile browsers (iOS Safari, Android Chrome) can't render PDFs inside an
  // iframe, and the iframe's child fallback markup never renders there either.
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setIsTouchDevice(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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

  return (
    <div>
      {/* Hero Section */}
      <section className="d-flex align-items-center position-relative home-editorial" style={{ minHeight: '85vh', overflow: 'hidden' }} id="home">
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
                  maxWidth: '600px',
                  background: 'rgba(2, 6, 23, 0.85)',
                  border: '1px solid rgba(245,158,11,0.18)',
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
                          <span style={{ color: '#fbbf24', marginRight: 8 }}>$</span>
                          <span style={{ color: '#f8fafc' }}>{line.text}</span>
                        </>
                      ) : (
                        <span style={{ color: '#94a3b8', marginLeft: 14 }}>{line.text}</span>
                      )}
                    </div>
                  ))}
                  {terminalStep >= terminalLines.length && (
                    <div>
                      <span style={{ color: '#fbbf24', marginRight: 8 }}>$</span>
                      <span
                        style={{
                          display: 'inline-block',
                          color: '#fbbf24',
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
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(245,158,11,0.30)',
                    color: 'rgba(248,250,252,0.92)',
                  }}
                >
                  5 Projects, All Deployed
                </span>
                <span style={{ opacity: 0.7 }}>•</span>
                <span
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(245,158,11,0.30)',
                    color: 'rgba(248,250,252,0.92)',
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
                  { href: 'https://github.com/imsumit28', icon: <FaGithub size={16} />, label: 'GitHub', color: '#fbbf24', shadow: 'rgba(245,158,11,0.35)', target: '_blank' },
                  { href: 'https://x.com/imsumit4545', icon: <FaXTwitter size={16} />, label: 'Follow', color: '#f8fafc', shadow: 'rgba(248,250,252,0.2)', target: '_blank' },
                  { href: 'mailto:ersumitkumar45@gmail.com?body=Hello%20Sumit%2C%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0AThank%20you.', icon: <FaEnvelope size={16} />, label: 'Say Hi', color: '#fbbf24', shadow: 'rgba(245,158,11,0.35)', target: '_self' },
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
                <picture>
                  <source srcSet={profileImgWebp} type="image/webp" />
                  <img
                    src={profileImg}
                    alt="Sumit Kumar"
                    className="hero-photo-img"
                    loading="eager"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="pt-5 pb-3 about-editorial" id="about">
        <div className="container py-2">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title">Who I Am</h2>
            <div className="section-line"></div>
          </div>

          {/* Editorial header */}
          <header className="ce-header" data-aos="fade-up">
            <span className="ce-kicker">About / 00</span>
            <h2 className="ce-headline">
              I ship real-time<br />systems<span className="ce-dot">.</span>
            </h2>
            <p className="ce-lead">
              Full Stack Developer focused on real-time systems and scalable backend
              architecture — every project I build is deployed and live, not a localhost demo.
            </p>
          </header>

          <div className="row mt-5 align-items-start" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-4 col-md-5 mb-5 mb-md-0 text-center text-md-start">
              <div className="about-photo-frame mx-auto mx-md-0">
                <video
                  autoPlay
                  muted
                  playsInline
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
                  <span className="about-bullet">{'>'}</span> <strong>Email:</strong>&nbsp; <button onClick={() => scrollToSection('contact')} style={{ background: 'none', border: 'none', color: '#fbbf24', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}>Available via Contact Form</button>
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
                <strong>Built:</strong>
              </p>
              <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '1rem', color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://paperpilot2026.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(245,158,11,0.45)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#fbbf24'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(245,158,11,0.45)'}>Paper Pilot</a> → AI-powered exam-paper generator with queue-based LLM pipeline</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://collabdocs2026.vercel.app/login" target="_blank" rel="noopener noreferrer" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(245,158,11,0.45)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#fbbf24'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(245,158,11,0.45)'}>CollabDocs</a> → CRDT-based collaborative editor with AI assistance</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://github.com/imsumit28/NotifyX" target="_blank" rel="noopener noreferrer" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(245,158,11,0.45)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#fbbf24'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(245,158,11,0.45)'}>NotifyX</a> → distributed notification system using Redis & BullMQ</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://curlix.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(245,158,11,0.45)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#fbbf24'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(245,158,11,0.45)'}>Curlix</a> → production-grade URL shortener with sub-10 ms redirects & async analytics</li>
                <li style={{ marginBottom: '0.5rem' }}>▸ <a href="https://devconnect2026.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 700, borderBottom: '1px dashed rgba(245,158,11,0.45)', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#fbbf24'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(245,158,11,0.45)'}>DevConnect</a> → real-time developer network</li>
              </ul>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
                All projects are deployed, handle real-time interactions, and solve concurrency problems. Every project I ship is deployed and live, not just a localhost demo.
              </p>
              <p className="mb-4" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
                Currently <strong>open to full-time roles</strong>, remote or India-based.
              </p>

              <p className="mb-5 fst-italic" style={{ color: '#fbbf24', fontSize: '1.1rem', borderLeft: '2px solid rgba(245,158,11,0.45)', paddingLeft: '15px' }}>
                "The interesting problems happen when two users hit save at the same time. That's what I build for."
              </p>

              {/* Badges */}
              <div className="mb-5 d-flex flex-wrap gap-3">
                <div
                  className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm"
                  style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24', fontWeight: '500', fontSize: '0.9rem', cursor: 'default', transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease' }}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, { background: '#f59e0b', color: '#1a1204', borderColor: '#f59e0b', boxShadow: '0 6px 20px rgba(245,158,11,0.35)' })}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(245,158,11,0.12)', color: '#fbbf24', borderColor: 'rgba(245,158,11,0.35)', boxShadow: '' })}
                >
                  <FaBriefcase className="me-2" size={14} /> Open to Full-time Roles
                </div>
                <div
                  className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm"
                  style={{ background: 'transparent', border: '1px solid rgba(148,163,184,0.3)', color: '#cbd5e1', fontWeight: '500', fontSize: '0.9rem', cursor: 'default', transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease' }}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, { background: 'rgba(245,158,11,0.1)', color: '#fbbf24', borderColor: 'rgba(245,158,11,0.5)', boxShadow: '' })}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'transparent', color: '#cbd5e1', borderColor: 'rgba(148,163,184,0.3)', boxShadow: '' })}
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
          <div className="github-calendar-section ca-editorial" data-aos="fade-up" data-aos-delay="150">
            <div className="section-title-wrapper mb-4">
              <h2 className="section-title" style={{ minWidth: 'auto' }}>CODE ACTIVITY</h2>
              <div className="section-line"></div>
            </div>

            <div className="ca-panel">
              <div className="ca-head">
                <div>
                  <p className="ca-kicker">GitHub · @imsumit28</p>
                  <p className="ca-sub">Contribution activity over the past year</p>
                </div>
                <a
                  href="https://github.com/imsumit28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ca-link"
                >
                  <FaGithub size={14} /> View profile ↗
                </a>
              </div>

              <div className="github-calendar-inner ca-grid">
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
                      dark: ['#1c2534', '#4d3610', '#8a5e16', '#d18f1e', '#fcd34d'],
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
      <section className="py-5 experience-editorial" id="experience">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title" style={{ width: '145px' }}>EXPERIENCE</h2>
            <div className="section-line"></div>
          </div>

          {/* Editorial header */}
          <header className="ce-header" data-aos="fade-up">
            <span className="ce-kicker">Experience / 01</span>
            <h2 className="ce-headline">
              Where I&apos;ve<br />shipped in production<span className="ce-dot">.</span>
            </h2>
            <p className="ce-lead">
              Hands-on engineering work — building and maintaining real product
              features alongside senior engineers and QA.
            </p>
          </header>

          <motion.div
            className="exp-grid mt-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Left rail: period + status */}
            <aside className="exp-rail">
              <span className="exp-mono-label">2025</span>
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

            {/* Timeline node */}
            <div className="exp-node" aria-hidden="true">
              <span className="exp-node-dot" />
              <span className="exp-node-line" />
            </div>

            {/* Main column */}
            <div className="exp-main">
              <header className="exp-head">
                <p className="exp-company">EncodersPro Private Limited</p>
                <h3 className="exp-role">Full&nbsp;Stack Developer Intern</h3>
              </header>

              {/* Featured metric */}
              <div className="exp-metric">
                <span className="exp-metric-num">20<span>%</span></span>
                <span className="exp-metric-text">
                  reduction in bug backlog,<br className="d-none d-sm-inline" /> shipped alongside engineering &amp; QA.
                </span>
              </div>

              {/* Contributions — numbered editorial list */}
              <ol className="exp-list">
                {experienceContributions.map((item, idx) => (
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
                {experienceTechnologies.map((tech) => (
                  <span key={tech} className="exp-tech-item">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

{/* Projects Section */}
      <section className="pt-0 pb-5" id="projects">
        <Projects />
      </section>

{/* Skills Section */}
      <section className="pt-5 pb-0 skills-editorial" id="skills">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title">SKILLS</h2>
            <div className="section-line"></div>
          </div>

          {/* Editorial header */}
          <header className="ce-header" data-aos="fade-up">
            <span className="ce-kicker">Toolkit / 03</span>
            <h2 className="ce-headline">
              The tools I<br />reach for<span className="ce-dot">.</span>
            </h2>
            <p className="ce-lead">
              A working stack for building and shipping full-stack, real-time
              applications — from interface to infrastructure.
            </p>
          </header>

          <div className="sk-list-wrap">
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
              <div className="sk-cat" key={section.category} data-aos="fade-up" data-aos-delay={idx * 60}>
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
                          onError={(e) => { e.target.style.display = 'none'; }}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-5 education-editorial" id="education">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title">EDUCATION</h2>
            <div className="section-line"></div>
          </div>

          {/* Editorial header */}
          <header className="ce-header" data-aos="fade-up">
            <span className="ce-kicker">Academics / 04</span>
            <h2 className="ce-headline">
              Foundations,<br />formally<span className="ce-dot">.</span>
            </h2>
            <p className="ce-lead">
              Where I picked up the fundamentals — computer science theory, systems
              thinking, and the habit of shipping real projects alongside coursework.
            </p>
          </header>

          <div className="edu-timeline">
            {/* Primary: VIT */}
            <article className="edu-entry" data-aos="fade-up">
              <div className="edu-rail">
                <img
                  src="/vit.jpg"
                  onError={(e) => {
                    if (!e.target.dataset.retried) {
                      e.target.dataset.retried = 'true';
                      e.target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/1200px-Vellore_Institute_of_Technology_seal_2017.svg.png';
                    }
                  }}
                  alt="VIT"
                  className="edu-logo"
                />
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
            </article>

            {/* Secondary: CBSE */}
            <article className="edu-entry" data-aos="fade-up" data-aos-delay="100">
              <div className="edu-rail">
                <img
                  src="/cbse.svg"
                  onError={(e) => {
                    if (!e.target.dataset.retried) {
                      e.target.dataset.retried = 'true';
                      e.target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/CBSE_new_logo.svg/1200px-CBSE_new_logo.svg.png';
                    }
                  }}
                  alt="CBSE"
                  className="edu-logo edu-logo--sm"
                />
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
            </article>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-5 resume-editorial" id="resume">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title">RESUME</h2>
            <div className="section-line"></div>
          </div>

          {/* Editorial header */}
          <header className="ce-header" data-aos="fade-up">
            <span className="ce-kicker">Curriculum vitae / 05</span>
            <h2 className="ce-headline">
              The full story,<br />on one page<span className="ce-dot">.</span>
            </h2>
            <p className="ce-lead">
              A detailed overview of my technical skills, hands-on experience, and
              educational background — kept current and ready to download.
            </p>
          </header>

          <div className="re-grid">
            {/* Left: spec + actions */}
            <div data-aos="fade-up">
              <p className="ce-col-label">Document</p>

              <div className="re-spec">
                {[
                  ['Role', 'Full Stack Developer'],
                  ['Format', 'PDF · A4'],
                  ['Updated', 'April 2026'],
                  ['Length', 'One page'],
                ].map(([k, v], i) => (
                  <div className="ce-detail" key={k}>
                    <span className="ce-detail-idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ce-detail-k">{k}</span>
                    <span className="ce-detail-v">{v}</span>
                  </div>
                ))}
              </div>

              <a
                href="/resume.pdf"
                download="Sumit_Kumar_Full_Stack_Developer_Resume.pdf"
                className="re-download"
              >
                Download Resume
              </a>
              <br />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="re-view-link"
              >
                Open in new tab ↗
              </a>
            </div>

            {/* Right: PDF preview */}
            <div className="re-preview" data-aos="fade-up" data-aos-delay="100">
              <span className="re-frame-tag">resume.pdf</span>
              <div className="re-frame">
                <div className="re-frame-clip">
                  <div className="re-frame-crop">
                    {isTouchDevice ? (
                      <div className="re-frame-fallback">
                        <p style={{ margin: 0 }}>PDF preview isn't supported on this device.</p>
                        <a href="/resume.pdf" download="Sumit_Kumar_Full_Stack_Developer_Resume.pdf" className="re-download">
                          Download PDF Instead
                        </a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="re-view-link">
                          Open in new tab ↗
                        </a>
                      </div>
                    ) : (
                      <iframe
                        src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                        title="Resume PDF"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 contact-editorial" id="contact">
        <div className="container py-4">
          <div className="section-title-wrapper" data-aos="fade-right">
            <h2 className="section-title">CONTACT</h2>
            <div className="section-line"></div>
          </div>

          {/* Editorial header */}
          <header className="ce-header" data-aos="fade-up">
            <span className="ce-kicker">Get in touch / 06</span>
            <h2 className="ce-headline">
              Let&apos;s build<br />something good<span className="ce-dot">.</span>
            </h2>
            <p className="ce-lead">
              Open to internships, freelance, and full-time roles. Have a project,
              a role to fill, or just want to trade ideas?
            </p>
            <dl className="ce-stats">
              <div className="ce-stat">
                <dt>Average response</dt>
                <dd>6–12 hours</dd>
              </div>
              <div className="ce-stat">
                <dt>Current status</dt>
                <dd>
                  <span className="ce-status-dot"></span>
                  Available
                </dd>
              </div>
              <div className="ce-stat">
                <dt>Timezone</dt>
                <dd>IST (UTC+5:30)</dd>
              </div>
            </dl>
          </header>

          <div className="ce-grid">
            {/* Left: direct contact + socials */}
            <div data-aos="fade-up">
              <p className="ce-col-label">Reach me directly</p>

              {[
                { k: 'Email', v: 'ersumitkumar45@gmail.com', link: 'mailto:ersumitkumar45@gmail.com?subject=Connecting%20from%20your%20Portfolio' },
                { k: 'Phone', v: '+91 8210240106', link: 'tel:+918210240106' },
                { k: 'Location', v: 'Patna, India' },
              ].map((item, i) => {
                const idx = String(i + 1).padStart(2, '0');
                const external = Boolean(item.link) && item.link.startsWith('http');
                return (
                  <a
                    key={item.k}
                    className="ce-detail"
                    href={item.link || undefined}
                    {...(item.link
                      ? { role: 'button', target: external ? '_blank' : undefined, rel: external ? 'noopener noreferrer' : undefined }
                      : {})}
                  >
                    <span className="ce-detail-idx">{idx}</span>
                    <span className="ce-detail-k">{item.k}</span>
                    <span className="ce-detail-v">{item.v}</span>
                  </a>
                );
              })}

              <p className="ce-social-label">Elsewhere</p>
              <div className="ce-social-row">
                {[
                  { icon: <FaGithub size={20} />, href: 'https://github.com/imsumit28', label: 'GitHub' },
                  { icon: <FaLinkedinIn size={20} />, href: 'https://www.linkedin.com/in/imsumit45/', label: 'LinkedIn' },
                  { icon: <FaXTwitter size={20} />, href: 'https://x.com/imsumit4545', label: 'X' },
                ].map((s) => (
                  <a
                    key={s.label}
                    className="ce-social"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div data-aos="fade-up" data-aos-delay="100">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
