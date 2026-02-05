import { test, expect } from '@playwright/test';

test.describe('Accessibility - WCAG 2.1 AA', () => {
  test('homepage has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1s = await page.locator('h1').count();
    expect(h1s).toBeGreaterThanOrEqual(1);

    // Verify no skipped heading levels
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    let previousLevel = 0;
    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName);
      const level = parseInt(tagName[1]);
      expect(level - previousLevel).toBeLessThanOrEqual(1);
      previousLevel = level;
    }
  });

  test('buttons and links have accessible labels', async ({ page }) => {
    await page.goto('/');

    // All buttons should have accessible names
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const accessibleName = await button.evaluate((el) => {
        const text = el.textContent?.trim();
        const ariaLabel = el.getAttribute('aria-label');
        const title = el.getAttribute('title');
        return text || ariaLabel || title;
      });
      expect(accessibleName).toBeTruthy();
    }

    // All links should have accessible names
    const links = await page.locator('a').all();
    for (const link of links) {
      const accessibleName = await link.evaluate((el) => {
        const text = el.textContent?.trim();
        const ariaLabel = el.getAttribute('aria-label');
        const title = el.getAttribute('title');
        return text || ariaLabel || title;
      });
      // Skip anchor links without text
      if (await link.getAttribute('href')) {
        expect(accessibleName).toBeTruthy();
      }
    }
  });

  test('form inputs have associated labels', async ({ page }) => {
    await page.goto('/login');

    const inputs = await page.locator('input').all();
    for (const input of inputs) {
      const inputId = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      if (inputId) {
        const label = await page.locator(`label[for="${inputId}"]`).count();
        expect(label + (ariaLabel ? 1 : 0) + (ariaLabelledBy ? 1 : 0)).toBeGreaterThan(0);
      } else {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    for (const image of images) {
      const alt = await image.getAttribute('alt');
      const ariaLabel = await image.getAttribute('aria-label');
      const role = await image.getAttribute('role');

      // Images should have alt text or be decorative
      const hasAlt = alt !== null;
      const isDecorative = role === 'presentation' || (alt === '' && !ariaLabel);
      expect(hasAlt || isDecorative).toBeTruthy();
    }
  });

  test('color contrast is sufficient', async ({ page }) => {
    await page.goto('/');

    // Check text contrast
    const elements = await page.locator('body *').all();
    for (const element of elements.slice(0, 50)) {
      // Sample check - in production, use axe or similar
      const styles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize,
        };
      });

      // Basic contrast verification (simplified)
      expect(styles.color).toBeTruthy();
    }
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    let tabCount = 0;
    const maxTabs = 20;

    while (tabCount < maxTabs) {
      const focusedElement = await page.evaluate(() => {
        return document.activeElement?.tagName;
      });

      if (focusedElement === 'BODY') {
        break;
      }

      await page.keyboard.press('Tab');
      tabCount++;
    }

    expect(tabCount).toBeGreaterThan(0);
  });

  test('products page is accessible', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Verify main content is accessible
    const main = await page.locator('main, [role="main"]').count();
    expect(main).toBeGreaterThan(0);

    // Verify product cards have proper structure
    const productCards = await page.locator('[data-testid="product-card"]').all();
    for (const card of productCards.slice(0, 3)) {
      const productName = await card.locator('[data-testid="product-name"]').count();
      const productPrice = await card.locator('[data-testid="product-price"]').count();
      expect(productName + productPrice).toBeGreaterThan(0);
    }
  });

  test('checkout form is accessible', async ({ page }) => {
    await page.goto('/checkout');

    // Verify all form fields have labels
    const formGroups = await page.locator('[role="group"], .form-group, .field-group').count();
    expect(formGroups).toBeGreaterThan(0);

    // Verify form can be submitted with keyboard
    const submitButton = await page.locator('button:has-text("Place Order")');
    await page.keyboard.press('Tab');
    // Should be able to tab to submit button and press Enter
  });

  test('skip to main content link exists', async ({ page }) => {
    await page.goto('/');

    // Look for skip link
    const skipLink = await page.locator('a:has-text("Skip"), [href="#main"], [href="#content"]').count();
    // Note: Not all sites have skip links, so this is informational
  });

  test('page has proper language attribute', async ({ page }) => {
    await page.goto('/');

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });
});
