# ⚡ Quick Start Guide

## What's Included?

A **production-ready Next.js 14 frontend** for the Hip-Hop Samples Marketplace with:
- 10+ pages (homepage, products, cart, auth, dashboard)
- 30+ reusable components
- Complete state management (Zustand)
- Full test suite (Jest + Playwright)
- Beautiful dark mode UI with Tailwind CSS

## Getting Started (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit: **http://localhost:3000**

### 3. View Pages
- Homepage: http://localhost:3000
- Products: http://localhost:3000/products
- Login: http://localhost:3000/auth/login
- Dashboard: http://localhost:3000/dashboard

## Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Create production build
npm start              # Start production server

# Quality
npm run type-check     # TypeScript type checking
npm run lint           # ESLint
npm test               # Unit tests
npm run test:watch    # Tests in watch mode
npm run e2e           # End-to-end tests

# Analytics
npm run test:coverage # Test coverage report
```

## Project Structure

```
src/
├── app/          # Pages (routes)
├── components/   # React components
├── hooks/       # Custom hooks
├── lib/         # Utilities & API
├── store/       # State management
└── types/       # TypeScript types
```

## Key Features

### 🛍️ Shopping Cart
- Persistent storage (localStorage)
- Real-time total calculation
- Quantity management

### 🔐 Authentication
- Email/password login
- User registration
- Protected routes

### 🎵 Product Browsing
- Search with debouncing
- Genre and BPM filters
- Audio preview player
- Product details

### 👤 User Dashboard
- View orders
- Download history
- Account statistics

## Configuration

### API Endpoint
Edit `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database/Backend
The frontend expects a backend API at `http://localhost:3001` with endpoints:
- `POST /auth/login`
- `POST /auth/register`
- `GET /products`
- `GET /products/:id`
- `POST /orders`

## Customization

### Change Brand Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#YOUR_COLOR',
        secondary: '#YOUR_COLOR',
      }
    }
  }
}
```

### Add New Page
1. Create file: `src/app/mypage/page.tsx`
2. Use existing components
3. It's automatically routed to `/mypage`

### Add New Component
1. Create: `src/components/mycomponent/MyComponent.tsx`
2. Export from `index.ts`
3. Import and use in pages

## Common Tasks

### Add API Integration
```typescript
// In your component
import { useApi } from '@/hooks';

export default function MyComponent() {
  const { data, loading, error } = useApi('/products');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data.items.length} products</div>;
}
```

### Use State Management
```typescript
// In component
import { useCartStore } from '@/store';

export default function Button() {
  const { addItem } = useCartStore();
  
  return (
    <button onClick={() => addItem(product, 1)}>
      Add to Cart
    </button>
  );
}
```

### Form Validation
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

## Testing

### Run Tests
```bash
npm test                    # All tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
npm run e2e              # E2E tests
```

### Write a Test
```typescript
// src/components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```bash
docker build -t marketplace .
docker run -p 3000:3000 marketplace
```

### Manual
```bash
npm run build
npm start
```

## Performance Tips

1. **Use Next.js Image Component**
   ```typescript
   import Image from 'next/image';
   <Image src="/photo.jpg" alt="Photo" width={600} height={400} />
   ```

2. **Lazy Load Components**
   ```typescript
   import dynamic from 'next/dynamic';
   const Heavy = dynamic(() => import('./Heavy'), { ssr: false });
   ```

3. **Optimize API Calls**
   ```typescript
   const { data, refetch } = useApi('/products', { skip: true });
   // Call refetch() when needed
   ```

## Debugging

### React DevTools
Install React Developer Tools browser extension to inspect components.

### Next.js Debug Mode
```bash
npm run dev -- --experimental-debug
```

### Browser Console
Check for errors and warnings in the console.

## Environment Variables

```env
# Required
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Node Modules Issue
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Error
```bash
npm run type-check   # Check TypeScript
npm run lint        # Check ESLint
npm run build       # Full build
```

## File Naming Conventions

- **Pages:** `src/app/pagename/page.tsx`
- **Components:** `src/components/ComponentName.tsx`
- **Hooks:** `src/hooks/useHookName.ts`
- **Stores:** `src/store/storeNameStore.ts`
- **Tests:** `src/components/__tests__/Component.test.tsx`

## Component Template

```typescript
'use client'; // Add if component needs interactivity

import React from 'react';
import { Button } from '@/components/ui';

interface ComponentProps {
  title: string;
  children?: React.ReactNode;
}

const MyComponent: React.FC<ComponentProps> = ({ title, children }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
      <Button>Click me</Button>
    </div>
  );
};

export default MyComponent;
```

## Resources

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 📦 [Zustand](https://github.com/pmndrs/zustand)
- 📝 [React Hook Form](https://react-hook-form.com)
- ✔️ [Zod Validation](https://zod.dev)

## Need Help?

1. Check `README.md` for detailed setup
2. Review `PROJECT_SUMMARY.md` for features
3. See `DEPLOYMENT.md` for production
4. Read component JSDoc comments
5. Check test files for examples

---

**Happy coding! 🎵**

*Built by Luna - Frontend Engineer*
