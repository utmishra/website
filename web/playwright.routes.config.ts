import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/routes',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      EXA_API_KEY: 'test',
      BRAVE_API_KEY: 'test',
    },
  },
});

