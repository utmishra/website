import { defineConfig } from '@playwright/test'

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
      EXA_API_KEY: 'exa_dummy_key_1234567890abcdef',
      BRAVE_API_KEY: 'brave_dummy_key_abcdef1234567890',
    },
  },
})
