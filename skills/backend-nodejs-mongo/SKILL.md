---
name: backend-nodejs-mongo
description: Build, optimize, and test Node.js REST/GraphQL APIs with Express, MongoDB schemas, authentication, middleware, and database queries. Use when creating endpoints, designing data models, implementing validation, setting up auth, or debugging server issues.
---

# Backend Agent - Node.js + MongoDB Specialist

## Quick Start

### Project Scaffolding

```bash
mkdir api && cd api
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken express-validator
npm install -D typescript ts-node @types/express @types/node nodemon
npx tsc --init
```

### Core Structure

```
src/
├── server.ts           # Entry point
├── config/
│   ├── database.ts     # MongoDB connection
│   └── env.ts          # Environment variables
├── routes/
│   ├── auth.routes.ts
│   ├── users.routes.ts
│   └── products.routes.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── users.controller.ts
│   └── products.controller.ts
├── models/
│   ├── User.ts
│   ├── Product.ts
│   └── Order.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   └── error.middleware.ts
├── services/
│   ├── auth.service.ts
│   └── email.service.ts
├── utils/
│   ├── validators.ts
│   └── helpers.ts
└── types/
    └── index.ts        # Shared types
```

## Server Setup

### Express Server (TypeScript)

```typescript
// src/server.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/api')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/products', require('./routes/products.routes'));

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Data Models

### User Model with Validation

```typescript
// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: 2,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false, // Don't return by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Remove password from JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = mongoose.model<IUser>('User', userSchema);
```

### Product Model

```typescript
// src/models/Product.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['electronics', 'clothing', 'books', 'other'],
    },
  },
  { timestamps: true }
);

// Index for faster queries
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
```

## Controllers & Routes

### Auth Controller

```typescript
// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    user = new User({ email, name, password });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({ token, user: user.toJSON() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
```

### Auth Routes

```typescript
// src/routes/auth.routes.ts
import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateEmail, validatePassword } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/register', validateEmail, validatePassword, register);
router.post('/login', validateEmail, validatePassword, login);

export default router;
```

## Middleware

### Authentication Middleware

```typescript
// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.role || '')) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};
```

### Validation Middleware

```typescript
// src/middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateEmail = body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Invalid email');

export const validatePassword = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters');

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
```

## Common Database Operations

### Create with Error Handling

```typescript
const product = new Product({
  name: 'Laptop',
  description: 'High-performance laptop',
  price: 1299,
  stock: 10,
  category: 'electronics',
});

try {
  await product.save();
} catch (error: any) {
  if (error.code === 11000) {
    // Handle duplicate key error
  }
}
```

### Query with Pagination

```typescript
const page = 1;
const limit = 10;
const skip = (page - 1) * limit;

const products = await Product.find()
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

const total = await Product.countDocuments();

res.json({
  data: products,
  pagination: {
    total,
    page,
    pages: Math.ceil(total / limit),
  },
});
```

### Text Search

```typescript
const query = req.query.q as string;
const results = await Product.find(
  { $text: { $search: query } },
  { score: { $meta: 'textScore' } }
).sort({ score: { $meta: 'textScore' } });
```

### Aggregation Pipeline

```typescript
const stats = await Product.aggregate([
  {
    $group: {
      _id: '$category',
      count: { $sum: 1 },
      avgPrice: { $avg: '$price' },
      totalStock: { $sum: '$stock' },
    },
  },
  { $sort: { count: -1 } },
]);
```

## Testing

### Unit Test with Jest

```typescript
// src/__tests__/auth.test.ts
import { register } from '../controllers/auth.controller';
import { User } from '../models/User';
import { Request, Response } from 'express';

jest.mock('../models/User');

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (User.prototype.save as jest.Mock).mockResolvedValue({});

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});
```

### Integration Test

```typescript
// tests/api.test.ts
import request from 'supertest';
import app from '../src/server';

describe('POST /api/auth/register', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'new@example.com',
        name: 'New User',
        password: 'securepass123',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'invalid',
        name: 'User',
        password: 'password123',
      });

    expect(res.statusCode).toBe(400);
  });
});
```

## Performance & Best Practices

### Connection Pooling

```typescript
const mongoOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 45000,
};

mongoose.connect(process.env.MONGODB_URI, mongoOptions);
```

### Indexing Strategy

```typescript
// Indexes improve query performance
schema.index({ email: 1 });
schema.index({ createdAt: -1 });
schema.index({ category: 1, price: 1 });

// Sparse index for optional fields
schema.index({ deletedAt: 1 }, { sparse: true });
```

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests',
});

app.use('/api/', limiter);
```

## Environment Variables

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
API_KEY=your-api-key
```

## Essential Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.0",
    "axios": "^1.5.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "ts-node": "^10.9.0",
    "@types/express": "^4.17.20",
    "@types/node": "^20.5.0",
    "@types/bcryptjs": "^2.4.2",
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.4",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1"
  }
}
```

## Common Commands

```bash
# Development
npm run dev

# Type check
npx tsc --noEmit

# Run tests
npm test

# Build
npm run build

# Production
npm start
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check MongoDB is running; verify MONGODB_URI |
| Duplicate key error | Drop indexes or ensure unique constraint logic |
| Slow queries | Add indexes on frequently queried fields; use explain() |
| Memory leak | Check for unhandled promises; close connections properly |
| CORS errors | Verify CORS_ORIGIN env var matches frontend URL |

