const request = require('supertest');
const app = require('../app');

jest.mock('../models/User', () => ({
  findOne: jest.fn()
}));

const User = require('../models/User');

describe('Auth validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects invalid email on register', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'bad-email',
      password: 'StrongPass123'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid email/i);
  });

  it('rejects short password on register', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: '12345'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/at least 8/i);
  });

  it('rejects missing login credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: '',
      password: ''
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/required/i);
    expect(User.findOne).not.toHaveBeenCalled();
  });
});
