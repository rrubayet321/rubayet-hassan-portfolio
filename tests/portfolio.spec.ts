import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const routes = [
  "/",
  "/contact",
  "/projects",
  "/projects/channelspy",
  "/projects/skiptheterms",
  "/projects/ummahspeaks",
  "/projects/cmat",
  "/analysis",
  "/analysis/youtube-analytics-gap",
  "/analysis/llm-chrome-extension-ux",
  "/analysis/llm-cost-reality",
  "/photos",
  "/resume",
];
async function settled(page: Page) {
  await page.locator("h1").waitFor();
  await page.evaluate(() => document.fonts.ready);
}
async function overflow(page: Page) {
  const sizes = await page.evaluate(() => ({
    width: window.innerWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(
    sizes.content,
    page.url() + " at " + sizes.width + "px",
  ).toBeLessThanOrEqual(sizes.width + 1);
}
async function revealAll(page: Page) {
  // Real scrolling exercises once-only reveals before full-page screenshots and contrast checks.
  await page.evaluate(async () => {
    for (
      let y = 0;
      y < document.body.scrollHeight;
      y += window.innerHeight * 0.8
    ) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
}
test("every public route has usable content and no runtime or hydration errors", async ({
  page,
}) => {
  const errors: string[] = [];
  const broken: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) broken.push(response.url());
  });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await settled(page);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeVisible();
    await overflow(page);
  }
  expect(errors).toEqual([]);
  expect(broken).toEqual([]);
});
test("responsive pages work at phone, tablet, desktop, and landscape sizes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const dimensions = [
    [320, 568],
    [375, 812],
    [390, 844],
    [768, 1024],
    [1024, 768],
    [1440, 1000],
    [844, 390],
  ];
  for (const [width, height] of dimensions) {
    await page.setViewportSize({ width, height });
    for (const route of [
      "/",
      "/contact",
      "/projects",
      "/projects/cmat",
      "/analysis/llm-chrome-extension-ux",
      "/photos",
      "/resume",
    ]) {
      await page.goto(route);
      await settled(page);
      await overflow(page);
      const nav = page.getByRole("navigation", { name: "Main navigation" });
      for (const link of await nav.getByRole("link").all()) {
        await expect(link).toBeVisible();
        const box = await link.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
        expect(box!.width).toBeGreaterThanOrEqual(44);
      }
    }
    await page.goto("/projects");
    const columns = await page
      .locator(".project-grid")
      .first()
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      );
    expect(columns).toBe(width >= 768 ? 2 : 1);
    await page.goto("/photos");
    await page.locator(".photo-card a").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.width).toBeLessThanOrEqual(width);
    expect(box!.height).toBeLessThanOrEqual(height);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  }
});
test("redirects, anchor offsets, history, and unknown URLs", async ({
  page,
  request,
}) => {
  for (const [path, target] of [["/about", "/#about"]]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(target);
    await page.goto(path);
    await expect(page).toHaveURL(new RegExp(target.replace("#", "#") + "$"));
    const box = await page.locator(target.slice(1)).boundingBox();
    const header = await page.locator(".site-header").boundingBox();
    expect(box!.y).toBeGreaterThanOrEqual(header!.height - 2);
  }
  for (const path of [
    "/unknown-page",
    "/projects/unknown",
    "/analysis/unknown",
  ]) {
    expect((await page.goto(path))?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Nothing",
    );
  }
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await page
    .getByRole("link", { name: "Read C-MAT research", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects\/cmat$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/projects$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/projects\/cmat$/);
  for (let i = 0; i < 2; i++) {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Contact" })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Notes", exact: true })
      .click();
    await expect(page).toHaveURL(/\/analysis$/);
  }
});
test("native photo dialog supports keyboard bounds, dismissal, focus restoration, and scroll restoration", async ({
  page,
}) => {
  await page.goto("/photos");
  const opener = page.getByRole("link", { name: /^Enlarge photo:/ }).first();
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close photo" }),
  ).toBeFocused();
  await expect(
    dialog.getByRole("button", { name: "Previous photo" }),
  ).toBeDisabled();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".viewer-navigation")).toContainText("2 / 6");
  for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".viewer-navigation")).toContainText("6 / 6");
  await expect(
    dialog.getByRole("button", { name: "Next photo" }),
  ).toBeDisabled();
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.locator(".viewer-navigation")).toContainText("5 / 6");
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        document.querySelector("dialog")?.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  // Native close events can be queued after focus restoration in Chromium.
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .not.toBe("hidden");
  await opener.click();
  await dialog.getByRole("button", { name: "Close photo" }).click();
  await expect(opener).toBeFocused();
});
test("email feedback reports success only after a successful write and handles denial", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new DOMException("Denied", "NotAllowedError");
        },
      },
    });
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Couldn’t copy");
  await expect(page.getByRole("status")).not.toContainText(
    "Copied to clipboard",
  );
  await expect(
    page.getByRole("link", { name: "rrubayet321@gmail.com" }),
  ).toHaveAttribute("href", "mailto:rrubayet321@gmail.com");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          sessionStorage.setItem("copied-email", text);
        },
      },
    });
  });
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Copied to clipboard");
  expect(
    await page.evaluate(() => sessionStorage.getItem("copied-email")),
  ).toBe("rrubayet321@gmail.com");
});
test("no-JavaScript pages keep core content, navigation, images, and direct actions", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  const base = test.info().project.use.baseURL || "http://127.0.0.1:3001";
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    await overflow(page);
  }
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: "Building StorageAtlas" }),
  ).toBeVisible();
  await page.goto(base + "/contact", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".email-link")).toHaveAttribute(
    "href",
    "mailto:rrubayet321@gmail.com",
  );
  await page.goto(base + "/photos", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".photo-card a").first()).toHaveAttribute(
    "href",
    "/photos/01.png",
  );
  await expect(page.locator("dialog")).not.toBeVisible();
  await context.close();
});
test("reduced motion disables typography, pointer motion, and reading progress", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await settled(page);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  expect(
    await page
      .locator(".creation-word")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
  for (const element of await page
    .locator(".creation-glyph, .creation-echo, .creation-trace, .creation-seal")
    .all()) {
    expect(
      await element.evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
  }
  await expect(page.locator(".header-progress")).not.toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
  expect(
    await page
      .locator(".hero h1")
      .evaluate((el) => getComputedStyle(el.parentElement!).opacity),
  ).toBe("1");
});

test("unavailable typography keeps its meaning readable and photos retain fallbacks", async ({
  page,
}) => {
  await page.route(/\/_next\/static\/media\/.*\.(woff2?|ttf)/, (route) =>
    route.abort(),
  );
  await page.goto("/");
  await expect(page.locator(".creation-caption")).toContainText("creation");
  await expect(page.locator(".hero-value")).toContainText("grow revenue");
  await expect(page.locator(".creation-art")).toBeVisible();
  await overflow(page);
  await page.route(/\/_next\/image\?url=.*photos.*01/, (route) =>
    route.abort(),
  );
  await page.goto("/photos");
  await expect(page.locator(".photo-fallback").first()).toBeVisible();
  await page.locator(".photo-card a").first().click();
  await expect(
    page.getByRole("dialog").locator(".photo-fallback"),
  ).toBeVisible();
});

test("touch layouts keep project descriptions and independent links visible", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3001/projects");
  const cards = page.locator(".project-card");
  expect(await cards.count()).toBe(4);
  for (const card of await cards.all()) {
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator(".project-summary")).toBeVisible();
    await expect(card.locator(".project-actions")).toBeVisible();
    expect(await card.locator("a a").count()).toBe(0);
    expect(await card.locator("a[href='#']").count()).toBe(0);
  }
  const research = cards.last();
  expect(await research.locator(".project-actions a").count()).toBe(1);
  await context.close();
});
test("resume direct links and download work independently of the viewer", async ({
  page,
  request,
}) => {
  const pdf = await request.get("/Rubayet_Hassan_Resume.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  await page.goto("/resume");
  await expect(page.getByRole("link", { name: "Open PDF" })).toHaveAttribute(
    "href",
    "/Rubayet_Hassan_Resume.pdf",
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download PDF" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Rubayet_Hassan_Resume.pdf");
  expect(await download.failure()).toBeNull();
});
test("all internal links and metadata endpoints resolve", async ({
  page,
  request,
}) => {
  const paths = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((elements) =>
        elements
          .map((el) => el.getAttribute("href"))
          .filter((href): href is string => !!href?.startsWith("/")),
      );
    hrefs.forEach((href) => paths.add(href.split("#")[0] || "/"));
  }
  for (const path of paths)
    expect((await request.get(path)).status(), path).toBeLessThan(400);
  for (const path of [
    "/sitemap.xml",
    "/robots.txt",
    "/icon.svg",
    "/favicon.ico",
    "/opengraph-image",
  ])
    expect((await request.get(path)).status(), path).toBe(200);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/projects/cmat");
  expect(sitemap).not.toContain("/resume");
});
test("keyboard skip link and visible focus", async ({ page, browserName }) => {
  await page.goto("/");
  // macOS WebKit follows Safari's link-navigation preference; Option+Tab visits links.
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  expect(
    await skip.evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe("none");
  await page.keyboard.press("Enter");
  expect(await page.evaluate(() => document.activeElement?.id)).toBe(
    "main-content",
  );
});
test("accessible home, work, case studies, notes, photos, and dialog", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "/",
    "/contact",
    "/projects",
    "/projects/cmat",
    "/analysis/llm-chrome-extension-ux",
    "/photos",
    "/resume",
    "/unknown-page",
  ]) {
    await page.goto(route);
    await settled(page);
    await revealAll(page);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
  await page.goto("/photos");
  await page.locator(".photo-card a").first().click();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});
