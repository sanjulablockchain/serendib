import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide text-secondary uppercase">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base sm:text-lg">{description}</p>}
    </div>
  );
}
