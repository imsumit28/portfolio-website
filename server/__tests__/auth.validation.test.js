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

  it('rejects missing login credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: '',
      password: ''
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/required/i);
    expect(User.findOne).not.toHaveBeenCalled();
  });

  it('register is not accessible without auth', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'bad-email',
      password: 'StrongPass123'
    });

    // protected route — must be 401 (no cookie/header)
    expect(res.statusCode).toBe(401);
  });
});
