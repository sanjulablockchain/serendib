import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { mainNav, site, socialLinks } from "@/content/site";

export function Footer() {
  const { contact } = site;

  return (
    <footer className="bg-ink text-muted">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-2">
          <p className="font-display text-xl font-bold text-surface">{site.name}</p>
          <p className="mt-3 max-w-md text-sm">{site.description}</p>
        </div>

        <nav aria-label="Footer">
          <p className="font-semibold text-surface">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-surface">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <p className="font-semibold text-surface">Contact</p>
          <address className="mt-4 space-y-2 not-italic">
            <p>
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.region} {contact.address.postalCode}
            </p>
            <p>
              Call{" "}
              <a href={contact.phoneHref} className="hover:text-surface">
                {contact.phone}
              </a>
            </p>
            <p>
              Text{" "}
              <a href={contact.textHref} className="hover:text-surface">
                {contact.text}
              </a>{" "}
              ({contact.textNote})
            </p>
          </address>
          <ul className="mt-4 flex gap-4">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-surface">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-body/30">
        <Container className="py-6 text-xs">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
