import Image from "next/image";
import { linkProps } from "@/lib/links";
import Link from "next/link";
import { footerActions } from "@/content/home";
import { footerColumns, site, socialLinks } from "@/content/site";
import { hitArea } from "@/lib/styles";
import {
  FacebookIcon,
  InstagramIcon,
  MessageIcon,
  PhoneIcon,
  YouTubeIcon,
} from "@/components/ui/Icons";

const iconButton =
  "flex size-11 items-center justify-center rounded-full border-2 transition-colors";
const socialIcons: Record<string, typeof FacebookIcon> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
};
const footerLink = `${hitArea} text-soft hover:text-gold-bright`;

export function Footer() {
  const { contact } = site;

  return (
    <footer className="relative z-[1] border-t border-footer-line bg-linear-to-b from-footer-from to-footer-to">
      <div className="mx-auto flex max-w-site flex-col gap-[34px] px-7 pt-12 pb-36 nav:pb-7">
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

        <div className="flex flex-col items-end gap-3 nav:pr-20">
          <span className="h-0.5 w-[min(100%,440px)] bg-(image:--gradient-rule-end)" />
          <div className="flex flex-wrap items-center justify-end gap-3">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.label];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className={`${iconButton} border-line-strong text-soft hover:border-gold hover:text-gold-bright`}
                  {...linkProps(link.href)}
                >
                  {Icon && <Icon />}
                </a>
              );
            })}
            <a
              href={contact.phoneHref}
              aria-label={footerActions.call}
              className={`${iconButton} border-gold text-gold-bright hover:text-gold-pale`}
            >
              <PhoneIcon />
            </a>
            <a
              href={contact.textHref}
              aria-label={footerActions.text}
              className={`${iconButton} border-leaf text-mint hover:text-cream`}
            >
              <MessageIcon />
            </a>
          </div>
        </div>

        <span className="text-[15px] text-fine">{site.copyright}</span>
      </div>
    </footer>
  );
}
