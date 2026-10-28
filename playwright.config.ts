import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  webServer: { command: 'npx vite preview --port 4173', port: 4173, reuseExistingServer: true },
  use: {
    baseURL: 'http://localhost:4173',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined },
  },
  projects: [{ name: 'mobile', use: { ...devices['Pixel 7'] } }],
})
