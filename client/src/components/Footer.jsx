import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="container text-center">
        {/* Strong Closing Line */}
        <h2 className="footer-closing-line mb-4" data-aos="fade-up" data-aos-duration="800">
          Building scalable full-stack systems with real backend architecture.
        </h2>

        {/* Primary Action Buttons */}
        <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          <a href="https://github.com/imsumit28" target="_blank" rel="noopener noreferrer" className="btn-global btn-global-primary">
            View GitHub
          </a>
          <a href="mailto:ersumitkumar45@gmail.com" className="btn-global btn-global-secondary">
            Contact Me
          </a>
        </div>

        {/* Social Links */}
        <div className="d-flex justify-content-center gap-5 pb-4 mb-5" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          <a href="https://github.com/imsumit28" target="_blank" rel="noopener noreferrer" className="footer-social-btn footer-social-github" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/imsumit45/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="mailto:ersumitkumar45@gmail.com" className="footer-social-btn" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        {/* Minimal Tech Signature */}
        <p className="footer-tech-signature mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
          Built with React • Node.js • MongoDB
        </p>

        {/* Clean End Line */}
        <p className="footer-copyright mb-0">
          © 2026 Sumit Kumar
        </p>
      </div>
    </footer>
  );
};

export default Footer;
