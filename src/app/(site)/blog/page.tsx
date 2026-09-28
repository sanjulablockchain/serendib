import { PageIntro } from "@/components/sections/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Blog", path: "/blog" });

export default function BlogPage() {
  return <PageIntro title="Blog" />;
}
