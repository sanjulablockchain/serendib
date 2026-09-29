import { emergencyLine } from "@/content/contact";

export function EmergencyCard() {
  return (
    <a
      href={emergencyLine.href}
      className="relative flex min-h-[44px] items-center gap-[18px] border border-amber bg-linear-to-r from-amber-wash-from to-amber-wash-to px-[22px] py-5 shadow-emergency transition-shadow duration-200 hover:shadow-emergency-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
    >
      <span
        aria-hidden="true"
        className="flex size-[52px] flex-none items-center justify-center rounded-full border-2 border-amber-disc-edge bg-radial-[circle_at_40%_35%] from-amber-disc-from to-amber-disc-to text-[22px] font-bold text-on-gold motion-safe:animate-pulse-soft"
      >
        !
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-display text-[12px] tracking-[0.2em] text-amber">
          {emergencyLine.label}
        </span>
        <span className="font-display text-[clamp(20px,5vw,24px)] tracking-[0.04em] text-heading">
          {emergencyLine.value}
        </span>
      </span>
      <span className="font-display text-[12px] tracking-[0.16em] text-amber">
        {emergencyLine.action}
      </span>
    </a>
  );
}
