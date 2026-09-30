import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { articleUi } from "@/content/blog";

export function ArticleFooter() {
  return (
    <section className="pb-24 nav:pb-[120px]">
      <Container>
        <div className="flex max-w-[820px] flex-col items-start gap-6 border-t border-line pt-10">
          <p className="m-0 font-display text-[clamp(20px,2.2vw,26px)] leading-[1.3] text-balance text-heading">
            {articleUi.cta.title}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href={articleUi.cta.href} size="md">
              {articleUi.cta.label}
            </Button>
            <TextLink href={articleUi.back.href}>{articleUi.back.label}</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
