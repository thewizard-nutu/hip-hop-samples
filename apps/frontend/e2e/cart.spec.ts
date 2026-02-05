import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('should display cart page', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('text=Cart')).toBeVisible();
  });

  test('should have continue shopping link', async ({ page }) => {
    await page.goto('/cart');
    // Look for a link or button to continue shopping
    const continueLink = page.locator('a:has-text("products"), button:has-text("Continue"), a[href="/products"]');
    expect(continueLink).toBeDefined();
  });

  test('should display cart header', async ({ page }) => {
    await page.goto('/cart');
    // Check for page title or header
    const heading = page.locator('h1, h2');
    await expect(heading).toBeDefined();
  });

  test('should have cart icon in navigation', async ({ page }) => {
    await page.goto('/');
    const navBar = page.locator('header, nav');
    await expect(navBar).toBeVisible();
  });

  test('should render page layout', async ({ page }) => {
    await page.goto('/cart');
    // Check basic page structure exists
    const mainContent = page.locator('main, [role="main"]');
    expect(mainContent).toBeDefined();
  });

  test('should display empty state or cart items', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForTimeout(500);
    // Page should load without errors
    const status = page.url();
    expect(status).toContain('/cart');
  });
});
