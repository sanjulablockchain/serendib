import afterHoursImage from "../../public/images/after-hours.webp";
import heroImage from "../../public/images/hero.webp";
import autismImage from "../../public/images/news/autism.webp";
import memberOfferImage from "../../public/images/news/member-offer.webp";
import monkeypoxImage from "../../public/images/news/monkeypox.webp";
import partnersImage from "../../public/images/partners.webp";
import { site } from "@/content/site";
import type { ComplianceItem, Doctor, HealthPlan, NewsPost, PlanCategory, Stat } from "@/types";

export const hero = {
  eyebrow: "WELCOME TO SERENDIB HEALTHWAYS HMO / IPA",
  titleStart: "Your child, ",
  titleHighlight: "the best care",
  titleEnd: " they deserve.",
  description:
    "Affordable, high-quality pediatric coverage for Los Angeles County, with access to 20+ community clinics, 50+ pediatric doctors, and a referral process reviewed by our own Pediatric Medical Directors.",
  primaryCta: { label: "MAKE THE SWITCH", href: site.contact.transferBookingHref },
  secondaryCta: { label: "FIND A DOCTOR", href: "#doctors" },
  image: heroImage,
  imageAlt: "Pediatrician in discussion with a family",
  imageCaption: "BOARD-CERTIFIED · 10+ YEARS EXPERIENCE",
};

export const marqueeItems = [
  "OPEN SEVEN DAYS A WEEK",
  "PEDIATRIC URGENT CARE",
  "AFTER-HOURS SERVICES",
  "TELEHEALTH 7 DAYS A WEEK",
  "SAME-DAY SICK & WELL VISITS",
  "IMMEDIATE TRANSFER TO OUR NETWORK",
];

export const stats: Stat[] = [
  {
    value: "20+",
    label: "COMMUNITY CLINICS",
    note: "Visit any of them, records sync instantly",
  },
  {
    value: "50+",
    label: "PEDIATRIC DOCTORS",
    note: "Board certified, 10+ years experience",
  },
  {
    value: "7 / 7",
    label: "DAYS A WEEK",
    note: "Same-day appointments & telehealth",
  },
];

export const plan = {
  eyebrow: "WHY SERENDIB HEALTHWAYS",
  title: "Say goodbye to HMO restrictions.",
  on: "ON",
  off: "OFF",
};

export const planCategories: PlanCategory[] = [
  {
    numeral: "I",
    label: "Care",
    title: "CARE",
    rows: [
      {
        label: "Pediatric Urgent Care",
        note: "The only IPA offering it, staffed by board-certified pediatricians.",
        on: true,
      },
      {
        label: "After-Hours Services",
        note: "Care beyond regular office hours, seven days a week.",
        on: true,
      },
      {
        label: "Primary Care",
        note: "Check-ups, vaccinations and screenings for infants, children, teens and young adults.",
        on: true,
      },
      {
        label: "Emergency-Room Crowds",
        note: "Fewer patients and disease types in our waiting areas.",
        on: false,
      },
    ],
  },
  {
    numeral: "II",
    label: "Access",
    title: "ACCESS",
    rows: [
      {
        label: "Same-Day Appointments",
        note: "Sick and well visits, open seven days a week.",
        on: true,
      },
      { label: "Telehealth", note: "Convenient virtual visits, seven days a week.", on: true },
      {
        label: "Any Doctor, Any Clinic",
        note: "Visit any location and records sync immediately.",
        on: true,
      },
      {
        label: "Appointment Restrictions",
        note: "No limits on appointments or availability.",
        on: false,
      },
    ],
  },
  {
    numeral: "III",
    label: "Referrals",
    title: "REFERRALS",
    rows: [
      {
        label: "Streamlined Referral Process",
        note: "Reviewed by our own Pediatric Medical Directors.",
        on: true,
      },
      {
        label: "Directors Who Know Your Child",
        note: "They put your child's healthcare needs first.",
        on: true,
      },
      {
        label: "Standing & Extended Referrals",
        note: "Clear, published policies for ongoing specialist care.",
        on: true,
      },
      {
        label: "Insurance-Company-First Decisions",
        note: "Your child comes first, not the insurance company.",
        on: false,
      },
    ],
  },
  {
    numeral: "IV",
    label: "Switching",
    title: "SWITCHING",
    rows: [
      { label: "Immediate Transfer", note: "Move straight into our own network.", on: true },
      { label: "Paperwork Handled", note: "We take care of all of it for you.", on: true },
      {
        label: "Transfer Team On Call",
        note: "Book a call and our Transfer Team guides every step.",
        on: true,
      },
      {
        label: "Hassle",
        note: "Switching is easy, efficient and 100% hassle-free.",
        on: false,
      },
    ],
  },
];

