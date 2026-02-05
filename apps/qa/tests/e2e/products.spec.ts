import { test, expect } from '@playwright/test';
import { testProducts, filterOptions } from '../fixtures/products.fixture';

test.describe('Product Browsing', () => {
  test('user can view products list', async ({ page }) => {
    await page.goto('/products');

    // Wait for products to load
    await page.waitForLoadState('networkidle');

    // Verify product cards are displayed
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards.first()).toBeVisible();
  });

  test('user can search for products', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Search for a product
    await page.fill('input[placeholder*="Search"]', 'drums');
    await page.waitForLoadState('networkidle');

    // Verify results contain the search term
    const productName = page.locator('[data-testid="product-name"]').first();
    const text = await productName.textContent();
    expect(text?.toLowerCase()).toContain('drum');
  });

  test('user can filter products by category', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Click category filter
    await page.click('text=Drums');
    await page.waitForLoadState('networkidle');

    // Verify URL includes filter
    await expect(page).toHaveURL(/category=drums/);

    // Verify products shown are in that category
    const categoryBadge = page.locator('text=Drums');
    await expect(categoryBadge).toBeVisible();
  });

  test('user can sort products', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Click sort dropdown
    await page.click('[data-testid="sort-select"]');
    await page.click('text=Price: Low to High');
    await page.waitForLoadState('networkidle');

    // Verify sort is applied
    await expect(page).toHaveURL(/sort=price-asc/);
  });

  test('user can paginate through products', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Go to next page
    await page.click('button[aria-label="Next page"]');
    await page.waitForLoadState('networkidle');

    // Verify page changed
    await expect(page).toHaveURL(/page=2/);
  });

  test('user can view product details', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Click first product
    await page.click('[data-testid="product-card"]');

    // Verify product detail page loaded
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.locator('[data-testid="product-detail"]')).toBeVisible();

    // Verify product information is displayed
    await expect(page.locator('[data-testid="product-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-description"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-price"]')).toBeVisible();
  });

  test('user can add product to cart from list', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Get initial cart count
    const cartBefore = await page.locator('[data-testid="cart-count"]').textContent();

    // Add to cart
    await page.click('[data-testid="product-card"] >> button:has-text("Add")');

    // Verify cart updated
    const cartAfter = await page.locator('[data-testid="cart-count"]').textContent();
    expect(parseInt(cartAfter || '0')).toBeGreaterThan(parseInt(cartBefore || '0'));
  });
});
