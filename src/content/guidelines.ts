import type { GuidelineDocument } from "@/types";

export const guidelinesIntro =
  "Read our utilization management information and the policy documents that guide how care is authorized, referred and reviewed.";

export const utilizationManagement = {
  eyebrow: "UTILIZATION MANAGEMENT",
  title: "Utilization Management",
  description:
    "Choose a language to read our Utilization Management (UM) communication information, UM contact info, and the Serendib Healthways UM Affirmations.",
  flyers: [
    { label: "English", href: "/documents/um-communications-flyer-english.pdf" },
    { label: "Spanish", href: "/documents/um-communications-flyer-spanish.pdf" },
  ],
};

export const documentsHeading = {
  eyebrow: "POLICY DOCUMENTS",
  title: "Guidelines and Procedures",
};

export const readDocumentLabel = "READ THE DOCUMENT";

export const guidelineDocuments: GuidelineDocument[] = [
  {
    title: "Authorization Process",
    year: "2025",
    description: "Read the policy document for the Authorization Process.",
    href: "/documents/2025-authorization-process.pdf",
  },
  {
    title: "Standing and Extended Referrals",
    year: "2025",
    description: "Read the policy document for Standing and Extended Referrals.",
    href: "/documents/2025-standing-extended-referrals.pdf",
  },
  {
    title: "Denial and Modification Process",
    year: "2025",
    description: "Read the policy document for the Denial and Modification Process.",
    href: "/documents/2025-denial-modification-process.pdf",
  },
  {
    title: "Child Preventive Services",
    year: "2025",
    description: "Read the policy document for Child Preventive Services.",
    href: "/documents/2025-child-preventive-services.pdf",
  },
  {
    title: "Adult Preventive Services",
    year: "2025",
    description: "Read the policy document for Adult Preventive Services.",
    href: "/documents/2025-adult-preventive-services.pdf",
  },
];
