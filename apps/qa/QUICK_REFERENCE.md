# Quick Reference - Test Commands

## Installation & Setup

```bash
# Navigate to workspace
cd /home/sara/.openclaw/workspace-qa

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Run Tests

### All Tests
```bash
npm test                    # Run entire test suite
npm run test:all           # Explicitly run all tests
```

### By Category
```bash
npm run test:unit          # Jest unit tests
npm run test:e2e           # Playwright E2E tests
npm run test:integration   # Supertest API tests
npm run test:a11y          # Accessibility tests
npm run test:performance   # Performance tests
```

### Watch & Debug Mode
```bash
npm run test:unit:watch    # Jest watch mode
npm run test:e2e:ui        # Playwright interactive UI
npm run test:e2e:debug     # Playwright debug mode
```

## Reports & Coverage

```bash
npm run test:coverage      # Generate coverage report
npm run test:report        # View Playwright HTML report
```

## Run Specific Tests

```bash
# Run single E2E test file
npx playwright test tests/e2e/auth.spec.ts

# Run tests matching pattern
npx playwright test --grep "login"

# Run single Jest test file
npm run test:unit -- Button.test.tsx

# Run specific test case
npx playwright test -g "user can login"
```

## Single Browser Testing

```bash
# Chrome only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# Safari only
npx playwright test --project=webkit

# Mobile only
npx playwright test --project="Mobile Chrome"
```

## CI/CD Simulation

```bash
# Simulate CI environment
CI=true npm test
```

## Useful Commands

```bash
# Check test syntax
npx tsc --noEmit

# List all tests
npx playwright test --list

# Update snapshots
npx playwright test -u
```

## Environment

Test environment is configured with:
```
NODE_ENV=test
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:3001
MONGODB_URI=mongodb://localhost:27017/hip-hop-samples-test
```

Load with: `--env-file=.env.test`

## Expected Results

When all tests pass:

```
✅ 102 tests passed
✅ Coverage >80%
✅ 0 accessibility violations
✅ All performance targets met
⏱️  ~5 minutes total execution
```

## Troubleshooting Quick Fixes

```bash
# Clear Playwright cache
rm -rf .playwright/

# Kill existing server on port 3000
lsof -ti:3000 | xargs kill -9

# Start fresh MongoDB
docker run -d -p 27017:27017 mongo:6

# Reinstall browsers
npx playwright install --force

# Reset coverage
rm -rf coverage/
```

## File Locations

```
E2E Tests:          tests/e2e/*.spec.ts
Unit Tests:         tests/unit/*.test.tsx
Integration:        tests/integration/*.test.ts
Accessibility:      tests/a11y/*.spec.ts
Performance:        tests/performance/*.spec.ts
Fixtures:           tests/fixtures/*.ts
Config:             *.config.{js,ts}
Documentation:      *.md
```

## Documentation Files

```
README.md                       - Complete overview
TESTING_GUIDE.md               - How to write tests
TEST_INFRASTRUCTURE_SUMMARY.md - Architecture details
COMPLETION_REPORT.md           - Final status report
QUICK_REFERENCE.md             - This file
PHASE1_COMPLETE.txt            - Phase completion summary
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout in config; start server |
| Port already in use | `lsof -ti:3000 \| xargs kill -9` |
| Playwright not installed | `npx playwright install` |
| Tests fail on first run | Start server: `npm run dev` |
| Coverage too low | Run: `npm run test:coverage` |
| Flaky tests | Use explicit waits, not `waitForTimeout` |
| MongoDB connection error | `docker run -d -p 27017:27017 mongo:6` |

## Performance Tips

- Run tests in parallel (default): `npm run test:e2e`
- Run tests serially: `npx playwright test --workers=1`
- Skip videos: Remove from `playwright.config.ts`
- Skip screenshots: Change `screenshot: 'off'` in config

## Resources

- [Playwright Docs](https://playwright.dev)
- [Jest Docs](https://jestjs.io)
- [React Testing Library](https://testing-library.com/react)
- [Supertest](https://github.com/visionmedia/supertest)

---

**Scout QA Engineer** - Ready to test! 🚀
