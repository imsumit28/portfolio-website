import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 992) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (currentPath !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'experience', 'education', 'resume', 'contact'];
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
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Update animated indicator position (desktop only)
  useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current) {
        const activeLink = navRef.current.querySelector('.nav-link-custom.active');
        if (activeLink) {
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
    setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection, currentPath]);

  const scrollToSection = (section) => {
    const el = section === 'home' ? document.body : document.getElementById(section);
    if (!el) return;
    const top = section === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false); // Always close mobile menu on link tap
    if (currentPath !== '/') {
      navigate('/');
      window.setTimeout(() => scrollToSection(section), 50);
      return;
    }
    scrollToSection(section);
  };

  const navLinks = [
    { label: 'Home', section: 'home' },
    { label: 'About', section: 'about' },
    { label: 'Skills', section: 'skills' },
    { label: 'Projects', section: 'projects' },
    { label: 'Experience', section: 'experience' },
    { label: 'Education', section: 'education' },
    { label: 'Resume', section: 'resume' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 9999,
          backgroundColor: 'rgba(8, 11, 26, 0.97)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="container py-2 d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link
            className="navbar-brand navbar-brand-custom"
            to="/"
            onClick={() => handleNavClick('home')}
          >
            &lt;<span className="text-accent">Sumit</span> Kumar /&gt;
          </Link>

          {/* Desktop nav links */}
          <ul
            className="navbar-nav ms-auto align-items-center position-relative d-none d-lg-flex flex-row"
            ref={navRef}
          >
            {navLinks.map(({ label, section }) => (
              <li className="nav-item" key={section}>
                {section === 'home' ? (
                  <Link
                    className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === 'home' ? 'active' : ''}`}
                    to="/"
                    onClick={() => handleNavClick('home')}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    className={`nav-link nav-link-custom ${currentPath === '/' && activeSection === section ? 'active' : ''}`}
                    href={`#${section}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(section); }}
                  >
                    {label}
                  </a>
                )}
              </li>
            ))}
            <div className="nav-indicator d-none d-lg-block" style={indicatorStyle}></div>
          </ul>

          {/* Mobile hamburger button */}
          <button
            className="navbar-hamburger d-lg-none"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '7px 10px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: menuOpen ? '#10b981' : '#f8fafc',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none'
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#f8fafc',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: menuOpen ? '#10b981' : '#f8fafc',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '75vw',
          maxWidth: '300px',
          zIndex: 9999,
          background: 'rgba(8, 11, 26, 0.98)',
          borderLeft: '1px solid rgba(16,185,129,0.2)',
          backdropFilter: 'blur(20px)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '80px',
          paddingBottom: '40px',
          overflowY: 'auto',
        }}
      >
        {/* Drawer close button */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute', top: '18px', right: '18px',
            background: 'none', border: 'none', color: '#94a3b8',
            fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1,
          }}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Drawer logo */}
        <div style={{ padding: '0 28px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ color: '#10b981', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '-0.5px' }}>
            &lt;<span>Sumit</span> Kumar /&gt;
          </span>
        </div>

        {/* Nav links */}
        <ul style={{ listStyle: 'none', padding: '16px 0', margin: 0, flex: 1 }}>
          {navLinks.map(({ label, section }, i) => {
            const isActive = currentPath === '/' && activeSection === section;
            return (
              <li key={section}>
                {section === 'home' ? (
                  <Link
                    to="/"
                    onClick={() => handleNavClick('home')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 28px',
                      color: isActive ? '#10b981' : '#cbd5e1',
                      textDecoration: 'none',
                      fontWeight: isActive ? '600' : '400',
                      fontSize: '1rem',
                      borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent',
                      background: isActive ? 'rgba(16,185,129,0.06)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    href={`#${section}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(section); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 28px',
                      color: isActive ? '#10b981' : '#cbd5e1',
                      textDecoration: 'none',
                      fontWeight: isActive ? '600' : '400',
                      fontSize: '1rem',
                      borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent',
                      background: isActive ? 'rgba(16,185,129,0.06)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Drawer footer */}
        <div style={{ padding: '20px 28px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: '#475569', fontSize: '0.78rem', margin: 0 }}>
            ● Available for new opportunities
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
