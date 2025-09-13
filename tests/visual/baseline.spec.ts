import { test, expect } from '@playwright/test'
import { ensureLoggedOut } from '../helpers/auth'

// Test breakpoints from CLAUDE.md
const BREAKPOINTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1024, height: 768 }
]

test.describe('Baseline Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure clean state for each test
    await ensureLoggedOut(page)
  })

  BREAKPOINTS.forEach(({ name, width, height }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height })
      })

      test(`login page - ${name}`, async ({ page }) => {
        await page.goto('/login')
        
        // Wait for page to load completely with shorter timeout
        await page.waitForLoadState('domcontentloaded')
        await page.waitForTimeout(1000) // Simple wait for rendering
        
        // Take screenshot of login page
        await expect(page).toHaveScreenshot(`login-${name}.png`)
      })

      test(`signup page - ${name}`, async ({ page }) => {
        await page.goto('/signup')
        
        // Wait for page to load completely with shorter timeout
        await page.waitForLoadState('domcontentloaded')
        await page.waitForTimeout(1000) // Simple wait for rendering
        
        // Take screenshot of signup page
        await expect(page).toHaveScreenshot(`signup-${name}.png`)
      })

      test(`dashboard authenticated - ${name}`, async ({ page }) => {
        // Login as test user with shorter timeout
        await page.goto('/login')
        await page.waitForLoadState('domcontentloaded')
        await page.fill('input[name="email"]', 'test@expense-tracker.com')
        await page.fill('input[name="password"]', 'TestPassword123!')
        
        // Only check rememberMe if it exists
        const rememberMeExists = await page.locator('input[name="rememberMe"]').count()
        if (rememberMeExists > 0) {
          await page.check('input[name="rememberMe"]')
        }
        
        await page.click('button[type="submit"]')
        
        // Wait for redirect to dashboard
        await page.waitForURL('/', { timeout: 10000 })
        await page.waitForTimeout(2000) // Allow dashboard to render
        
        // Take screenshot of authenticated dashboard
        await expect(page).toHaveScreenshot(`dashboard-authenticated-${name}.png`)
      })
    })
  })
})