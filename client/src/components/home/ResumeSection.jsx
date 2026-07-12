import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeRight } from '../../utils/motion';

const RESUME_SPEC = [
  ['Role', 'Full Stack Developer'],
  ['Format', 'PDF · A4'],
  ['Updated', 'April 2026'],
  ['Length', 'One page'],
];

const ResumeSection = () => {
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

  return (
    <section className="py-5 resume-editorial" id="resume">
      <div className="container py-4">
        <motion.div className="section-title-wrapper" {...fadeRight()}>
          <h2 className="section-title">RESUME</h2>
          <div className="section-line"></div>
        </motion.div>

        {/* Editorial header */}
        <motion.header className="ce-header" {...fadeUp()}>
          <span className="ce-kicker">Curriculum vitae / 05</span>
          <h2 className="ce-headline">
            My resume,<br />one page<span className="ce-dot">.</span>
          </h2>
          <p className="ce-lead">
            Skills, experience, and education in a single PDF. Download it
            or open it in a new tab.
          </p>
        </motion.header>

        <div className="re-grid">
          {/* Left: spec + actions */}
          <motion.div {...fadeUp()}>
            <p className="ce-col-label">Document</p>

            <div className="re-spec">
              {RESUME_SPEC.map(([k, v], i) => (
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
          </motion.div>

          {/* Right: PDF preview */}
          <motion.div className="re-preview" {...fadeUp(100)}>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
