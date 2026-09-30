import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { articleUi } from "@/content/blog";
import type { BlogArticle } from "@/types";

type ArticleHeroProps = {
  article: BlogArticle;
};

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <section className="pt-12 pb-10 nav:pt-20">
      <Container className="flex flex-col gap-8">
        <div className="flex max-w-[820px] flex-col items-start gap-5">
          <TextLink href={articleUi.back.href}>{articleUi.back.label}</TextLink>
          <span className="bg-linear-to-b from-gold-soft to-gold px-2.5 py-1.5 font-display text-[11px] tracking-[0.16em] text-void">
            {article.tag}
          </span>
          <h1 className="m-0 text-[clamp(32px,4.2vw,52px)] leading-[1.12] font-medium text-balance text-shadow-heading">
            {article.title}
          </h1>
          <span
            aria-hidden="true"
            className="h-px w-[220px] bg-linear-to-r from-gold via-gold to-gold-clear"
          />
        </div>
        <div className="relative aspect-[16/9] max-w-[820px] overflow-hidden border border-line-half bg-btn-to sm:aspect-[2/1]">
          <Image
            src={article.image}
            placeholder="blur"
            alt={article.imageAlt}
            fill
            priority
            sizes="(min-width: 900px) 820px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
