---
name: qa-web-testing
description: Test Next.js/Node.js websites with end-to-end testing (Playwright), unit tests (Jest), integration tests, accessibility audits, and performance testing. Use when creating test suites, validating functionality, checking UI behavior, running test reports, or debugging test failures.
---

# QA Agent - Web Testing Specialist

## Quick Start

### Test Environment Setup

```bash
npm install -D @playwright/test jest @testing-library/react @testing-library/jest-dom
npm install -D typescript ts-node
npx playwright install
```

### Test Structure

```
tests/
├── e2e/                       # End-to-end tests
│   ├── auth.spec.ts
│   ├── products.spec.ts
│   └── checkout.spec.ts
├── integration/               # API integration tests
│   ├── auth.test.ts
│   └── products.test.ts
├── fixtures/                  # Test data & fixtures
│   ├── users.json
│   └── test-data.ts
└── config/
    ├── playwright.config.ts
    └── jest.config.js
```

## E2E Testing (Playwright)

### Project Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

#### Authentication Flow

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can register', async ({ page }) => {
    await page.goto('/register');
    
    await page.fill('input[type="email"]', 'newuser@example.com');
    await page.fill('input[type="password"]', 'SecurePass123!');
    await page.fill('input[name="name"]', 'New User');
    
    await page.click('button:has-text("Register")');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome, New User')).toBeVisible();
  });

  test('user can login', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    await page.click('button:has-text("Login")');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('user cannot login with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    await page.click('button:has-text("Login")');
    
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('user can logout', async ({ page, context }) => {
    // Set auth token in localStorage
    await context.addInitScript(() => {
      localStorage.setItem('token', 'valid-jwt-token');
    });
    
    await page.goto('/dashboard');
    
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Logout');
    
    await expect(page).toHaveURL('/login');
  });
});
```

#### Product Browsing & Search

```typescript
// tests/e2e/products.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Product Management', () => {
  test('user can view products list', async ({ page }) => {
    await page.goto('/products');
    
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards).toHaveCount(10);
  });

  test('user can search products', async ({ page }) => {
    await page.goto('/products');
    
    await page.fill('input[placeholder="Search products"]', 'laptop');
    await page.waitForLoadState('networkidle');
    
    const results = page.locator('[data-testid="product-card"]');
    await expect(results.first()).toContainText('laptop', { ignoreCase: true });
  });

  test('user can filter by category', async ({ page }) => {
    await page.goto('/products');
    
    await page.click('text=Electronics');
    await page.waitForLoadState('networkidle');
    
    const categoryTag = page.locator('text=Electronics');
    await expect(categoryTag).toBeVisible();
  });

  test('user can paginate products', async ({ page }) => {
    await page.goto('/products');
    
    await page.click('button:has-text("Next")');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL(/\?page=2/);
  });

  test('user can add product to cart', async ({ page }) => {
    await page.goto('/products');
    
    await page.click('[data-testid="product-card"] >> button:has-text("Add to Cart")');
    
    await expect(page.locator('[data-testid="cart-count"]')).toContainText('1');
  });
});
```

#### Checkout Flow

```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page, context }) => {
    // Setup auth
    await context.addInitScript(() => {
      localStorage.setItem('token', 'valid-token');
    });
  });

  test('user can complete purchase', async ({ page }) => {
    await page.goto('/cart');
    
    // Verify items in cart
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(2);
    
    // Proceed to checkout
    await page.click('button:has-text("Checkout")');
    await expect(page).toHaveURL('/checkout');
    
    // Fill shipping info
    await page.fill('input[name="address"]', '123 Main St');
    await page.fill('input[name="city"]', 'San Francisco');
    await page.fill('input[name="zip"]', '94105');
    
    // Fill payment info
    await page.frameLocator('iframe[name="__stripe"]').locator('input[placeholder="Card number"]').fill('4242424242424242');
    await page.frameLocator('iframe[name="__stripe"]').locator('input[placeholder="MM / YY"]').fill('12 / 25');
    await page.frameLocator('iframe[name="__stripe"]').locator('input[placeholder="CVC"]').fill('123');
    
    // Submit
    await page.click('button:has-text("Place Order")');
    
    // Verify success
    await expect(page).toHaveURL(/\/order-confirmation/);
    await expect(page.locator('text=Thank you for your order')).toBeVisible();
  });

  test('checkout fails with invalid payment', async ({ page }) => {
    await page.goto('/cart');
    await page.click('button:has-text("Checkout")');
    
    // Fill shipping
    await page.fill('input[name="address"]', '123 Main St');
    await page.fill('input[name="city"]', 'San Francisco');
    await page.fill('input[name="zip"]', '94105');
    
    // Invalid card
    await page.frameLocator('iframe[name="__stripe"]').locator('input[placeholder="Card number"]').fill('4000000000000002');
    await page.frameLocator('iframe[name="__stripe"]').locator('input[placeholder="MM / YY"]').fill('12 / 25');
    await page.frameLocator('iframe[name="__stripe"]').locator('input[placeholder="CVC"]').fill('123');
    
    await page.click('button:has-text("Place Order")');
    
    await expect(page.locator('text=Payment failed')).toBeVisible();
  });
});
```

## Unit Testing (Jest + React Testing Library)

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
};
```

