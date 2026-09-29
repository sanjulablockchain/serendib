import type { MetadataRoute } from "next";
import { mainNav, site } from "@/content/site";

const legalPaths = ["/privacy-policy", "/terms-and-conditions"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...mainNav.map((item) => item.href), ...legalPaths];
  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
