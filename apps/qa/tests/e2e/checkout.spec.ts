import { test, expect } from '@playwright/test';
import { testOrders, stripeTestCards } from '../fixtures/orders.fixture';

test.describe('Checkout & Payment', () => {
  test.beforeEach(async ({ context, page }) => {
    // Setup authenticated user with cart
    await context.addInitScript(() => {
      localStorage.setItem('token', 'valid-jwt-token');
      localStorage.setItem('cart', JSON.stringify([
        { id: 'prod-001', quantity: 1, price: 29.99 }
      ]));
    });
    
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');
  });

  test('user can proceed to checkout from cart', async ({ page }) => {
    await page.click('button:has-text("Checkout")');

    await expect(page).toHaveURL('/checkout');
    await expect(page.locator('[data-testid="checkout-form"]')).toBeVisible();
  });

  test('user can fill shipping information', async ({ page }) => {
    await page.click('button:has-text("Checkout")');

    // Fill shipping form
    await page.fill('input[name="address"]', testOrders.validCheckout.shippingInfo.address);
    await page.fill('input[name="city"]', testOrders.validCheckout.shippingInfo.city);
    await page.fill('input[name="state"]', testOrders.validCheckout.shippingInfo.state);
    await page.fill('input[name="zip"]', testOrders.validCheckout.shippingInfo.zip);

    // Verify fields filled
    await expect(page.locator('input[name="address"]')).toHaveValue(testOrders.validCheckout.shippingInfo.address);
  });

  test('user can complete successful purchase', async ({ page }) => {
    await page.click('button:has-text("Checkout")');

    // Fill shipping
    await page.fill('input[name="address"]', testOrders.validCheckout.shippingInfo.address);
    await page.fill('input[name="city"]', testOrders.validCheckout.shippingInfo.city);
    await page.fill('input[name="state"]', testOrders.validCheckout.shippingInfo.state);
    await page.fill('input[name="zip"]', testOrders.validCheckout.shippingInfo.zip);

    // Fill payment info (Stripe)
    const frameLocator = page.frameLocator('iframe[title*="Stripe"]');
    await frameLocator.locator('input[placeholder*="Card"]').fill(stripeTestCards.success);
    await frameLocator.locator('input[placeholder*="MM"]').fill('12 / 25');
    await frameLocator.locator('input[placeholder*="CVC"]').fill('123');

    // Submit
    await page.click('button:has-text("Place Order")');

    // Verify success
    await expect(page).toHaveURL(/\/order-confirmation|\/success/);
    await expect(page.locator('text=Thank you|Order confirmed')).toBeVisible();
  });

  test('payment fails with declined card', async ({ page }) => {
    await page.click('button:has-text("Checkout")');

    // Fill shipping
    await page.fill('input[name="address"]', testOrders.invalidPayment.shippingInfo.address);
    await page.fill('input[name="city"]', testOrders.invalidPayment.shippingInfo.city);
    await page.fill('input[name="state"]', testOrders.invalidPayment.shippingInfo.state);
    await page.fill('input[name="zip"]', testOrders.invalidPayment.shippingInfo.zip);

    // Fill invalid payment info
    const frameLocator = page.frameLocator('iframe[title*="Stripe"]');
    await frameLocator.locator('input[placeholder*="Card"]').fill(stripeTestCards.declined);
    await frameLocator.locator('input[placeholder*="MM"]').fill('12 / 25');
    await frameLocator.locator('input[placeholder*="CVC"]').fill('123');

    // Submit
    await page.click('button:has-text("Place Order")');

    // Verify error message
    await expect(page.locator('text=payment failed|Payment declined')).toBeVisible();
    await expect(page).toHaveURL('/checkout');
  });

  test('validation errors displayed for incomplete shipping', async ({ page }) => {
    await page.click('button:has-text("Checkout")');

    // Try to submit without filling fields
    await page.click('button:has-text("Place Order")');

    // Verify error messages
    await expect(page.locator('text=required')).toBeVisible();
  });

  test('order summary shows correct total', async ({ page }) => {
    // Verify total is displayed
    await expect(page.locator('[data-testid="order-total"]')).toBeVisible();

    const total = await page.locator('[data-testid="order-total"]').textContent();
    expect(total).toBeTruthy();
    expect(parseFloat(total || '0')).toBeGreaterThan(0);
  });

  test('user can view order confirmation details', async ({ page }) => {
    await page.click('button:has-text("Checkout")');

    // Fill and submit checkout
    await page.fill('input[name="address"]', testOrders.validCheckout.shippingInfo.address);
    await page.fill('input[name="city"]', testOrders.validCheckout.shippingInfo.city);
    await page.fill('input[name="state"]', testOrders.validCheckout.shippingInfo.state);
    await page.fill('input[name="zip"]', testOrders.validCheckout.shippingInfo.zip);

    const frameLocator = page.frameLocator('iframe[title*="Stripe"]');
    await frameLocator.locator('input[placeholder*="Card"]').fill(stripeTestCards.success);
    await frameLocator.locator('input[placeholder*="MM"]').fill('12 / 25');
    await frameLocator.locator('input[placeholder*="CVC"]').fill('123');

    await page.click('button:has-text("Place Order")');

    // Verify confirmation page has all details
    await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-date"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-items"]')).toBeVisible();
  });
});
