import { GuidelineDocuments } from "@/components/sections/GuidelineDocuments";
import { PageIntro } from "@/components/sections/PageIntro";
import { guidelinesIntro } from "@/content/guidelines";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Guidelines and Procedures",
  description: guidelinesIntro,
  path: "/guidelines-and-procedures",
});

export default function GuidelinesPage() {
  return (
    <>
      <PageIntro title="Guidelines and Procedures" description={guidelinesIntro} />
      <GuidelineDocuments />
    </>
  );
}
