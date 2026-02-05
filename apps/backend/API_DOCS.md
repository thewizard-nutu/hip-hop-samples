# API Documentation - Hip-Hop Samples Marketplace

Complete REST API reference for the Hip-Hop Samples Marketplace backend.

## Base URL
```
http://localhost:3001/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

**Validation Rules:**
- Email: Valid email format, unique
- Name: Minimum 2 characters
- Password: Minimum 8 characters, must contain uppercase letter and number

**Status Codes:**
- 201: User created successfully
- 400: Validation error
- 409: Email already registered

---

### POST /auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

**Status Codes:**
- 200: Login successful
- 401: Invalid credentials
- 400: Validation error

---

### GET /auth/verify
Verify JWT token validity.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "userEmail": "user@example.com"
  }
}
```

**Status Codes:**
- 200: Token is valid
- 401: Invalid or expired token

---

## 🎵 Products Endpoints

### GET /products
List all products with filtering, sorting, and pagination.

**Query Parameters:**
```
page=1                  # Page number (default: 1)
limit=10                # Items per page (default: 10, max: 100)
category=trap           # Filter by category
minPrice=5              # Minimum price
maxPrice=50             # Maximum price
bpm=95                  # Filter by BPM
key=C                   # Filter by musical key
q=beat                  # Full-text search
```

**Response (200):**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Trap Beat Pack Vol. 1",
      "description": "Hard-hitting trap beats for producers",
      "price": 9.99,
      "category": "trap",
      "bpm": 140,
      "key": "C",
      "s3Keys": {
        "original": "products/beat-001/original.wav",
        "preview": "products/beat-001/preview.mp3"
      },
      "preview": "https://example.com/preview.mp3",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

**Status Codes:**
- 200: Success
- 400: Validation error

---

### GET /products/search
Full-text search products.

**Query Parameters:**
```
q=hip-hop               # Search query (required)
```

**Response (200):**
```json
{
  "success": true,
  "message": "Search results fetched successfully",
  "data": [
    /* products matching search */
  ]
}
```

---

### GET /products/:id
Get a specific product by ID.

**Response (200):**
```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Trap Beat Pack Vol. 1",
    "description": "Hard-hitting trap beats for producers",
    "price": 9.99,
    "category": "trap",
    "bpm": 140,
    "key": "C",
    "s3Keys": {
      "original": "products/beat-001/original.wav",
      "preview": "products/beat-001/preview.mp3"
    },
    "preview": "https://example.com/preview.mp3",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Status Codes:**
- 200: Success
- 404: Product not found

---

### POST /products
Create a new product (Admin only).

**Request:**
```json
{
  "title": "Boom Bap Collection",
  "description": "Classic 90s inspired boom bap beats",
  "price": 14.99,
  "category": "boom-bap",
  "bpm": 90,
  "key": "A",
  "s3Keys": {
    "original": "products/beat-002/original.wav",
    "preview": "products/beat-002/preview.mp3"
  },
  "preview": "https://example.com/preview.mp3"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": { /* product object */ }
}
```

**Status Codes:**
- 201: Product created
- 400: Validation error
- 401: Unauthorized

---

### PUT /products/:id
Update a product (Admin only).

**Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": { /* updated product */ }
}
```

**Status Codes:**
- 200: Updated
- 404: Not found
- 401: Unauthorized

---

### DELETE /products/:id
Delete a product (Admin only).

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": { /* deleted product */ }
}
```

**Status Codes:**
- 200: Deleted
- 404: Not found
- 401: Unauthorized

---

## 🛒 Cart Endpoints

### POST /cart
Add product to cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 1
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product added to cart",
  "data": {
    "_id": "607f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439011",
        "quantity": 1
      }
    ],
    "totalPrice": 9.99,
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated
- 404: Product not found

---

### GET /cart
Get user's cart.

**Response (200):**
```json
{
  "success": true,
  "message": "Cart fetched successfully",
  "data": {
    "_id": "607f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "title": "Trap Beat Pack Vol. 1",
          "price": 9.99
        },
        "quantity": 2
      }
    ],
    "totalPrice": 19.98,
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated

---

### PUT /cart/:productId
Update cart item quantity.

