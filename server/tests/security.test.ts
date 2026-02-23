import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Security API', () => {
  it('should prevent registering as admin', async () => {
    const uniqueEmail = `admin_wannabe_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Hacker',
        email: uniqueEmail,
        password: 'password123',
        role: 'admin'
      });

    expect(res.status).toBe(201);
    expect(res.body.user.role).not.toBe('admin');
    expect(res.body.user.role).toBe('user');
  });

  it('should allow registering as provider', async () => {
    const uniqueEmail = `provider_legit_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Provider',
        email: uniqueEmail,
        password: 'password123',
        role: 'provider'
      });

    expect(res.status).toBe(201);
    expect(res.body.user.role).toBe('provider');
  });

  it('should strip providerProfile for non-providers', async () => {
    const uniqueEmail = `user_with_profile_${Date.now()}@example.com`;
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'User With Profile',
        email: uniqueEmail,
        password: 'password123',
        role: 'user',
        providerProfile: { businessName: 'Fake Business' }
      });

    expect(registerRes.status).toBe(201);
    expect(registerRes.body.user.role).toBe('user');

    const token = registerRes.body.token;
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.providerProfile).toBeNull();
  });
});
