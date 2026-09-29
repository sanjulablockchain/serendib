// Enforces the image rules (see CLAUDE.md rules 9 and 10):
// no external image URLs, no raw <img> tags, and no oversized files in public/.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const MAX_KB = { raster: 300, svg: 50 };
const RASTER = [".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"];

const EXTERNAL_SRC = /(src|srcSet|poster)\s*=\s*\{?\s*["'`](https?:)?\/\//;
const EXTERNAL_CSS_URL = /url\(\s*["']?(https?:)?\/\//;
const EXTERNAL_IN_DATA = /["'`]https?:\/\/[^"'`]+\.(png|jpe?g|webp|avif|gif|svg)(\?[^"'`]*)?["'`]/i;
const RAW_IMG = /<img[\s>]/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const rel = (file) => relative(ROOT, file).replaceAll("\\", "/");
const problems = [];

for (const file of walk(join(ROOT, "src"))) {
  if (![".ts", ".tsx", ".css"].includes(extname(file))) continue;
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      const where = `${rel(file)}:${i + 1}`;
      if (EXTERNAL_SRC.test(line) || EXTERNAL_CSS_URL.test(line) || EXTERNAL_IN_DATA.test(line))
        problems.push(`${where}  external image link: ${line.trim()}`);
      if (file.endsWith(".tsx") && RAW_IMG.test(line))
        problems.push(`${where}  raw <img>, use next/image: ${line.trim()}`);
    });
}

for (const file of walk(join(ROOT, "public"))) {
  const ext = extname(file).toLowerCase();
  const kb = statSync(file).size / 1024;
  if (RASTER.includes(ext) && kb > MAX_KB.raster)
    problems.push(`${rel(file)}  ${kb.toFixed(0)} KB, compress below ${MAX_KB.raster} KB`);
  if (ext === ".svg" && kb > MAX_KB.svg)
    problems.push(`${rel(file)}  ${kb.toFixed(0)} KB, optimize below ${MAX_KB.svg} KB`);
}

if (problems.length) {
  console.error("Image rule violations:\n" + problems.join("\n"));
  process.exit(1);
}
console.log("Images OK.");
