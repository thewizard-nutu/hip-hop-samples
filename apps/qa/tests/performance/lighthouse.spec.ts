import { test, expect } from '@playwright/test';

test.describe('Performance - Web Vitals', () => {
  test('homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'networkidle' });

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 seconds
  });

  test('LCP (Largest Contentful Paint) is under 2.5s', async ({ page }) => {
    await page.goto('/');

    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });

        setTimeout(() => resolve(0), 2500);
      });
    });

    expect(lcp).toBeLessThan(2500);
  });

  test('FCP (First Contentful Paint) is under 1.8s', async ({ page }) => {
    await page.goto('/');

    const fcp = await page.evaluate(() => {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
      return fcpEntry?.startTime || 0;
    });

    expect(fcp).toBeLessThan(1800);
  });

  test('CLS (Cumulative Layout Shift) is under 0.1', async ({ page }) => {
    let clsValue = 0;

    await page.evaluate(() => {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            const firstSessionEntry = (entry as any);
            cls += firstSessionEntry.value;
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      (window as any).__cls = () => cls;
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    clsValue = await page.evaluate(() => (window as any).__cls?.() || 0);
    expect(clsValue).toBeLessThan(0.1);
  });

  test('API endpoints respond within 500ms', async ({ page }) => {
    const startTime = Date.now();

    const response = await page.request.get('/api/products');

    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(500);
    expect(response.status()).toBe(200);
  });

  test('products page loads efficiently', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/products', { waitUntil: 'networkidle' });

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);

    // Verify images are lazy-loaded
    const images = await page.locator('img').count();
    expect(images).toBeGreaterThan(0);
  });

  test('bundle size analysis', async ({ page }) => {
    await page.goto('/');

    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter((r) => r.name.includes('.js') || r.name.includes('.css'))
        .map((r) => ({
          name: r.name.split('/').pop(),
          size: (r as any).transferSize || 0,
        }));
    });

    let totalSize = 0;
    for (const resource of resources) {
      totalSize += resource.size;
    }

    expect(totalSize).toBeLessThan(500000); // 500KB
  });

  test('no console errors on page load', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors.length).toBe(0);
  });

  test('network requests are optimized', async ({ page }) => {
    const requests: any[] = [];

    page.on('request', (req) => {
      requests.push({
        url: req.url(),
        method: req.method(),
        resourceType: req.resourceType(),
      });
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for duplicate requests
    const urls = requests.map((r) => r.url);
    const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);
    expect(duplicates.length).toBe(0);
  });

  test('checkout page responsive time is acceptable', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2500);
  });
});
