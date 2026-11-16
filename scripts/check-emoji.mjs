import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "out", "build", "docs/analysis"]);
const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".css",
  ".scss",
  ".html",
  ".svg",
  ".yml",
  ".yaml",
  ".toml",
  ".txt",
  ".sh",
]);

const EMOJI = /[\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2300}-\u{23FF}\u{FE0F}\u{20E3}\u{200D}]/u;

const findings = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(rel) || SKIP_DIRS.has(entry.name)) continue;
      await walk(full);
      continue;
    }
    if (!entry.isFile()) continue;
    if (!TEXT_EXT.has(path.extname(entry.name))) continue;
    const content = await readFile(full, "utf8");
    if (!EMOJI.test(content)) continue;
    const lines = content.split("\n");
    lines.forEach((line, index) => {
      if (!EMOJI.test(line)) return;
      const column = line.search(EMOJI) + 1;
      findings.push({ file: rel, line: index + 1, column });
    });
  }
}

await walk(ROOT);

if (findings.length > 0) {
  console.error("Emoji characters are not allowed in this repository.");
  for (const item of findings) {
    console.error(`  ${item.file}:${item.line}:${item.column}`);
  }
  console.error(`Found ${findings.length} offending line(s).`);
  process.exit(1);
}

console.log("Emoji check passed.");
