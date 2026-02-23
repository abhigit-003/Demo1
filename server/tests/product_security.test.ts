import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Product Security API', () => {
  let providerToken: string;
  let productId: string;

  beforeAll(async () => {
    // Register a provider
    const uniqueEmail = `provider_product_test_${Date.now()}@example.com`;
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
      .post('/api/products')
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        name: 'Test Product',
        price: 50,
        description: 'Test Description',
        image: 'http://example.com/image.jpg',
        rating: 5.0,
        reviews: 1000
      });

    expect(res.status).toBe(201);
    expect(res.body.rating).toBe(0); // Default
    expect(res.body.reviews).toBe(0); // Default
    productId = res.body.id;
  });

  it('should prevent provider from updating rating', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        rating: 5.0,
        reviews: 1000,
        name: 'Updated Product Name'
      });

    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(0);
    expect(res.body.reviews).toBe(0);
    expect(res.body.name).toBe('Updated Product Name');
  });
});
