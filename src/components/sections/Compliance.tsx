import { Button } from "@/components/ui/Button";
import { HudRow } from "@/components/ui/HudRow";
import { Medallion } from "@/components/ui/Medallion";
import { Rail } from "@/components/ui/Rail";
import { compliance, complianceItems } from "@/content/home";
import { cn } from "@/lib/cn";

export function Compliance() {
  return (
    <section
      id="compliance"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-12 pb-[120px]"
    >
      <div className="flex flex-col gap-[22px]">
        <Medallion label={compliance.eyebrow} symbolClassName="text-[20px]">
          ⚖
        </Medallion>
        <h2 className="m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.15] font-medium text-balance">
          {compliance.title}
        </h2>
        <p className="m-0 text-[19px] leading-[1.6] text-pretty text-soft">
          {compliance.description}
        </p>
        <Button href={compliance.cta.href} variant="dark" size="md" className="self-start">
          {compliance.cta.label}
        </Button>
      </div>

      <div className="flex gap-[18px]">
        <div data-stagger className="flex min-w-0 flex-1 flex-col gap-2.5">
          {complianceItems.map((item) => (
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
        <Rail thumbClassName="top-0.5 h-[60%]" />
      </div>
    </section>
  );
}
