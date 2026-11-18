import type { NextConfig } from "next";

type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

/**
 * Addresses from the old WordPress site (found in the Wayback Machine) that have no page of the
 * same name here. Each lands on the closest new page, permanently, so bookmarks and search
 * rankings carry over. Pages that kept their path (who-we-are, our-doctors, contact-us...) need no
 * entry: Next.js only drops their trailing slash.
 */
export const legacyRedirects: Redirect[] = [
  // Blog posts that became articles, and the one that did not carry over.
  {
    source: "/all-commercial-group-members-get-20-off",
    destination: "/blog/commercial-group-20-off",
    permanent: true,
  },
  {
    source: "/embracing-neurodiversity-celebrating-autism-awareness-month-at-serendib",
    destination: "/blog/autism-awareness-month",
    permanent: true,
  },
  { source: "/monkeypox-alert", destination: "/blog/monkeypox-alert", permanent: true },
  {
    source: "/15-year-anniversary-party15-year-anniversary-party",
    destination: "/blog",
    permanent: true,
  },
  { source: "/category/:path*", destination: "/blog", permanent: true },
  { source: "/feed", destination: "/blog", permanent: true },
  { source: "/comments/feed", destination: "/blog", permanent: true },

  { source: "/partners", destination: "/our-partners", permanent: true },

  // Yoast SEO sitemaps.
  ...[
    "sitemap_index",
    "page-sitemap",
    "post-sitemap",
    "article-sitemap",
    "author-sitemap",
    "category-sitemap",
    "product-sitemap",
    "product_cat-sitemap",
  ].map((name) => ({ source: `/${name}.xml`, destination: "/sitemap.xml", permanent: true })),

  // UM flyers linked from the old Guidelines page, now self hosted.
  {
    source: "/wp-content/uploads/2024/01/UM-Communications-flyer-English.pdf",
    destination: "/documents/um-communications-flyer-english.pdf",
    permanent: true,
  },
  {
    source: "/wp-content/uploads/2024/01/UM-Communications-flyer-Spanish.pdf",
    destination: "/documents/um-communications-flyer-spanish.pdf",
    permanent: true,
  },
];
