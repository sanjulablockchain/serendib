import type { StaticImageData } from "next/image";

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
};

export type Partner = {
  name: string;
  href: string;
  description: string;
};

export type NavLinkItem = NavItem & {
  numeral: string;
};

export type FooterColumn = {
  title: string;
  links: NavItem[];
};

export type Stat = {
  value: string;
  label: string;
  note: string;
};

export type PlanRow = {
  label: string;
  note: string;
  on: boolean;
};

export type PlanCategory = {
  numeral: string;
  label: string;
  title: string;
  rows: PlanRow[];
};

export type Doctor = {
  name: string;
  credentials: string;
  image: string;
};

export type HealthPlan = {
  name: string;
  logo: string;
  logoAlt: string;
};

export type ComplianceItem = {
  title: string;
  note: string;
  action: string;
  href: string;
  pending?: boolean;
};

export type NewsPost = {
  title: string;
  excerpt: string;
  tag: string;
  href: string;
  image: StaticImageData;
  imageAlt: string;
};

export type DoctorArea = {
  id: string;
  name: string;
};

export type Provider = {
  id: string;
  name: string;
  credentials: string;
  areas: string[];
  bookingUrl: string;
  bio: string;
  image: string | null;
};

export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  glyph: string;
  href?: string;
};

export type OfficeLocation = {
  id: string;
  name: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  lat: number;
  lng: number;
  zoom: number;
  directionsHref: string;
};

export type ContactInput = { name: string; email: string; message: string };

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactFormState =
  | { status: "idle" }
  | { status: "error"; message: string; errors: ContactFieldErrors; values: ContactInput }
  | { status: "sent"; name: string; email: string };
