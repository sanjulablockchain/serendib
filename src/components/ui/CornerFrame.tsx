import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const corner = "absolute size-[30px] border-gold-bright";

/** Framed panel with gold corner brackets. */
export function CornerFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative border border-frame p-3.5", className)}>
      <span aria-hidden="true" className={cn(corner, "-top-1.5 -left-1.5 border-t-2 border-l-2")} />
      <span
        aria-hidden="true"
        className={cn(corner, "-top-1.5 -right-1.5 border-t-2 border-r-2")}
      />
      <span
        aria-hidden="true"
        className={cn(corner, "-bottom-1.5 -left-1.5 border-b-2 border-l-2")}
      />
      <span
        aria-hidden="true"
        className={cn(corner, "-right-1.5 -bottom-1.5 border-r-2 border-b-2")}
      />
      {children}
    </div>
  );
}
