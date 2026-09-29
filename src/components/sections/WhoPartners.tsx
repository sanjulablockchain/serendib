import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { healthPlans } from "@/content/home";
import { whoPartners } from "@/content/who-we-are";

export function WhoPartners() {
  return (
    <section
      id="partners"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-12 pb-[120px]"
    >
      <div className="flex flex-col gap-[22px]">
        <span
          data-parallax="0.08"
          className="font-display text-[13px] tracking-[0.2em] text-subtle"
        >
          {whoPartners.eyebrow}
        </span>
        <h2
          data-parallax="0.04"
          className="m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.15] font-medium text-balance"
        >
          {whoPartners.title}
        </h2>
        {whoPartners.paragraphs.map((paragraph) => (
          <p key={paragraph} className="m-0 text-[19px] leading-[1.6] text-pretty text-soft">
            {paragraph}
          </p>
        ))}
        <Button href={whoPartners.cta.href} variant="dark" size="md" className="self-start">
          {whoPartners.cta.label}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <span className="font-display text-[12px] tracking-[0.18em] text-gold-bright">
          {whoPartners.plansTitle}
        </span>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3.5 p-0">
          {healthPlans.map((healthPlan) => (
            <li
              key={healthPlan.name}
              className="flex items-center gap-3 border border-gold bg-linear-to-b from-cream to-cream-deep px-3.5 py-3 shadow-ring hover:shadow-ring-hover"
            >
              <Image
                src={healthPlan.logo}
                alt={healthPlan.logoAlt}
                width={36}
                height={36}
                className="size-9 flex-none object-contain"
              />
              <span className="font-display text-[13px] leading-tight font-semibold tracking-[0.04em] text-cream-ink">
                {healthPlan.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
