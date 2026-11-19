import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { resourceGroups, resourcesIntro } from "@/content/resources";

const DASH_CODES = [0x2012, 0x2013, 0x2014, 0x2015, 0x2212];
const SPACED_HYPHEN = [" ", "-", " "].join("");

const items = resourceGroups.flatMap((group) => group.items);

describe("resources", () => {
  it("links to https pages or to PDFs we host", () => {
    for (const { href } of items) {
      if (href.startsWith("/")) {
        expect(href).toMatch(/^\/documents\/[a-z0-9-]+\.pdf$/);
        expect(existsSync(join(process.cwd(), "public", href)), href).toBe(true);
      } else {
        expect(new URL(href).protocol).toBe("https:");
      }
    }
  });

  it("has unique titles", () => {
    const titles = items.map((item) => item.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("has no dash punctuation in its copy", () => {
    const copy = [
      resourcesIntro,
      ...resourceGroups.flatMap((g) => [g.eyebrow, g.title, g.note ?? ""]),
      ...items.flatMap((i) => [i.title, i.tag, i.description, i.cta]),
    ];
    for (const text of copy) {
      expect(text.includes(SPACED_HYPHEN), text).toBe(false);
      expect(
        [...text].some((ch) => DASH_CODES.includes(ch.charCodeAt(0))),
        text,
      ).toBe(false);
    }
  });
});
