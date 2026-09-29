import type { FooterColumn, NavItem, NavLinkItem, SocialLink } from "@/types";

export const site = {
  name: "Serendib Healthways",
  tagline: "Affordable health insurance in Los Angeles is now within reach",
  description:
    "Serendib Healthways is a pediatric focused HMO and IPA offering affordable, community focused health coverage for children across Los Angeles County.",
  url: "https://www.serendibhealthways.com",
  utilityTagline: "PEDIATRIC HMO / IPA · LOS ANGELES COUNTY · OPEN 7 DAYS",
  copyright: "© 2026 Serendib Healthways. All rights reserved.",
  footerBlurb:
    "Serendib Healthways puts your care first, making pediatric care accessible across Los Angeles County.",
  contact: {
    phone: "(626) 655-4041",
    phoneHref: "tel:+16266554041",
    text: "818-649-3898",
    textHref: "sms:+18186493898",
    textNote: "English and Spanish",
    transferBookingHref:
      "https://outlook.office365.com/owa/calendar/TransfersCalendar@ktdoctor.com/bookings/",
    messengerHref: "https://m.me/serendibhealthways",
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

/** Header links, split around the centered logo. */
export const navLeft: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "WHO WE ARE", href: "/who-we-are" },
  { label: "OUR DOCTORS", href: "/our-doctors" },
];

export const navRight: NavItem[] = [
  { label: "OUR PARTNERS", href: "/our-partners" },
  { label: "COMPLIANCE", href: "/#compliance" },
  { label: "CONTACT", href: "/contact-us" },
];

export const mobileNav: NavLinkItem[] = [
  { numeral: "I", label: "HOME", href: "/" },
  { numeral: "II", label: "WHO WE ARE", href: "/who-we-are" },
  { numeral: "III", label: "OUR DOCTORS", href: "/our-doctors" },
  { numeral: "IV", label: "OUR PARTNERS", href: "/our-partners" },
  { numeral: "V", label: "COMPLIANCE", href: "/#compliance" },
  { numeral: "VI", label: "NEWS & ARTICLES", href: "/#news" },
  { numeral: "VII", label: "CONTACT", href: "/contact-us" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "OUR COMPANY",
    links: [
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Our Doctors", href: "/our-doctors" },
      { label: "Our Partners", href: "/our-partners" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "OUR GROUP",
    links: [
      { label: "Kids & Teens Medical Group", href: "https://www.ktdoctor.com/" },
      { label: "Afterhours Pediatric Clinic", href: "https://pediatricafterhour.com/" },
    ],
  },
  {
    title: "OTHER",
    links: [
      { label: "Compliance", href: "/#compliance" },
      { label: "Guidelines & Procedures", href: "/guidelines-and-procedures" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Facebook", href: "https://www.facebook.com/serendibhealthways/" },
      {
        label: "YouTube",
        href: "https://www.youtube.com/channel/UCpc-umQeo6CQFLHq4bTWeUQ",
      },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/serendibhealthways" },
  { label: "Instagram", href: "https://www.instagram.com/serendib_healthways/" },
];
