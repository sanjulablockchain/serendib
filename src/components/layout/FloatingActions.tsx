"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon, PhoneIcon } from "@/components/ui/Icons";
import { footerActions } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const SHOW_AFTER = 400;

const base =
  "flex size-12 items-center justify-center rounded-full transition-[opacity,translate,box-shadow] duration-300 motion-reduce:transition-none";

/** Floating call and scroll to top buttons fixed to the bottom right corner. */
export function FloatingActions() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SHOW_AFTER);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={footerActions.top}
        tabIndex={scrolled ? 0 : -1}
        className={cn(
          base,
          "cursor-pointer border border-gold bg-page text-gold-bright hover:text-gold-pale hover:shadow-cta-hover",
          scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUpIcon className="size-5" />
      </button>
      <a
        href={site.contact.phoneHref}
        aria-label={footerActions.call}
        className={cn(
          base,
          "bg-linear-to-b from-gold-pale to-gold text-on-gold shadow-cta hover:shadow-cta-hover",
        )}
      >
        <PhoneIcon className="size-5" />
      </a>
    </div>
  );
}
