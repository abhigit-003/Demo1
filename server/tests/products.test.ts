import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Products API', () => {
  it('GET /api/products should return list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('price');
  });

  it('GET /api/products/:id should return a specific product', async () => {
      // Get a product first
      const listRes = await request(app).get('/api/products');
      const productId = listRes.body[0].id;

      const res = await request(app).get(`/api/products/${productId}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(productId);
  });
});
