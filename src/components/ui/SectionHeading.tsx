import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  size?: "lg" | "md";
  balance?: boolean;
  className?: string;
};

const sizes = {
  lg: "text-[clamp(30px,3.6vw,44px)]",
  md: "text-[clamp(28px,3.2vw,40px)]",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  size = "lg",
  balance = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <span className="font-display text-[13px] tracking-[0.2em] text-subtle">{eyebrow}</span>
      <h2 className={cn(sizes[size], "m-0 leading-[1.15] font-medium", balance && "text-balance")}>
        {title}
      </h2>
    </div>
  );
}
