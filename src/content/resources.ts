import type { ResourceGroup } from "@/types";

export const resourcesIntro =
  "Provider and member resources, including health plan member handbooks and the medical guidelines used to review care.";

export const handbooks: ResourceGroup = {
  eyebrow: "PROVIDER AND MEMBER RESOURCES",
  title: "Health Plan Member Handbooks",
  items: [
    {
      title: "L.A. Care",
      tag: "PDF",
      description:
        "The Medi-Cal member handbook (Evidence of Coverage) from L.A. Care Health Plan.",
      href: "https://www.lacare.org/sites/default/files/la0262_mcla_eoc_en_202510_0.pdf",
      cta: "READ THE HANDBOOK",
    },
    {
      title: "Molina Healthcare",
      tag: "PDF",
      description:
        "The member handbook (Evidence of Coverage) from Molina Healthcare of California.",
      href: "https://www.molinahealthcare.com/-/media/Project/PWS/Healthcare/PDF/PDF/Medicare/CA/Materials/Member%20Materials%20and%20Forms/English/CA004-003-2026-SNP-EOC-EN-508.pdf",
      cta: "READ THE HANDBOOK",
    },
    {
      title: "Health Net",
      tag: "PDF",
      description: "The 2026 Medi-Cal member handbook from Health Net, a Centene company.",
      href: "/documents/hn-medi-cal-member-handbook-2026.pdf",
      cta: "READ THE HANDBOOK",
    },
  ],
};

export const medicalGuidelines: ResourceGroup = {
  eyebrow: "CARE GUIDELINES",
  title: "Medical Guidelines",
  note: "The materials provided below are guidelines used by this plan to authorize, modify, or deny care for persons with similar illnesses or conditions. Specific care and treatment may vary depending on individual need and the benefits covered under your contract.",
  items: [
    {
      title: "Medi-Cal Provider Manuals",
      tag: "WEBSITE",
      description:
        "Provider manuals for Medi-Cal from the California Department of Health Care Services (DHCS).",
      href: "https://www.dhcs.ca.gov/behavioral-health-continuum-infrastructure-program/medi-cal-provider-manuals/",
      cta: "VISIT THE SITE",
    },
    {
      title: "EPSDT Coverage Guide",
      tag: "PDF",
      description:
        "The federal guide to Early and Periodic Screening, Diagnostic, and Treatment (EPSDT) coverage for children and teens, from Medicaid.gov.",
      href: "https://www.medicaid.gov/medicaid/benefits/downloads/epsdt-coverage-guide.pdf",
      cta: "READ THE GUIDE",
    },
  ],
};

export const resourceGroups: ResourceGroup[] = [handbooks, medicalGuidelines];
