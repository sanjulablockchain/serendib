import type { ComplianceItem } from "@/types";

export const reportingFormHref = "https://forms.cloud.microsoft/r/82zj6nqXiS";

export const complianceContact = {
  phone: { label: "(818) 626-5475", href: "tel:+18186265475" },
  officerPhone: { label: "(818) 839-5010 Ext 907", href: "tel:+18188395010,907" },
  email: { label: "Compliance@HumanCompassMSO.com", href: "mailto:Compliance@HumanCompassMSO.com" },
  form: { label: "Compliance Reporting Form", href: reportingFormHref },
};

export const complianceIntro = {
  eyebrow: "COMPLIANCE PROGRAM",
  title: "Integrity. Accountability. Speaking Up.",
  description: "Have a Compliance Concern? We’re Here to Listen 24/7",
};

export const heroChannels = [
  { eyebrow: "COMPLIANCE HOTLINE", ...complianceContact.phone },
  { eyebrow: "COMPLIANCE EMAIL", ...complianceContact.email },
  { eyebrow: "ANONYMOUS REPORTING", ...complianceContact.form },
];

export const commitment = {
  eyebrow: "OUR COMMITMENT",
  title: "Our Commitment to Compliance",
  paragraphs: [
    "At Human Compass MSO, we are committed to conducting business with integrity, accountability, and in accordance with applicable laws, regulations, contractual requirements, and ethical standards.",
    "Our Compliance Program is designed to promote a culture of compliance, identify and address potential risks, prevent and detect Fraud, Waste, and Abuse (FWA), and provide individuals with safe and accessible ways to raise compliance concerns.",
    "We encourage employees, providers, members, and other individuals who interact with Human Compass MSO to speak up when they have questions or concerns. You will not be retaliated against for reporting a compliance concern in good faith.",
  ],
  officer: {
    eyebrow: "CHIEF COMPLIANCE OFFICER",
    name: "Linette Hughes",
    role: "Chief Compliance Officer",
    description:
      "The Chief Compliance Officer is responsible for overseeing the Human Compass MSO Compliance Program and helping ensure that compliance concerns are appropriately identified, reported, investigated, and addressed.",
    note: "Questions regarding the Compliance Program or potential compliance concerns may be directed to the Compliance Department using any of the reporting methods below.",
  },
};

export const listening = {
  eyebrow: "REPORT A CONCERN",
  title: "We’re Here to Listen 24/7",
  paragraphs: [
    "Compliance reporting resources are available 24 hours a day, 7 days a week.",
    "You may report a concern through the method that is most comfortable for you. Reports may include concerns involving Fraud, Waste, and Abuse, violations of laws or regulations, potential conflicts of interest, privacy or security concerns, or other compliance related matters.",
  ],
  closing:
    "When submitting a report, please provide as much information as possible so that the concern can be appropriately reviewed. You may report a concern anonymously through the reporting form.",
};

export const reportingChannels = [
  {
    label: "Chief Compliance Officer Phone Number",
    text: complianceContact.officerPhone.label,
    href: complianceContact.officerPhone.href,
  },
  {
    label: "Compliance Hotline",
    text: complianceContact.phone.label,
    href: complianceContact.phone.href,
  },
  {
    label: "Compliance Email",
    text: complianceContact.email.label,
    href: complianceContact.email.href,
  },
  {
    label: "Anonymous Compliance Reporting Form",
    text: "Compliance Concern Reporting Form",
    href: reportingFormHref,
  },
];

export const aboutProgram = {
  eyebrow: "ABOUT",
  title: "About Our Compliance Program",
  intro:
    "The Human Compass MSO Compliance Program provides a framework for promoting ethical conduct and compliance throughout our organization.",
  listLabel: "The Compliance Program supports:",
  supports: [
    "Compliance with Laws, Regulations, and Contractual Requirements",
    "Fraud, Waste, and Abuse Prevention and Detection",
    "Compliance Education and Training",
    "Monitoring and Auditing",
    "Identification and Mitigation of Compliance Risks",
    "Reporting and Investigation of Compliance Concerns",
    "Corrective Action and Ongoing Improvement",
    "Protection Against Retaliation for Good Faith Reporting",
  ],
  closing:
    "Our Compliance Program is intended to help ensure that concerns are identified and addressed appropriately and that our organization continues to strengthen its compliance practices.",
};

