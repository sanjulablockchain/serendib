import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { afterHours } from "@/content/home";

export function AfterHours() {
  return (
    <section className="pb-[120px]">
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] border border-line-bold bg-linear-[120deg] from-panel-from to-panel-to shadow-panel">
        <div className="relative min-h-[340px] overflow-hidden border-r border-line-soft">
          <Image
            src={afterHours.image}
            alt={afterHours.imageAlt}
            fill
            sizes="(min-width: 1320px) 640px, (min-width: 820px) 50vw, 100vw"
            data-parallax="-0.12"
            data-pbase="scale(1.22)"
            className="[transform:scale(1.22)] object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-fade-clear from-60% to-fade-side" />
        </div>
        <div className="flex flex-col justify-center gap-5 p-[clamp(28px,4vw,52px)]">
          <div className="flex items-center gap-3.5">
            <div
              aria-hidden="true"
              className="flex size-12 shrink-0 animate-pulse-soft items-center justify-center rounded-full border-2 border-gold bg-radial-[circle_at_40%_35%] from-moon to-disc-to text-[18px] text-gold-bright shadow-moon motion-reduce:animate-none"
            >
              ☾
            </div>
            <span className="font-display text-[13px] tracking-[0.2em] text-gold-bright">
              {afterHours.eyebrow}
            </span>
          </div>
          <h2 className="m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.15] font-medium text-balance">
            {afterHours.title}
          </h2>
          <p className="m-0 text-[19px] leading-[1.6] text-pretty text-soft">
            {afterHours.description}
          </p>
          <Button href={afterHours.cta.href} variant="dark" size="md" className="self-start">
            {afterHours.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
