import { creed } from "@/content/who-we-are";

export function Creed() {
  return (
    <section id="creed" className="flex flex-col gap-10 pt-[72px] pb-[120px]">
      <div className="flex flex-col items-center gap-3 text-center">
        <span
          data-parallax="0.08"
          className="font-display text-[13px] tracking-[0.22em] text-subtle"
        >
          {creed.eyebrow}
        </span>
        <h2
          data-parallax="0.04"
          className="m-0 text-[clamp(30px,3.6vw,44px)] leading-[1.15] font-medium text-balance"
        >
          {creed.title}
        </h2>
        <span
          aria-hidden="true"
          className="h-px w-[220px] bg-linear-to-r from-gold-clear via-gold to-gold-clear"
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
        {creed.items.map((item) => (
          <div
            key={item.numeral}
            className="relative flex flex-col items-center gap-[18px] border border-line bg-linear-to-b from-card-from to-card-to px-[30px] pt-11 pb-[38px] text-center shadow-panel hover:border-gold-bright hover:shadow-news-hover"
          >
            <span className="absolute top-3.5 left-[18px] font-display text-[12px] tracking-[0.14em] text-gold">
              {item.numeral}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2.5 border border-bar-line"
            />
            <div
              aria-hidden="true"
              className="flex size-16 flex-none items-center justify-center rounded-full border-2 border-gold-pale bg-radial-[circle_at_40%_35%] from-gold-hi to-gold-mid to-70% font-display text-[24px] font-bold text-on-gold shadow-medal"
            >
              {item.symbol}
            </div>
            <span className="font-display text-[13px] tracking-[0.26em] text-gold-bright">
              {item.label}
            </span>
            <h3 className="m-0 text-[24px] leading-tight font-medium text-balance">{item.title}</h3>
            <span
              aria-hidden="true"
              className="h-px w-[120px] bg-linear-to-r from-gold-clear via-gold to-gold-clear"
            />
            <p className="m-0 text-[18px] leading-[1.6] text-pretty text-soft">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
