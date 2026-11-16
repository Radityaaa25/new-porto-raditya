import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright-core";

const ROOT = process.cwd();
const BROWSER =
  process.env.CHROMIUM_PATH ??
  "/home/rannn/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome";
const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const OUT = path.resolve(ROOT, process.env.OUT_DIR ?? "docs/qa/before");
const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 },
];

const DEFAULT_ROUTES = ["/", "/work", "/about", "/contact"];
const ROUTES = process.env.ROUTES
  ? process.env.ROUTES.split(",").map((route) => route.trim()).filter(Boolean)
  : DEFAULT_ROUTES;

const slugify = (route) =>
  route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    executablePath: BROWSER,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      colorScheme: "dark",
      reducedMotion: process.env.REDUCED === "1" ? "reduce" : "no-preference",
    });
    await context.addInitScript(() => {
      try {
        window.sessionStorage.setItem("preloader-seen", "1");
        window.localStorage.setItem("theme", "dark");
      } catch {
        void 0;
      }
    });
    for (const route of ROUTES) {
      const page = await context.newPage();
      const response = await page.goto(`${BASE}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
      await page.evaluate(async () => {
        if (document.fonts?.ready) await document.fonts.ready;
      });
      await page.waitForTimeout(2400);
      await page.evaluate(() => {
        document.documentElement.dataset.ready = "true";
        window.dispatchEvent(new Event("portfolio:ready"));
      });
      await page.addStyleTag({
        content: "nextjs-portal{display:none!important}",
      });
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = Math.round(viewport.height * 0.7);
      for (let y = 0; y < height; y += step) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(180);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(900);
      const file = path.join(OUT, `${slugify(route)}-${viewport.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`${response?.status() ?? "---"} ${route} @ ${viewport.name} -> ${file}`);
      await page.close();
    }
    await context.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});