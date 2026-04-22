import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-custom">
      <div className="container text-center">
        {/* Logo Link Back to Top */}
        <div className="mb-4" data-aos="fade-up" data-aos-duration="800">
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

        {/* Strong Closing Line */}
        <h2 className="footer-closing-line mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          Currently open to full-time roles — let's build something together.
        </h2>

        {/* Social Links */}
        <div className="d-flex justify-content-center gap-4 pb-4 mb-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          <a href="https://github.com/imsumit28" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/imsumit45/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="mailto:ersumitkumar45@gmail.com" className="footer-social-btn" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        {/* Clean End Line */}
        <p className="footer-copyright mb-0" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
          © 2026 Sumit Kumar
        </p>
      </div>
    </footer>
  );
};

export default Footer;
