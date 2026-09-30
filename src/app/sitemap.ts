import type { MetadataRoute } from "next";
import { articles } from "@/content/blog";
import { mainNav, site } from "@/content/site";

const legalPaths = ["/privacy-policy", "/terms-and-conditions"];

export default function sitemap(): MetadataRoute.Sitemap {
  const articlePaths = articles.map(({ slug }) => `/blog/${slug}`);
  const paths = [...mainNav.map((item) => item.href), ...articlePaths, ...legalPaths];
  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
