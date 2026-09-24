import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Page } from "@playwright/test";

export interface ResourceRecord {
  url: string;
  status: number;
  mimeType: string;
  /** Bytes actually received for this request, headers included (CDP encodedDataLength). */
  bytes: number;
  resourceType: string;
}

export interface ImageRecord {
  src: string;
  alt: string;
  objectFit: string;
  /** Layout box in CSS px. Deliberately not getBoundingClientRect(): the hero portrait is
   *  rotate(-2deg), and the transformed bounding box is ~4% wider than the pixels the image
   *  actually has to fill. */
  boxWidth: number;
  naturalWidth: number;
  /** Width of the variant we asked the optimizer for (`w=` param, or the intrinsic width). */
  requestedWidth: number;
  /** True pixel width of the decoded resource. Differs from `requestedWidth` when the source is
   *  narrower than the variant asked for, because the optimizer never upscales. */
  servedWidth: number;
  /** CSS px the visible image content actually occupies (object-fit aware). */
  effectiveWidth: number;
  devicePixels: number;
  ratio: number;
}

export interface Vitals {
  lcp: number;
  lcpElement: string;
  cls: number;
  ttfb: number;
  load: number;
  longTasks: { start: number; duration: number }[];
}

export interface Summary {
  name: string;
  url: string;
  requests: number;
  totalBytes: number;
  byType: Record<string, { count: number; bytes: number }>;
  topResources: { url: string; resourceType: string; bytes: number }[];
  images: ImageRecord[];
  thirdPartyOrigins: string[];
  optimizerFailures: string[];
  oversized: { src: string; requestedWidth: number; servedWidth: number; devicePixels: number; ratio: number }[];
  upscaled: { src: string; requestedWidth: number; servedWidth: number; devicePixels: number; ratio: number }[];
  largestImageBytes: number;
  largestScriptBytes: number;
  vitals: Vitals;
  longTasksDuringScroll: number;
}

const TYPE_ALIASES: Record<string, string> = {
  document: "html",
  script: "js",
  stylesheet: "css",
  font: "font",
  image: "image",
  media: "media",
  xhr: "fetch",
  fetch: "fetch",
  other: "other",
};

/**
 * Byte-accurate traffic accounting over CDP. `encodedDataLength` is the true on-the-wire size per
 * request, which matters because `next start` compresses responses (and Playwright strips the
 * content-length header), so neither the header nor `response.body()` reflects real transfer size.
 * Chromium-only, which is why the performance spec is pinned to the `perf` project.
 */
export async function trackTraffic(page: Page) {
  const session = await page.context().newCDPSession(page);
  await session.send("Network.enable");

  const meta = new Map<string, { url: string; status: number; mimeType: string; resourceType: string }>();
  const sizes = new Map<string, number>();
  const failures: string[] = [];

  session.on("Network.responseReceived", (event) => {
    meta.set(event.requestId, {
      url: event.response.url,
      status: event.response.status,
      mimeType: event.response.mimeType,
      resourceType: event.type.toLowerCase(),
    });
  });
  session.on("Network.loadingFinished", (event) => {
    sizes.set(event.requestId, event.encodedDataLength);
  });
  session.on("Network.loadingFailed", (event) => {
    failures.push(`${meta.get(event.requestId)?.url ?? event.requestId} (${event.errorText})`);
  });

  const collect = (): ResourceRecord[] => {
    const records: ResourceRecord[] = [];
    for (const [requestId, entry] of meta) {
      if (entry.status >= 300 && entry.status < 400) continue;
      records.push({ ...entry, bytes: sizes.get(requestId) ?? 0 });
    }
    return records;
  };

  return { collect, failures };
}

/** Vitals observers. Pass the result to `page.addInitScript` before navigating. */
export function installVitals() {
  return () => {
    interface VitalsWindow {
      __perf: Vitals & { longTasks: { start: number; duration: number }[] };
    }
    const w = window as unknown as VitalsWindow;
    w.__perf = { lcp: 0, lcpElement: "", cls: 0, ttfb: 0, load: 0, longTasks: [] };

    const describe = (element: Element | null) => {
      if (!element) return "";
      const className =
        typeof element.className === "string"
          ? element.className.split(/\s+/).filter(Boolean).slice(0, 2).join(".")
          : "";
      return (
        element.tagName.toLowerCase() +
        (element.id ? `#${element.id}` : "") +
        (className ? `.${className}` : "")
      );
    };

    interface LcpEntry extends PerformanceEntry {
      element?: Element | null;
      url?: string;
    }
    interface LayoutShiftEntry extends PerformanceEntry {
      value: number;
      hadRecentInput: boolean;
    }

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as LcpEntry[]) {
          if (entry.startTime > w.__perf.lcp) {
            w.__perf.lcp = entry.startTime;
            w.__perf.lcpElement = describe(entry.element ?? null) + (entry.url ? ` [${entry.url}]` : "");
          }
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      /* unsupported engine */
    }

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as LayoutShiftEntry[]) {
          if (!entry.hadRecentInput) w.__perf.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {
      /* unsupported engine */
    }

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          w.__perf.longTasks.push({ start: entry.startTime, duration: entry.duration });
        }
      }).observe({ type: "longtask", buffered: true });
    } catch {
      /* unsupported engine */
    }
  };
}

