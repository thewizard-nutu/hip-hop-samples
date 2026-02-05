import request from 'supertest';

// Mock Express app for products
const createMockApp = () => {
  const express = require('express');
  const app = express();
  app.use(express.json());

  // Mock product database
  const products = [
    {
      id: '1',
      name: 'Classic 90s Drums',
      price: 29.99,
      category: 'drums',
      format: 'WAV',
      stock: 10,
    },
    {
      id: '2',
      name: 'Vinyl Loops',
      price: 39.99,
      category: 'loops',
      format: 'WAV',
      stock: 5,
    },
    {
      id: '3',
      name: 'East Coast Boom Bap',
      price: 49.99,
      category: 'production-kits',
      format: 'WAV',
      stock: 8,
    },
  ];

  app.get('/api/products', (req, res) => {
    let results = [...products];

    // Filter by category
    if (req.query.category) {
      results = results.filter((p) => p.category === req.query.category);
    }

    // Sort
    if (req.query.sort === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    }
    if (req.query.sort === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    }

    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const start = (page - 1) * limit;
    const paginatedResults = results.slice(start, start + limit);

    res.status(200).json({
      data: paginatedResults,
      total: results.length,
      page,
      limit,
    });
  });

  app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  });

  return app;
};

describe('Products API Integration Tests', () => {
  let app: any;

  beforeAll(() => {
    app = createMockApp();
  });

  describe('GET /api/products', () => {
    it('returns all products', async () => {
      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(3);
      expect(res.body).toHaveProperty('total');
    });

    it('filters products by category', async () => {
      const res = await request(app).get('/api/products?category=drums');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].category).toBe('drums');
    });

    it('sorts products by price ascending', async () => {
      const res = await request(app).get('/api/products?sort=price-asc');

      expect(res.status).toBe(200);
      expect(res.body.data[0].price).toBeLessThanOrEqual(res.body.data[1].price);
    });

    it('paginates products', async () => {
      const res = await request(app).get('/api/products?page=1&limit=2');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeLessThanOrEqual(2);
      expect(res.body.page).toBe(1);
    });

    it('returns correct pagination metadata', async () => {
      const res = await request(app).get('/api/products');

      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('page');
      expect(res.body).toHaveProperty('limit');
    });
  });

  describe('GET /api/products/:id', () => {
    it('returns product by id', async () => {
      const res = await request(app).get('/api/products/1');

      expect(res.status).toBe(200);
      expect(res.body.id).toBe('1');
      expect(res.body.name).toBe('Classic 90s Drums');
    });

    it('returns 404 for non-existent product', async () => {
      const res = await request(app).get('/api/products/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
