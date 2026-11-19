import { Container } from "@/components/ui/Container";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resourceGroups } from "@/content/resources";

export function ResourceGroups() {
  return (
    <section className="pb-24 nav:pb-[120px]">
      <Container className="flex flex-col gap-16 nav:gap-20">
        {resourceGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-8">
            <SectionHeading eyebrow={group.eyebrow} title={group.title} size="md" />
            {group.note && (
              <p className="m-0 max-w-[760px] border-l-2 border-gold pl-5 text-[18px] leading-[1.6] text-pretty text-soft">
                {group.note}
              </p>
            )}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
              {group.items.map((item) => (
                <DocumentCard
                  key={item.title}
                  title={item.title}
                  tag={item.tag}
                  description={item.description}
                  href={item.href}
                  cta={item.cta}
                />
              ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
