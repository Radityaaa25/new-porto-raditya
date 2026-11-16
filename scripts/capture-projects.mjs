import { execFile } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { chromium } from "playwright-core";

const run = promisify(execFile);

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public/media/projects");
const RAW = path.join(ROOT, ".cache/captures");
const BROWSER =
  process.env.CHROMIUM_PATH ??
  "/home/rannn/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome";
const CAPTURED_AT = new Date().toISOString().slice(0, 10);

const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
const PROJECTS = [
  { slug: "clarise", url: "https://clarise.my.id" },
  { slug: "safetrack-depin", url: "https://safetrack-depin.vercel.app" },
  { slug: "vascode", url: "https://vascode.vercel.app" },
  { slug: "pentas-seni", url: "https://pentas-seni-tk-v2.vercel.app" },
  { slug: "nana-bites", url: "https://nana-bites.vercel.app" },
  { slug: "joy-reminder", url: "https://joy-reminder.vercel.app" },
];

const DESKTOP = { width: 1600, height: 1000 };
const MOBILE = { width: 390, height: 844 };

const HIDE_CHROME = `
  html { scrollbar-width: none !important; }
  ::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
  * { caret-color: transparent !important; }
`;

async function settle(page) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(2500);
}

async function open(context, viewport, url) {
  const page = await context.newPage();
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  let response = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      break;
    } catch (error) {
      if (attempt === 3) throw error;
      await page.waitForTimeout(2000);
    }
  }
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await page.addStyleTag({ content: HIDE_CHROME });
  await settle(page);
  return { page, status: response?.status() ?? null };
}

async function scrollTo(page, y) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(1200);
}

async function captureDesktop(browser, project) {
  const context = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 1 });
  const { page, status } = await open(context, DESKTOP, project.url);
  const dir = path.join(RAW, project.slug);
  await mkdir(dir, { recursive: true });

  await page.screenshot({ path: path.join(dir, "cover.png") });

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const scrollable = height > DESKTOP.height + 200;

  if (scrollable) {
    await scrollTo(page, Math.min(900, height));
    await page.screenshot({ path: path.join(dir, "detail-01.png") });

    await scrollTo(page, Math.max(0, Math.min(height * 0.62, height - DESKTOP.height)));
    await page.screenshot({ path: path.join(dir, "detail-02.png") });
  }

  const finalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await context.close();
  return { slug: project.slug, url: project.url, status, height: finalHeight, scrollable };
}

async function captureMobile(browser, project) {
  const context = await browser.newContext({ viewport: MOBILE, deviceScaleFactor: 2 });
  const { page, status } = await open(context, MOBILE, project.url);
  const dir = path.join(RAW, project.slug);
  await mkdir(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, "mobile.png") });
  await context.close();
  return { status };
}

async function optimize(source, destination, width, format, quality) {
  const args = [source, "-resize", `${width}x`, "-strip"];
  if (format === "avif") {
    args.push("-quality", String(quality));
  } else {
    args.push("-quality", String(quality));
  }
  args.push(destination);
  await run("magick", args, { maxBuffer: 1024 * 1024 * 64 });
}

async function main() {
  await mkdir(RAW, { recursive: true });
  const browser = await chromium.launch({
    executablePath: BROWSER,
    args: [
      "--no-sandbox",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--ignore-gpu-blocklist",
      "--disable-dev-shm-usage",
    ],
  });

  const manifest = [];

  const selected = ONLY ? PROJECTS.filter((project) => ONLY.includes(project.slug)) : PROJECTS;
  for (const project of selected) {
    process.stdout.write(`${project.slug} ... `);
    try {
      const desktop = await captureDesktop(browser, project);
      const mobile = await captureMobile(browser, project);
      const dir = path.join(OUT, project.slug);
      await mkdir(dir, { recursive: true });

      const source = path.join(RAW, project.slug);
      const outputs = [
        { file: "cover", width: 1600, q: { avif: 50, webp: 80 } },
        { file: "cover-800", width: 800, q: { avif: 52, webp: 82 }, from: "cover" },
        { file: "mobile", width: 780, q: { avif: 52, webp: 82 } },
      ];

      if (desktop.scrollable) {
        outputs.push(
          { file: "detail-01", width: 1440, q: { avif: 52, webp: 82 } },
          { file: "detail-02", width: 1440, q: { avif: 52, webp: 80 } },
        );
      }

      for (const output of outputs) {
        const base = path.join(source, `${output.from ?? output.file}.png`);
        for (const format of ["avif", "webp"]) {
          await optimize(
            base,
            path.join(dir, `${output.file}.${format}`),
            output.width,
            format,
            output.q[format],
          );
        }
      }

      manifest.push({
        slug: project.slug,
        url: project.url,
        status: desktop.status,
        capturedAt: CAPTURED_AT,
        cover: { width: 1600, height: 1000 },
        detail: desktop.scrollable ? { width: 1440, height: 900 } : null,
        mobile: { width: 390, height: 844 },
        height: desktop.height,
      });
      console.log(`ok (${desktop.status}, ${desktop.height}px)`);
    } catch (error) {
      console.log(`failed: ${error.message}`);
      manifest.push({ slug: project.slug, url: project.url, error: error.message });
    }
  }

  await browser.close();
  await rm(RAW, { recursive: true, force: true });
  const manifestPath = path.join(ROOT, "public/media/projects/manifest.json");
  const previous = await readFile(manifestPath, "utf8")
    .then((text) => JSON.parse(text))
    .catch(() => []);
  const merged = new Map(previous.map((entry) => [entry.slug, entry]));
  for (const entry of manifest) merged.set(entry.slug, entry);
  await writeFile(
    manifestPath,
    `${JSON.stringify(PROJECTS.map((project) => merged.get(project.slug)).filter(Boolean), null, 2)}\n`,
  );

  const sizes = {};
  for (const entry of manifest) {
    if (entry.error) continue;
    const dir = path.join(OUT, entry.slug);
    sizes[entry.slug] = {};
    const names = ["cover.avif", "cover.webp", "mobile.avif"];
    if (entry.detail) names.push("detail-01.avif", "detail-02.avif");
    for (const name of names) {
      const stat = await readFile(path.join(dir, name)).then((buffer) => buffer.byteLength);
      sizes[entry.slug][name] = stat;
    }
  }
  console.log(JSON.stringify(sizes, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
