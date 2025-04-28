import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://apply.mykaleidoscope.com', // add your URL here
    trace: 'on',
  },
  testDir: './e2e',
  timeout: 120000,
  fullyParallel: true,
  retries: 0,
  reporter: 'html',
  expect: {
    timeout: 30000,  // <-- Now all expect.toBeVisible() waits 30 seconds
  },
});
