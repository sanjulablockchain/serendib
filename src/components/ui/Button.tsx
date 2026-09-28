import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-primary text-surface hover:bg-primary-dark",
  secondary: "bg-secondary text-surface hover:bg-secondary-dark",
  outline: "border border-primary text-primary hover:bg-primary-light",
} as const;

type ButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: keyof typeof variants;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
