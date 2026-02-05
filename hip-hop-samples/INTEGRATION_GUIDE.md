# 🔗 Integration Guide

Como integrar Backend, Frontend e QA após os agentes completarem as tarefas.

---

## 📋 Pre-Integration Checklist

- [ ] Backend agent task completed
- [ ] Frontend agent task completed
- [ ] QA agent task completed
- [ ] All code committed to git
- [ ] All tests passing
- [ ] Environment files configured

---

## 🔧 Environment Setup

### Backend (.env)

```
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hip-hop-samples-dev

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...

# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=drum-samples-bucket
AWS_S3_REGION=us-east-1

# Auth
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```
# API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# S3 (for presigned URLs)
NEXT_PUBLIC_S3_BUCKET=drum-samples-bucket
NEXT_PUBLIC_S3_REGION=us-east-1
```

---

## 🚀 Local Development Setup

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Start Services

**Terminal 1 - MongoDB:**
```bash
# Option A: Docker
docker run -d -p 27017:27017 mongo:latest

# Option B: Local MongoDB
mongod
```

**Terminal 2 - Stripe Webhook Listener:**
```bash
# Requires Stripe CLI installed
# Download from: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3001/api/webhook/stripe
# Note: Copy the webhook signing secret to .env
```

**Terminal 3 - Backend:**
```bash
cd backend
npm run dev
# Should output: Server running on port 3001
```

**Terminal 4 - Frontend:**
```bash
cd frontend
npm run dev
# Should output: Ready on http://localhost:3000
```

**Terminal 5 - Tests (Optional):**
```bash
cd frontend
npx playwright test --ui
```

---

## ✅ Integration Testing Steps

### 1. Test Database Connection

```bash
# Backend should connect to MongoDB on startup
# Check terminal 3 for: "MongoDB connected"
```

### 2. Test API Endpoints

```bash
# Test health/status endpoint
curl http://localhost:3001/api/health

# Test product listing
curl http://localhost:3001/api/products

# Test authentication
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123","name":"Test User"}'
```

### 3. Test Frontend Loads

Visit http://localhost:3000 in browser:
- [ ] Homepage loads without errors
- [ ] Navigation works
- [ ] Products load and display
- [ ] No console errors

### 4. Test Cart Flow

```
1. Visit http://localhost:3000/products
2. Click on a product
3. Click "Add to Cart"
4. Go to cart (/cart)
5. Verify product appears
```

### 5. Test Authentication

```
1. Click "Register" or go to /auth/register
2. Fill in email, password, name
3. Click register
4. Verify redirect to login
5. Enter credentials and login
6. Verify redirect to dashboard
```

### 6. Test Stripe Integration

```
1. Add product to cart
2. Go to checkout
3. Use Stripe test card: 4242 4242 4242 4242
4. Use any future expiration date
5. Use any CVC (e.g., 424)
6. Click "Pay"
7. Verify success page shows order confirmation
8. Check backend logs for webhook event
```

### 7. Test S3 Integration

```
1. Complete purchase with Stripe
2. Go to /dashboard/downloads
3. Click "Download" button
4. File should download successfully
```

### 8. Test Accessibility

```bash
# Run accessibility tests
cd frontend
npx playwright test tests/a11y/
```

### 9. Test Performance

```bash
# Run Lighthouse performance test
cd frontend
npx lighthouse http://localhost:3000 --view
```

### 10. Run Full Test Suite

```bash
# Backend tests
cd backend
npm test

# Frontend E2E tests
cd frontend
npx playwright test

