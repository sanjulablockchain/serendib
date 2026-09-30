import { ArticleCard } from "@/components/ui/ArticleCard";
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
          <ArticleCard key={post.href} post={post} />
        ))}
      </div>
    </section>
  );
}
