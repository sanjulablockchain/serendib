import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { mainNav, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface shadow-nav">
      <Container className="relative flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="font-display text-lg font-bold text-primary sm:text-xl">
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm font-medium text-ink hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href={site.contact.phoneHref} className="hidden sm:inline-flex">
            {site.contact.phone}
          </Button>
          <MobileNav items={mainNav} />
        </div>
      </Container>
    </header>
  );
}
