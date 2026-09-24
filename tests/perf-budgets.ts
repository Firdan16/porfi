/**
 * Ceilings for the performance gate, each set ~30-45% above the value measured on 2026-09-24 so a
 * real regression fails while content changes do not. Refresh with:
 *
 *   PERF_REPORT_ONLY=1 npx playwright test tests/performance.spec.ts
 *
 * which prints the numbers and writes them to `perf-reports/`.
 */
export interface Budget {
  /** Total transferred bytes for the whole visit (load + full scroll). */
  totalBytes: number;
  jsBytes: number;
  imageBytes: number;
  requests: number;
  /** No single image may transfer more than this. The hero portrait is the heaviest at ~48 KB. */
  maxImageBytes: number;
  maxScriptBytes: number;
  /** Soft ceilings: localhost timings are noisy, the byte budgets carry the real weight. */
  lcpMs: number;
  cls: number;
  maxLongTasksDuringScroll: number;
  /** Every request must be same-origin; the page ships no third-party assets. */
  allowedThirdPartyOrigins: string[];
}

const SHARED = {
  jsBytes: 260_000,
  maxScriptBytes: 90_000,
  lcpMs: 2500,
  cls: 0.1,
  maxLongTasksDuringScroll: 2,
  allowedThirdPartyOrigins: [] as string[],
};

export const BUDGETS: Record<string, Budget> = {
  "desktop-dpr1": {
    ...SHARED,
    totalBytes: 560_000,
    imageBytes: 135_000,
    requests: 55,
    maxImageBytes: 60_000,
  },
  "desktop-dpr2": {
    ...SHARED,
    totalBytes: 620_000,
    imageBytes: 180_000,
    requests: 55,
    maxImageBytes: 70_000,
  },
  "mobile-dpr2": {
    ...SHARED,
    totalBytes: 600_000,
    imageBytes: 150_000,
    requests: 56,
    maxImageBytes: 60_000,
  },
  "locale-id-dpr1": {
    ...SHARED,
    totalBytes: 560_000,
    imageBytes: 135_000,
    requests: 55,
    maxImageBytes: 60_000,
  },
  modal: {
    ...SHARED,
    totalBytes: 900_000,
    imageBytes: 450_000,
    requests: 65,
    maxImageBytes: 80_000,
  },
};
