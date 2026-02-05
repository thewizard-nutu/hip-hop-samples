# 🎤 Hip-Hop Samples Marketplace

A full-stack web application for buying and selling premium drum samples, loops, and sound kits for hip-hop producers.

**Built with:** Next.js 14 • Node.js/Express • MongoDB • Stripe • AWS S3

---

## 📦 Project Structure

```
hip-hop-samples/
├── apps/
│   ├── frontend/          # Next.js 14 UI (localhost:3000)
│   ├── backend/           # Node.js/Express API (localhost:3001)
│   └── qa/               # Automated tests & QA
├── docker-compose.yml    # Local development stack
├── package.json          # Monorepo root
└── README.md            # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- Docker & Docker Compose (optional, for MongoDB)
- Git

### 1. Clone & Install

```bash
git clone https://github.com/thewizard-nutu/hip-hop-samples.git
cd hip-hop-samples
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your Stripe & AWS credentials
```

### 3. Start Services

**Option A: Local Services (Node + external MongoDB)**
```bash
# Terminal 1: Backend
cd apps/backend
npm run dev

# Terminal 2: Frontend
cd apps/frontend
npm run dev

# Open http://localhost:3000
```

**Option B: Docker Compose (All-in-one)**
```bash
docker-compose up --build
# Opens http://localhost:3000 (frontend)
# Backend API at http://localhost:3001
# MongoDB at localhost:27017
```

---

## 📋 Available Scripts

### Root Level

```bash
npm run dev              # Start both frontend & backend
npm run build           # Build both apps
npm run test            # Run all tests
npm run test:frontend   # Frontend tests
npm run test:backend    # Backend tests
npm run test:e2e        # E2E tests with Playwright
npm run lint            # Lint all apps
```

### Frontend (`apps/frontend`)

```bash
npm run dev             # Development server
npm run build           # Production build
npm run test            # Jest + RTL tests
npm run e2e            # Playwright E2E tests
npm run type-check     # TypeScript check
npm run lint           # ESLint
```

### Backend (`apps/backend`)

```bash
npm run dev             # Development server (nodemon)
npm run build           # TypeScript compile
npm run test            # Jest tests
npm run lint           # ESLint
```

### QA (`apps/qa`)

```bash
npm test                # All tests
npm run test:unit       # Unit tests
npm run test:integration # Integration tests
npm run test:e2e        # E2E tests
```

---

## 🔐 Environment Variables

Create `.env.local` in the root directory:

```env
# Backend
MONGODB_URI=mongodb://localhost:27017/hiphopdrumsdb
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
AWS_ACCESS_KEY_ID=your_key_id
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=hip-hop-samples

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

See `.env.example` for all available options.

---

## 📚 Documentation

- **[Frontend Docs](./apps/frontend/README.md)** - Next.js setup, components, deployment
- **[Backend API Docs](./apps/backend/API_DOCS.md)** - Complete API reference
- **[Testing Guide](./apps/qa/README.md)** - Test infrastructure & execution
- **[Deployment Guide](./apps/backend/DEPLOYMENT.md)** - Production deployment

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Tests by Type

```bash
npm run test:backend     # Backend unit + integration
npm run test:frontend    # Frontend unit + component
npm run test:e2e        # E2E with Playwright (requires running servers)
```

### Test Coverage

```bash
cd apps/backend
npm test -- --coverage

cd apps/frontend
npm test -- --coverage
```

Target: **>80% coverage** across all apps ✅

---

## 📊 Architecture

### Frontend (Next.js 14)
- 🎨 30+ React components
- 📑 10+ pages (products, cart, checkout, dashboard)
- 🔐 JWT authentication
- 🎵 Audio player component
- 📱 Responsive design (mobile-first)
- 🌓 Dark mode support
- ♿ WCAG 2.1 AA accessibility

### Backend (Node.js/Express)
- 🔌 19 REST API endpoints
- 🗄️ MongoDB with 5 models (User, Product, Cart, Order, Download)
- 🔐 JWT authentication + password hashing
- 💳 Stripe payment integration
- ☁️ AWS S3 file storage & signed URLs
- 📝 Comprehensive logging
- ⚡ Rate limiting & input validation

### QA
- ✅ 102 automated tests
- 🎭 Playwright E2E (44 tests across 4 browsers)
- 🧩 Jest unit tests (24 tests)
- 🔗 Supertest integration tests (14 tests)
- ♿ Accessibility audits (10 checks)
- ⚡ Performance monitoring (10 tests)
- 📊 CI/CD pipeline with GitHub Actions

---

## 🔄 CI/CD Pipeline

GitHub Actions automatically:
- ✅ Runs tests on every push
- ✅ Checks TypeScript types
- ✅ Lints code
- ✅ Generates coverage reports
- ✅ Deploys on merge to main

See `.github/workflows/tests.yml` for details.

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd apps/frontend
npm run build
vercel deploy
```

### Backend (Railway, Render, or AWS)
```bash
cd apps/backend
npm run build
# Follow DEPLOYMENT.md for your chosen platform
```

See detailed deployment guides:
- **[Frontend Deployment](./apps/frontend/DEPLOYMENT.md)**
- **[Backend Deployment](./apps/backend/DEPLOYMENT.md)**

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login & get JWT token |
| GET | `/products` | ❌ | List all products |
| GET | `/products/:id` | ❌ | Get product details |
| POST | `/cart` | ✅ | Add to cart |
| GET | `/cart` | ✅ | Get user's cart |
| POST | `/orders/checkout` | ✅ | Create checkout session |
| GET | `/orders` | ✅ | Get user's orders |
| GET | `/downloads/:id` | ✅ | Get download link |

See [Backend API Docs](./apps/backend/API_DOCS.md) for complete reference.

---

## 💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand |
| **Backend** | Node.js, Express, MongoDB, Mongoose, TypeScript |
| **Auth** | JWT (jsonwebtoken), bcryptjs |
| **Payments** | Stripe API |
| **Storage** | AWS S3 |
| **Testing** | Playwright, Jest, RTL, Supertest |
| **CI/CD** | GitHub Actions |
| **Deployment** | Vercel, Railway/Render, Docker |

---

## 📞 Support & Contributions

- **Issues**: [GitHub Issues](https://github.com/thewizard-nutu/hip-hop-samples/issues)
- **Pull Requests**: Welcome! Please follow the existing code style.
- **License**: MIT

---

## 📅 Development Timeline

- **Phase 1**: ✅ Infrastructure setup (skills, MCPs, documentation)
- **Phase 2**: ✅ Frontend, Backend, QA development
- **Phase 3**: 🚀 Integration, deployment, monitoring

---

**Built by the Hip-Hop Samples Team** 🎤🥁✨
