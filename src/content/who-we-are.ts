import careImage from "../../public/images/who-care.webp";
import introImage from "../../public/images/who-intro.webp";

export const whoIntro = {
  breadcrumb: { home: "HOME", current: "WHO WE ARE" },
  eyebrow: "THE BEST CARE FOR YOUR CHILD",
  titleStart: "Embracing creativity and ",
  titleHighlight: "passion",
  titleEnd: " for pediatric health.",
  lead: "Committed to compassionate and quality care",
  description:
    "Our mission is simple: we believe that what we say is what we do. We are firmly committed to strong moral principles that guide how we do business. Our IPA guarantees your child is given pediatric medical care at any of our multiple locations across Los Angeles County.",
  primaryCta: { label: "GET IN TOUCH", href: "/contact-us" },
  secondaryCta: { label: "FIND A DOCTOR", href: "/our-doctors" },
  image: introImage,
  imageAlt: "Child healthcare insurance",
  imageCaption: "PEDIATRIC HMO / IPA · LOS ANGELES COUNTY",
};

export const creed = {
  eyebrow: "OUR CREED",
  title: "Three principles guide everything we do.",
  items: [
    {
      numeral: "I",
      symbol: "✦",
      label: "VISION",
      title: "Imaginative and inventive.",
      text: "We embrace new ideas and different ways of looking at things. Our playful approach fosters creativity and ensures that we laugh and have fun while working toward a common goal.",
    },
    {
      numeral: "II",
      symbol: "♥",
      label: "PASSION",
      title: "We put our heart into it.",
      text: "Passion is the energy, enthusiasm, and dedication we bring to what we do and what is being delivered to our customers.",
    },
    {
      numeral: "III",
      symbol: "⚖",
      label: "MISSION",
      title: "What we say is what we do.",
      text: "We are firmly committed to strong moral principles that guide how we do business.",
    },
  ],
};

export const care = {
  eyebrow: "ANYTIME, ANYWHERE",
  title: "Comprehensive pediatric care.",
  subtitle: "Access to After-Hours Pediatric Urgent Care and Kids & Teens Medical Group",
  paragraphs: [
    "With 11 locations across Los Angeles County, we offer access to over 15 medical office locations across California. Our IPA has 30+ dedicated pediatric doctors, and we offer same-day well and sick visits at any of our locations.",
    "Select any doctor and visit any location. Our medical record system is centralized and interlinked across all locations, ensuring seamless care for your child.",
  ],
  stats: [
    { value: "11", label: "LOCATIONS IN LOS ANGELES COUNTY" },
    { value: "15+", label: "MEDICAL OFFICES ACROSS CALIFORNIA" },
    { value: "30+", label: "DEDICATED PEDIATRIC DOCTORS" },
    { value: "SAME DAY", label: "WELL & SICK VISITS" },
  ],
  image: careImage,
  imageAlt: "Pediatrician in discussion with a family",
};

export const group = {
  eyebrow: "OUR GROUP",
  title: "Two practices, one network of care.",
  practices: [
    {
      logo: "/images/partners/kids-and-teens.webp",
      logoWidth: 1250,
      logoHeight: 919,
      logoAlt: "Kids & Teens Medical Group",
      tag: "I · PRIMARY & URGENT CARE",
      title:
        "20+ connected clinics across California, with over 50 doctors ready to help at a location near you.",
      points: [
        "High-quality pediatric primary and urgent care for infants, children, teens and young adults.",
        "Open seven days a week, with same-day appointments for sick and well visits.",
        "Telehealth appointments available for added convenience.",
      ],
      cta: { label: "VISIT KTDOCTOR.COM ▸", href: "https://www.ktdoctor.com/" },
    },
    {
      logo: "/images/partners/afterhours-pediatric.webp",
      logoWidth: 625,
      logoHeight: 675,
      logoAlt: "Afterhours Pediatric Urgent Care",
      tag: "II · WHEN YOUR DOCTOR IS CLOSED",
      title:
        "When your child needs attention and you can't get an appointment with your regular doctor, we're here to help.",
      points: [
        "Same-day appointments and most insurances accepted.",
        "Low-cost urgent care with prompt, courteous service.",
        "Fewer patients than an emergency room, so less exposure to unnecessary germs.",
      ],
      cta: { label: "VISIT PEDIATRICAFTERHOUR.COM ▸", href: "https://pediatricafterhour.com/" },
    },
  ],
};

export const guarantee = {
  text: "Our very own IPA guarantees your child is given pediatric medical care at any of our multiple locations across Los Angeles County.",
  cta: { label: "FIND A DOCTOR", href: "/our-doctors" },
};

export const whoPartners = {
  eyebrow: "OUR PARTNERS",
  title: "The only IPA offering pediatric after-hours care.",
  paragraphs: [
    "We are open seven days a week, and we are the only IPA providing pediatric urgent care and after-hours services staffed by board-certified pediatricians.",
    "Convenient telehealth seven days a week, exclusively focused on pediatric care.",
  ],
  cta: { label: "ALL OUR PARTNERS ▸", href: "/our-partners" },
  plansTitle: "HEALTH PLANS WE ACCEPT",
};
