import { describe, expect, it } from "vitest";
import { articles, getArticle } from "@/content/blog";

const DASH_CODES = [0x2012, 0x2013, 0x2014, 0x2015, 0x2212];
const SPACED_HYPHEN = [" ", "-", " "].join("");

function hasDashPunctuation(text: string) {
  return (
    text.includes(SPACED_HYPHEN) || [...text].some((ch) => DASH_CODES.includes(ch.charCodeAt(0)))
  );
}

function copyOf(article: (typeof articles)[number]) {
  const body = article.body.flatMap((block) => {
    switch (block.type) {
      case "heading":
      case "paragraph":
        return [block.text];
      case "list":
        return block.items.flatMap((item) => [item.term ?? "", item.text]);
      case "contact":
        return [block.title, ...block.lines.flatMap((line) => [line.label, line.value])];
    }
  });
  return [article.title, article.excerpt, article.tag, article.imageAlt, ...body];
}

describe("blog articles", () => {
  it("has unique url safe slugs", () => {
    const slugs = articles.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("gives every article a body and image alt text", () => {
    for (const article of articles) {
      expect(article.body.length).toBeGreaterThan(0);
      expect(article.imageAlt.trim()).not.toBe("");
    }
  });

  it("uses no dash punctuation in copy", () => {
    for (const article of articles) {
      for (const text of copyOf(article)) expect(hasDashPunctuation(text)).toBe(false);
    }
  });

  it("finds articles by slug", () => {
    expect(getArticle("monkeypox-alert")?.title).toBe("Monkeypox Alert");
    expect(getArticle("missing")).toBeUndefined();
  });
});
