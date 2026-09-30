import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutProgram } from "@/content/compliance";

export function ComplianceAbout() {
  return (
    <section className="pb-16 nav:pb-24">
      <Container className="flex max-w-[820px] flex-col gap-5">
        <SectionHeading eyebrow={aboutProgram.eyebrow} title={aboutProgram.title} size="md" />
        <p className="m-0 text-[18px] leading-[1.65] text-pretty text-soft">{aboutProgram.intro}</p>
        <p className="m-0 text-[18px] leading-[1.65] font-semibold text-fg">
          {aboutProgram.listLabel}
        </p>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {aboutProgram.supports.map((item) => (
            <li
              key={item}
              className="border-l-2 border-line-strong pl-4 text-[18px] leading-[1.65] text-pretty text-soft"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="m-0 text-[18px] leading-[1.65] text-pretty text-soft">
          {aboutProgram.closing}
        </p>
      </Container>
    </section>
  );
}
