import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const pad = (n) => String(n + 1).padStart(2, '0');

const Blogs = () => {
  return (
    <section className="blog-editorial">
      <div className="container py-5">
        <div className="blog-wrap">
          <header className="blog-index-header">
            <span className="ce-kicker">Blog</span>
            <h1 className="blog-headline">
              Notes on building systems<br />that survive real traffic<span className="ce-dot">.</span>
            </h1>
            <p className="blog-lead">
              Engineering write-ups from my projects — queues, CRDTs, deploys, and the
              trade-offs behind them.
            </p>
            <div className="blog-count">{String(blogPosts.length).padStart(2, '0')} POSTS</div>
          </header>

          <div className="blog-index">
            {blogPosts.map((post, i) => (
              <Link key={post.slug} to={`/blogs/${post.slug}`} className="blog-row">
                <span className="blog-row-idx">{pad(i)}</span>
                <div className="blog-row-main">
                  <div className="blog-row-meta">
                    <span className="blog-row-tag">{post.project}</span>
                    <span className="blog-row-sep">/</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="blog-row-title">{post.title}</h2>
                  <p className="blog-row-excerpt">{post.excerpt}</p>
                </div>
                <span className="blog-row-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
