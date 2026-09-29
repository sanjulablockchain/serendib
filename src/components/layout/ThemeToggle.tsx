"use client";

import { cn } from "@/lib/cn";
import { hitArea } from "@/lib/styles";

const STORAGE_KEY = "sh-theme";

/** Flips the theme on <html>. All visuals react to data-theme through CSS, so no state is needed. */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    if (next === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      className={cn(
        hitArea,
        "relative flex h-[26px] w-16 flex-none cursor-pointer items-center rounded-[13px] border border-switch-edge bg-linear-to-b from-switch-from to-switch-to p-0 shadow-toggle transition-colors duration-300 hover:shadow-toggle-hover",
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
