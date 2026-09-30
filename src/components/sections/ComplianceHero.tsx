import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { complianceIntro, heroChannels } from "@/content/compliance";
import { linkProps } from "@/lib/links";
import { hitArea } from "@/lib/styles";

export function ComplianceHero() {
  return (
    <section className="py-16 nav:py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <span className="font-display text-[13px] tracking-[0.2em] text-subtle">
            {complianceIntro.eyebrow}
          </span>
          <h1 className="m-0 text-[clamp(34px,4.4vw,56px)] leading-[1.1] font-medium text-balance text-shadow-heading">
            {complianceIntro.title}
          </h1>
          <p className="m-0 max-w-[640px] text-[20px] leading-[1.55] text-pretty text-soft">
            {complianceIntro.description}
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
          {heroChannels.map((channel) => (
            <div
              key={channel.eyebrow}
              className="flex min-w-0 flex-col gap-2 border border-line bg-linear-to-b from-card-from to-card-to px-[26px] py-6"
            >
              <span className="font-display text-[12px] tracking-[0.18em] text-subtle">
                {channel.eyebrow}
              </span>
              <Link
                href={channel.href}
                className={`${hitArea} self-start text-[20px] leading-[1.35] font-medium break-words text-gold-bright hover:text-gold-pale`}
                {...linkProps(channel.href)}
              >
                {channel.label}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
