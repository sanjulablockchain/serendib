import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  documentsHeading,
  guidelineDocuments,
  readDocumentLabel,
  utilizationManagement,
} from "@/content/guidelines";

const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

export function GuidelineDocuments() {
  return (
    <section className="pb-24 nav:pb-[120px]">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col gap-5 border border-line bg-linear-to-b from-card-from to-card-to px-[26px] py-8 nav:px-10">
          <SectionHeading
            eyebrow={utilizationManagement.eyebrow}
            title={utilizationManagement.title}
            size="md"
          />
          <p className="m-0 max-w-[720px] text-[18px] leading-[1.6] text-pretty text-soft">
            {utilizationManagement.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {utilizationManagement.flyers.map((flyer) => (
              <Button
                key={flyer.label}
                href={flyer.href}
                size="md"
                className="min-h-[44px]"
                aria-label={`${flyer.label} UM communications flyer, PDF`}
                {...newTab}
              >
                {flyer.label.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow={documentsHeading.eyebrow}
            title={documentsHeading.title}
            size="md"
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {guidelineDocuments.map((doc) => (
              <article
                key={doc.title}
                className="relative flex flex-col gap-4 border border-line bg-linear-to-b from-card-from to-card-to px-[26px] pt-[30px] pb-7 hover:border-gold-bright hover:shadow-news-hover"
              >
                <span className="absolute top-3.5 right-[18px] font-display text-[12px] tracking-[0.14em] text-gold">
                  {doc.year}
                </span>
                <h3 className="m-0 text-[22px] leading-[1.25] font-medium tracking-[0.02em] text-balance">
                  {doc.title}
                </h3>
                <p className="m-0 flex-1 text-[18px] leading-[1.55] text-pretty text-soft">
                  {doc.description}
                </p>
                <Button
                  href={doc.href}
                  variant="dark"
                  size="md"
                  className="min-h-[44px] self-start"
                  aria-label={`${readDocumentLabel.toLowerCase()}: ${doc.title}, PDF`}
                  {...newTab}
                >
                  {readDocumentLabel}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
