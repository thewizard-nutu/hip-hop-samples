# 📚 Example Project: Building a Task Manager App

Este é um exemplo completo mostrando como usar os 3 agentes para construir uma aplicação real.

## Project: TaskManager

Uma aplicação web para gerenciar tarefas com usuários, autenticação, diferentes níveis de permissão e testes completos.

### Features
- ✅ User Authentication (Register/Login)
- ✅ Task CRUD (Create, Read, Update, Delete)
- ✅ Task Categories
- ✅ Due Dates & Priority
- ✅ Task Sharing (between users)
- ✅ Full Test Coverage
- ✅ Responsive UI

---

## 📋 Development Checklist

Use este checklist como template para seu próprio projeto.

### Phase 1: Foundation (Backend)

#### [ ] 1.1 Database Schema - User Model

```bash
openclaw sessions spawn \
  --task="Create MongoDB User schema with fields:
- email (unique, required, validated)
- password (hashed with bcryptjs, required)
- name (required, min 2 chars)
- createdAt, updatedAt

Include validation rules and indexes.
Provide example document." \
  --label="[Backend] Phase 1.1: User Model" \
  --timeoutSeconds=600
```

**Expected Output:**
- User.ts model file
- Mongoose schema with validation
- Password comparison method

---

#### [ ] 1.2 Database Schema - Task Model

```bash
openclaw sessions spawn \
  --task="Create MongoDB Task schema with fields:
- title (required, min 3)
- description (optional)
- category (required: personal, work, shopping, other)
- priority (required: low, medium, high)
- status (required: todo, in-progress, done)
- dueDate (optional, default null)
- owner (required, ref User)
- sharedWith (array of User refs)
- createdAt, updatedAt

Include indexes for: owner, status, dueDate, category.
Provide example document." \
  --label="[Backend] Phase 1.2: Task Model" \
  --timeoutSeconds=600
```

**Expected Output:**
- Task.ts model file
- Mongoose schema with validation
- Population settings for owner/sharedWith

---

#### [ ] 1.3 Authentication Endpoints

```bash
openclaw sessions spawn \
  --task="Create authentication routes and controllers:
- POST /api/auth/register - accepts email, password, name
- POST /api/auth/login - accepts email, password, returns JWT
- POST /api/auth/validate - validates current JWT token
- Implement JWT middleware

Use bcryptjs for password hashing.
Return { success, token, user } responses.
Handle validation errors and duplicate emails.
Include error cases." \
  --label="[Backend] Phase 1.3: Auth Endpoints" \
  --timeoutSeconds=600
```

**Expected Output:**
- auth.routes.ts
- auth.controller.ts
- Authentication middleware
- JWT secret in .env

---

#### [ ] 1.4 Task CRUD Endpoints

```bash
openclaw sessions spawn \
  --task="Create task management endpoints:
- GET /api/tasks - list user's tasks (paginated, filter by status/category)
- GET /api/tasks/:id - get single task
- POST /api/tasks - create new task
- PUT /api/tasks/:id - update task
- DELETE /api/tasks/:id - delete task
- PATCH /api/tasks/:id/status - quick status update

Require authentication for all.
Implement filtering by category, priority, status.
Include pagination (10 items per page).
Return proper HTTP status codes and error messages." \
  --label="[Backend] Phase 1.4: Task CRUD" \
  --timeoutSeconds=600
```

**Expected Output:**
- tasks.routes.ts
- tasks.controller.ts
- Query filtering logic
- Pagination helper

---

#### [ ] 1.5 Task Sharing Endpoints

```bash
openclaw sessions spawn \
  --task="Create task sharing endpoints:
- POST /api/tasks/:id/share - share task with user (accepts email)
- DELETE /api/tasks/:id/share/:userId - remove sharing
- GET /api/tasks/shared - list tasks shared with me
- GET /api/users - search users by email (for sharing)

Validate user exists before sharing.
Prevent sharing with self.
Include permission checks (only owner can share)." \
  --label="[Backend] Phase 1.5: Task Sharing" \
  --timeoutSeconds=600
```

**Expected Output:**
- Sharing endpoints in tasks.controller.ts
- User search endpoint
- Permission validation middleware

---

#### [ ] 1.6 Testing - Backend Unit Tests

