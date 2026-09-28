import { PageIntro } from "@/components/sections/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Guidelines and Procedures",
  path: "/guidelines-and-procedures",
});

export default function GuidelinesPage() {
  return <PageIntro title="Guidelines and Procedures" />;
}
