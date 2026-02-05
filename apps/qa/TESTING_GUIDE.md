# Testing Guide - Hip-Hop Samples Marketplace

Complete guide for running, writing, and maintaining tests.

## 🎯 Testing Philosophy

- **Coverage First**: Aim for >80% code coverage
- **Speed Matters**: Keep test execution < 5 minutes
- **Reliability**: No flaky tests - use explicit waits
- **Clarity**: Tests document expected behavior
- **Isolation**: Each test should be independent

## 🚀 Getting Started

### 1. Setup
```bash
npm install
npx playwright install
```

### 2. Run Full Test Suite
```bash
npm test
```

### 3. Check Coverage
```bash
npm run test:coverage
# Opens coverage report in browser
```

## 📝 Writing Tests

### E2E Tests (Playwright)

Located in `tests/e2e/`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/');
  });

  test('should perform action', async ({ page }) => {
    // Arrange
    await page.fill('input', 'value');
    
    // Act
    await page.click('button');
    
    // Assert
    await expect(page).toHaveURL('/success');
  });
});
```

**Best Practices:**
- Use `data-testid` for element selection
- Wait for network with `waitForLoadState('networkidle')`
- Use user-like interactions (`click`, `fill`, not `setValue`)
- Test user flows, not implementation details

### Unit Tests (Jest + RTL)

Located in `tests/unit/`

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component', () => {
  it('should render', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle click', async () => {
    const handleClick = jest.fn();
    render(<Component onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

**Best Practices:**
- Query by accessible roles/labels
- Use `getBy*` for expected elements
- Mock external dependencies
- Test behavior, not internals
- Use `waitFor` for async changes

### Integration Tests (Supertest)

Located in `tests/integration/`

```typescript
import request from 'supertest';
import app from '../app';

describe('POST /api/products', () => {
  it('creates product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Product', price: 29.99 })
      .set('Authorization', 'Bearer token');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
```

**Best Practices:**
- Use test database (MongoDB test instance)
- Clean up data after tests
- Mock external APIs
- Test happy and sad paths
- Verify status codes and response structure

### Accessibility Tests

Located in `tests/a11y/`

```typescript
import { test, expect } from '@playwright/test';

test('page is accessible', async ({ page }) => {
  await page.goto('/');
  
  // Check for h1
  const h1s = await page.locator('h1').count();
  expect(h1s).toBeGreaterThan(0);
  
  // Check form labels
  const inputs = await page.locator('input').all();
  for (const input of inputs) {
    const label = await input.getAttribute('aria-label');
    expect(label).toBeTruthy();
  }
});
```

**Best Practices:**
- Check heading hierarchy (h1 → h2 → h3)
- Verify all inputs have labels
- Test keyboard navigation
- Check color contrast
- Verify ARIA attributes

### Performance Tests

Located in `tests/performance/`

```typescript
import { test, expect } from '@playwright/test';

test('page loads fast', async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('/', { waitUntil: 'networkidle' });
  
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000);
});
```

**Best Practices:**
- Test real-world conditions
- Measure Core Web Vitals (LCP, FCP, CLS)
- Monitor bundle size
- Check API response times
- Test on slow networks/devices

## 🔍 Debugging

### Debug E2E Tests

```bash
# Interactive UI mode
npm run test:e2e:ui

# Step through each test
npm run test:e2e:debug

# Run single test
npx playwright test tests/e2e/auth.spec.ts

# Run tests matching pattern
npx playwright test --grep "login"
```

### Debug Unit Tests

```bash
# Watch mode
npm run test:unit:watch

# Debug in DevTools
node --inspect-brk node_modules/.bin/jest --runInBand

# Run single test
npm run test:unit -- Button.test.tsx
```

### View Test Reports

```bash
# HTML Report
npm run test:report

# JSON Results
cat test-results/results.json

