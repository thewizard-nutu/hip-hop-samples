import { test, expect } from '@playwright/test';

test.describe('User Settings & Profile', () => {
  test.beforeEach(async ({ context }) => {
    // Setup authenticated user
    await context.addInitScript(() => {
      localStorage.setItem('token', 'valid-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        id: '123',
        email: 'test@example.com',
        name: 'Test User'
      }));
    });
  });

  test('user can view profile page', async ({ page }) => {
    await page.goto('/settings/profile');

    await expect(page.locator('[data-testid="profile-section"]')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test('user can update profile information', async ({ page }) => {
    await page.goto('/settings/profile');

    // Update name
    await page.fill('input[name="name"]', 'Updated Name');
    await page.click('button:has-text("Save")');

    // Verify success message
    await expect(page.locator('text=Profile updated')).toBeVisible();
  });

  test('user can change password', async ({ page }) => {
    await page.goto('/settings/security');

    // Fill password change form
    await page.fill('input[name="currentPassword"]', 'OldPass123!');
    await page.fill('input[name="newPassword"]', 'NewPass456!');
    await page.fill('input[name="confirmPassword"]', 'NewPass456!');

    await page.click('button:has-text("Change Password")');

    // Verify success
    await expect(page.locator('text=Password changed')).toBeVisible();
  });

  test('password change fails with incorrect current password', async ({ page }) => {
    await page.goto('/settings/security');

    await page.fill('input[name="currentPassword"]', 'WrongPassword');
    await page.fill('input[name="newPassword"]', 'NewPass456!');
    await page.fill('input[name="confirmPassword"]', 'NewPass456!');

    await page.click('button:has-text("Change Password")');

    // Verify error
    await expect(page.locator('text=Incorrect password')).toBeVisible();
  });

  test('user can view notification settings', async ({ page }) => {
    await page.goto('/settings/notifications');

    await expect(page.locator('[data-testid="notification-settings"]')).toBeVisible();
  });

  test('user can toggle notification preferences', async ({ page }) => {
    await page.goto('/settings/notifications');

    // Toggle email notifications
    await page.click('input[name="emailNotifications"]');

    await page.click('button:has-text("Save")');

    await expect(page.locator('text=Preferences updated')).toBeVisible();
  });

  test('user can view account information', async ({ page }) => {
    await page.goto('/settings/account');

    await expect(page.locator('[data-testid="account-info"]')).toBeVisible();
    await expect(page.locator('text=Member since')).toBeVisible();
  });

  test('user can delete account', async ({ page }) => {
    await page.goto('/settings/account');

    await page.click('button:has-text("Delete Account")');

    // Confirm deletion
    const dialog = page.locator('[data-testid="confirm-dialog"]');
    await expect(dialog).toBeVisible();
    await page.click('button:has-text("Confirm")');

    // Verify redirected
    await expect(page).toHaveURL(/\/login|\/goodbye/);
  });

  test('user can view account activity', async ({ page }) => {
    await page.goto('/settings/activity');

    await expect(page.locator('[data-testid="activity-log"]')).toBeVisible();
    await expect(page.locator('[data-testid="activity-item"]').first()).toBeVisible();
  });
});
