import { test, expect } from '@playwright/test';

test.describe('Downloads & File Access', () => {
  test.beforeEach(async ({ context }) => {
    // Setup authenticated user who has purchased items
    await context.addInitScript(() => {
      localStorage.setItem('token', 'valid-jwt-token');
    });
  });

  test('user can view purchased downloads', async ({ page }) => {
    await page.goto('/downloads');

    // Verify downloads page loaded
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="download-item"]').first()).toBeVisible();
  });

  test('user can download purchased file', async ({ page, context }) => {
    // Listen for download
    const downloadPromise = context.waitForEvent('download');

    await page.goto('/downloads');
    await page.waitForLoadState('networkidle');

    // Click download button
    await page.click('[data-testid="download-item"] >> button:has-text("Download")');

    // Wait for download and verify
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test('user can view download history', async ({ page }) => {
    await page.goto('/downloads');
    await page.waitForLoadState('networkidle');

    // Verify download history is visible
    await expect(page.locator('[data-testid="download-date"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="download-filename"]').first()).toBeVisible();
  });

  test('user can filter downloads', async ({ page }) => {
    await page.goto('/downloads');
    await page.waitForLoadState('networkidle');

    // Filter by date range
    await page.click('[data-testid="filter-toggle"]');
    await page.fill('input[type="date"]', '2024-01-01');

    // Verify filtered results
    const items = page.locator('[data-testid="download-item"]');
    await expect(items.first()).toBeVisible();
  });

  test('user cannot access download without authentication', async ({ page, context }) => {
    // Clear auth token
    await context.clearCookies();
    await page.goto('/downloads', { waitUntil: 'networkidle' });

    // Verify redirected to login
    await expect(page).toHaveURL(/\/login/);
  });

  test('user can preview file before download', async ({ page }) => {
    await page.goto('/downloads');
    await page.waitForLoadState('networkidle');

    // Click preview
    await page.click('[data-testid="download-item"] >> button:has-text("Preview")');

    // Verify preview modal opened
    await expect(page.locator('[data-testid="preview-modal"]')).toBeVisible();
  });

  test('user can view file details', async ({ page }) => {
    await page.goto('/downloads');
    await page.waitForLoadState('networkidle');

    // Click on download item
    await page.click('[data-testid="download-item"]');

    // Verify details are shown
    await expect(page.locator('[data-testid="file-size"]')).toBeVisible();
    await expect(page.locator('[data-testid="file-format"]')).toBeVisible();
    await expect(page.locator('[data-testid="download-date"]')).toBeVisible();
  });
});
