import request from 'supertest';

// Mock Express app
const createMockApp = () => {
  const express = require('express');
  const app = express();
  app.use(express.json());

  // Mock auth routes
  app.post('/api/auth/register', (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    if (email === 'existing@example.com') {
      return res.status(409).json({ error: 'User already exists' });
    }
    res.status(201).json({ id: '123', email, name, token: 'jwt-token' });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }
    if (email === 'test@example.com' && password === 'password123') {
      return res.status(200).json({ id: '123', email, token: 'jwt-token' });
    }
    res.status(401).json({ error: 'Invalid credentials' });
  });

  app.post('/api/auth/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out' });
  });

  return app;
};

describe('Auth API Integration Tests', () => {
  let app: any;

  beforeAll(() => {
    app = createMockApp();
  });

  describe('POST /api/auth/register', () => {
    it('registers new user with valid credentials', async () => {
      const res = await request(app).post('/api/auth/register').send({
        email: 'newuser@example.com',
        password: 'SecurePass123!',
        name: 'New User',
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.email).toBe('newuser@example.com');
    });

    it('returns 400 for missing fields', async () => {
      const res = await request(app).post('/api/auth/register').send({
        email: 'test@example.com',
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('returns 409 if user already exists', async () => {
      const res = await request(app).post('/api/auth/register').send({
        email: 'existing@example.com',
        password: 'SecurePass123!',
        name: 'Existing User',
      });

      expect(res.status).toBe(409);
    });
  });

  describe('POST /api/auth/login', () => {
    it('logs in with valid credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('returns 401 for invalid credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

      expect(res.status).toBe(401);
    });

    it('returns 400 for missing credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
      });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('logs out user successfully', async () => {
      const res = await request(app).post('/api/auth/logout');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
    });
  });
});
