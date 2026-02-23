import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Products API', () => {
  it('should return limited products', async () => {
    // Assuming there are at least 3 products seeded
    const res = await request(app).get('/api/products?limit=2');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
