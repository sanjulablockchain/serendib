import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { affiliated } from "@/content/our-doctors";
import { linkProps } from "@/lib/links";

export function Affiliated() {
  return (
    <section id="affiliated" className="pt-[72px] pb-[120px]">
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] border border-line-bold bg-linear-to-br from-panel-from to-panel-to shadow-panel">
        <div className="flex flex-col justify-center gap-5 p-[clamp(28px,4vw,52px)]">
          <div className="flex items-center gap-3.5">
            <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-gold-clear to-gold" />
            <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
              {affiliated.eyebrow}
            </span>
          </div>
          <h2 className="m-0 text-[clamp(26px,3vw,38px)] leading-[1.18] font-medium text-balance">
            {affiliated.title}
          </h2>
          <span className="font-display text-[14px] tracking-[0.08em] text-gold-bright">
            {affiliated.lead}
          </span>
          <p className="m-0 text-[19px] leading-[1.6] text-pretty text-soft">
            {affiliated.description}
          </p>
          <Button href={affiliated.cta.href} variant="dark" size="md" className="self-start">
            {affiliated.cta.label}
          </Button>
        </div>

        <div className="relative min-h-[380px] overflow-hidden border-t border-line-soft min-[900px]:border-t-0 min-[900px]:border-l">
          <Image
            src={affiliated.image}
            alt={affiliated.imageAlt}
            fill
            sizes="(min-width: 1320px) 660px, (min-width: 820px) 50vw, 100vw"
            data-parallax="-0.1"
            data-pbase="scale(1.2)"
            className="[transform:scale(1.2)] object-cover object-[50%_30%]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-fade-clear from-55% to-fade-strong" />
          <a
            href={affiliated.group.href}
            {...linkProps(affiliated.group.href)}
            className="absolute bottom-6 left-6 flex min-h-11 items-center justify-center border border-gold bg-linear-to-b from-cream to-cream-deep px-[18px] py-3 shadow-medal"
          >
            <Image
              src={affiliated.group.logo}
              alt={affiliated.group.name}
              width={1250}
              height={919}
              sizes="80px"
              className="h-[54px] w-auto"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
