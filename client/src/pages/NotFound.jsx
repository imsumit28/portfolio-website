import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="py-5 contact-editorial">
      <div className="container py-4" style={{ maxWidth: '720px' }}>
        <header className="ce-header">
          <span className="ce-kicker">Error / 404</span>
          <h2 className="ce-headline">
            This page<br />doesn&apos;t exist<span className="ce-dot">.</span>
          </h2>
          <p className="ce-lead">
            The link is broken or the page moved. Everything worth seeing is back on the home page.
          </p>
        </header>

        <div className="hero-cta-row mt-4">
          <Link to="/" className="btn-global btn-global-primary text-decoration-none">
            Back to Home
          </Link>
          <Link to="/projects" className="btn-global btn-global-secondary text-decoration-none">
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
