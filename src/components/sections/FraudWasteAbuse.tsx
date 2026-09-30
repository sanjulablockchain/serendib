import { Container } from "@/components/ui/Container";
import { ReportingChannels } from "@/components/ui/ReportingChannels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fwa, reportingChannels } from "@/content/compliance";

const text = "m-0 text-[18px] leading-[1.65] text-pretty text-soft";

export function FraudWasteAbuse() {
  return (
    <section className="pb-16 nav:pb-24">
      <Container className="flex max-w-[820px] flex-col gap-5">
        <SectionHeading eyebrow={fwa.eyebrow} title={fwa.title} size="md" />
        {fwa.paragraphs.map((p) => (
          <p key={p} className={text}>
            {p}
          </p>
        ))}
        <p className="m-0 text-[18px] leading-[1.65] font-semibold text-fg">{fwa.examplesLabel}</p>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {fwa.examples.map((item) => (
            <li
              key={item}
              className="border-l-2 border-line-strong pl-4 text-[18px] leading-[1.65] text-pretty text-soft"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="m-0 text-[18px] leading-[1.65] font-semibold text-fg">{fwa.reportLabel}</p>
        <ReportingChannels channels={reportingChannels} />
        {fwa.closing.map((p) => (
          <p key={p} className={text}>
            {p}
          </p>
        ))}
      </Container>
    </section>
  );
}
