import { Button } from "@/components/ui/Button";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { transferTeaser } from "@/content/home";

const icons: Record<string, string> = {
  research: "M9 4h6v3H9zM7 6H5v14h14V6h-2M9 12h6M9 16h4",
  enroll: "M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6zM9.5 12l2 2 3.5-4",
  benefits: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10zM12 9v5M9.5 11.5h5",
};

export function TransferTeaser() {
  return (
    <section id="transfer" className="pb-[120px]">
      <CornerFrame className="grid items-center gap-10 p-[clamp(24px,5vw,56px)] md:grid-cols-2 md:gap-14">
        <div className="flex flex-col gap-[22px]">
          <span className="font-display text-[13px] tracking-[0.2em] text-subtle">
            {transferTeaser.eyebrow}
          </span>
          <h2 className="m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.15] font-medium text-balance">
            {transferTeaser.title}
          </h2>
          <p className="m-0 text-[19px] leading-[1.6] text-pretty text-soft">
            {transferTeaser.description}
          </p>
          <ol className="m-0 flex list-none flex-wrap gap-x-6 gap-y-4 p-0">
            {transferTeaser.steps.map((step) => (
              <li key={step.id} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-pale text-gold-bright"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icons[step.id]} />
                  </svg>
                </span>
                <span className="font-display text-[13px] tracking-[0.14em] text-heading">
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col items-stretch gap-3.5 md:items-center">
          <Button href={transferTeaser.cta.href} size="lg" className="min-h-11 text-center">
            {transferTeaser.cta.label}
          </Button>
          <Button href={transferTeaser.more.href} variant="dark" size="md" className="min-h-11">
            {transferTeaser.more.label}
          </Button>
        </div>
      </CornerFrame>
    </section>
  );
}
