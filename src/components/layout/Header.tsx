import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLink } from "@/components/layout/NavLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { mobileNav, navLeft, navRight, site } from "@/content/site";
import { linkProps } from "@/lib/links";
import { hitArea } from "@/lib/styles";

const utilityLink = `${hitArea} text-soft hover:text-gold-pale`;
const bumper =
  "hidden size-[22px] items-center justify-center rounded-[3px] border border-edge text-[9px] tracking-normal text-gold wide:flex";
const nav =
  "hidden flex-nowrap items-center gap-[18px] font-display text-[11.5px] tracking-[0.12em] whitespace-nowrap nav:flex wide:gap-[clamp(20px,2.4vw,34px)] wide:text-[13px] wide:tracking-[0.16em]";

export function Header() {
  const { contact } = site;

  return (
    <header className="sticky top-0 z-30">
      <div className="border-b border-bar-line bg-bar">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-4 px-7 py-[7px] font-display text-[11px] tracking-[0.16em] text-subtle wide:justify-between">
          <span className="hidden wide:inline">{site.utilityTagline}</span>
          <div className="flex flex-wrap items-center gap-[22px] leading-none">
            <a href={contact.phoneHref} className={utilityLink}>
              CALL {contact.phone}
            </a>
            <a href={contact.textHref} className={utilityLink}>
              TEXT EN / ES {contact.text}
            </a>
            <ThemeToggle className="hidden nav:flex" />
            <a
              href={contact.messengerHref}
              {...linkProps(contact.messengerHref)}
              className={`${utilityLink} hidden xs:inline`}
            >
              MESSENGER
            </a>
          </div>
        </div>
      </div>

      <div className="relative bg-linear-to-b from-header-from to-header-to shadow-header backdrop-blur-[10px]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-(image:--gradient-rule-strong)"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-1 h-px bg-(image:--gradient-rule-soft)"
        />
        <div className="relative mx-auto grid min-h-[78px] max-w-site grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2.5 px-4 nav:gap-5 nav:px-7">
          <nav aria-label="Main" className={`${nav} justify-end`}>
            <span aria-hidden="true" className={bumper}>
              ◂
            </span>
            {navLeft.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="relative -mb-[22px] flex size-[84px] items-center justify-center rounded-full border-2 border-gold-bright bg-(image:--gradient-medallion) shadow-medallion nav:-mb-[34px] nav:size-[108px] wide:-mb-[46px] wide:size-[132px]"
          >
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={760}
              height={540}
              className="h-auto w-[66px] nav:w-[86px] wide:w-[104px]"
            />
          </Link>

          <nav aria-label="Secondary" className={`${nav} justify-start`}>
            {navRight.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
            <span aria-hidden="true" className={bumper}>
              ▸
            </span>
          </nav>

          <MobileNav
            items={mobileNav}
            cta={{ label: "MAKE THE SWITCH", href: contact.transferBookingHref }}
          />
        </div>
      </div>
    </header>
  );
}