### Component Unit Tests

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-500');
  });
});
```

### Form Testing

```typescript
// src/components/__tests__/LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('shows validation errors', async () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('shows error message on submission failure', async () => {
    const handleSubmit = jest.fn().mockRejectedValue(new Error('Login failed'));
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });
});
```

## API Integration Testing

```typescript
// tests/integration/products.test.ts
import request from 'supertest';
import app from '../../src/server';
import { Product } from '../../src/models/Product';

describe('Products API', () => {
  beforeAll(async () => {
    // Connect to test database
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  describe('GET /api/products', () => {
    it('returns all products', async () => {
      await Product.create([
        { name: 'Product 1', price: 100, stock: 10, category: 'electronics' },
        { name: 'Product 2', price: 200, stock: 5, category: 'electronics' },
      ]);

      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
    });

    it('filters by category', async () => {
      await Product.create([
        { name: 'Laptop', price: 1000, stock: 5, category: 'electronics' },
        { name: 'Shirt', price: 50, stock: 20, category: 'clothing' },
      ]);

      const res = await request(app).get('/api/products?category=electronics');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe('Laptop');
    });
  });

  describe('POST /api/products', () => {
    it('creates a new product', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'New Product',
          price: 300,
          stock: 15,
          category: 'electronics',
        });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('New Product');
    });
  });
});
```

## Accessibility Testing

```typescript
// tests/a11y/pages.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility', () => {
  test('homepage is accessible', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('products page is accessible', async ({ page }) => {
    await page.goto('/products');
    await injectAxe(page);
    await checkA11y(page);
  });
});
```

## Performance Testing

```typescript
// tests/performance/load.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('page loads in under 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('API endpoint responds within 500ms', async ({ page }) => {
    const startTime = Date.now();
    
    const response = await page.request.get('/api/products');
    
    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(500);
    expect(response.status()).toBe(200);
  });

  test('bundle size is optimized', async ({ page }) => {
    await page.goto('/');
    
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .map(r => ({ name: r.name, size: (r as any).transferSize }));
    });

    const jsSize = resources
      .filter(r => r.name.includes('.js'))
      .reduce((sum, r) => sum + r.size, 0);

    expect(jsSize).toBeLessThan(500000); // 500KB max
  });
});
```

## Visual Regression Testing

```typescript
// tests/e2e/visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('homepage snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
  });

  test('product card snapshot', async ({ page }) => {
    await page.goto('/products');
    
    const card = page.locator('[data-testid="product-card"]').first();
    expect(await card.screenshot()).toMatchSnapshot('product-card.png');
  });
});
```

## Test Reports & Coverage

### Generate Coverage Report

```bash
npm test -- --coverage
```

### HTML Report

```typescript
// playwright.config.ts
reporter: [
  ['html', { outputFolder: 'test-results/html' }],
  ['json', { outputFile: 'test-results/results.json' }],
  ['junit', { outputFile: 'test-results/junit.xml' }],
]
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/tests.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:latest
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npx playwright install
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Essential Test Dependencies

```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "supertest": "^6.3.0",
    "@types/jest": "^29.5.0",
    "axe-playwright": "^1.2.0",
    "axe-core": "^4.7.0"
  }
}
```

## Common Commands

```bash
# Run all tests
npm test

# E2E tests
npx playwright test

# E2E tests UI mode
npx playwright test --ui

# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# Coverage report
npm run test:coverage

# Single test file
npx playwright test tests/e2e/auth.spec.ts
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout in config; check if server is running |
| Flaky tests | Add explicit waits (waitForLoadState, waitFor); avoid fixed delays |
| Snapshot mismatch | Review changes; run `--update` to refresh snapshots |
| MongoDB connection | Verify MongoDB service running; check connection string |
| Port conflicts | Change PORT in .env.test; kill existing processes |

