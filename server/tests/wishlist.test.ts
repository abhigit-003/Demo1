import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Wishlist API', () => {
  let userToken: string;
  let serviceId: string;
  let productId: string;

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

    // Get a product
    const productsRes = await request(app).get('/api/products');
    productId = productsRes.body[0].id;
  });

  it('should add service to wishlist with valid serviceId', async () => {
    const res = await request(app)
      .post('/api/wishlist')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        itemId: serviceId,
        itemType: 'service'
      });

    expect(res.status).toBe(201); // or 200 if already exists
  });

  it('should fail to add service with invalid serviceId', async () => {
    const res = await request(app)
      .post('/api/wishlist')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        itemId: '00000000-0000-0000-0000-000000000000',
        itemType: 'service'
      });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Service not found');
  });

  it('should fail to add product with invalid productId', async () => {
    const res = await request(app)
      .post('/api/wishlist')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        itemId: '00000000-0000-0000-0000-000000000000',
        itemType: 'product'
      });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Product not found');
  });
});
