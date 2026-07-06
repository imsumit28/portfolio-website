import React from 'react';
import ContactForm from '../components/ContactForm';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const DETAILS = [
  { k: 'Email', v: 'ersumitkumar45@gmail.com', link: 'mailto:ersumitkumar45@gmail.com' },
  { k: 'Phone', v: '+91 8210240106', link: 'tel:+918210240106' },
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
      <div className="section-title-wrapper mt-4" data-aos="fade-right">
        <h3 className="section-title">CONTACT</h3>
        <div className="section-line"></div>
      </div>

      {/* Editorial header */}
      <header className="ce-header" data-aos="fade-up">
        <span className="ce-kicker">Get in touch / 05</span>
        <h2 className="ce-headline">
          Let&apos;s build<br />something good<span className="ce-dot">.</span>
        </h2>
        <p className="ce-lead">
          Have a project in mind, a role to fill, or just want to trade ideas?
          Send a note and I&apos;ll get back to you within 24 hours.
        </p>
        <span className="ce-status">
          <span className="ce-status-dot"></span>
          Available for new projects
        </span>
      </header>

      <div className="ce-grid">
        {/* Left: direct contact + socials */}
        <div data-aos="fade-up">
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
        </div>

        {/* Right: form */}
        <div data-aos="fade-up" data-aos-delay="100">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
