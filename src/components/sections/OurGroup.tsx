import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { group } from "@/content/who-we-are";

export function OurGroup() {
  return (
    <section id="group" className="flex flex-col gap-9 pb-[120px]">
      <SectionHeading eyebrow={group.eyebrow} title={group.title} className="max-w-[680px]" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-7">
        {group.practices.map((practice) => (
          <div
            key={practice.tag}
            className="relative flex flex-col border border-line-bold bg-linear-[160deg] from-panel-from to-panel-to shadow-panel"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-[26px] py-[22px]">
              <div className="flex h-[72px] items-center justify-center border border-gold bg-linear-to-b from-cream to-cream-deep px-4 py-2 shadow-ring">
                <Image
                  src={practice.logo}
                  alt={practice.logoAlt}
                  width={practice.logoWidth}
                  height={practice.logoHeight}
                  sizes="120px"
                  className="h-[52px] w-auto"
                />
              </div>
              <span className="font-display text-[12px] tracking-[0.18em] text-gold-bright">
                {practice.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-5 px-[26px] pt-7 pb-[30px]">
              <h3 className="m-0 text-[22px] leading-[1.35] font-medium text-pretty">
                {practice.title}
              </h3>
              <ul className="m-0 flex flex-1 list-none flex-col gap-2.5 p-0">
                {practice.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3.5 border border-line-mid bg-linear-to-r from-row-from to-row-to px-4 py-3 text-[18px] leading-normal text-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] size-[7px] flex-none rotate-45 bg-gold-bright shadow-diamond"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <Button href={practice.cta.href} variant="dark" size="md" className="self-start">
                {practice.cta.label}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
