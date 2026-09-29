import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Provider } from "@/types";

/** First letters of the first two name parts, shown when a provider has no photo. */
function initials(name: string) {
  return name
    .replace(/[^A-Za-z\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type ProviderAvatarProps = {
  provider: Provider;
  sizes: string;
  className?: string;
  initialsClassName?: string;
};

export function ProviderAvatar({
  provider,
  sizes,
  className,
  initialsClassName,
}: ProviderAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex flex-none items-center justify-center overflow-hidden rounded-full border-2 border-gold-bright bg-radial-[circle_at_40%_35%] from-disc-from to-disc-to shadow-avatar",
        className,
      )}
    >
      {provider.image ? (
        <Image
          src={provider.image}
          alt={provider.name}
          fill
          sizes={sizes}
          className="object-cover object-[50%_25%]"
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn("font-display tracking-[0.04em] text-gold-bright", initialsClassName)}
        >
          {initials(provider.name)}
        </span>
      )}
    </div>
  );
}
