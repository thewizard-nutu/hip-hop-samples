# Project Structure Template

Estrutura recomendada para projetos que usam o time completo.

## Full Stack Project Layout

```
my-app/
├── frontend/                    # Next.js + React
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   └── products/
│   │   │       ├── page.tsx
│   │   │       └── [id]/page.tsx
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Modal.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── products/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductList.tsx
│   │   │   │   ├── ProductDetail.tsx
│   │   │   │   └── ProductFilters.tsx
│   │   │   └── common/
│   │   │       ├── Loading.tsx
│   │   │       ├── Error.tsx
│   │   │       └── Empty.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useCart.ts
│   │   │   └── useApi.ts
│   │   ├── lib/
│   │   │   ├── api-client.ts
│   │   │   ├── validators.ts
│   │   │   ├── helpers.ts
│   │   │   └── types.ts
│   │   ├── store/
│   │   │   ├── auth.store.ts
│   │   │   ├── cart.store.ts
│   │   │   └── ui.store.ts
│   │   └── __tests__/
│   │       ├── components/
│   │       │   ├── Button.test.tsx
│   │       │   └── ProductCard.test.tsx
│   │       ├── hooks/
│   │       │   └── useAuth.test.ts
│   │       └── lib/
│   │           └── validators.test.ts
│   ├── tests/
│   │   ├── e2e/
│   │   │   ├── auth.spec.ts
│   │   │   ├── products.spec.ts
│   │   │   ├── cart.spec.ts
│   │   │   └── checkout.spec.ts
│   │   ├── integration/
│   │   │   ├── auth.test.ts
│   │   │   └── products.test.ts
│   │   └── fixtures/
│   │       ├── users.json
│   │       └── products.json
│   ├── .env.local
│   ├── .env.test
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── playwright.config.ts
│   ├── tailwind.config.ts
│   ├── package.json
│   └── README.md
│
├── backend/                     # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── server.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── env.ts
│   │   │   └── cors.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── products.routes.ts
│   │   │   ├── cart.routes.ts
│   │   │   └── orders.routes.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── cart.controller.ts
│   │   │   └── orders.controller.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Cart.ts
│   │   │   └── Order.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   ├── cors.middleware.ts
│   │   │   └── logging.middleware.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── email.service.ts
│   │   │   ├── payment.service.ts
│   │   │   └── product.service.ts
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   ├── helpers.ts
│   │   │   ├── errors.ts
│   │   │   └── logger.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── express.d.ts
│   │   └── __tests__/
│   │       ├── controllers/
│   │       │   ├── auth.test.ts
│   │       │   └── products.test.ts
│   │       ├── models/
│   │       │   └── User.test.ts
│   │       ├── services/
│   │       │   └── auth.service.test.ts
│   │       └── integration/
│   │           ├── auth.test.ts
│   │           └── products.test.ts
│   ├── .env
│   ├── .env.test
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── nodemon.json
│   ├── package.json
│   └── README.md
│
├── docs/                        # Documentation
│   ├── API.md
│   ├── DATABASE.md
│   ├── FRONTEND.md
│   ├── TESTING.md
│   └── DEPLOYMENT.md
│
├── docker/                      # Docker setup (optional)
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
│
├── .github/
│   └── workflows/
│       ├── test.yml
│       ├── build.yml
│       └── deploy.yml
│
├── scripts/
│   ├── setup.sh
│   ├── dev.sh
│   ├── test.sh
│   └── deploy.sh
│
├── TEAM.md                      # This file
├── AGENT_COMMANDS.md
├── PROJECT_STRUCTURE.md
├── README.md
├── package.json                 # Root package.json (workspace)
└── .gitignore
```

---

## File Descriptions

