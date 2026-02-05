import { test, expect } from '@playwright/test';
import { testUsers } from '../fixtures/users.fixture';

test.describe('Authentication Flow', () => {
  test('user can register with valid credentials', async ({ page }) => {
    await page.goto('/register');

    // Fill registration form
    await page.fill('input[type="email"]', testUsers.newUser.email);
    await page.fill('input[name="name"]', testUsers.newUser.name);
    await page.fill('input[name="password"]', testUsers.newUser.password);
    await page.fill('input[name="confirmPassword"]', testUsers.newUser.confirmPassword);

    // Submit form
    await page.click('button:has-text("Create Account")');

    // Verify success
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('registration fails with invalid email', async ({ page }) => {
    await page.goto('/register');

    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="password"]', testUsers.newUser.password);
    await page.fill('input[name="confirmPassword"]', testUsers.newUser.confirmPassword);

    await page.click('button:has-text("Create Account")');

    await expect(page.locator('text=Invalid email address')).toBeVisible();
  });

  test('registration fails when passwords do not match', async ({ page }) => {
    await page.goto('/register');

    await page.fill('input[type="email"]', testUsers.newUser.email);
    await page.fill('input[name="name"]', testUsers.newUser.name);
    await page.fill('input[name="password"]', 'Password123!');
    await page.fill('input[name="confirmPassword"]', 'DifferentPass123!');

    await page.click('button:has-text("Create Account")');

    await expect(page.locator('text=Passwords do not match')).toBeVisible();
  });

  test('user can login with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', testUsers.validUser.email);
    await page.fill('input[type="password"]', testUsers.validUser.password);

    await page.click('button:has-text("Login")');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('login fails with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', testUsers.validUser.email);
    await page.fill('input[type="password"]', 'wrongpassword');

    await page.click('button:has-text("Login")');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('user can logout successfully', async ({ page, context }) => {
    // Login first
    await context.addInitScript(() => {
      localStorage.setItem('token', 'valid-jwt-token');
    });

    await page.goto('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Logout');

    // Verify redirected to login
    await expect(page).toHaveURL('/login');
    
    // Verify token is cleared
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();
  });

  test('user stays logged in after page refresh', async ({ page, context }) => {
    await context.addInitScript(() => {
      localStorage.setItem('token', 'valid-jwt-token');
      localStorage.setItem('user', JSON.stringify({ id: '1', email: 'test@example.com' }));
    });

    await page.goto('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();

    // Refresh page
    await page.reload();

    // User should still be logged in
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });
});
