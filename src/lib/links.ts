/** Extra anchor props for external URLs: open in a new tab without leaking the opener. */
export function linkProps(href: string) {
  return /^https?:\/\//.test(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}
