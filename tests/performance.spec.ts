import { expect, test } from "@playwright/test";
import { BUDGETS, type Budget } from "./perf-budgets";
import {
  collectImages,
  installVitals,
  readImagesNow,
  readVitals,
  settle,
  summarize,
  trackTraffic,
  writeReport,
  type Summary,
} from "./utils/metrics";

/**
 * Budget drift is expected whenever the site legitimately grows. Run
 * `PERF_REPORT_ONLY=1 npx playwright test tests/performance.spec.ts` to print and write fresh
 * numbers to `perf-reports/` without failing, then update `perf-budgets.ts`.
 */
const REPORT_ONLY = Boolean(process.env.PERF_REPORT_ONLY);

/** Vercel's analytics endpoints do not exist outside Vercel. */
const IGNORED_URL = /\/_vercel\//;

const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;

function assertBudget(summary: Summary, failedRequests: string[]) {
  const budget: Budget | undefined = BUDGETS[summary.name];
  expect(budget, `no budget defined for "${summary.name}"`).toBeTruthy();
  if (!budget) return;

  expect(failedRequests.filter((url) => !IGNORED_URL.test(url)), "failed requests").toEqual([]);
  expect(summary.optimizerFailures, "image optimizer failures").toEqual([]);
  expect(summary.thirdPartyOrigins, "third-party origins").toEqual(budget.allowedThirdPartyOrigins);
  expect(summary.oversized, "images fetched above 2x their rendered size").toEqual([]);
  expect(
    summary.upscaled,
    "images served below their rendered size: the optimizer never upscales, so the source file must be at least `devicePixels` wide"
  ).toEqual([]);

  expect(
    summary.totalBytes,
    `total ${kb(summary.totalBytes)} vs budget ${kb(budget.totalBytes)}`
  ).toBeLessThan(budget.totalBytes);
  expect(
    summary.byType.js?.bytes ?? 0,
    `js ${kb(summary.byType.js?.bytes ?? 0)} vs budget ${kb(budget.jsBytes)}`
  ).toBeLessThan(budget.jsBytes);
  expect(
    summary.byType.image?.bytes ?? 0,
    `images ${kb(summary.byType.image?.bytes ?? 0)} vs budget ${kb(budget.imageBytes)}`
  ).toBeLessThan(budget.imageBytes);
  expect(summary.requests, "request count").toBeLessThan(budget.requests);
  expect(
    summary.largestImageBytes,
    `largest image ${kb(summary.largestImageBytes)} vs budget ${kb(budget.maxImageBytes)}`
  ).toBeLessThan(budget.maxImageBytes);
  expect(
    summary.largestScriptBytes,
    `largest js chunk ${kb(summary.largestScriptBytes)} vs budget ${kb(budget.maxScriptBytes)}`
  ).toBeLessThan(budget.maxScriptBytes);
  expect(summary.vitals.lcp, `lcp ${Math.round(summary.vitals.lcp)}ms`).toBeLessThan(budget.lcpMs);
  expect(summary.vitals.cls, "cls").toBeLessThan(budget.cls);
  expect(
    summary.longTasksDuringScroll,
    "long tasks while scrolling"
  ).toBeLessThanOrEqual(budget.maxLongTasksDuringScroll);
}

const PROFILES = [
  { name: "desktop-dpr1", path: "/en", width: 1280, height: 800, dpr: 1 },
  { name: "desktop-dpr2", path: "/en", width: 1280, height: 800, dpr: 2 },
  { name: "mobile-dpr2", path: "/en", width: 390, height: 844, dpr: 2 },
  { name: "locale-id-dpr1", path: "/id", width: 1280, height: 800, dpr: 1 },
] as const;

for (const profile of PROFILES) {
  test.describe(profile.name, () => {
    test.use({
      viewport: { width: profile.width, height: profile.height },
      deviceScaleFactor: profile.dpr,
    });

    test(`full page audit of ${profile.path}`, async ({ page }) => {
      await page.addInitScript(installVitals());
      const traffic = await trackTraffic(page);

      await page.goto(profile.path);
      await settle(page);
      const longTasksBeforeScroll = (await readVitals(page)).longTasks.length;

      const images = await collectImages(page);
      await settle(page);
      const vitals = await readVitals(page);

      const summary = writeReport(
        summarize({
          name: profile.name,
          url: page.url(),
          records: traffic.collect(),
          vitals,
          images,
          longTasksDuringScroll: vitals.longTasks.length - longTasksBeforeScroll,
        })
      );

      if (!REPORT_ONLY) assertBudget(summary, traffic.failures);
    });
  });
}

test.describe("project modal", () => {
  test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

  test("slide images respect the size budget", async ({ page }) => {
    await page.addInitScript(installVitals());
    const traffic = await trackTraffic(page);

    await page.goto("/en");
    await settle(page);
    await page.getByRole("button", { name: "Open project details for Suluk" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await settle(page);

    const images = await readImagesNow(page);
    const vitals = await readVitals(page);

    const summary = writeReport(
      summarize({
        name: "modal",
        url: page.url(),
        records: traffic.collect(),
        vitals,
        images,
        longTasksDuringScroll: 0,
      })
    );

    if (!REPORT_ONLY) assertBudget(summary, traffic.failures);
  });
});

/* Headless Chromium does not request favicons, so the page-load audit cannot see them. This guards
   the icon set directly: it used to be the same 1280x698, 197 KB PNG referenced three times. */
test("the icon set stays small", async ({ page, request }) => {
  await page.goto("/en");

  const hrefs = await page
    .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
    .evaluateAll((nodes) => nodes.map((node) => (node as HTMLLinkElement).href));
  expect(hrefs.length, "icon links in the document").toBeGreaterThan(0);

  let total = 0;
  for (const url of hrefs) {
    const response = await request.get(url);
    expect(response.status(), url).toBe(200);
    total += (await response.body()).length;
  }
  expect(total, `icon set totals ${kb(total)} across ${hrefs.length} files`).toBeLessThan(32 * 1024);
});
