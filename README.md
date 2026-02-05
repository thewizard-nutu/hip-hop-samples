# 🚀 Development Team - Your Complete Stack

Bem-vindo ao seu time de desenvolvimento completo! Você tem 3 agentes especializados prontos para construir aplicações full-stack com **Next.js**, **Node.js** e **MongoDB**.

## 📦 What's Included

### 3 Specialized Agents

1. **🎨 Frontend Agent** (`frontend-nextjs` skill)
   - React/Next.js components
   - UI/UX implementation
   - Performance optimization
   - Unit & integration tests

2. **⚙️ Backend Agent** (`backend-nodejs-mongo` skill)
   - REST APIs with Express
   - MongoDB database design
   - Authentication & authorization
   - Business logic & services

3. **✅ QA Agent** (`qa-web-testing` skill)
   - E2E tests with Playwright
   - Unit tests with Jest
   - Performance testing
   - CI/CD pipelines

---

## ⚡ Quick Start (5 minutes)

### 1. Check Skills are Available

```bash
# Verify the skills were created
ls -la skills/
# Should show: frontend-nextjs/, backend-nodejs-mongo/, qa-web-testing/
```

### 2. Make Spawn Script Executable

```bash
chmod +x scripts/team-spawn.sh
```

### 3. Spawn Your First Agent Task

```bash
# Option A: Interactive menu
./scripts/team-spawn.sh

# Option B: Direct command
openclaw sessions spawn \
  --task="Create a Next.js project with TypeScript, Tailwind, and basic home page" \
  --label="Frontend: Project Setup" \
  --timeoutSeconds=600
```

### 4. Monitor Progress

```bash
# List active sessions
openclaw sessions list

# View detailed output
openclaw sessions history --sessionKey="<session-key>"
```

---

## 📚 Documentation

### Main Files

- **TEAM.md** - Team overview and responsibilities
- **AGENT_COMMANDS.md** - Detailed command reference
- **PROJECT_STRUCTURE.md** - Recommended folder layout
- **skills/frontend-nextjs/SKILL.md** - Frontend complete guide
- **skills/backend-nodejs-mongo/SKILL.md** - Backend complete guide
- **skills/qa-web-testing/SKILL.md** - Testing complete guide

### Start Reading Here (in order)

1. Read **TEAM.md** (5 min) - Understand what each agent does
2. Read **AGENT_COMMANDS.md** (5 min) - Learn how to use them
3. Spawn a task using the menu
4. Read skill documentation as needed for details

---

## 🎯 Common Tasks

### Build a Complete Feature

```bash
# 1. Create backend API
./scripts/team-spawn.sh
# → Select "2) Spawn Backend Task"
# → Select "1) Create API Endpoint"

# 2. Create frontend UI
./scripts/team-spawn.sh
# → Select "1) Spawn Frontend Task"
# → Select "2) Create Page/Route"

# 3. Create tests
./scripts/team-spawn.sh
# → Select "3) Spawn QA Task"
# → Select "1) Create E2E Tests"
```

### Spawn Multiple Tasks in Parallel

```bash
./scripts/team-spawn.sh
# → Select "4) Spawn Multiple Tasks (Parallel)"
# → Choose a template (Product Listing, Auth, Cart, etc.)
```

### Get Help from an Agent

```bash
openclaw sessions spawn \
  --task="Help me understand how to implement JWT authentication in Node.js" \
  --label="Backend: JWT Question" \
  --timeoutSeconds=300
```

---

## 🛠️ Project Setup Guide

### Create Your First Full-Stack App

#### Step 1: Backend Foundation

```bash
./scripts/team-spawn.sh
# Select: 2) Spawn Backend Task
# Template: Choose "1) Create API Endpoint"
# Label: "Setup: User Registration API"
# Task gets generated automatically
```

Wait for completion, then:

#### Step 2: Frontend UI

```bash
./scripts/team-spawn.sh
# Select: 1) Spawn Frontend Task
# Template: Choose "2) Create Page/Route"
# Label: "Setup: Login Page"
```

#### Step 3: Tests

```bash
./scripts/team-spawn.sh
# Select: 3) Spawn QA Task
# Template: Choose "1) Create E2E Tests"
# Label: "Setup: Auth Tests"
```

---

## 💬 Real Usage Examples

### Example 1: Build Blog Feature

```bash
openclaw sessions spawn \
  --task="[Backend] Create MongoDB schema for blog posts with title, content, author, tags, createdAt, and timestamps. Add proper validation and text search index." \
  --label="Backend: Blog Schema"

# Wait for completion, then:

openclaw sessions spawn \
  --task="[Frontend] Create Next.js pages for blog: list with pagination and search, detail view, and create/edit form. Integrate with backend API endpoints." \
  --label="Frontend: Blog Pages"

# Then:

openclaw sessions spawn \
  --task="[QA] Write E2E tests for blog: list with pagination, search filtering, view detail, create new post, edit post, delete post" \
  --label="QA: Blog Tests"
```

### Example 2: Fix a Bug

