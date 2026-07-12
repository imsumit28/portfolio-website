import React from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import ContactForm from '../ContactForm';
import { SOCIAL_LINKS } from '../../data/homeData';
import { fadeUp, fadeRight } from '../../utils/motion';

const CONTACT_DETAILS = [
  { k: 'Email', v: SOCIAL_LINKS.email, link: `mailto:${SOCIAL_LINKS.email}?subject=Connecting%20from%20your%20Portfolio` },
  { k: 'Location', v: 'Patna, India' },
];

const CONTACT_SOCIALS = [
  { icon: <FaGithub size={20} />, href: SOCIAL_LINKS.github, label: 'GitHub' },
  { icon: <FaLinkedinIn size={20} />, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { icon: <FaXTwitter size={20} />, href: SOCIAL_LINKS.x, label: 'X' },
];

const ContactSection = () => {
  return (
    <section className="py-5 contact-editorial" id="contact">
      <div className="container py-4">
        <motion.div className="section-title-wrapper" {...fadeRight()}>
          <h2 className="section-title">CONTACT</h2>
          <div className="section-line"></div>
        </motion.div>

        {/* Editorial header */}
        <motion.header className="ce-header" {...fadeUp()}>
          <span className="ce-kicker">Get in touch / 06</span>
          <h2 className="ce-headline">
            Get in<br />touch<span className="ce-dot">.</span>
          </h2>
          <p className="ce-lead">
            Open to internships, freelance work, and full-time roles.
            If you&apos;re hiring — or just want to talk about real-time systems — send a note.
          </p>
          <dl className="ce-stats">
            <div className="ce-stat">
              <dt>Average response</dt>
              <dd>Within 24 hours</dd>
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
        </motion.header>

        <div className="ce-grid">
          {/* Left: direct contact + socials */}
          <motion.div {...fadeUp()}>
            <p className="ce-col-label">Reach me directly</p>

            {CONTACT_DETAILS.map((item, i) => {
              const idx = String(i + 1).padStart(2, '0');
              return (
                <a
                  key={item.k}
                  className="ce-detail"
                  href={item.link || undefined}
                >
                  <span className="ce-detail-idx">{idx}</span>
                  <span className="ce-detail-k">{item.k}</span>
                  <span className="ce-detail-v">{item.v}</span>
                </a>
              );
            })}

            <p className="ce-social-label">Elsewhere</p>
            <div className="ce-social-row">
              {CONTACT_SOCIALS.map((s) => (
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
          </motion.div>

          {/* Right: form */}
          <motion.div {...fadeUp(100)}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
