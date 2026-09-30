import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { speakUp } from "@/content/compliance";

export function SpeakUp() {
  return (
    <section className="pb-24 nav:pb-[120px]">
      <Container>
        <div className="flex flex-col gap-5 border border-line bg-linear-to-b from-card-from to-card-to px-[26px] py-8 nav:px-10">
          <SectionHeading eyebrow={speakUp.eyebrow} title={speakUp.title} size="md" />
          <p className="m-0 text-[20px] leading-[1.6] font-medium text-fg">{speakUp.lead}</p>
          {speakUp.paragraphs.map((text) => (
            <p
              key={text}
              className="m-0 max-w-[820px] text-[18px] leading-[1.65] text-pretty text-soft"
            >
              {text}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
