import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DocumentCard } from "@/components/ui/DocumentCard";
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
              <DocumentCard
                key={doc.title}
                title={doc.title}
                tag={doc.year}
                description={doc.description}
                href={doc.href}
                cta={readDocumentLabel}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
