import { ContactHero } from "@/components/sections/ContactHero";
import { ContactLocation } from "@/components/sections/ContactLocation";
import { ContactMessage } from "@/components/sections/ContactMessage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Send Serendib Healthways a message, call, text or email our team, or find our Pasadena office.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return (
    <>
      <ContactHero />
      <ContactMessage />
      <ContactLocation />
    </>
  );
}
