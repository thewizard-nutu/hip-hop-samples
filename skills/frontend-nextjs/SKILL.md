---
name: frontend-nextjs
description: Build, optimize, and test Next.js applications with TypeScript, React components, Tailwind CSS, and E2E testing. Use when scaffolding projects, creating components, implementing routing, optimizing performance, or debugging UI issues.
---

# Frontend Agent - Next.js Specialist

## Quick Start

### Project Scaffolding

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm install zustand axios react-hook-form zod
```

### Core Structure

```
src/
├── app/              # App router (Next.js 13+)
│   ├── layout.tsx
│   ├── page.tsx
│   └── [routes]/page.tsx
├── components/       # Reusable React components
│   ├── ui/          # Base components (Button, Card, Input)
│   ├── layouts/     # Page layouts
│   └── common/      # App-specific components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── types/           # TypeScript types/interfaces
└── __tests__/       # Test files (co-located)
```

## Component Development

### Best Practices

1. **Use Server Components by default** - Client components only when needed (state, effects, interactivity)
2. **Type everything** - Props interfaces, return types, state shapes
3. **Composition over props** - Break complex components into smaller pieces
4. **CSS-in-JS with Tailwind** - Utility-first, avoid custom CSS when possible

### Example Component (TypeScript)

```typescript
'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'highlighted';
  className?: string;
}

export const Card = ({ 
  title, 
  children, 
  variant = 'default',
  className = ''
}: CardProps) => {
  return (
    <div 
      className={clsx(
        'rounded-lg border p-4 shadow-sm',
        variant === 'highlighted' && 'border-blue-500 bg-blue-50',
        className
      )}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};
```

## API Integration

### Fetching Data (Server-Side)

```typescript
// app/dashboard/page.tsx
import { ApiClient } from '@/lib/api-client';

export default async function DashboardPage() {
  const data = await ApiClient.get('/api/dashboard');
  return <Dashboard data={data} />;
}
```

### Client-Side with React Query Pattern

```typescript
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApi = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get<T>(url)
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};
```

### Form Handling with React Hook Form + Zod

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

type FormData = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    // Handle response
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Login</button>
    </form>
  );
};
```

## Testing

### Unit Tests (Jest + React Testing Library)

```typescript
// components/__tests__/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card Component', () => {
  it('renders title and children', () => {
    render(
      <Card title="Test Card">
        <p>Test content</p>
      </Card>
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies highlighted variant', () => {
    render(
      <Card title="Highlighted" variant="highlighted">
        Content
      </Card>
    );
    
    const card = screen.getByText('Highlighted').parentElement;
    expect(card).toHaveClass('bg-blue-50');
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[placeholder="Password"]', 'password123');
  await page.click('button:has-text("Login")');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('text=Welcome')).toBeVisible();
});
```

## Performance Optimization

### Image Optimization
- Always use Next.js `Image` component
- Set explicit width/height
- Use `priority` for LCP images

```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Code Splitting & Lazy Loading

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if needed
});
```

### Metadata & SEO

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Amazing application',
  openGraph: {
    type: 'website',
    url: 'https://example.com',
    title: 'My App',
    description: 'Amazing application',
  },
};
```

## Environment & Configuration

### .env.local

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=mongodb://...
JWT_SECRET=your-secret
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@mui/material'],
  },
};

module.exports = nextConfig;
```

## Essential Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "clsx": "^2.0.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.2.0",
    "jest": "^29.7.0",
    "@playwright/test": "^1.40.0",
    "eslint": "^8.50.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

## Common Tasks

### Run dev server
```bash
npm run dev
```

### Type check
```bash
npm run type-check
```

### Run tests
```bash
npm test                    # Unit tests
npm run e2e                # E2E tests
npm run test:coverage      # Coverage report
```

### Build for production
```bash
npm run build
npm start
```

## State Management (Zustand)

```typescript
import { create } from 'zustand';

interface AppStore {
  user: any | null;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// Usage in component
'use client';
import { useAppStore } from '@/lib/store';

export const Profile = () => {
  const { user, logout } = useAppStore();
  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Hydration mismatch | Remove `'use client'` if not needed; ensure SSR state matches client |
| Slow image loading | Use `Image` component with `priority` for LCP; optimize image format |
| Stale cache | Add `revalidate: 0` to `fetch()` or use `revalidatePath()` in Server Actions |
| Type errors | Check strict: true in tsconfig.json; verify all types are imported |