export async function readVitals(page: Page): Promise<Vitals> {
  return page.evaluate(() => {
    interface VitalsWindow {
      __perf?: Vitals;
    }
    const perf = (window as unknown as VitalsWindow).__perf;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    return {
      lcp: perf?.lcp ?? 0,
      lcpElement: perf?.lcpElement ?? "",
      cls: perf?.cls ?? 0,
      ttfb: nav?.responseStart ?? 0,
      load: nav?.loadEventEnd ?? 0,
      longTasks: perf?.longTasks ?? [],
    };
  });
}

/**
 * Measures each rendered <img>. Two traps worth knowing about:
 *  - `naturalWidth` is density-corrected whenever the browser chose the source through a
 *    `w`-descriptor srcset (the spec divides the intrinsic size by the computed density), so it
 *    reports the `sizes` value rather than real pixels. The requested variant is therefore read
 *    from the `w=` query parameter.
 *  - The optimizer never upscales, so a source narrower than the requested variant is served
 *    capped. The ratio below uses the decoded size for that reason.
 */
export async function readImages(page: Page): Promise<ImageRecord[]> {
  return page.evaluate(async () => {
    const dpr = window.devicePixelRatio;
    const round = (value: number) => Math.round(value * 100) / 100;

    const images = Array.from(document.querySelectorAll("img"));

    return Promise.all(
      images.map(async (img) => {
        // offsetWidth/offsetHeight are transform-independent, unlike getBoundingClientRect().
        const boxWidth = img.offsetWidth;
        const boxHeight = img.offsetHeight;
        const style = getComputedStyle(img);
        const currentSrc = img.currentSrc || img.src;

        const widthParam = new URL(currentSrc, window.location.href).searchParams.get("w");
        const requestedWidth = widthParam ? Number(widthParam) : img.naturalWidth;

        let servedWidth = 0;
        try {
          const bitmap = await createImageBitmap(img);
          servedWidth = bitmap.width;
          bitmap.close();
        } catch {
          servedWidth = 0;
        }

        const naturalAspect = img.naturalHeight > 0 ? img.naturalWidth / img.naturalHeight : 1;
        const intrinsicAspect =
          boxWidth > 0 && boxHeight > 0 && img.naturalWidth > 0 ? naturalAspect : 1;

        let effectiveWidth = boxWidth;
        if (style.objectFit === "contain") {
          effectiveWidth = Math.min(boxWidth, boxHeight * intrinsicAspect);
        } else if (style.objectFit === "cover") {
          effectiveWidth = Math.max(boxWidth, boxHeight * intrinsicAspect);
        }

        const devicePixels = effectiveWidth * dpr;
        const actualWidth = servedWidth > 0 ? servedWidth : requestedWidth;
        return {
          src: currentSrc,
          alt: img.getAttribute("alt") ?? "",
          objectFit: style.objectFit,
          boxWidth: round(boxWidth),
          naturalWidth: img.naturalWidth,
          requestedWidth,
          servedWidth,
          effectiveWidth: round(effectiveWidth),
          devicePixels: round(devicePixels),
          ratio: devicePixels > 0 ? round(actualWidth / devicePixels) : 0,
        };
      })
    );
  });
}

/** Only images that have actually decoded: an unloaded lazy image still advertises the fallback
 * `src` (Next uses the largest device size) but has a zeroed intrinsic size. */
function isLoaded(image: ImageRecord) {
  return image.naturalWidth > 0 && image.boxWidth > 0 && image.requestedWidth > 0;
}

export async function settle(page: Page) {
  await page.waitForLoadState("load");
  try {
    await page.waitForLoadState("networkidle", { timeout: 10_000 });
  } catch {
    /* keep going: analytics beacons may hold the connection open */
  }
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
}

/**
 * Walks the page section by section, collecting image measurements while each section is actually
 * in view. Necessary because `.section-deferred` uses `content-visibility: auto`, which leaves
 * off-screen descendants unlaid-out (a 0x0 box).
 */
export async function collectImages(page: Page): Promise<ImageRecord[]> {
  const collected: ImageRecord[] = [];
  const seen = new Set<string>();

  const capture = async () => {
    for (const image of await readImages(page)) {
      if (!isLoaded(image)) continue;
      const key = `${image.src}@${image.effectiveWidth}`;
      if (seen.has(key)) continue;
      seen.add(key);
      collected.push(image);
    }
  };

  const scrollToTop = () => page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));

  await scrollToTop();
  await page.waitForTimeout(250);
  await capture();

  const sections = page.locator("main section, footer[id]");
  const count = await sections.count();
  for (let index = 0; index < count; index += 1) {
    await sections.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await capture();
  }

  await scrollToTop();
  await page.waitForTimeout(250);
  return collected;
}

export async function readImagesNow(page: Page): Promise<ImageRecord[]> {
  return (await readImages(page)).filter(isLoaded);
}