**Request:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Cart item updated successfully",
  "data": { /* updated cart */ }
}
```

**Status Codes:**
- 200: Updated
- 401: Not authenticated
- 404: Product not in cart

---

### DELETE /cart/:productId
Remove product from cart.

**Response (200):**
```json
{
  "success": true,
  "message": "Product removed from cart",
  "data": { /* updated cart */ }
}
```

**Status Codes:**
- 200: Removed
- 401: Not authenticated
- 404: Product not in cart

---

### DELETE /cart
Clear entire cart.

**Response (200):**
```json
{
  "success": true,
  "message": "Cart cleared successfully",
  "data": { /* cleared cart */ }
}
```

---

## 💳 Orders & Checkout Endpoints

### POST /orders/checkout
Create Stripe checkout session.

**Request:**
```json
{
  "successUrl": "https://example.com/success",
  "cancelUrl": "https://example.com/cancel"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Checkout session created",
  "data": {
    "sessionId": "cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    "orderId": "607f1f77bcf86cd799439013"
  }
}
```

**Status Codes:**
- 201: Session created
- 400: Cart is empty
- 401: Not authenticated

---

### GET /orders
Get user's orders.

**Query Parameters:**
```
page=1                  # Page number (default: 1)
limit=10                # Items per page (default: 10)
```

**Response (200):**
```json
{
  "success": true,
  "message": "Orders fetched successfully",
  "data": [
    {
      "_id": "607f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "productIds": [
        "507f1f77bcf86cd799439011",
        "507f1f77bcf86cd799439012"
      ],
      "totalPrice": 24.98,
      "stripePaymentId": "cs_test_...",
      "downloadUrls": [],
      "status": "completed",
      "createdAt": "2024-01-15T12:00:00Z",
      "updatedAt": "2024-01-15T12:05:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated

---

### GET /orders/:id
Get specific order.

**Response (200):**
```json
{
  "success": true,
  "message": "Order fetched successfully",
  "data": { /* order object */ }
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated
- 404: Order not found

---

### GET /orders/:orderId/downloads
Get download URLs for completed order.

**Response (200):**
```json
{
  "success": true,
  "message": "Download URLs generated successfully",
  "data": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "url": "https://hip-hop-samples.s3.amazonaws.com/products/...",
      "expiresAt": "2024-01-16T12:00:00Z"
    },
    {
      "productId": "507f1f77bcf86cd799439012",
      "url": "https://hip-hop-samples.s3.amazonaws.com/products/...",
      "expiresAt": "2024-01-16T12:00:00Z"
    }
  ]
}
```

**Download URL Features:**
- Signed URLs (24-hour expiry)
- Direct download from S3
- Automatic cleanup after expiry

**Status Codes:**
- 200: Success
- 401: Not authenticated
- 404: Order not found
- 400: Order not paid yet

---

## 🔔 Webhook Endpoints

### POST /webhook/stripe
Stripe webhook for payment events.

**Signature Verification:**
All requests must be verified using the Stripe webhook secret.

**Handled Events:**
- `checkout.session.completed` - Order status updated to "completed"
- `charge.failed` - Order status updated to "failed"
- `charge.refunded` - Logged for audit trail

**Response (200):**
```json
{
  "received": true
}
```

**Status Codes:**
- 200: Event processed
- 400: Invalid signature or processing error

---

## 📊 Category Values

```
- trap
- boom-bap
- conscious
- drill
- cloud-rap
- other
```

## 🎹 Key Values

```
C, C#, D, D#, E, F, F#, G, G#, A, A#, B
```

## 📈 Price Range

- Minimum: $0.99
- Maximum: $10,000.00

## 🎚️ BPM Range

- Minimum: 60 BPM
- Maximum: 180 BPM

---

## Error Response Format

```json
{
  "error": "Error message",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Response Time SLA

- Average: < 100ms
- P95: < 300ms
- P99: < 500ms

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Header:** `X-RateLimit-Remaining`
- **Response Code:** 429 Too Many Requests

---

## CORS Configuration

Requests from the frontend must match the configured CORS origin:
```
CORS_ORIGIN=http://localhost:3000
```

---

**Last Updated:** 2024-01-15
**API Version:** 1.0.0
