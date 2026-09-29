import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section
      data-hero
      className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] items-center gap-16 px-5 pt-16 pb-11 nav:px-7 nav:pt-24 nav:pb-14 wide:pt-[110px] wide:pb-16"
    >
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-3.5">
          <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-gold-clear to-gold" />
          <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
            {hero.eyebrow}
          </span>
        </div>
        <h1
          data-parallax="0.07"
          className="m-0 text-[clamp(40px,5.2vw,68px)] leading-[1.06] font-medium text-balance text-shadow-heading"
        >
          {hero.titleStart}
          <span className="text-highlight">{hero.titleHighlight}</span>
          {hero.titleEnd}
        </h1>
        <p
          data-parallax="0.04"
          className="m-0 max-w-[560px] text-[21px] leading-[1.55] text-pretty text-soft"
        >
          {hero.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="dark">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>

      <CornerFrame className="bg-linear-to-b from-card-from to-card-to shadow-hero-frame">
        <div className="relative aspect-[17/14] overflow-hidden border border-line-soft bg-btn-to">
          <Image
            src={hero.image}
            placeholder="blur"
            alt={hero.imageAlt}
            fill
            preload
            sizes="(min-width: 1320px) 600px, (min-width: 820px) 50vw, 100vw"
            data-parallax="-0.12"
            data-pbase="scale(1.2)"
            className="[transform:scale(1.2)] object-cover contrast-[1.05] saturate-[0.9]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-fade-clear from-55% to-fade-strong" />
          <div className="absolute inset-x-[18px] bottom-4 flex items-center justify-between gap-3 font-display text-[12px] tracking-[0.16em] text-heading">
            <span>{hero.imageCaption}</span>
            <span aria-hidden="true" className="text-gold-bright">
              ✦
            </span>
          </div>
        </div>
      </CornerFrame>
    </section>
  );
}
