import { test, expect } from '@playwright/test';
import { testProducts } from '../fixtures/products.fixture';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ context }) => {
    // Setup authenticated user
    await context.addInitScript(() => {
      localStorage.setItem('token', 'valid-jwt-token');
    });
  });

  test('user can add product to cart', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const cartCountBefore = await page.locator('[data-testid="cart-count"]').textContent();

    // Add product to cart
    await page.click('[data-testid="product-card"] >> button:has-text("Add")');

    // Verify cart count increased
    const cartCountAfter = await page.locator('[data-testid="cart-count"]').textContent();
    expect(parseInt(cartCountAfter || '0')).toBeGreaterThan(parseInt(cartCountBefore || '0'));
  });

  test('user can view cart items', async ({ page }) => {
    // Add items first
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    await page.click('[data-testid="product-card"] >> button:has-text("Add")');

    // Go to cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page).toHaveURL('/cart');

    // Verify cart items are displayed
    await expect(page.locator('[data-testid="cart-item"]').first()).toBeVisible();
  });

  test('user can update product quantity in cart', async ({ page }) => {
    // Setup: add item to cart
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    await page.click('[data-testid="product-card"] >> button:has-text("Add")');

    // Go to cart
    await page.click('[data-testid="cart-icon"]');

    // Update quantity
    const quantityInput = page.locator('[data-testid="quantity-input"]').first();
    await quantityInput.clear();
    await quantityInput.fill('3');

    // Verify total updated
    const newTotal = await page.locator('[data-testid="cart-total"]').textContent();
    expect(newTotal).toBeTruthy();
  });

  test('user can remove product from cart', async ({ page }) => {
    // Setup: add item to cart
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    await page.click('[data-testid="product-card"] >> button:has-text("Add")');

    // Go to cart
    await page.click('[data-testid="cart-icon"]');

    const itemCountBefore = await page.locator('[data-testid="cart-item"]').count();

    // Remove first item
    await page.click('[data-testid="cart-item"] >> button:has-text("Remove")');

    // Verify item removed
    const itemCountAfter = await page.locator('[data-testid="cart-item"]').count();
    expect(itemCountAfter).toBeLessThan(itemCountBefore);
  });

  test('user can clear entire cart', async ({ page }) => {
    // Setup: add items to cart
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    await page.click('[data-testid="product-card"] >> button:has-text("Add")');
    await page.click('[data-testid="product-card"] >> button:has-text("Add")');

    // Go to cart
    await page.click('[data-testid="cart-icon"]');

    // Clear cart
    await page.click('button:has-text("Clear Cart")');
    await page.click('button:has-text("Confirm")');

    // Verify cart is empty
    await expect(page.locator('[data-testid="empty-cart"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-count"]')).toContainText('0');
  });

  test('cart persists after refresh', async ({ page }) => {
    // Add item to cart
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    await page.click('[data-testid="product-card"] >> button:has-text("Add")');

    const countBefore = await page.locator('[data-testid="cart-count"]').textContent();

    // Refresh page
    await page.reload();

    // Verify cart still has items
    const countAfter = await page.locator('[data-testid="cart-count"]').textContent();
    expect(countAfter).toBe(countBefore);
  });

  test('user cannot proceed to checkout with empty cart', async ({ page }) => {
    // Go to empty cart
    await page.goto('/cart');

    // Checkout button should be disabled or not visible
    const checkoutButton = page.locator('button:has-text("Checkout")');
    await expect(checkoutButton).toBeDisabled();
  });
});
