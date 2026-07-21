/**
 * Build-time prerender.
 *
 * The site is a client-rendered SPA behind a Vercel catch-all rewrite, so every
 * URL used to serve the same shell: the same <title>, the same description, and
 * — the actual bug — a canonical of "https://sumitkr.dev/" on all of them, which
 * tells Google every page is a duplicate of the homepage. Link-preview bots
 * (LinkedIn, Slack, WhatsApp, X) never run JS at all, so they only ever saw the
 * shell.
 *
 * This walks the route list once, renders each to static HTML, and rewrites the
 * head per route. The sitemap is emitted from the same list so it cannot drift.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { blogPosts } from '../src/data/blogPosts.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLIENT_ROOT = resolve(__dirname, '..');
const DIST = join(CLIENT_ROOT, 'dist');

const SITE = 'https://sumitkr.dev';
const AUTHOR = 'Sumit Kumar';
const OG_IMAGE = `${SITE}/og-image.jpg`;

// pathToFileURL: on Windows a bare absolute path ("d:\...") is rejected by the
// ESM loader as an unknown URL scheme.
const { render } = await import(
  pathToFileURL(join(CLIENT_ROOT, 'dist-ssr', 'entry-server.js')).href
);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Google truncates around 160 chars; cut on a word boundary rather than mid-word. */
const clamp = (text, max = 158) => {
  const flat = String(text).replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, flat.lastIndexOf(' ', max))}…`;
};

/** Titles already at the limit don't get the site-name suffix. */
const titleFor = (text) => (text.length <= 46 ? `${text} | ${AUTHOR}` : text);

const staticRoutes = [
  {
    path: '/',
    title: `${AUTHOR} | Full Stack Developer`,
    description:
      'Sumit Kumar — Full Stack Developer specializing in React, Node.js, and MongoDB. Open to internships and full-time roles. View projects, experience, and contact.',
    changefreq: 'monthly',
    priority: '1.0',
  },
  {
    path: '/projects',
    title: titleFor('Projects'),
    description:
      'Deployed, working builds from Sumit Kumar — real-time systems, full-stack apps, and developer tools, each with the architecture and trade-offs behind it.',
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/blogs',
    title: titleFor('Writing'),
    description:
      'Engineering write-ups on distributed queues, CRDTs, real-time delivery, and shipping side projects to production — drawn from builds by Sumit Kumar.',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/contact',
    title: titleFor('Contact'),
    description:
      'Get in touch with Sumit Kumar — Full Stack Developer open to internship and full-time engineering roles.',
    changefreq: 'yearly',
    priority: '0.5',
  },
];

const blogRoutes = blogPosts.map((post) => ({
  path: `/blogs/${post.slug}`,
  title: titleFor(post.title),
  description: clamp(post.excerpt),
  changefreq: 'yearly',
  priority: '0.6',
  lastmod: post.publishedAt,
  post,
}));

const routes = [...staticRoutes, ...blogRoutes];

/** schema.org BlogPosting, linked to the Person entity already in index.html. */
const blogPostingLd = (route) =>
  `<script type="application/ld+json">${JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: route.post.title,
      description: route.description,
      datePublished: route.post.publishedAt,
      dateModified: route.post.publishedAt,
      author: { '@type': 'Person', name: AUTHOR, url: `${SITE}/` },
      publisher: { '@type': 'Person', name: AUTHOR, url: `${SITE}/` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}${route.path}` },
      image: OG_IMAGE,
      keywords: route.post.project,
    },
    null,
    0,
  )}</script>`;

/**
 * Swap the head fields that must differ per route. Each pattern is asserted to
 * match so a future edit to index.html can't silently reintroduce the shared-
 * canonical bug.
 */
const applyHead = (html, route) => {
  const url = `${SITE}${route.path}`;
  const swaps = [
    [/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`],
    [
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    ],
    [
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${url}" />`,
    ],
    [
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    ],
    [
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    ],
    [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`],
    [
      /<meta property="og:type" content="[^"]*" \/>/,
      `<meta property="og:type" content="${route.post ? 'article' : 'website'}" />`,
    ],
    [
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    ],
    [
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    ],
  ];

  let out = html;
  for (const [pattern, replacement] of swaps) {
    if (!pattern.test(out)) {
      throw new Error(
        `prerender: no match for ${pattern} in index.html (route ${route.path}). ` +
          'The head template changed — update scripts/prerender.js to match.',
      );
    }
    out = out.replace(pattern, replacement);
  }

  if (route.post) {
    out = out.replace('</head>', `  ${blogPostingLd(route)}\n</head>`);
  }

  return out;
};

const sitemap = () =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) =>
      [
        '  <url>',
        `    <loc>${SITE}${route.path}</loc>`,
        route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>` : null,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n'),
    ),
    '</urlset>',
    '',
  ].join('\n');

const template = await readFile(join(DIST, 'index.html'), 'utf8');

for (const route of routes) {
  const appHtml = render(route.path);
  const html = applyHead(template, route).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  const outFile =
    route.path === '/' ? join(DIST, 'index.html') : join(DIST, route.path, 'index.html');

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html, 'utf8');
  console.log(`prerendered ${route.path}`);
}

await writeFile(join(DIST, 'sitemap.xml'), sitemap(), 'utf8');
console.log(`wrote sitemap.xml (${routes.length} urls)`);
