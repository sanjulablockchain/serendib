import { LegalContent } from "@/components/sections/LegalContent";
import { privacyPolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Serendib Healthways collects, uses, discloses and protects your personal and health information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalContent document={privacyPolicy} />;
}
