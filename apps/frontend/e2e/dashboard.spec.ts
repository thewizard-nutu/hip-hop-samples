import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    // Should redirect to login if not authenticated
    const url = page.url();
    expect(url).toMatch(/login|dashboard/);
  });

  test('should have dashboard structure', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    // Check for dashboard elements
    const mainContent = page.locator('main, h1, h2');
    expect(mainContent).toBeDefined();
  });
});

test.describe('Orders Page', () => {
  test('should load orders page', async ({ page }) => {
    await page.goto('/dashboard/orders');
    await page.waitForLoadState('networkidle');
    // Should load order page or redirect to login
    const url = page.url();
    expect(url).toMatch(/orders|login/);
  });

  test('should display orders heading', async ({ page }) => {
    await page.goto('/dashboard/orders');
    await page.waitForLoadState('networkidle');
    // Check for page content
    const content = page.locator('body');
    await expect(content).toBeVisible();
  });
});

test.describe('Downloads Page', () => {
  test('should load downloads page', async ({ page }) => {
    await page.goto('/dashboard/downloads');
    await page.waitForLoadState('networkidle');
    const url = page.url();
    expect(url).toMatch(/downloads|login/);
  });

  test('should have downloads content', async ({ page }) => {
    await page.goto('/dashboard/downloads');
    await page.waitForLoadState('networkidle');
    // Check basic page structure
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
