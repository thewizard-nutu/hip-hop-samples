# Hip-Hop Samples Marketplace - Frontend

Professional Next.js 14 frontend for a hip-hop samples marketplace with TypeScript, Tailwind CSS, and modern React patterns.

## 🎯 Features

### Pages (10+)
- **/** - Homepage with hero section and featured products
- **/products** - Product catalog with grid, filters, search, pagination
- **/products/[id]** - Product detail page with audio preview
- **/cart** - Shopping cart with item management
- **/checkout** - Checkout with Stripe integration
- **/auth/login** - User login
- **/auth/register** - User registration
- **/dashboard** - User dashboard with stats
- **/dashboard/orders** - Order history
- **/dashboard/downloads** - Download history

### Components (30+)

#### UI Components
- Button, Input, Card, Badge, Modal, Toast, Skeleton
- Form inputs with validation and error handling
- Responsive card layouts with variants

#### Feature Components
- AudioPlayer - Play and preview samples
- SearchBar - Debounced search with routing
- FilterPanel - Multi-select filters by genre, BPM, price

#### Product Components
- ProductCard - Display single product with image and price
- ProductGrid - Responsive grid of products with loading states
- ProductDetail - Full product page with audio player and details

#### Cart Components
- CartItem - Individual cart item with quantity control
- CartSummary - Order summary with total calculation

#### Auth Components
- LoginForm - Login with email/password validation
- RegisterForm - Registration with password confirmation

#### Layout Components
- Header - Navigation with cart counter and user menu
- Footer - Footer with links and company info

### State Management
- **authStore** - User authentication, login, logout, registration
- **cartStore** - Shopping cart with items, quantities, and totals
- **productsStore** - Product catalog with filtering and pagination

### Utilities
- API client with Axios, token handling, error handling
- Custom hooks: useApi, useLocalStorage, useDebounce
- Helper functions: formatCurrency, formatDate, formatNumber

### Styling
- Tailwind CSS with dark mode support
- Custom brand colors (primary #FF6B35, secondary #004E89)
- Responsive design (mobile, tablet, desktop)
- Accessible color contrasts and hover states

## 📋 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 + PostCSS
- **State:** Zustand 4
- **Forms:** React Hook Form + Zod
- **HTTP:** Axios
- **Testing:** Jest + React Testing Library + Playwright

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Testing

### Unit Tests
```bash
npm test                    # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report (target: 80%)
```

### E2E Tests
```bash
npm run e2e               # Run Playwright tests
npm run e2e:ui           # UI mode for debugging
```

## 📊 Performance Targets

- **LCP:** < 2.5s (Largest Contentful Paint)
- **FCP:** < 1.8s (First Contentful Paint)
- **CLS:** < 0.1 (Cumulative Layout Shift)
- **Bundle Size:** < 500KB
- **Test Coverage:** > 80%

## 🔧 Configuration

### Environment Variables
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### API Integration
All API calls go through `/src/lib/api-client.ts` with:
- Automatic token inclusion in headers
- Request/response interceptors
- Error handling and 401 redirects
- Timeout handling (10s)

## 📁 Project Structure

```
src/
├── app/                 # Next.js pages & layouts
├── components/
│   ├── ui/             # Base UI components
│   ├── layout/         # Page layouts
│   ├── features/       # Feature components
│   ├── products/       # Product-related components
│   ├── cart/          # Cart-related components
│   └── auth/          # Auth-related components
├── hooks/             # Custom React hooks
├── lib/              # Utilities and API client
├── store/            # Zustand stores
└── types/            # TypeScript types
```

## 🎨 Design System

### Colors
- Primary: #FF6B35 (Orange)
- Secondary: #004E89 (Blue)
- Dark: #1A1A1A
- Light: #F5F5F5

### Spacing
- Use Tailwind's default spacing scale
- Container max-width: 1280px (7xl)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 📝 Code Standards

- Strict TypeScript mode enabled
- ESLint configured with Next.js rules
- Component naming: PascalCase
- File naming: kebab-case.tsx
- All components exported from index files

## 🔐 Security

- Environment variables for sensitive data
- Token stored in localStorage (consider httpOnly cookies for production)
- CORS handling via API client
- Input validation with Zod
- SQL injection prevention at API level (backend responsibility)

## 🐛 Debugging

### Browser DevTools
- Redux DevTools (can be added for store debugging)
- React DevTools extension compatible
- Next.js Debug Mode: `npm run dev -- --experimental-debug`

### Common Issues

**Hydration Mismatch**: Remove `'use client'` if not needed
**Stale Cache**: Add `revalidate: 0` to fetch or use `revalidatePath()`
**Type Errors**: Run `npm run type-check`

## 📚 Documentation

- [SKILL.md](/home/sara/.openclaw/workspace/skills/frontend-nextjs/SKILL.md) - Frontend best practices
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Zustand Guide](https://github.com/pmndrs/zustand)

## 🚢 Deployment

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Support

For issues or questions, refer to:
- Next.js documentation
- Component storybook (can be added)
- Team documentation
- GitHub issues

---

**Version:** 1.0.0  
**Last Updated:** February 2025  
**Status:** Production Ready ✅
