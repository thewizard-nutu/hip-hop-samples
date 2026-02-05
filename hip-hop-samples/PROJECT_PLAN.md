# 🎵 Hip-Hop Drum Samples Marketplace

**Projeto:** Sistema completo de venda de samples e loops de música  
**Stack:** Next.js + Node.js/Express + MongoDB + Stripe + AWS S3  
**Timeline:** 3-5 dias (paralelo)

## 📋 Arquitetura

### Backend
- REST API com autenticação JWT
- Integração Stripe (pagamentos, webhooks)
- AWS S3 (upload/download de samples)
- MongoDB (Products, Users, Orders, Carts)

### Frontend  
- Next.js 14+ (App Router)
- Catálogo com busca/filtros
- Carrinho de compras
- Checkout Stripe
- Área de usuário (downloads, histórico)
- Player de áudio

### Testing
- E2E tests completos
- Testes de pagamento
- Performance testing
- Accessibility

## 🎯 Fases

### FASE 1: Backend Foundation (Paralelo)
- [ ] Database Schema (Product, Sample, User, Order, Cart)
- [ ] S3 Integration
- [ ] Stripe Integration (Payment, Webhook)
- [ ] Auth Endpoints
- [ ] Product CRUD

### FASE 2: Frontend (Paralelo)
- [ ] Homepage + Catálogo
- [ ] Busca e Filtros
- [ ] Carrinho
- [ ] Checkout Stripe
- [ ] Perfil do Usuário

### FASE 3: QA (Paralelo)
- [ ] E2E Tests
- [ ] Performance Tests
- [ ] Accessibility Tests
- [ ] CI/CD Setup

## 💾 Database Schema Overview

```
Product
├── title, description, price
├── category, tags, artist
├── sampleUrl (S3), waveformImage
├── previewUrl, duration
├── downloads, rating
└── createdAt

User
├── email, password (hashed)
├── name, profileImage
├── downloadedSamples[]
├── stripeCustomerId
└── createdAt

Order
├── userId, productIds[]
├── totalPrice, stripePaymentId
├── downloadUrls[]
├── status (completed, failed)
└── createdAt

Cart
├── userId, productIds[], totalPrice
└── createdAt
```

## 🔑 API Endpoints Overview

```
POST /api/auth/register
POST /api/auth/login
GET /api/products (filtros, busca)
GET /api/products/:id
POST /api/cart
PUT /api/cart/:productId
DELETE /api/cart/:productId
POST /api/checkout (Stripe)
GET /api/orders (user orders)
GET /api/downloads (signed URLs)
POST /api/webhook/stripe
```

## 💳 Stripe Flow

1. Frontend → Criar Checkout Session
2. Redirect para Stripe Hosted Checkout
3. Payment Success → Webhook notification
4. Backend → Create Order + Generate download URLs
5. Frontend → Show downloads + send email

---

**Status:** Iniciando AGORA com 3 agentes em paralelo! 🚀