export const fwa = {
  eyebrow: "FRAUD, WASTE & ABUSE",
  title: "Fraud, Waste, & Abuse (FWA) Reporting",
  paragraphs: [
    "Fraud, Waste, and Abuse can negatively impact the healthcare system, our members, providers, and the organizations we serve.",
    "We encourage anyone who identifies or suspects potential Fraud, Waste, or Abuse to report their concern.",
  ],
  examplesLabel: "Examples of potential FWA may include:",
  examples: [
    "Billing for services that were not provided",
    "Billing for services that are not supported by documentation",
    "Misrepresentation of services, diagnoses, or other information",
    "Improper or duplicate billing",
    "Providing or receiving services that are not medically necessary",
    "Misuse of healthcare benefits",
    "Kickbacks or inappropriate financial arrangements",
    "Falsification of records",
    "Other suspected violations of applicable laws, regulations, or contractual requirements",
  ],
  reportLabel: "If you suspect potential Fraud, Waste, or Abuse, you can report it 24/7 through:",
  closing: [
    "Please provide as much detail as possible, including the individuals or entities involved, dates, services, and any supporting information you may have.",
    "You do not need to determine whether a violation actually occurred before making a report. If something concerns you, we encourage you to report it so it can be appropriately reviewed.",
  ],
};

export const providerTraining = {
  eyebrow: "PROVIDER COMPLIANCE TRAINING",
  title: "Annual Compliance Training for Providers",
  paragraphs: [
    "Human Compass MSO is committed to ensuring that participating providers and applicable provider personnel understand their responsibilities related to compliance, Fraud, Waste and Abuse prevention, HIPAA protection, and other applicable compliance requirements.",
    "Providers are required to complete the applicable annual Compliance Training and submit an attestation to our Compliance Department.",
  ],
  attestation: {
    before:
      "Providers must review the training materials annually, complete the Compliance Training Attestation for your organization, and submit it to the Human Compass Compliance Department via email at ",
    after:
      ". If your organization completes their own General Compliance, FWA, and HIPAA training on an annual basis that meets the specified criteria, your organization can just complete the Compliance Training Attestation and state that your own training was provided.",
  },
  questions: {
    before:
      "Questions regarding the training or provider compliance requirements may be directed to the Compliance Department at ",
    after: ".",
  },
};

/** Training items are placeholders until the PDFs are supplied, then add an href to each. */
export const trainingItems: ComplianceItem[] = [
  {
    title: "Annual Provider Compliance Training",
    note: "Open the Compliance Training presentation.",
    action: "COMING SOON",
    pending: true,
  },
  {
    title: "Compliance Training Attestation",
    note: "Complete and submit the attestation for your organization each year.",
    action: "COMING SOON",
    pending: true,
  },
];

export const resources = {
  eyebrow: "RESOURCES & POLICIES",
  title: "Compliance Resources & Policies",
  description:
    "Human Compass MSO maintains policies and procedures to support our commitment to compliance, privacy, non-discrimination, and the prevention and detection of Fraud, Waste, and Abuse. The following resources are available for review:",
};

export const resourceItems: ComplianceItem[] = [
  {
    title: "Compliance Program",
    note: "Learn more about the Human Compass MSO Compliance Program and our commitment to ethical and compliant business practices.",
    action: "VIEW PDF",
    href: "/documents/comp-01-compliance-program-v1.pdf",
  },
  {
    title: "HIPAA Program",
    note: "Policies and procedures addressing the protection and privacy of Protected Health Information (PHI) and compliance with applicable HIPAA requirements.",
    action: "VIEW PDF",
    href: "/documents/comp-03-hipaa-program-v1.pdf",
  },
  {
    title: "Fraud, Waste, and Abuse",
    note: "Policies and procedures addressing the prevention, detection, reporting, investigation, and correction of suspected Fraud, Waste, and Abuse.",
    action: "VIEW PDF",
    href: "/documents/comp-04-fraud-waste-abuse-program-v1.pdf",
  },
  {
    title: "Non-Discrimination",
    note: "Policies and procedures supporting non-discrimination and equitable access to applicable services and programs.",
    action: "VIEW PDF",
    href: "/documents/comp-33-non-discrimination-v1.pdf",
  },
];

export const speakUp = {
  eyebrow: "SPEAK UP",
  title: "Speak Up. We’re Listening",
  lead: "Compliance is everyone’s responsibility.",
  paragraphs: [
    "Whether you are an employee, provider, member, contractor, or other individual working with Human Compass MSO, we encourage you to ask questions and report concerns.",
    "If you see something that may not be right, speak up.",
    "Reports can be made 24 hours a day, 7 days a week through our Compliance Hotline, Compliance Email, or Anonymous Compliance Reporting Form.",
    "Human Compass MSO is committed to reviewing concerns appropriately and maintaining a culture where individuals can raise concerns without fear of retaliation for making a good faith report.",
  ],
};
