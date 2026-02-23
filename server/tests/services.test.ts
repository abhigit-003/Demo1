import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Services API', () => {
  it('GET /api/services should return list of services', async () => {
    const res = await request(app).get('/api/services');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('category');
  });

  it('GET /api/services/:id should return a specific service', async () => {
      // Get a service first
      const listRes = await request(app).get('/api/services');
      const serviceId = listRes.body[0].id;

      const res = await request(app).get(`/api/services/${serviceId}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(serviceId);
  });
});
