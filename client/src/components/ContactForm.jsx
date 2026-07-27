import React, { useState } from 'react';
import api from '../utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Functional update avoids stale-closure bugs when multiple fields change quickly
  const updateFormField = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'warning', message: 'Please fill in all fields before sending your message.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // The server persists the message and sends the email notification,
      // so submissions stay behind its rate limiting and validation.
      await api.post('/contact', formData);

      setStatus({
        type: 'success',
        message: 'Message sent successfully — I\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to send message. Please try again later.';
      setStatus({ type: 'danger', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <p className="ce-col-label">Send a message</p>

      {status.message && status.type === 'success' && (
        <div className="ce-alert ce-alert-success ce-alert-thanks" role="status">
          <span className="ce-thanks-check" aria-hidden="true">✓</span>
          <div className="ce-thanks-body">
            <p className="ce-thanks-title">Thanks!</p>
            <p className="ce-thanks-line">Your message reached my inbox.</p>
            <p className="ce-thanks-reply">
              <span>Expected reply</span> within 24 hours.
            </p>
          </div>
          <button
            type="button"
            className="ce-alert-close"
            aria-label="Dismiss"
            onClick={() => setStatus({ type: '', message: '' })}
          >
            ×
          </button>
        </div>
      )}

      {status.message && status.type !== 'success' && (
        <div className={`ce-alert ce-alert-${status.type}`} role="alert">
          <span>{status.message}</span>
          <button
            type="button"
            className="ce-alert-close"
            aria-label="Dismiss"
            onClick={() => setStatus({ type: '', message: '' })}
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="ce-form-row">
          <div className="ce-form-field">
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              type="text"
              className="ce-input"
              name="name"
              value={formData.name}
              onChange={updateFormField}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="ce-form-field">
            <label htmlFor="contact-email">Your email</label>
            <input
              id="contact-email"
              type="email"
              className="ce-input"
              name="email"
              value={formData.email}
              onChange={updateFormField}
              required
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="ce-form-field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            className="ce-input"
            name="message"
            rows="5"
            value={formData.message}
            onChange={updateFormField}
            required
            placeholder="Tell me about your project, idea, or opportunity…"
          ></textarea>
        </div>

        <button type="submit" className="ce-submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <><span className="spinner-border spinner-border-sm" role="status"></span> Sending…</>
          ) : (
            'Send Message'
          )}
        </button>

        <p className="ce-form-note">Or reach out directly via email or LinkedIn</p>
      </form>
    </div>
  );
};

export default ContactForm;
