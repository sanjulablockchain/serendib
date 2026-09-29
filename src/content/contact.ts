import { site } from "@/content/site";
import type { ContactChannel, OfficeLocation } from "@/types";

export const contactHero = {
  breadcrumb: { home: "HOME", current: "CONTACT US" },
  eyebrow: "CONTACT US",
  titleStart: "Drop us a message for ",
  titleHighlight: "any query.",
  description:
    "Thank you for contacting us. We are here to help, whether you're already a member or just want to know more about our plans.",
};

export const contactForm = {
  title: "Send a message",
  note: "ALL FIELDS REQUIRED",
  fields: {
    name: { label: "NAME", placeholder: "Parent or guardian name" },
    email: { label: "EMAIL", placeholder: "you@example.com" },
    message: { label: "MESSAGE", placeholder: "How can we help?" },
  },
  submit: "SEND ▸",
  sending: "SENDING",
  sent: {
    eyebrow: "MESSAGE RECEIVED",
    thanks: "Thank you, ",
    replyBefore: "Our team will reply to ",
    replyAfter: ". For anything urgent, call or text us directly.",
    another: "SEND ANOTHER",
  },
};

export const emergencyLine = {
  label: "EMERGENCY LINE",
  value: "1 818 361 5437",
  href: "tel:+18183615437",
  action: "CALL ▸",
};

export const channelsTitle = "REACH OUR TEAM";

export const contactChannels: ContactChannel[] = [
  {
    id: "call",
    label: "CALL US",
    value: site.contact.phone,
    href: site.contact.phoneHref,
    glyph: "☏",
  },
  {
    id: "text",
    label: "TEXT US, ENGLISH AND SPANISH",
    value: site.contact.text,
    href: site.contact.textHref,
    glyph: "✉",
  },
  {
    id: "messenger",
    label: "MESSENGER, ENGLISH AND SPANISH",
    value: "Chat with our team",
    href: site.contact.messengerHref,
    glyph: "✦",
  },
  {
    id: "email",
    label: "EMAIL US",
    value: "serendib.healthways@ktdoctor.com",
    href: "mailto:serendib.healthways@ktdoctor.com",
    glyph: "@",
  },
  { id: "fax", label: "FAX", value: "1 626 655 4042", glyph: "⎙" },
];

export const contactLocation = {
  eyebrow: "OUR LOCATION",
  title: "Serendib Healthways, Pasadena.",
  directions: "GET DIRECTIONS ▸",
  mapLabel: "Map showing the Serendib Healthways office in Pasadena",
};

// Coordinates are filled in Task 7 from a one time OpenStreetMap lookup.
export const locations: OfficeLocation[] = [];
