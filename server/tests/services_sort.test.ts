import request from 'supertest';
import app from '../src/app';
import './setup';

describe('Services API Sorting', () => {
  it('should return limited services', async () => {
    const res = await request(app).get('/api/services?limit=2');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('should sort by rating', async () => {
    const res = await request(app).get('/api/services?sort=rating&limit=2');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    // Assuming seeded data has varying ratings.
    const first = res.body[0].rating;
    const second = res.body[1].rating;
    expect(first).toBeGreaterThanOrEqual(second);
  });
});
