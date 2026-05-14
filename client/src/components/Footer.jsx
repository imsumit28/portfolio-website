import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      navigate('/#projects');
    }
  };

  const socials = [
    { icon: <FaGithub size={22} />, label: 'View Code', href: 'https://github.com/imsumit28', target: '_blank', color: '#10b981', shadow: 'rgba(16,185,129,0.4)' },
    { icon: <FaLinkedinIn size={22} />, label: 'Connect', href: 'https://www.linkedin.com/in/imsumit45/', target: '_blank', color: '#3b82f6', shadow: 'rgba(59,130,246,0.4)' },
    { icon: <FaEnvelope size={22} />, label: 'Contact Me', href: 'mailto:ersumitkumar45@gmail.com', target: '_self', color: '#10b981', shadow: 'rgba(16,185,129,0.4)' },
  ];

  return (
    <footer className="footer-custom">
      <div className="container text-center">

        {/* Logo */}
        <div className="mb-4">
          <a href="#hero" onClick={scrollToTop} className="footer-logo-link" style={{
            color: '#10b981',
            fontSize: '1.4rem',
            fontWeight: '700',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
            display: 'inline-block'
          }}>
            &lt;Sumit Kumar /&gt;
          </a>
        </div>

        {/* Headline */}
        <h2 className="footer-closing-line mb-3">
          Full Stack Engineer focused on real-time systems,<br className="d-none d-md-block" /> distributed architecture, and scalable backend design.
        </h2>

        {/* Proof line */}
        <p style={{
          color: '#64748b',
          fontSize: '0.95rem',
          maxWidth: '580px',
          margin: '0 auto 1.75rem',
          lineHeight: '1.7'
        }}>
          Built and deployed systems using WebSockets, Redis queues, and CRDT-based sync, handling concurrent users in real-time.
        </p>

        {/* CTA Button */}
        <div className="mb-5">
          <button
            onClick={scrollToProjects}
            className="btn-global btn-global-primary"
            style={{ padding: '11px 30px', fontSize: '0.95rem' }}
          >
            View Projects
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: '40px', height: '1px', background: 'rgba(16,185,129,0.3)', margin: '0 auto 2rem' }} />

        {/* Social Links */}
        <div className="d-flex justify-content-center gap-5 mb-4">
          {socials.map(({ icon, label, href, target, color, shadow }) => (
            <a
              key={label}
              href={href}
              target={target}
              rel={target === '_blank' ? 'noopener noreferrer' : undefined}
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <div
                className="social-icon-btn"
                style={{ fontSize: '1.25rem', transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease' }}
                onMouseEnter={e => Object.assign(e.currentTarget.style, { background: color, color: '#fff', borderColor: color, boxShadow: `0 6px 20px ${shadow}`, transform: 'translateY(-3px) scale(1.08)' })}
                onMouseLeave={e => Object.assign(e.currentTarget.style, { background: '', color: '', borderColor: '', boxShadow: '', transform: '' })}
              >
                {icon}
              </div>
              <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Availability */}
        <p style={{
          color: '#10b981',
          fontSize: '0.82rem',
          fontWeight: '600',
          letterSpacing: '0.5px',
          marginBottom: '1.5rem'
        }}>
          Available for Full-Time &nbsp;·&nbsp; Remote / India
        </p>

        {/* Copyright */}
        <p className="footer-copyright mb-0">
          © 2026 Sumit Kumar
        </p>

      </div>
    </footer>
  );
};

export default Footer;
