import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { fadeUp, fadeRight } from '../utils/motion';

const DETAILS = [
  { k: 'Email', v: 'ersumitkumar45@gmail.com', link: 'mailto:ersumitkumar45@gmail.com' },
  { k: 'Location', v: 'Patna, India' },
];

const SOCIALS = [
  { icon: <FaGithub size={20} />, href: 'https://github.com/imsumit28', label: 'GitHub' },
  { icon: <FaLinkedinIn size={20} />, href: 'https://www.linkedin.com/in/imsumit45/', label: 'LinkedIn' },
  { icon: <FaXTwitter size={20} />, href: 'https://x.com/imsumit4545', label: 'X' },
];

const Contact = () => {
  return (
    <div className="container py-5 contact-editorial">
      <motion.div className="section-title-wrapper mt-4" {...fadeRight()}>
        <h3 className="section-title">CONTACT</h3>
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
        <span className="ce-status">
          <span className="ce-status-dot"></span>
          Available
        </span>
      </motion.header>

      <div className="ce-grid">
        {/* Left: direct contact + socials */}
        <motion.div {...fadeUp()}>
          <p className="ce-col-label">Reach me directly</p>

          {DETAILS.map((item, i) => {
            const idx = String(i + 1).padStart(2, '0');
            const interactive = Boolean(item.link);
            return (
              <a
                key={item.k}
                className="ce-detail"
                href={item.link || undefined}
                {...(interactive
                  ? { role: 'button', target: item.link.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
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
            {SOCIALS.map((s) => (
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
  );
};

export default Contact;