```bash
openclaw sessions spawn \
  --task="Create Jest unit tests for backend:
- Test User model: password hashing, validation
- Test Task model: validation rules
- Test auth controller: register, login success/failure cases
- Test task controller: CRUD operations
- Coverage target: >80%

Use mocking for database.
Test validation errors.
Test authentication failures." \
  --label="[Backend] Phase 1.6: Unit Tests" \
  --timeoutSeconds=600
```

**Expected Output:**
- Jest test files
- >80% code coverage
- Test data fixtures

---

#### [ ] 1.7 Testing - Backend Integration Tests

```bash
openclaw sessions spawn \
  --task="Create supertest integration tests for backend:
- Test complete auth flow: register → login → use token
- Test task CRUD: create, read all, update, delete
- Test filtering and pagination
- Test task sharing workflow
- Test error cases: invalid input, unauthorized access
- Use test MongoDB database

Create before/after hooks for data cleanup." \
  --label="[Backend] Phase 1.7: Integration Tests" \
  --timeoutSeconds=600
```

**Expected Output:**
- Integration test suites
- API endpoint coverage
- Error scenario tests

---

### Phase 2: Frontend (UI)

#### [ ] 2.1 Authentication Pages

```bash
openclaw sessions spawn \
  --task="Create Next.js authentication pages and components:
- /login page with email, password form
- /register page with email, password, name form
- Form validation with React Hook Form + Zod
- Error message display
- Success redirect to /dashboard
- Persist JWT to localStorage
- Include 'Remember me' checkbox (optional)

Use Tailwind CSS for styling.
Mobile responsive.
Accessibility: proper labels, ARIA attributes." \
  --label="[Frontend] Phase 2.1: Auth Pages" \
  --timeoutSeconds=600
```

**Expected Output:**
- login/page.tsx
- register/page.tsx
- Form components
- Validation schemas

---

#### [ ] 2.2 Dashboard & Task List

```bash
openclaw sessions spawn \
  --task="Create task list page at /dashboard:
- Display all user's tasks in list view
- Show: title, category, priority, dueDate, status
- Filter by: category, priority, status
- Sort by: dueDate, priority, created
- Pagination: 10 per page
- Add task button
- Edit/delete actions for each task
- Color coding by priority (red=high, yellow=medium, green=low)

Use Tailwind CSS.
Mobile responsive.
Loading and error states." \
  --label="[Frontend] Phase 2.2: Task List" \
  --timeoutSeconds=600
```

**Expected Output:**
- dashboard/page.tsx
- TaskList component
- TaskCard component
- Filter/Sort UI

---

#### [ ] 2.3 Task Details & Editor

```bash
openclaw sessions spawn \
  --task="Create task detail pages:
- /tasks/[id] - view task details
- /tasks/[id]/edit - edit task
- /tasks/new - create new task

Fields:
- title (required)
- description
- category (select)
- priority (select)
- status (select)
- dueDate (date picker)
- sharedWith (user list)

Form validation.
Auto-save draft (localStorage).
Keyboard shortcuts (e.g., Ctrl+S to save).

Use Tailwind + React Hook Form." \
  --label="[Frontend] Phase 2.3: Task Editor" \
  --timeoutSeconds=600
```

**Expected Output:**
- tasks/[id]/page.tsx
- tasks/new/page.tsx
- TaskForm component
- Date picker integration

---

#### [ ] 2.4 User Profile & Settings

```bash
openclaw sessions spawn \
  --task="Create user profile page at /profile:
- Display user info: email, name
- Edit name
- Change password
- View shared tasks (tasks shared with me)
- User settings: theme preference, email notifications
- Logout button

Protected route (require auth).
Form validation.
Confirmation before destructive actions." \
  --label="[Frontend] Phase 2.4: Profile" \
  --timeoutSeconds=600
```

**Expected Output:**
- profile/page.tsx
- ProfileForm component
- PasswordForm component
- Settings component

---

#### [ ] 2.5 State Management

```bash
openclaw sessions spawn \
  --task="Setup Zustand stores for state management:
- authStore: user, token, login, logout, setUser
- tasksStore: tasks, addTask, updateTask, deleteTask, setTasks
- uiStore: isLoading, error, setLoading, setError

Create custom hooks:
- useAuth() - auth state and functions
- useTasks() - tasks state and functions
- useApi() - API calls with loading/error

All stores TypeScript typed." \
  --label="[Frontend] Phase 2.5: State Management" \
  --timeoutSeconds=600
```

