# ⚡ Quick Reference Card

Copie e cole estes comandos para usar sua equipe.

## 🚀 Start Here

```bash
# Make menu executable
chmod +x scripts/team-spawn.sh

# Run interactive menu
./scripts/team-spawn.sh
```

Or directly:

```bash
openclaw sessions spawn \
  --task="Your task here" \
  --label="[Frontend/Backend/QA]: Task Name" \
  --timeoutSeconds=600
```

---

## 📋 Common Commands

### List Sessions
```bash
openclaw sessions list
openclaw sessions list --kinds=isolated  # Only agents
```

### Check Output
```bash
openclaw sessions history --sessionKey="KEY" --limit=50
```

### Message Agent
```bash
openclaw sessions send --sessionKey="KEY" --message="Your follow-up"
```

---

## 🎨 Frontend Prompts (Copy & Paste)

### Create Component
```
Create a reusable {NAME} component in React/TypeScript with:
- Props interface with types
- Tailwind CSS styling
- Unit tests
- Example usage
```

### Create Page
```
Create Next.js page at /{path} with:
- Server + Client components as needed
- API integration with {endpoint}
- Mobile responsive
- Error handling
- Loading state
```

### Add Feature
```
Implement {feature} in Next.js:
- State management with Zustand
- Form validation with React Hook Form + Zod
- API integration with axios
- Error handling
- TypeScript types
```

---

## ⚙️ Backend Prompts (Copy & Paste)

### Create Model
```
Create MongoDB model for {NAME} with:
- Fields: {field1}: {type}, {field2}: {type}
- Required: {fields}
- Validation: {rules}
- Indexes: {fields}
- Timestamps: createdAt, updatedAt
```

### Create Endpoint
```
Create Express endpoint {METHOD} {/path} that:
- Accepts: {input fields}
- Validates: {validation rules}
- Does: {database operations}
- Returns: {JSON response}
- Handles: {error cases}
```

### Add Auth
```
Implement JWT authentication:
- POST /auth/register (email, password)
- POST /auth/login (returns JWT)
- Token validation middleware
- Password hashing with bcryptjs
- Protected route example
```

---

## ✅ QA Prompts (Copy & Paste)

### E2E Tests
```
Create E2E tests for {feature} using Playwright:
- Test: {user flows}
- Setup: {prerequisites}
- Assert: {validations}
- Error cases: {negative tests}
- Mobile: {yes/no}
```

### Unit Tests
```
Create unit tests for {component/function}:
- Framework: Jest
- Coverage: >80%
- Test: {test cases}
- Mock: {dependencies}
- Edge cases: {edge cases}
```

### Full Test Suite
```
Create tests for {feature}:
- E2E: {user flows}
- Unit: {components}
- API: {endpoints}
- Coverage: >80%
- CI/CD: GitHub Actions
```

---

## 🎯 Feature Scenarios

### Build Blog Feature
```bash
# 1. Backend schema
openclaw sessions spawn \
  --task="Create MongoDB Blog Post schema: title, content, author, tags, timestamps. Add indexes." \
  --label="[Backend] Blog Schema"

# 2. Frontend UI
openclaw sessions spawn \
  --task="Create Next.js blog pages: list (pagination, search), detail, create/edit forms" \
  --label="[Frontend] Blog Pages"

# 3. Tests
openclaw sessions spawn \
  --task="E2E tests for blog: list, search, pagination, view, create, edit, delete" \
  --label="[QA] Blog Tests"
```

### Setup Authentication
```bash
# 1. Backend Auth
openclaw sessions spawn \
  --task="Implement JWT auth: register, login, validate endpoints. Hash passwords with bcryptjs. Include refresh tokens." \
  --label="[Backend] Authentication"

# 2. Frontend Auth UI
openclaw sessions spawn \
  --task="Create login/register pages in Next.js. Protected routes. User menu. Logout." \
  --label="[Frontend] Authentication"

# 3. Auth Tests
openclaw sessions spawn \
  --task="E2E tests: register, login, invalid credentials, token refresh, logout, access protected pages" \
  --label="[QA] Authentication"
```

### Add Shopping Cart
```bash
# 1. Backend Cart API
openclaw sessions spawn \
  --task="Create cart endpoints: GET, POST, PUT, DELETE items. Inventory checking. Cart persistence." \
  --label="[Backend] Shopping Cart"

# 2. Frontend Cart UI
openclaw sessions spawn \
  --task="Create cart page in Next.js. Add to cart button. Quantity controls. Remove items. Checkout button." \
  --label="[Frontend] Shopping Cart"

# 3. Cart Tests
openclaw sessions spawn \
  --task="E2E tests: add item, modify qty, remove, clear, checkout. Invalid qty (out of stock)." \
  --label="[QA] Shopping Cart"
```

---

## 💻 Terminal Setup

```bash
# Terminal 1 - Backend
cd backend && npm run dev
# Expected: Server running on port 3001

# Terminal 2 - Frontend
cd frontend && npm run dev
# Expected: Ready on http://localhost:3000

# Terminal 3 - Tests
cd frontend && npx playwright test --ui
# or npm test

# Terminal 4 - Menu (Spawn Tasks)
./scripts/team-spawn.sh
```

---

## 🔧 Environment Files

### .env (Backend)
```
MONGODB_URI=mongodb://localhost:27017/dev
PORT=3001
JWT_SECRET=dev-secret
NODE_ENV=development
```

### .env.local (Frontend)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📊 Monitoring

### Watch Session Progress
```bash
# Loop every 10 seconds
while true; do
  clear
  openclaw sessions list --limit=5
  sleep 10
done
```

### Get Full Session Output
```bash
openclaw sessions history --sessionKey="KEY" --includeTools=true > output.txt
cat output.txt
```

---

## 🎓 Skill Files

Need detailed info? Read these:

- **Frontend:** `skills/frontend-nextjs/SKILL.md`
- **Backend:** `skills/backend-nodejs-mongo/SKILL.md`
- **Testing:** `skills/qa-web-testing/SKILL.md`
- **Commands:** `AGENT_COMMANDS.md`
- **Team:** `TEAM.md`
- **Prompts:** `PROMPT_TEMPLATES.md`

---

## 🚨 Troubleshooting

### Agent Won't Start
```bash
# Check if running
openclaw sessions list

# Send message to wake it
openclaw sessions send --sessionKey="KEY" --message="Hello"

# View errors
openclaw sessions history --sessionKey="KEY" --limit=50
```

### MongoDB Not Running
```bash
# macOS
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 mongo
```

### Port In Use
```bash
lsof -i :3000   # Find process on port 3000
kill -9 PID     # Kill it
```

---

## 📝 Template Commands

### Spawn Frontend Task
```bash
openclaw sessions spawn \
  --task="[PASTE TEMPLATE FROM ABOVE]" \
  --label="[Frontend] Your Label" \
  --timeoutSeconds=600
```

### Spawn Backend Task
```bash
openclaw sessions spawn \
  --task="[PASTE TEMPLATE FROM ABOVE]" \
  --label="[Backend] Your Label" \
  --timeoutSeconds=600
```

### Spawn QA Task
```bash
openclaw sessions spawn \
  --task="[PASTE TEMPLATE FROM ABOVE]" \
  --label="[QA] Your Label" \
  --timeoutSeconds=600
```

---

## 🎉 Start Coding!

1. Run `./scripts/team-spawn.sh`
2. Pick an agent
3. Pick a template
4. Enter your task
5. Wait for results
6. Monitor with `openclaw sessions list`

**That's it! You're ready to build!** 🚀

---

**More help?** Read `TEAM.md` or `AGENT_COMMANDS.md`
