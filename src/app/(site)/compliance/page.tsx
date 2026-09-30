import { ComplianceAbout } from "@/components/sections/ComplianceAbout";
import { ComplianceCommitment } from "@/components/sections/ComplianceCommitment";
import { ComplianceHero } from "@/components/sections/ComplianceHero";
import { ComplianceReporting } from "@/components/sections/ComplianceReporting";
import { ComplianceResources } from "@/components/sections/ComplianceResources";
import { FraudWasteAbuse } from "@/components/sections/FraudWasteAbuse";
import { ProviderTraining } from "@/components/sections/ProviderTraining";
import { SpeakUp } from "@/components/sections/SpeakUp";
import { complianceIntro } from "@/content/compliance";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Compliance",
  description: `${complianceIntro.title} ${complianceIntro.description}.`,
  path: "/compliance",
});

export default function CompliancePage() {
  return (
    <>
      <ComplianceHero />
      <ComplianceCommitment />
      <ComplianceReporting />
      <ComplianceAbout />
      <FraudWasteAbuse />
      <ProviderTraining />
      <ComplianceResources />
      <SpeakUp />
    </>
  );
}
