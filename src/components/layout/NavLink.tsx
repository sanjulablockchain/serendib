"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types";
import { cn } from "@/lib/cn";

/** Header link. The current page gets a glowing label and a diamond marker. */
export function NavLink({ label, href }: NavItem) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative py-2.5",
        active
          ? "text-gold-pale text-shadow-halo"
          : "text-soft hover:text-gold-pale hover:text-shadow-halo",
      )}
    >
      {label}
      {active && (
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-1/2 size-[7px] -translate-x-1/2 rotate-45 bg-gold-pale shadow-diamond"
        />
      )}
    </Link>
  );
}
