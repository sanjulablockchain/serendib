import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { doctorsHero } from "@/content/our-doctors";
import { hitArea } from "@/lib/styles";

export function DoctorsHero() {
  const { director } = doctorsHero;

  return (
    <section
      data-hero
      className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-16 px-5 pt-12 pb-16 nav:px-7 nav:pt-16 nav:pb-20"
    >
      <div className="flex flex-col gap-[26px]">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2.5 font-display text-[12px] tracking-[0.18em] text-subtle"
        >
          <Link href="/" className={`${hitArea} hover:text-gold-bright`}>
            {doctorsHero.breadcrumb.home}
          </Link>
          <span aria-hidden="true" className="text-gold">
            ✦
          </span>
          <span aria-current="page" className="text-gold-pale">
            {doctorsHero.breadcrumb.current}
          </span>
        </nav>
        <div className="flex items-center gap-3.5">
          <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-gold-clear to-gold" />
          <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
            {doctorsHero.eyebrow}
          </span>
        </div>
        <h1
          data-parallax="0.07"
          className="m-0 text-[clamp(36px,4.8vw,62px)] leading-[1.08] font-medium text-balance text-shadow-heading"
        >
          {doctorsHero.titleStart}
          <span className="text-highlight">{doctorsHero.titleHighlight}</span>
          {doctorsHero.titleEnd}
        </h1>
        <p className="m-0 max-w-[560px] text-[21px] leading-[1.55] text-pretty text-soft">
          {doctorsHero.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href={doctorsHero.primaryCta.href}>{doctorsHero.primaryCta.label}</Button>
          <Button href={doctorsHero.secondaryCta.href} variant="dark">
            {doctorsHero.secondaryCta.label}
          </Button>
        </div>
      </div>

      <CornerFrame className="w-full max-w-[480px] justify-self-center bg-linear-to-b from-card-from to-card-to shadow-hero-frame">
        <div className="relative aspect-[4/5] overflow-hidden border border-line-soft bg-btn-to">
          <Image
            src={director.image}
            alt={director.imageAlt}
            fill
            preload
            sizes="(min-width: 560px) 480px, 100vw"
            data-parallax="-0.08"
            data-pbase="scale(1.12)"
            className="[transform:scale(1.12)] object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-fade-clear from-50% to-fade-strong" />
        </div>
        <div className="absolute inset-x-7 bottom-7 flex flex-col gap-2 border border-line-strong bg-linear-to-r from-row-from to-row-to px-5 py-[18px]">
          <span className="font-display text-[11px] tracking-[0.22em] text-gold-bright">
            {director.badge}
          </span>
          <span className="font-display text-[24px] leading-[1.1] text-heading">
            {director.name}
          </span>
          <span className="font-display text-[12px] tracking-[0.14em] text-subtle">
            {director.credentials}
          </span>
        </div>
      </CornerFrame>
    </section>
  );
}
