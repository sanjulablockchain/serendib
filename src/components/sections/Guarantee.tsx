import { Button } from "@/components/ui/Button";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { guarantee } from "@/content/shared";

export function Guarantee() {
  return (
    <section className="pb-[120px]">
      <CornerFrame className="mx-auto flex max-w-[1080px] flex-col items-center gap-[26px] border-line-half bg-radial-[ellipse_at_50%_0%] from-panel-to to-panel-from to-70% px-[clamp(24px,5vw,72px)] py-14 text-center shadow-panel">
        <div
          aria-hidden="true"
          className="flex size-[58px] flex-none items-center justify-center rounded-full border-2 border-gold-pale bg-radial-[circle_at_40%_35%] from-gold-hi to-gold-mid to-70% font-display text-[22px] font-bold text-on-gold shadow-medal"
        >
          S
        </div>
        <p className="m-0 font-display text-[clamp(24px,2.8vw,34px)] leading-[1.35] font-medium text-balance">
          {guarantee.text}
        </p>
        <Button href={guarantee.cta.href}>{guarantee.cta.label}</Button>
      </CornerFrame>
    </section>
  );
}
