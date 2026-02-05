# Agent Commands Reference

Guia rápido para usar os 3 agentes do seu time.

## Quick Spawn

### Via CLI (Recommended)

```bash
# Frontend Agent
openclaw sessions spawn \
  --task="Crie um componente de botão reutilizável em React com TypeScript" \
  --label="Frontend: Button Component" \
  --timeoutSeconds=600

# Backend Agent
openclaw sessions spawn \
  --task="Crie um endpoint POST /api/users com validação de email" \
  --label="Backend: Create User Endpoint" \
  --timeoutSeconds=600

# QA Agent
openclaw sessions spawn \
  --task="Crie testes E2E para o fluxo de login com Playwright" \
  --label="QA: Login Tests" \
  --timeoutSeconds=600
```

### Via Menu Interativo

```bash
# Make script executable
chmod +x scripts/team-spawn.sh

# Run menu
./scripts/team-spawn.sh
```

---

## Common Workflows

### 1. Build Complete Feature (E2E)

```bash
# 1. Backend creates data model
openclaw sessions spawn \
  --task="Create MongoDB schema for Blog Posts: title, content, author, tags, createdAt. Add proper validation and indexes." \
  --label="Backend: Blog Schema"

# 2. Backend creates API
openclaw sessions spawn \
  --task="Create REST API endpoints for Blog: GET /posts (paginated), GET /posts/:id, POST /posts, PUT /posts/:id, DELETE /posts/:id. Include proper validation and error handling." \
  --label="Backend: Blog API"

# 3. Frontend creates UI
openclaw sessions spawn \
  --task="Create Next.js pages and components for Blog: list view with pagination, detail view, create/edit form. Integrate with backend API." \
  --label="Frontend: Blog UI"

# 4. QA tests everything
openclaw sessions spawn \
  --task="Create comprehensive E2E tests for Blog feature: list, view detail, create, edit, delete posts. Include validation error scenarios." \
  --label="QA: Blog Tests"
```

### 2. Optimize Performance

```bash
# Frontend optimizes
openclaw sessions spawn \
  --task="Audit homepage performance: optimize images, lazy load components, code splitting, reduce bundle. Target LCP <2.5s, FCP <1.8s." \
  --label="Frontend: Performance Optimization"

# Backend optimizes
openclaw sessions spawn \
  --task="Analyze slow MongoDB queries, add missing indexes, optimize N+1 queries, implement query caching." \
  --label="Backend: Database Optimization"

# QA validates
openclaw sessions spawn \
  --task="Run performance tests: Lighthouse, bundle size, API response times. Ensure all metrics meet targets." \
  --label="QA: Performance Validation"
```

### 3. Setup Project from Scratch

```bash
# Backend setup
openclaw sessions spawn \
  --task="Setup new Node.js + Express + MongoDB project: tsconfig, environment variables, database connection, basic server structure with hello world route." \
  --label="Backend: Project Init"

# Frontend setup
openclaw sessions spawn \
  --task="Setup new Next.js project with TypeScript, Tailwind, ESLint, environment variables, global layout and basic home page." \
  --label="Frontend: Project Init"

# QA setup
openclaw sessions spawn \
  --task="Setup testing infrastructure: Jest, React Testing Library for frontend; Playwright for E2E; configure CI/CD pipeline." \
  --label="QA: Test Infrastructure"
```

### 4. Async Multi-Task

Send tasks to multiple agents in parallel, they work independently:

```bash
# Start backend work
openclaw sessions spawn --task="[Your Backend Task]" --label="Backend: Feature X"

# Start frontend work on same feature
openclaw sessions spawn --task="[Your Frontend Task]" --label="Frontend: Feature X"

# Check progress anytime
openclaw sessions list

# Check specific session
openclaw sessions history --sessionKey="<session-key>" --limit=20
```

---

## Monitoring & Management

### List Active Sessions

```bash
# All sessions
openclaw sessions list

# Only isolated (agent) sessions
openclaw sessions list --kinds=isolated

# Show last 20 messages
openclaw sessions list --limit=20 --messageLimit=5
```

### Check Session Output

```bash
# View history of a session
openclaw sessions history --sessionKey="abc123" --limit=30

# Check with tool calls
openclaw sessions history --sessionKey="abc123" --includeTools=true
```

### Send Message to Running Agent

```bash
# Message by session key
openclaw sessions send \
  --sessionKey="abc123" \
  --message="Refactor that component to use hooks instead"

# Message by label
openclaw sessions send \
  --label="Frontend: Button Component" \
  --message="Change the color scheme to match the design"
```

