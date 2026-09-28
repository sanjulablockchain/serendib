import { PageIntro } from "@/components/sections/PageIntro";
import { site } from "@/content/site";

export default function HomePage() {
  return <PageIntro title={site.tagline} description={site.description} />;
}
