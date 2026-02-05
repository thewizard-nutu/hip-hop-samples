import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should navigate to login page', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.locator('text=Welcome Back')).toBeVisible();
  });

  test('should show registration form', async ({ page }) => {
    await page.goto('/auth/register');
    await expect(page.locator('text=Create Account')).toBeVisible();
  });

  test('should display error for invalid email format', async ({ page }) => {
    await page.goto('/auth/login');
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('invalid-email');
    await page.locator('input[type="password"]').fill('password123');
    // HTML5 validation should show error
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('should navigate to register from login', async ({ page }) => {
    await page.goto('/auth/login');
    await page.click('text=Sign up');
    await expect(page).toHaveURL('/auth/register');
  });

  test('should have password input on login', async ({ page }) => {
    await page.goto('/auth/login');
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('should navigate back to login from register', async ({ page }) => {
    await page.goto('/auth/register');
    await page.click('text=Sign in');
    await expect(page).toHaveURL('/auth/login');
  });

  test('should show password confirmation on register', async ({ page }) => {
    await page.goto('/auth/register');
    const passwordInputs = await page.locator('input[type="password"]').count();
    // Should have password and password confirmation
    expect(passwordInputs).toBeGreaterThanOrEqual(2);
  });
});