test("slow fonts keep core content readable and the typography frame stable", async ({
  page,
}) => {
  await page.route(
    /\/_next\/static\/media\/.*\.(woff2?|ttf)/,
    async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.continue();
    },
  );
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".hero-value")).toBeVisible();
  const art = page.locator(".creation-art");
  const before = await art.boundingBox();
  await page.evaluate(() => document.fonts.ready);
  const after = await art.boundingBox();
  expect(before!.height).toBeCloseTo(after!.height, 0);
  await overflow(page);
});

test("long titles wrap and pointer motion stays bounded and resets", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/projects");
  await page
    .locator(".project-title a")
    .first()
    .evaluate((el) => {
      el.textContent =
        "An exceptionally long project title with a VeryLongUnbrokenIdentifierToCheckWrapping";
    });
  await overflow(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const art = page.locator(".creation-art");
  const box = await art.boundingBox();
  await page.mouse.move(box!.x + box!.width * 0.95, box!.y + box!.height * 0.8);
  await expect
    .poll(
      async () =>
        await art.evaluate(
          (el) =>
            parseFloat(getComputedStyle(el).getPropertyValue("--word-x")) || 0,
        ),
    )
    .toBeGreaterThan(0);
  for (const axis of ["--word-x", "--word-y"]) {
    const amount = await art.evaluate(
      (el, property) =>
        parseFloat(getComputedStyle(el).getPropertyValue(property)) || 0,
      axis,
    );
    expect(Math.abs(amount)).toBeLessThanOrEqual(8);
  }
  await page.mouse.move(0, 0);
  await expect
    .poll(
      async () =>
        await art.evaluate((el) =>
          getComputedStyle(el).getPropertyValue("--word-x"),
        ),
    )
    .toBe("0px");
  await page.mouse.move(box!.x + box!.width * 0.95, box!.y + box!.height * 0.8);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(
      async () =>
        await art.evaluate((el) =>
          getComputedStyle(el).getPropertyValue("--word-x"),
        ),
    )
    .toBe("0px");
});

