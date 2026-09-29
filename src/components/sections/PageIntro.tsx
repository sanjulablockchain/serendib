import { Container } from "@/components/ui/Container";

type PageIntroProps = {
  title: string;
  description?: string;
};

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className="py-16 nav:py-24">
      <Container>
        <h1 className="m-0 text-[clamp(34px,4.4vw,56px)] leading-[1.1] font-medium text-balance text-shadow-heading">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-[640px] text-[20px] leading-[1.55] text-pretty text-soft">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
