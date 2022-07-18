import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 3 : undefined,
  globalSetup: require.resolve('./tests/global-setup'),
  use: {
    baseURL: "https://staging.talentticker.ai/",
    trace: 'on-first-retry',
    // storageState: './tests/state.json',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
};
export default config;
