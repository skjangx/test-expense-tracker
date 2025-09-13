import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    
    // Tablet
    {
      name: 'tablet',
      use: { ...devices['iPad'] },
    },

    // Visual regression tests
    {
      name: 'visual',
      testDir: './tests/visual',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  // Start local dev server before tests
  webServer: {
    command: 'npm run dev -- --port 3001',
    port: 3001,
    reuseExistingServer: !process.env.CI
  }
})