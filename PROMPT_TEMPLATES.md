# Prompt Templates

Coleção de prompts prontos para usar com seus agentes.

## Frontend Prompts (Next.js)

### Components

```
Create a {ComponentName} component in React/TypeScript with:
- Props interface with proper types
- Tailwind CSS styling
- Accessibility attributes (aria-*)
- Example usage in comments
- Unit test file

Use functional component with hooks pattern.
```

**Example:**
```
Create a PriceCard component in React/TypeScript with:
- Props: price (number), currency (string), onBuyClick (function), featured (boolean)
- Tailwind CSS styling with featured variant support
- Accessibility attributes
- Example usage in comments
- Unit test file
Use functional component with hooks pattern.
```

### Pages/Routes

```
Create a Next.js page at /[route] with:
- Server Component for data fetching
- Client Components for interactivity
- Proper error boundaries
- Loading state
- Integration with API endpoint {endpoint}
- Mobile responsive layout
```

### API Integration

```
Create a custom React hook called {hookName} that:
- Fetches data from {API_ENDPOINT}
- Handles loading, error, and success states
- Includes retry logic
- TypeScript types for the response
- Error logging
```

---

## Backend Prompts (Node.js + MongoDB)

### Data Models

```
Create MongoDB model for {EntityName} with:
- Fields: {field1}: {type}, {field2}: {type}, ...
- Required fields: {fields}
- Validation rules: {rules}
- Indexes for: {indexFields}
- Timestamps (createdAt, updatedAt)
- Example document in comments
```

**Example:**
```
Create MongoDB model for Product with:
- Fields: name (string), description (string), price (number), category (string), stock (number), tags ([string])
- Required fields: name, price, category
- Validation rules: price >= 0, stock >= 0, name min 3 chars
- Indexes for: category, name (text search), createdAt
- Timestamps (createdAt, updatedAt)
- Example document in comments
```

### API Endpoints

```
Create Express endpoint:
- Method: {GET/POST/PUT/DELETE}
- Path: {/api/path}
- Input validation: {validation rules}
- Database operations: {CRUD operations}
- Error handling for: {error cases}
- Response format: {JSON structure}
- HTTP status codes: {codes}
```

**Example:**
```
Create Express endpoint:
- Method: POST
- Path: /api/products
- Input validation: name (required, min 3), price (required, > 0), category (required)
- Database operations: Create new product, save to MongoDB
- Error handling for: Validation errors, duplicate keys, DB errors
- Response format: { success: boolean, data: product, error?: string }
- HTTP status codes: 201 (created), 400 (validation error), 500 (server error)
```

### Authentication

```
Implement {AuthMethod} authentication with:
- User registration endpoint
- Login endpoint returning {token type}
- Token validation middleware
- Password hashing with {hash algorithm}
- Refresh token mechanism
- Logout endpoint
- Test cases for: valid credentials, invalid credentials, expired tokens
```

---

## QA Prompts (Testing)

### E2E Tests

```
Create E2E tests for {feature} using Playwright with:
- Test cases: {list the flows to test}
- Setup: {login required? data needed?}
- Assertions: {what to verify}
- Error scenarios: {negative test cases}
- Mobile testing: {yes/no}
- Screenshot on failure: yes
```

**Example:**
```
Create E2E tests for user checkout using Playwright with:
- Test cases: 
  1. Add item to cart and checkout with valid info
  2. Apply discount code
  3. Checkout with invalid credit card
  4. Network timeout during payment
- Setup: Logged in user with 1 item in cart
- Assertions: Success page shown, order confirmation, cart emptied
- Error scenarios: Invalid card, network error, invalid shipping
- Mobile testing: yes
- Screenshot on failure: yes
```

### Unit Tests

```
Create unit tests for {component/function} with:
- Test framework: {Jest/Vitest}
- Coverage target: {%}
- Mock dependencies: {list mocks}
- Test cases: {describe test scenarios}
- Edge cases: {edge cases to handle}
- Snapshot tests: {yes/no}
```

### Integration Tests

```
Create integration tests for {API/feature} with:
- Endpoints tested: {list endpoints}
- Test database: {use test DB}
- Setup/teardown: {data setup}
- Test scenarios: {happy path, error cases}
- Authentication: {required?}
- Assert: {response structure}
```

---

## Full-Stack Feature Prompts

### Backend + Frontend + QA (Complete Feature)

```
[Backend]
Create MongoDB schema and Express APIs for {feature}:
- Model: {fields}
- Endpoints: {GET/POST/PUT/DELETE endpoints}
- Validation: {rules}
- Error handling: {cases}

[Frontend]
Create Next.js UI for {feature}:
- Pages: {list pages}
- Components: {list components}
- Integration: {consume the backend endpoints}
- Styling: {Tailwind}

[QA]
Create tests for {feature}:
- E2E flows: {user flows to test}
- Unit tests: {components to test}
- API tests: {endpoints to test}
- Coverage: {target %}
```

