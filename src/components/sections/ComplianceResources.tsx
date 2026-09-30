import { Container } from "@/components/ui/Container";
import { HudRow } from "@/components/ui/HudRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resourceItems, resources } from "@/content/compliance";

export function ComplianceResources() {
  return (
    <section id="resources" className="pb-16 nav:pb-24">
      <Container className="flex max-w-[820px] flex-col gap-5">
        <SectionHeading eyebrow={resources.eyebrow} title={resources.title} size="md" />
        <p className="m-0 text-[18px] leading-[1.65] text-pretty text-soft">
          {resources.description}
        </p>
        <div className="flex flex-col gap-2.5">
          {resourceItems.map((item) => (
            <HudRow
              key={item.title}
              href={item.href}
              title={item.title}
              note={item.note}
              badge={item.action}
              badgeClassName="w-24 text-[12px] text-heading xs:w-[130px]"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
