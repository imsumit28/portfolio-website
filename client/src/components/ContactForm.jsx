import React, { useState } from 'react';
import api from '../utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'warning', message: '⚠️ Please fill in all fields before sending your message.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/contact', formData);
      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'danger', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: '#f8fafc',
    padding: '14px 18px',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
  };

  const focusStyle = (e) => {
    e.target.style.borderColor = '#10b981';
    e.target.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.1)';
  };
  const blurStyle = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div className="position-relative" style={{ zIndex: 1 }}>
      <h4 className="fw-bold mb-1" style={{ color: '#f8fafc' }}>Send a Message</h4>
      <br />
      {status.message && (
        <div className={`alert alert-${status.type} py-3 px-4 d-flex align-items-center justify-content-between`} style={{ borderRadius: '10px', fontSize: '0.9rem' }} role="alert">
          {status.message}
          <button type="button" className="btn-close btn-close-white btn-sm" onClick={() => setStatus({ type: '', message: '' })}></button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label text-muted fw-medium" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>YOUR NAME</label>
            <input
              type="text"
              style={inputStyle}
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              required
              placeholder="Sumit Kumar"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted fw-medium" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>YOUR EMAIL</label>
            <input
              type="email"
              style={inputStyle}
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              required
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label text-muted fw-medium" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>MESSAGE</label>
          <textarea
            style={{ ...inputStyle, resize: 'none' }}
            className="form-control"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            onFocus={focusStyle}
            onBlur={blurStyle}
            required
            placeholder="Tell me about your project, idea, or opportunity..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn w-100 py-3 fw-bold text-white position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '10px',
            border: 'none',
            fontSize: '1rem',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(16,185,129,0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <><span className="spinner-border spinner-border-sm me-2" role="status"></span> Sending...</>
          ) : (
            'Send Message'
          )}
        </button>
        <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '0.85rem' }}>
          Or reach out directly via email or LinkedIn
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
