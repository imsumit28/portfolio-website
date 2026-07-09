import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const Blogs = () => {
  return (
    <section style={{ background: '#080b1a', minHeight: '100%' }}>
      <div className="container py-5">
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <span
            style={{
              color: '#f59e0b',
              fontSize: '0.85rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Blog
          </span>
          <h1
            style={{
              color: '#f8fafc',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              marginTop: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            Notes on building systems that survive real traffic
          </h1>
          <p
            style={{
              color: '#94a3b8',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              maxWidth: '720px',
              marginBottom: '2.5rem',
            }}
          >
            These posts come from the blog files in the portfolio workspace and are now
            available directly from the website.
          </p>

          <div className="row g-4">
            {blogPosts.map((post) => (
              <div className="col-12" key={post.slug}>
                <article
                  style={{
                    background: 'rgba(15, 23, 42, 0.78)',
                    border: '1px solid rgba(148, 163, 184, 0.16)',
                    borderRadius: '22px',
                    padding: '1.75rem',
                    boxShadow: '0 20px 60px rgba(2, 6, 23, 0.28)',
                  }}
                >
                  <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                    <span
                      style={{
                        color: '#fbbf24',
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.28)',
                        borderRadius: '999px',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      {post.project}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{post.readTime}</span>
                  </div>

                  <h2 style={{ color: '#f8fafc', fontSize: '1.6rem', marginBottom: '0.9rem' }}>
                    {post.title}
                  </h2>
                  <p style={{ color: '#cbd5e1', lineHeight: 1.8, marginBottom: '1.4rem' }}>
                    {post.excerpt}
                  </p>

                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="btn-global btn-global-primary"
                      style={{ textDecoration: 'none' }}
                    >
                      Read Article
                    </Link>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{post.sourcePath}</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
