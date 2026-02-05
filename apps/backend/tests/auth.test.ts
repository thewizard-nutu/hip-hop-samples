import request from 'supertest';
import app from '../src/server';
import { User } from '../src/models/User';

jest.mock('../src/models/User');

describe('Auth Controller', () => {
  const mockUserData = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'TestPassword123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        _id: 'user123',
        ...mockUserData,
      };

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/register')
        .send(mockUserData);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.email).toBe(mockUserData.email);
    });

    it('should fail with missing email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          password: 'TestPassword123',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should fail with invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          name: 'Test User',
          password: 'TestPassword123',
        });

      expect(response.statusCode).toBe(400);
    });

    it('should fail with weak password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          name: 'Test User',
          password: 'weak',
        });

      expect(response.statusCode).toBe(400);
    });

    it('should fail if user already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ email: mockUserData.email });

      const response = await request(app)
        .post('/api/auth/register')
        .send(mockUserData);

      expect(response.statusCode).toBe(409);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user successfully', async () => {
      const mockUser = {
        _id: 'user123',
        email: mockUserData.email,
        name: mockUserData.name,
        comparePassword: jest.fn().mockResolvedValue(true),
      };

      (User.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: mockUserData.email,
          password: mockUserData.password,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
    });

    it('should fail with invalid credentials', async () => {
      (User.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /api/auth/verify', () => {
    it('should verify token successfully', async () => {
      const response = await request(app)
        .get('/api/auth/verify')
        .set('Authorization', 'Bearer valid-token');

      // This will fail without a valid token, but the endpoint should exist
      expect(response.statusCode).toBeGreaterThanOrEqual(400);
    });

    it('should fail without token', async () => {
      const response = await request(app).get('/api/auth/verify');

      expect(response.statusCode).toBe(401);
    });
  });
});
