import { PageIntro } from "@/components/sections/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Contact Us", path: "/contact-us" });

export default function ContactUsPage() {
  return <PageIntro title="Contact Us" />;
}
