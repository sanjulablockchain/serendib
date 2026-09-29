import Image from "next/image";
import Link from "next/link";
import { careNetwork } from "@/content/our-partners";
import { linkProps } from "@/lib/links";

export function CareNetwork() {
  return (
    <section
      id="network"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-14 gap-y-10 pb-[120px]"
    >
      <div className="flex max-w-[760px] flex-col gap-3">
        <span
          data-parallax="0.08"
          className="font-display text-[13px] tracking-[0.22em] text-subtle"
        >
          {careNetwork.eyebrow}
        </span>
        <h2
          data-parallax="0.04"
          className="m-0 text-[clamp(30px,3.6vw,44px)] leading-[1.15] font-medium text-balance"
        >
          {careNetwork.title}
        </h2>
      </div>

      <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
        {careNetwork.clinics.map((clinic) => (
          <li key={clinic.name}>
            <Link
              href={clinic.href}
              {...linkProps(clinic.href)}
              className="relative flex flex-wrap items-center gap-[22px] border border-line-mid bg-linear-to-r from-row-from to-row-to px-[22px] py-[18px] hover:border-gold-bright hover:shadow-row-hover"
            >
              <div className="flex h-[72px] flex-none items-center justify-center border border-gold bg-linear-to-b from-cream to-cream-deep px-4 py-2 shadow-ring">
                <Image
                  src={clinic.logo}
                  alt=""
                  width={clinic.logoWidth}
                  height={clinic.logoHeight}
                  sizes="120px"
                  className="h-[52px] w-auto"
                />
              </div>
              <div className="flex min-w-[200px] flex-1 flex-col gap-1">
                <span className="font-display text-[16px] tracking-[0.06em] text-heading">
                  {clinic.name}
                </span>
                <span className="text-[17px] leading-[1.45] text-subtle">{clinic.description}</span>
              </div>
              <span className="font-display text-[12px] tracking-[0.16em] text-gold-bright">
                {careNetwork.cta}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
