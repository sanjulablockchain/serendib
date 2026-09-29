import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/content/home";

export function Stats() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4 pt-[72px] pb-[104px]">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-1.5 border border-line bg-linear-to-r from-stat-from to-stat-to px-7 py-[26px]"
        >
          <div data-parallax="0.06">
            <CountUp
              value={stat.value}
              className="font-display text-[44px] leading-none text-gold-bright tabular-nums"
            />
          </div>
          <span className="font-display text-[13px] tracking-[0.16em] text-fg">{stat.label}</span>
          <span className="text-[17px] text-subtle">{stat.note}</span>
        </div>
      ))}
    </section>
  );
}
