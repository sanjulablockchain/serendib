import { CareNetwork } from "@/components/sections/CareNetwork";
import { Guarantee } from "@/components/sections/Guarantee";
import { PartnersIntro } from "@/components/sections/PartnersIntro";
import { PartnershipBenefits } from "@/components/sections/PartnershipBenefits";
import { PlansAccepted } from "@/components/sections/PlansAccepted";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Our Partners", path: "/our-partners" });

export default function OurPartnersPage() {
  return (
    <>
      <PartnersIntro />
      <Container>
        <PartnershipBenefits />
        <PlansAccepted />
        <CareNetwork />
        <Guarantee />
      </Container>
    </>
  );
}
