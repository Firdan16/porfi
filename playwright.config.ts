import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },

  /* Production build, not dev: dev-mode timings are meaningless for performance. */
  webServer: {
    command: 'npm run build && npm run start',
    url: `${baseURL}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },

  projects: [
    {
      name: 'chromium',
      testMatch: /functional\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: /functional\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: /functional\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      /* Chromium only: it is the only engine here with a reliable LCP API, and its
         metrics are the ones we set budgets against. */
      name: 'perf',
      testMatch: /performance\.spec\.ts/,
      fullyParallel: false,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