---

## Common Feature Templates

### Authentication System

**Backend:**
```
Create authentication system with:
- User registration: POST /api/auth/register (email, password, name)
- Login: POST /api/auth/login (email, password) returns JWT
- Token validation middleware
- Password hashing with bcryptjs
- Refresh token endpoint
```

**Frontend:**
```
Create auth pages and components:
- Register page with form validation
- Login page
- Protected routes/layout
- User profile menu
- Logout functionality
```

**QA:**
```
Create auth tests:
- E2E: Register, login, access protected page, logout
- Unit: Form validation
- API: Invalid credentials, missing fields, token expiration
```

### Product Listing

**Backend:**
```
Create product endpoints:
- GET /api/products (with pagination, filters, search)
- GET /api/products/:id
- POST /api/products (admin only)
- PUT /api/products/:id (admin only)
- DELETE /api/products/:id (admin only)
```

**Frontend:**
```
Create product pages:
- /products page with list, filters, search, pagination
- /products/:id detail page
- Product card component
- Filter sidebar component
```

**QA:**
```
Create product tests:
- E2E: Browse, filter, search, paginate, view detail
- Unit: Filter component
- API: All CRUD operations, error cases
- Performance: Load 100 products
```

### Shopping Cart

**Backend:**
```
Create cart endpoints:
- GET /api/cart (user's cart)
- POST /api/cart (add item)
- PUT /api/cart/:itemId (update quantity)
- DELETE /api/cart/:itemId (remove item)
- DELETE /api/cart (clear cart)
```

**Frontend:**
```
Create cart feature:
- /cart page with items list
- Add to cart button on products
- Cart count badge in header
- Quantity controls
- Remove item buttons
- Persist cart state
```

**QA:**
```
Create cart tests:
- E2E: Add, modify, remove items, proceed to checkout
- Unit: Cart component, quantity controls
- API: All cart operations
- Edge cases: Out of stock, quantity exceeds stock
```

### Checkout & Payment

**Backend:**
```
Create checkout endpoints:
- POST /api/checkout (create order)
- POST /api/payments (process payment via Stripe)
- GET /api/orders/:id (order details)
- Webhook for payment.success event
```

**Frontend:**
```
Create checkout flow:
- /checkout page
- Shipping address form
- Stripe payment form
- Order confirmation page
```

**QA:**
```
Create checkout tests:
- E2E: Complete purchase with valid card
- E2E: Failed payment scenarios
- Unit: Address validation
- API: Order creation, payment processing
```

---

## Quick Copy-Paste Templates

### Frontend Component Creation

```bash
openclaw sessions spawn \
  --task="Create a {ComponentName} component in Next.js with TypeScript, Tailwind, and tests. Props: {prop types}. Styling: {description}." \
  --label="Frontend: {ComponentName}"
```

### Backend Endpoint Creation

```bash
openclaw sessions spawn \
  --task="Create Express endpoint {METHOD} {/path} that {description}. Input: {input}. Database: {operations}. Error handling: {cases}." \
  --label="Backend: {Endpoint Name}"
```

### Test Suite Creation

```bash
openclaw sessions spawn \
  --task="Create E2E tests for {feature} using Playwright. Test: {flows}. Setup: {prerequisites}. Assert: {validations}." \
  --label="QA: {Feature Name}"
```

---

## Pro Tips

### Combine Templates for Full Features

```bash
# Create complete feature in parallel
openclaw sessions spawn --task="[Backend] Create API..." --label="[Backend] Feature X"
sleep 2
openclaw sessions spawn --task="[Frontend] Create UI..." --label="[Frontend] Feature X"
sleep 2
openclaw sessions spawn --task="[QA] Create Tests..." --label="[QA] Feature X"
```

### Ask for Improvements

```bash
# After agent completes task, send follow-up
openclaw sessions send \
  --sessionKey="abc123" \
  --message="Add error boundary component and improve error messages"
```

### Combine with Code Review

```bash
# Ask QA to review code quality
openclaw sessions spawn \
  --task="Review the code created by Backend agent for: type safety, error handling, performance, security. Suggest improvements." \
  --label="QA: Code Review"
```

---

## Template Customization

### Add Type-Specific Requirements

For **Performance:**
```
...with attention to:
- Minimize database queries (avoid N+1)
- Add appropriate indexes
- Cache where possible
- Optimize bundle size for frontend
```

For **Security:**
```
...with attention to:
- Input validation
- SQL injection prevention
- XSS prevention
- CSRF protection
- Rate limiting
```

For **Accessibility:**
```
...with attention to:
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- Color contrast
- ARIA labels
```

For **Mobile:**
```
...with attention to:
- Responsive design
- Touch-friendly interactions
- Optimize for mobile performance
- Test on mobile browsers
```

---

**Tip:** Use these templates as starting points. Customize them based on your specific needs! 📝
