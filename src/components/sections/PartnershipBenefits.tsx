import { benefits } from "@/content/our-partners";

export function PartnershipBenefits() {
  return (
    <section id="services" className="flex flex-col gap-10 pt-[72px] pb-[120px]">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center">
        <span
          data-parallax="0.08"
          className="font-display text-[13px] tracking-[0.22em] text-subtle"
        >
          {benefits.eyebrow}
        </span>
        <h2
          data-parallax="0.04"
          className="m-0 text-[clamp(30px,3.6vw,44px)] leading-[1.15] font-medium text-balance"
        >
          {benefits.title}
        </h2>
        <span
          aria-hidden="true"
          className="h-px w-[220px] bg-linear-to-r from-gold-clear via-gold to-gold-clear"
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-5">
        {benefits.items.map((item) => (
          <div
            key={item.numeral}
            className="relative flex flex-col gap-4 border border-line bg-linear-to-b from-card-from to-card-to px-[26px] pt-[30px] pb-7 hover:border-gold-bright hover:shadow-news-hover"
          >
            <span className="absolute top-3.5 right-[18px] font-display text-[12px] tracking-[0.14em] text-gold">
              {item.numeral}
            </span>
            <div
              aria-hidden="true"
              className="flex size-[50px] flex-none items-center justify-center rounded-full border-2 border-gold-pale bg-radial-[circle_at_40%_35%] from-gold-hi to-gold-mid to-70% font-display text-[20px] font-bold text-on-gold shadow-medal"
            >
              {item.symbol}
            </div>
            <h3 className="m-0 text-[20px] font-medium tracking-[0.04em]">{item.title}</h3>
            <p className="m-0 text-[18px] leading-[1.55] text-pretty text-soft">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
