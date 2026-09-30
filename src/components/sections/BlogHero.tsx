import { Container } from "@/components/ui/Container";
import { blogIntro } from "@/content/blog";

export function BlogHero() {
  return (
    <section className="py-16 nav:py-24">
      <Container className="flex flex-col gap-5">
        <span className="font-display text-[13px] tracking-[0.2em] text-subtle">
          {blogIntro.eyebrow}
        </span>
        <h1 className="m-0 text-[clamp(34px,4.4vw,56px)] leading-[1.1] font-medium text-balance text-shadow-heading">
          {blogIntro.title}
        </h1>
        <p className="m-0 max-w-[640px] text-[20px] leading-[1.55] text-pretty text-soft">
          {blogIntro.description}
        </p>
      </Container>
    </section>
  );
}
