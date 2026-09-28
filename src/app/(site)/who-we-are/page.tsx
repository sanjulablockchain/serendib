import { PageIntro } from "@/components/sections/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Who We Are", path: "/who-we-are" });

export default function WhoWeArePage() {
  return <PageIntro title="Who We Are" />;
}
