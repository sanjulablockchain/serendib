import { ArticleCard } from "@/components/ui/ArticleCard";
import { Container } from "@/components/ui/Container";
import { newsPosts } from "@/content/home";

export function BlogGrid() {
  return (
    <section className="pb-24 nav:pb-[120px]">
      <Container>
        <div
          data-stagger
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6"
        >
          {newsPosts.map((post) => (
            <ArticleCard key={post.href} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
