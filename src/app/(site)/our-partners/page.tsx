import { PageIntro } from "@/components/sections/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Our Partners", path: "/our-partners" });

export default function OurPartnersPage() {
  return <PageIntro title="Our Partners" />;
}