# JUnit XML
cat test-results/junit.xml
```

## 📊 Test Data & Fixtures

Located in `tests/fixtures/`

```typescript
// users.fixture.ts
export const testUsers = {
  validUser: {
    email: 'test@example.com',
    password: 'SecurePass123!',
  },
};

// Use in tests
import { testUsers } from '../fixtures/users.fixture';

test('login', async ({ page }) => {
  await page.fill('input[type="email"]', testUsers.validUser.email);
});
```

## 🔄 Mocking

### Mock API Responses

```typescript
test('handles API error', async ({ page }) => {
  await page.route('/api/products', route => {
    route.abort('failed');
  });
  
  await page.goto('/products');
  expect(page.locator('text=Error')).toBeVisible();
});
```

### Mock External Services

```typescript
jest.mock('stripe', () => ({
  Stripe: jest.fn(() => ({
    confirmPayment: jest.fn(),
  })),
}));
```

## ⚡ Performance Tips

### Speed Up Tests
- Run tests in parallel (default)
- Use `reuseExistingServer` in CI
- Minimize waits (use explicit signals)
- Mock slow external APIs
- Split large test suites

### Reduce Flakiness
```typescript
// ❌ Bad - arbitrary wait
await page.waitForTimeout(1000);

// ✅ Good - wait for element
await page.waitForSelector('[data-testid="loader"]', { state: 'hidden' });

// ✅ Good - wait for network
await page.waitForLoadState('networkidle');
```

## 🐛 Common Issues

### Tests are flaky
- Add explicit waits instead of `waitForTimeout`
- Use `waitForLoadState('networkidle')`
- Verify selectors are stable
- Check for race conditions

### Tests timeout
- Increase timeout in config
- Verify server is running
- Check for infinite loops in code
- Use `--debug` to inspect

### Port conflicts
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database errors
```bash
# Start MongoDB
mongod --dbpath /path/to/data

# Or use Docker
docker run -d -p 27017:27017 mongo:6
```

## 📈 Continuous Integration

### GitHub Actions

Tests run automatically on push and PRs:

```yaml
- Unit tests (coverage check)
- Integration tests (with MongoDB)
- E2E tests (3 browsers)
- Accessibility tests
- Performance tests
```

### Quality Gates

```
✅ All tests passing
✅ Coverage > 80%
✅ No accessibility violations
✅ Performance metrics met
```

## 📚 Test Templates

### E2E - Authentication
```typescript
test('register new user', async ({ page }) => {
  await page.goto('/register');
  await page.fill('input[type="email"]', 'new@example.com');
  await page.fill('input[name="name"]', 'New User');
  await page.fill('input[type="password"]', 'Pass123!');
  await page.click('button:has-text("Register")');
  await expect(page).toHaveURL('/dashboard');
});
```

### E2E - API Call
```typescript
test('fetch data', async ({ page }) => {
  const response = await page.request.get('/api/products');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('items');
});
```

### Unit - Component
```typescript
test('renders with props', () => {
  render(<Button variant="primary">Click</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('btn-primary');
});
```

### Integration - API
```typescript
test('POST creates resource', async () => {
  const res = await request(app)
    .post('/api/items')
    .send({ name: 'Item' });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
});
```

## 🎯 Coverage Goals

| Category | Target | How to Track |
|----------|--------|--------------|
| Statements | 80% | `npm run test:coverage` |
| Branches | 80% | Coverage report |
| Functions | 80% | Coverage report |
| Lines | 80% | Coverage report |
| E2E Flows | 100% | All critical paths tested |
| API Endpoints | 90% | Integration tests |

## 🚀 Next Steps

1. **Add to CI/CD**: Tests run on every push
2. **Monitor Coverage**: Track trends over time
3. **Fix Flaky Tests**: Address test reliability
4. **Expand Coverage**: Add more E2E scenarios
5. **Performance**: Monitor Core Web Vitals

---

Ready to test! 🧪✨
