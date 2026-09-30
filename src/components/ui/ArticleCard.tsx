import Image from "next/image";
import Link from "next/link";
import { articleUi } from "@/content/blog";
import { linkProps } from "@/lib/links";
import type { NewsPost } from "@/types";

type ArticleCardProps = {
  post: NewsPost;
};

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link
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
          {articleUi.readMore}
        </span>
      </div>
    </Link>
  );
}
