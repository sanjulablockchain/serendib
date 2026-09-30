import { BlogGrid } from "@/components/sections/BlogGrid";
import { BlogHero } from "@/components/sections/BlogHero";
import { blogIntro } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Blog",
  description: blogIntro.description,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogGrid />
    </>
  );
}
