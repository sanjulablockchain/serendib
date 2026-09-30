import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HudRow } from "@/components/ui/HudRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { complianceContact, providerTraining, trainingItems } from "@/content/compliance";
import { cn } from "@/lib/cn";

const text = "m-0 text-[18px] leading-[1.65] text-pretty text-soft";
const inlineLink = "break-words text-gold-bright hover:text-gold-pale";

export function ProviderTraining() {
  const { attestation, questions } = providerTraining;
  const email = complianceContact.email;

  return (
    <section className="pb-16 nav:pb-24">
      <Container className="flex max-w-[820px] flex-col gap-5">
        <SectionHeading
          eyebrow={providerTraining.eyebrow}
          title={providerTraining.title}
          size="md"
        />
        {providerTraining.paragraphs.map((p) => (
          <p key={p} className={text}>
            {p}
          </p>
        ))}
        <div className="flex flex-col gap-2.5">
          {trainingItems.map((item) => (
            <HudRow
              key={item.title}
              href={item.href}
              title={item.title}
              note={item.note}
              badge={item.action}
              badgeClassName={cn(
                "w-24 text-[12px] xs:w-[130px]",
                item.pending ? "text-amber" : "text-heading",
              )}
            />
          ))}
        </div>
        <p className={text}>
          {attestation.before}
          <Link href={email.href} className={inlineLink}>
            {email.label}
          </Link>
          {attestation.after}
        </p>
        <p className={text}>
          {questions.before}
          <Link href={email.href} className={inlineLink}>
            {email.label}
          </Link>
          {questions.after}
        </p>
      </Container>
    </section>
  );
}