### Frontend (src/app)
- **app/**: Next.js 13+ App Router pages
- **components/**: Reusable React components organized by feature
- **hooks/**: Custom React hooks for logic reuse
- **lib/**: Utilities, API clients, validators
- **store/**: Zustand state management
- **__tests__/**: Unit tests co-located with source

### Backend (src/)
- **routes/**: Express route definitions
- **controllers/**: Request handlers, business logic
- **models/**: MongoDB schemas and validation
- **middleware/**: Auth, validation, error handling
- **services/**: Business logic, external services
- **utils/**: Helper functions, error classes
- **__tests__/**: Jest tests for all layers

---

## Development Workflow

### 1. Backend Development

```bash
cd backend
npm install
npm run dev
```

Expected output:
```
Server running on port 3001
MongoDB connected
```

### 2. Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
▲ Next.js 14.x.x
✓ Ready in 2.5s
```

### 3. Testing During Development

```bash
# Frontend unit tests
cd frontend
npm test

# Frontend E2E tests
npx playwright test --ui

# Backend tests
cd backend
npm test
```

---

## Key Files Configuration

### Frontend Environment (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend Environment (.env)
```
MONGODB_URI=mongodb://localhost:27017/app-dev
PORT=3001
NODE_ENV=development
JWT_SECRET=dev-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

### tsconfig.json (Frontend)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### tsconfig.json (Backend)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "outDir": "./dist"
  }
}
```

---

## CI/CD Pipeline

### GitHub Actions Workflow (.github/workflows/test.yml)

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:latest
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Frontend Setup
        run: cd frontend && npm ci
      
      - name: Frontend Lint
        run: cd frontend && npm run lint
      
      - name: Frontend Tests
        run: cd frontend && npm test
      
      - name: Frontend E2E
        run: cd frontend && npx playwright test
      
      - name: Backend Setup
        run: cd backend && npm ci
      
      - name: Backend Lint
        run: cd backend && npm run lint
      
      - name: Backend Tests
        run: cd backend && npm test
```

---

## Common Commands

```bash
# Development
npm run dev              # Run backend and frontend in parallel
npm run dev:backend      # Run backend only
npm run dev:frontend     # Run frontend only

# Testing
npm test                # Run all tests
npm run test:unit       # Unit tests only
npm run test:e2e        # E2E tests only
npm run test:coverage   # With coverage report

# Build & Production
npm run build           # Build everything
npm start               # Start production server
npm run deploy          # Deploy to hosting

# Linting & Type Check
npm run lint            # ESLint
npm run type-check      # TypeScript
npm run format          # Prettier
```

---

## Database Seeding

### Development Data (backend/scripts/seed.ts)

```typescript
import { User } from '../src/models/User';
import { Product } from '../src/models/Product';

export async function seedDatabase() {
  // Clear existing data
  await User.deleteMany({});
  await Product.deleteMany({});

  // Create test users
  const users = await User.create([
    {
      email: 'admin@test.com',
      name: 'Admin',
      password: 'password123',
      role: 'admin',
    },
    {
      email: 'user@test.com',
      name: 'Test User',
      password: 'password123',
      role: 'user',
    },
  ]);

  // Create test products
  const products = await Product.create([
    {
      name: 'Laptop',
      description: 'High-performance laptop',
      price: 1299.99,
      stock: 10,
      category: 'electronics',
    },
    // ... more products
  ]);

  console.log('Database seeded successfully');
}
```

Run with:
```bash
cd backend
npx ts-node scripts/seed.ts
```

---

## Monitoring & Logging

### Backend Logging (src/utils/logger.ts)

```typescript
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

---

## Best Practices Summary

✅ **DO:**
- Keep components small and focused
- Use TypeScript everywhere
- Test critical paths thoroughly
- Document complex logic
- Use environment variables for secrets
- Index frequently queried database fields
- Validate input on both frontend and backend
- Cache API responses when appropriate

❌ **DON'T:**
- Store secrets in code or git
- Skip database migrations
- Write large files without tests
- Use `any` type in TypeScript
- Trust frontend validation alone
- Cache sensitive data in localStorage
- Skip error handling
- Deploy without running tests

---

**Next Step:** Review AGENT_COMMANDS.md to start spawning your team! 🚀
