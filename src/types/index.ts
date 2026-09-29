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
  image: string;
  imageAlt: string;
};
