import Image from "next/image";
import { healthPlans } from "@/content/home";
import { plansAccepted } from "@/content/our-partners";

export function PlansAccepted() {
  return (
    <section id="plans" className="flex scroll-mt-32 flex-col gap-11 pb-[120px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-14 gap-y-6">
        <div className="flex max-w-[760px] flex-col gap-3">
          <span
            data-parallax="0.08"
            className="font-display text-[13px] tracking-[0.22em] text-subtle"
          >
            {plansAccepted.eyebrow}
          </span>
          <h2
            data-parallax="0.04"
            className="m-0 text-[clamp(30px,3.6vw,44px)] leading-[1.15] font-medium text-balance"
          >
            {plansAccepted.title}
          </h2>
        </div>
        <div className="flex flex-col gap-3.5">
          {plansAccepted.paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0 text-[19px] leading-[1.6] text-pretty text-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <ul className="m-0 grid list-none grid-cols-2 gap-5 p-0 sm:grid-cols-3 wide:grid-cols-6">
        {healthPlans.map((healthPlan, index) => (
          <li
            key={healthPlan.name}
            className="relative flex flex-col items-center justify-center gap-4 border border-gold bg-linear-to-b from-cream to-cream-deep px-3 pt-[30px] pb-6 text-center shadow-ring hover:shadow-ring-hover"
          >
            <span className="absolute top-2.5 left-3 font-display text-[11px] tracking-[0.14em] text-edge">
              {plansAccepted.numerals[index]}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-1.5 border border-chip-line"
            />
            <div className="flex size-[76px] items-center justify-center rounded-full border border-gold bg-cream">
              <Image
                src={healthPlan.logo}
                alt={healthPlan.logoAlt}
                width={44}
                height={44}
                className="size-11 object-contain"
              />
            </div>
            <span className="flex min-h-[2.5em] items-center font-display text-[14px] leading-tight font-semibold tracking-[0.03em] text-balance text-cream-ink">
              {healthPlan.name}
            </span>
            <span className="font-display text-[11px] tracking-[0.18em] text-edge">
              {plansAccepted.badge}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
