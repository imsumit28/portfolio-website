const request = require('supertest');
const app = require('../app');

describe('API health', () => {
  it('returns the API status banner', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Portfolio API Running');
  });
});
