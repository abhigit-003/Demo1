import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Auth API', () => {
  it('POST /api/auth/register should create a new user', async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: uniqueEmail,
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', uniqueEmail);
  });

  it('POST /api/auth/login should authenticate user', async () => {
    // Assuming seeded user 'user@raffine.com' / 'password123'
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@raffine.com',
        password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
