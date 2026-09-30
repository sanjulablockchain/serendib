import { Container } from "@/components/ui/Container";
import { ReportingChannels } from "@/components/ui/ReportingChannels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listening, reportingChannels } from "@/content/compliance";

export function ComplianceReporting() {
  return (
    <section id="report" className="pb-16 nav:pb-24">
      <Container>
        <div className="flex flex-col gap-5 border border-line bg-linear-to-b from-card-from to-card-to px-[26px] py-8 nav:px-10">
          <SectionHeading eyebrow={listening.eyebrow} title={listening.title} size="md" />
          {listening.paragraphs.map((text) => (
            <p
              key={text}
              className="m-0 max-w-[820px] text-[18px] leading-[1.65] text-pretty text-soft"
            >
              {text}
            </p>
          ))}
          <ReportingChannels channels={reportingChannels} />
          <p className="m-0 max-w-[820px] text-[18px] leading-[1.65] text-pretty text-soft">
            {listening.closing}
          </p>
        </div>
      </Container>
    </section>
  );
}
