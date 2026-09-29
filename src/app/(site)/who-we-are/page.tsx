import { AnytimeAnywhere } from "@/components/sections/AnytimeAnywhere";
import { Creed } from "@/components/sections/Creed";
import { Guarantee } from "@/components/sections/Guarantee";
import { OurGroup } from "@/components/sections/OurGroup";
import { WhoIntro } from "@/components/sections/WhoIntro";
import { WhoPartners } from "@/components/sections/WhoPartners";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Who We Are", path: "/who-we-are" });

export default function WhoWeArePage() {
  return (
    <>
      <WhoIntro />
      <Container>
        <Creed />
        <AnytimeAnywhere />
        <OurGroup />
        <Guarantee />
        <WhoPartners />
      </Container>
    </>
  );
}