# All tests with coverage
npm run test:coverage
```

---

## 🐛 Common Integration Issues & Fixes

### Issue: Backend won't connect to MongoDB

**Error:** `MongoDB connection failed`

**Fix:**
```bash
# 1. Check MongoDB is running
# 2. Verify MONGODB_URI in .env
# 3. If using MongoDB Atlas, whitelist your IP
# 4. Test connection: mongosh your_connection_string
```

### Issue: Frontend can't reach Backend API

**Error:** `CORS error` or `Failed to fetch`

**Fix:**
```bash
# 1. Verify Backend is running on port 3001
# 2. Check CORS_ORIGIN in backend .env = http://localhost:3000
# 3. Check NEXT_PUBLIC_API_BASE_URL in frontend .env.local
# 4. Restart both servers
```

### Issue: Stripe webhook not triggering

**Error:** `Order not created after payment`

**Fix:**
```bash
# 1. Verify Stripe CLI is running: stripe listen --forward-to localhost:3001/...
# 2. Check STRIPE_WEBHOOK_SECRET in .env matches Stripe CLI output
# 3. Verify webhook endpoint: POST /api/webhook/stripe
# 4. Check backend logs for webhook received message
```

### Issue: S3 upload fails

**Error:** `S3 upload error` or `403 Forbidden`

**Fix:**
```bash
# 1. Verify AWS credentials in .env
# 2. Check S3 bucket exists and bucket name is correct
# 3. Verify IAM user has PutObject and GetObject permissions
# 4. Test: aws s3 ls s3://your-bucket
```

### Issue: Tests fail with timeout

**Error:** `Timeout waiting for...`

**Fix:**
```bash
# 1. Increase timeout in playwright.config.ts: timeout: 30000
# 2. Ensure backend is running and accessible
# 3. Check network connectivity
# 4. Run single test to debug: npx playwright test auth.spec.ts
```

---

## 📦 Directory Structure After Integration

```
hip-hop-samples/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Product.ts
│   │   │   ├── User.ts
│   │   │   ├── Order.ts
│   │   │   ├── Cart.ts
│   │   │   └── Download.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   │   ├── stripe.service.ts
│   │   │   └── s3.service.ts
│   │   ├── middleware/
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx (homepage)
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── dashboard/
│   │   │   └── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── lib/
│   ├── .env.local
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── tests/
│   ├── e2e/
│   ├── integration/
│   ├── a11y/
│   ├── performance/
│   ├── fixtures/
│   └── playwright.config.ts
│
├── .github/
│   └── workflows/
│       └── test.yml
│
├── docker-compose.yml
├── PROJECT_PLAN.md
├── INTEGRATION_GUIDE.md
└── DEVELOPMENT_TRACKING.md
```

---

## 🚢 Deployment (After Testing)

### Vercel (Frontend)

```bash
# Connect your GitHub repo
# Vercel will auto-deploy on git push
# Set environment variables in Vercel dashboard:
# - NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
# - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Railway/Heroku/AWS (Backend)

```bash
# Set environment variables on hosting platform:
# - MONGODB_URI=...
# - STRIPE_SECRET_KEY=...
# - AWS_ACCESS_KEY_ID=...
# - AWS_SECRET_ACCESS_KEY=...
# - JWT_SECRET=...
# - NODE_ENV=production
# - CORS_ORIGIN=https://yourdomain.com

# Deploy
git push heroku main
# or
railway up
```

### Production Stripe Setup

```bash
# 1. Switch to Stripe live keys
# 2. Update webhook URL to production domain
# 3. Enable rate limiting
# 4. Setup email notifications
```

---

## 🔍 Monitoring & Debugging

### Backend Logs

```bash
# Check for errors
npm run dev  # Watch logs in terminal

# Use dedicated logging
# Example: npm install winston
# Log to: logs/error.log, logs/combined.log
```

### Frontend Errors

```bash
# Browser console (F12)
# Network tab to check API calls
# Application tab to check localStorage tokens
```

### Stripe Testing

```bash
# Use test cards: 4242 4242 4242 4242 (success)
# Use test cards: 4000 0000 0000 0002 (decline)
# Webhook events in Stripe Dashboard
```

### S3 Testing

```bash
# List files: aws s3 ls s3://bucket-name/
# Test upload: aws s3 cp file.txt s3://bucket-name/
# Generate signed URL: aws s3 presign s3://bucket-name/file --expires-in 86400
```

---

## ✨ Final Checks Before Launch

- [ ] All environment variables configured
- [ ] Database seeded with sample products
- [ ] Stripe test mode working
- [ ] S3 bucket configured and tested
- [ ] All tests passing (>80% coverage)
- [ ] E2E test suite complete
- [ ] Accessibility audit passing
- [ ] Performance benchmarks met
- [ ] Error handling in place
- [ ] Security audit done (no secrets in code)
- [ ] CI/CD pipeline working
- [ ] Monitoring/logging setup
- [ ] Documentation complete

---

**Integration ready!** Follow this guide to get everything working together. 🚀
