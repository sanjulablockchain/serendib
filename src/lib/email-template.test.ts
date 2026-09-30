import { describe, expect, it } from "vitest";
import { buildContactHtml, escapeHtml } from "@/lib/email-template";

const input = { name: "Nimal Perera", email: "nimal@example.com", message: "Line one\nLine two" };

describe("buildContactHtml", () => {
  it("includes the visitor details and keeps line breaks", () => {
    const html = buildContactHtml(input, { logo: true });
    expect(html).toContain("Nimal Perera");
    expect(html).toContain("nimal@example.com");
    expect(html).toContain("Line one<br />Line two");
    expect(html).toContain("cid:serendib-logo");
  });

  it("falls back to a text wordmark without the logo", () => {
    const html = buildContactHtml(input, { logo: false });
    expect(html).not.toContain("cid:");
    expect(html).toContain("Serendib Healthways");
  });

  it("escapes markup from the visitor", () => {
    const html = buildContactHtml(
      { name: "<b>Eve</b>", email: "e@x.co", message: '<script>alert("x")</script>' },
      { logo: false },
    );
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<b>Eve</b>");
    expect(html).toContain("&lt;script&gt;");
  });
});

describe("escapeHtml", () => {
  it("escapes the five special characters", () => {
    expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  });
});
