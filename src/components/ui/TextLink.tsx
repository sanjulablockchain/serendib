import Link from "next/link";
import { linkProps } from "@/lib/links";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { hitArea } from "@/lib/styles";

export function TextLink({ className, ...props }: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn(
        hitArea,
        "border-b border-edge pb-1 font-display text-[13px] tracking-[0.16em] text-gold-bright hover:border-gold-pale hover:text-gold-pale",
        className,
      )}
      {...linkProps(String(props.href))}
      {...props}
    />
  );
}