export const afterHours = {
  eyebrow: "THE ONLY IPA OF ITS KIND",
  title: "Pediatric urgent care, even after hours.",
  description:
    "Our after-hours services are staffed by board-certified pediatricians. With fewer patients than an emergency room, your child gets professional, compassionate care without unnecessary exposure to germs.",
  cta: { label: "VISIT AFTERHOURS PEDIATRIC CLINIC", href: "https://pediatricafterhour.com/" },
  image: afterHoursImage,
  imageAlt: "After-hours pediatric urgent care",
};

export const doctorsSection = {
  eyebrow: "OUR DOCTORS",
  title: "Pediatricians from Los Angeles' most reputable hospitals.",
  viewAll: { label: "VIEW ALL 50+ DOCTORS ▸", href: "/our-doctors" },
  areasTitle: "FIND A DOCTOR IN YOUR AREA",
  areasNote: "Visit any clinic and your records sync to it immediately.",
};

export const medicalDirector = {
  badge: "MEDICAL DIRECTOR",
  name: "Janesri De Silva",
  credentials: "MD, FAAP · Board Certified",
  bio: "Referrals are reviewed by our own Pediatric Medical Directors who personally know your child.",
  image: "/images/doctors/janesri-de-silva.webp",
};

export const doctors: Doctor[] = [
  {
    name: "Martin Fineberg",
    credentials: "MD, FAAP",
    image: "/images/doctors/martin-fineberg.webp",
  },
  {
    name: "Barbara Rodriguez",
    credentials: "MD, FAAP",
    image: "/images/doctors/barbara-rodriguez.webp",
  },
  { name: "Padma Bala", credentials: "MD, FAAP", image: "/images/doctors/padma-bala.webp" },
  { name: "Sylvia Lam", credentials: "MD, FAAP", image: "/images/doctors/sylvia-lam.webp" },
  { name: "Faiza Iram", credentials: "MD, FAAP", image: "/images/doctors/faiza-iram.webp" },
  { name: "Brian Bhatt", credentials: "MD, FAAP", image: "/images/doctors/brian-bhatt.webp" },
];

const areaEntries: [string, string][] = [
  ["Agoura Hills", "agoura"],
  ["Arcadia", "arcadia"],
  ["Beverly Hills", "beverly"],
  ["Canyon Country", "canyon"],
  ["Culver City", "culver"],
  ["Downey", "downey"],
  ["Glendale", "glendale"],
  ["Hollywood", "hollywood"],
  ["La Cañada", "lacanada"],
  ["Mission Hills", "mission"],
  ["Northridge", "northridge"],
  ["Pico Rivera", "pico"],
  ["Pasadena", "pasadena"],
  ["Tarzana", "tarzana"],
  ["San Fernando", "sanfernando"],
  ["Santa Monica", "santamonica"],
  ["Torrance", "torrance"],
  ["Valencia", "valencia"],
  ["Van Nuys", "van"],
  ["West Hills", "west"],
  ["Whittier", "whittier"],
];

export const areas = areaEntries.map(([name, id]) => ({ name, href: `/our-doctors#${id}` }));

export const partnersSection = {
  eyebrow: "OUR PARTNERS",
  title: "Backed by the largest pediatric medical group in Los Angeles.",
  description:
    "Our partnership with Kids & Teens Medical Group gives members well-child check-ups, immunizations, and treatment for acute and chronic illness, preventive care to urgent care, all in one network.",
  image: partnersImage,
  imageAlt: "Patient showing a heart with her hands",
  plansTitle: "HEALTH PLANS WE ACCEPT",
};

export const partnerLogos = [
  {
    name: "Kids & Teens Medical Group",
    href: "https://www.ktdoctor.com/",
    image: "/images/partners/kids-and-teens.webp",
    width: 1250,
    height: 919,
  },
  {
    name: "Afterhours Pediatric Urgent Care",
    href: "https://pediatricafterhour.com/",
    image: "/images/partners/afterhours-pediatric.webp",
    width: 625,
    height: 675,
  },
];

export const healthPlans: HealthPlan[] = [
  {
    name: "Blue Shield of California",
    logo: "/images/plans/blueshield.png",
    logoAlt: "Blue Shield of California logo",
  },
  { name: "Health Net", logo: "/images/plans/healthnet.png", logoAlt: "Health Net logo" },
  { name: "L.A. Care", logo: "/images/plans/lacare.png", logoAlt: "L.A. Care logo" },
  {
    name: "Molina Healthcare",
    logo: "/images/plans/molina.png",
    logoAlt: "Molina Healthcare logo",
  },
  {
    name: "Anthem Blue Cross",
    logo: "/images/plans/anthem.png",
    logoAlt: "Anthem Blue Cross logo",
  },
  { name: "Medi-Cal", logo: "/images/plans/medical.png", logoAlt: "Medi-Cal logo" },
];

