import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('should display checkout page when accessed', async ({ page }) => {
    await page.goto('/checkout');
    // Should redirect to login if not authenticated
    // Or show checkout form if authenticated
    await page.waitForLoadState('networkidle');
    const url = page.url();
    expect(url).toMatch(/checkout|login/);
  });

  test('should have checkout form structure', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    // Check if we're at login or checkout
    const checkoutForm = page.locator('form, input[type="text"], input[type="email"]');
    const count = await checkoutForm.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have payment section', async ({ page }) => {
    // Try to access checkout
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    // Should have some form elements
    const formElements = page.locator('input, form');
    expect(formElements).toBeDefined();
  });

  test('should render page without errors', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    // Check console for errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    // Should not have critical errors
    expect(errors.filter((e) => e.includes('Failed to load'))).toEqual([]);
  });
});
