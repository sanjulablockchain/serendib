import Image from "next/image";
import { linkProps } from "@/lib/links";
import Link from "next/link";
import { healthPlans, partnerLogos, partnersSection } from "@/content/home";

const plate =
  "flex items-center border border-gold bg-linear-to-b from-cream to-cream-deep shadow-ring hover:shadow-ring-hover";

export function Partners() {
  return (
    <section
      id="partners"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-12 pb-[120px]"
    >
      <div className="relative border border-line-strong bg-card-to p-3.5">
        <div className="relative aspect-[17/14] overflow-hidden">
          <Image
            src={partnersSection.image}
            placeholder="blur"
            alt={partnersSection.imageAlt}
            fill
            sizes="(min-width: 1320px) 620px, (min-width: 820px) 50vw, 100vw"
            data-parallax="-0.1"
            data-pbase="scale(1.2)"
            className="[transform:scale(1.2)] object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[22px]">
        <span className="font-display text-[13px] tracking-[0.2em] text-subtle">
          {partnersSection.eyebrow}
        </span>
        <h2 className="m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.15] font-medium text-balance">
          {partnersSection.title}
        </h2>
        <p className="m-0 text-[19px] leading-[1.6] text-pretty text-soft">
          {partnersSection.description}
        </p>
        <div className="flex flex-wrap gap-3.5">
          {partnerLogos.map((logo) => (
            <Link
              key={logo.name}
              href={logo.href}
              {...linkProps(logo.href)}
              className={`${plate} h-[76px] justify-center px-[18px] py-2.5`}
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-[54px] w-auto"
              />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3.5 pt-1.5">
          <span className="font-display text-[12px] tracking-[0.18em] text-gold-bright">
            {partnersSection.plansTitle}
          </span>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3.5 p-0">
            {healthPlans.map((healthPlan) => (
              <li key={healthPlan.name} className={`${plate} gap-3 px-3.5 py-3`}>
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
      </div>
    </section>
  );
}
