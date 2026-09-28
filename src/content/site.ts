import type { NavItem, SocialLink } from "@/types";

export const site = {
  name: "Serendib Healthways",
  tagline: "Affordable health insurance in Los Angeles is now within reach",
  description:
    "Serendib Healthways is a pediatric focused HMO and IPA offering affordable, community focused health coverage for children across Los Angeles County.",
  url: "https://www.serendibhealthways.com",
  contact: {
    phone: "(626) 655 4041",
    phoneHref: "tel:+16266554041",
    text: "(818) 649 3898",
    textHref: "sms:+18186493898",
    textNote: "English and Spanish",
    address: {
      street: "504 S Sierra Madre Blvd",
      city: "Pasadena",
      region: "CA",
      postalCode: "91107",
    },
  },
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Our Partners", href: "/our-partners" },
  { label: "Our Doctors", href: "/our-doctors" },
  { label: "Guidelines and Procedures", href: "/guidelines-and-procedures" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/serendibhealthways" },
  { label: "Instagram", href: "https://www.instagram.com/serendib_healthways/" },
];
