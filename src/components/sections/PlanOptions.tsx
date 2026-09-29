"use client";

import { useState } from "react";
import { HudRow } from "@/components/ui/HudRow";
import { Rail } from "@/components/ui/Rail";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { plan, planCategories } from "@/content/home";
import { cn } from "@/lib/cn";

const plus = "font-display text-[18px] leading-none text-fg";

export function PlanOptions() {
  const [index, setIndex] = useState(0);
  const active = planCategories[index];
  const count = planCategories.length;

  return (
    <section id="plan" className="flex flex-col gap-[30px] pb-[120px]">
      <SectionHeading eyebrow={plan.eyebrow} title={plan.title} className="max-w-[640px]" />

      <div className="flex flex-col items-start gap-[22px] nav:flex-row nav:gap-7">
        <div
          role="group"
          aria-label="Plan categories"
          className="flex flex-row items-center justify-center gap-3.5 self-center pt-1.5 nav:flex-col nav:gap-[18px] nav:self-start"
        >
          <span aria-hidden="true" className={plus}>
            +
          </span>
          {planCategories.map((category, i) => (
            <button
              key={category.numeral}
              type="button"
              title={category.label}
              aria-label={category.label}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "flex size-[58px] cursor-pointer items-center justify-center rounded-full border-2 font-display text-[17px] font-semibold transition-all duration-200",
                i === index
                  ? "border-cat-ring-on bg-radial-[circle_at_40%_35%] from-gold-hi to-gold-mid to-70% text-on-gold shadow-cat-on"
                  : "border-cat-ring bg-radial-[circle_at_40%_35%] from-cat-from to-cat-to text-cat-fg shadow-cat hover:border-gold-bright",
              )}
            >
              {category.numeral}
            </button>
          ))}
          <span aria-hidden="true" className={plus}>
            +
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
          <div className="flex items-center gap-3.5">
            <div
              aria-hidden="true"
              className="flex size-[54px] shrink-0 items-center justify-center rounded-full border-2 border-gold-pale bg-radial-[circle_at_40%_35%] from-gold-pale to-gold to-70% font-display text-[18px] font-bold text-on-gold shadow-medal"
            >
              {active.numeral}
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-[15px] tracking-[0.16em] text-gold-bright">
                {active.title}
              </span>
              <span className="h-px w-[220px] bg-linear-to-r from-gold to-gold-clear" />
            </div>
          </div>

          <div className="flex gap-[18px]">
            <div data-stagger className="flex min-w-0 flex-1 flex-col gap-2.5">
              {active.rows.map((row) => (
                <HudRow
                  key={row.label}
                  leftMark
                  title={row.label}
                  note={row.note}
                  badge={row.on ? plan.on : plan.off}
                  badgeClassName={cn(
                    "w-[72px] text-[13px] xs:w-24",
                    row.on ? "text-heading" : "text-amber",
                  )}
                />
              ))}
            </div>
            <Rail
              thumbClassName="transition-[top] duration-300"
              thumbStyle={{
                top: `calc(${(index / count) * 100}% + 2px)`,
                height: `calc(${100 / count}% - 4px)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