---

## Real-World Examples

### Example 1: Bug Fix

```bash
# 1. QA reports bug
# "Users report login fails with 500 error"

# 2. Backend investigates
openclaw sessions spawn \
  --task="Debug and fix login endpoint: check database connection, validate email/password logic, test with curl, provide test cases." \
  --label="Backend: Fix Login Bug"

# 3. Frontend verifies UI handles errors
openclaw sessions spawn \
  --task="Verify login form error handling displays backend error messages properly" \
  --label="Frontend: Login Error Handling"

# 4. QA re-tests
openclaw sessions spawn \
  --task="Regression test login flow: valid credentials, invalid credentials, server error, network timeout" \
  --label="QA: Login Regression Test"
```

### Example 2: Add Payment Processing

```bash
# Backend: Create payment model and endpoint
openclaw sessions spawn \
  --task="Add Stripe integration: create Payment model, POST /api/payments endpoint, handle webhooks for payment.success and payment.failed events" \
  --label="Backend: Stripe Integration"

# Frontend: Create payment form
openclaw sessions spawn \
  --task="Create payment form with Stripe Elements, handle payment state, show success/error messages" \
  --label="Frontend: Payment Form"

# QA: Test payments
openclaw sessions spawn \
  --task="E2E test payment flow: valid card, declined card, invalid email, success confirmation" \
  --label="QA: Payment Flow Tests"
```

### Example 3: Refactor Legacy Code

```bash
# Frontend: Modernize components
openclaw sessions spawn \
  --task="Refactor old class components to functional components with hooks, add TypeScript types, improve structure" \
  --label="Frontend: Component Refactor"

# Backend: Update APIs
openclaw sessions spawn \
  --task="Review and update API endpoints: consistent naming, proper HTTP status codes, standardized error responses" \
  --label="Backend: API Standardization"

# QA: Full test coverage
openclaw sessions spawn \
  --task="Ensure all changes maintain existing functionality: unit tests, E2E tests, no regression" \
  --label="QA: Regression Testing"
```

---

## Environment Setup

Before spawning agents, ensure environment variables are set:

```bash
# .env.local (Frontend)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env (Backend)
MONGODB_URI=mongodb://localhost:27017/dev
PORT=3001
JWT_SECRET=dev-secret-key
NODE_ENV=development

# Run servers
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Tests
cd frontend
npx playwright test --ui
```

---

## Tips & Tricks

### Get Detailed Output
```bash
# Check full message history with tools
openclaw sessions history --sessionKey="xyz" --includeTools=true --limit=50
```

### Run Multiple Sequential Tasks
```bash
# Backend does 1
openclaw sessions spawn --task="Task 1" --label="Backend: Step 1"

# Wait for completion, then
openclaw sessions spawn --task="Task 2 (depends on Step 1)" --label="Backend: Step 2"

# Check completion time
openclaw sessions list | grep "Backend: Step 1"
```

### Save Agent Output
```bash
# Get history and save to file
openclaw sessions history --sessionKey="abc123" > agent-output.txt
```

---

## Troubleshooting

### Agent Not Responding
```bash
# Check if it's still running
openclaw sessions list

# Try sending a message
openclaw sessions send --sessionKey="xyz" --message="Are you there?"

# Check last 50 messages
openclaw sessions history --sessionKey="xyz" --limit=50 --includeTools=true
```

### Timeout Issues
```bash
# Increase timeout when spawning
openclaw sessions spawn \
  --task="[Long-running task]" \
  --timeoutSeconds=1800  # 30 minutes
```

### Environment Variables Not Loaded
```bash
# Make sure .env files are in root of project
# Frontend: ./frontend/.env.local
# Backend: ./backend/.env

# Agents will read these automatically
```

---

## Batch Operations

### Deploy Everything
```bash
# 1. Check if all tests pass
openclaw sessions spawn --task="Run all tests: frontend unit, E2E, backend integration" --label="QA: Pre-deploy Tests"

# 2. Build production
openclaw sessions spawn --task="Build frontend and backend for production" --label="Build: Production"

# 3. Verify performance
openclaw sessions spawn --task="Final performance check before deploy" --label="QA: Performance Check"
```

---

**Pro Tip:** Use labels with prefixes like `[Frontend]`, `[Backend]`, `[QA]` to easily filter agents in your session list! 🎯