export function summarize(input: {
  name: string;
  url: string;
  records: ResourceRecord[];
  vitals: Vitals;
  images: ImageRecord[];
  longTasksDuringScroll: number;
}): Summary {
  const byType: Record<string, { count: number; bytes: number }> = {};
  let totalBytes = 0;
  const origins = new Set<string>();
  const optimizerFailures: string[] = [];
  let largestImageBytes = 0;
  let largestScriptBytes = 0;
  const origin = new URL(input.url).origin;

  for (const record of input.records) {
    const bucket = TYPE_ALIASES[record.resourceType] ?? record.resourceType;
    byType[bucket] ??= { count: 0, bytes: 0 };
    byType[bucket].count += 1;
    byType[bucket].bytes += record.bytes;
    totalBytes += record.bytes;

    try {
      const recordOrigin = new URL(record.url).origin;
      // "null" covers data:/blob: URLs, which are not network origins.
      if (recordOrigin !== origin && recordOrigin !== "null") origins.add(recordOrigin);
    } catch {
      /* not a parseable URL */
    }

    if (record.url.includes("/_next/image")) {
      const modern = /image\/(avif|webp)/.test(record.mimeType);
      if (record.status !== 200 || !modern) {
        optimizerFailures.push(`${record.status} ${record.mimeType} ${record.url}`);
      }
    }
    if (bucket === "image" && record.bytes > largestImageBytes) largestImageBytes = record.bytes;
    if (bucket === "js" && record.bytes > largestScriptBytes) largestScriptBytes = record.bytes;
  }

  const oversized: Summary["oversized"] = [];
  const upscaled: Summary["upscaled"] = [];
  for (const image of input.images) {
    if (!isLoaded(image)) continue;
    if (/\.svg(\?|$)/i.test(image.src)) continue;
    if (image.ratio > 2) {
      oversized.push({
        src: image.src,
        requestedWidth: image.requestedWidth,
        servedWidth: image.servedWidth,
        devicePixels: image.devicePixels,
        ratio: image.ratio,
      });
    } else if (image.ratio < 0.9) {
      upscaled.push({
        src: image.src,
        requestedWidth: image.requestedWidth,
        servedWidth: image.servedWidth,
        devicePixels: image.devicePixels,
        ratio: image.ratio,
      });
    }
  }

  return {
    name: input.name,
    url: input.url,
    requests: input.records.length,
    totalBytes,
    byType,
    topResources: [...input.records]
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 12)
      .map((record) => ({ url: record.url, resourceType: record.resourceType, bytes: record.bytes })),
    images: input.images,
    thirdPartyOrigins: [...origins].sort(),
    optimizerFailures,
    oversized,
    upscaled,
    largestImageBytes,
    largestScriptBytes,
    vitals: input.vitals,
    longTasksDuringScroll: input.longTasksDuringScroll,
  };
}

export function writeReport(summary: Summary) {
  const dir = join(process.cwd(), "perf-reports");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${summary.name}.json`), `${JSON.stringify(summary, null, 2)}\n`);

  const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;
  const rows: [string, string][] = [
    ["url", summary.url],
    ["requests", String(summary.requests)],
    ["total", kb(summary.totalBytes)],
    ["js", kb(summary.byType.js?.bytes ?? 0)],
    ["css", kb(summary.byType.css?.bytes ?? 0)],
    ["html", kb(summary.byType.html?.bytes ?? 0)],
    ["fonts", kb(summary.byType.font?.bytes ?? 0)],
    ["images", kb(summary.byType.image?.bytes ?? 0)],
    ["largest image", kb(summary.largestImageBytes)],
    ["largest js chunk", kb(summary.largestScriptBytes)],
    ["third-party origins", summary.thirdPartyOrigins.join(", ") || "none"],
    ["optimizer failures", String(summary.optimizerFailures.length)],
    ["over-fetched images (>2x)", String(summary.oversized.length)],
    ["blurry images (<0.9x)", String(summary.upscaled.length)],
    ["lcp", `${Math.round(summary.vitals.lcp)} ms (${summary.vitals.lcpElement})`],
    ["cls", summary.vitals.cls.toFixed(4)],
    ["long tasks during scroll", String(summary.longTasksDuringScroll)],
  ];
  const width = Math.max(...rows.map(([key]) => key.length));
  console.log(
    `\n  ${summary.name}\n${rows
      .map(([key, value]) => `    ${key.padEnd(width)}  ${value}`)
      .join("\n")}\n`
  );
  for (const image of summary.oversized) {
    console.log(
      `    over-fetched: ${decodeURIComponent(image.src)} asked=${image.requestedWidth} got=${image.servedWidth} needed=${image.devicePixels} ratio=${image.ratio}`
    );
  }
  for (const image of summary.upscaled) {
    console.log(
      `    blurry:       ${decodeURIComponent(image.src)} asked=${image.requestedWidth} got=${image.servedWidth} needed=${image.devicePixels} ratio=${image.ratio}`
    );
  }
  return summary;
}
