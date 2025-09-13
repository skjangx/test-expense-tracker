import { Page } from '@playwright/test'

// Test credentials from CLAUDE.md and implementation.md
export const TEST_USER = {
  email: 'test@expense-tracker.com',
  password: 'TestPassword123!'
}

export async function loginAsTestUser(page: Page) {
  await page.goto('/login')
  await page.fill('input[name="email"]', TEST_USER.email)
  await page.fill('input[name="password"]', TEST_USER.password)
  
  // Check remember me to persist session
  await page.check('input[name="rememberMe"]')
  
  await page.click('button[type="submit"]')
  await page.waitForURL('/', { timeout: 5000 })
}

export async function ensureLoggedOut(page: Page) {
  // Clear all cookies and storage to ensure clean state
  await page.context().clearCookies()
  
  // Try to clear storage, but handle cases where it's not accessible
  try {
    await page.evaluate(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.clear()
      }
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear()
      }
    })
  } catch {
    // Ignore storage errors (may not be accessible on some pages)
    console.log('Note: Could not clear storage, continuing with test')
  }
}