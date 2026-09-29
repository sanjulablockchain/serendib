import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HudRowProps = {
  title: string;
  note: string;
  badge: ReactNode;
  href?: string;
  badgeClassName?: string;
  leftMark?: boolean;
};

const row =
  "relative flex items-center gap-5 border border-line-mid bg-linear-to-r from-row-from to-row-to py-3.5 pr-4 pl-5 transition-all duration-200 hover:border-gold-bright hover:from-row-hover-from hover:to-row-hover-to hover:shadow-row-hover";

/** A framed list row with a title, a note and a status badge. Renders a link when given an href. */
export function HudRow({ title, note, badge, href, badgeClassName, leftMark }: HudRowProps) {
  const content = (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="font-display text-[14px] tracking-[0.08em] text-heading">{title}</span>
        <span className="text-[17px] leading-[1.4] text-subtle">{note}</span>
      </div>
      <span
        className={cn(
          "shrink-0 border border-edge bg-pill py-2 text-center font-display tracking-[0.1em] shadow-pill",
          badgeClassName,
        )}
      >
        {badge}
      </span>
      <span
        aria-hidden="true"
        className="absolute right-[3px] bottom-[3px] h-1.5 w-2.5 border-r border-b border-halo-strong"
      />
      {leftMark && (
        <span
          aria-hidden="true"
          className="absolute bottom-[3px] left-[3px] h-1.5 w-2.5 border-b border-l border-halo-half"
        />
      )}
    </>
  );

  return href ? (
    <Link href={href} className={row}>
      {content}
    </Link>
  ) : (
    <div className={row}>{content}</div>
  );
}