test("business positioning, linked employer, direct GitHub projects, and finite motion", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await settled(page);
  await expect(page.locator(".hero-description")).toContainText(
    "Less busywork.",
  );
  await expect(page.locator(".hero-value")).toContainText(
    "software and AI products",
  );
  await expect(page.locator(".hero-value")).toContainText("grow revenue");
  await expect(
    page.getByRole("link", { name: "Building StorageAtlas" }),
  ).toHaveAttribute("href", "https://storageatlas.co/");
  await expect(page.locator(".creation-art")).toHaveAccessibleName(
    /Japanese word for creation/,
  );
  for (const el of await page
    .locator(".creation-glyph, .creation-echo, .creation-trace, .creation-seal")
    .all()) {
    const timing = await el.evaluate((el) => {
      const css = getComputedStyle(el);
      return {
        count: css.animationIterationCount,
        duration: parseFloat(css.animationDuration),
        delay: parseFloat(css.animationDelay),
      };
    });
    expect(timing.count).toBe("1");
    expect(timing.duration + timing.delay).toBeLessThanOrEqual(5);
  }
  await page.goto("/projects");
  const github = ["channelspy", "skiptheterms", "ummahspeaks"];
  for (const id of github) {
    const link = page.locator(".project-" + id + " .project-title a");
    await expect(link).toHaveAttribute(
      "href",
      "https://github.com/rrubayet321/" + id,
    );
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(page.locator(".project-cmat .project-title a")).toHaveAttribute(
    "href",
    "/projects/cmat",
  );
  await expect(page.locator(".project-card img")).toHaveCount(0);
  await context.route("https://github.com/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<title>GitHub destination check</title>",
    }),
  );
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "ChannelSpy on GitHub" }).click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL("https://github.com/rrubayet321/channelspy");
  await popup.close();
  for (const id of github) {
    await page.goto("/projects/" + id);
    await expect(page.locator("main img")).toHaveCount(0);
  }
});