**Expected Output:**
- store/auth.store.ts
- store/tasks.store.ts
- store/ui.store.ts
- hooks/useAuth, useTasks, useApi

---

#### [ ] 2.6 Component Unit Tests

```bash
openclaw sessions spawn \
  --task="Create Jest + React Testing Library tests for frontend components:
- Test TaskCard: rendering, actions (edit, delete)
- Test TaskForm: validation, submission
- Test TaskList: filtering, pagination
- Test LoginForm: validation, submission
- Test UserMenu: logout action

Mock API calls with jest.mock().
Coverage target: >80%
Test user interactions with userEvent." \
  --label="[Frontend] Phase 2.6: Unit Tests" \
  --timeoutSeconds=600
```

**Expected Output:**
- Component test files
- >80% coverage
- User interaction tests

---

### Phase 3: Testing (QA)

#### [ ] 3.1 Authentication E2E Tests

```bash
openclaw sessions spawn \
  --task="Create Playwright E2E tests for authentication:
- Test flow: visit register page → fill form → submit → verify redirect to login
- Test flow: login with valid credentials → verify dashboard loads
- Test flow: login with invalid credentials → verify error message
- Test flow: forgot password → reset link flow
- Test flow: logout → redirects to login
- Test on: desktop Chrome, Firefox, Safari, mobile Chrome
- Retry on failure 2x

Use page objects pattern.
Include screenshots on failure.
Assert: correct URLs, messages, user visible elements." \
  --label="[QA] Phase 3.1: Auth E2E Tests" \
  --timeoutSeconds=600
```

**Expected Output:**
- tests/e2e/auth.spec.ts
- Page object model
- Cross-browser tests

---

#### [ ] 3.2 Task Management E2E Tests

```bash
openclaw sessions spawn \
  --task="Create Playwright E2E tests for task management:
- Test flow: Login → Create new task → Verify in list
- Test flow: Edit task → Update fields → Verify changes
- Test flow: Filter tasks by category → Verify filtered list
- Test flow: Delete task → Verify removed from list
- Test flow: Paginate through tasks
- Test flow: Share task with another user
- Test error: Cannot create task without title

Setup: Create test users in beforeAll hook.
Cleanup: Delete test data in afterAll hook.
Mobile testing: test on mobile device." \
  --label="[QA] Phase 3.2: Task E2E Tests" \
  --timeoutSeconds=600
```

**Expected Output:**
- tests/e2e/tasks.spec.ts
- Setup/teardown hooks
- Mobile test configuration

---

#### [ ] 3.3 Performance Testing

```bash
openclaw sessions spawn \
  --task="Create performance tests using Playwright:
- Measure page load time: target <2.5s
- Measure API response times: target <500ms
- Check bundle size: target <500KB
- Check for console errors
- Lighthouse audit: target >90 score
- Mobile performance: test on slow 3G

Create performance report with metrics." \
  --label="[QA] Phase 3.3: Performance Tests" \
  --timeoutSeconds=600
```

**Expected Output:**
- Performance test suite
- Metrics report
- Performance benchmarks

---

#### [ ] 3.4 Accessibility Testing

```bash
openclaw sessions spawn \
  --task="Create accessibility tests with axe:
- Run axe audit on all pages
- Check WCAG 2.1 AA compliance
- Test keyboard navigation: Tab through all pages
- Test screen reader compatibility
- Check color contrast ratios
- Test form labels and ARIA attributes

Fix any violations found.
Create a11y report." \
  --label="[QA] Phase 3.4: Accessibility Tests" \
  --timeoutSeconds=600
```

**Expected Output:**
- Accessibility test suite
- a11y audit report
- Fixes for violations

---

#### [ ] 3.5 CI/CD Pipeline

```bash
openclaw sessions spawn \
  --task="Setup GitHub Actions CI/CD pipeline:
- Trigger on: push to main, pull requests
- Jobs:
  1. Lint: ESLint, TypeScript type-check
  2. Frontend: unit tests, E2E tests
  3. Backend: unit tests, integration tests
  4. Performance: Lighthouse audit
  5. Coverage: >80% requirement
- Fail if any job fails
- Upload test reports as artifacts
- Comment results on PR

Create separate workflows for test, build, deploy." \
  --label="[QA] Phase 3.5: CI/CD Pipeline" \
  --timeoutSeconds=600
```

