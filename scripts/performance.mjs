import fs from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "playwright";
const base = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3001";
const directory = path.resolve("artifacts/lighthouse");
await fs.mkdir(directory, { recursive: true });
const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless=new"],
});
const summary = [];
try {
  for (const [name, route] of [
    ["home", "/"],
    ["work", "/projects"],
    ["photos", "/photos"],
  ]) {
    const result = await lighthouse(base + route, {
      port: chrome.port,
      output: ["html", "json"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    if (!result) throw new Error("Lighthouse did not return a report");
    await fs.writeFile(
      path.join(directory, name + "-mobile.html"),
      result.report[0],
    );
    await fs.writeFile(
      path.join(directory, name + "-mobile.json"),
      result.report[1],
    );
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    );
    const metrics = Object.fromEntries(
      [
        "first-contentful-paint",
        "largest-contentful-paint",
        "total-blocking-time",
        "cumulative-layout-shift",
        "speed-index",
      ].map((key) => [key, result.lhr.audits[key].displayValue]),
    );
    summary.push({ route, scores, metrics });
    console.log(JSON.stringify(summary.at(-1)));
  }
  await fs.writeFile(
    path.join(directory, "summary.json"),
    JSON.stringify(summary, null, 2),
  );
} finally {
  await chrome.kill();
}
