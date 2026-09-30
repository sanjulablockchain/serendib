import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { commitment } from "@/content/compliance";

export function ComplianceCommitment() {
  const { officer } = commitment;

  return (
    <section className="pb-16 nav:pb-24">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-10 nav:gap-14">
        <div className="flex flex-col gap-5">
          <SectionHeading eyebrow={commitment.eyebrow} title={commitment.title} size="md" />
          {commitment.paragraphs.map((text) => (
            <p key={text} className="m-0 text-[18px] leading-[1.65] text-pretty text-soft">
              {text}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-4 border border-line bg-linear-to-b from-card-from to-card-to px-[26px] py-8 nav:px-10">
          <span className="font-display text-[13px] tracking-[0.2em] text-subtle">
            {officer.eyebrow}
          </span>
          <h3 className="m-0 text-[clamp(26px,2.8vw,34px)] leading-[1.15] font-medium">
            {officer.name}
          </h3>
          <span className="font-display text-[13px] tracking-[0.16em] text-gold-bright">
            {officer.role.toUpperCase()}
          </span>
          <span
            aria-hidden="true"
            className="h-px w-[160px] bg-linear-to-r from-gold via-gold to-gold-clear"
          />
          <p className="m-0 text-[18px] leading-[1.6] text-pretty text-soft">
            {officer.description}
          </p>
          <p className="m-0 text-[18px] leading-[1.6] text-pretty text-soft">{officer.note}</p>
        </div>
      </Container>
    </section>
  );
}
