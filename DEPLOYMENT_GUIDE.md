# 🚀 Deployment Guide - Hip-Hop Samples Marketplace

Complete guide to deploy the Hip-Hop Samples Marketplace to production.

---

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub repo created and pushed
- ✅ All tests passing locally (`npm test`)
- ✅ Environment variables configured
- ✅ Stripe account with test & production keys
- ✅ AWS S3 bucket created
- ✅ MongoDB Atlas account (or self-hosted MongoDB)

---

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│   Vercel (Frontend)             │
│   - Next.js 14                  │
│   - Automatic deployments       │
│   - Edge functions              │
└──────────────┬──────────────────┘
               │ HTTPS
               │
┌──────────────▼──────────────────┐
│   Railway/Render (Backend)      │
│   - Node.js/Express             │
│   - MongoDB connection          │
│   - Stripe webhooks             │
│   - S3 integration              │
└──────────────┬──────────────────┘
               │
       ┌───────┼───────┐
       │               │
  ┌────▼────┐    ┌────▼────┐
  │ MongoDB  │    │ AWS S3  │
  │ Atlas    │    │ Bucket  │
  └──────────┘    └─────────┘
```

---

## 🎯 Deployment Options

### Option 1: Vercel + Railway (Recommended) ⭐

**Best for:** Beginners, fast setup, automatic deployments

#### Step 1: Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from frontend directory
cd apps/frontend
vercel --prod
```

**Vercel Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://hip-hop-samples-api.railway.app
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
```

#### Step 2: Deploy Backend to Railway

1. **Create Railway Account:** https://railway.app
2. **Connect GitHub:** Railway → New → GitHub Repo
3. **Select:** `hip-hop-samples` repository
4. **Configure:**
   - Root directory: `apps/backend`
   - Build command: `npm run build`
   - Start command: `npm start`

5. **Set Environment Variables in Railway:**
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `JWT_SECRET`: Generate secure key
   - `STRIPE_SECRET_KEY`: From Stripe dashboard
   - `STRIPE_WEBHOOK_SECRET`: From Stripe (after deploying)
   - `AWS_*`: Your AWS credentials

6. **Deploy:** Railway auto-deploys on push to master

#### Step 3: Update Stripe Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Create new endpoint:
   - URL: `https://hip-hop-samples-api.railway.app/webhooks/stripe`
   - Events: `checkout.session.completed`, `charge.failed`, `charge.refunded`
3. Copy webhook secret to Railway `STRIPE_WEBHOOK_SECRET`

---

### Option 2: Docker + AWS/GCP/DigitalOcean

**Best for:** Advanced users, full control

#### Prerequisites
- Docker Hub account
- Cloud provider account (AWS, GCP, or DigitalOcean)

#### Build & Push Docker Image

```bash
# Build backend image
cd apps/backend
docker build -t thewizard-nutu/hip-hop-samples-backend:latest .
docker push thewizard-nutu/hip-hop-samples-backend:latest

# Build frontend image
cd ../frontend
docker build -t thewizard-nutu/hip-hop-samples-frontend:latest .
docker push thewizard-nutu/hip-hop-samples-frontend:latest
```

#### Deploy on DigitalOcean App Platform

1. Create App Platform project
2. Connect GitHub repo
3. Configure components:
   - Frontend: Next.js, port 3000
   - Backend: Node.js, port 3001
4. Set environment variables
5. Deploy

---

### Option 3: Full Stack on AWS

**Best for:** Enterprise, scaling requirements

#### Use AWS CloudFormation or Terraform

```bash
# Infrastructure as Code approach
terraform init
terraform apply
```

---

## ✅ Post-Deployment Checklist

### Frontend (Vercel)

- [ ] Site loads at your domain
- [ ] API calls work (check Network tab)
- [ ] Authentication flow works
- [ ] Product catalog displays
- [ ] Stripe checkout works (test cards)
- [ ] File downloads work
- [ ] Dark mode works
- [ ] Mobile responsive

### Backend (Railway)

