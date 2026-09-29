import Image from "next/image";
import { linkProps } from "@/lib/links";
import Link from "next/link";
import { footerActions } from "@/content/home";
import { footerColumns, site } from "@/content/site";
import { hitArea } from "@/lib/styles";

const action = `${hitArea} flex items-center gap-[9px] text-fg hover:text-gold-bright`;
const actionIcon =
  "flex size-[26px] items-center justify-center rounded-full border-2 text-[12px] font-bold";
const footerLink = `${hitArea} text-soft hover:text-gold-bright`;

export function Footer() {
  const { contact } = site;

  return (
    <footer className="relative z-[1] border-t border-footer-line bg-linear-to-b from-footer-from to-footer-to">
      <div className="mx-auto flex max-w-site flex-col gap-[34px] px-7 pt-12 pb-7">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[380px] flex-col gap-3.5">
            <div className="self-start border border-gold bg-linear-to-b from-cream to-plate px-3.5 py-1.5">
              <Image
                src="/images/logo.png"
                alt={site.name}
                width={760}
                height={540}
                className="block h-[54px] w-auto"
              />
            </div>
            <span className="text-[17px] leading-normal text-subtle">{site.footerBlurb}</span>
            <address className="text-[17px] leading-normal text-soft not-italic">
              {contact.address.street}, {contact.address.city}, {contact.address.region}{" "}
              {contact.address.postalCode}
            </address>
          </div>

          <div className="flex flex-wrap gap-14 text-[17px]">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-2.5">
                <span className="font-display text-[12px] tracking-[0.18em] text-gold-bright">
                  {column.title}
                </span>
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={footerLink}
                    {...linkProps(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className="h-0.5 w-[min(100%,440px)] bg-(image:--gradient-rule-end)" />
          <div className="flex flex-wrap justify-end gap-[26px] font-display text-[13px] tracking-[0.1em]">
            <a href={contact.phoneHref} className={action}>
              <span aria-hidden="true" className={`${actionIcon} border-gold text-gold-bright`}>
                C
              </span>
              {footerActions.call}
            </a>
            <a href={contact.textHref} className={action}>
              <span aria-hidden="true" className={`${actionIcon} border-leaf text-mint`}>
                T
              </span>
              {footerActions.text}
            </a>
            <a href="#top" className={action}>
              <span aria-hidden="true" className={`${actionIcon} border-aqua-ring text-aqua`}>
                ↑
              </span>
              {footerActions.top}
            </a>
          </div>
        </div>

        <span className="text-[15px] text-fine">{site.copyright}</span>
      </div>
    </footer>
  );
}
