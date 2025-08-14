import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  /* Page object models live in tests/pages */
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
