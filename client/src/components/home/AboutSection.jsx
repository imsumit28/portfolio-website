import React, { Suspense } from 'react';
import { FaGithub } from 'react-icons/fa';
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
            {/* Bio — as code */}
            <div className="about-code mb-5">
              <div className="about-code-bar">
                <span className="about-code-file">developer.js</span>
              </div>
              <div className="about-code-body">
                <div className="about-code-line"><span className="tok-cmt">// Currently open to full-time roles,</span></div>
                <div className="about-code-line"><span className="tok-cmt">// remote or India-based.</span></div>
                <div className="about-code-line">{' '}</div>
                <div className="about-code-line"><span className="tok-quote">/*</span></div>
                <div className="about-code-line"><span className="tok-quote"> *  "The interesting problems happen when</span></div>
                <div className="about-code-line"><span className="tok-quote"> *   two users hit save at the same time.</span></div>
                <div className="about-code-line"><span className="tok-quote"> *   That's what I build for."</span></div>
                <div className="about-code-line"><span className="tok-quote"> */</span></div>
              </div>
            </div>

            {/* Projects shipped */}
            <div className="ship-stat mb-5">
              <span className="ship-stat-num">5</span>
              <span className="ship-stat-meta">
                <span className="ship-stat-label">Projects Shipped</span>
                <span className="ship-stat-sub">Deployed &amp; live in production</span>
              </span>
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
