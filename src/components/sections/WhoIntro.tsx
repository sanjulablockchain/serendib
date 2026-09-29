import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { whoIntro } from "@/content/who-we-are";
import { hitArea } from "@/lib/styles";

export function WhoIntro() {
  return (
    <section
      data-hero
      className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] items-center gap-16 px-5 pt-12 pb-16 nav:px-7 nav:pt-16 nav:pb-20"
    >
      <div className="flex flex-col gap-[26px]">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2.5 font-display text-[12px] tracking-[0.18em] text-subtle"
        >
          <Link href="/" className={`${hitArea} hover:text-gold-bright`}>
            {whoIntro.breadcrumb.home}
          </Link>
          <span aria-hidden="true" className="text-gold">
            ✦
          </span>
          <span aria-current="page" className="text-gold-pale">
            {whoIntro.breadcrumb.current}
          </span>
        </nav>
        <div className="flex items-center gap-3.5">
          <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-gold-clear to-gold" />
          <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
            {whoIntro.eyebrow}
          </span>
        </div>
        <h1
          data-parallax="0.07"
          className="m-0 text-[clamp(36px,4.8vw,62px)] leading-[1.08] font-medium text-balance text-shadow-heading"
        >
          {whoIntro.titleStart}
          <span className="text-highlight">{whoIntro.titleHighlight}</span>
          {whoIntro.titleEnd}
        </h1>
        <div className="flex max-w-[580px] flex-col gap-3">
          <span className="font-display text-[15px] tracking-[0.1em] text-gold-bright">
            {whoIntro.lead}
          </span>
          <p className="m-0 text-[21px] leading-[1.55] text-pretty text-soft">
            {whoIntro.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button href={whoIntro.primaryCta.href}>{whoIntro.primaryCta.label}</Button>
          <Button href={whoIntro.secondaryCta.href} variant="dark">
            {whoIntro.secondaryCta.label}
          </Button>
        </div>
      </div>

      <CornerFrame className="bg-linear-to-b from-card-from to-card-to shadow-hero-frame">
        <div className="relative aspect-[17/14] overflow-hidden border border-line-soft bg-btn-to">
          <Image
            src={whoIntro.image}
            placeholder="blur"
            alt={whoIntro.imageAlt}
            fill
            preload
            sizes="(min-width: 1320px) 600px, (min-width: 820px) 50vw, 100vw"
            data-parallax="-0.12"
            data-pbase="scale(1.2)"
            className="[transform:scale(1.2)] object-cover contrast-[1.05] saturate-[0.9]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-fade-clear from-55% to-fade-strong" />
          <div className="absolute inset-x-[18px] bottom-4 flex items-center justify-between gap-3 font-display text-[12px] tracking-[0.16em] text-heading">
            <span>{whoIntro.imageCaption}</span>
            <span aria-hidden="true" className="text-gold-bright">
              ✦
            </span>
          </div>
        </div>
      </CornerFrame>
    </section>
  );
}
