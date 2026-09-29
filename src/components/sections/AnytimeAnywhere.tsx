import Image from "next/image";
import { CountUp } from "@/components/ui/CountUp";
import { care } from "@/content/who-we-are";

export function AnytimeAnywhere() {
  return (
    <section
      id="care"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-14 pb-[120px]"
    >
      <div className="flex flex-col gap-[22px]">
        <div className="flex items-center gap-3.5">
          <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-gold-clear to-gold" />
          <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
            {care.eyebrow}
          </span>
        </div>
        <h2
          data-parallax="0.04"
          className="m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.15] font-medium text-balance"
        >
          {care.title}
        </h2>
        <span className="font-display text-[14px] leading-normal tracking-[0.08em] text-gold-bright">
          {care.subtitle}
        </span>
        {care.paragraphs.map((paragraph) => (
          <p key={paragraph} className="m-0 text-[19px] leading-[1.6] text-pretty text-soft">
            {paragraph}
          </p>
        ))}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3 pt-1.5">
          {care.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 border border-line bg-linear-to-r from-stat-from to-stat-to px-[22px] py-5"
            >
              <CountUp
                value={stat.value}
                className="font-display text-[32px] leading-none text-gold-bright tabular-nums"
              />
              <span className="font-display text-[11px] leading-snug tracking-[0.14em] text-subtle">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border border-line-strong bg-card-to p-3.5">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={care.image}
            placeholder="blur"
            alt={care.imageAlt}
            fill
            sizes="(min-width: 1320px) 620px, (min-width: 820px) 50vw, 100vw"
            data-parallax="-0.1"
            data-pbase="scale(1.22)"
            className="[transform:scale(1.22)] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
