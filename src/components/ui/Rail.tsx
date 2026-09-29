import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type RailProps = {
  thumbClassName?: string;
  thumbStyle?: CSSProperties;
};

/** Slim vertical scroll track with a glowing thumb. */
export function Rail({ thumbClassName, thumbStyle }: RailProps) {
  return (
    <div
      aria-hidden="true"
      className="relative w-2 shrink-0 rounded border border-line-strong bg-track"
    >
      <div
        className={cn(
          "absolute inset-x-px rounded-[3px] bg-linear-to-b from-aqua to-aqua-deep shadow-aqua-soft",
          thumbClassName,
        )}
        style={thumbStyle}
      />
    </div>
  );
}
