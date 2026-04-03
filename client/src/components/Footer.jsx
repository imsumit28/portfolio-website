import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer-custom">
      {/* Main Content */}
      <div className="container">
        <div className="footer-main text-center">

          {/* Avatar + Name */}
          <div className="mb-4">
            <div className="footer-avatar mx-auto mb-3">SK</div>
            <h4 className="footer-name">Sumit Kumar</h4>
            <p className="footer-roles">
              Full Stack Developer | Building scalable web apps
            </p>
            <div className="mt-2 d-flex align-items-center justify-content-center flex-wrap gap-2" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              <span>📍 Based in India</span>
            </div>
            <div className="mt-3">
              <span style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#10b981',
                borderRadius: '30px',
                padding: '8px 20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'inline-block',
                letterSpacing: '0.3px',
                boxShadow: '0 4px 15px rgba(16,185,129,0.1)'
              }}>
                Open to internships and full-time opportunities — let's connect!
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mb-2">
            <p className="footer-label">CONTACT DETAILS</p>
            <p className="footer-value">ersumitkumar45@gmail.com</p>
          </div>

          {/* Tech Stack */}
          <div className="mt-4">
            <p className="footer-label">BUILT WITH</p>
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
              {[
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
                { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
                { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                { name: 'JWT', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jsonwebtokens.svg' },
              ].map((tech) => (
                <span key={tech.name} className="footer-tech-chip">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="footer-tech-icon"
                    style={{
                      filter: tech.name === 'Express.js' || tech.name === 'JWT' ? 'invert(1)' : 'none'
                    }}
                  />
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <hr className="footer-divider" />

        <div className="footer-bottom text-center">
          <p className="footer-copyright mb-3">
            &copy; {new Date().getFullYear()} Sumit Kumar &bull; Built with <span style={{ color: '#ef4444' }}>❤️</span> using MERN
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="https://github.com/imsumit28" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/imsumit45/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://x.com/imsumit4545" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="X / Twitter">
              <FaXTwitter />
            </a>
            <a href="mailto:ersumitkumar45@gmail.com?body=Hello%20Sumit%2C%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0AThank%20you." className="footer-social-btn" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-4">
          <button
            className="footer-back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
