import { Button } from "@/components/ui/Button";

type DocumentCardProps = {
  title: string;
  /** Small gold label in the top right corner, such as a year or "PDF". */
  tag: string;
  description: string;
  href: string;
  cta: string;
};

export function DocumentCard({ title, tag, description, href, cta }: DocumentCardProps) {
  const kind = /\.pdf$/i.test(href) ? ", PDF" : "";
  return (
    <article className="relative flex flex-col gap-4 border border-line bg-linear-to-b from-card-from to-card-to px-[26px] pt-[30px] pb-7 hover:border-gold-bright hover:shadow-news-hover">
      <span className="absolute top-3.5 right-[18px] font-display text-[12px] tracking-[0.14em] text-gold">
        {tag}
      </span>
      <h3 className="m-0 pr-16 text-[22px] leading-[1.25] font-medium tracking-[0.02em] text-balance">
        {title}
      </h3>
      <p className="m-0 flex-1 text-[18px] leading-[1.55] text-pretty text-soft">{description}</p>
      <Button
        href={href}
        variant="dark"
        size="md"
        className="min-h-[44px] self-start"
        aria-label={`${cta.toLowerCase()}: ${title}${kind}, opens in a new tab`}
      >
        {cta}
      </Button>
    </article>
  );
}
