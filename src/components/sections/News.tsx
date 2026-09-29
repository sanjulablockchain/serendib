import Image from "next/image";
import { linkProps } from "@/lib/links";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { news, newsPosts } from "@/content/home";

export function News() {
  return (
    <section id="news" className="flex flex-col gap-9 pb-[120px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={news.eyebrow} title={news.title} balance={false} />
        <TextLink href={news.viewAll.href}>{news.viewAll.label}</TextLink>
      </div>

      <div
        data-stagger
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6"
      >
        {newsPosts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            {...linkProps(post.href)}
            className="relative flex flex-col border border-line-half bg-linear-to-b from-news-from to-news-to text-fg hover:border-gold-bright hover:text-fg hover:shadow-news-hover"
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-line-mid bg-btn-to">
              <Image
                src={post.image}
                placeholder="blur"
                alt={post.imageAlt}
                fill
                sizes="(min-width: 1320px) 420px, (min-width: 820px) 33vw, 100vw"
                data-parallax="-0.08"
                data-pbase="scale(1.2)"
                className="[transform:scale(1.2)] object-cover"
              />
              <span className="absolute top-3 left-3 bg-linear-to-b from-gold-soft to-gold px-2.5 py-1.5 font-display text-[11px] tracking-[0.16em] text-void">
                {post.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2.5 px-[22px] pt-[22px] pb-6">
              <span className="font-display text-[18px] leading-[1.3] text-balance text-heading">
                {post.title}
              </span>
              <span className="flex-1 text-[17px] leading-normal text-pretty text-subtle">
                {post.excerpt}
              </span>
              <span className="font-display text-[12px] tracking-[0.16em] text-gold-bright">
                {news.readMore}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
