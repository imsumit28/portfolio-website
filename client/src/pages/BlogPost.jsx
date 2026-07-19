import { Link, Navigate, useParams } from 'react-router-dom';
import { getBlogPostBySlug } from '../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <section style={{ background: '#080b1a', minHeight: '100%' }}>
      <div className="container py-5">
        <div className="mx-auto" style={{ maxWidth: '820px' }}>
          <Link
            to="/blogs"
            style={{
              color: '#f59e0b',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              marginBottom: '1.5rem',
            }}
          >
            ← Back to Blogs
          </Link>

          <article
            style={{
              background: 'rgba(15, 23, 42, 0.74)',
              border: '1px solid rgba(148, 163, 184, 0.14)',
              borderRadius: '24px',
              padding: 'clamp(1.3rem, 3vw, 2.5rem)',
              boxShadow: '0 24px 70px rgba(2, 6, 23, 0.32)',
            }}
          >
            <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
              <span
                style={{
                  color: '#fbbf24',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '999px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {post.project}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{post.readTime}</span>
            </div>

            <h1
              style={{
                color: '#f8fafc',
                fontSize: 'clamp(2rem, 4vw, 3.3rem)',
                lineHeight: 1.15,
                marginBottom: '1rem',
              }}
            >
              {post.title}
            </h1>

            <p style={{ color: '#cbd5e1', lineHeight: 1.85, fontSize: '1.05rem' }}>
              {post.excerpt}
            </p>

            <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
              {post.intro.map((paragraph) => (
                <p key={paragraph} style={{ color: '#cbd5e1', lineHeight: 1.85, margin: 0 }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(245, 158, 11, 0.18)',
                margin: '2rem 0',
              }}
            />

            <div style={{ display: 'grid', gap: '2rem' }}>
              {post.sections.map((section) => (
                <section key={section.heading} style={{ minWidth: 0 }}>
                  <h2 style={{ color: '#f8fafc', fontSize: '1.6rem', marginBottom: '1rem' }}>
                    {section.heading}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} style={{ color: '#cbd5e1', lineHeight: 1.85, marginBottom: '1rem' }}>
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul style={{ color: '#cbd5e1', lineHeight: 1.85, paddingLeft: '1.25rem', marginBottom: '1rem' }}>
                      {section.bullets.map((bullet) => (
                        <li key={bullet} style={{ marginBottom: '0.45rem' }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.code ? (
                    <pre
                      style={{
                        background: 'rgba(2, 6, 23, 0.85)',
                        color: '#e2e8f0',
                        padding: '1rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(148, 163, 184, 0.14)',
                        overflowX: 'auto',
                        maxWidth: '100%',
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                        marginBottom: '1rem',
                      }}
                    >
                      <code>{section.code}</code>
                    </pre>
                  ) : null}

                  {section.paragraphsAfterCode?.map((paragraph) => (
                    <p key={paragraph} style={{ color: '#cbd5e1', lineHeight: 1.85, marginBottom: '1rem' }}>
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <div
              style={{
                marginTop: '2.25rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(148, 163, 184, 0.14)',
              }}
            >
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1rem' }}>{post.closingNote}</p>
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 600 }}
              >
                View project source
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
