# 🚀 Deployment Guide

## Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn
- Git

### Setup
```bash
git clone <repository>
cd workspace-frontend
npm install
```

### Running Locally
```bash
# Development mode with hot reload
npm run dev

# Open http://localhost:3000 in your browser
```

### Environment Setup
Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Testing Before Deployment

### Type Checking
```bash
npm run type-check
```

### Unit & Integration Tests
```bash
npm test
```

### E2E Tests
```bash
npm run e2e
```

### Build Verification
```bash
npm run build
npm start
```

## Production Build

### Build Optimization
```bash
# Create optimized production build
npm run build

# This generates:
# - .next/ folder with optimized code
# - Static HTML pages where possible
# - Server-side rendered pages
# - API routes compiled
```

### Bundle Analysis
```bash
# Check bundle size
npm run build

# Look for large dependencies:
# - Check .next/static/chunks/
# - Monitor main bundle sizes
```

## Deployment Options

### Option 1: Vercel (Recommended)

#### Setup
```bash
npm i -g vercel
vercel login
```

#### Deploy
```bash
vercel
# Follow prompts to connect repository and deploy
```

#### Configuration
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "@api_base_url",
    "NEXT_PUBLIC_APP_URL": "@app_url"
  }
}
```

#### Auto-Deployment
- Vercel auto-deploys on push to main branch
- Preview deployments on pull requests
- Easy rollbacks and analytics

### Option 2: Docker

#### Dockerfile
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
```

#### Build & Run
```bash
# Build image
docker build -t hip-hop-samples-marketplace .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://api:3001 \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  hip-hop-samples-marketplace
```

#### Docker Compose
```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_BASE_URL: http://backend:3001
      NEXT_PUBLIC_APP_URL: http://localhost:3000
    depends_on:
      - backend
    
  backend:
    image: backend:latest
    ports:
      - "3001:3001"
```

### Option 3: AWS

#### Using AWS Amplify
```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

#### Using EC2
1. Launch Ubuntu 20.04 LTS instance
2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. Clone and setup:
   ```bash
   git clone <repo>
   cd workspace-frontend
   npm install
   npm run build
   ```
4. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start npm --name "frontend" -- start
   pm2 save
   sudo pm2 startup
   ```
5. Setup Nginx as reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 4: Netlify

#### Deploy
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Environment Variables

### Production
```env
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Staging
```env
NEXT_PUBLIC_API_BASE_URL=https://api-staging.yourdomain.com
NEXT_PUBLIC_APP_URL=https://staging.yourdomain.com
```

### Development
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## SSL/HTTPS

### Vercel
- Automatic SSL via Let's Encrypt
- Managed by Vercel

### Docker
- Use Traefik or Caddy for automatic SSL
- Or setup Let's Encrypt with Certbot

### AWS
- Use CloudFront + ACM for SSL
- Or ALB with SSL listener

## Monitoring & Logging

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
```

#### sentry.client.config.js
```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Vercel Analytics
- Built-in Web Vitals
- Performance metrics
- Error reporting

### CloudWatch (AWS)
```bash
npm install aws-sdk
```

## Performance Optimization

### Image Optimization
- Next.js Image component handles resizing
- Automatic WebP conversion
- Lazy loading by default

### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components

### Caching
- Static pages cached at CDN
- Revalidation strategies:
  ```typescript
  export const revalidate = 3600; // 1 hour
  ```

## CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      
      - name: Install
        run: npm ci
      
      - name: Type Check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Test
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Rollback Procedure

### Vercel
```bash
vercel rollback
```

### Docker
```bash
# Stop current container
docker stop <container-id>

# Run previous image
docker run -p 3000:3000 <previous-image>
```

### Manual
```bash
# Revert to previous commit
git revert <commit-hash>
git push origin main
# Redeploy
```

## Monitoring Checklist

- [ ] Monitor error rates
- [ ] Check response times
- [ ] Verify database connections
- [ ] Monitor API rate limits
- [ ] Check disk space
- [ ] Monitor memory usage
- [ ] Verify SSL certificates
- [ ] Check uptime status

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set security headers
- [ ] Enable CORS correctly
- [ ] Validate environment variables
- [ ] Rotate secrets regularly
- [ ] Enable DDoS protection (WAF)
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Scaling Considerations

### Horizontal Scaling
- Deploy multiple instances
- Use load balancer
- Share session storage

### Caching Strategy
- CDN for static assets
- Redis for session/data
- Database query caching

### Database Optimization
- Add indexes
- Use connection pooling
- Implement query caching

## Troubleshooting

### 502 Bad Gateway
- Check backend API is running
- Verify API endpoint in env vars
- Check server logs

### High Memory Usage
- Check for memory leaks
- Use memory profiler
- Increase instance size

### Slow Performance
- Check Core Web Vitals
- Profile with Lighthouse
- Check database queries
- Analyze bundle size

## Success Criteria

- ✅ Build completes without errors
- ✅ Type checking passes
- ✅ All tests pass
- ✅ Core Web Vitals meet targets
- ✅ No console errors/warnings
- ✅ API endpoints respond
- ✅ Authentication works
- ✅ Cart persistence works

---

**Last Updated:** February 2025  
**Next Step:** Integration with backend API (Atlas)