export const compliance = {
  eyebrow: "COMPLIANCE",
  title: "What we say is what we do.",
  description:
    "We are firmly committed to strong moral principles. Our compliance programs, trainings and reporting tools are open to members, providers and staff.",
  cta: { label: "GUIDELINES & PROCEDURES", href: "/guidelines-and-procedures" },
};

export const complianceItems: ComplianceItem[] = [
  {
    title: "Compliance Concern Reporting",
    note: "Report a concern confidentially using our online form.",
    action: "REPORT",
    href: "#",
  },
  {
    title: "Annual Provider Compliance Training",
    note: "Required yearly training for all network providers.",
    action: "COMING SOON",
    href: "#",
    pending: true,
  },
  {
    title: "Compliance Training Attestation",
    note: "Confirm completion of your annual compliance training.",
    action: "COMING SOON",
    href: "#",
    pending: true,
  },
  {
    title: "Compliance Program",
    note: "COMP 01 · Our commitment to ethical, lawful operations.",
    action: "VIEW PDF",
    href: "#",
  },
  {
    title: "HIPAA Program",
    note: "COMP 03 · How we protect member health information.",
    action: "VIEW PDF",
    href: "#",
  },
  {
    title: "Fraud, Waste & Abuse Program",
    note: "COMP 04 · Preventing, detecting and reporting FWA.",
    action: "VIEW PDF",
    href: "#",
  },
  {
    title: "Non-Discrimination",
    note: "COMP 33 · Equal access to care for every member.",
    action: "VIEW PDF",
    href: "#",
  },
];

export const news = {
  eyebrow: "NEWS & ARTICLES",
  title: "From Serendib Healthways",
  viewAll: { label: "VIEW ALL ARTICLES ▸", href: "/blog" },
  readMore: "READ MORE ▸",
};

export const newsPosts: NewsPost[] = [
  {
    title: "Autism Awareness Month: Embracing Neurodiversity",
    excerpt:
      "How we create sensory friendly, inclusive care for children with autism and their families.",
    tag: "APRIL 2024",
    href: "https://www.serendibhealthways.com/embracing-neurodiversity-celebrating-autism-awareness-month-at-serendib/",
    image: autismImage,
    imageAlt: "Colorful letters spelling Autism",
  },
  {
    title: "Monkeypox Alert",
    excerpt:
      "No prior authorization, precertification or referral required for monkeypox diagnosis or treatment.",
    tag: "HEALTH ALERT",
    href: "https://www.serendibhealthways.com/monkeypox-alert/",
    image: monkeypoxImage,
    imageAlt: "Monkeypox symptoms",
  },
  {
    title: "All Commercial Group Members Get 20% Off",
    excerpt:
      "20% off out-of-pocket expenses, co-pays and deductibles for every commercial group member.",
    tag: "MEMBER OFFER",
    href: "https://www.serendibhealthways.com/all-commercial-group-members-get-20-off/",
    image: memberOfferImage,
    imageAlt: "Pediatric insurance Los Angeles",
  },
];

export const switching = {
  title: "SWITCHING TO SERENDIB HEALTHWAYS",
  badge: "100% HASSLE-FREE",
  intro:
    "We've made switching to our HMO/IPA easy and efficient. We can do an immediate transfer to our own network, and we take care of all the paperwork.",
  steps: [
    { numeral: "I.", text: "Get in touch by phone, text or Messenger." },
    { numeral: "II.", text: "We complete every form on your behalf." },
    { numeral: "III.", text: "Your child is seen at any of our 20+ clinics." },
  ],
  notice: 'By selecting "Begin the Switch", you let our team handle every form for you.',
  actions: [
    { label: "CALL US · (626) 655-4041", href: "tel:+16266554041" },
    { label: "TEXT US · ENGLISH / ESPAÑOL · 818-649-3898", href: "sms:+18186493898" },
    { label: "MESSENGER CHAT · EN / ES", href: "https://m.me/serendibhealthways" },
  ],
  cta: {
    label: "BEGIN THE SWITCH",
    href: site.contact.transferBookingHref,
  },
};

export const footerActions = {
  call: "CALL",
  text: "TEXT",
  top: "BACK TO TOP",
};
