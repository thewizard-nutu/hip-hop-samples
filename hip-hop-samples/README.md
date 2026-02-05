# 🎵 Hip-Hop Drum Samples Marketplace

Professional e-commerce platform for selling music samples, loops, and drum kits.

**Stack:** Next.js + Node.js/Express + MongoDB + Stripe + AWS S3

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account (free tier OK)
- AWS S3 bucket (optional, can mock locally)
- Git

### Setup (5 minutes)

**1. Clone & Install**
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

**2. Configure Environment**

Backend (.env):
```
MONGODB_URI=mongodb://localhost:27017/hip-hop-samples
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=dev-secret-key
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=samples
PORT=3001
```

Frontend (.env.local):
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**3. Start Services**

Terminal 1:
```bash
cd backend && npm run dev
# Backend ready on http://localhost:3001
```

Terminal 2:
```bash
cd frontend && npm run dev
# Frontend ready on http://localhost:3000
```

Terminal 3 (Optional - Stripe webhooks):
```bash
stripe listen --forward-to localhost:3001/api/webhook/stripe
```

---

## 📖 Documentation

- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - Project overview and architecture
- **[DEVELOPMENT_TRACKING.md](./DEVELOPMENT_TRACKING.md)** - Agents progress tracking
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Full integration instructions

---

## 🎯 Features

### Product Management
✅ Catalog with 100+ drum samples/loops  
✅ Advanced search and filtering  
✅ Category, tags, BPM, key filtering  
✅ Product preview (30s audio sample)  
✅ Waveform display  
✅ Related products  

### Shopping
✅ Shopping cart (persistent)  
✅ Quick add to cart  
✅ Cart management (update qty, remove)  
✅ Cart total calculation  

### Checkout & Payment
✅ Stripe payment integration  
✅ Secure checkout flow  
✅ Order confirmation  
✅ Email notifications  
✅ Webhook handling for payment events  

### Downloads & User Account
✅ User registration & authentication  
✅ Download management  
✅ Order history  
✅ Download history  
✅ User profile settings  
✅ Secure 24-hour download links  

### Technical
✅ Responsive design (mobile-first)  
✅ Dark mode support  
✅ Accessibility (WCAG 2.1 AA)  
✅ Performance optimized  
✅ Security best practices  
✅ Comprehensive tests (E2E, unit, integration)  
✅ CI/CD automation (GitHub Actions)  

---

## 🏗️ Architecture

### Backend (Node.js/Express)
- REST API with JWT authentication
- MongoDB database with Mongoose
- Stripe payment processing
- AWS S3 file storage & signed URLs
- Webhook handling for payment events
- Error handling & validation

### Frontend (Next.js 14)
- App Router for routing
- React components with TypeScript
- Tailwind CSS styling
- Zustand for state management
- React Hook Form for forms
- Axios for API calls

### Database (MongoDB)
```
Products
├── title, description, price
├── category, tags, bpm, key
├── sampleUrl (S3), previewUrl
└── ...

Users
├── email, password (hashed)
├── name, profileImage
├── downloadedProducts[]
└── stripeCustomerId

Orders
├── userId, productIds[]
├── totalPrice, stripePaymentId
├── downloadUrls[], status
└── ...

Carts
├── userId
├── items (products)
└── totalPrice
```

---

## 📋 API Endpoints

### Authentication
```
POST   /api/auth/register        Register user
POST   /api/auth/login           Login
POST   /api/auth/logout          Logout
```

### Products
```
GET    /api/products             List products (with filters)
GET    /api/products/:id         Get product details
```

### Shopping Cart
```
POST   /api/cart                 Add to cart
GET    /api/cart                 Get user cart
PUT    /api/cart/:productId      Update cart item
DELETE /api/cart/:productId      Remove from cart
DELETE /api/cart                 Clear cart
```

### Checkout & Orders
```
POST   /api/checkout             Create checkout session
GET    /api/orders               Get user orders
GET    /api/downloads/:orderId   Get download links
```

### Webhooks
```
POST   /api/webhook/stripe       Stripe webhook handler
```

---

## 🧪 Testing

### Run All Tests
```bash
npm run test                # All tests
npm run test:unit          # Unit tests only
npm run test:e2e           # E2E tests only
npm run test:coverage      # With coverage
```

### Test Coverage
Target: >80% code coverage

### E2E Test Scenarios
- Authentication (register, login, logout)
- Product browsing (search, filter, pagination)
- Shopping cart (add, remove, update)
- Checkout & payment (valid & invalid cards)
- Downloads & order management
- User settings

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Auto-deploy on GitHub push
# Set env vars in Vercel dashboard
```

### Backend (Railway/Heroku/AWS)
```bash
# Deploy Node.js app
# Configure environment variables
# Setup CI/CD pipeline
```

### Environment Variables (Production)
```
# All sensitive keys should be:
# - Set in hosting platform
# - Never committed to git
# - Different from development keys
# - Rotated regularly
```

---

## 📊 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Homepage LCP | <2.5s | ✅ |
| Products Page FCP | <1.8s | ✅ |
| Checkout CLS | <0.1 | ✅ |
| Bundle Size | <500KB | ✅ |
| API Response | <500ms | ✅ |

---

## 🔒 Security Features

✅ JWT authentication  
✅ Password hashing (bcryptjs)  
✅ CORS protection  
✅ Input validation & sanitization  
✅ Rate limiting  
✅ Secure file storage (S3)  
✅ HTTPS ready  
✅ XSS & CSRF protection  

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎓 Tech Stack Details

### Frontend
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Hook Form
- Zod (validation)
- Axios (HTTP client)
- Stripe JS
- Jest + Playwright (testing)

### Backend
- Node.js 18+
- Express 4+
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- Stripe SDK
- AWS SDK v3
- Jest + Supertest (testing)

### DevOps
- GitHub Actions (CI/CD)
- Docker (containerization, optional)
- Vercel (frontend hosting)
- Railway/AWS (backend hosting)

---

## 📝 Project Structure

```
hip-hop-samples/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── tests/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── lib/
│   ├── tests/
│   └── package.json
│
├── tests/
│   ├── e2e/
│   ├── integration/
│   ├── a11y/
│   └── performance/
│
├── docs/
│   ├── PROJECT_PLAN.md
│   ├── INTEGRATION_GUIDE.md
│   └── DEVELOPMENT_TRACKING.md
│
└── .github/
    └── workflows/
```

---

## 🐛 Troubleshooting

### Backend Connection Issues
```bash
# Check MongoDB running: mongosh
# Check .env configuration
# Verify MONGODB_URI is correct
```

### CORS Errors
```bash
# Verify CORS_ORIGIN in backend .env
# Restart backend server
# Check frontend API URL
```

### Stripe Integration Issues
```bash
# Verify test keys are correct
# Stripe CLI webhook running
# Check webhook endpoint in code
```

### S3 Upload Errors
```bash
# Verify AWS credentials
# Check S3 bucket exists
# Verify IAM permissions
# Test: aws s3 ls s3://bucket-name
```

---

## 📞 Support

For issues and questions:
1. Check documentation in `/docs`
2. Review integration guide
3. Check test files for examples
4. Review error logs

---

## 📄 License

MIT

---

## 🎉 Getting Started

1. Clone repository
2. Follow Quick Start above
3. Read PROJECT_PLAN.md
4. Check INTEGRATION_GUIDE.md
5. Run tests: `npm run test`
6. Start developing!

---

**Ready to sell music samples?** Start the application and begin building! 🎵

For complete integration instructions, see [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
