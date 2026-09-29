import Link from "next/link";
import { linkProps } from "@/lib/links";
import { switching } from "@/content/home";

const action =
  "w-[min(100%,620px)] border border-edge bg-linear-to-b from-call-from to-call-to px-4 py-[13px] text-center font-display text-[13px] tracking-[0.14em] text-label hover:border-gold-bright hover:text-gold-bright hover:shadow-glow-dim";

export function MakeTheSwitch() {
  return (
    <section id="switch" className="pb-[120px]">
      <div className="relative mx-auto flex max-w-[980px] flex-col gap-[26px] border border-line-half bg-radial-[ellipse_at_50%_0%] from-well-glow-strong to-well to-70% px-[clamp(24px,5vw,64px)] pt-12 pb-11 shadow-switch">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-display text-[14px] tracking-[0.14em] text-heading">
            {switching.title}
          </span>
          <span className="font-display text-[13px] tracking-[0.18em] text-gold-bright">
            {switching.badge}
          </span>
        </div>

        <div className="flex gap-[22px]">
          <div className="flex flex-1 flex-col gap-[18px] text-[19px] leading-[1.6] text-copy">
            <p className="m-0 text-pretty">{switching.intro}</p>
            {switching.steps.map((step) => (
              <p key={step.numeral} className="m-0">
                <span className="mr-1 font-display text-gold-bright">{step.numeral}</span>
                {step.text}
              </p>
            ))}
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-gold-clear via-line-strong to-gold-clear" />
        <p className="m-0 text-center text-[18px] text-amber">{switching.notice}</p>

        <div className="flex flex-col items-center gap-3">
          {switching.actions.map((item) => (
            <Link key={item.href} href={item.href} className={action} {...linkProps(item.href)}>
              {item.label}
            </Link>
          ))}
          <Link
            href={switching.cta.href}
            className="mt-1.5 w-[min(100%,320px)] border border-gold-pale bg-linear-to-b from-gold-soft to-gold px-4 py-[15px] text-center font-display text-[14px] tracking-[0.18em] text-void shadow-begin hover:text-void hover:shadow-begin-hover"
          >
            {switching.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
