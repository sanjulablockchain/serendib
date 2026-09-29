"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

/** Round icon button that flips between light and dark. Icons swap through CSS on data-theme. */
export function ThemeToggle({ className }: { className?: string }) {
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
