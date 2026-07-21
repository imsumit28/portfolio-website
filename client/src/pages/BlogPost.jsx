import { Link, Navigate, useParams } from 'react-router-dom';
import { getBlogPostBySlug } from '../data/blogPosts';

const pad = (n) => String(n + 1).padStart(2, '0');

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <section className="blog-editorial">
      <div className="container py-5">
        <div className="post-wrap">
          <Link to="/blogs" className="post-back">← All posts</Link>

          <article className="post-article">
          <header className="post-header">
            <div className="post-meta">
              <span className="blog-row-tag">{post.project}</span>
              <span className="blog-row-sep">/</span>
              {post.publishedAt && (
                <>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span className="blog-row-sep">/</span>
                </>
              )}
              <span>{post.readTime}</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-lead">{post.excerpt}</p>
          </header>

          <div className="post-rule" />

          <div className="post-body">
            {post.intro.map((paragraph) => (
              <p key={paragraph} className="post-p">{paragraph}</p>
            ))}

            {post.sections.map((section, i) => (
              <section key={section.heading} className="post-section">
                <h2 className="post-h">
                  <span className="post-h-idx">{pad(i)}</span>
                  {section.heading}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="post-p">{paragraph}</p>
                ))}

                {section.bullets?.length ? (
                  <ul className="post-list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}

                {section.code ? (
                  <pre className="post-code"><code>{section.code}</code></pre>
                ) : null}

                {section.paragraphsAfterCode?.map((paragraph) => (
                  <p key={paragraph} className="post-p">{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          <footer className="post-footer">
            <p className="post-closing">{post.closingNote}</p>
            <div className="post-footer-row">
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="post-source-link"
              >
                View project source →
              </a>
              <span className="post-source-path">{post.sourcePath}</span>
            </div>
          </footer>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
