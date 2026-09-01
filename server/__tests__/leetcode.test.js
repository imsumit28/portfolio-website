const request = require('supertest');
const app = require('../app');

describe('LeetCode API', () => {
  it('returns the latest accepted submission for a public profile', async () => {
    const res = await request(app).get('/api/leetcode/latest/imsumit45');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBeTruthy();
    expect(res.body.titleSlug).toBeTruthy();
    expect(res.body.url).toMatch(/^https:\/\/leetcode\.com\/problems\//);
  });

  it('rejects invalid usernames', async () => {
    const res = await request(app).get('/api/leetcode/latest/not%20valid');
    expect(res.statusCode).toBe(400);
  });
});
