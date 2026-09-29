import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MedallionProps = {
  children: ReactNode;
  label: string;
  ruleClassName?: string;
  symbolClassName?: string;
};

/** Gold coin with a spaced label and a fading rule, used to open a section. */
export function Medallion({ children, label, ruleClassName, symbolClassName }: MedallionProps) {
  return (
    <div className="flex items-center gap-3.5">
      <div
        aria-hidden="true"
        className={cn(
          "flex size-[54px] shrink-0 items-center justify-center rounded-full border-2 border-gold-pale bg-radial-[circle_at_40%_35%] from-gold-pale to-gold to-70% font-display font-bold text-on-gold shadow-medal",
          symbolClassName,
        )}
      >
        {children}
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-[13px] tracking-[0.2em] text-gold-bright">{label}</span>
        <span
          className={cn("h-px w-[180px] bg-linear-to-r from-gold to-gold-clear", ruleClassName)}
        />
      </div>
    </div>
  );
}
