import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  gold: "border-gold-pale bg-linear-to-b from-gold-soft to-gold text-void shadow-cta hover:text-void hover:shadow-cta-hover",
  dark: "border-edge bg-linear-to-b from-btn-from to-btn-to text-label hover:border-gold-bright hover:text-gold-bright hover:shadow-glow-soft",
} as const;

const sizes = {
  lg: "px-[30px] py-4 text-[14px] tracking-[0.16em]",
  md: "px-[26px] py-3.5 text-[13px] tracking-[0.16em]",
} as const;

type ButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({ variant = "gold", size = "lg", className, ...props }: ButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center border font-display transition-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