```bash
# QA found: "Login returns 500 error sometimes"

openclaw sessions spawn \
  --task="Debug and fix the login endpoint. Check: database connection, email validation, password comparison, JWT token generation. Provide test cases." \
  --label="Backend: Fix Login Bug"

# After backend fixes:

openclaw sessions spawn \
  --task="Verify login form error handling displays error messages correctly. Test with network errors, invalid credentials, server errors." \
  --label="Frontend: Login Error Handling"

# Then:

openclaw sessions spawn \
  --task="Run regression tests for login flow: valid/invalid credentials, missing fields, server errors, success" \
  --label="QA: Login Regression"
```

### Example 3: Performance Optimization

```bash
# Optimize frontend
openclaw sessions spawn \
  --task="Performance audit: analyze bundle size, optimize images, lazy load components, reduce CSS. Target: LCP <2.5s, FCP <1.8s" \
  --label="Frontend: Performance"

# Optimize backend
openclaw sessions spawn \
  --task="Database optimization: find slow queries, add missing indexes, optimize N+1 queries, implement caching where appropriate" \
  --label="Backend: Performance"

# Verify improvements
openclaw sessions spawn \
  --task="Performance testing: measure page load times, API response times, bundle sizes. Create performance report." \
  --label="QA: Performance Tests"
```

---

## 📋 Skill Specifications

### Frontend (Next.js)
- **Stack:** Next.js 14+, React 18, TypeScript, Tailwind CSS
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **API:** Axios
- **Testing:** Jest, React Testing Library, Playwright

### Backend (Node.js)
- **Stack:** Node.js 18+, Express 4, TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs
- **Validation:** Express Validator, Zod
- **Testing:** Jest, Supertest

### QA (Testing)
- **E2E:** Playwright
- **Unit:** Jest
- **Integration:** Supertest
- **A11y:** Axe
- **Performance:** Lighthouse, custom metrics
- **CI/CD:** GitHub Actions

---

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Backend (.env):**
```
MONGODB_URI=mongodb://localhost:27017/dev
PORT=3001
JWT_SECRET=dev-secret-key
NODE_ENV=development
```

---

## 📊 Monitoring Tasks

### View Active Sessions

```bash
openclaw sessions list
# Shows all running agents with their labels and status
```

### Get Detailed Output

```bash
openclaw sessions history --sessionKey="abc123" --limit=50
```

### Send Follow-up Messages

```bash
openclaw sessions send \
  --sessionKey="abc123" \
  --message="Add error handling for network timeouts"
```

---

## 🎓 Learning Path

**Day 1:**
- Read TEAM.md
- Read AGENT_COMMANDS.md
- Spawn one Frontend task
- Monitor output

**Day 2:**
- Spawn Backend task
- Spawn QA task
- Learn how they work together

**Day 3:**
- Spawn multiple tasks in parallel
- Create a complete feature end-to-end
- Review skill documentation for details

**Ongoing:**
- Build your features using the team
- Refer to skill docs (SKILL.md files) as needed
- Iterate and refine

---

## 🚨 Troubleshooting

### Agent Not Responding

```bash
# Check if it's still running
openclaw sessions list

# View last messages
openclaw sessions history --sessionKey="xyz" --limit=20

# Send a message to check
openclaw sessions send --sessionKey="xyz" --message="Hello, are you there?"
```

### MongoDB Connection Error

Ensure MongoDB is running:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 mongo:latest
```

### Port Already in Use

```bash
# Find and kill process
lsof -i :3000    # Frontend
lsof -i :3001    # Backend
kill -9 <PID>
```

---

## 📞 Getting Help

### From Agents

Ask questions directly to agents:

```bash
openclaw sessions spawn \
  --task="I'm stuck: how do I implement middleware in Express?" \
  --label="Backend: Middleware Question"
```

### From Docs

- **Frontend questions:** Read `skills/frontend-nextjs/SKILL.md`
- **Backend questions:** Read `skills/backend-nodejs-mongo/SKILL.md`
- **Testing questions:** Read `skills/qa-web-testing/SKILL.md`
- **Command questions:** Read `AGENT_COMMANDS.md`

---

## 🎉 Next Steps

1. **Read TEAM.md** - Understand the team structure
2. **Read AGENT_COMMANDS.md** - Learn commands
3. **Run the menu:** `./scripts/team-spawn.sh`
4. **Spawn your first task!**

---

## 📝 Notes

- Each agent works independently but can reference outputs from others
- Use consistent labeling: `[Frontend]`, `[Backend]`, `[QA]` for easy filtering
- Start with single tasks, then spawn multiple agents in parallel
- Skills contain complete examples you can adapt

---

## ✨ What You Can Build

✅ Complete SaaS applications  
✅ E-commerce platforms  
✅ Real-time dashboards  
✅ Mobile-friendly PWAs  
✅ REST/GraphQL APIs  
✅ Complex backends with MongoDB  
✅ Fully tested production code  

---

**Ready? Start with:** `./scripts/team-spawn.sh` 🚀

Then read the docs and start spawning tasks!
