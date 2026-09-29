import Link from "next/link";
import { contactHero } from "@/content/contact";
import { hitArea } from "@/lib/styles";

export function ContactHero() {
  return (
    <section
      data-hero
      className="mx-auto flex max-w-site flex-col gap-6 px-5 pt-12 pb-10 nav:px-7 nav:pt-16"
    >
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2.5 font-display text-[12px] tracking-[0.18em] text-subtle"
      >
        <Link href="/" className={`${hitArea} hover:text-gold-bright`}>
          {contactHero.breadcrumb.home}
        </Link>
        <span aria-hidden="true" className="text-gold">
          ✦
        </span>
        <span aria-current="page" className="text-gold-pale">
          {contactHero.breadcrumb.current}
        </span>
      </nav>
      <div className="flex items-center gap-3.5">
        <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-gold-clear to-gold" />
        <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
          {contactHero.eyebrow}
        </span>
      </div>
      <h1
        data-parallax="0.07"
        className="m-0 max-w-[900px] text-[clamp(34px,4.6vw,60px)] leading-[1.08] font-medium text-balance text-shadow-heading"
      >
        {contactHero.titleStart}
        <span className="text-highlight">{contactHero.titleHighlight}</span>
      </h1>
      <p className="m-0 max-w-[640px] text-[clamp(18px,2.2vw,21px)] leading-[1.55] text-pretty text-soft">
        {contactHero.description}
      </p>
    </section>
  );
}
