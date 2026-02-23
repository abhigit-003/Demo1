import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Service Security API', () => {
  let providerToken: string;
  let serviceId: string;

  beforeAll(async () => {
    // Register a provider
    const uniqueEmail = `provider_service_test_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Provider Test',
        email: uniqueEmail,
        password: 'password123',
        role: 'provider'
      });
    providerToken = res.body.token;
  });

  it('should prevent provider from setting rating on creation', async () => {
    const res = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        name: 'Test Service',
        category: 'spa',
        price: 100,
        duration: '60 min',
        description: 'Test Description',
        location: 'Test Location',
        specialist: 'Test Specialist',
        image: 'http://example.com/image.jpg',
        rating: 5.0,
        reviews: 1000
      });

    expect(res.status).toBe(201);
    expect(res.body.rating).toBe(0); // Default
    expect(res.body.reviews).toBe(0); // Default
    serviceId = res.body.id;
  });

  it('should prevent provider from updating rating', async () => {
    const res = await request(app)
      .put(`/api/services/${serviceId}`)
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        rating: 5.0,
        reviews: 1000,
        name: 'Updated Service Name'
      });

    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(0);
    expect(res.body.reviews).toBe(0);
    expect(res.body.name).toBe('Updated Service Name');
  });
});
