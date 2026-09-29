"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavLinkItem } from "@/types";
import { cn } from "@/lib/cn";
import { RoundThemeToggle } from "@/components/ui/ThemeToggle";

type MobileNavProps = {
  items: NavLinkItem[];
  cta: { label: string; href: string };
};

const bar = "block h-0.5 w-[18px] bg-gold-bright transition-transform duration-[250ms]";

export function MobileNav({ items, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="nav:hidden">
      <RoundThemeToggle className="absolute top-1/2 right-[84px] size-12 -translate-y-1/2" />
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="absolute top-1/2 right-4 flex size-12 -translate-y-1/2 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border-2 border-gold bg-radial-[circle_at_40%_35%] from-disc-from to-disc-to p-0 shadow-burger"
      >
        <span className={cn(bar, open && "translate-y-[7px] rotate-45")} />
        <span className={cn(bar, "transition-opacity duration-200", open && "opacity-0")} />
        <span className={cn(bar, open && "-translate-y-[7px] -rotate-45")} />
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full flex max-h-[calc(100vh-120px)] flex-col gap-2 overflow-auto border-b border-gold bg-linear-to-b from-menu-from to-menu-to px-4 pt-[34px] pb-5 shadow-menu"
        >
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "relative flex items-center gap-3.5 border bg-linear-to-r from-row-from to-menu-item-to p-4 font-display text-[14px] tracking-[0.14em] active:border-gold-bright active:text-gold-pale",
                  active ? "border-gold-bright text-gold-pale" : "border-line-mid text-fg",
                )}
              >
                <span className="w-[22px] text-[11px] text-gold">{item.numeral}</span>
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute right-[3px] bottom-[3px] h-1.5 w-2.5 border-r border-b border-halo-strong"
                />
              </Link>
            );
          })}
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-2 border border-gold-pale bg-linear-to-b from-gold-soft to-gold p-[15px] text-center font-display text-[14px] tracking-[0.18em] text-void hover:text-void"
          >
            {cta.label}
          </Link>
        </nav>
      )}
    </div>
  );
}
