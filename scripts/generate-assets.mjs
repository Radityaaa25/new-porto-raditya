import { execFile } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { chromium } from "playwright-core";

const run = promisify(execFile);

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const BROWSER =
  process.env.CHROMIUM_PATH ??
  "/home/rannn/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome";

async function exportIcons() {
  await mkdir(PUBLIC, { recursive: true });
  const jobs = [
    ["app/icon.svg", "-background", "none", "-resize", "192x192", "public/icon-192.png"],
    ["app/icon.svg", "-background", "none", "-resize", "512x512", "public/icon-512.png"],
    [
      "app/icon.svg",
      "-resize",
      "180x180",
      "-background",
      "#0d0e10",
      "-alpha",
      "remove",
      "-alpha",
      "off",
      "public/apple-icon.png",
    ],
    ["app/icon.svg", "-background", "none", "-define", "icon:auto-resize=48,32,16", "public/favicon.ico"],
  ];
  for (const args of jobs) {
    await run("magick", args, { maxBuffer: 1024 * 1024 * 32 });
  }
}

const ogMarkup = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: #0d0e10;
    color: #f2f2ee;
    font-family: "Space Grotesk", sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 64px 72px 56px;
  }
  .grain {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(242,242,238,0.14) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: linear-gradient(105deg, transparent 40%, black 100%);
  }
  .tick { position: absolute; right: 56px; top: 150px; width: 250px; height: 250px; opacity: 0.6; }
  header, footer { position: relative; display: flex; justify-content: space-between; align-items: center; }
  .mono { font-family: "JetBrains Mono", monospace; font-size: 17px; letter-spacing: 0.12em; text-transform: uppercase; color: #8a8f98; }
  .mark { display: flex; align-items: center; gap: 14px; }
  .mark svg { width: 44px; height: 44px; }
  .mark b { font-size: 22px; font-weight: 600; letter-spacing: -0.01em; }
  main { position: relative; display: flex; flex-direction: column; gap: 22px; max-width: 860px; }
  h1 { font-size: 78px; line-height: 0.98; letter-spacing: -0.035em; font-weight: 600; }
  h1 span { color: #c0fe04; }
  p { font-family: "Instrument Sans", sans-serif; font-size: 26px; color: #8a8f98; margin: 0; }
  footer { border-top: 1px solid rgba(242,242,238,0.14); padding-top: 26px; }
  .dot { width: 9px; height: 9px; border-radius: 999px; background: #c0fe04; display: inline-block; margin-right: 10px; }
</style>
</head>
<body>
  <div class="grain"></div>
  <div class="grid"></div>
  <svg class="tick" viewBox="0 0 220 220" fill="none" aria-hidden="true">
    <circle cx="110" cy="110" r="94" stroke="rgba(242,242,238,0.12)" stroke-width="1" />
    <circle cx="110" cy="110" r="60" stroke="rgba(192,254,4,0.34)" stroke-width="1" stroke-dasharray="4 8" />
    <path d="M110 44v132M44 110h132" stroke="rgba(242,242,238,0.14)" stroke-width="1" />
    <circle cx="110" cy="110" r="7" fill="#c0fe04" />
  </svg>
  <header>
    <div class="mark">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="none" stroke="rgba(242,242,238,0.24)" />
        <path d="M18 46V18h13.5c6.6 0 10.5 3.6 10.5 9.3 0 4.4-2.3 7.4-6.1 8.7L44 46h-7.6l-6.3-8.6h-5.4V46H18Zm6.7-14.2h6.2c3 0 4.7-1.6 4.7-4.3 0-2.7-1.7-4.2-4.7-4.2h-6.2v8.5Z" fill="#c0fe04" />
      </svg>
      <b>Raditya Ananda Satria</b>
    </div>
    <span class="mono">Jakarta GMT+7</span>
  </header>
  <main>
    <h1>I design the interface.<br />Then I <span>build</span> it.</h1>
    <p>Web developer and designer working in Next.js and React.</p>
  </main>
  <footer>
    <span class="mono"><span class="dot"></span>Portfolio 2026</span>
    <span class="mono">radityaanandasatria@gmail.com</span>
  </footer>
</body>
</html>`;

async function exportOg() {
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
  try {
    const context = await browser.newContext({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
      colorScheme: "dark",
    });
    const page = await context.newPage();
    await page.setContent(ogMarkup, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(PUBLIC, "og.png"), type: "png" });
    await context.close();
  } finally {
    await browser.close();
  }
}

async function main() {
  await exportIcons();
  await exportOg();
  console.log("assets written: public/{favicon.ico,icon-192.png,icon-512.png,apple-icon.png,og.png}");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});