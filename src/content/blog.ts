import autismImage from "../../public/images/news/autism.webp";
import memberOfferImage from "../../public/images/news/member-offer.webp";
import monkeypoxImage from "../../public/images/news/monkeypox.webp";
import { site } from "@/content/site";
import type { BlogArticle } from "@/types";

export const blogIntro = {
  eyebrow: "NEWS & ARTICLES",
  title: "From Serendib Healthways",
  description:
    "Health alerts, member offers and stories about how we care for children across Los Angeles County.",
};

export const articleUi = {
  readMore: "READ MORE ▸",
  back: { label: "◂ BACK TO ALL ARTICLES", href: "/blog" },
  cta: {
    title: "Ready to switch your child to Serendib Healthways?",
    label: "MAKE THE SWITCH",
    href: site.contact.transferBookingHref,
  },
};

const { phone, phoneHref, text, textHref, address } = site.contact;

export const articles: BlogArticle[] = [
  {
    slug: "autism-awareness-month",
    title: "Autism Awareness Month: Embracing Neurodiversity",
    excerpt:
      "How we create sensory friendly, inclusive care for children with autism and their families.",
    tag: "APRIL 2024",
    image: autismImage,
    imageAlt: "Colorful letters spelling Autism",
    body: [
      {
        type: "paragraph",
        text: "April is Autism Awareness Month, a time to increase understanding, acceptance and support for people on the autism spectrum. At Serendib Healthways, we are committed to caring for every member of our community, including children and families living with Autism Spectrum Disorder (ASD).",
      },
      { type: "heading", text: "Understanding Autism Spectrum Disorder" },
      {
        type: "paragraph",
        text: "ASD affects how a person perceives the world, interacts with others and communicates. Every child's experience is different, with their own strengths and challenges. Some children find social interaction, sensory input or communication harder than others, and each of them deserves care that fits who they are.",
      },
      { type: "heading", text: "How we support children with autism" },
      {
        type: "list",
        ordered: true,
        items: [
          {
            term: "Sensory friendly environment",
            text: "We keep noise low with quiet waiting areas and adjusted lighting, so a visit feels calmer for children who are sensitive to sound and light.",
          },
          {
            term: "Communication support",
            text: "Our staff are trained to use clear language, visual supports and alternative ways of communicating, so every child and parent feels heard.",
          },
          {
            term: "Individualized care plans",
            text: "We build plans around each child, addressing their sensory needs and the behavioral strategies that work for them.",
          },
          {
            term: "Education and resources",
            text: "We share materials, support groups and community referrals so families always know where to turn next.",
          },
        ],
      },
      { type: "heading", text: "Raising awareness" },
      {
        type: "paragraph",
        text: "Awareness starts with understanding. We invest in staff training, community outreach campaigns and patient education materials, so more people know how to welcome and support children with autism.",
      },
      { type: "heading", text: "Our commitment" },
      {
        type: "paragraph",
        text: "This month and every month, we reaffirm our commitment to an inclusive and supportive environment for all children. Together we can build a healthcare community that welcomes everyone.",
      },
    ],
  },
  {
    slug: "monkeypox-alert",
    title: "Monkeypox Alert",
    excerpt:
      "No prior authorization, precertification or referral required for monkeypox diagnosis or treatment.",
    tag: "HEALTH ALERT",
    image: monkeypoxImage,
    imageAlt: "Monkeypox symptoms",
    body: [
      {
        type: "paragraph",
        text: "In response to California's State of Emergency declaration on 8/1/2022, Serendib Healthways has made the following policy changes so members can get care quickly.",
      },
      { type: "heading", text: "What has changed" },
      {
        type: "list",
        items: [
          { text: "No prior authorization is required for monkeypox diagnosis or treatment." },
          { text: "Timely filing requirements are waived for related services." },
          { text: "Medical equipment and supplies are replaced as needed." },
          {
            text: "Members can see an out of network provider when no in network provider is available.",
          },
        ],
      },
      { type: "heading", text: "How to identify monkeypox" },
      {
        type: "paragraph",
        text: "Monkeypox often begins with flu like symptoms, such as fever and chills, that last a few days and are followed by a distinctive rash. In some cases, lesions appear on the genitals, perianal area, face, arms, legs or mucous membranes without any earlier flu symptoms.",
      },
      {
        type: "paragraph",
        text: "The rash moves through stages: flat based lesions, raised firm lesions, clear fluid filled lesions, yellowish fluid filled lesions, and finally crusts that fall off.",
      },
      {
        type: "paragraph",
        text: "Before testing for monkeypox, rule out other common causes of a similar rash, including syphilis, herpes, molluscum contagiosum and varicella zoster.",
      },
      { type: "heading", text: "Managing monkeypox" },
      {
        type: "paragraph",
        text: "The current strain of monkeypox, the West African clade, appears to be milder. Most patients recover without treatment or are managed in an outpatient setting.",
      },
      {
        type: "contact",
        title: "Questions? Contact us",
        lines: [
          { label: "Phone", value: phone, href: phoneHref },
          { label: "Text (English and Spanish)", value: text, href: textHref },
          {
            label: "Address",
            value: `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`,
          },
        ],
      },
    ],
  },
  {
    slug: "commercial-group-20-off",
    title: "All Commercial Group Members Get 20% Off",
    excerpt:
      "20% off out-of-pocket expenses, co-pays and deductibles for every commercial group member.",
    tag: "MEMBER OFFER",
    image: memberOfferImage,
    imageAlt: "Pediatric insurance Los Angeles",
    body: [
      {
        type: "paragraph",
        text: "All commercial group members get 20% off on all out-of-pocket expenses, co-pays, deductibles and any services listed as patient responsibility.",
      },
      { type: "heading", text: "How to take part" },
      {
        type: "list",
        ordered: true,
        items: [
          { text: "Make an initial deposit of $200." },
          { text: "Keep a minimum balance of $75 going forward." },
          { text: "Register on our upcoming member portal." },
        ],
      },
      { type: "heading", text: "Priority service" },
      {
        type: "paragraph",
        text: "Members with commercial PPO and HMO coverage receive priority assistance at all of our office locations.",
      },
      { type: "heading", text: "About Serendib Healthways" },
      {
        type: "paragraph",
        text: "Serendib Healthways is a pediatric HMO and IPA with more than 15 medical offices across California, including 11 locations in Los Angeles County. Our group also includes Kids & Teens Medical Group and Afterhours Pediatric Clinic.",
      },
      {
        type: "contact",
        title: "Billing questions",
        lines: [
          { label: "Director of Billing", value: "Marisa McDonald" },
          { label: "Hours", value: "Monday to Friday, 9am to 6pm" },
          { label: "Phone", value: "(818) 201-2657", href: "tel:+18182012657" },
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