**Expected Output:**
- .github/workflows/ YAML files
- CI pipeline running
- Automated test checks

---

### Phase 4: Optimization

#### [ ] 4.1 Frontend Performance

```bash
openclaw sessions spawn \
  --task="Optimize frontend performance:
- Audit bundle size with webpack-bundle-analyzer
- Lazy load route components
- Optimize images: next/image component, compression
- Code splitting for heavy components
- CSS optimization: remove unused styles
- Minify and compress assets
- Optimize Core Web Vitals

Target: LCP <2.5s, FCP <1.8s, CLS <0.1" \
  --label="[Frontend] Phase 4.1: Performance" \
  --timeoutSeconds=600
```

**Expected Output:**
- Performance improvements
- Bundle size reduction
- Metrics report

---

#### [ ] 4.2 Backend Performance

```bash
openclaw sessions spawn \
  --task="Optimize backend performance:
- Analyze slow queries with MongoDB profiler
- Add missing indexes
- Implement query caching with Redis (optional)
- Optimize N+1 queries with lean()
- Add API response compression (gzip)
- Implement rate limiting
- Database connection pooling

Target: API response time <500ms" \
  --label="[Backend] Phase 4.2: Performance" \
  --timeoutSeconds=600
```

**Expected Output:**
- Database indexes
- Query optimization
- Performance improvements

---

## 🎯 Execution Timeline

### Day 1
- [ ] Phase 1.1 - User Model
- [ ] Phase 1.2 - Task Model
- [ ] Phase 1.3 - Auth Endpoints

### Day 2
- [ ] Phase 1.4 - Task CRUD
- [ ] Phase 1.5 - Task Sharing
- [ ] Phase 1.6 - Backend Unit Tests
- [ ] Phase 2.1 - Auth Pages (Frontend)

### Day 3
- [ ] Phase 2.2 - Task List
- [ ] Phase 2.3 - Task Editor
- [ ] Phase 2.4 - User Profile
- [ ] Phase 1.7 - Backend Integration Tests

### Day 4
- [ ] Phase 2.5 - State Management
- [ ] Phase 2.6 - Frontend Tests
- [ ] Phase 3.1 - Auth E2E Tests
- [ ] Phase 3.2 - Task E2E Tests

### Day 5
- [ ] Phase 3.3 - Performance Tests
- [ ] Phase 3.4 - Accessibility Tests
- [ ] Phase 3.5 - CI/CD Pipeline
- [ ] Phase 4.1 - Frontend Optimization
- [ ] Phase 4.2 - Backend Optimization

---

## 📊 Progress Tracking

Create `PROJECT_PROGRESS.md` in your workspace:

```markdown
# TaskManager - Project Progress

| Phase | Task | Status | Agent | Started | Completed |
|-------|------|--------|-------|---------|-----------|
| 1.1 | User Model | ✅ | Backend | 2024-02-05 | 2024-02-05 |
| 1.2 | Task Model | ⏳ | Backend | 2024-02-05 | - |
| 1.3 | Auth Endpoints | ⏳ | Backend | - | - |
...
```

---

## 💡 Tips for Success

1. **Work Bottom-Up:** Backend first, then Frontend, then QA
2. **Batch Tests:** Queue multiple tasks and let them run in parallel
3. **Reference Previous Work:** Each phase builds on the last
4. **Document as You Go:** Save URLs, session keys, important outputs
5. **Test Early:** Don't wait until end to add tests
6. **Monitor Sessions:** Use `openclaw sessions list` often
7. **Follow Up:** Ask agents to refine/improve outputs if needed

---

## 🚀 When Complete

You'll have:
- ✅ Complete backend API with authentication
- ✅ Full-featured frontend application
- ✅ Comprehensive test coverage (>80%)
- ✅ Performance optimizations
- ✅ Accessibility compliance
- ✅ CI/CD automation
- ✅ Production-ready code

**Ready to build your TaskManager?** Start with Phase 1.1! 🎉
