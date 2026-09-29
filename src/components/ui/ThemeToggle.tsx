"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";
import { hitArea } from "@/lib/styles";

/** Round icon button, used in the mobile header. Icons swap through CSS on data-theme. */
export function RoundThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label="Toggle light and dark mode"
      className={cn(
        "flex size-12 flex-none cursor-pointer items-center justify-center rounded-full border-2 border-gold bg-radial-[circle_at_40%_35%] from-disc-from to-disc-to p-0 text-[18px] leading-none text-gold-bright shadow-burger transition-shadow duration-300 hover:border-gold-bright hover:shadow-toggle-hover",
        className,
      )}
    >
      <span aria-hidden="true" className="in-data-[theme=light]:hidden">
        ☾
      </span>
      <span aria-hidden="true" className="hidden in-data-[theme=light]:inline">
        ☀
      </span>
    </button>
  );
}

/** Sliding pill switch, used in the desktop utility bar. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label="Toggle light and dark mode"
      className={cn(
        hitArea,
        "relative flex h-[26px] w-16 flex-none cursor-pointer items-center rounded-[13px] border border-switch-edge bg-linear-to-b from-switch-from to-switch-to p-0 shadow-toggle transition-colors duration-300 hover:shadow-toggle-hover",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-[9px] -translate-y-1/2 text-[11px] leading-none text-switch-icon in-data-[theme=light]:text-transparent"
      >
        ☀
      </span>
      <span
        aria-hidden="true"
        className="absolute top-1/2 right-[9px] -translate-y-1/2 text-[11px] leading-none text-transparent in-data-[theme=light]:text-switch-icon"
      >
        ☾
      </span>
      <span
        aria-hidden="true"
        className="absolute top-0.5 left-10 flex size-5 items-center justify-center rounded-full border border-gold-hi bg-(image:--gradient-knob) text-[11px] leading-none text-on-gold shadow-knob transition-[left] duration-300 ease-[cubic-bezier(.4,1.4,.5,1)] in-data-[theme=light]:left-0.5"
      >
        <span className="in-data-[theme=light]:hidden">☾</span>
        <span className="hidden in-data-[theme=light]:inline">☀</span>
      </span>
    </button>
  );
}
