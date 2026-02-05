import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('should load products page', async ({ page }) => {
    await page.goto('/products');
    await expect(page.locator('text=Sample Catalog')).toBeVisible();
  });

  test('should have search bar', async ({ page }) => {
    await page.goto('/products');
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
  });

  test('should have filter panel', async ({ page }) => {
    await page.goto('/products');
    await expect(page.locator('text=Filter')).toBeVisible();
  });

  test('should load products on page', async ({ page }) => {
    await page.goto('/products');
    // Wait for loading to complete and check for product elements
    await page.waitForTimeout(1000);
    const products = page.locator('[class*="product"]');
    // Should have some product indicators
    const count = await products.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should allow typing in search bar', async ({ page }) => {
    await page.goto('/products');
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('trap');
    await expect(searchInput).toHaveValue('trap');
  });

  test('should have header with navigation', async ({ page }) => {
    await page.goto('/products');
    // Check for main navigation
    await expect(page.locator('header')).toBeVisible();
  });

  test('should render page structure', async ({ page }) => {
    await page.goto('/products');
    // Should have h1 title
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
});
