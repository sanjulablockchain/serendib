import { LegalContent } from "@/components/sections/LegalContent";
import { termsAndConditions } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description:
    "The terms that apply when you use the Serendib Healthways website and text messaging.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return <LegalContent document={termsAndConditions} />;
}
