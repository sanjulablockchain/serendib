import { PageIntro } from "@/components/sections/PageIntro";
import { ResourceGroups } from "@/components/sections/ResourceGroups";
import { resourcesIntro } from "@/content/resources";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Resources",
  description: resourcesIntro,
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageIntro title="Resources" description={resourcesIntro} />
      <ResourceGroups />
    </>
  );
}
