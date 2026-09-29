import partnersImage from "../../public/images/partners.webp";

export const partnersIntro = {
  breadcrumb: { home: "HOME", current: "OUR PARTNERS" },
  eyebrow: "OUR PARTNERS",
  titleStart: "Referrals, telehealth, ",
  titleHighlight: "urgent care",
  titleEnd: " and more.",
  lead: "Accessible and comprehensive pediatric care services",
  description:
    "By partnering with key organizations, we can make a more significant impact, so every child can experience the fullness of a healthy life. Through our work with insurance organizations, we have built partnerships that help you get the best out of your plan for your child's health and safety.",
  primaryCta: { label: "SEE OUR PARTNERS", href: "#plans" },
  secondaryCta: { label: "FIND A DOCTOR", href: "/our-doctors" },
  image: partnersImage,
  imageAlt: "Patient showing a heart with her hands",
  imageCaption: "NO DOCTOR RESTRICTION · ANYWHERE IN LOS ANGELES",
};

export const benefits = {
  eyebrow: "WHAT OUR PARTNERSHIPS BRING",
  title: "Care for every hour and every need.",
  items: [
    {
      numeral: "I",
      symbol: "⇄",
      title: "Streamlined Referrals",
      text: "Referral requests reviewed by our own Pediatric Medical Directors, not insurance companies.",
    },
    {
      numeral: "II",
      symbol: "☏",
      title: "Telehealth",
      text: "Convenient virtual visits, available seven days a week.",
    },
    {
      numeral: "III",
      symbol: "✚",
      title: "Urgent Care",
      text: "The only IPA providing pediatric urgent care staffed by board-certified pediatricians.",
    },
    {
      numeral: "IV",
      symbol: "☾",
      title: "After Hours",
      text: "When your regular doctor is closed, our after-hours clinic is open.",
    },
  ],
};

export const plansAccepted = {
  eyebrow: "OUR PARTNERS",
  title: "The health plans we accept.",
  paragraphs: [
    "We are open seven days a week, and we are the only IPA providing pediatric urgent care and after-hours services staffed by board-certified pediatricians.",
    "We offer telehealth seven days a week and accept plans from L.A. Care, Molina, Health Net, Medi-Cal and more, exclusively focused on pediatric care.",
  ],
  badge: "ACCEPTED ✦",
  numerals: ["I", "II", "III", "IV", "V", "VI"],
};

export const careNetwork = {
  eyebrow: "OUR CARE NETWORK",
  title: "Any partner clinic, no doctor restriction.",
  cta: "VISIT ▸",
  clinics: [
    {
      name: "Kids & Teens Medical Group",
      href: "https://www.ktdoctor.com/",
      logo: "/images/partners/kids-and-teens.webp",
      logoWidth: 1250,
      logoHeight: 919,
      description:
        "20+ connected clinics and 50+ doctors across California, open seven days a week.",
    },
    {
      name: "Afterhours Pediatric Urgent Care",
      href: "https://pediatricafterhour.com/",
      logo: "/images/partners/afterhours-pediatric.webp",
      logoWidth: 625,
      logoHeight: 675,
      description: "Same-day urgent care when your regular doctor can't see you.",
    },
  ],
};
