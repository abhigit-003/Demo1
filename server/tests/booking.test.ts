import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Booking API', () => {
  let userToken: string;
  let serviceId: string;

  beforeAll(async () => {
    // Login as user
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@raffine.com',
        password: 'password123'
      });
    userToken = res.body.token;

    // Get a service
    const servicesRes = await request(app).get('/api/services');
    serviceId = servicesRes.body[0].id;
  });

  it('should create a booking with valid serviceId and date', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        serviceId: serviceId,
        date: new Date().toISOString()
      });

    expect(res.status).toBe(201);
    expect(res.body.serviceId).toBe(serviceId);
  });

  it('should fail to create a booking with invalid date', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        serviceId: serviceId,
        date: 'invalid-date'
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid date format');
  });

  it('should fail to create a booking with non-existent serviceId', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        serviceId: '00000000-0000-0000-0000-000000000000',
        date: new Date().toISOString()
      });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Service not found');
  });
});
