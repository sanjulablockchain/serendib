import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { areas, doctors, doctorsSection, medicalDirector } from "@/content/home";
import { hitArea } from "@/lib/styles";

export function Doctors() {
  return (
    <section id="doctors" className="flex flex-col gap-10 pb-[120px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={doctorsSection.eyebrow}
          title={doctorsSection.title}
          className="max-w-[680px]"
        />
        <TextLink href={doctorsSection.viewAll.href}>{doctorsSection.viewAll.label}</TextLink>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-stretch gap-7">
        <div className="relative flex flex-col items-center gap-4 border border-line-strong bg-radial-[ellipse_at_50%_0%] from-well-glow to-well to-70% p-8 text-center">
          <span className="font-display text-[11px] tracking-[0.22em] text-gold-bright">
            {medicalDirector.badge}
          </span>
          <div className="relative size-[168px] overflow-hidden rounded-full border-[3px] border-gold-bright bg-cream-deep shadow-avatar-lead">
            <Image
              src={medicalDirector.image}
              alt={`Dr. ${medicalDirector.name}`}
              fill
              sizes="168px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-display text-[22px] text-heading">{medicalDirector.name}</span>
            <span className="text-[17px] text-subtle">{medicalDirector.credentials}</span>
          </div>
          <p className="m-0 text-[17px] leading-normal text-soft">{medicalDirector.bio}</p>
        </div>

        <div
          data-stagger
          className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] content-center gap-x-4 gap-y-[22px] xs:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
        >
          {doctors.map((doctor) => (
            <div key={doctor.name} className="flex flex-col items-center gap-2.5 text-center">
              <div className="relative size-[104px] overflow-hidden rounded-full border-2 border-gold bg-cream-deep shadow-ring">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="104px"
                  className="object-cover"
                />
              </div>
              <span className="font-display text-[14px] text-heading">{doctor.name}</span>
              <span className="-mt-1.5 text-[15px] text-subtle">{doctor.credentials}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[18px] border border-line-mid bg-tray px-[30px] py-7">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-display text-[14px] tracking-[0.16em] text-gold-bright">
            {doctorsSection.areasTitle}
          </span>
          <span className="text-[17px] text-subtle">{doctorsSection.areasNote}</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {areas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className={`${hitArea} border border-chip-line bg-linear-to-b from-chip-from to-chip-to px-3.5 py-[9px] font-display text-[12px] tracking-[0.12em] text-chip-text hover:border-gold-bright hover:text-gold-pale hover:shadow-chip-hover`}
            >
              {area.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
