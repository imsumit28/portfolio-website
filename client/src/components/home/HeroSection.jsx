import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { TERMINAL_LINES, SOCIAL_LINKS } from '../../data/homeData';
import { scrollToSection } from '../../utils/scroll';
import { fadeLeft, fadeRight } from '../../utils/motion';
import profileImg from '../../assets/profile-new.jpeg';
import profileImgWebp from '../../assets/profile-new.webp';

const SOCIAL_CTAS = [
  { href: SOCIAL_LINKS.linkedin, icon: <FaLinkedinIn size={16} />, label: 'Connect', color: '#3b82f6', shadow: 'rgba(59,130,246,0.35)', target: '_blank' },
  { href: SOCIAL_LINKS.github, icon: <FaGithub size={16} />, label: 'GitHub', color: '#fbbf24', shadow: 'rgba(245,158,11,0.35)', target: '_blank' },
  { href: SOCIAL_LINKS.x, icon: <FaXTwitter size={16} />, label: 'Follow', color: '#f8fafc', shadow: 'rgba(248,250,252,0.2)', target: '_blank' },
  { href: `mailto:${SOCIAL_LINKS.email}?body=Hello%20Sumit%2C%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0AThank%20you.`, icon: <FaEnvelope size={16} />, label: 'Say Hi', color: '#fbbf24', shadow: 'rgba(245,158,11,0.35)', target: '_self' },
];

const HeroSection = () => {
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    if (terminalStep >= TERMINAL_LINES.length) return;
    const delay = TERMINAL_LINES[terminalStep].type === 'cmd' ? 650 : 350;
    const t = setTimeout(() => setTerminalStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [terminalStep]);

  return (
    <section className="d-flex align-items-center position-relative home-editorial" style={{ minHeight: '85vh', overflow: 'hidden' }} id="home">
      <div className="hero-bg-glow"></div>
      <div className="container ps-md-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center">
          <motion.div className="col-lg-7" {...fadeRight()}>
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
              I build real-time web apps — collaborative editing, live notifications, URL infrastructure — and deploy everything I make.
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
                <span style={{ marginLeft: 8, color: '#94a3b8', fontSize: '0.75rem', letterSpacing: '0.3px' }}>
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
                {TERMINAL_LINES.map((line, i) => (
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
                {terminalStep >= TERMINAL_LINES.length && (
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

          </motion.div>

          <motion.div className="col-lg-5 mt-5 mt-lg-0 text-center" {...fadeLeft(200)}>
            <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
              {SOCIAL_CTAS.map(({ href, icon, label, color, shadow, target }) => (
                <a
                  key={label}
                  href={href}
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="hero-social text-decoration-none d-flex flex-column align-items-center gap-1"
                  style={{ '--hs-color': color, '--hs-shadow': shadow }}
                >
                  <div className="cta-icon-box d-flex align-items-center justify-content-center">
                    {icon}
                  </div>
                  <span className="cta-label">{label}</span>
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
                  width={722}
                  height={722}
                  loading="eager"
                  fetchpriority="high"
                />
              </picture>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
