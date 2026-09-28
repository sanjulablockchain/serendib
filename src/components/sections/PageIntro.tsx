import { Container } from "@/components/ui/Container";

type PageIntroProps = {
  title: string;
  description?: string;
};

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className="bg-primary-light py-16 sm:py-20">
      <Container>
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base sm:text-lg">{description}</p>}
      </Container>
    </section>
  );
}
