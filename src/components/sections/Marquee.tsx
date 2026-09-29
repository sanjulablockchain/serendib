import { marqueeItems } from "@/content/home";

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex items-center gap-9 p-[18px]">
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center gap-9">
          <span>{item}</span>
          <span className="text-gold-bright">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative z-[1] overflow-hidden border-y border-line-mid bg-marquee">
      <div className="flex w-max animate-marquee font-display text-[13px] tracking-[0.2em] text-fg motion-reduce:animate-none">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
