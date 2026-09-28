// Enforces the "no dash punctuation in visible text" rule (see CLAUDE.md).
// Fails on em/en dashes anywhere in src, and on " - " used as punctuation
// inside content files or JSX text.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "src");
const EXTENSIONS = [".ts", ".tsx", ".md", ".mdx", ".json"];

const UNICODE_DASH = /[‒–—―−]/;
const SPACED_HYPHEN = /\s-\s/;
const JSX_TEXT_HYPHEN = />[^<>{}]*\s-\s[^<>{}]*</;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const problems = [];

for (const file of walk(SRC)) {
  if (!EXTENSIONS.some((ext) => file.endsWith(ext))) continue;
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  const isContent = rel.startsWith("src/content/");

  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      const where = `${rel}:${i + 1}`;
      if (UNICODE_DASH.test(line)) problems.push(`${where}  em/en dash: ${line.trim()}`);
      else if (isContent && SPACED_HYPHEN.test(line))
        problems.push(`${where}  hyphen as punctuation: ${line.trim()}`);
      else if (file.endsWith(".tsx") && JSX_TEXT_HYPHEN.test(line))
        problems.push(`${where}  hyphen in JSX text: ${line.trim()}`);
    });
}

if (problems.length) {
  console.error("Dash punctuation found in visible text:\n" + problems.join("\n"));
  process.exit(1);
}
console.log("No dash punctuation found.");