test("contact details live only on the dedicated page and all contact navigation agrees", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('a[href*="linkedin.com"]')).toHaveCount(0);
  await expect(page.locator(".copy-button")).toHaveCount(0);
  const headerContact = page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Contact" });
  await expect(headerContact).toHaveAttribute("href", "/contact");
  const footerContact = page
    .getByRole("navigation", { name: "Footer navigation" })
    .getByRole("link", { name: "Contact" });
  await expect(footerContact).toHaveAttribute("href", "/contact");
  await page
    .locator(".home-contact-link")
    .getByRole("link", { name: "Let’s talk" })
    .click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Copy email address" }),
  ).toHaveCount(1);
  await expect(headerContact).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveCount(1);
  await expect(
    page
      .getByRole("navigation", { name: "Footer navigation" })
      .getByRole("link", { name: "LinkedIn" }),
  ).toHaveCount(0);
  const response = await request.get("/contact", { maxRedirects: 0 });
  expect(response.status()).toBe(200);
  expect(response.headers().location).toBeUndefined();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://rubayethassan.com/contact",
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/contact");
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  // Previously shared homepage anchors still land on the compact route into Contact.
  await page.goto("/#contact");
  await expect(page.locator(".home-contact-link")).toBeVisible();
  await page
    .locator(".home-contact-link")
    .getByRole("link", { name: "Let’s talk" })
    .click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("desktop and mobile visual delivery", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Delivery captures use Chromium; layouts are verified in all engines.",
  );
  await fs.mkdir("artifacts/screenshots", { recursive: true });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ] as const) {
    await page.setViewportSize({ width, height });
    for (const [slug, route] of [
      ["home", "/"],
      ["contact", "/contact"],
      ["work", "/projects"],
      ["research", "/projects/cmat"],
      ["notes", "/analysis"],
      ["photos", "/photos"],
    ] as const) {
      await page.goto(route);
      await settled(page);
      await revealAll(page);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: "artifacts/screenshots/" + name + "-" + slug + ".png",
        fullPage: true,
      });
      if (slug === "home") {
        await page.screenshot({
          path: "artifacts/screenshots/" + name + "-hero.png",
        });
        await page.locator(".home-contact-link").scrollIntoViewIfNeeded();
        await page.screenshot({
          path: "artifacts/screenshots/" + name + "-home-end.png",
        });
      }
      if (slug === "photos") {
        await page.locator(".photo-card a").first().click();
        await page.waitForLoadState("networkidle");
        await page.screenshot({
          path: "artifacts/screenshots/" + name + "-photo-dialog.png",
        });
      }
    }
  }
});
