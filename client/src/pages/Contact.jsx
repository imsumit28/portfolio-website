import React from 'react';
import ContactForm from '../components/ContactForm';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  return (
    <div className="container py-5">
      <div className="section-title-wrapper mt-4" data-aos="fade-right">
        <h3 className="section-title">CONTACT</h3>
        <div className="section-line"></div>
      </div>

      {/* Top Banner */}
      <div className="text-center mt-5 mb-5" data-aos="fade-up">
        <div className="d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 0 40px rgba(16,185,129,0.25)' }}>
          <FaPaperPlane size={30} color="white" />
        </div>
        <h2 className="fw-bold" style={{ fontSize: '2.2rem', color: '#f8fafc' }}>Let's Work Together</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: '550px', lineHeight: 1.8 }}>
          Have a project in mind or just want to chat? Drop me a message and I'll get back to you within 24 hours.
        </p>
      </div>

      <div className="row g-5">
        {/* Left: Contact Info Cards */}
        <div className="col-lg-5" data-aos="fade-right" data-aos-duration="1000">
          
          {/* Info Cards stacked */}
          {[
            { icon: <FaMapMarkerAlt size={20} />, title: 'Location', text: 'Patna, India', color: '#f59e0b' },
            { icon: <FaEnvelope size={20} />, title: 'Email', text: 'ersumitkumar45@gmail.com', color: '#10b981', link: 'mailto:ersumitkumar45@gmail.com' },
            { icon: <FaPhone size={20} />, title: 'Phone', text: '+91 8210240106', color: '#3b82f6', link: 'tel:+918210240106' },
          ].map((item, i) => (
            <div key={i} className="d-flex align-items-center p-4 mb-3" data-aos="fade-up" data-aos-delay={i * 100}
              style={{
                background: '#1e293b',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                cursor: item.link ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.borderColor = item.color; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
              onClick={() => item.link && window.open(item.link)}
            >
              <div className="d-flex align-items-center justify-content-center rounded-3 me-4" style={{ width: '48px', height: '48px', background: `${item.color}20`, flexShrink: 0 }}>
                <span style={{ color: item.color }}>{item.icon}</span>
              </div>
              <div>
                <p className="mb-0 text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.title}</p>
                <p className="mb-0 fw-semibold" style={{ color: '#f8fafc' }}>{item.text}</p>
              </div>
            </div>
          ))}

          {/* Social Links */}
          <div className="d-flex gap-3 mt-4 ms-1" data-aos="fade-up" data-aos-delay="300">
            <a href="https://github.com/imsumit28" target="_blank" rel="noopener noreferrer"
              className="d-flex align-items-center justify-content-center"
              style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', transition: 'all 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <FaGithub size={22} />
            </a>
            <a href="https://www.linkedin.com/in/imsumit45/" target="_blank" rel="noopener noreferrer"
              className="d-flex align-items-center justify-content-center"
              style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', transition: 'all 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#0077b5'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <FaLinkedinIn size={22} />
            </a>
            <a href="https://x.com/imsumit4545" target="_blank" rel="noopener noreferrer"
              className="d-flex align-items-center justify-content-center"
              style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', transition: 'all 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <FaXTwitter size={22} />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="col-lg-7" data-aos="fade-left" data-aos-duration="1000">
          <div className="position-relative p-4 p-md-5" style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, #0f172a 100%)',
            border: '1px solid rgba(16,185,129,0.15)',
            borderRadius: '16px',
            boxShadow: '0 0 50px rgba(16,185,129,0.04), 0 25px 60px rgba(0,0,0,0.3)',
          }}>
            {/* Glow */}
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
