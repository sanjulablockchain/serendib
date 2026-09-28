import { PageIntro } from "@/components/sections/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Our Doctors", path: "/our-doctors" });

export default function OurDoctorsPage() {
  return <PageIntro title="Our Doctors" />;
}
