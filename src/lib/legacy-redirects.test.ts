import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getArticle } from "@/content/blog";
import { legacyRedirects } from "./legacy-redirects";

const root = process.cwd();

/** Old WordPress addresses seen in the Wayback Machine, with where each should land now. */
const oldUrls: Record<string, string> = {
  "/15-year-anniversary-party15-year-anniversary-party": "/blog",
  "/all-commercial-group-members-get-20-off": "/blog/commercial-group-20-off",
  "/embracing-neurodiversity-celebrating-autism-awareness-month-at-serendib":
    "/blog/autism-awareness-month",
  "/monkeypox-alert": "/blog/monkeypox-alert",
  "/partners": "/our-partners",
  "/feed": "/blog",
  "/comments/feed": "/blog",
  "/category/news": "/blog",
  "/sitemap_index.xml": "/sitemap.xml",
  "/page-sitemap.xml": "/sitemap.xml",
  "/post-sitemap.xml": "/sitemap.xml",
  "/article-sitemap.xml": "/sitemap.xml",
  "/author-sitemap.xml": "/sitemap.xml",
  "/category-sitemap.xml": "/sitemap.xml",
  "/product-sitemap.xml": "/sitemap.xml",
  "/product_cat-sitemap.xml": "/sitemap.xml",
  "/wp-content/uploads/2024/01/UM-Communications-flyer-English.pdf":
    "/documents/um-communications-flyer-english.pdf",
  "/wp-content/uploads/2024/01/UM-Communications-flyer-Spanish.pdf":
    "/documents/um-communications-flyer-spanish.pdf",
};

/** Resolve a path the way Next.js would: exact source, or a `:path*` wildcard source. */
function resolve(path: string): string | undefined {
  for (const { source, destination } of legacyRedirects) {
    if (source === path) return destination;
    if (source.endsWith("/:path*") && path.startsWith(source.slice(0, -"/:path*".length) + "/")) {
      return destination;
    }
  }
  return undefined;
}

function destinationExists(destination: string): boolean {
  if (destination === "/sitemap.xml") return existsSync(join(root, "src/app/sitemap.ts"));
  if (destination.startsWith("/documents/")) return existsSync(join(root, "public", destination));
  if (destination.startsWith("/blog/")) return getArticle(destination.slice(6)) !== undefined;
  return existsSync(join(root, "src/app/(site)", destination, "page.tsx"));
}

describe("legacyRedirects", () => {
  it.each(Object.entries(oldUrls))("sends %s to %s", (from, to) => {
    expect(resolve(from)).toBe(to);
  });

  it("only points at pages and files that exist", () => {
    for (const { destination } of legacyRedirects) {
      expect(destinationExists(destination), destination).toBe(true);
    }
  });

  it("is permanent, so search engines move the old ranking over", () => {
    for (const redirect of legacyRedirects) expect(redirect.permanent).toBe(true);
  });

  it("never redirects a path that is still a live page", () => {
    for (const { source } of legacyRedirects) {
      expect(existsSync(join(root, "src/app/(site)", source, "page.tsx")), source).toBe(false);
    }
  });
});
