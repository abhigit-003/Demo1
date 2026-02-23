import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Provider Bookings API', () => {
  let providerToken: string;
  let userToken: string;
  let serviceId: string;

  beforeAll(async () => {
    // Register a provider
    const uniqueEmail = `provider_booking_test_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Provider Test',
        email: uniqueEmail,
        password: 'password123',
        role: 'provider'
      });
    providerToken = res.body.token;

    // Create a service
    const serviceRes = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        name: 'Provider Service',
        category: 'spa',
        price: 100,
        duration: '60 min',
        description: 'Test Description',
        location: 'Test Location',
        specialist: 'Test Specialist',
        image: 'http://example.com/image.jpg'
      });
    serviceId = serviceRes.body.id;

    // Register a user
    const userEmail = `user_booking_test_${Date.now()}@example.com`;
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'User Test',
        email: userEmail,
        password: 'password123',
        role: 'user'
      });
    userToken = userRes.body.token;

    // User books the service
    await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        serviceId: serviceId,
        date: new Date().toISOString()
      });
  });

  it('should allow provider to fetch bookings for their services', async () => {
    const res = await request(app)
      .get('/api/bookings/provider')
      .set('Authorization', `Bearer ${providerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].serviceId).toBe(serviceId);
    expect(res.body[0].User).toBeDefined(); // Should include user details
  });

  it('should deny non-provider access', async () => {
    const res = await request(app)
      .get('/api/bookings/provider')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
});
