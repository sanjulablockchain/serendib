/** Extra anchor props for external URLs and PDFs: open in a new tab without leaking the opener. */
export function linkProps(href: string) {
  return /^https?:\/\/|\.pdf$/i.test(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}
