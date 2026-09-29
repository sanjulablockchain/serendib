import { Container } from "@/components/ui/Container";
import type { LegalDocument } from "@/types";

type LegalContentProps = {
  document: LegalDocument;
};

export function LegalContent({ document }: LegalContentProps) {
  return (
    <section className="pt-16 pb-24 nav:pt-24 nav:pb-[120px]">
      <Container>
        <div className="flex max-w-[820px] flex-col gap-10">
          <header className="flex flex-col gap-4">
            <span className="font-display text-[13px] tracking-[0.2em] text-subtle">LEGAL</span>
            <h1 className="m-0 text-[clamp(34px,4.4vw,56px)] leading-[1.1] font-medium text-balance text-shadow-heading">
              {document.title}
            </h1>
            <span className="font-display text-[13px] tracking-[0.16em] text-gold-bright">
              EFFECTIVE DATE: {document.effectiveDate.toUpperCase()}
            </span>
            <span
              aria-hidden="true"
              className="h-px w-[220px] bg-linear-to-r from-gold via-gold to-gold-clear"
            />
            <p className="m-0 text-[20px] leading-[1.6] text-pretty text-soft">{document.intro}</p>
          </header>

          {document.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-4">
              <h2 className="m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.25] font-medium text-balance">
                {section.heading}
              </h2>
              {section.paragraphs?.map((text) => (
                <p key={text} className="m-0 text-[18px] leading-[1.65] text-pretty text-soft">
                  {text}
                </p>
              ))}
              {section.items && (
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {section.items.map((item) => (
                    <li
                      key={item.text}
                      className="border-l-2 border-line-strong pl-4 text-[18px] leading-[1.65] text-pretty text-soft"
                    >
                      {item.term && (
                        <strong className="font-semibold text-fg">{item.term}: </strong>
                      )}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
              {section.closing?.map((text) => (
                <p key={text} className="m-0 text-[18px] leading-[1.65] text-pretty text-soft">
                  {text}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
