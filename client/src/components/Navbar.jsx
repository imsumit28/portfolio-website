import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);

  useEffect(() => {
    if (currentPath !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'experience', 'education', 'resume', 'contact'];
      // Use 200px offset so the link becomes active slightly before the section hits top
      const scrollPosition = window.scrollY + 200; 
      
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100); // Check initial scroll state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Update animated indicator position
  useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current) {
        const activeLink = navRef.current.querySelector('.nav-link-custom.active');
        if (activeLink) {
          // The left offset includes the 1rem (16px) padding defined in css
          // The width should be the width minus 2rem (32px)
          setIndicatorStyle({
            left: activeLink.offsetLeft + 16,
            width: activeLink.offsetWidth - 32,
            opacity: 1
          });
        } else {
          setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        }
      }
    };

    updateIndicator();
    setTimeout(updateIndicator, 50); // slight delay to handle CSS class application

    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection, currentPath]);

  // Click handler to instantly update the active section instead of waiting for scroll
  const scrollToSection = (section) => {
    const el = section === 'home' ? document.body : document.getElementById(section);
    if (!el) return;

    const top = section === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 90; // navbar offset
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavClick = (section) => {
    setActiveSection(section);

    if (currentPath !== '/') {
      navigate('/');
      window.setTimeout(() => scrollToSection(section), 50);
      return;
    }

    scrollToSection(section);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand navbar-brand-custom" to="/" onClick={() => handleNavClick('home')}>
          &lt;Sumit Kumar /&gt;
        </Link>
        <button className="navbar-toggler border-0 shadow-none text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{filter: 'invert(1)'}}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center position-relative" ref={navRef}>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === 'home' ? 'active' : ''}`} to="/" onClick={() => handleNavClick('home')}>Home</Link>
            </li>
            <li className="nav-item">
              <a className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === 'about' ? 'active' : ''}`} href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === 'skills' ? 'active' : ''}`} href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}>Skills</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === 'projects' ? 'active' : ''}`} href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Projects</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === 'experience' ? 'active' : ''}`} href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}>Experience</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === 'education' ? 'active' : ''}`} href="#education" onClick={(e) => { e.preventDefault(); handleNavClick('education'); }}>Education</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === 'resume' ? 'active' : ''}`} href="#resume" onClick={(e) => { e.preventDefault(); handleNavClick('resume'); }}>Resume</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === 'contact' ? 'active' : ''}`} href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
            </li>
            <div className="nav-indicator d-none d-lg-block" style={indicatorStyle}></div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
