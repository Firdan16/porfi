import { expect, test } from "@playwright/test";

/** Vercel's analytics/speed-insights endpoints do not exist outside Vercel. */
const IGNORED_URL = /\/_vercel\//;

test.describe("home renders in both locales", () => {
  test("english home", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Firdan Umar");
    await expect(page.locator("#stack")).toBeAttached();
    await expect(page.locator("#experience")).toBeAttached();
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("footer#contact")).toBeAttached();
    await expect(page.getByText("Work in context.")).toBeVisible();
  });

  test("indonesian home", async ({ page }) => {
    await page.goto("/id");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Firdan Umar");
    await expect(page.getByText("Kerja dalam konteks.")).toBeVisible();
    await expect(page.getByText("Karya pilihan / dunia yang berubah")).toBeVisible();
    await expect(page.getByText("Di tempat lain")).toBeVisible();
  });

  test("hero reveal animation settles at full opacity", async ({ page }) => {
    await page.goto("/en");
    await expect
      .poll(async () => page.getByRole("heading", { level: 1 }).evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");
    await expect
      .poll(async () => page.locator("[data-hero-reveal]").first().evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");
  });

  test("tech stack logos all resolve", async ({ page }) => {
    const failedResponses: string[] = [];
    page.on("response", (response) => {
      if (response.url().includes("/logos/") && response.status() >= 400) {
        failedResponses.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto("/en");
    const logos = page.locator("#stack img");
    await expect(logos).toHaveCount(17);
    // Walk the sections rather than each image: WebKit does not reliably trigger lazy loading when
    // images are scrolled into view individually.
    const sections = page.locator("main section");
    const sectionCount = await sections.count();
    for (let index = 0; index < sectionCount; index += 1) {
      await sections.nth(index).scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }
    // Every logo is an SVG, and WebKit reports naturalWidth === 0 for those, so completeness plus
    // the network status are the reliable signals rather than intrinsic dimensions.
    await expect
      .poll(async () =>
        logos.evaluateAll(
          (nodes) => nodes.map((node) => node as HTMLImageElement).filter((img) => !img.complete).length
        )
      )
      .toBe(0);
    expect(failedResponses).toEqual([]);
  });
});

test.describe("navigation", () => {
  test("locale toggle switches to indonesian and back", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Bahasa Indonesia" }).click();
    await expect(page).toHaveURL(/\/id$/);
    await expect(page.getByRole("navigation", { name: "Navigasi utama" })).toBeVisible();

    await page.getByRole("button", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  });

  test("header anchor links scroll to a section", async ({ page }) => {
    await page.goto("/en");
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await nav.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect
      .poll(async () => page.locator("#projects").evaluate((el) => el.getBoundingClientRect().top))
      .toBeLessThan(200);
  });
});

test.describe("project index and modal", () => {
  test("index switches the active project", async ({ page }) => {
    await page.goto("/en");
    const index = page.getByRole("navigation", { name: "Project index" });
    const entries = index.getByRole("button");
    const stageTitle = page.locator("#projects h3").first();

    await expect(entries.first()).toHaveAttribute("aria-pressed", "true");
    const firstTitle = await stageTitle.innerText();

    await entries.nth(1).click();
    await expect(entries.nth(1)).toHaveAttribute("aria-pressed", "true");
    await expect(entries.first()).toHaveAttribute("aria-pressed", "false");
    await expect(stageTitle).not.toHaveText(firstTitle);
    await expect(
      page.getByRole("button", { name: `Open project details for ${await stageTitle.innerText()}` })
    ).toBeVisible();
  });

  test("modal opens, traps focus, closes on escape and restores focus", async ({ page }) => {
    await page.goto("/en");
    const trigger = page.getByRole("button", { name: "Open project details for Suluk" });
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText("Suluk");

    const close = page.getByRole("button", { name: "Close project details" });
    await expect(close).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByRole("button", { name: "Go to image 2" })).toHaveAttribute("aria-current", "true");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    // Focus is handed back to that project's entry in the index, not to the stage trigger.
    const indexEntry = page
      .getByRole("navigation", { name: "Project index" })
      .getByRole("button", { name: /Suluk/ });
    await expect(indexEntry).toBeFocused();
    expect(await page.locator("body").evaluate((el) => el.style.overflow)).toBe("");
  });

  test("modal closes from its close button", async ({ page }) => {
    await page.goto("/id");
    await page.getByRole("button", { name: "Buka detail project Suluk" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.getByRole("button", { name: "Tutup detail project" }).click();
    await expect(dialog).toBeHidden();
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile menu opens, navigates and closes", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeHidden();

    await page.getByRole("button", { name: "Menu" }).click();
    const menu = page.locator("#mobile-navigation");
    await expect(menu).toBeVisible();

    await menu.getByRole("link", { name: "Experience" }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#experience$/);
  });

  test("project stage is reachable on a narrow viewport", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("button", { name: "Open project details for Suluk" })).toBeVisible();
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("content and modal still work", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Firdan Umar");
    await page.getByRole("button", { name: "Open project details for Suluk" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText("Suluk");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});

test.describe("no runtime errors", () => {
  for (const locale of ["en", "id"]) {
    test(`${locale} loads cleanly`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      const failedRequests: string[] = [];

      page.on("console", (message) => {
        if (message.type() !== "error") return;
        const location = message.location().url;
        if (IGNORED_URL.test(location)) return;
        consoleErrors.push(`${message.text()} @ ${location}`);
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("requestfailed", (request) => {
        if (IGNORED_URL.test(request.url())) return;
        failedRequests.push(`${request.url()} (${request.failure()?.errorText ?? "unknown"})`);
      });
      page.on("response", (response) => {
        if (IGNORED_URL.test(response.url())) return;
        if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`);
      });

      await page.goto(`/${locale}`);
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
      await page.waitForTimeout(1500);

      expect(pageErrors, "uncaught page errors").toEqual([]);
      expect(consoleErrors, "console errors").toEqual([]);
      expect(failedRequests, "failed requests").toEqual([]);
    });
  }
});
