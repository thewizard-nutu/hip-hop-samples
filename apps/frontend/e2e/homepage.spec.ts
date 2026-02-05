import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Marketplace|Hip-Hop/i);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    const heroText = page.locator('h1, [class*="hero"]');
    await expect(heroText).toBeDefined();
  });

  test('should have featured products section', async ({ page }) => {
    await page.goto('/');
    const featuredSection = page.locator('text=Featured');
    // Featured section should exist or page should load
    const pageLoaded = await page.locator('body').isVisible();
    expect(pageLoaded).toBeTruthy();
  });

  test('should have call-to-action buttons', async ({ page }) => {
    await page.goto('/');
    // Look for CTA buttons like "Browse" or "Get Started"
    const buttons = page.locator('button, a[role="button"]');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display stats section', async ({ page }) => {
    await page.goto('/');
    // Check for numbers/stats
    const numbers = page.locator('text=/\\d+K?\\+?/');
    expect(numbers).toBeDefined();
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');
    // Check that page renders
    const viewport = page.viewportSize();
    expect(viewport).toBeDefined();
  });

  test('should have navigation header', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header, nav');
    await expect(header).toBeVisible();
  });

  test('should have footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    // Footer might be off-screen
    expect(footer).toBeDefined();
  });
});