- [ ] API health check: `curl https://your-api.railway.app/health`
- [ ] Stripe webhooks receiving events
- [ ] Database queries executing
- [ ] S3 uploads working
- [ ] Error logs available
- [ ] Rate limiting active
- [ ] CORS configured correctly

### Full Stack

- [ ] E2E tests passing
- [ ] User can register & login
- [ ] User can browse products
- [ ] User can add to cart
- [ ] User can checkout with Stripe
- [ ] User can download samples
- [ ] Admin can view orders
- [ ] Emails sending (if configured)

---

## 📊 Monitoring & Logging

### Vercel

- Dashboard: https://vercel.com/dashboard
- Real-time logs: Vercel → Project → Deployments → Logs
- Analytics: Vercel → Project → Analytics
- Error tracking: Vercel → Project → Error Reports

### Railway

- Dashboard: https://railway.app
- Logs: Railway → Project → Deployments → View Logs
- Metrics: Railway → Project → Metrics
- Environment: Railway → Project → Settings → Variables

### Application Logging

Backend logs go to `logs/` directory and stdout:
```bash
# View logs
tail -f logs/app.log

# Production logging via Railway:
railway logs -f
```

---

## 🔐 Security Checklist

- [ ] All secrets in environment variables (not in code)
- [ ] HTTPS enabled (automatic on Vercel/Railway)
- [ ] CORS configured for your domain
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Password hashing enabled (bcryptjs)
- [ ] JWT token expiry configured (7 days)
- [ ] Database credentials secured
- [ ] S3 bucket permissions restricted
- [ ] Stripe webhook secret verified
- [ ] No console.log in production code
- [ ] Error messages don't leak sensitive info

---

## 🎯 Performance Optimization

### Frontend

```bash
# Check build size
npm run build -w apps/frontend
# Look for: "Analyzed package size"

# Run Lighthouse audit
npx lighthouse https://your-domain.com
```

Target metrics:
- LCP: < 2.5s
- FCP: < 1.5s
- CLS: < 0.1
- TTI: < 3.5s

### Backend

```bash
# Monitor response times
npm run dev -w apps/backend

# Test API response time
time curl https://your-api.railway.app/products
# Target: < 500ms
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Automatic testing & deployment on push:

1. **Push to `master`** → GitHub Actions runs tests
2. **Tests pass** → Automatic deployment to Vercel & Railway
3. **Deployment successful** → Site updates automatically

View status: GitHub → Repo → Actions

---

## 🆘 Troubleshooting

### Frontend Issues

**"API_URL is undefined"**
```bash
# Check environment variables in Vercel
vercel env list

# Re-deploy with correct env vars
vercel deploy --prod
```

**Build fails with "module not found"**
```bash
# Rebuild dependencies
rm -rf node_modules
npm install
npm run build
```

### Backend Issues

**MongoDB connection failed**
```bash
# Check connection string
mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true

# Test connection
mongosh "mongodb+srv://..." --eval "db.adminCommand('ping')"
```

**Stripe webhook not triggering**
```bash
# Check webhook URL is public
curl https://your-api.railway.app/health

# Verify webhook secret matches
echo $STRIPE_WEBHOOK_SECRET
```

### Database Issues

**High query times**
- Add MongoDB indexes
- Check network latency
- Monitor database CPU/RAM

**Out of storage**
- Increase MongoDB Atlas tier
- Archive old data
- Clean up old sessions

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Stripe API:** https://stripe.com/docs/api
- **MongoDB:** https://docs.mongodb.com
- **AWS S3:** https://docs.aws.amazon.com/s3/
- **Next.js:** https://nextjs.org/docs
- **Express:** https://expressjs.com/

---

## 🎉 You're Live!

Your Hip-Hop Samples Marketplace is now in production! 🚀

**Next steps:**
1. Monitor logs & metrics
2. Gather user feedback
3. Plan feature updates
4. Scale as needed

**Celebrate! You built a complete full-stack marketplace!** 🎤🥁✨
