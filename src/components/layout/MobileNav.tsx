"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/types";
import { cn } from "@/lib/cn";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-card text-ink hover:bg-primary-light"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {open ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-t border-line bg-surface shadow-nav"
        >
          <ul className="flex flex-col px-4 py-2 sm:px-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-3 text-base font-medium text-ink hover:text-primary",
                    pathname === item.href && "text-primary",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
