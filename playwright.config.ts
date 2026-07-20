import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the Gym Tracker (Push Pull Legs) app.
 *
 * NOTE: this is a Next.js app. `npm run dev` serves it on http://localhost:3000
 * (the 5173 port in the brief is the Vite default and does not apply here).
 * Override with the BASE_URL env var if you serve it elsewhere.
 *
 * See https://playwright.dev/docs/test-configuration.
 */
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel for speed. */
  fullyParallel: true,
  /* Per-test timeout. Generous to absorb Next.js dev cold-compiles. */
  timeout: 60_000,
  /* Assertion timeout. Slightly raised for first-hit route compilation. */
  expect: { timeout: 10_000 },
  /* Fail the build on CI if a test.only was left in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only to smooth over transient flakiness. */
  retries: process.env.CI ? 2 : 0,
  /* Limit workers on CI for stability; use the machine default locally. */
  workers: process.env.CI ? 1 : undefined,
  /* Rich HTML report. */
  reporter: [['html', { open: 'never' }], ['list']],
  /* Shared settings for every project below. */
  use: {
    /* Base URL so specs can use relative paths like `page.goto('/')`. */
    baseURL: BASE_URL,
    /* Capture a trace when retrying a failed test, for debugging. */
    trace: 'on-first-retry',
    /* Screenshot only on failure to keep artifacts small. */
    screenshot: 'only-on-failure',
    /* Record video for failed tests. */
    video: 'retain-on-failure',
    /* Generous action/navigation timeouts for the dev server. */
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  /* Cross-browser desktop coverage + mobile viewports. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Mobile viewports — exercises the bottom nav, FAB and touch layouts. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Start the dev server automatically before the tests run. */
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
