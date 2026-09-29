import { cn } from "@/lib/cn";

const glow = "pointer-events-none absolute z-0 aspect-square rounded-full";

const glows = [
  {
    speed: "-0.25",
    className: "top-[520px] -left-[18%] w-[70vw] max-w-[900px] bg-(image:--gradient-glow-teal)",
  },
  {
    speed: "-0.4",
    className: "top-[1900px] -right-[20%] w-[80vw] max-w-[1000px] bg-(image:--gradient-glow-gold)",
  },
  {
    speed: "-0.3",
    className: "top-[3600px] -left-[10%] w-[70vw] max-w-[900px] bg-(image:--gradient-glow-deep)",
  },
];

/** Soft colored glows behind the page. ScrollFx moves them at their own speed. */
export function Atmosphere() {
  return glows.map((item) => (
    <div
      key={item.speed}
      aria-hidden="true"
      data-parallax={item.speed}
      className={cn(glow, item.className)}
    />
  ));
}
