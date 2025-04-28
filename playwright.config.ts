import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://apply.mykaleidoscope.com',
    trace: 'on',
  },
  testDir: './e2e',
  timeout: 120000,
  fullyParallel: true,
  retries: 2,
  reporter: 'html',
  expect: {
    timeout: 30000, 
  },
});
