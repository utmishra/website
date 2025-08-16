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
    env: {
      TEST_ROUTES: '1',
      EXA_API_KEY: 'exa_dummy_key_1234567890abcdef',
      BRAVE_API_KEY: 'brave_dummy_key_abcdef1234567890',
    },
  },
});
