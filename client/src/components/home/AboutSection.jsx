import React, { Suspense } from 'react';
import {
  FaGithub, FaBriefcase, FaCode, FaRocket, FaMapMarkerAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { SOCIAL_LINKS } from '../../data/homeData';
import { fadeUp, fadeRight } from '../../utils/motion';
import useGitHubStats from '../../hooks/useGitHubStats';
import profileVideo from '../../assets/profile-video.mp4';

const GITHUB_USERNAME = 'imsumit28';

const formatNum = (n) => (typeof n === 'number' ? n.toLocaleString() : '—');

const GH_STATS = [
  { key: 'contributions', label: 'commits' },
  { key: 'repos', label: 'repositories' },
  { key: 'stars', label: 'stars' },
];

const STAT_CARDS = [
  { icon: <FaRocket size={20} className="text-accent" />, label: 'Projects Shipped', val: '5', sub: 'Deployed & Live' },
  { icon: <FaCode size={20} className="text-accent" />, label: 'Tech Stack', val: 'React, Node, MongoDB' },
  { icon: <FaMapMarkerAlt size={20} className="text-accent" />, label: 'Location', val: 'Patna, India' },
  { icon: <FaBriefcase size={20} className="text-accent" />, label: 'Status', val: 'Open to Work' },
];

const AboutSection = () => {
  const { stats, loading } = useGitHubStats(GITHUB_USERNAME);

  return (
    <section className="pt-5 pb-3 about-editorial" id="about">
      <div className="container py-2">
        <motion.div className="section-title-wrapper" {...fadeRight()}>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-line"></div>
        </motion.div>

        {/* Editorial header */}
        <motion.header className="ce-header" {...fadeUp()}>
          <span className="ce-kicker">About / 00</span>
          <h2 className="ce-headline">
            I ship real-time<br />systems<span className="ce-dot">.</span>
          </h2>
          <p className="ce-lead">
            Full-stack developer focused on real-time sync and backend architecture.
            Everything below is deployed — you can open every project and try it.
          </p>
        </motion.header>

        <motion.div className="row mt-5 align-items-start" {...fadeUp(100)}>
          <div className="col-lg-4 col-md-5 mb-5 mb-md-0 text-center text-md-start">
            <div className="about-photo-frame mx-auto mx-md-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
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
                <span className="about-bullet">{'>'}</span> <strong>Email:</strong>&nbsp;
                <a href={`mailto:${SOCIAL_LINKS.email}?subject=Connecting%20from%20your%20Portfolio`} className="about-built-link" style={{ fontWeight: 500 }}>
                  {SOCIAL_LINKS.email}
                </a>
              </div>
              <div className="d-flex justify-content-center justify-content-md-start">
                <a href="/resume.pdf" download="Sumit_Kumar_Full_Stack_Developer_Resume.pdf" className="btn-global btn-global-secondary w-100" style={{ maxWidth: '300px', fontSize: '0.95rem' }}>
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7 ps-lg-5">
            <p className="mb-4" style={{ lineHeight: '1.8', color: '#cbd5e1', fontSize: '1.05rem' }}>
              Currently <strong>open to full-time roles</strong>, remote or India-based.
            </p>

            <p className="mb-5 fst-italic" style={{ color: '#fbbf24', fontSize: '1.1rem', borderLeft: '2px solid rgba(245,158,11,0.45)', paddingLeft: '15px' }}>
              "The interesting problems happen when two users hit save at the same time. That's what I build for."
            </p>

            {/* Badges */}
            <div className="mb-5 d-flex flex-wrap gap-3">
              <div className="about-badge about-badge--solid px-4 py-2 rounded-pill shadow-sm">
                <FaBriefcase className="me-2" size={14} /> Open to Full-time Roles
              </div>
              <div className="about-badge about-badge--outline px-4 py-2 rounded-pill shadow-sm">
                <FaCode className="me-2" size={14} /> React · Node.js · TypeScript · Redis
              </div>
            </div>

            {/* Quick Stat Cards */}
            <div className="row g-3 mb-5">
              {STAT_CARDS.map((stat) => (
                <div className="col-sm-6 col-lg-3 col-6" key={stat.label}>
                  <div className="stat-card p-3 rounded-3 h-100 d-flex flex-column">
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
        </motion.div>

        {/* GitHub Contribution Calendar */}
        <motion.div className="github-calendar-section ca-editorial" {...fadeUp(150)}>
          <div className="section-title-wrapper mb-4">
            <h2 className="section-title" style={{ minWidth: 'auto' }}>CODE ACTIVITY</h2>
            <div className="section-line"></div>
          </div>

          <div className="ca-terminal">
            <div className="ca-bar">
              <span className="ca-dot" />
              <span className="ca-dot" />
              <span className="ca-dot" />
              <span className="ca-bar-path">~/github/{GITHUB_USERNAME}</span>
            </div>

            <div className="ca-body">
              <p className="ca-prompt">
                <span className="ca-prompt-sign">$</span>
                git log --author={GITHUB_USERNAME} --since=&quot;1 year ago&quot;
              </p>

              <div className="ca-stats">
                {GH_STATS.map(({ key, label }) => (
                  <div className="ca-stat" key={key}>
                    <span className="ca-stat-num">
                      {loading ? <i className="ca-sk" /> : formatNum(stats?.[key])}
                    </span>
                    <span className="ca-stat-key">{label}</span>
                  </div>
                ))}
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
                    username={GITHUB_USERNAME}
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

              <div className="ca-foot">
                <span className="ca-foot-hint"># one square per day, last 12 months</span>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ca-foot-link"
                >
                  <FaGithub size={14} /> full profile
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
